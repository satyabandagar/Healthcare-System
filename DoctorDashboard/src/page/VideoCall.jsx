import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

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

    const receiveHandler = (data) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("receive-message", receiveHandler);

    socket.on("user-online", () => {
      setOnline(true);
    });

     fetch(`http://localhost:5000/api/appointment/appointment-info/${roomId}`)
  .then((res) => res.json())
  .then((data) => setPatientName(data.patient_name));

    return () => {
      socket.off("receive-message", receiveHandler);
      socket.off("user-online");
    };
  }, [roomId]);

 
  

  const sendMessage = () => {
    socket.emit("send-message", {
      room: roomId,
      message: message,
      sender: socket.id,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient: {patientName}</h2>

      {online ? (
        <h3 style={{ color: "green" }}>User Online 🟢</h3>
      ) : (
        <h3 style={{ color: "red" }}>Waiting for User... 🔴</h3>
      )}

      <div
        style={{
          border: "1px solid black",
          height: "200px",
          width: "300px",
          overflow: "auto",
        }}
      >
        {chat.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender === socket.id ? "Me" : "User"}:</b> {msg.message}
          </p>
        ))}
      </div>

      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default VideoCall;
