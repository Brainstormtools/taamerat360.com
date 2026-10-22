# Taamerat360 — Source audit and launch-readiness register

**Historical audit scope:** all-four-solutions source baseline `f8b03a331e64f3812b33daf63f2a383ae09cff99` and subsequent sitewide-readiness improvements. **Latest verified source parity baseline:** `d66b71c6f4fe8819c18dd683ec290a83984f3f61` on 23 October 2026.

**Release distinction:** Source-complete, browser-tested, and GitHub-merged are **not** synonyms for production-deployed, legally approved, integrated or verified lead delivery. The website owner controls live deployment. An automatic deploy may still be triggered by the owner's existing GitHub-to-hosting integration.

## Inventory

- Home: /
- 11 industry pages under /industries/: Architecture, Banking & Fintech, Construction, E-commerce, Education, Healthcare, Insurance, Real Estate, Ride Hailing, Telecom, Travel & Tourism.
- Four business-need pages under /solutions/: Reach More Customers, Move Sales Forward, Improve Customer Experience, Simplify Business Operations.
- **Total: 16 HTML pages.** All use preview-only noindex, nofollow; root robots.txt denies indexing.
- Latest verified eleven-industry baseline: **968/968 browser checks passed** across four Chromium viewport profiles in [Frontend QA run 39859970649](https://github.com/Brainstormtools/taamerat360.com/actions/runs/39859970649). Earlier fourth-page milestone was 620/620 against PR #19. Always consult the newest run for commits after the baseline.
- Site does not host a validated enquiry-submission backend. Proposal CTAs use an **external, separately hosted** /contact-us/ page. An HTTP 200 response does not demonstrate that a submitted enquiry is received.

## GitHub source synchronization — 23 October 2026

- On `main` at `d66b71c6f4fe8819c18dd683ec290a83984f3f61`, the 133 Git tracked-file paths and content blob SHA-1s **exactly matched** the complete website ZIP exported for that commit.
- The exported nested ZIP matched `SHA256SUMS.txt` (`fbdbfbea85324208c55a624660ccb900d608f4f42fe4787cec7b55feb57ff9af`); the export's `SOURCE_COMMIT.txt` matched `main`.
- Static HTML audit: **16 pages**, **zero** missing internal static assets, **zero** unresolved local page fragments, **zero** duplicate IDs, and **zero** missing `noindex` directives.
- Source and tests are synced; no re-upload of duplicate website code was necessary. Documentation statuses were corrected to distinguish completed GitHub source from pending Business Need cinematic upgrades and owner/client launch gates.
- This is a version-specific snapshot, not a statement that every future commit or a live hosting deployment has been independently checked. See `docs/github-source-synchronization-2026-10-23.md`.

## Source-level audit findings and repairs

| Finding | Verification | Resolution |
|---|---|---|
| Homepage default lead selection linked to the generic packages section instead of its finished page | Initially selected option and CTA destination disagreed | Set initial CTA to Reach More Customers, with matching copy; regression coverage |
| Homepage's four business-need and eleven industry selectors required JavaScript | Selected-state buttons did not provide alternative destinations when scripting was off | Added accessible noscript links to **all 15 pages** and hid inactive buttons in that case |
| No comprehensive structural audit of every route in one suite | Previous suites focused on each landing page independently | Added automated 16-page metadata, IDs, links, indexing, asset and cross-page navigation checks |
| Internal references and local asset paths | Locally parsed all 16 HTML pages | **No missing static local files, broken static anchor destinations or duplicate IDs observed** |
| Privacy and marketing publication state | Reviewed CTA destinations, preview policy and evidence placeholders | Kept placeholders and noindex; release sign-offs remain blocked as below |

These checks do not replace real-browser visual sign-off for each device, manual business acceptance, vulnerability assessment, compliance review or end-to-end submission validation.

## Launch blockers — owner or client decisions or live testing required

| Priority | Gate | Evidence required | Status |
|---|---|---|---|
| P0 | Real proposals received | Authorized tester submits a real enquiry through the external form; recipient confirms receipt, metadata, and consent expectations | **Not verified** |
| P0 | Release target and access | Owner verifies deployed production commit, domain/DNS/HTTPS, permissions and public access; remove Vercel Authentication only if intended | **Not verified** |
| P0 | Public indexing decision | Owner authorizes replacing 16 page-level noindex tags and robots.txt **only after** content, destination and domain are ready | **Preview-only** |
| P0 | Accurate service scope | Confirm four package scopes, named deliverables, exclusions, timelines, support commitments, prices if public, and integrations offered | **Approval pending** |
| P0 | Client evidence, licensing, factual claims | Written permission for client examples, logos, case studies, imagery, testimonials, conversion statistics, cost/time savings | **Placeholders remain** |
| P1 | Privacy and contact-handling policy | Document personal-data flow for external form, retention, authorized recipients, consent, privacy notice and any analytics/cookies | **Owner review required** |
| P1 | Sector-specific reviews | Verify healthcare/finance/insurance and other regulated descriptions do not imply unsupported authorizations, processing or compliance | **Owner review required** |
| P1 | Device and visual acceptance | Owner/client reviews real devices and screen readers, link journeys, imagery and contrast on **deployed** commit | **Production acceptance pending** |
| P1 | Search/SEO post-approval | Approved titles, descriptions, canonical/domain strategy, indexing, social imagery and monitoring once public | **Intentionally deferred** |
| P2 | Operations after launch | Agree broken-link monitoring, updates, ownership of content approvals and incident/enquiry response process | **Not configured** |

## Recommended release sequence

1. Complete client-owned content and proof approvals; keep missing data visibly marked rather than inventing it.
2. Run an actual, authorized submitted-and-received test on intended proposal destination; clarify who handles personal information.
3. Confirm whether final contact page should remain externally hosted or move to production domain. If it changes, implement and retest all cross-site CTAs.
4. Have website owner deploy chosen verified GitHub main commit or complete-source ZIP to intended hosting project; confirm deployed commit and access.
5. Perform live-device and basic accessibility/security checks on deployed site, then approve any indexing/public-domain changes.
6. Publish only after approvals; record release commit and repeatable rollback plan.

## Source export

GitHub Actions → **Export Website Source** → taamerat360-complete-source. Download successful workflow artifact for the **merged main commit**; extract inner Taamerat360-Complete-Website.zip. Compare its SHA-256 with SHA256SUMS.txt and its commit to SOURCE_COMMIT.txt.

This document is a source audit and acceptance register, **not** a claim of complete commercial, legal, production or integration readiness.
