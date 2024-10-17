const colors = [
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
  const num = Math.floor(Math.random() * colors.length);
  return colors[num];
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
