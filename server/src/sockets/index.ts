import { Server } from "socket.io";
import tictactoeSocket from "./tictactoe";

function manageSockets(httpServer: any) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://127.0.0.1:5173",
    },
  });

  tictactoeSocket(io);
}

export default manageSockets;
