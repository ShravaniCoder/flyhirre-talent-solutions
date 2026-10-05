# Flyhirre Backend

Express + MongoDB API for the public website and admin dashboard.

## Main endpoints

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/admin/dashboard` (admin)
- `POST /api/candidates` (public)
- `GET /api/candidates` (admin)
- `PATCH /api/candidates/:id` (admin)
- `POST /api/employers` (public)
- `GET /api/employers` (admin)
- `PATCH /api/employers/:id` (admin)
- `POST /api/contact` (public)
- `GET /api/contact` (admin)
- `GET /api/health`

## Setup

```bash
npm install
```

Create `.env` from `.env.example`, then create the admin:

```bash
npm run create-admin
```

Run:

```bash
npm run dev
```
