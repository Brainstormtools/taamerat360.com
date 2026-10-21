const { test, expect } = require('@playwright/test');
const path = '/industries/construction/';
const isMenuLayout = () => test.info().project.name !== 'desktop-chromium';

test('industry directory links directly to Construction landing page', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('#industry-action');
  await expect(link).toHaveAttribute('href', './industries/construction/');
  await link.click();
  await expect(page).toHaveURL(/\/industries\/construction\/$/);
  await expect(page.locator('h1')).toContainText('Built to');
});

test('Construction page loads all sections without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(path);
  await expect(page.locator('h1')).toContainText('move forward.');
  for (const id of ['challenges', 'workflow', 'solutions', 'proof', 'brief']) await expect(page.locator('#'+id)).toHaveCount(1);
  await expect.poll(() => page.locator('.c-building').evaluate(im => im.complete && im.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.c-placeholder-flag')).toContainText('CONTENT PLACEHOLDER');
  expect(errors).toEqual([]);
});

test('construction workflow chooser responds to click and arrow keys', async ({ page }) => {
  await page.goto(path);
  await page.locator('[data-stage="scope"]').click();
  await expect(page.locator('#stage-title')).toHaveText('Turn conversations into clarity.');
  await expect(page.locator('#stage-counter')).toHaveText('2 OF 4');
  await expect(page.locator('#stage-path')).toHaveAttribute('stroke-dashoffset', '49');
  await page.locator('[data-stage="coordinate"]').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('[data-stage="handover"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#stage-title')).toHaveText('Finish with a clear handover.');
});

test('browser-only brief builder creates useful selectable summary', async ({ page }) => {
  await page.goto(path);
  await expect(page.locator('#copy-brief')).toBeDisabled();
  await page.locator('#construction-role').selectOption('Specialist subcontractor');
  await page.locator('#construction-bottleneck').selectOption('Following up on quotations');
  await page.locator('#construction-priority').selectOption('Sales visibility and follow-up');
  await page.locator('.c-brief-create').click();
  await expect(page.locator('#brief-result-title')).toHaveText('Your next step, in focus.');
  await expect(page.locator('#copy-brief')).toBeEnabled();
  await expect(page.locator('#brief-result-text')).toContainText('Specialist subcontractor');
  await expect(page.locator('#brief-result-text')).toContainText('Following up on quotations');
  await expect(page.locator('#brief-result-text')).toContainText('Scope, timeline, budget, responsibilities and deliverables: To be agreed');
  await page.locator('#construction-role').selectOption('General contractor');
  await expect(page.locator('#copy-brief')).toBeDisabled();
  await expect(page.locator('#brief-result-text')).toBeHidden();
});

test('industry page has a working accessible mobile/tablet menu', async ({ page }) => {
  await page.goto(path);
  const toggle = page.locator('.nav-toggle');
  if (isMenuLayout()) {
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded','true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded','false');
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.locator('#nav-links a[href="#workflow"]').click();
    await expect(page).toHaveURL(/#workflow/);
    await expect(toggle).toHaveAttribute('aria-expanded','false');
  } else {
    await expect(toggle).toBeHidden();
    await expect(page.locator('.nav-links')).toBeVisible();
  }
});

test('industry page has no horizontal overflow and renders full-page snapshot', async ({ page }) => {
  await page.goto(path);
  await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2)).toBe(true);
  require('node:fs').mkdirSync('screenshots', {recursive: true});
  await page.screenshot({ path: 'screenshots/construction-' + test.info().project.name + '.png', fullPage: true });
});

test('construction page retains full content when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({javaScriptEnabled: false, viewport: {width: 400, height: 800}});
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173' + path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#proof')).toContainText('[Verified project title]');
    await expect(page.locator('#workflow')).toContainText('Make every enquiry count.');
  } finally {await context.close()}
});

test('construction page retains a safe proposal link and preview crawl policy', async ({page}) => {
  await page.goto(path);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
  const links = await page.locator('a[href*="/contact-us/"]').all();
  expect(links.length).toBeGreaterThanOrEqual(2);
  for (const link of links) {
    await expect(link).toHaveAttribute('target','_blank');
    await expect(link).toHaveAttribute('rel',/noopener/);
  }
});

test('construction page WCAG 2.1 serious/critical scan', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(path);
  const AxeBuilder=require('@axe-core/playwright').default;
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  const serious=results.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
  console.log('Construction accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
  expect(serious).toEqual([]);
});
