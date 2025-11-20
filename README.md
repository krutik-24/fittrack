# Fit Track

Fit Track is a cross-platform mobile app (iOS & Android) built with Expo + React Native + TypeScript.
It includes workout tracking with streaks, a calorie tracker, and AI-powered meal & workout planners.
Cloud sync via Firebase is optional and documented.

NOTE: This repository contains no secrets. Copy `.env.example` to `.env` and fill values before running.

## Quick start (local)

1. Clone repo
   ```bash
   git clone https://github.com/krutik-24/fittrack.git
   cd fittrack
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Copy env file
   ```bash
   cp .env.example .env
   ```
   Fill in OPENAI_API_KEY, NUTRITIONIX_KEY, FIREBASE_* values (see below)

4. Run
   ```bash
   expo start
   ```
   Open on a device or simulator

## Environment variables (.env)

- `OPENAI_API_KEY=sk-...`
- `NUTRITIONIX_KEY=your-nutritionix-key`
- `FIREBASE_API_KEY=...`
- `FIREBASE_AUTH_DOMAIN=...`
- `FIREBASE_PROJECT_ID=...`
- `FIREBASE_STORAGE_BUCKET=...`
- `FIREBASE_MESSAGING_SENDER_ID=...`
- `FIREBASE_APP_ID=...`

## Firebase setup (optional, for cloud sync)

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Anonymous and optionally Google/Apple)
3. Create a Firestore database in production or test mode
4. Copy the Firebase config values into your .env

## AI integration

- The app includes an aiService that calls an OpenAI-style endpoint. Replace the base URL/model in `src/services/aiService.ts` if using a different provider.
- Keep your keys private.

## Nutrition / barcode

- The app includes nutritionService hooks for Nutritionix. Get an API key from https://www.nutritionix.com/business/api and set NUTRITIONIX_KEY in .env.

## CI

- GitHub Actions workflow runs lint, typecheck and tests.

## Tests

- Unit tests for core logic are in `tests/`. Run `yarn test`.

## License

- MIT