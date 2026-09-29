// types/next-auth.d.ts
import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: Role;
    brandScope?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      brandScope?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    brandScope?: string | null;
  }
}