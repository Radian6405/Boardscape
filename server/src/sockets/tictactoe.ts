import { Server, Socket } from "socket.io";
import pool from "../db";

function tictactoeSocket(io: Server) {
  const tictactoeIO = io.of("/tictactoe");

  async function getUserList(room: string) {
    const userList = await tictactoeIO.in(room).fetchSockets();
    const parsedList = userList.map((s) => {
      const socket = s as unknown as Socket;
      return socket.userData;
    });
    return parsedList;
  }

  async function getRoomData(room: string) {
    const findRoom = await pool.query(
      "SELECT * FROM tictactoe_room_data WHERE room_code = $1",
      [room]
    );
    return findRoom;
  }

  // adding data to socket
  tictactoeIO.use((socket, next) => {
    if (socket.handshake.auth.username !== null) {
      socket.userData = socket.handshake.auth.userData;
    }
    next();
  });

  // connection listener
  tictactoeIO.on("connection", (socket) => {
    console.log("tictactoe connected socket: ", socket.id);

    //room join listener
    socket.on("join-room", async (data, onFail) => {
      // check if room exits
      const findRoom = await getRoomData(data.room);
      if (findRoom.rowCount === 0) {
        onFail();
        return;
      }

      socket.join(data.room);

      socket.nsp.to(data.room).emit("room-update", {
        isGameStarted: findRoom.rows[0]?.is_game_started,
        userList: await getUserList(data.room),
      });
    });

    //game start listener
    socket.on("set-game-status", async (room, status) => {
      const updateRoom = await pool.query(
        "UPDATE tictactoe_room_data SET is_game_started = $1 WHERE room_code = $2",
        [status, room]
      );

      const findRoom = await getRoomData(room);
      socket.to(room).emit("room-update", {
        isGameStarted: findRoom.rows[0]?.is_game_started,
        userList: await getUserList(room),
      });
    });

    // message handellers
    socket.on("send-message", (message, room) => {
      socket.nsp.to(room).emit("receive-message", {
        message: message,
        username: socket.userData.username,
      });
    });

    // disconnection listener
    socket.on("disconnecting", async (reason, desc) => {
      const room = Array.from(socket.rooms)[1];
      console.log("disconnected:", socket.id, "from", room);

      if (room !== undefined) {
        socket.leave(room);

        // delete the room from database if empty
        const userList = await getUserList(room);
        if (userList.length === 0) {
          pool.query("DELETE FROM tictactoe_room_data WHERE room_code = $1", [
            room,
          ]);

          return;
        }

        const findRoom = await getRoomData(room);
        socket.to(room).emit("room-update", {
          isGameStarted: findRoom.rows[0]?.is_game_started,
          userList: await getUserList(room),
        });
      }
    });
  });
}

export default tictactoeSocket;
