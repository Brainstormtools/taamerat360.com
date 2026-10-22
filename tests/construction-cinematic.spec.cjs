const {test,expect}=require('@playwright/test');
const route='/industries/construction/';

test('Construction immersive hero and scroll chapters retain accurate business context',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('.c-cinema-hero h1')).toContainText('move forward.');
 await expect(page.locator('#cinema-construction')).toBeVisible();
 await expect(page.locator('.construction-cinema-chapter')).toHaveCount(4);
 await expect(page.locator('.construction-cinema-heading')).toContainText('not an engineering design');
 await expect(page.locator('.c-value')).toContainText('not structural design');
 await expect(page.locator('.c-placeholder-flag')).toContainText('CONTENT PLACEHOLDER');
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./construction-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator('.c-building').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});
test('Construction native WebGL uses real depth and lit geometry when supported',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
 const scene=await page.evaluate(()=>window.__constructionCinema?{available:window.__constructionCinema.available,mounts:window.__constructionCinema.mounts,meshVertices:window.__constructionCinema.meshVertices,kind:window.__constructionCinema.kind}:null);
 if(scene&&scene.available){
  expect(scene.kind).toBe('native-webgl-construction');
  expect(scene.meshVertices).toBeGreaterThan(250);
  expect(scene.mounts).toBe(2);
  await expect(page.locator('body')).toHaveClass(/construction-webgl-ready/);
  await expect(page.locator('canvas.immersive-webgl')).toHaveCount(2);
  const gl=await page.locator('canvas.immersive-webgl').first().evaluate(el=>{const g=el.getContext('webgl');return{w:el.width,h:el.height,depth:g.isEnabled(g.DEPTH_TEST)};});
  expect(gl.w).toBeGreaterThan(100);expect(gl.h).toBeGreaterThan(100);expect(gl.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('Scroll advances and reverses building assembly without breaking page navigation',async({page})=>{
 await page.goto(route);
 const end=page.locator('.construction-cinema-chapter[data-construction-chapter="3"]');
 await end.scrollIntoViewIfNeeded();
 await expect(end).toBeVisible();
 if(await page.evaluate(()=>window.__constructionCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__constructionCinema.progress),{timeout:7000}).toBeGreaterThan(2);
 }
 const start=page.locator('.construction-cinema-chapter[data-construction-chapter="0"]');
 await start.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__constructionCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__constructionCinema.progress),{timeout:7000}).toBeLessThan(1);
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});
test('Manual stage controls sync the cinematic camera and retain keyboard operation',async({page})=>{
 await page.goto(route);
 await page.locator('.c-process-button[data-stage="scope"]').click();
 await expect(page.locator('#stage-number')).toHaveText('02 / 04');
 await expect(page.locator('.c-process-button[data-stage="scope"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.c-process-button[data-stage="handover"]').click();
 await expect(page.locator('#stage-number')).toHaveText('04 / 04');
 if(await page.evaluate(()=>window.__constructionCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__constructionCinema.progress),{timeout:7000}).toBeGreaterThan(2.5);
 }
 await page.locator('.c-process-button[data-stage="scope"]').focus();
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('.c-process-button[data-stage="coordinate"]')).toHaveAttribute('aria-pressed','true');
});
test('Motion toggle and reduced-motion preferences keep immersive scene controllable',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.motion-toggle');
 await toggle.click();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__constructionCinema?.available))expect(await page.evaluate(()=>window.__constructionCinema.paused)).toBe(true);
 await toggle.click();await expect(page.locator('body')).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__constructionCinema?.available))expect(await page.evaluate(()=>window.__constructionCinema.paused)).toBe(true);
});
test('WebGL blocked gracefully retains accessible original construction illustration and workflow',async({page})=>{
 await page.addInitScript(()=>{const old=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(name,...rest){if(name==='webgl'||name==='webgl2'||name==='experimental-webgl')return null;return old.call(this,name,...rest);};});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator('body')).not.toHaveClass(/construction-webgl-ready/);
 await expect(page.locator('.c-building')).toBeVisible();
 await expect(page.locator('.construction-cinema-fallback')).toBeVisible();
 await page.locator('.c-process-button[data-stage="coordinate"]').click();
 await expect(page.locator('#stage-title')).toHaveText('Keep everyone on the same page.');
 expect(errors).toEqual([]);
});
test('JavaScript-disabled construction page still includes all four scroll chapters and brief builder',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{const page=await context.newPage();await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('.c-cinema-hero h1')).toBeVisible();
  await expect(page.locator('.construction-cinema-chapter')).toHaveCount(4);
  await expect(page.locator('.construction-cinema-fallback')).toBeVisible();
  await expect(page.locator('#brief-form')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 }finally{await context.close();}
});
