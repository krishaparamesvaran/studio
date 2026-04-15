import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const plugins = apiKey ? [googleAI({ apiKey })] : [];

if (!apiKey) {
  console.warn(
    'Genkit AI is disabled because GEMINI_API_KEY or GOOGLE_API_KEY is not set.'
  );
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.5-flash',
});
