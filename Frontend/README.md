# NEXORA Talent Solutions — React Website

Premium responsive recruitment website for NEXORA Talent Solutions.

## Included
- React + Vite
- React Router
- React Helmet Async SEO
- 10 responsive pages
- Employer and candidate forms
- WhatsApp CTAs
- Responsive mobile navigation
- SEO metadata, canonical URLs, robots.txt and sitemap.xml
- Apache `.htaccess` for React SPA routing, HTTPS, compression and caching
- Accessibility/focus and reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
```

Upload the generated `dist/` contents to Hostinger `public_html`.

## Important

The forms are currently front-end demo forms. Connect them to your backend/Formspree/API before launch if you need real submissions and private CV storage.

Replace the placeholder company phone, email, WhatsApp number and domain in `src/data/siteData.js` / `src/components/SEO.jsx` with the final business details.

The React `ReferenceError: React is not defined` issue is addressed by explicit React imports in all JSX modules and a clean `App.jsx`.
