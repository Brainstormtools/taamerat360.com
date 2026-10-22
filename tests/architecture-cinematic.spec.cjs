const {test,expect}=require('@playwright/test');
const route='/industries/architecture/';

test('Architecture cinematic hero, drawing story and business boundaries stay readable',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('.a-cinema-hero h1')).toContainText('Make room');
 await expect(page.locator('#cinema-architecture')).toBeVisible();
 await expect(page.locator('.architecture-cinema-chapter')).toHaveCount(4);
 await expect(page.locator('.architecture-cinema-heading')).toContainText('not a commissioned design');
 await expect(page.locator('.a-solutions')).toContainText('not design authorship');
 await expect(page.locator('.a-case-head')).toContainText('CONTENT PLACEHOLDER');
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./architecture-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator('.a-visual>img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});

test('the architectural WebGL maquette renders perspective geometry and depth when supported',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 const scene=await page.evaluate(()=>window.__architectureCinema?{kind:window.__architectureCinema.kind,available:window.__architectureCinema.available,mounts:window.__architectureCinema.mounts,vertices:window.__architectureCinema.meshVertices}:null);
 if(scene?.available){
  expect(scene.kind).toBe('native-webgl-architecture');
  expect(scene.mounts).toBe(2);
  expect(scene.vertices).toBeGreaterThan(250);
  await expect(page.locator('body')).toHaveClass(/architecture-webgl-ready/);
  await expect(page.locator('canvas.immersive-webgl')).toHaveCount(2);
  const gl=await page.locator('canvas.immersive-webgl').first().evaluate(c=>{const g=c.getContext('webgl');return{width:c.width,height:c.height,depth:g.isEnabled(g.DEPTH_TEST)};});
  expect(gl.width).toBeGreaterThan(100);
  expect(gl.height).toBeGreaterThan(100);
  expect(gl.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});

test('scroll progressively assembles the architectural model and reverses',async({page})=>{
 await page.goto(route);
 const fourth=page.locator('.architecture-cinema-chapter[data-architecture-chapter="3"]');
 await fourth.scrollIntoViewIfNeeded();
 await expect(fourth).toBeVisible();
 if(await page.evaluate(()=>window.__architectureCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__architectureCinema.progress),{timeout:7000}).toBeGreaterThan(2);
 }
 const first=page.locator('.architecture-cinema-chapter[data-architecture-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__architectureCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__architectureCinema.progress),{timeout:7000}).toBeLessThan(1);
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});

test('existing stage buttons control architecture model and arrow key selection',async({page})=>{
 await page.goto(route);
 await page.locator('.a-step[data-stage="brief"]').click();
 await expect(page.locator('#a-step-number')).toHaveText('02 / 04');
 await expect(page.locator('.a-step[data-stage="brief"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.a-step[data-stage="coordinate"]').click();
 await expect(page.locator('#a-step-number')).toHaveText('04 / 04');
 if(await page.evaluate(()=>window.__architectureCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__architectureCinema.progress),{timeout:7000}).toBeGreaterThan(2.5);
 }
 await page.locator('.a-step[data-stage="brief"]').focus();
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('.a-step[data-stage="proposal"]')).toHaveAttribute('aria-pressed','true');
});

test('motion toggle and reduced-motion settings are reflected in the 3D scene',async({page})=>{
 await page.goto(route);
 const button=page.locator('.motion-toggle');
 await button.click();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__architectureCinema?.available))expect(await page.evaluate(()=>window.__architectureCinema.paused)).toBe(true);
 await button.click();
 await expect(page.locator('body')).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__architectureCinema?.available))expect(await page.evaluate(()=>window.__architectureCinema.paused)).toBe(true);
});

test('blocked WebGL shows the original studio artwork and working workflow',async({page})=>{
 await page.addInitScript(()=>{
  const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
   if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;
   return original.call(this,type,...args);
  };
 });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('body')).not.toHaveClass(/architecture-webgl-ready/);
 await expect(page.locator('.a-visual>img')).toBeVisible();
 await expect(page.locator('.architecture-cinema-fallback')).toBeVisible();
 await page.locator('.a-step[data-stage="proposal"]').click();
 await expect(page.locator('#a-step-title')).toHaveText('Give decisions a clear route.');
 expect(errors).toEqual([]);
});

test('with JavaScript disabled, four chapters, FAQ and browser-only brief remain',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('.a-cinema-hero h1')).toBeVisible();
  await expect(page.locator('.architecture-cinema-chapter')).toHaveCount(4);
  await expect(page.locator('.architecture-cinema-fallback')).toBeVisible();
  await expect(page.locator('#a-brief-form')).toBeVisible();
  await expect(page.locator('#questions details')).toHaveCount(3);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 }finally{await context.close();}
});