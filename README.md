# Zoom Mobile Website

Modern single-page website for Zoom Mobile Solutions Sdn Bhd.

## Overview

This project is a React + Vite frontend for the renewed Zoom Mobile corporate website. It includes:

- Hero section with looping video background, global particle effects, and interactive title effect
- Partners & Clients section
- ZM eKYC AI product section with animated AI face recognition, OCR, and verification flow
- About section with company, mission, strength, and team content
- Contact Us section and company footer

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Motion
- Lucide React
- Lenis

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
    background_gif.mp4
    clientpartner.gif
    ZM_logo.png
    partners/
src/
  components/
    AnimatedCounter.tsx
    HeroLoopVideo.tsx
    HeroParticles.tsx
    HeroTitle.tsx
    TimelineSection.tsx
  App.tsx
  index.css
  main.tsx
```

## Notes

- Static website assets live in `public/assets`.
- The hero video lives in `public/assets/background_gif.mp4`.
- Build output is generated in `dist` and is not committed.
