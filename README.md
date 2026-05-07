# Zoom Mobile Website

Modern single-page website for Zoom Mobile Solutions Sdn Bhd.

## Overview

This project is a React + Vite frontend for the renewed Zoom Mobile corporate website. It includes:

- Hero section with animated background and interactive title effect
- Partners & Clients section
- Portfolio showcase using the original company project screenshots
- About section with company, mission, strength, and team content
- Contact Us section and company footer

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Motion
- Lucide React

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run TypeScript checks:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
public/
  assets/
    background.png
    clientpartner.gif
    ZM_logo.png
    portfolio/
src/
  App.tsx
  index.css
  main.tsx
```

## Notes

- Static website assets live in `public/assets`.
- Portfolio images live in `public/assets/portfolio`.
- Build output is generated in `dist` and is not committed.
