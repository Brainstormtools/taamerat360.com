const { test, expect } = require('@playwright/test');
const MOBILE = () => test.info().project.name.includes('mobile');

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
  if (MOBILE()) {
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
  await expect(page.locator('#industry-action')).toHaveAttribute('href', /industry=education/);
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
  require('node:fs').mkdirSync('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/taamerat360-' + (MOBILE() ? 'mobile' : 'desktop') + '.png', fullPage: true });
});

test('reduced motion preference is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('body')).toHaveClass(/motion-off/);
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1');
});
test('important WCAG accessibility checks', async ({page}) => {
  await page.goto('/');
  const AxeBuilder = require('@axe-core/playwright').default;
  const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  const serious = results.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
  console.log('Accessibility: '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,description:v.description,targets:v.nodes.slice(0,3).map(n=>n.target)}))));
  expect(serious).toEqual([]);
});
