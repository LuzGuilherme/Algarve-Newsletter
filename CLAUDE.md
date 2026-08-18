# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Algarve Newsletter is a landing page for a weekly email newsletter about the Algarve region of Portugal. The goal is to convert visitors into email subscribers via MailerLite integration. The newsletter positions itself as "the local friend who knows where to go" - curated, authentic recommendations for tourists, international residents, and locals.

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

1. **Email Capture Flow:** every form calls `subscribeToNewsletter(email, source)` from
   `shared/services/mailerLite.ts`, then redirects to the ThankYou page. Since 2026-08-18 that
   function posts to the Algarve Atlas API (`/api/v1/newsletter/subscribe`) instead of talking to
   MailerLite directly, because Vite inlines every `VITE_*` value into the public bundle and the
   MailerLite key was readable by anyone. Never put an API key in a `VITE_*` variable. Each call
   site passes its own `source` (landing_hero, blog_inline, blog_exit_intent, ...), which lands in
   the MailerLite `signup_source` field and is how subscriber attribution is measured.

2. **Analytics:** Facebook Pixel (`fbq`) and Google Analytics (`gtag`) are used. `services/analytics.ts` provides `trackLead()` and `trackEvent()` helpers

3. **Content Data:** All static content (features, testimonials, categories, events) lives in `constants.tsx` with types defined in `types.ts`

4. **Visual Sections:** Landing page uses CurvedSeparator.tsx between sections for wave-like transitions. Main color palette: teal (#004E55, #006D77)

## Project Context Files

- `Algarve-newsletter-concept.md` - Editorial vision, target audience, monetization strategy
- `Newsletter-structure.md` - 9-section template for each weekly newsletter issue
