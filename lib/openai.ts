import OpenAI from "openai";

// Use a dummy key during build time when the real API key isn't available
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy_key_for_build",
});

export default openai;