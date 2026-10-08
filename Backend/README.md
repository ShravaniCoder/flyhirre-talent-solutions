# Flyhirre Talent Solutions — Backend

Backend API for the Flyhirre Recruitment and Talent Solutions website and admin dashboard.

## Main API

- `POST /api/candidates`
- `GET /api/candidates` — admin only
- `PATCH /api/candidates/:id` — admin only
- `POST /api/employers`
- `GET /api/employers` — admin only
- `PATCH /api/employers/:id` — admin only
- `POST /api/contact`
- `GET /api/contact` — admin only
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me` — authenticated
- `GET /api/admin/dashboard` — admin only
- `GET /api/health`

## New industry/role fields

Candidate submissions now save:

- `industry`
- `candidateRole`

Employer submissions now save:

- `industry`
- `hiringRole`

The backend validates that the selected role belongs to the selected industry.

For backward compatibility with the existing admin application, new employer submissions also copy:

`hiringRole -> hiringFunction`

Older employer records containing `hiringFunction` remain readable.

## File uploads

Candidate CV:

- PDF, DOC, DOCX
- Maximum 5 MB
- Stored in `uploads/candidates`

Employer verification documents:

- PDF, JPG, JPEG, PNG, WEBP
- Maximum 10 MB per file
- Maximum 4 files
- Stored in `uploads/employers`

## Local setup

```bash
npm install
```

Create `.env` from `.env.example` and set:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
PORT=5000
```

Start development server:

```bash
npm run dev
```

Production:

```bash
npm start
```

Create an admin user:

```bash
npm run create-admin
```

## Important

Do not commit `.env` or MongoDB credentials to GitHub.
