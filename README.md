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

## Release state — October 21, 2026
- GitHub main is ahead of the Vercel alias: Vercel has reached its free-deployment daily quota and refused a manual deploy with HTTP 402, resource `api-deployments-free-per-day`, retry after 86400 seconds.
- The newer website files, tests, metadata, preview-only robots rule and security header configuration are committed to GitHub but **not yet confirmed deployed**.
- **Do not treat the old Vercel alias as the newest preview until its commit SHA matches main.**
- Preview deliberately has `noindex, nofollow` and `robots.txt` disallowing crawlers. Remove and replace these before public production launch.
- The original contact destination has been observed returning HTTP 200; actual successful enquiry submission still requires a real end-to-end test.

## Before public launch
1. When Vercel quota resets, deploy the latest commit and verify that the project alias serves the exact SHA.
2. Verify production response headers, source artwork, menu behavior and contact URLs against the deployed site.
3. Remove preview indexing restrictions; add the approved production domain canonical and public crawl policy.
4. Complete at least one real user-led proposal submission and verify it is received by the business.
5. Review launch domain/branding and approve the final public cutover. No paid changes are authorized here.

## Boundaries
The illustration work uses original vector compositions rather than photorealistic 3D renders. No backend, lead database or email delivery service has been configured in this repository.
