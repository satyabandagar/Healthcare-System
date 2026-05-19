import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./VideoCall.css";

const socket = io("http://localhost:5000");

function VideoCall() {
  const { roomId } = useParams();

  const [online, setOnline] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const peerConnection = useRef(null);

  const ringtone = useRef(new Audio("/videoplayback.mp3"));

 
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          room: roomId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

 
  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    socket.on("user-online", () => {
      setOnline(true);
    });

    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    fetch(`http://localhost:5000/api/appointment/appointment-info/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctorName(data.doctor_name);
      });

  
    socket.on("offer", async (data) => {
      setIsCallActive(true);

      ringtone.current.loop = true;
      ringtone.current.play();

      peerConnection.current = createPeerConnection();

      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = localStream.current;

      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );

      const answer = await peerConnection.current.createAnswer();

      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", {
        room: roomId,
        answer,
      });

      ringtone.current.pause();
      ringtone.current.currentTime = 0;
    });

    
    socket.on("answer", async (data) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    });

    socket.on("ice-candidate", async (data) => {
      if (peerConnection.current && data.candidate) {
        try {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        } catch (err) {
          console.error("ICE Error:", err);
        }
      }
    });

   
    socket.on("end-call", () => {
      endCall(false);
      alert("Call Ended");
    });

    return () => {
      socket.off("user-online");
      socket.off("receive-message");
      socket.off("offer");
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
      console.error("Start Call Error:", err);
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

    ringtone.current.pause();
    ringtone.current.currentTime = 0;

    if (emitSignal) {
      socket.emit("end-call", { room: roomId });
    }
  };

  return (
    <>
      <div className="VideoCall">
        <div style={{ padding: "20px" }} className="chatMsg">
          <div className="DoctorMsg">
            <div style={{ height: "50px" }}>
              <div className="VideoTop" style={{margin:"10px"}}>
                <h2 style={{color:"black"}}>{doctorName}</h2>

                {online ? (
                  <h3 style={{ color: "green" }}>Online 🟢</h3>
                ) : (
                  <h3 style={{ color: "red" }}>Offline 🔴</h3>
                )}

                <div className="videoIcon">
                  <i
                    className="fa-solid fa-video"
                    style={{ cursor: "pointer" }}
                    onClick={startVideoCall}
                  ></i>
                </div>
              </div>
              <hr />
            </div>

            <div
              id="chatBox"
              style={{
                height: isCallActive ? "550px" : "450px",
                width: "500px",
                overflow: "auto",
                padding: "10px",
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
                    playsInline
                    muted
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
                  <b>{msg.sender === socket.id ? "Me" : "Dr"}:</b> {msg.message}
                </p>
              ))}
            </div>

            <div className="UserMsg" style={{ width:"100%"}}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
                style={{width:"100%"}}
              />

              <i
                className="fa-solid fa-paper-plane"
                onClick={sendMessage}
                style={{ color: "#24ed12", cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div className="back">
        <a href="/appointment">Back</a>
      </div>
    </>
  );
}

export default VideoCall;