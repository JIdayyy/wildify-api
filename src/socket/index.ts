import { server as httpServer } from "./../index";
import { Server } from "socket.io";

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("NEW_SONG", (data) => {
    socket.emit("NEW_SONG", data);
  });
});

export default io;
