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

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT} 🌎💥`);
});
