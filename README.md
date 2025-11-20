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
   # or
   npm install
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

## Install on Your Mobile Device

### Option 1: Using Expo Go (Easiest - For Testing)

1. **Install Expo Go app** on your phone:
   - iOS: Download from [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: Download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Run the development server**:
   ```bash
   cd /workspaces/fittrack
   expo start
   ```

3. **Scan the QR code**:
   - iOS: Open Camera app and scan the QR code shown in terminal
   - Android: Open Expo Go app and scan the QR code

4. The app will load on your phone instantly!

### Option 2: Build Standalone App (Production)

#### For Android (APK/AAB):

1. **Create an Expo account** (free):
   ```bash
   npx expo register
   # or login if you have an account
   npx expo login
   ```

2. **Build the APK** (for direct installation):
   ```bash
   eas build -p android --profile preview
   ```
   
   Or build **AAB** (for Google Play Store):
   ```bash
   eas build -p android --profile production
   ```

3. **Download and install**:
   - Once build completes, you'll get a download link
   - Download the APK to your Android phone
   - Enable "Install from Unknown Sources" in Settings
   - Install the APK

#### For iOS (iPhone/iPad):

1. **Join Apple Developer Program** ($99/year) - required for App Store

2. **Build for iOS**:
   ```bash
   eas build -p ios --profile production
   ```

3. **Submit to App Store** or **TestFlight**:
   ```bash
   eas submit -p ios
   ```

### Option 3: Expo Application Services (EAS) - Recommended

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Configure EAS**:
   ```bash
   eas build:configure
   ```

3. **Build for both platforms**:
   ```bash
   # Android
   eas build -p android --profile preview
   
   # iOS (requires Apple Developer account)
   eas build -p ios --profile preview
   ```

4. **Share with others using EAS Update**:
   ```bash
   eas update --branch production
   ```

## Deploy Online / Share Publicly

### Using Expo Snack (Web-based, Instant)

1. Create an account on [Expo Snack](https://snack.expo.dev/)
2. Upload your project files
3. Share the Snack URL with anyone
4. Others can scan QR code to run on their phones

### Using Expo Publishing (Deprecated but Simple)

1. **Publish to Expo servers**:
   ```bash
   expo publish
   ```

2. **Share the link**:
   - You'll get a URL like: `exp://exp.host/@username/fittrack`
   - Anyone with Expo Go can open this link

### Deploy as Web App

1. **Build for web**:
   ```bash
   expo build:web
   ```

2. **Deploy to hosting** (choose one):
   
   **Vercel:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```
   
   **Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir web-build
   ```
   
   **GitHub Pages:**
   ```bash
   npm install -g gh-pages
   npm run build:web
   gh-pages -d web-build
   ```

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