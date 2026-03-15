const express = require("express");
const cors = require("cors");

const doctorRoutes = require("./routes/doctorRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", doctorRoutes);
app.use("/api",userRouter);

app.listen(5000,()=>{
console.log("Server running on port 5000");
});