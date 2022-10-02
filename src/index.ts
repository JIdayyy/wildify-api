import http from "http";
import dotenv from "dotenv";
import app from "./server";
export const server = http.createServer(app);
import { Server } from "socket.io";
import corsOptions from "./config/corsOptions";

dotenv.config();

const PORT = process.env.PORT || 4000;

export const io = new Server(server, {
  cors: corsOptions,
});

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

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT} 🌎💥`);
});
