# Social Baluni Public School Project

This workspace contains the source code for the Social Baluni Public School website.

## Overview

The project is a full-stack school website with:

- A React + Vite frontend for the public-facing website
- An Express + MongoDB backend for content and admin APIs
- Dynamic pages for home, admissions, news, gallery, and school information
- Contact / enquiry workflows and admin-ready data models

## Project structure

- `Social_Baluni_Public_School/frontend` — React frontend application
- `Social_Baluni_Public_School/server` — Express API and database setup
- `Social_Baluni_Public_School/README.md` — project-specific README for the app itself

## Getting started

### 1) Install dependencies

```bash
cd "Social_Baluni_Public_School/server"
npm install

cd ../frontend
npm install
```

### 2) Configure environment variables

Create a `.env` file in the `server` folder and set values such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
PORT=5000
```

### 3) Run the app

Start the backend:

```bash
cd "Social_Baluni_Public_School/server"
npm run dev
```

Start the frontend:

```bash
cd "Social_Baluni_Public_School/frontend"
npm run dev
```

The frontend typically runs on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Features

- School landing page with hero, stats, and program highlights
- News and events sections
- Gallery and achievement highlights
- Admission enquiry flow
- Secure API and authentication support
- MongoDB-backed content and admin data management

## Build and validation

Frontend build:

```bash
cd "Social_Baluni_Public_School/frontend"
npm run build
```

Frontend lint:

```bash
cd "Social_Baluni_Public_School/frontend"
npm run lint
```

API readiness can be checked with:

```bash
GET /api/health
```

## Notes

- The server project includes a `seed` script that resets database collections. Use it only on a safe development database.
- The frontend uses a Vite proxy for API calls by default; production deployments may require setting `VITE_API_URL`.

## License

This project currently does not declare a specific license in the workspace metadata.