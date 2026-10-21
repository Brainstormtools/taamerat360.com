const {test,expect}=require('@playwright/test');
const url='/industries/real-estate/';
const menuLayout=()=>test.info().project.name!=='desktop-chromium';

test('homepage industry picker opens the Real Estate page',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Real Estate"]').click();
const link=page.locator('#industry-action');
await expect(link).toHaveAttribute('href','./industries/real-estate/');
await expect(link).not.toHaveAttribute('target','_blank');
await link.click();
await expect(page).toHaveURL(/\/industries\/real-estate\/$/);
await expect(page.locator('h1')).toContainText('Every address');
await page.goto('/');
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/construction/');
});
test('property page renders complete sections and illustration without JavaScript errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(url);
for(const name of ['challenges','journey','solutions','evidence','brief'])await expect(page.locator('#'+name)).toHaveCount(1);
await expect.poll(()=>page.locator('.r-hero-scene img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
await expect(page.locator('.r-case-top')).toContainText('CONTENT PLACEHOLDER');
await expect(page.locator('#r-evidence-title')).toContainText('A real story.');
expect(errors).toEqual([]);
});
test('four-stage property journey supports buttons and arrow-key focus',async({page})=>{
await page.goto(url);
await page.locator('[data-stage="qualify"]').click();
await expect(page.locator('#r-stage-title')).toHaveText('Understand what matters to them.');
await expect(page.locator('#r-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="viewing"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="followup"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#r-stage-title')).toHaveText('Keep the conversation moving.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#r-stage-count')).toHaveText('1 OF 4');
});
test('proposal brief is generated locally and becomes stale when changed',async({page})=>{
await page.goto(url);await expect(page.locator('#r-copy')).toBeDisabled();
await page.locator('#r-business').selectOption('Property developer');
await page.locator('#r-challenge').selectOption('Viewing appointments and communication');
await page.locator('#r-priority').selectOption('Team coordination');
await page.locator('.r-form-submit').click();
await expect(page.locator('#r-result-title')).toHaveText('Your priorities, clearly connected.');
await expect(page.locator('#r-copy')).toBeEnabled();
await expect(page.locator('#r-result-text')).toContainText('Property developer');
await expect(page.locator('#r-result-text')).toContainText('Viewing appointments and communication');
await expect(page.locator('#r-result-text')).toContainText('Scope');
await page.locator('#r-business').selectOption('Real estate agency');
await expect(page.locator('#r-copy')).toBeDisabled();
await expect(page.locator('#r-result-text')).toBeHidden();
});
test('responsive menu opens, closes with Escape and navigates to page sections',async({page})=>{
await page.goto(url);
const toggle=page.locator('.nav-toggle');
if(menuLayout()){
await expect(toggle).toBeVisible();await toggle.click();
await expect(toggle).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
await toggle.click();await page.locator('#nav-links a[href="#journey"]').click();
await expect(page).toHaveURL(/#journey/);await expect(toggle).toHaveAttribute('aria-expanded','false');
}else{await expect(toggle).toBeHidden();await expect(page.locator('#nav-links')).toBeVisible()}
});
test('reduced motion preference and user motion controls work',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);
await expect(page.locator('body')).toHaveClass(/motion-off/);
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
await page.locator('.motion-toggle').click();
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
});
test('page retains readable content with JavaScript disabled',async({browser})=>{
const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await context.newPage();await page.goto('http://127.0.0.1:4173'+url);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved client or project title]');
await expect(page.locator('#journey')).toContainText('Make the right first impression.');
}finally{await context.close()}
});
test('property landing page does not horizontally overflow',async({page})=>{
await page.goto(url);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/real-estate-'+test.info().project.name+'.png',fullPage:true});
});
test('proposal links remain explicit and content is kept out of public search',async({page})=>{
await page.goto(url);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();
expect(links.length).toBeGreaterThanOrEqual(2);
for(const a of links){await expect(a).toHaveAttribute('target','_blank');await expect(a).toHaveAttribute('rel',/noopener/)}
});
test('property landing page accessibility scan has no serious WCAG 2.1 issues',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);
const AxeBuilder=require('@axe-core/playwright').default;
const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=results.violations.filter(v=>v.impact==='serious'||v.impact==='critical');
console.log('Real estate accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
