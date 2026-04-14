import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./VideoCall.css";

const socket = io("http://localhost:5000");

function VideoCall() {
  const { roomId } = useParams();

  const [online, setOnline] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const localStream = useRef(null);
  const peerConnection = useRef(null);


  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          room: roomId,
          candidate: event.candidate,
        });
      }
    };

    return pc;
  };


  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("user-online", () => setOnline(true));

    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    fetch(`http://localhost:5000/api/appointment/appointment-info/${roomId}`)
      .then((res) => res.json())
      .then((data) => setPatientName(data.patient_name));

    socket.on("answer", async (data) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    });

    socket.on("ice-candidate", async (data) => {
      if (peerConnection.current && data.candidate) {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    });

    socket.on("end-call", () => {
      endCall(false);
    });

    return () => {
      socket.off("user-online");
      socket.off("receive-message");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("end-call");
    };
  }, [roomId]);


  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      room: roomId,
      message,
      sender: socket.id,
    });

    setMessage("");
  };


  const startVideoCall = async () => {
    try {
      setIsCallActive(true);

      socket.emit("video-call-request", {
        room: roomId,
        from: "Doctor",
      });

      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = localStream.current;

      peerConnection.current = createPeerConnection();

      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      const offer = await peerConnection.current.createOffer();

      await peerConnection.current.setLocalDescription(offer);

      socket.emit("offer", {
        room: roomId,
        offer,
      });
    } catch (err) {
      console.error(err);
    }
  };


  const endCall = (emitSignal = true) => {
    setIsCallActive(false);

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    if (emitSignal) {
      socket.emit("end-call", { room: roomId });
    }
  };

  return (
    <div className="VideoCall">
      <div className="chatMsg" style={{ padding: "20px" }}>
        <div className="DoctorMsg">
          <div style={{ height: "50px" }}>
            <div className="VideoTop">
              <h2>{patientName}</h2>

              {online ? (
                <h3 style={{ color: "green" }}>Online 🟢</h3>
              ) : (
                <h3 style={{ color: "red" }}>Offline 🔴</h3>
              )}

              <div className="videoIcon">
                <i
                  className="fa-solid fa-video"
                  onClick={startVideoCall}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
            <hr />
          </div>

          <div
            id="chatBox"
            style={{
              height: isCallActive ? 550 : 450,
              overflow: "auto",
            }}
          >
            {isCallActive && (
              <div className="videoContainer">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="remoteVideo"
                ></video>

                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="localVideo"
                ></video>

                <button className="endBtn" onClick={() => endCall(true)}>
                  End Call
                </button>
              </div>
            )}

            {chat.map((msg, i) => (
              <p
                key={i}
                className={msg.sender === socket.id ? "myMsg" : "userMsg"}
              >
                <b>{msg.sender === socket.id ? "Dr" : "Pt"}:</b> {msg.message}
              </p>
            ))}
          </div>

          <div className="UserMsg">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <i
              className="fa-solid fa-paper-plane"
              onClick={sendMessage}
              style={{ cursor: "pointer", color: "green" }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCall;