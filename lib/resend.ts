import { Resend } from "resend";

// Use a dummy key during build time to avoid instantiation errors
// At runtime, the real API key will be available
const apiKey = process.env.RESEND_API_KEY || "re_dummy_key_for_build";
const resend = new Resend(apiKey);

export default resend;