import { server as httpServer } from "./../index";
import { Server } from "socket.io";

export const io = new Server(httpServer);
