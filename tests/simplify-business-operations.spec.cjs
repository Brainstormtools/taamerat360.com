const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const route='/solutions/simplify-business-operations/';

test('Simplify Business Operations page loads the original illustration and key challenges',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('h1')).toContainText('Less chasing.');
 await expect(page.locator('h1')).toContainText('More doing.');
 const artwork=page.locator('.op-art-panel>img[src$="simplify-business-operations.svg"]');
 await expect(artwork).toBeVisible();
 await expect.poll(()=>artwork.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 await expect(page.locator('.op-problems article')).toHaveCount(3);
 await expect(page.locator('.op-step-button')).toHaveCount(4);
 expect(errors).toEqual([]);
});
test('homepage links to all four distinct business need pages',async({page})=>{
 const cases=[
  ['leads','reach-more-customers'],
  ['sales','move-sales-forward'],
  ['experience','improve-customer-experience'],
  ['operations','simplify-business-operations']
 ];
 await page.goto('/');
 for(const [id,slug] of cases){
  await page.locator('[data-solution="'+id+'"]').click();
  await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/'+slug+'/');
 }
 await page.locator('[data-solution="operations"]').click();
 await page.locator('#solution-action').click();
 await expect(page).toHaveURL(/\/solutions\/simplify-business-operations\/$/);
});
test('operations explorer supports mouse click and keyboard directions',async({page})=>{
 await page.goto(route);
 const buttons=page.locator('.op-step-button');
 await expect(buttons.nth(0)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#op-step-panel-1')).toBeVisible();
 await expect(page.locator('#op-step-panel-2')).toBeHidden();
 await buttons.nth(1).click();
 await expect(buttons.nth(1)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#op-step-panel-2')).toBeVisible();
 await expect(page.locator('#op-step-panel-1')).toBeHidden();
 await buttons.nth(1).focus();await page.keyboard.press('ArrowDown');
 await expect(buttons.nth(2)).toBeFocused();
 await expect(page.locator('#op-step-panel-3')).toBeVisible();
 await page.keyboard.press('End');
 await expect(buttons.nth(3)).toBeFocused();
 await expect(page.locator('#op-step-panel-4')).toBeVisible();
 await page.keyboard.press('Home');
 await expect(buttons.nth(0)).toBeFocused();
 await expect(page.locator('#op-step-panel-1')).toBeVisible();
});
test('no live operational tool, invented case study or unauthorized proposal capture',async({page})=>{
 await page.goto(route);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.getByText('CASE STUDY / PLACEHOLDER')).toBeVisible();
 await expect(page.getByText('No tasks, employee information, files or workflow events are saved',{exact:false})).toBeVisible();
 await expect(page.locator('form')).toHaveCount(0);
 await expect(page.locator('input')).toHaveCount(0);
 for(const a of await page.locator('a[href*="/contact-us/"]').all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener/);
  await expect(a).toHaveAttribute('href',/^https:\/\/taamerat360-motion\.margotdperrin67761\.chatgpt\.site\/contact-us\/\?/);
 }
 for(const id of ['challenge','workflow','approach','packages','next-step'])
  await expect(page.locator('#'+id)).toBeAttached();
});
test('mobile navigation opens and closes with keyboard Escape',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.nav-toggle');
 if(await toggle.isVisible()){
  await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('#nav-links')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded','false');
  await expect(toggle).toBeFocused();
 }else await expect(page.locator('#nav-links')).toBeVisible();
});
test('all viewports have no horizontal scroll and no serious/critical WCAG violations',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(route);
 await expect.poll(async()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 const severe=result.violations.filter(x=>x.impact==='serious'||x.impact==='critical');
 console.log('Simplify Operations WCAG '+JSON.stringify(severe.map(x=>({id:x.id,impact:x.impact,targets:x.nodes.map(n=>n.target).slice(0,5)}))));
 expect(severe).toEqual([]);
});
test('all workflow stages and proposal remain readable without JavaScript',async({browser})=>{
 const ctx=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await ctx.newPage();
  await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('h1')).toBeVisible();
  for(let i=1;i<=4;i++)await expect(page.locator('#op-step-panel-'+i)).toBeVisible();
  await expect(page.locator('.rc-final-action a')).toBeVisible();
 }finally{await ctx.close();}
});