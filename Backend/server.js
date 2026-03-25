const express = require("express");
const cors = require("cors");

const doctorRoutes = require("./routes/doctorRoutes");
const userRouter = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointment");
const doctorRouter = require("./routes/doctorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/doctor", doctorRouter);
app.use("/api", doctorRoutes);
app.use("/api",userRouter);
app.use("/api/appointment",appointmentRoutes);

app.listen(5000,()=>{
console.log("Server running on port 5000");
});