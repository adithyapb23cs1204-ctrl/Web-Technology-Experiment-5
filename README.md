# TechFest 2026 Portal - Full Stack MERN Application (Resolved)

This repository contains the complete full-stack web application for TechFest 2026, developed as part of **Experiment 5: Security, Version Control, CI/CD and Cloud Deployment**.

## Architecture Overview
- **Frontend**: React 18 + Vite SPA, hosted on **Vercel** with client-side routing rewrites and lazy loading.
- **Backend**: Node.js + Express REST API, hosted on **Render** secured with Helmet HTTP security headers and mongo-sanitize.
- **Database**: **MongoDB Atlas** (M0 Free Cloud Cluster) with TLS encryption and IP whitelist.
- **CI/CD**: **GitHub Actions** pipeline running automated Jest tests and Vite production builds on every push.

## Cloud Deployment Links
- **Frontend (Vercel)**: `https://techfest-2026.vercel.app` *(update with your deployed link)*
- **Backend API (Render)**: `https://techfest-2026-backend.onrender.com` *(update with your deployed link)*
- **Database (MongoDB Atlas)**: `techfest-cluster.hz08bsi.mongodb.net`

## Local Development
1. **Backend**:
   ```bash
   cd techfest-backend
   npm install
   npm start
   ```
2. **Frontend**:
   ```bash
   cd techfest-react
   npm install
   npm run dev
   ```
3. **Automated Tests**:
   ```bash
   cd techfest-backend
   npm test
   ```

<!-- Feature: Added by feature-page branch -->
Version: conflict-test-target
