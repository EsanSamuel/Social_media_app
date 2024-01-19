import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../libs/connect";
import User from "../models/user";
import { IUser } from "../types/next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      //get the user's email
      const LoggedInUserSession = await User.findOne({
        email: session.user.email,
      });
      //define session.user.id
      session.user.id = LoggedInUserSession._id.toString();

      return session;
    },
    async signIn({ user }: IUser): Promise<boolean> {
      try {
        await connectDB();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          User.create({
            username: user.name,
            image: user.image,
            email: user.email,
          });
        }

        console.log("Signed in successfully!");
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
