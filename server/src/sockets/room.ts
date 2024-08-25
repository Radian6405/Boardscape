import { Namespace, Server, Socket } from "socket.io";
import pool from "../db";
import tictactoe_sockets, { sendTictactoeUpdate } from "./tictactoe";

export async function getUserList(room: string, roomIO: Namespace) {
  const userList = await roomIO.in(room).fetchSockets();
  const parsedList = userList.map((s) => {
    const socket = s as unknown as Socket;
    return socket.userData;
  });
  return parsedList;
}

function roomSocket(io: Server) {
  const roomIO = io.of("/room");

  async function getRoomData(room: string) {
    const findRoom = await pool.query(
      "SELECT * FROM room_data WHERE room_code = $1",
      [room]
    );
    return findRoom;
  }

  async function notifyUpdate(room: string, socket: Socket, self: boolean) {
    const findRoom = await getRoomData(room);
    const userList = await getUserList(room, roomIO);
    if (self) {
      socket.nsp.to(room).emit("room-update", {
        isGameStarted: findRoom.rows[0]?.is_game_started,
        userList: userList,
        game: findRoom.rows[0]?.game,
      });
    } else {
      socket.to(room).emit("room-update", {
        isGameStarted: findRoom.rows[0]?.is_game_started,
        userList: userList,
        game: findRoom.rows[0]?.game,
      });
    }

    if (findRoom.rows[0]?.is_game_started) {
      // TODO: change the below command based on game in the room from above
      sendTictactoeUpdate(socket, room);
    }
  }

  // adding data to socket
  roomIO.use((socket, next) => {
    if (socket.handshake.auth.username !== null) {
      socket.userData = socket.handshake.auth.userData;
    }
    next();
  });

  // connection listener
  roomIO.on("connection", (socket) => {
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

      notifyUpdate(data.room, socket, true);
    });

    //game start listener
    socket.on("set-game-status", async (room, status) => {
      const updateRoom = await pool.query(
        "UPDATE room_data SET is_game_started = $1 WHERE room_code = $2 RETURNING *",
        [status, room]
      );

      if (updateRoom.rowCount == 0) return; // TODO: edgecase

      // TODO: change the below command based on game in the room from above
      const createBoard = await pool.query(
        "INSERT INTO tictactoe_board_data (room_id, board) VALUES($1,$2);",
        [updateRoom.rows[0].room_id, Array(3).fill(Array(3).fill(null))]
      );

      notifyUpdate(room, socket, false);
    });

    // message handellers
    socket.on("send-message", (message, room) => {
      socket.nsp.to(room).emit("receive-message", {
        message: message,
        username: socket.userData.username,
      });
    });

    tictactoe_sockets(socket, roomIO);

    // disconnection listener
    socket.on("disconnecting", async (reason, desc) => {
      const room = Array.from(socket.rooms)[1];
      console.log("disconnected:", socket.id, "from", room);

      if (room !== undefined) {
        socket.leave(room);

        // delete the room from database if empty
        const userList = await getUserList(room, roomIO);
        if (userList.length === 0) {
          pool.query("DELETE FROM room_data WHERE room_code = $1", [room]);

          return;
        }

        notifyUpdate(room, socket, false);
      }
    });
  });
}

export default roomSocket;
