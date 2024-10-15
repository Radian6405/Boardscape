export interface userData {
  user_id: number | null;
  username: string;
  avatar_color: string;
  avatar_text: string;
  email: string | null;
}
export interface chatMessage {
  username: string;
  message: string;
}