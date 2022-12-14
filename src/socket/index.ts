import { server as httpServer } from "./../index";
import { Server } from "socket.io";

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("NEW_SONG", (data) => {
    socket.emit("NEW_SONG", data);
  });
  socket.on("ALBUM_UPDATE", (data) => {
    socket.emit("ALBUM_UPDATE", data);
  });
});
