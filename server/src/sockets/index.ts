import { Server } from "socket.io";
import roomSocket from "./room";

function manageSockets(httpServer: any) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://127.0.0.1:5173",
    },
  });

  roomSocket(io);
}

export default manageSockets;
