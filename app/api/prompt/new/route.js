import Prompt from "../../../../models/prompt";
import connectDB from "../../../../libs/connect";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
