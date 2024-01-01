import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../../libs/connect";
import User from "../../../../models/user";

interface Profile {
  name: string;
  email: string;
  picture: string;
}

const handler: AuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const LoggedInUserSession = await User.findOne({
        email: session.user.email,
      });
      session.user.id = LoggedInUserSession._id.toString();

      return session;
    },
    async signIn({ profile }: { profile: Profile }) {
      try {
        await connectDB();

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          User.create({
            username: profile.name,
            image: profile.picture,
            email: profile.email,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false
      }
    },
  },
});

export { handler as GET, handler as POST };
