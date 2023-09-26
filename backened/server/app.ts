import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import { connect } from "./config/db";
import socket from 'socket.io'
import {Server} from 'socket.io'
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
export const io=new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
})


io.on("connection",(socket)=>{
  socket.on("join_room", (data) => {
    socket.join(data);
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
})




app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const port = 3001;

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
