const {test,expect}=require('@playwright/test');
const route='/industries/travel-tourism/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';

test('homepage Travel & Tourism selector opens local landing page and retains earlier industry destinations',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Travel & Tourism"]').click();
const action=page.locator('#industry-action');
await expect(action).toHaveAttribute('href','./industries/travel-tourism/');
await expect(action).not.toHaveAttribute('target','_blank');
await action.click();
await expect(page).toHaveURL(/\/industries\/travel-tourism\/$/);
await expect(page.locator('h1')).toContainText('Make the journey');
await page.goto('/');
for(const [industry,slug] of [['Construction','construction'],['Real Estate','real-estate'],['E-commerce','e-commerce'],['Architecture','architecture'],['Healthcare','healthcare'],['Education','education'],['Banking & Fintech','banking-fintech'],['Insurance','insurance'],['Telecom','telecom']]){
await page.locator('[data-industry="'+industry+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
}
});

test('travel-tourism landing loads concept art, sections, placeholders and no JS errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
for(const id of ['challenges','journey','solutions','evidence','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect(page.locator('h1')).toContainText('feel effortless.');
await expect.poll(()=>page.locator('.tt-art img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
await expect(page.locator('.tt-proof-head')).toContainText('CONTENT PLACEHOLDER');
expect(errors).toEqual([]);
});

test('travel-business journey supports click, keyboard arrows and ARIA pressed status',async({page})=>{
await page.goto(route);
await page.locator('[data-stage="understand"]').click();
await expect(page.locator('#tt-stage-title')).toHaveText('Make experiences easier to explore.');
await expect(page.locator('#tt-progress-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="enquire"]').focus();await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#tt-stage-title')).toHaveText('Connect the people behind the journey.');
await page.locator('[data-stage="discover"]').click();
await expect(page.locator('#tt-stage-count')).toHaveText('1 OF 4');
});

test('travel-tourism brief is created from fixed business categories and stale drafts invalidate',async({page})=>{
await page.goto(route);await expect(page.locator('#tt-copy')).toBeDisabled();
await page.locator('#tt-business').selectOption('Hotel or hospitality business');
await page.locator('#tt-challenge').selectOption('General trip and experience enquiries');
await page.locator('#tt-priority').selectOption('Consistent general enquiry follow-up');
await page.locator('.tt-submit').click();
await expect(page.locator('#tt-result-title')).toHaveText('Your travel-business priorities, clearly connected.');
await expect(page.locator('#tt-copy')).toBeEnabled();
await expect(page.locator('#tt-result-text')).toContainText('Hotel or hospitality business');
await expect(page.locator('#tt-result-text')).toContainText('General trip and experience enquiries');
await expect(page.locator('#tt-result-text')).toContainText('Exclude passenger names');
await expect(page.locator('#tt-result-text')).toContainText('privacy/security review');
await expect(page.locator('#tt-form input[type="text"],#tt-form input[type="number"],#tt-form textarea')).toHaveCount(0);
await page.locator('#tt-business').selectOption('Tour operator or travel agency');
await expect(page.locator('#tt-copy')).toBeDisabled();await expect(page.locator('#tt-result-text')).toBeHidden();
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

test('FAQs state travel-tourism booking and traveller privacy exclusions accurately',async({page})=>{
await page.goto(route);const details=page.locator('#questions details');await expect(details).toHaveCount(3);
await details.first().locator('summary').click();await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('not a booking engine');
await details.nth(1).locator('summary').click();await expect(details.nth(1)).toContainText('passport');
await details.nth(2).locator('summary').click();await expect(details.nth(2)).toContainText('privacy and security assessment');
});

test('information and placeholder proof remain accessible without JavaScript',async({browser})=>{
const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await ctx.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#evidence')).toContainText('[Approved travel organisation or project name]');
await expect(page.locator('#journey')).toContainText('Help travellers imagine the journey.');
}finally{await ctx.close()}
});

test('travel-tourism landing does not horizontally overflow and saves viewport screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/travel-tourism-'+test.info().project.name+'.png',fullPage:true});
});

test('travel-tourism page keeps preview robots policy and clearly external proposal links',async({page})=>{
await page.goto(route);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('travel-tourism landing passes serious and critical automated WCAG 2.1 checks',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=results.violations.filter(v=>['serious','critical'].includes(v.impact));
console.log('Travel & Tourism accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
