const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const path='/solutions/reach-more-customers/';

test('Reach More Customers page loads with its original artwork and clear value proposition',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(path);
 await expect(page.locator('h1')).toContainText('Good business.');
 await expect(page.locator('h1')).toContainText('Not enough eyes.');
 await expect(page.locator('.rc-art-panel>img[src$="reach-more-customers.svg"]')).toBeVisible();
 await expect.poll(()=>page.locator('.rc-art-panel>img[src$="reach-more-customers.svg"]').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 await expect(page.locator('.rc-steps article')).toHaveCount(3);
 await expect(page.locator('.rc-problem')).toHaveCount(3);
 expect(errors).toEqual([]);
});
test('homepage challenge selector reaches Reach More Customers; other options remain functional',async({page})=>{
 await page.goto('/');
 await page.locator('[data-solution="leads"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/reach-more-customers/');
 await page.locator('#solution-action').click();
 await expect(page).toHaveURL(/\/solutions\/reach-more-customers\/$/);
 await page.goto('/');
 await page.locator('[data-solution="sales"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/move-sales-forward/');
});
test('editorial sections and proposal destinations stay fully discoverable',async({page})=>{
 await page.goto(path);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.getByText('CASE STUDY / PLACEHOLDER')).toBeVisible();
 await expect(page.getByText('Successful enquiry delivery has not yet been verified.')).toBeVisible();
 for(const a of await page.locator('a[href*="/contact-us/"]').all()){
   await expect(a).toHaveAttribute('target','_blank');
   await expect(a).toHaveAttribute('rel',/noopener/);
 }
 for(const id of ['challenge','approach','packages','next-step']){
   await expect(page.locator('#'+id)).toBeAttached();
 }
 await expect(page.locator('form')).toHaveCount(0);
});
test('mobile menu toggles, Escape restores keyboard focus',async({page})=>{
 await page.goto(path);
 const toggle=page.locator('.nav-toggle');
 if(await toggle.isVisible()){
   await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
   await expect(page.locator('#nav-links')).toBeVisible();
   await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');
   await expect(toggle).toBeFocused();
 }else{
   await expect(page.locator('#nav-links')).toBeVisible();
 }
});
test('responsive layout has no horizontal scroll and passes serious WCAG checks',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(path);
 await expect.poll(async()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 const serious=results.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
 console.log('Reach More Customers WCAG '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target).slice(0,5)}))));
 expect(serious).toEqual([]);
});
test('content remains readable with JavaScript disabled',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
   const page=await context.newPage();
   await page.goto('http://127.0.0.1:4173'+path);
   await expect(page.locator('h1')).toBeVisible();
   await expect(page.locator('.rc-steps article')).toHaveCount(3);
   await expect(page.locator('.rc-problem')).toHaveCount(3);
   await expect(page.locator('.rc-final-action a')).toBeVisible();
 }finally{await context.close();}
});
