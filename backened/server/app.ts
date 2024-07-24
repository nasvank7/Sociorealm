import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import { connect } from "./config/db";
import { Server } from "socket.io";

dotenv.config();
const app: Express = express();

connect();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinChat", ({ userId }) => {
    socket.join(userId);
    console.log(`User joined chat: ${userId}`);
  });

  socket.on("send_message", (message) => {
    console.log(`Message sent to ${message.userId}: ${message.content}`);
    io.to(message.userId).emit("receive_message", message);
  });

  socket.on("likePost",(newNotification)=>{
    console.log(newNotification);

    io.to(newNotification.postUserId).emit("notification",newNotification)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const port = 3001;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
