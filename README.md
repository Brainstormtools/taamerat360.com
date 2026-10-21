# Taamerat360 — Business, connected.

This repository contains the independent Taamerat360 interactive website preview. The original ChatGPT-hosted site is not changed by edits to this repository.

## Experience
- Responsive FIND → CONNECT → DELIVER scene journey with self-hosted SVG artwork
- Scroll-linked chapter switching, animated orange connector, pointer micro-parallax
- Four packages, a business challenge recommender, and eleven-industry selector
- Keyboard-operable navigation and motion controls, including reduced-motion support
- Direct links to the original ChatGPT-hosted proposal page (no unverified form submission is claimed)

## Testing
GitHub Actions: `Frontend QA` (`.github/workflows/frontend-qa.yml`)
- **44 automated Chromium checks passing** at commit `cc81e40a`
- 1440px desktop, 820px tablet, standard mobile, 320px compact mobile
- Tests cover graphics, navigation, selectors, keyboard dismissal, reduced motion, accessibility, no-JS text readability, responsive overflow, robots policy and proposal link syntax
- Screenshots and HTML QA reports are available in the CI run artifacts

## Local use
This is a static site; serve from the repository root with `python3 -m http.server 8000`, then open `http://localhost:8000`.
To run QA, install Node.js and dependencies listed in the workflow and run `npx playwright test`.

## Industry landing pages — one at a time

1. **Construction** — deployed with a project workflow, original art and explicit evidence placeholders.
2. **Real Estate** — deployed with a property-client journey, original art and explicit evidence placeholders.
3. **E-commerce** — deployed with customer-journey controls, original art and a local starting brief.
4. **Architecture** — built on the `feature/industry-architecture` development branch, with a distinctive studio visual, client-brief workflow, local starting brief and an FAQ about service boundaries.
5–11. **Remaining industries** — not yet developed.

The site keeps a shared record of missing case study images, approved results, testimonials and service details under `docs/industry-placeholder-register.md`. Unverified business information is never invented. The contact form remains an external destination requiring a real end-to-end submission test.

## Current development & release boundaries

- The original ChatGPT-hosted website is separate from this GitHub repository.
- Vercel project `taamerat360.com` is linked to `main`. A merge into `main` can trigger a new deployment, subject to Vercel quotas.
- The website intentionally retains preview-only `noindex` and `robots.txt` restrictions. Remove these **only after** approved public-domain launch.
- External proposal links remain on the existing ChatGPT-hosted contact destination. An HTTP 200 response **does not verify a submitted enquiry**; an end-to-end test is still required.
- The latest construction PR uses GitHub Actions cross-device browser checks, accessibility scans, JavaScript-disabled readability checks and screenshot artifacts.

## Boundaries
The illustration work uses original vector compositions rather than photorealistic 3D renders. No backend, lead database or email delivery service has been configured in this repository.
