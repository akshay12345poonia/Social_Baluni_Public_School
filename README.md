# Social Baluni Public School

React/Vite frontend and Express/MongoDB API for the Social Baluni Public School website.

## Run locally

1. Start MongoDB and configure `server/.env` with at least `MONGO_URI` and `JWT_SECRET`. Set `CLIENT_URL=http://localhost:3000` when running the frontend locally.
2. In `server`, run `npm install` and `npm run dev` (the API listens on port `5000` by default).
3. In `frontend`, run `npm install` and `npm run dev` (Vite serves the site on port `3000` and proxies `/api` and `/uploads` to the backend).

The frontend uses the Vite `/api` proxy by default. Set `VITE_API_URL` to an absolute API base URL ending in `/api` when deploying the frontend and API on separate hosts.

## Validate changes

- Frontend production build: `cd frontend && npm run build`
- Frontend lint: `cd frontend && npm run lint`
- API readiness: `GET /api/health` reports whether MongoDB is connected.

The optional `npm run seed` command in `server` clears and repopulates several database collections. Only run it against a database that is safe to reset.