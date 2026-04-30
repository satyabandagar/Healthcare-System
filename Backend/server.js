const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const doctorRoutes = require("./routes/doctorRoutes");
const userRouter = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointment");
const paymentRoutes = require("./routes/payment");
const contactRoutes = require("./routes/contactRoutes");
const sendEmail = require("./utils/sendEmail");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", doctorRoutes);
app.use("/api/user", userRouter);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/contact", contactRoutes);

app.post("/generate-prescription", async (req, res) => {

  const filePath = "uploads/prescription123.pdf";

  await sendEmail(req.body.email, filePath, req.body.name);

  res.json({ message: "Sent" });
});

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (roomId) => {
    if (!roomId) return;

    socket.join(roomId);
    console.log("Joined Room:", roomId);

    const room = io.sockets.adapter.rooms.get(roomId);

    if (room && room.size > 1) {
      io.to(roomId).emit("user-online");
    }
  });

  socket.on("send-message", (data) => {
  io.to(data.room).emit("receive-message", data);
});

socket.on("offer", (data) => {
    socket.to(data.room).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.room).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.room).emit("ice-candidate", data);
  });

  socket.on("end-call", (data) => {
    socket.to(data.room).emit("end-call");
  });

  socket.on("video-call-request", (data) => {
    socket.to(data.room).emit("incoming-video-call", {
      from: data.from,
    })});

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});


server.listen(5000, () => {
  console.log("Server running on port 5000");
});