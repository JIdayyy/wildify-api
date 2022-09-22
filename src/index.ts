import http from "http";
import dotenv from "dotenv";
import app from "./server";
export const server = http.createServer(app);
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 4000;

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Authorization"],
  },
});

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT} 🌎💥`);
});
