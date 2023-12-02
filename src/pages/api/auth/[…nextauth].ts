import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {useConnection} from '../../../shared/hooks/useConnection'
import { authRequest } from "@/shared/hooks/userAuthRequest";
import Error from "next/error";
import { NextApiRequest, NextApiResponse } from "next";

interface AuthType{
    token: string;
  }

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "password", type: "password" }
              }, 
              async authorize(credentials) {
                const response = await authRequest(`${process.env.NEXTAUTH_URL}/adm/admin/login`, credentials)
                return response as unknown as User
                // try {
                //     const response = await authRequest(`${process.env.NEXTAUTH_URL}/adm/admin/login`, credentials)
                //     if (response?.token) {
                //         return response
                //     } 
                //     return null
                // } catch (error) {
                //     console.log("Authorize error:", error);
                //     return error
                // }
                // }
              }
            })
    ],
    pages: {
        signIn: "/auth/login",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };