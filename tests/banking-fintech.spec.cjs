const {test,expect}=require('@playwright/test');
const route='/industries/banking-fintech/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';

test('homepage Banking & Fintech selector opens local landing page and retains earlier industry destinations',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Banking & Fintech"]').click();
const action=page.locator('#industry-action');
await expect(action).toHaveAttribute('href','./industries/banking-fintech/');
await expect(action).not.toHaveAttribute('target','_blank');
await action.click();
await expect(page).toHaveURL(/\/industries\/banking-fintech\/$/);
await expect(page.locator('h1')).toContainText('Confidence');
await page.goto('/');
for(const [industry,slug] of [['Construction','construction'],['Real Estate','real-estate'],['E-commerce','e-commerce'],['Architecture','architecture'],['Healthcare','healthcare'],['Education','education']]){
await page.locator('[data-industry="'+industry+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
}
});

test('fintech landing loads concept art, sections, placeholders and no JS errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
for(const id of ['challenges','journey','solutions','evidence','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect(page.locator('h1')).toContainText('clarity.');
await expect.poll(()=>page.locator('.f-artwork img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
await expect(page.locator('.f-proof-label')).toContainText('CONTENT PLACEHOLDER');
expect(errors).toEqual([]);
});

test('non-transactional journey supports click, keyboard arrows and ARIA pressed status',async({page})=>{
await page.goto(route);
await page.locator('[data-stage="understand"]').click();
await expect(page.locator('#f-stage-title')).toHaveText('Help the next question become clear.');
await expect(page.locator('#f-progress-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="enquire"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#f-stage-title')).toHaveText('Connect people behind the process.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#f-stage-count')).toHaveText('1 OF 4');
});

test('fintech brief is created from fixed business categories and stale drafts invalidate',async({page})=>{
await page.goto(route);await expect(page.locator('#f-copy')).toBeDisabled();
await page.locator('#f-business').selectOption('Payments-related business');
await page.locator('#f-challenge').selectOption('Routing general business enquiries');
await page.locator('#f-priority').selectOption('Consistent non-sensitive follow-up');
await page.locator('.f-submit').click();
await expect(page.locator('#f-result-title')).toHaveText('Your business priorities, in focus.');
await expect(page.locator('#f-copy')).toBeEnabled();
await expect(page.locator('#f-result-text')).toContainText('Payments-related business');
await expect(page.locator('#f-result-text')).toContainText('Routing general business enquiries');
await expect(page.locator('#f-result-text')).toContainText('No customer data, account details');
await expect(page.locator('#f-result-text')).toContainText('regulatory/privacy/security review');
await expect(page.locator('#f-form input[type="text"],#f-form input[type="number"],#f-form textarea')).toHaveCount(0);
await page.locator('#f-business').selectOption('Banking organisation');
await expect(page.locator('#f-copy')).toBeDisabled();await expect(page.locator('#f-result-text')).toBeHidden();
});

test('responsive navigation handles Escape, keyboard focus and journey anchors',async({page})=>{
await page.goto(route);const toggle=page.locator('.nav-toggle');
if(hasMenu()){
await expect(toggle).toBeVisible();await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
await toggle.click();await page.locator('#nav-links a[href="#journey"]').click();
await expect(page).toHaveURL(/#journey/);await expect(toggle).toHaveAttribute('aria-expanded','false');
}else{await expect(toggle).toBeHidden();await expect(page.locator('#nav-links')).toBeVisible()}
});

test('reduced motion and pause control update visually and accessibly',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
await expect(page.locator('body')).toHaveClass(/motion-off/);
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-label','Resume motion');
await page.locator('.motion-toggle').click();
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-label','Pause motion');
});

test('FAQs state financial-service and privacy exclusions accurately',async({page})=>{
await page.goto(route);const details=page.locator('#questions details');await expect(details).toHaveCount(3);
await details.first().locator('summary').click();await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('investment advice');
await details.nth(1).locator('summary').click();await expect(details.nth(1)).toContainText('card numbers');
await details.nth(2).locator('summary').click();await expect(details.nth(2)).toContainText('security review');
});

test('information and placeholder proof remain accessible without JavaScript',async({browser})=>{
const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await ctx.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved institution or project name]');
await expect(page.locator('#journey')).toContainText('Make the offer easy to find.');
}finally{await ctx.close()}
});

test('fintech landing does not horizontally overflow and saves viewport screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/banking-fintech-'+test.info().project.name+'.png',fullPage:true});
});

test('fintech page keeps preview robots policy and clearly external proposal links',async({page})=>{
await page.goto(route);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('banking fintech landing passes serious and critical automated WCAG 2.1 checks',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=results.violations.filter(v=>['serious','critical'].includes(v.impact));
console.log('Banking fintech accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
