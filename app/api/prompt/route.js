import connectDB from "../../../libs/connect";
import Prompt from "../../../models/prompt";

export const GET = async (request) => {
  try {
    connectDB();

    const prompt = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
