const {test,expect}=require('@playwright/test');
const route='/industries/healthcare/';
const mobileMenu=()=>test.info().project.name!=='desktop-chromium';

test('homepage Healthcare selector opens new page and keeps previous industry links',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Healthcare"]').click();
const link=page.locator('#industry-action');
await expect(link).toHaveAttribute('href','./industries/healthcare/');
await expect(link).not.toHaveAttribute('target','_blank');
await link.click();await expect(page).toHaveURL(/\/industries\/healthcare\/$/);
await expect(page.locator('h1')).toContainText('More time for');
await page.goto('/');
for(const [name,slug] of [['Construction','construction'],['Real Estate','real-estate'],['E-commerce','e-commerce'],['Architecture','architecture']]){
await page.locator('[data-industry="'+name+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
}
});

test('Healthcare page has complete sections, illustration, placeholders and no script errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
for(const id of ['challenges','journey','solutions','evidence','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect(page.locator('h1')).toContainText('what matters.');
await expect.poll(()=>page.locator('.h-hero-visual img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
await expect(page.locator('.h-placeholder-label')).toContainText('CONTENT PLACEHOLDER');
await expect(page.locator('#questions')).toContainText('patient names');
expect(errors).toEqual([]);
});

test('nonclinical practice journey responds to click and keyboard with correct ARIA state',async({page})=>{
await page.goto(route);await page.locator('[data-stage="enquire"]').click();
await expect(page.locator('#h-stage-title')).toHaveText('Make general enquiries easier.');
await expect(page.locator('#h-journey-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="followup"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#h-stage-title')).toHaveText('Help the front-office team stay aligned.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#h-stage-count')).toHaveText('1 OF 4');
});

test('local healthcare brief accepts general business categories, not patient information',async({page})=>{
await page.goto(route);await expect(page.locator('#h-copy')).toBeDisabled();
await page.locator('#h-practice').selectOption('Dental practice');
await page.locator('#h-challenge').selectOption('Handling general nonclinical enquiries');
await page.locator('#h-priority').selectOption('Front-office coordination');
await page.locator('.h-form-submit').click();
await expect(page.locator('#h-result-title')).toHaveText('Your administrative priorities, clearly defined.');
await expect(page.locator('#h-copy')).toBeEnabled();
await expect(page.locator('#h-result-text')).toContainText('Dental practice');
await expect(page.locator('#h-result-text')).toContainText('Handling general nonclinical enquiries');
await expect(page.locator('#h-result-text')).toContainText('Exclude patient names');
await expect(page.locator('#h-result-text')).toContainText('Scope, deliverables, integrations');
expect(await page.locator('#h-brief-form input[type="text"],#h-brief-form textarea').count()).toBe(0);
await page.locator('#h-practice').selectOption('General healthcare practice');
await expect(page.locator('#h-copy')).toBeDisabled();
await expect(page.locator('#h-result-text')).toBeHidden();
});

test('responsive navigation opens and closes with Escape and anchors work',async({page})=>{
await page.goto(route);const toggle=page.locator('.nav-toggle');
if(mobileMenu()){
await expect(toggle).toBeVisible();await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
await toggle.click();await page.locator('#nav-links a[href="#journey"]').click();
await expect(page).toHaveURL(/#journey/);await expect(toggle).toHaveAttribute('aria-expanded','false');
}else{await expect(toggle).toBeHidden();await expect(page.locator('#nav-links')).toBeVisible()}
});

test('motion respects reduced-motion setting and manual user preference',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
await expect(page.locator('body')).toHaveClass(/motion-off/);
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
await page.locator('.motion-toggle').click();
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
});

test('Healthcare FAQ is interactive and explicitly excludes medical guidance and records',async({page})=>{
await page.goto(route);const details=page.locator('#questions details');await expect(details).toHaveCount(3);
await details.first().locator('summary').click();
await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('Medical advice, diagnosis, treatment');
await details.nth(1).locator('summary').click();
await expect(details.nth(1)).toContainText('Do not paste patient names');
});

test('Healthcare essentials remain understandable with JavaScript disabled',async({browser})=>{
const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await context.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved client or practice name]');
await expect(page.locator('#journey')).toContainText('Help people find their next step.');
}finally{await context.close()}
});

test('Healthcare page fits viewport and captures screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/healthcare-'+test.info().project.name+'.png',fullPage:true});
});

test('Healthcare preview crawl policy and outbound proposal links are explicit',async({page})=>{
await page.goto(route);
await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('Healthcare page has no serious or critical automated WCAG 2.1 issues',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const findings=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=findings.violations.filter(v=>['serious','critical'].includes(v.impact));
console.log('Healthcare accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
