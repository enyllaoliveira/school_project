import { authRequest } from "@/shared/hooks/userAuthRequest";
import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

interface Session extends User {
  user?: User;
  token: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                const payload = {
                    email: credentials?.email,
                    password: credentials?.password
                }
                const res = await authRequest(`${process.env.URLBase}/adm/admin/login`, payload)
                return res as Session;
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
          if (user) {
            return {
              ...token,
              jwt: user,
              token: user.token
            };
          }
          return token;
        },
        session: async ({ session, token }) => {
          if (token) {
            session.token = token;
          }
          return session;
        },
      },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
}

export default NextAuth(authOptions);