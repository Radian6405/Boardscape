export function generateRandomUsername() {
  return "user_" + String(Math.floor(Math.random() * 10000));
}

// TODO before merge: make them random
export function generateRandomAvatarColor() {
  return "#FF0000";
}
export function generateRandomAvatarText() {
  return ":)";
}
