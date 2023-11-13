import http from "http";
import dotenv from "dotenv";
import app from "./server";

export const server = http.createServer(app);

import { io } from "./socket";
import { EnvironmentService, config } from "./environment";

export const env = new EnvironmentService(config);

dotenv.config();

const PORT = process.env.PORT || 4000;

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
