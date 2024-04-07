import { OpenAIStream, OpenAIStreamPayload } from "../../lib/OpenAIStream";

if (!process.env.OPENAITOKEN) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { tone, gender, age, name, feeling } = await req.json()

  const prompt = `Write me a story in a tone that is ${tone}. Make it about a ${gender} named ${name}. The story should be about feeling more ${feeling}. Use appropriate language for a ${age} year old.`
  console.log(prompt)
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-4",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3800,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;