import { Server, Socket } from "socket.io";

function tictactoeSocket(io: Server) {
  const tictactoeIO = io.of("/tictactoe");

  tictactoeIO.use((socket, next) => {
    if (socket.handshake.auth.username !== null) {
      socket.userData = socket.handshake.auth.userData;
    }
    next();
  });

  tictactoeIO.on("connect", (socket) => {
    console.log("tictactoe connected socket: ", socket.id);

    socket.on("join-room", async (data) => {
      socket.join(data.room);

      const userList = await tictactoeIO.in(data.room).fetchSockets();
      const parsedList = userList.map((s) => {
        const socket = s as unknown as Socket;
        return socket.userData;
      });

      socket.emit("user-list", parsedList);
      socket.broadcast.emit("user-list", parsedList);
    });
  });
}

export default tictactoeSocket;
