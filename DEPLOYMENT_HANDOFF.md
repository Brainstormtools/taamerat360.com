# Taamerat360 — Source handoff and manual deployment

This repository is the complete source for the independently hosted Taamerat360 website preview. **GitHub is the source of truth. The website owner controls production deployment.** ChatGPT may develop, test, commit and push to GitHub, but must not initiate Vercel production deployments unless the owner explicitly changes that instruction.

## Download a complete ZIP

- Open GitHub Actions → **Export Website Source** → latest successful `main` run.
- Download the **taamerat360-complete-source** artifact. It contains `Taamerat360-Complete-Website.zip`.
- Extract the inner ZIP. Its root contains `index.html`, `app.js`, `styles.css`, `assets/`, `industries/`, tests and documentation.
- Alternatively, use GitHub's **Code → Download ZIP** on branch `main`. Both exports come from the same tracked repository when taken from the same commit.

## How to deploy

1. **If using the existing connected Vercel project:** Check that Vercel imports `Brainstormtools/taamerat360.com`, branch `main`, root `./`, framework preset `Other`. Click Deploy or Redeploy only when ready and when Vercel's quota permits. No build step is required for this static site.
2. **If using a new GitHub repository:** Unzip the downloaded archive, create an empty repository, place the unzipped **contents** (not the ZIP file itself) in its root, and commit/push them. Connect that repository to your hosting service.
3. **If deploying manually to static hosting:** Upload the extracted root files and folders, preserving the relative directory layout. The site must serve `index.html` and its `assets/` and `industries/` paths.

**Windows PowerShell, for an existing Git repository:**
```powershell
git switch main
git pull origin main
# After you add any local updates to the repository:
git add .
git commit -m "Update Taamerat360 website"
git push origin main
```
If you already use the repository's `main`, do not upload a duplicate ZIP over the existing source; it already contains the committed files.

## Current industry delivery status

- Developed and merged to GitHub `main`: Construction, Real Estate, E-commerce, Architecture, Healthcare, Education (6 of 11).
- Last independently confirmed production deployment: Architecture version, commit `66cdada5`.
- Healthcare and Education source are merged into GitHub `main`, but the latest production deployment is not independently verified. The previous Healthcare Vercel deploy was blocked by the daily free quota; the site owner will manually deploy the current `main` commit when ready.
- The next planned industry is Banking & Fintech. Five industry landing pages remain.

## Before launching publicly

- Every page intentionally uses preview-only `noindex, nofollow`; review this and `robots.txt` when publication is approved.
- Vercel Authentication has been enabled on preview access. Verify anonymous public access if needed.
- Proposals currently link to the original ChatGPT-hosted contact page; HTTP 200 does **not** prove submissions are delivered. Conduct a real submission test.
- Use `docs/industry-placeholder-register.md` to replace unverified case-study content, outcomes, photos, client quotes and service details. Do not invent claims.
- Healthcare landing page describes nonclinical administrative business processes; do not use it to collect patient/medical details or assume security approval for clinical integrations.
- Keep this website separate from the independent `crm.imanservice.com` repository.
