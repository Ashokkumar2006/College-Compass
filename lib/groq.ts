import Groq from "groq-sdk";

// Use a dummy key during build time when the real API key isn't available
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build",
});

export default groq;