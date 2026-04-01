import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    // remove old listeners
    socket.off("user-online");
    socket.off("receive-message");

    socket.on("user-online", () => {
      setOnline(true);
    });

    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    fetch(`http://localhost:5000/api/appointment/appointment-info/${roomId}`)
      .then((res) => res.json())
      .then((data) => setPatientName(data.patient_name));
  }, [roomId]);

  const sendMessage = () => {
    if (!message) return;

    socket.emit("send-message", {
      room: roomId,
      message: message,
      sender: socket.id,
    });

    setMessage("");
  };

  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="VideoCall">
      <div style={{ padding: "20px" }} className="chatMsg">
        <div className="DoctorMsg">
          <div className="" style={{ height: "50px" }}>
            <div className="VideoTop">
              <h2 style={{display:"block", marginBottom:"15px"}}> {patientName}</h2>

              {online ? (
                <h3 style={{ color: "green", display: "block" }}> Online 🟢</h3>
              ) : (
                <h3 style={{ color: "red" }}> 🔴</h3>
              )}
              <div className="videoIcon">
                <i class="fa-solid fa-phone" style={{cursor:"pointer"}}></i>

                <i
                  class="fa-solid fa-video"
                  style={{ marginRight: "20px",cursor:"pointer"}}
                ></i>
              </div>

              
             
            </div>
             <hr />
          </div>

          <div
            id="chatBox"
            style={{
              height: "450px",
              width: "500px",
              overflow: "auto",
              padding: "10px",
              marginTop:"20px"
            
            }}
          >
            {chat.map((msg, i) => (
              <p
                key={i}
                className={msg.sender === socket.id ? "myMsg" : "userMsg"}
              >
                <b>{msg.sender === socket.id ? "Me" : "Dr"}:</b> {msg.message}
              </p>
            ))}
          </div>
           <p style={{backgroundColor:"black",width:"100%",height:"1px",position:"relative",top:"20px"}}>-</p>
          <div className="" style={{width:"100%"}}>
            <div className="UserMsg">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <i class="fa-solid fa-paper-plane" onClick={sendMessage} style={{color:"#1ee00d",cursor:"pointer",marginRight:"10px"}}></i>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default VideoCall;
