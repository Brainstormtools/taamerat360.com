const {test,expect}=require('@playwright/test');
const route='/industries/e-commerce/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';

test('home industry picker links to E-commerce and keeps earlier industries',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="E-commerce"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/e-commerce/');
await expect(page.locator('#industry-action')).not.toHaveAttribute('target','_blank');
await page.locator('#industry-action').click();
await expect(page).toHaveURL(/\/industries\/e-commerce\/$/);
await expect(page.locator('h1')).toContainText('Every click');
await page.goto('/');
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/construction/');
await page.locator('[data-industry="Real Estate"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/real-estate/');
});

test('e-commerce page renders complete branded sections, image and no JS errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(route);
for(const id of ['challenges','customer-journey','solutions','proof','brief'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect.poll(()=>page.locator('.e-hero-visual img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
await expect(page.locator('.e-placeholder-head')).toContainText('CONTENT PLACEHOLDER');
await expect(page.locator('h1')).toContainText('something.');
expect(errors).toEqual([]);
});

test('customer journey updates, supports keyboard and keeps ARIA selection in sync',async({page})=>{
await page.goto(route);
await page.locator('[data-stage="consider"]').click();
await expect(page.locator('#e-stage-title')).toHaveText('Make the decision feel easier.');
await expect(page.locator('#e-progress-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="order"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="return"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#e-stage-title')).toHaveText('Make the next interaction count.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#e-stage-count')).toHaveText('1 OF 4');
});

test('starting brief is generated locally and invalidated after changes',async({page})=>{
await page.goto(route);await expect(page.locator('#e-copy')).toBeDisabled();
await page.locator('#e-business').selectOption('Marketplace seller');
await page.locator('#e-challenge').selectOption('Responding to product questions');
await page.locator('#e-priority').selectOption('More consistent sales follow-up');
await page.locator('.e-form-submit').click();
await expect(page.locator('#e-brief-title')).toHaveText('Your next step, more clearly defined.');
await expect(page.locator('#e-copy')).toBeEnabled();
await expect(page.locator('#e-brief-text')).toContainText('Marketplace seller');
await expect(page.locator('#e-brief-text')).toContainText('Responding to product questions');
await expect(page.locator('#e-brief-text')).toContainText('Scope, timetable, responsibilities, fees');
await page.locator('#e-business').selectOption('Business-to-business commerce');
await expect(page.locator('#e-copy')).toBeDisabled();
await expect(page.locator('#e-brief-text')).toBeHidden();
});

test('responsive menu handles Escape, focus and anchor clicks',async({page})=>{
await page.goto(route);const nav=page.locator('.nav-toggle');
if(hasMenu()){
await expect(nav).toBeVisible();await nav.click();await expect(nav).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');await expect(nav).toHaveAttribute('aria-expanded','false');await expect(nav).toBeFocused();
await nav.click();await page.locator('#nav-links a[href="#customer-journey"]').click();
await expect(page).toHaveURL(/#customer-journey/);await expect(nav).toHaveAttribute('aria-expanded','false');
}else{await expect(nav).toBeHidden();await expect(page.locator('.nav-links')).toBeVisible()}
});

test('reduced-motion settings and motion toggle work',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
await expect(page.locator('body')).toHaveClass(/motion-off/);
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
await page.locator('.motion-toggle').click();
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
});

test('all essential content remains visible without JavaScript',async({browser})=>{
const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await context.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#proof')).toContainText('[Approved brand or project]');
await expect(page.locator('#customer-journey')).toContainText('Meet customers where they look.');
}finally{await context.close()}
});

test('e-commerce page avoids horizontal overflow and creates responsive screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/e-commerce-'+test.info().project.name+'.png',fullPage:true});
});

test('contact links are explicitly external; SEO remains preview-only',async({page})=>{
await page.goto(route);
await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();
expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('e-commerce landing page has no serious or critical automated WCAG violations',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=results.violations.filter(v=>['serious','critical'].includes(v.impact));
console.log('E-commerce accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
