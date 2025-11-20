import axios from 'axios';

/**
 * Minimal AI service wrapper.
 * Replace baseURL and model name if you use a different provider.
 * Reads OPENAI_API_KEY from process.env (managed by Expo/config).
 * NOTE: For production, do not expose API keys in client apps. Use a server proxy.
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const client = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function generateMealPlan({
  calories,
  goal,
  preferences,
}: {
  calories: number;
  goal: 'surplus' | 'deficit' | 'maintenance';
  preferences?: string;
}) {
  const prompt = `Create a 1-day meal plan for a user with daily calories ${calories} aiming for ${goal}. Include breakfast, lunch, dinner, two snacks. Give calories per item and totals. Preferences: ${preferences ||
    'none'}. Output as JSON: { "meals": [{"name":"", "calories":0, "items":[""]}], "totalCalories": 0 }`;
  try {
    const resp = await client.post('/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
    });
    const text = resp.data?.choices?.[0]?.message?.content;
    // Attempt to extract JSON from the response
    try {
      const jsonStart = text?.indexOf('{');
      const jsonText = jsonStart !== -1 ? text?.slice(jsonStart) : text;
      const parsed = JSON.parse(jsonText || '{}');
      return { parsed, raw: text };
    } catch (e) {
      return { raw: text };
    }
  } catch (err) {
    console.warn('AI meal plan error', err);
    return { error: 'AI unavailable' };
  }
}

export async function generateWorkoutPlan({
  goal,
  experienceLevel,
  daysPerWeek,
}: {
  goal: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
}) {
  const prompt = `Generate a ${daysPerWeek}-day ${experienceLevel} workout plan for goal: ${goal}. For each day, provide exercises, sets, reps, and short notes. Output as JSON.`;
  try {
    const resp = await client.post('/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });
    const text = resp.data?.choices?.[0]?.message?.content;
    try {
      const jsonStart = text?.indexOf('{');
      const jsonText = jsonStart !== -1 ? text?.slice(jsonStart) : text;
      const parsed = JSON.parse(jsonText || '{}');
      return { parsed, raw: text };
    } catch (e) {
      return { raw: text };
    }
  } catch (err) {
    console.warn('AI workout plan error', err);
    return { error: 'AI unavailable' };
  }
}
