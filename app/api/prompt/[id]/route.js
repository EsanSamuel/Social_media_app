import connectDB from "../../../../libs/connect";
import Prompt from "../../../../models/prompt";

export const GET = async (request, { params }) => {
  try {
    connectDB();

    const Prompts = await Prompt.findById(params.id).populate("creator");

    if (!Prompts) return new Response("Prompts not found!", { status: 404 });

    return new Response(JSON.stringify(Prompts), { status: 200 });
  } catch (error) {
    return new Response("Prompts not found!", { status: 404 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    connectDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompts not found!", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Prompts not found!", { status: 404 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    connectDB();

    const deletePrompt = await Prompt.findByIdAndRemove(params.id);

    return new Response(JSON.stringify("Post deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response("Prompts not found!", { status: 404 });
  }
};
