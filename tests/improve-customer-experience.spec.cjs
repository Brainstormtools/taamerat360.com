const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const route='/solutions/improve-customer-experience/';

test('Customer Experience page loads original illustration and service challenges',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('h1')).toContainText('Every interaction');
 await expect(page.locator('h1')).toContainText('leaves an impression.');
 const artwork=page.locator('.cx-art-panel>img[src$="customer-experience-connected.svg"]');
 await expect(artwork).toBeVisible();
 await expect.poll(()=>artwork.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 await expect(page.locator('.cx-problems article')).toHaveCount(3);
 await expect(page.locator('.cx-touchpoint-button')).toHaveCount(4);
 expect(errors).toEqual([]);
});
test('Homepage customer-experience selection opens new page without breaking other choices',async({page})=>{
 await page.goto('/');
 await page.locator('[data-solution="experience"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/improve-customer-experience/');
 await page.locator('#solution-action').click();
 await expect(page).toHaveURL(/\/solutions\/improve-customer-experience\/$/);
 await page.goto('/');
 await page.locator('[data-solution="leads"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/reach-more-customers/');
 await page.locator('[data-solution="sales"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/move-sales-forward/');
 await page.locator('[data-solution="operations"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/simplify-business-operations/');
});
test('Touchpoint journey changes stages by mouse and keyboard',async({page})=>{
 await page.goto(route);
 const controls=page.locator('.cx-touchpoint-button');
 await expect(controls.nth(0)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#cx-stage-panel-1')).toBeVisible();
 await expect(page.locator('#cx-stage-panel-2')).toBeHidden();
 await controls.nth(1).click();
 await expect(controls.nth(1)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#cx-stage-panel-2')).toBeVisible();
 await expect(page.locator('#cx-stage-panel-1')).toBeHidden();
 await controls.nth(1).focus();await page.keyboard.press('ArrowDown');
 await expect(controls.nth(2)).toBeFocused();
 await expect(page.locator('#cx-stage-panel-3')).toBeVisible();
 await page.keyboard.press('End');
 await expect(controls.nth(3)).toBeFocused();
 await expect(page.locator('#cx-stage-panel-4')).toBeVisible();
 await page.keyboard.press('Home');
 await expect(controls.nth(0)).toBeFocused();
 await expect(page.locator('#cx-stage-panel-1')).toBeVisible();
});
test('Content preserves service privacy, honest evidence and preview-only indexing',async({page})=>{
 await page.goto(route);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.getByText('CASE STUDY / PLACEHOLDER')).toBeVisible();
 await expect(page.getByText('No enquiries, messages or customer records are collected',{exact:false})).toBeVisible();
 await expect(page.locator('form')).toHaveCount(0);
 await expect(page.locator('input')).toHaveCount(0);
 for(const link of await page.locator('a[href*="/contact-us/"]').all()){
   await expect(link).toHaveAttribute('target','_blank');
   await expect(link).toHaveAttribute('rel',/noopener/);
   await expect(link).toHaveAttribute('href',/^https:\/\/taamerat360-motion\.margotdperrin67761\.chatgpt\.site\/contact-us\/\?/);
 }
 for(const id of ['challenge','touchpoints','approach','packages','next-step'])await expect(page.locator('#'+id)).toBeAttached();
});
test('Responsive mobile menu supports Escape and keyboard focus',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.nav-toggle');
 if(await toggle.isVisible()){
   await toggle.click();
   await expect(toggle).toHaveAttribute('aria-expanded','true');
   await expect(page.locator('#nav-links')).toBeVisible();
   await page.keyboard.press('Escape');
   await expect(toggle).toHaveAttribute('aria-expanded','false');
   await expect(toggle).toBeFocused();
 }else await expect(page.locator('#nav-links')).toBeVisible();
});
test('No horizontal scroll and no critical/serious WCAG 2.1 AA violations',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(route);
 await expect.poll(async()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 const serious=result.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
 console.log('Customer Experience WCAG '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target).slice(0,5)}))));
 expect(serious).toEqual([]);
});
test('All four touchpoints remain readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
   const page=await context.newPage();
   await page.goto('http://127.0.0.1:4173'+route);
   await expect(page.locator('h1')).toBeVisible();
   for(let i=1;i<=4;i++)await expect(page.locator('#cx-stage-panel-'+i)).toBeVisible();
   await expect(page.locator('.rc-final-action a')).toBeVisible();
 }finally{await context.close();}
});