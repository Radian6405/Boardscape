declare global {
  namespace Express {
    interface Request {
      user: {
        user_id: number;
        username: string;
        email: string;
        avatar_text: string;
        avatar_color: string;
      } | null;
    }
  }
}
declare module "socket.io" {
  interface Socket {
    userData: {
      username: string;
      user_id: number | null;
    };
  }
}

export {};
