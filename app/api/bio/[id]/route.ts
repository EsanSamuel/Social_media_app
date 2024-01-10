import { NextRequest } from "next/server";
import connectDB from "../../../../libs/connect";
import User from "../../../../models/user";

interface Params {
  params: {
    id: string;
  };
}

export const POST = async (request: NextRequest, { params }: Params) => {
  const { bio } = await request.json();
  try {
    await connectDB();
    const user = await User.findById(params.id);
    if (!user) {
      return new Response("User not found!", { status: 404 });
    }
    user.bio = bio;
    return new Response(JSON.stringify(user), { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
