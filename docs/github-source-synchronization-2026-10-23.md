# Taamerat360 — GitHub source synchronization audit

**Audit performed:** 23 October 2026 (Asia/Karachi)  
**Repository:** [Brainstormtools/taamerat360.com](https://github.com/Brainstormtools/taamerat360.com)  
**Independently verified website source baseline:** `main` at `d66b71c6f4fe8819c18dd683ec290a83984f3f61`  
**Scope:** complete website repository and the matching owner handoff ZIP. Documentation status corrections made after this snapshot do not alter these baseline results.

## Verified results

| Item | Verified result |
|---|---|
| GitHub `main` vs final complete website ZIP | Exact path **and Git blob SHA-1** match for **133/133 files** |
| GitHub recursive tree | 155 total entries (133 regular tracked files plus directory entries); not truncated |
| Handoff ZIP | Archive integrity checked with no corrupt entries |
| Source commit | `SOURCE_COMMIT.txt` exactly matched the above `main` SHA |
| Inner source ZIP SHA-256 | `fbdbfbea85324208c55a624660ccb900d608f4f42fe4787cec7b55feb57ff9af` |
| Checksum | Matched `SHA256SUMS.txt` in the successful `main` export |
| Page inventory | **16 HTML pages**: one homepage + **11 industry** + **4 Business Need** |
| Industry WebGL upgrades | **11 of 11** page-specific `-3d.js` scripts included in `main` |
| Business Need pages | All four HTML/CSS/JS editorial experiences included in `main`; page-specific cinematic 3D scenes remain a separate development phase |
| Full frontend browser QA | **968/968 passed** in [successful `main` run 39859970649](https://github.com/Brainstormtools/taamerat360.com/actions/runs/39859970649) |
| Source export | [Successful `main` run 39859970678](https://github.com/Brainstormtools/taamerat360.com/actions/runs/39859970678) |
| Four device profiles | 1440px desktop, 820px tablet, standard mobile, compact 320px mobile |
| Static local links and assets | **0** missing files and **0** unresolved HTML local fragments across 16 pages |
| HTML element IDs | **0** duplicates across audited documents |
| Preview indexing policy | All 16 pages have `noindex`; root `robots.txt` disallows indexing |
| Open pull requests at baseline | **0** |

### Exact Git tree reconciliation method

1. Download the successful `Export Website Source` artifact **for the chosen merged `main` commit**.
2. Open the outer ZIP and compare its `SOURCE_COMMIT.txt` with GitHub's `refs/heads/main` SHA.
3. Verify the SHA-256 of the inner `Taamerat360-Complete-Website.zip` against the outer `SHA256SUMS.txt`.
4. Extract the inner ZIP and enumerate regular files; compute a Git content SHA-1 for each file using `SHA1("blob " + byteLength + NUL + rawBytes)`.
5. Retrieve GitHub `git/trees/main?recursive=1`, reject a truncated tree, and compare all file paths and blob hashes exactly. The baseline yielded **133/133 exact matches**.
6. Run/inspect the `Frontend QA` job on the matching `main` commit. Only the exact recorded commit has a verified result; an additional push needs a new result.
7. For static HTML, validate that referenced internal sources and fragments exist; check for duplicate IDs and keep preview policy in place.

## Synchronization and the remaining work

No duplicate website source upload was necessary: the complete site ZIP and GitHub `main` already matched before this documentation refresh. The records in README, the industry/content placeholder register, the Business Need placeholder register, release-readiness guide and deployment handoff were refreshed to remove stale historical QA and pending-merge language.

**Important distinctions:**

- **Merged source is not the same as deployment.** The owner controls intended production publication. Existing GitHub-to-Vercel integration settings may trigger an automatic build or deployment on pushes; review hosting settings independently.
- **Source completeness does not validate client content.** Approved case studies, photos, testimonials, quantified results, offers, pricing, licensed claims and all related evidence remain pending.
- **Browser QA does not prove lead receipt.** Existing CTAs open a separately hosted contact page; a real, owner-authorized submitted-and-received test is still required.
- **The four Business Need pages are present but do not yet have their own cinematic 3D upgrades.** Do not confuse editorial page delivery with an immersive-design sign-off.
- **Preview `noindex` must remain** until the owner approves public indexing and release conditions.
- Do not change or deploy any independent `crm.imanservice.com` project as part of this repository update.

## Source of truth

The GitHub `main` branch is the canonical website source. For the newest exact source package, use GitHub **Actions → Export Website Source → latest successful run on `main`**, check `SOURCE_COMMIT.txt` and `SHA256SUMS.txt`, and download the inner complete-site ZIP. Follow `DEPLOYMENT_HANDOFF.md` for owner-controlled release steps.

This report is an independently checked source snapshot, not a claim of legal, commercial, security or live-production readiness.
