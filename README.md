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

## Source ZIP and owner-managed release

The complete website can be downloaded after a push to `main` from **Actions → Export Website Source → taamerat360-complete-source**. Extract the artifact, then extract the inner `Taamerat360-Complete-Website.zip`. See `DEPLOYMENT_HANDOFF.md` for manual GitHub and hosting steps.

**Release ownership:** Development, tests and source pushes remain on GitHub; the website owner initiates Vercel/production deployments. Pushing to an auto-connected hosting provider may still trigger its configured auto-deploy integration.

## Local use
This is a static site; serve from the repository root with `python3 -m http.server 8000`, then open `http://localhost:8000`.
To run QA, install Node.js and dependencies listed in the workflow and run `npx playwright test`.

## Industry landing pages — one at a time

1. Construction — source completed and merged.
2. Real Estate — source completed and merged.
3. E-commerce — source completed and merged.
4. Architecture — source completed and merged.
5. Healthcare — source completed and merged; production was previously quota-blocked.
6. Education — source completed, tested (292/292), and merged.
7. Banking & Fintech — completed, tested (336/336 browser checks), and merged to `main`; original artwork, four-stage non-transactional business journey, fixed-choice private brief, evidence placeholders and responsible finance-service boundaries.
8–11. Insurance, Telecom, Travel & Tourism, Ride Hailing — pending (4 industries remain).

The repository is the development source of truth. The website owner initiates any production deployment. A GitHub merge does **not** confirm the live site is updated. Download handoff packages via the Export Website Source workflow; see `DEPLOYMENT_HANDOFF.md`. Approved client proof, images, scope, sector-specific compliance checks and testimonials remain tracked in `docs/industry-placeholder-register.md`.

## Current development & release boundaries

- The original ChatGPT-hosted website is separate from this GitHub repository.
- Vercel project `taamerat360.com` is linked to `main`. A merge into `main` can trigger a new deployment, subject to Vercel quotas.
- The website intentionally retains preview-only `noindex` and `robots.txt` restrictions. Remove these **only after** approved public-domain launch.
- External proposal links remain on the existing ChatGPT-hosted contact destination. An HTTP 200 response **does not verify a submitted enquiry**; an end-to-end test is still required.
- The latest construction PR uses GitHub Actions cross-device browser checks, accessibility scans, JavaScript-disabled readability checks and screenshot artifacts.

## Boundaries
The illustration work uses original vector compositions rather than photorealistic 3D renders. No backend, lead database or email delivery service has been configured in this repository.
