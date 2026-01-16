# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Algarve Newsletter is a landing page for a weekly email newsletter about the Algarve region of Portugal. The goal is to convert visitors into email subscribers via MailerLite integration. The newsletter positions itself as "the local friend who knows where to go" - curated, authentic recommendations for tourists, expats, and residents.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start development server (Vite)
npm run build  # Production build
npm run preview # Preview production build locally
```

## Architecture

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + React Router

**Routing (App.tsx):**
- `/` → LandingPage
- `/thank-you` → Post-subscription confirmation
- `/privacy`, `/terms`, `/contact` → Legal/support pages

**Key Patterns:**

1. **Email Capture Flow:** Hero.tsx and NewsletterSignup.tsx both call `subscribeToNewsletter()` from `services/mailerLite.ts`, then redirect to ThankYou page

2. **Analytics:** Facebook Pixel (`fbq`) and Google Analytics (`gtag`) are used. `services/analytics.ts` provides `trackLead()` and `trackEvent()` helpers

3. **Content Data:** All static content (features, testimonials, categories, events) lives in `constants.tsx` with types defined in `types.ts`

4. **Visual Sections:** Landing page uses CurvedSeparator.tsx between sections for wave-like transitions. Main color palette: teal (#004E55, #006D77)

## Project Context Files

- `Algarve-newsletter-concept.md` - Editorial vision, target audience, monetization strategy
- `Newsletter-structure.md` - 9-section template for each weekly newsletter issue
