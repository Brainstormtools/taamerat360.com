const {test,expect}=require('@playwright/test');
const route='/industries/architecture/';
const hasMenu=()=>test.info().project.name!=='desktop-chromium';

test('home industry selector opens Architecture and preserves previous industry links',async({page})=>{
await page.goto('/');
await page.locator('[data-industry="Architecture"]').click();
const link=page.locator('#industry-action');
await expect(link).toHaveAttribute('href','./industries/architecture/');
await expect(link).not.toHaveAttribute('target','_blank');
await link.click();await expect(page).toHaveURL(/\/industries\/architecture\/$/);
await expect(page.locator('h1')).toContainText('Make room');
await page.goto('/');await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/construction/');
for(const [industry,path] of [['Real Estate','real-estate'],['E-commerce','e-commerce']]){
await page.locator('[data-industry="'+industry+'"]').click();
await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+path+'/');
}
});

test('Architecture page shows each section, artwork and no JavaScript errors',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(route);
await expect(page.locator('h1')).toContainText('better business.');
for(const id of ['challenges','studio-flow','solutions','proof','brief','questions'])await expect(page.locator('#'+id)).toHaveCount(1);
await expect.poll(()=>page.locator('.a-visual img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
await expect(page.locator('.a-case-head')).toContainText('CONTENT PLACEHOLDER');
expect(errors).toEqual([]);
});

test('studio journey updates selected stage and supports keyboard arrows',async({page})=>{
await page.goto(route);
await page.locator('[data-stage="brief"]').click();
await expect(page.locator('#a-step-title')).toHaveText('Listen before planning.');
await expect(page.locator('#a-flow-path')).toHaveAttribute('stroke-dashoffset','49');
await page.locator('[data-stage="proposal"]').focus();
await page.keyboard.press('ArrowDown');
await expect(page.locator('[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
await expect(page.locator('#a-step-title')).toHaveText('Keep the people connected.');
await page.locator('[data-stage="inquiry"]').click();
await expect(page.locator('#a-step-count')).toHaveText('1 OF 4');
});

test('local starting brief is created, labels chosen inputs, and invalidates stale content',async({page})=>{
await page.goto(route);
await expect(page.locator('#a-copy')).toBeDisabled();
await page.locator('#a-practice').selectOption('Interior architecture practice');
await page.locator('#a-bottleneck').selectOption('Gathering clear project briefs');
await page.locator('#a-priority').selectOption('Proposal follow-through');
await page.locator('.a-form-submit').click();
await expect(page.locator('#a-result-title')).toHaveText('Your next step, in focus.');
await expect(page.locator('#a-copy')).toBeEnabled();
await expect(page.locator('#a-result-text')).toContainText('Interior architecture practice');
await expect(page.locator('#a-result-text')).toContainText('Gathering clear project briefs');
await expect(page.locator('#a-result-text')).toContainText('Detailed scope, integrations, deliverables');
await expect(page.locator('#a-result-text')).toContainText('Architectural drawings, professional certifications');
await page.locator('#a-practice').selectOption('Architecture studio');
await expect(page.locator('#a-copy')).toBeDisabled();
await expect(page.locator('#a-result-text')).toBeHidden();
});

test('responsive navigation supports Escape, focus return and anchor navigation',async({page})=>{
await page.goto(route);const toggle=page.locator('.nav-toggle');
if(hasMenu()){
await expect(toggle).toBeVisible();
await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');
await expect(toggle).toHaveAttribute('aria-expanded','false');
await expect(toggle).toBeFocused();
await toggle.click();await page.locator('#nav-links a[href="#studio-flow"]').click();
await expect(page).toHaveURL(/#studio-flow/);
await expect(toggle).toHaveAttribute('aria-expanded','false');
}else{await expect(toggle).toBeHidden();await expect(page.locator('.nav-links')).toBeVisible()}
});

test('reduced-motion setting and user pause control are respected',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
await expect(page.locator('body')).toHaveClass(/motion-off/);
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
await page.locator('.motion-toggle').click();
await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
});

test('FAQ answers are accessible and explain professional service boundaries',async({page})=>{
await page.goto(route);
const details=page.locator('#questions details');
await expect(details).toHaveCount(3);
await details.first().locator('summary').click();
await expect(details.first()).toHaveAttribute('open','');
await expect(details.first()).toContainText('professional design work');
});

test('Architecture page text and proof placeholders remain visible without JavaScript',async({browser})=>{
const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
try{const page=await context.newPage();await page.goto('http://127.0.0.1:4173'+route);
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('#proof')).toContainText('[Approved practice or project name]');
await expect(page.locator('#studio-flow')).toContainText('Make it easy to begin.');
}finally{await context.close()}
});

test('Architecture page fits viewport and captures screenshot',async({page})=>{
await page.goto(route);
await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
require('node:fs').mkdirSync('screenshots',{recursive:true});
await page.screenshot({path:'screenshots/architecture-'+test.info().project.name+'.png',fullPage:true});
});

test('preview robots policy and external proposal links remain explicit',async({page})=>{
await page.goto(route);
await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
const links=await page.locator('a[href*="/contact-us/"]').all();
expect(links.length).toBeGreaterThanOrEqual(2);
for(const link of links){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener/)}
});

test('Architecture page has no serious or critical automated WCAG 2.1 violations',async({page})=>{
await page.emulateMedia({reducedMotion:'reduce'});
await page.goto(route);
const AxeBuilder=require('@axe-core/playwright').default;
const findings=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
const serious=findings.violations.filter(v=>v.impact==='serious'||v.impact==='critical');
console.log('Architecture accessibility '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))));
expect(serious).toEqual([]);
});
