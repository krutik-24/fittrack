import axios from 'axios';

/**
 * Nutritionix example wrapper.
 * Requires NUTRITIONIX_KEY in env (not safe in client for production).
 * Use a server-side proxy in production to keep keys safe.
 */

const NUTRITIONIX_KEY = process.env.NUTRITIONIX_KEY || '';

const client = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2',
  timeout: 10000,
  headers: {
    'x-app-key': NUTRITIONIX_KEY,
    'Content-Type': 'application/json',
  },
});

export async function lookupByBarcode(barcode: string) {
  try {
    const resp = await client.get(`/search/item?upc=${barcode}`);
    return resp.data;
  } catch (err) {
    console.warn('Nutrition lookup error', err);
    return { error: 'nutrition unavailable' };
  }
}

export async function searchFood(query: string) {
  try {
    const resp = await client.post('/natural/nutrients', { query });
    return resp.data;
  } catch (err) {
    console.warn('Nutrition search error', err);
    return { error: 'nutrition unavailable' };
  }
}
