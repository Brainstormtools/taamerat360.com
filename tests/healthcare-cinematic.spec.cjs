const {test,expect}=require('@playwright/test');
const route='/industries/healthcare/';

test('Healthcare cinematic narrative respects all nonclinical business boundaries',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('.h-cinema-hero h1')).toContainText('More time for');
 await expect(page.locator('#cinema-healthcare')).toBeVisible();
 await expect(page.locator('.healthcare-cinema-chapter')).toHaveCount(4);
 await expect(page.locator('.healthcare-cinema-heading')).toContainText('not a real practice');
 await expect(page.locator('#solutions')).toContainText('Patient portals, health records');
 await expect(page.locator('.h-placeholder-label')).toContainText('CONTENT PLACEHOLDER');
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./healthcare-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator('.h-hero-visual>img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});

test('nonclinical scene uses real WebGL geometry and depth if available',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 const scene=await page.evaluate(()=>window.__healthcareCinema?{kind:window.__healthcareCinema.kind,available:window.__healthcareCinema.available,mounts:window.__healthcareCinema.mounts,vertices:window.__healthcareCinema.meshVertices}:null);
 if(scene?.available){
  expect(scene.kind).toBe('native-webgl-healthcare');
  expect(scene.mounts).toBe(2);
  expect(scene.vertices).toBeGreaterThan(250);
  await expect(page.locator('body')).toHaveClass(/healthcare-webgl-ready/);
  await expect(page.locator('canvas.immersive-webgl')).toHaveCount(2);
  const info=await page.locator('canvas.immersive-webgl').first().evaluate(c=>{const g=c.getContext('webgl');return{width:c.width,height:c.height,depth:g.isEnabled(g.DEPTH_TEST)};});
  expect(info.width).toBeGreaterThan(100);
  expect(info.height).toBeGreaterThan(100);
  expect(info.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});

test('scroll moves forward and reverses through administrative service chapters',async({page})=>{
 await page.goto(route);
 const last=page.locator('.healthcare-cinema-chapter[data-healthcare-chapter="3"]');
 await last.scrollIntoViewIfNeeded();
 await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__healthcareCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__healthcareCinema.progress),{timeout:7000}).toBeGreaterThan(2);
 }
 const first=page.locator('.healthcare-cinema-chapter[data-healthcare-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__healthcareCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__healthcareCinema.progress),{timeout:7000}).toBeLessThan(1);
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});

test('existing journey buttons synchronize 3D story and keyboard navigation',async({page})=>{
 await page.goto(route);
 await page.locator('.h-stage[data-stage="enquire"]').click();
 await expect(page.locator('#h-stage-number')).toHaveText('02 / 04');
 await expect(page.locator('.h-stage[data-stage="enquire"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.h-stage[data-stage="coordinate"]').click();
 await expect(page.locator('#h-stage-number')).toHaveText('04 / 04');
 if(await page.evaluate(()=>window.__healthcareCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__healthcareCinema.progress),{timeout:7000}).toBeGreaterThan(2.5);
 }
 await page.locator('.h-stage[data-stage="enquire"]').focus();
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('.h-stage[data-stage="followup"]')).toHaveAttribute('aria-pressed','true');
});

test('motion toggle and reduced-motion preference stop camera animation',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.motion-toggle');
 await toggle.click();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__healthcareCinema?.available))expect(await page.evaluate(()=>window.__healthcareCinema.paused)).toBe(true);
 await toggle.click();
 await expect(page.locator('body')).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__healthcareCinema?.available))expect(await page.evaluate(()=>window.__healthcareCinema.paused)).toBe(true);
});

test('blocked WebGL retains the original healthcare illustrations and controls',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return original.call(this,type,...args);};});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('body')).not.toHaveClass(/healthcare-webgl-ready/);
 await expect(page.locator('.h-hero-visual>img')).toBeVisible();
 await expect(page.locator('.healthcare-cinema-fallback')).toBeVisible();
 await page.locator('.h-stage[data-stage="followup"]').click();
 await expect(page.locator('#h-stage-title')).toHaveText('Keep administrative next steps clear.');
 expect(errors).toEqual([]);
});

test('without JavaScript chapters, FAQ and fixed-choice nonclinical brief remain readable',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('.h-cinema-hero h1')).toBeVisible();
  await expect(page.locator('.healthcare-cinema-chapter')).toHaveCount(4);
  await expect(page.locator('.healthcare-cinema-fallback')).toBeVisible();
  await expect(page.locator('#h-brief-form')).toBeVisible();
  await expect(page.locator('#questions details')).toHaveCount(3);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 }finally{await context.close();}
});