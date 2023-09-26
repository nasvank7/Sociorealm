import {io} from '../app'

io.on("connection",(socket)=>{
    socket.on("join_room", (data) => {
      socket.join(data);
    })
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("recieve_message", data);
    });
  })