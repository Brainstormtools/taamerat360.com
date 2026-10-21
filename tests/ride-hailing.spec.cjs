const {test,expect}=require('@playwright/test');
const route='/industries/ride-hailing/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';

test('homepage Ride Hailing selector opens local landing page and retains earlier industry destinations',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Ride Hailing"]').click();
const action=page.locator('#industry-action');
await expect(action).toHaveAttribute('href','./industries/ride-hailing/');
await expect(action).not.toHaveAttribute('target','_blank');
await action.click();
await expect(page).toHaveURL(/\/industries\/ride-hailing\/$/);
await expect(page.locator('h1')).toContainText('Better journeys');
await page.goto('/');
for(const [industry,slug] of [['Construction','construction'],['Real Estate','real-estate'],['E-commerce','e-commerce'],['Architecture','architecture'],['Healthcare','healthcare'],['Education','education'],['Banking & Fintech','banking-fintech'],['Insurance','insurance'],['Telecom','telecom'],['Travel & Tourism','travel-tourism']]){
await page.locator('[data-industry="'+industry+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
}
});

test('ride-hailing landing loads concept art, sections, placeholders and no JS errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
for(const id of ['challenges','journey','solutions','evidence','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect(page.locator('h1')).toContainText('Clearer connections.');
await expect.poll(()=>page.locator('.rh-art img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
await expect(page.locator('.rh-proof-head')).toContainText('CONTENT PLACEHOLDER');
expect(errors).toEqual([]);
});

test('mobility-business journey supports click, keyboard arrows and ARIA pressed status',async({page})=>{
await page.goto(route);
await page.locator('[data-stage="understand"]').click();
await expect(page.locator('#rh-stage-title')).toHaveText('Make business options easier to explore.');
await expect(page.locator('#rh-progress-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="enquire"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#rh-stage-title')).toHaveText('Keep mobility business teams aligned.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#rh-stage-count')).toHaveText('1 OF 4');
});

test('ride-hailing brief is created from fixed business categories and stale drafts invalidate',async({page})=>{
await page.goto(route);await expect(page.locator('#rh-copy')).toBeDisabled();
await page.locator('#rh-business').selectOption('Fleet management business');
await page.locator('#rh-challenge').selectOption('Corporate and partner business enquiries');
await page.locator('#rh-priority').selectOption('Consistent general enquiry follow-up');
await page.locator('.rh-submit').click();
await expect(page.locator('#rh-result-title')).toHaveText('Your mobility business priorities, connected.');
await expect(page.locator('#rh-copy')).toBeEnabled();
await expect(page.locator('#rh-result-text')).toContainText('Fleet management business');
await expect(page.locator('#rh-result-text')).toContainText('Corporate and partner business enquiries');
await expect(page.locator('#rh-result-text')).toContainText('Do not include rider/driver names');
await expect(page.locator('#rh-result-text')).toContainText('privacy/security review');
await expect(page.locator('#rh-form input[type="text"],#rh-form input[type="number"],#rh-form textarea')).toHaveCount(0);
await page.locator('#rh-business').selectOption('Ride-hailing platform or operator');
await expect(page.locator('#rh-copy')).toBeDisabled();await expect(page.locator('#rh-result-text')).toBeHidden();
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

test('FAQs state ride-hailing booking and traveller privacy exclusions accurately',async({page})=>{
await page.goto(route);const details=page.locator('#questions details');await expect(details).toHaveCount(3);
await details.first().locator('summary').click();await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('does not offer ride booking');
await details.nth(1).locator('summary').click();await expect(details.nth(1)).toContainText('ride histories');
await details.nth(2).locator('summary').click();await expect(details.nth(2)).toContainText('security and privacy review');
});

test('information and placeholder proof remain accessible without JavaScript',async({browser})=>{
const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await ctx.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved ride-hailing organisation or project name]');
await expect(page.locator('#journey')).toContainText('Make the service easy to understand.');
}finally{await ctx.close()}
});

test('ride-hailing landing does not horizontally overflow and saves viewport screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/ride-hailing-'+test.info().project.name+'.png',fullPage:true});
});

test('ride-hailing page keeps preview robots policy and clearly external proposal links',async({page})=>{
await page.goto(route);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('ride-hailing landing passes serious and critical automated WCAG 2.1 checks',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=results.violations.filter(v=>['serious','critical'].includes(v.impact));
console.log('Ride Hailing accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
