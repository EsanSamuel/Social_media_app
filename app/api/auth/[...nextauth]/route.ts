import NextAuth from "next-auth";
import { authOptions } from "../../../../libs/session";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
