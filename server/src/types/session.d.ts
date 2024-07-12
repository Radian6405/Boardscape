declare global {
  namespace Express {
    interface Request {
      user: {
        user_id: number;
        username: string;
      } | null;
    }
  }
}

export {};
