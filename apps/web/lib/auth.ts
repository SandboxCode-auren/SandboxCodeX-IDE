import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import fs from "fs";
import path from "path";

import { compare } from "bcryptjs";

const USERS = path.join(
  process.cwd(),
  "../../storage/users/users.json"
);

export const authOptions: AuthOptions = {

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [

    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    CredentialsProvider({

      name: "credentials",

      credentials: {

        account: {
          label: "Email",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },

      },

      async authorize(credentials) {

        if (!credentials)
          return null;

        const users = JSON.parse(
          fs.readFileSync(USERS, "utf8")
        );

        const user = users.find(
          (u: any) =>
            u.email === credentials.account ||
            u.username === credentials.account
        );

        if (!user)
          return null;

        const ok = await compare(
          credentials.password,
          user.passwordHash
        );

        if (!ok)
          return null;

        return {

          id: user.id,

          name: user.username,

          email: user.email,

          image: user.avatar ?? null,

        };

      },

    }),

  ],

  pages: {
    signIn: "/login",
  },

};
