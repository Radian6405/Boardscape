import { Server } from "socket.io";

function tictactoeSocket(io: Server) {
  const tictactoeIO = io.of("/tictactoe");

  tictactoeIO.on("connect", (socket) => {
    console.log("tictactoe connected socket: ", socket.id);
  });
}

export default tictactoeSocket;
