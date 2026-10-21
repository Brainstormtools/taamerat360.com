const {test,expect}=require('@playwright/test');
const route='/industries/telecom/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';

test('homepage Telecom selector opens local landing page and retains earlier industry destinations',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Telecom"]').click();
const action=page.locator('#industry-action');
await expect(action).toHaveAttribute('href','./industries/telecom/');
await expect(action).not.toHaveAttribute('target','_blank');
await action.click();
await expect(page).toHaveURL(/\/industries\/telecom\/$/);
await expect(page.locator('h1')).toContainText('Make every');
await page.goto('/');
for(const [industry,slug] of [['Construction','construction'],['Real Estate','real-estate'],['E-commerce','e-commerce'],['Architecture','architecture'],['Healthcare','healthcare'],['Education','education'],['Banking & Fintech','banking-fintech'],['Insurance','insurance']]){
await page.locator('[data-industry="'+industry+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
}
});

test('telecom landing loads concept art, sections, placeholders and no JS errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
for(const id of ['challenges','journey','solutions','evidence','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect(page.locator('h1')).toContainText('connection count.');
await expect.poll(()=>page.locator('.t-art img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
await expect(page.locator('.t-proof-head')).toContainText('CONTENT PLACEHOLDER');
expect(errors).toEqual([]);
});

test('non-technical business journey supports click, keyboard arrows and ARIA pressed status',async({page})=>{
await page.goto(route);
await page.locator('[data-stage="understand"]').click();
await expect(page.locator('#t-stage-title')).toHaveText('Make options simpler to understand.');
await expect(page.locator('#t-progress-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="enquire"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#t-stage-title')).toHaveText('Keep commercial teams connected.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#t-stage-count')).toHaveText('1 OF 4');
});

test('telecom brief is created from fixed business categories and stale drafts invalidate',async({page})=>{
await page.goto(route);await expect(page.locator('#t-copy')).toBeDisabled();
await page.locator('#t-business').selectOption('Internet service provider');
await page.locator('#t-challenge').selectOption('General commercial enquiries');
await page.locator('#t-priority').selectOption('Consistent enquiry follow-up');
await page.locator('.t-submit').click();
await expect(page.locator('#t-result-title')).toHaveText('Your communication priorities, connected.');
await expect(page.locator('#t-copy')).toBeEnabled();
await expect(page.locator('#t-result-text')).toContainText('Internet service provider');
await expect(page.locator('#t-result-text')).toContainText('General commercial enquiries');
await expect(page.locator('#t-result-text')).toContainText('Never include subscriber names');
await expect(page.locator('#t-result-text')).toContainText('regulatory/privacy review');
await expect(page.locator('#t-form input[type="text"],#t-form input[type="number"],#t-form textarea')).toHaveCount(0);
await page.locator('#t-business').selectOption('Telecom operator or provider');
await expect(page.locator('#t-copy')).toBeDisabled();await expect(page.locator('#t-result-text')).toBeHidden();
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

test('FAQs state telecom service and subscriber privacy exclusions accurately',async({page})=>{
await page.goto(route);const details=page.locator('#questions details');await expect(details).toHaveCount(3);
await details.first().locator('summary').click();await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('SIM registration');
await details.nth(1).locator('summary').click();await expect(details.nth(1)).toContainText('subscriber IDs');
await details.nth(2).locator('summary').click();await expect(details.nth(2)).toContainText('security and privacy review');
});

test('information and placeholder proof remain accessible without JavaScript',async({browser})=>{
const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await ctx.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved telecom provider or project name]');
await expect(page.locator('#journey')).toContainText('Help the right people find you.');
}finally{await ctx.close()}
});

test('telecom landing does not horizontally overflow and saves viewport screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/telecom-'+test.info().project.name+'.png',fullPage:true});
});

test('telecom page keeps preview robots policy and clearly external proposal links',async({page})=>{
await page.goto(route);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('telecom landing passes serious and critical automated WCAG 2.1 checks',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=results.violations.filter(v=>['serious','critical'].includes(v.impact));
console.log('Telecom accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
