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

function getNextMove(board: (boolean | null)[][]) {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) continue;

      if (board[i][j]) count++;
      else count--;
    }
  }
  return count <= 0;
}

function tictactoe_sockets(socket: Socket, roomIO: Namespace) {
  socket.on("tictactoe-play", async (cell, room) => {
    const getBoard = await pool.query(
      "SELECT * FROM tictactoe_board_data JOIN room_data USING (room_id) WHERE room_code = $1;",
      [room]
    );
    if (getBoard?.rowCount === 0) return; // TODO: edgecase

    let newBoard = [...getBoard.rows[0].board];
    let userList = await getUserList(room, roomIO);
    const player_move: boolean =
      socket.userData.username === userList[0]?.username;
    const next_move: boolean = getNextMove(getBoard.rows[0].board);

    if (
      player_move === next_move &&
      getBoard.rows[0].board[cell.row][cell.col] === null
    ) {
      newBoard[cell.row][cell.col] = player_move;

      const updateBoard = await pool.query(
        `UPDATE tictactoe_board_data 
            SET board = $1 
            WHERE  room_id = $2
            RETURNING *;`,
        [newBoard, getBoard.rows[0].room_id]
      );
    }
    // TODO: take a callback for notifying user that they cannot play

    sendTictactoeUpdate(socket, room);
  });

  socket.on("tictactoe-reset", async (room) => {
    const resetBoard = await pool.query(
      `WITH t AS (SELECT * FROM tictactoe_board_data JOIN room_data USING (room_id) WHERE room_code = $1)
        UPDATE tictactoe_board_data AS s
        SET board = $2
        FROM t
        WHERE s.room_id = t.room_id
        RETURNING *;`,
      [room, Array(3).fill(Array(3).fill(null))]
    );

    sendTictactoeUpdate(socket, room);
  });
}

export default tictactoe_sockets;
