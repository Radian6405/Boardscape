import { Server, Socket } from "socket.io";

function tictactoe_sockets(socket: Socket) {
  socket.on("tictactoe-play", (cell, room) => {
    socket.nsp.to(room).emit("tictactoe-update", {...cell});
  });
}

export default tictactoe_sockets;
