const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const route='/solutions/move-sales-forward/';

test('Move Sales Forward loads original artwork, headline, and visible sales challenge cards',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('h1')).toContainText('Interest is good.');
 await expect(page.locator('h1')).toContainText('Momentum is better.');
 const art=page.locator('img[src$="move-sales-forward.svg"]');
 await expect(art).toBeVisible();
 await expect.poll(()=>art.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 await expect(page.locator('.sf-problems article')).toHaveCount(3);
 await expect(page.locator('.sf-stage-button')).toHaveCount(4);
 expect(errors).toEqual([]);
});
test('homepage sales choice links to new route and other choices remain intact',async({page})=>{
 await page.goto('/');
 await page.locator('[data-solution="sales"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/move-sales-forward/');
 await page.locator('#solution-action').click();
 await expect(page).toHaveURL(/\/solutions\/move-sales-forward\/$/);
 await page.goto('/');
 await page.locator('[data-solution="leads"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/reach-more-customers/');
 await page.locator('[data-solution="experience"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/improve-customer-experience/');
 await page.locator('[data-solution="operations"]').click();
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/simplify-business-operations/');
});
test('illustrative route changes stages and handles keyboard directions',async({page})=>{
 await page.goto(route);
 const buttons=page.locator('.sf-stage-button');
 await expect(buttons.nth(0)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#stage-panel-1')).toBeVisible();
 await expect(page.locator('#stage-panel-2')).toBeHidden();
 await buttons.nth(1).click();
 await expect(buttons.nth(1)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#stage-panel-2')).toBeVisible();
 await expect(page.locator('#stage-panel-1')).toBeHidden();
 await buttons.nth(1).focus();await page.keyboard.press('ArrowRight');
 await expect(buttons.nth(2)).toBeFocused();
 await expect(page.locator('#stage-panel-3')).toBeVisible();
 await page.keyboard.press('End');
 await expect(buttons.nth(3)).toBeFocused();
 await expect(page.locator('#stage-panel-4')).toBeVisible();
 await page.keyboard.press('Home');
 await expect(buttons.nth(0)).toBeFocused();
 await expect(page.locator('#stage-panel-1')).toBeVisible();
});
test('business claims, proposal links, and preview-only robots policy remain accurate',async({page})=>{
 await page.goto(route);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.getByText('CASE STUDY / PLACEHOLDER')).toBeVisible();
 await expect(page.getByText('No lead details are submitted by this page.',{exact:false})).toBeVisible();
 await expect(page.locator('form')).toHaveCount(0);
 await expect(page.locator('input')).toHaveCount(0);
 for(const link of await page.locator('a[href*="/contact-us/"]').all()){
   await expect(link).toHaveAttribute('target','_blank');
   await expect(link).toHaveAttribute('rel',/noopener/);
   await expect(link).toHaveAttribute('href',/^https:\/\/taamerat360-motion\.margotdperrin67761\.chatgpt\.site\/contact-us\/\?/);
 }
 for(const section of ['challenge','sales-route','approach','packages','next-step']){
   await expect(page.locator('#'+section)).toBeAttached();
 }
});
test('mobile menu toggles with Escape and accessible focus',async({page})=>{
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
test('four-viewport layout and WCAG 2.1 AA serious/critical checks pass',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(route);
 await expect.poll(async()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 const serious=results.violations.filter(v=>v.impact==='serious'||v.impact==='critical');
 console.log('Move Sales Forward WCAG '+JSON.stringify(serious.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target).slice(0,6)}))));
 expect(serious).toEqual([]);
});
test('all four stages and proposals remain readable when JavaScript is disabled',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
   const page=await context.newPage();
   await page.goto('http://127.0.0.1:4173'+route);
   await expect(page.locator('h1')).toBeVisible();
   for(let i=1;i<=4;i++)await expect(page.locator('#stage-panel-'+i)).toBeVisible();
   await expect(page.locator('.rc-final-action a')).toBeVisible();
 }finally{await context.close();}
});
