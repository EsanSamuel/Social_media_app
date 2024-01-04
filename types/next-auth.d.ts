import NextAuth from "next-auth";

/*declaring the module of nextauth and defining the interface of the user's session
     i.e session?.user?.id, session?.user?.name,session?.user?.image,session?.user?.email */
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      image?: string;
      email?: string;
    };
  }
}
