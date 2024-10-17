export interface solvedCells {
  row?: number;
  col?: number;
  diagonal?: number;
  player?: boolean;
}

export const isSolvedCell = (
  row: number,
  col: number,
  solvedCells: solvedCells | null
): boolean => {
  if (solvedCells === null) return false;
  if (solvedCells?.row === row) return true;
  if (solvedCells?.col === col) return true;
  if (solvedCells.diagonal !== undefined) {
    if (solvedCells.diagonal === 1) return row === col;
    else return row + col === 2;
  }
  return false;
};

export const isSolved = (board: (boolean | null)[][]): solvedCells | null => {
  // row check
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][2] !== null
    )
      return { row: i, player: board[i][0] ?? undefined };
  }

  // col check
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[2][i] !== null
    )
      return { col: i, player: board[0][i] ?? undefined };
  }

  // diagonal check
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[2][2] !== null
  )
    return { diagonal: 1, player: board[1][1] ?? undefined };

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[2][0] !== null
  )
    return { diagonal: 0, player: board[1][1] ?? undefined };

  return null;
};

export function generateRandomUsername() {
  return "user_" + String(Math.floor(Math.random() * 10000));
}

const defaultColors = [
  "#644536",
  "#84DCCF",
  "#3E6990",
  "#F39B6D",
  "#E4C1F9",
  "#E56399",
  "#73AB84",
  "#99D19C",
  "#E7A977",
  "#00A6ED",
  "#EF6351",
  "#5C7457",
  "#FFE19C",
  "#C6D4FF",
  "#9381FF",
];

export function generateRandomAvatarColor() {
  const num = Math.floor(Math.random() * defaultColors.length);
  return defaultColors[num];
}

const defaultAvatars = [
  { text: ":|)", rot: 90 },
  { text: ":D", rot: 90 },
  { text: ":/", rot: 90 },
  { text: ":-", rot: 90 },
  { text: ":<", rot: 90 },
  { text: ";P", rot: 90 },
  { text: ":O", rot: 90 },
  { text: ":$", rot: 90 },
  { text: ">:)", rot: 90 },
  { text: ":X", rot: 90 },
  { text: ":^", rot: 90 },
  { text: ":@", rot: 90 },
  { text: ":L", rot: 90 },
  { text: "-_-", rot: 0 },
  { text: "B)", rot: 90 },
  { text: ";]", rot: 90 },
  { text: ">_<", rot: 0 },
  { text: "T_T", rot: 0 },
  { text: "0_0", rot: 0 },
  { text: "x_x", rot: 0 },
  { text: "@_@", rot: 0 },
  { text: ":3)", rot: 90 },
  { text: ":^)", rot: 90 },
  { text: ":)>", rot: 90 },
];

export function generateRandomAvatar() {
  const num = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[num];
}
