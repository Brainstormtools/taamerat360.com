const {test,expect}=require('@playwright/test');
const route='/industries/education/';

test('Education cinematic campus and story remain truthful and complete',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator('.ed-cinema-hero h1')).toContainText('Every learner');
 await expect(page.locator('#cinema-education')).toBeVisible();
 await expect(page.locator('.education-cinema-chapter')).toHaveCount(4);
 await expect(page.locator('.education-cinema-heading')).toContainText('not a real institution');
 await expect(page.locator('#solutions')).toContainText('not teaching, accreditation');
 await expect(page.locator('.ed-placeholder-top')).toContainText('CONTENT PLACEHOLDER');
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./education-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator('.ed-hero-art>img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});
test('Education scene is actual WebGL with dimensional geometry when available',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
 const scene=await page.evaluate(()=>window.__educationCinema?{kind:window.__educationCinema.kind,available:window.__educationCinema.available,mounts:window.__educationCinema.mounts,vertices:window.__educationCinema.meshVertices}:null);
 if(scene?.available){
  expect(scene.kind).toBe('native-webgl-education');
  expect(scene.mounts).toBe(2);
  expect(scene.vertices).toBeGreaterThan(250);
  await expect(page.locator('body')).toHaveClass(/education-webgl-ready/);
  await expect(page.locator('canvas.immersive-webgl')).toHaveCount(2);
  const gl=await page.locator('canvas.immersive-webgl').first().evaluate(c=>{const g=c.getContext('webgl');return{width:c.width,height:c.height,depth:g.isEnabled(g.DEPTH_TEST)};});
  expect(gl.width).toBeGreaterThan(100);expect(gl.height).toBeGreaterThan(100);expect(gl.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('scroll advances and reverses the Education service narrative',async({page})=>{
 await page.goto(route);
 const last=page.locator('.education-cinema-chapter[data-education-chapter="3"]');
 await last.scrollIntoViewIfNeeded();
 await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__educationCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__educationCinema.progress),{timeout:7000}).toBeGreaterThan(2);
 const first=page.locator('.education-cinema-chapter[data-education-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__educationCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__educationCinema.progress),{timeout:7000}).toBeLessThan(1);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});
test('existing education stage controls sync the cinematic scene and remain keyboard accessible',async({page})=>{
 await page.goto(route);
 await page.locator('.ed-stage[data-stage="enquiry"]').click();
 await expect(page.locator('#ed-stage-number')).toHaveText('02 / 04');
 await expect(page.locator('.ed-stage[data-stage="enquiry"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.ed-stage[data-stage="connect"]').click();
 await expect(page.locator('#ed-stage-number')).toHaveText('04 / 04');
 if(await page.evaluate(()=>window.__educationCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__educationCinema.progress),{timeout:7000}).toBeGreaterThan(2.5);
 await page.locator('.ed-stage[data-stage="enquiry"]').focus();
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('.ed-stage[data-stage="welcome"]')).toHaveAttribute('aria-pressed','true');
});
test('motion toggle and reduced-motion preference freeze automated scene progress',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.motion-toggle');await toggle.click();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__educationCinema?.available))expect(await page.evaluate(()=>window.__educationCinema.paused)).toBe(true);
 await toggle.click();await expect(page.locator('body')).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__educationCinema?.available))expect(await page.evaluate(()=>window.__educationCinema.paused)).toBe(true);
});
test('when WebGL is blocked, original SVG artwork and interactive journey survive',async({page})=>{
 await page.addInitScript(()=>{const orig=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(['webgl','webgl2','experimental-webgl'].includes(type))return null;return orig.call(this,type,...args);};});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator('body')).not.toHaveClass(/education-webgl-ready/);
 await expect(page.locator('.ed-hero-art>img')).toBeVisible();
 await expect(page.locator('.education-cinema-fallback')).toBeVisible();
 await page.locator('.ed-stage[data-stage="welcome"]').click();
 await expect(page.locator('#ed-stage-title')).toHaveText('Make the welcome count.');
 expect(errors).toEqual([]);
});
test('without JavaScript, all four chapters, FAQ and private brief remain available',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('.ed-cinema-hero h1')).toBeVisible();
  await expect(page.locator('.education-cinema-chapter')).toHaveCount(4);
  await expect(page.locator('.education-cinema-fallback')).toBeVisible();
  await expect(page.locator('#ed-form')).toBeVisible();
  await expect(page.locator('#questions details')).toHaveCount(3);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 }finally{await context.close();}
});