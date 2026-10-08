# Flyhirre Admin Dashboard — Updated

This Admin dashboard is updated for the new Flyhirre recruitment form fields.

## New fields supported

### Candidates
- `industry`
- `candidateRole`

The candidate table, search, and detail modal display `candidateRole` and fall back to `currentRole` for older records.

### Employers
- `industry`
- `hiringRole`

The employer table, search, and detail modal display `hiringRole` and fall back to the older `hiringFunction` field for existing records.

## API configuration

Create `.env` from `.env.example` and set:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

For local development:

```env
VITE_API_URL=http://localhost:5000/api
```

## Install and run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production files are generated in `dist/`.
