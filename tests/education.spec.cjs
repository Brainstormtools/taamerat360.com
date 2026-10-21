const {test,expect}=require('@playwright/test');
const route='/industries/education/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';
test('homepage industry picker opens Education while preserving earlier industries',async({page})=>{
await page.goto('/');await page.locator('[data-industry="Education"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/education/');
await expect(page.locator('#industry-action')).not.toHaveAttribute('target','_blank');
await page.locator('#industry-action').click();await expect(page).toHaveURL(/\/industries\/education\/$/);
await expect(page.locator('h1')).toContainText('Every learner');
await page.goto('/');
for(const [industry,slug] of [['Construction','construction'],['Real Estate','real-estate'],['E-commerce','e-commerce'],['Architecture','architecture'],['Healthcare','healthcare']]){
await page.locator('[data-industry="'+industry+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
}
});
test('Education page loads artwork and every content section with no JS errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
await expect(page.locator('h1')).toContainText('somewhere.');
for(const id of ['challenges','journey','solutions','evidence','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect.poll(()=>page.locator('.ed-hero-art img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
await expect(page.locator('.ed-placeholder-top')).toContainText('CONTENT PLACEHOLDER');
expect(errors).toEqual([]);
});
test('Education workflow supports stage selection, ARIA and focused arrow navigation',async({page})=>{
await page.goto(route);await page.locator('[data-stage="enquiry"]').click();
await expect(page.locator('#ed-stage-title')).toHaveText('Guide the first conversation.');
await expect(page.locator('#ed-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="welcome"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="connect"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#ed-stage-title')).toHaveText('Keep the team in the loop.');
await page.locator('[data-stage="discovery"]').click();await expect(page.locator('#ed-stage-count')).toHaveText('1 OF 4');
});
test('Education brief uses fixed business categories and invalidates changed selections',async({page})=>{
await page.goto(route);await expect(page.locator('#ed-copy')).toBeDisabled();
await page.locator('#ed-organisation').selectOption('University or college');
await page.locator('#ed-challenge').selectOption('General admissions enquiries');
await page.locator('#ed-priority').selectOption('Consistent enquiry follow-up');
await page.locator('.ed-submit').click();
await expect(page.locator('#ed-result-title')).toHaveText('Your education priorities, connected.');
await expect(page.locator('#ed-copy')).toBeEnabled();
await expect(page.locator('#ed-result-text')).toContainText('University or college');
await expect(page.locator('#ed-result-text')).toContainText('General admissions enquiries');
await expect(page.locator('#ed-result-text')).toContainText('Do not include student names');
await expect(page.locator('#ed-result-text')).toContainText('Service scope, integrations, deliverables');
expect(await page.locator('#ed-form input[type="text"],#ed-form textarea').count()).toBe(0);
await page.locator('#ed-organisation').selectOption('Training centre or academy');
await expect(page.locator('#ed-copy')).toBeDisabled();await expect(page.locator('#ed-result-text')).toBeHidden();
});
test('responsive menu handles Escape and section links accessibly',async({page})=>{
await page.goto(route);const toggle=page.locator('.nav-toggle');
if(hasMenu()){
await expect(toggle).toBeVisible();await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
await toggle.click();await page.locator('#nav-links a[href="#journey"]').click();
await expect(page).toHaveURL(/#journey/);await expect(toggle).toHaveAttribute('aria-expanded','false');
}else{await expect(toggle).toBeHidden();await expect(page.locator('.nav-links')).toBeVisible()}
});
test('reduced-motion and explicit motion toggle both work',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
await expect(page.locator('body')).toHaveClass(/motion-off/);
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
await page.locator('.motion-toggle').click();await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
});
test('education FAQ expands and protects student data boundaries',async({page})=>{
await page.goto(route);const details=page.locator('#questions details');await expect(details).toHaveCount(3);
await details.first().locator('summary').click();await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('accreditation');
await details.nth(1).locator('summary').click();await expect(details.nth(1)).toContainText('information about minors');
});
test('important Education sections remain visible without JavaScript',async({browser})=>{
const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await ctx.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved institution or project title]');
await expect(page.locator('#journey')).toContainText('Make the first step easy.');
}finally{await ctx.close()}
});
test('Education page has no horizontal overflow and provides responsive screenshots',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/education-'+test.info().project.name+'.png',fullPage:true});
});
test('external proposal links and preview-only SEO policy remain explicit',async({page})=>{
await page.goto(route);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();expect(links.length).toBeGreaterThanOrEqual(2);
for(const a of links){await expect(a).toHaveAttribute('target','_blank');await expect(a).toHaveAttribute('rel',/noopener/)}
});
test('Education accessibility has no serious or critical WCAG 2.1 violations',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const findings=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=findings.violations.filter(v=>v.impact==='serious'||v.impact==='critical');
console.log('Education accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
