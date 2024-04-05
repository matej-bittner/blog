import NextAuth from "next-auth";
declare module "next-auth" {
  interface User {
    surname: string;
    id: string;
    createdAt: Date;
  }
  interface Session {
    user: User & {
      surname: string;
      id: string;
      createdAt: Date;
    };
    token: {
      surname: string;
      id: string;
      createdAt: Date;
    };
  }
}
