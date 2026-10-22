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
- Full Chromium regression suite across all 16 pages; latest audited counts and the exact commit are recorded in GitHub Actions → Frontend QA (620/620 passed at the fourth-page milestone)
- 1440px desktop, 820px tablet, standard mobile, 320px compact mobile
- Tests cover graphics, navigation, selectors, keyboard dismissal, reduced motion, accessibility, no-JS text readability, responsive overflow, robots policy and proposal link syntax
- Screenshots and HTML QA reports are available in the CI run artifacts

## Education — sixth cinematic industry landing page

The Education landing page at `/industries/education/` now has a **fictional campus and learning-business WebGL scene**. Its scroll-controlled narrative moves through DISCOVER → ENQUIRE → WELCOME → CONNECT. The dimensional world progressively reveals a model campus, general information cards, administrative welcome guidance and business handover signals; reverse scrolling reverses the phases.

- Reuses `assets/immersive-scene-kit.js`; the Education-specific 3D source is `industries/education/education-3d.js` and its cinematic styling in `education-3d.css`.
- Preserves the original `assets/education-connected.svg` as the no-JavaScript/no-WebGL fallback, existing keyboard-operable stage buttons, site pause/reduced-motion controls, browser-only three-question brief, FAQ, business package descriptions, proof placeholders and navigation.
- New `tests/education-cinematic.spec.cjs` verifies actual WebGL geometry/depth when available, forward/reverse scrolling, stage synchronization, keyboard selection, motion preferences, disabled WebGL and JavaScript-disabled content across four viewport profiles.
- The model is **not a real institution, school, university, accredited programme, LMS, teaching environment, application portal, student record, admissions decision or actual client commission**. No minor-identifying data, student information, learning outcomes or admissions claims are represented.
- Any real campus imagery, institution names, programme results, claimed integrations and testimonial evidence still require explicit authorization and review.
- Preview-only `noindex` and owner-managed production deployment are retained, with no client data transmission or new external dependencies.

## Healthcare — fifth cinematic industry landing page

The Healthcare page at `/industries/healthcare/` now has a **fictional, nonclinical WebGL reception scene** with four scroll-controlled stages: DISCOVER → ENQUIRE → FOLLOW UP → COORDINATE.

- A calm dimensional reception, public information signage, general enquiry cards, an illustrative administrative checklist and team handover cues progressively appear while scrolling. Reverse scrolling reverses the model progression.
- The visual environment is **not a real clinic, medical service, clinical workflow, patient portal, booking system, medical record, triage path or diagnosis/treatment service**. No patient stories or actual clinical outcomes are shown.
- Uses existing `assets/immersive-scene-kit.js`; page-specific WebGL geometry, motion and styles are `industries/healthcare/healthcare-3d.js` and `healthcare-3d.css`. No third-party 3D library or network service is introduced.
- Preserves the original `assets/healthcare-connected.svg` as no-JavaScript/no-WebGL fallback, and existing keyboard-operable journey controls, pause/reduced-motion settings, FAQ, external proposal link, proof placeholders and fixed-choice browser-only discussion brief.
- `tests/healthcare-cinematic.spec.cjs` adds cross-device native depth, bidirectional scroll, button/keyboard, paused/reduced-motion, blocked-WebGL and JavaScript-disabled regression checks.
- Any healthcare client photos, case-study evidence, practice details, pricing, actual integrations or health-related claims still require approval and privacy/security review.
- Preview `noindex` and owner-managed production deployment remain unchanged; no live enquiries or patient data are collected by this scene.

## Architecture — fourth cinematic industry landing page

The Architecture page at `/industries/architecture/` includes a **fictional blueprint-to-3D studio maquette** that moves through four scroll-controlled business chapters: DISCOVERY → BRIEF → PROPOSAL → COORDINATION.

- Starts with a technical-looking grid and plan lines, then introduces a 3D structural frame, building enclosure and abstract client/studio communication markers. These elements are visual metaphors, **not accurate construction drawings, architectural designs, client commissions, project records or completed works**.
- Uses the shared `assets/immersive-scene-kit.js`, with page-specific geometry and animation in `industries/architecture/architecture-3d.js` and editorial styling in `architecture-3d.css`.
- The cinematic hero and sticky scroll model retain the existing original `assets/architecture-studio.svg` illustration as a no-WebGL/no-JavaScript fallback. Reverse scrolling reverses the scene stages.
- Existing studio journey buttons, keyboard arrows, site motion settings, FAQ explaining technical-profession boundaries, package descriptions, case-study placeholders and browser-only brief generator remain in place.
- `tests/architecture-cinematic.spec.cjs` adds WebGL-depth checks, scroll forward/reverse, stage selection, reduced-motion, blocked-WebGL and disabled-JavaScript checks across all four viewport profiles.
- **Taamerat360's scoped role remains business growth, communication and operations**, not design authorship, building permitting, statutory approval, structural engineering or architectural professional practice.
- No CDN, external data transmission, real enquiry submission, live systems, verified outcomes or production deployment added. The page retains preview-only `noindex`.

## E-commerce — third cinematic industry landing page

The E-commerce landing page at `/industries/e-commerce/` now includes a stylized **native-WebGL product showcase**, with a reversible four-chapter scroll narrative: DISCOVER → CONSIDER → COORDINATE → FOLLOW THROUGH.

- A cinematic product-display hero shows fictional, unbranded sample merchandise. The original `assets/ecommerce-connected.svg` illustration remains the reliable fallback when WebGL or JavaScript is unavailable.
- In the sticky scroll scene, sample products progressively gain contextual information cards, a conceptual parcel and customer follow-up markers. This is **visual storytelling**, not a real product listing, functioning cart, checkout, payment service, order-tracking platform or fulfilment workflow.
- This is built with the existing reusable `assets/immersive-scene-kit.js`; the source is `industries/e-commerce/ecommerce-3d.js` and `ecommerce-3d.css`. No external rendering dependencies or customer records.
- Existing stage selectors with arrow-key navigation, the site motion toggle, the browser-only planning brief, package descriptions and evidence placeholders remain operational.
- Cross-device checks in `tests/ecommerce-cinematic.spec.cjs` cover WebGL geometry/depth, forward/back scroll, manual stage selection, reduced motion, blocked WebGL and JavaScript-off fallbacks.
- The scene does **not** claim an actual brand, product availability, customer reviews, conversion metrics, order handling or delivery service. Client proof and published integrations must be approved.
- This is the **third of eleven industry-specific 3D upgrades**, separate from the homepage and four business-need pages. Preview-only `noindex` and owner-managed production release remain unchanged.

## Real Estate — second cinematic industry landing page

The Real Estate landing page at `/industries/real-estate/` now uses a **fictional 3D property neighbourhood** with a four-chapter scroll sequence: DISCOVER → QUALIFY → VIEWING → FOLLOW THROUGH.

- Cinematic hero: a stylized property maquette in a dark editorial environment; the original connected-city illustration remains available without WebGL or JavaScript.
- Scroll narrative: a sticky interactive property scene progressively reveals customer-communication markers, viewing coordination and a clear follow-up concept; reverse scrolling reverses the progression.
- Built on the shared native-WebGL `assets/immersive-scene-kit.js`, with property-specific model and animation in `industries/real-estate/real-estate-3d.js` and styling in `real-estate-3d.css`.
- Existing keyboard journey buttons and site motion toggle update the scene, while the browser-only discussion brief, packages and case-study placeholders remain unchanged.
- New `tests/real-estate-cinematic.spec.cjs` covers genuine WebGL depth, scroll progress/reversal, manual stage controls, reduced motion, WebGL failure and disabled-JavaScript content across all four viewport profiles.
- The stylized model is **not a real listing, property for sale, available viewing, delivered client project, valuation or brokerage service**. Any future photography, listing names, results, testimonials and service commitments require owner/client permission.
- No external dependencies, personal-data storage, real transaction, contact form submission or production deployment are added. Preview-only `noindex` remains.

## Construction — first cinematic industry landing page

The Construction industry landing page at `/industries/construction/` now includes a **3D construction maquette**, with a scroll-controlled four-chapter storyline: FIND → SCOPE → COORDINATE → DELIVER. The geometric sequence progresses from groundwork and foundations to structural frame, crane/envelope and closing details. It is a **fictional visual metaphor for construction business communication**, not an engineering model, client project or claim that Taamerat360 performs construction.

- Hero: high-contrast cinematic environment with a dimensional construction model, while retaining the original SVG if rendering is unavailable.
- Scroll narrative: a sticky building scene and four complete text chapters, with a camera and building-assembly progression that can be reversed by scrolling upward.
- Existing manual stage buttons, site motion toggle, business brief, package cards and approved-evidence placeholders stay functional. The brief stays browser-only.
- Shared source: `assets/immersive-scene-kit.js` contains reusable low-level native-WebGL primitives (boxes, beams, camera matrices, lighting, rendering); construction-specific model and chapter logic are in `industries/construction/construction-3d.js`, with styles in `construction-3d.css`.
- Access: no external CDN and no user data transmission, keyboard support, explicit no-JavaScript/no-WebGL SVG fallback, reduced-motion/static controls, WebGL resource limits.
- QA: new `tests/construction-cinematic.spec.cjs` covers WebGL depth, scroll progress, reverse progress, manual stages, reduced motion, blocked WebGL and script-disabled fallback.
- This increment does **not** make all eleven industry pages cinematic. The remaining ten industries and four business-need pages retain their current non-3D presentations until individually upgraded.
- Publication remains preview-only `noindex`. Real projects, quotes, outcomes, client names and pricing still require approval.

## Immersive 3D homepage — first cinematic development increment

The homepage now uses a **procedural WebGL 3D ecosystem** in the hero and FIND → CONNECT → DELIVER section, with dimensional storefront, customer meeting, delivery modules and a shared orange spatial connection. Unlike the earlier SVG parallax, the new renderer uses perspective camera matrices, lit mesh geometry and depth testing. The journey camera interpolates between all three scenes according to real scroll position; existing chapter buttons can select scenes, and the site motion toggle pauses camera movement.

- Source: `cinematic-3d.js` and `cinematic-3d.css`, attached to homepage `index.html` and existing `app.js` events.
- Works without third-party JavaScript or CDN assets; there is **no Three.js dependency** in this initial lightweight prototype.
- Original accessible editorial SVGs and navigation remain available as the **WebGL-unavailable and no-JavaScript fallback**; on reduced-motion devices 3D shows a static frame with no continuous camera motion.
- New `tests/cinematic-homepage.spec.cjs` covers native rendering when available, no-WebGL fallback, chapter navigation, scroll movement and motion settings.
- This is **homepage cinematic foundation only**. It does not claim the 11 industry and four solution pages have received 3D scene upgrades, photorealistic assets or full reference-video motion fidelity.
- Maintain preview-only `noindex`, external form warnings, client proof placeholders and owner-managed deployment.

## Site-wide quality and release readiness

- The **16-page** structural and navigation audit covers the homepage, all eleven industries and all four business-need pages.
- The homepage default business-need CTA now opens Reach More Customers directly; all 15 landing pages have no-JavaScript fallback links.
- Expanded Playwright coverage validates all primary routes, initial selected states, accessibility-related structure, local assets and navigation.
- **Not yet approved for public launch:** real submitted-and-received proposal test, authorized client proof and scope, production access/deployment, privacy review, and indexing decision.
- See `docs/site-release-readiness.md` for the complete blocker register and suggested owner sign-off sequence.

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
5. Healthcare — source completed and merged; production previously quota-blocked.
6. Education — source completed, tested (292/292), and merged.
7. Banking & Fintech — source completed, tested (336/336), and merged.
8. Insurance — source completed, tested (380/380), and merged.
9. Telecom — source completed, tested (424/424), and merged.
10. Travel & Tourism — source completed, tested (468/468), and merged.
11. Ride Hailing — completed, tested (512/512 browser checks), and merged to `main`; original city-mobility illustration, accessible four-stage business journey, browser-only private brief and approved-evidence placeholders.

All 11 planned industry landing pages have been developed, browser-tested, and merged to GitHub `main`. This completes the industry-page development increment, not every live-website requirement. Production release is owner-managed; merging to GitHub is not deployment. See `DEPLOYMENT_HANDOFF.md` for ZIP export and manual launch instructions. Missing facts, proofs, claims, photos, pricing and integrations remain in `docs/industry-placeholder-register.md`.

## Business-need solution pages — editorial rollout

1. **Reach More Customers** — source at `/solutions/reach-more-customers/`: original static shop-to-customer illustration, visible problem/approach sequence, Lead Growth and Connected Growth options, approved-proof placeholder, and externally linked Request a Proposal. Built with readable no-script HTML and four-viewport QA.
2. **Move Sales Forward** — source at `/solutions/move-sales-forward/`: original illustrated sales conversation, three friction points, interactive keyboard-accessible four-stage follow-up journey with no-JS fallback, Sales Momentum and Connected Growth package directions, client-proof placeholders and external proposal links. Scope and CRM boundaries require written approval.
3. **Improve Customer Experience** — source at `/solutions/improve-customer-experience/`: original customer-and-service illustration, three communication friction points, accessible four-touchpoint explorer (discover, connect, continue, improve) with no-script fallback, Connected Growth and Business Efficiency package directions, verified-proof placeholder and externally linked proposal destination. Service channel and integration boundaries require approval.
4. **Simplify Business Operations** — source at `/solutions/simplify-business-operations/`: custom coordination illustration, three operational friction points, keyboard-accessible four-step request-to-review workflow explorer with no-JS fallback, Business Efficiency and Connected Growth package directions, client-proof placeholder and external proposal CTA. Workflow integrations and deliverables require separate approval.

All **four business-need pages** now have source implementations; they remain subject to full QA, client approvals, live-proposal receipt testing and owner-managed production publication. These business-need pages are distinct from the 11 completed industry pages. Public outcomes must not claim guaranteed leads, conversion lifts or client results; see `docs/solution-placeholder-register.md`. The existing external proposal page is not a verified submission integration.

## Current development & release boundaries

- The original ChatGPT-hosted website is separate from this GitHub repository.
- Vercel project `taamerat360.com` is linked to `main`. A merge into `main` can trigger a new deployment, subject to Vercel quotas.
- The website intentionally retains preview-only `noindex` and `robots.txt` restrictions. Remove these **only after** approved public-domain launch.
- External proposal links remain on the existing ChatGPT-hosted contact destination. An HTTP 200 response **does not verify a submitted enquiry**; an end-to-end test is still required.
- All 16 current site routes are included in the GitHub Actions regression checks; comprehensive sign-off and source/export status are tracked in `docs/site-release-readiness.md`.

## Boundaries
The illustration work uses original vector compositions rather than photorealistic 3D renders. No backend, lead database or email delivery service has been configured in this repository.
