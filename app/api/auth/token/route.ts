import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req, secret, raw: true });
  console.log(token);

  return new Response(JSON.stringify(token), { status: 200 });
};
