<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# VoteWise India

A production-ready web application for electoral awareness in India, featuring real-time data, AI-powered assistance, and premium aesthetics.

## Features
- **Real-time Stats**: Live Firestore listeners for voter data and timeline events.
- **AI Assistant**: Persistent chat history and electoral guidance powered by Gemini.
- **Premium UI**: Glassmorphism, neon accents, and smooth Framer Motion transitions.
- **Admin Dashboard**: Secure management interface for electoral updates.

## Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Create a `.env` file with your `GEMINI_API_KEY`.
3. **Start the app**:
   ```bash
   npm run dev
   ```

## Deployment (Google Cloud Run)

This project is ready to be deployed to **Google Cloud Run**.

1. Connect your GitHub repository to **Google Cloud Build**.
2. Select the provided `Dockerfile`.
3. Add `GEMINI_API_KEY` as an environment variable in the Cloud Run service settings.
