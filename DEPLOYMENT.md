# MapMo Production Deployment Guide

This guide outlines how to deploy the MapMo backend and frontend to a production environment.

## 1. Backend Deployment (Render / Heroku / AWS)

The backend is a Node.js + Express + Prisma application.

### Prerequisites
- A managed PostgreSQL database (e.g., Supabase, Neon, AWS RDS, Render Postgres).
- A Node.js hosting provider (e.g., Render, Heroku, AWS Elastic Beanstalk).

### Steps
1. **Database:** Create your production PostgreSQL database and get the connection string.
2. **Environment Variables:** Set the following variables in your hosting provider's dashboard:
   - `DATABASE_URL`: Your production Postgres connection string.
   - `JWT_SECRET`: A strong, randomly generated secret key.
   - `NODE_ENV`: `production`
   - `PORT`: (Usually provided automatically by the host, e.g., 8080)
3. **Build Command:** Set the build command to:
   ```bash
   npm install && npx prisma generate && npm run build
   ```
4. **Start Command:** Set the start command to:
   ```bash
   npm start
   ```
5. **Database Migration:** Before the first run, ensure you apply the Prisma schema to the production DB. You can run this via your host's console or add it to the build step:
   ```bash
   npx prisma migrate deploy
   ```

---

## 2. Frontend Deployment (Expo / App Stores)

The frontend is an Expo React Native application.

### Prerequisites
- An Expo account (expo.dev).
- Apple Developer Program account (for iOS).
- Google Play Console account (for Android).

### Steps
1. **Update API URL:** In `frontend/src/api/apiClient.ts`, change the `API_URL` from `http://localhost:3000/api` to your deployed backend URL (e.g., `https://mapmo-backend.onrender.com/api`).
2. **Install EAS CLI:** 
   ```bash
   npm install -g eas-cli
   ```
3. **Login to Expo:**
   ```bash
   eas login
   ```
4. **Configure Project:**
   ```bash
   eas build:configure
   ```
5. **Build for Android (APK or AAB):**
   ```bash
   eas build -p android --profile production
   ```
6. **Build for iOS:**
   ```bash
   eas build -p ios --profile production
   ```
7. **Submit to App Stores:** Once the builds are complete, you can use EAS Submit or manually upload the binaries to the App Store Connect and Google Play Console.

---

## 3. CI/CD 

This repository includes a GitHub Actions workflow (`.github/workflows/main.yml`) that automatically:
- Installs dependencies.
- Runs backend Unit Tests (`npm test`).
- Type-checks the frontend code.

Ensure this workflow passes before merging any pull requests to the `main` branch.
