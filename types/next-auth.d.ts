import NextAuth from "next-auth";
declare module "next-auth" {
  interface User {
    surname: string;
    id: string;
    createdAt: Date;
    description?: string | null;
  }
  interface Session {
    user: User & {
      surname: string;
      id: string;
      createdAt: Date;
      description?: string | null;
    };
    token: {
      surname: string;
      id: string;
      createdAt: Date;
      description?: string | null;
    };
  }
}
