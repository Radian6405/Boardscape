import { Namespace, Server, Socket } from "socket.io";
import { getUserList } from "./room";
import pool from "../db";

export async function sendTictactoeUpdate(socket: Socket, room: string) {
  const getBoard = await pool.query(
    "SELECT * FROM tictactoe_board_data JOIN room_data USING (room_id) WHERE room_code = $1;",
    [room]
  );

  socket.nsp.to(room).emit("tictactoe-update", {
    board: getBoard.rows[0]?.board,
  });
}

function tictactoe_sockets(socket: Socket, roomIO: Namespace) {
  socket.on("tictactoe-play", async (cell, room) => {
    const getBoard = await pool.query(
      "SELECT * FROM tictactoe_board_data JOIN room_data USING (room_id) WHERE room_code = $1;",
      [room]
    );
    if (getBoard?.rowCount === 0) return; // TODO: edgecase

    //  TODO: check if cell can be placed there or not
    // if a value alreayd exists or is not this user's turn, move is cancelled
    let newBoard = [...getBoard.rows[0].board];
    let userList = await getUserList(room, roomIO);
    newBoard[cell.row][cell.col] =
      socket.userData.username === userList[0]?.username;

    const updateBoard = await pool.query(
      `UPDATE tictactoe_board_data 
      SET board = $1 
      WHERE  room_id = $2
      RETURNING *;`,
      [newBoard, getBoard.rows[0].room_id]
    );

    sendTictactoeUpdate(socket, room);
  });
}

export default tictactoe_sockets;
