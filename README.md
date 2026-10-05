# Flyhirre Talent Solutions — Full Stack Setup

This package contains three apps:

- `Frontend` — public Flyhirre recruitment website
- `Backend` — Express + MongoDB API, authentication and file uploads
- `Admin` — secure React admin dashboard for candidates, employers and contact enquiries

## Data flow

Public Candidate Form → Backend API → MongoDB Atlas → Admin Dashboard
Public Employer Form + Company Documents → Backend API → MongoDB Atlas → Admin Dashboard

## 1. Backend

Open a terminal in `Backend`:

```bash
npm install
```

Create `.env` from `.env.example` and add your existing MongoDB Atlas URI and JWT secret.

For admin login, also set:

```env
ADMIN_NAME=Flyhirre Admin
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-strong-admin-password
```

Create the admin account once:

```bash
npm run create-admin
```

Then start the API:

```bash
npm run dev
```

API: `http://localhost:5000`

Health check: `http://localhost:5000/api/health`

Uploaded CVs and company verification documents are stored locally in `Backend/uploads` during development. For production, move private documents to a protected object-storage solution.

## 2. Frontend

Open another terminal in `Frontend`:

```bash
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start:

```bash
npm run dev
```

The public site will normally run at `http://localhost:5173`.

## 3. Admin

Open another terminal in `Admin`:

```bash
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start:

```bash
npm run dev
```

The admin dashboard runs at `http://localhost:5174`.

## Candidate submission

The candidate form stores:

- Full name
- Email
- Phone
- Current location
- Total experience
- Current / previous role
- Industry
- Employment preference
- Preferred location
- LinkedIn profile
- Availability
- Additional information
- CV / Resume (PDF, DOC or DOCX, max 5 MB)

Admin can review the profile, open the CV and change status between New, Reviewing, Shortlisted, Contacted, Rejected and Hired.

## Employer submission and verification

The employer form stores:

- Full name
- Company name
- Work email
- Phone
- Industry
- Recruitment type
- Hiring function
- Number of positions
- Requirement details

It also accepts company verification documents:

- Company Registration / Incorporation Certificate
- GST Certificate
- Company PAN
- Authorisation / Other Company Document

At least one company document is required. Each document can be PDF, JPG, PNG or WEBP up to 10 MB.

Admin can review the documents and set both the recruitment status and verification status.

## Security notes

- Never commit `.env` files.
- Never put MongoDB passwords in React code.
- Rotate any database password that has been exposed in screenshots or chats.
- Keep MongoDB IP access limited to the development machine/server IPs.
- For production, use protected/private document storage instead of public local uploads.
