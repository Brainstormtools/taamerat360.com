const { test, expect } = require('@playwright/test');
const MOBILE = () => test.info().project.name.includes('mobile');
const MENU = () => MOBILE() || test.info().project.name.includes('tablet');
const VIEW = () => test.info().project.name.replace('-chromium', '');

test('homepage loads without script errors or missing illustrations', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Business,');
  await expect(page.locator('h1')).toContainText('connected.');
  const pictures = page.locator('img.scene-image, img.stage-img');
  await expect(pictures).toHaveCount(4);
  await Promise.all((await pictures.all()).map(async img => {
    await expect.poll(() => img.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
  }));
  expect(errors).toEqual([]);
});

test('main navigation reaches section targets', async ({ page }) => {
  await page.goto('/');
  const missing = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')]
    .map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(href.slice(1))));
  expect(missing).toEqual([]);
  if (MENU()) {
    const toggle = page.locator('.nav-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#nav-links')).toBeVisible();
    await page.locator('#nav-links a[href="#packages"]').click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#packages/);
  } else {
    await expect(page.locator('#nav-links')).toBeVisible();
    await page.locator('#nav-links a[href="#packages"]').click();
    await expect(page).toHaveURL(/#packages/);
  }
});

test('journey buttons update image, label and selected chapter', async ({ page }) => {
  await page.goto('/');
  const stageTwo = page.locator('[data-stage="1"]');
  await stageTwo.click();
  await expect(stageTwo).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#stage-index')).toHaveText('02');
  await expect(page.locator('#stage-badge')).toHaveText('THE CONVERSATION MOMENT');
  await expect(page.locator('.stage-img.is-current')).toHaveAttribute('src', /artwork-connect\.svg/);
  await page.locator('[data-stage="2"]').click();
  await expect(page.locator('#stage-index')).toHaveText('03');
  await expect(page.locator('.stage-img.is-current')).toHaveAttribute('src', /artwork-deliver\.svg/);
  await page.locator('[data-stage="0"]').click();
  await expect(page.locator('#stage-index')).toHaveText('01');
});

test('solution selector stays consistent and industry switching works', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-solution="operations"]').click();
  await expect(page.locator('#solution-title')).toHaveText('Make teamwork feel simpler.');
  await expect(page.locator('[data-solution="operations"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-solution="sales"]').click();
  await expect(page.locator('#solution-title')).toHaveText('Turn interest into the next step.');
  await page.locator('[data-industry="Education"]').click();
  await expect(page.locator('#industry-name')).toHaveText('Education');
  await expect(page.locator('#industry-action')).toHaveAttribute('href', './industries/education/');
});

test('motion preference can be paused and resumed', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('.motion-toggle');
  await button.click();
  await expect(button).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('body')).toHaveClass(/motion-off/);
  await button.click();
  await expect(button).toHaveAttribute('aria-pressed','false');
  await expect(page.locator('body')).not.toHaveClass(/motion-off/);
});

test('responsive page has no root horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect.poll(async () => await page.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2
  )).toBe(true);
  // Scroll through the actual page before capturing to trigger every revealed section.
  const maxY = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(280, Math.floor(page.viewportSize().height * .7));
  for (let y = 0; y < maxY; y += step) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(85);
  }
  await page.waitForTimeout(850);
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo({ top: 0, behavior: 'instant' }); });
  await page.waitForTimeout(170);
  require('node:fs').mkdirSync('screenshots', { recursive: true });
  await expect(page.locator('.site-header')).toBeVisible();
  await page.screenshot({ path: 'screenshots/taamerat360-' + VIEW() + '.png', fullPage: true });
});

test('reduced motion preference is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('body')).toHaveClass(/motion-off/);
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1');
});
test('important WCAG accessibility checks', async ({page}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const AxeBuilder = require('@axe-core/playwright').default;
  const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  const serious = results.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
  console.log('Accessibility: '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,description:v.description,targets:v.nodes.map(n=>n.target).slice(0,60)}))));
  expect(serious).toEqual([]);
});

test('essential content remains readable if JavaScript is disabled', async ({browser}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/');
    await expect(page.locator('h1')).toContainText('Business,');
    await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1');
    await expect(page.locator('.journey-heading')).toHaveCSS('opacity', '1');
  } finally {
    await context.close();
  }
});

test('navigation supports Escape and returns focus to the menu button', async ({ page }) => {
  if (!MENU()) return;
  await page.goto('/');
  const toggle = page.locator('.nav-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('preview indexing restrictions and proposal destinations remain explicit', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const robots = await page.request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Disallow: /');
  const links = await page.locator('a[href*="/contact-us/"]').evaluateAll(nodes => nodes.map(n => ({
    href: n.getAttribute('href'),
    label: n.textContent.trim(),
    target: n.getAttribute('target'),
    rel: n.getAttribute('rel')
  })));
  expect(links.length).toBeGreaterThanOrEqual(6);
  for (const link of links) {
    expect(link.href).toMatch(/^https:\/\/taamerat360-motion\.margotdperrin67761\.chatgpt\.site\/contact-us\//);
    expect(link.label.length).toBeGreaterThan(3);
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener');
  }
});
