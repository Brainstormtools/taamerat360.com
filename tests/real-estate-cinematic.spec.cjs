const {test,expect}=require('@playwright/test');
const route='/industries/real-estate/';

test('Real Estate immersive hero and four-chapter narrative keep truthful scope',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(route);
 await expect(page.locator('.r-cinema-hero h1')).toContainText('Every address');
 await expect(page.locator('#cinema-property')).toBeVisible();
 await expect(page.locator('.property-cinema-chapter')).toHaveCount(4);
 await expect(page.locator('.property-cinema-heading')).toContainText('not an actual property listing');
 await expect(page.locator('.r-solutions')).toContainText('not property brokerage');
 await expect(page.locator('.r-case-top')).toContainText('CONTENT PLACEHOLDER');
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./real-estate-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator('.r-hero-scene img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});

test('native WebGL renders real property geometry and depth where supported',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(route);
 const model=await page.evaluate(()=>window.__propertyCinema?{kind:window.__propertyCinema.kind,available:window.__propertyCinema.available,mounts:window.__propertyCinema.mounts,vertices:window.__propertyCinema.meshVertices}:null);
 if(model?.available){
  expect(model.kind).toBe('native-webgl-real-estate');
  expect(model.vertices).toBeGreaterThan(250);
  expect(model.mounts).toBe(2);
  await expect(page.locator('body')).toHaveClass(/property-webgl-ready/);
  await expect(page.locator('canvas.immersive-webgl')).toHaveCount(2);
  const details=await page.locator('canvas.immersive-webgl').first().evaluate(c=>{const gl=c.getContext('webgl');return {w:c.width,h:c.height,depth:gl.isEnabled(gl.DEPTH_TEST)};});
  expect(details.w).toBeGreaterThan(100);
  expect(details.h).toBeGreaterThan(100);
  expect(details.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});

test('scroll progresses and reverses the cinematic property journey',async({page})=>{
 await page.goto(route);
 const last=page.locator('.property-cinema-chapter[data-property-chapter="3"]');
 await last.scrollIntoViewIfNeeded();
 await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__propertyCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__propertyCinema.progress),{timeout:7000}).toBeGreaterThan(2);
 }
 const first=page.locator('.property-cinema-chapter[data-property-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__propertyCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__propertyCinema.progress),{timeout:7000}).toBeLessThan(1);
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});

test('existing Real Estate stage buttons synchronize a 3D chapter and keyboard focus',async({page})=>{
 await page.goto(route);
 await page.locator('.r-stage[data-stage="qualify"]').click();
 await expect(page.locator('#r-stage-index')).toHaveText('02 / 04');
 await expect(page.locator('.r-stage[data-stage="qualify"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.r-stage[data-stage="followup"]').click();
 await expect(page.locator('#r-stage-index')).toHaveText('04 / 04');
 if(await page.evaluate(()=>window.__propertyCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__propertyCinema.progress),{timeout:7000}).toBeGreaterThan(2.5);
 }
 await page.locator('.r-stage[data-stage="qualify"]').focus();
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('.r-stage[data-stage="viewing"]')).toHaveAttribute('aria-pressed','true');
});

test('motion toggle and reduced-motion preference control the 3D camera',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.motion-toggle');
 await toggle.click();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__propertyCinema?.available))expect(await page.evaluate(()=>window.__propertyCinema.paused)).toBe(true);
 await toggle.click();
 await expect(page.locator('body')).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__propertyCinema?.available))expect(await page.evaluate(()=>window.__propertyCinema.paused)).toBe(true);
});

test('disabled WebGL retains the original artwork, content and stage controls',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return original.call(this,type,...args);};});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(route);
 await expect(page.locator('body')).not.toHaveClass(/property-webgl-ready/);
 await expect(page.locator('.r-hero-scene img')).toBeVisible();
 await expect(page.locator('.property-cinema-fallback')).toBeVisible();
 await page.locator('.r-stage[data-stage="viewing"]').click();
 await expect(page.locator('#r-stage-title')).toHaveText('Make the viewing feel effortless.');
 expect(errors).toEqual([]);
});

test('without JavaScript, all four chapters and the local brief remain readable',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('.r-cinema-hero h1')).toBeVisible();
  await expect(page.locator('.property-cinema-chapter')).toHaveCount(4);
  await expect(page.locator('.property-cinema-fallback')).toBeVisible();
  await expect(page.locator('#r-brief-form')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 }finally{await context.close();}
});