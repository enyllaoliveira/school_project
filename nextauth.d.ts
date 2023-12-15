import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        admin?: string;
        token: string;
    }
    interface Session extends DefaultSession {
        user?: User;
        token: token;
    }
}

