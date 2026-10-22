const {test,expect}=require('@playwright/test');
const route='/industries/e-commerce/';

test('E-commerce cinematic hero and product narrative retain accurate scope',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(route);
 await expect(page.locator('.e-cinema-hero h1')).toContainText('Every click');
 await expect(page.locator('#cinema-ecommerce')).toBeVisible();
 await expect(page.locator('.ecommerce-cinema-chapter')).toHaveCount(4);
 await expect(page.locator('.ecommerce-cinema-heading')).toContainText('No item shown here is a real product for sale');
 await expect(page.locator('.e-solutions')).toContainText('Payment processing, logistics and guaranteed revenue outcomes are not implied');
 await expect(page.locator('.e-placeholder-head')).toContainText('CONTENT PLACEHOLDER');
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./ecommerce-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator('.e-hero-visual>img').evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});

test('native WebGL product display uses lit geometry and depth when available',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(route);
 const scene=await page.evaluate(()=>window.__ecommerceCinema?{kind:window.__ecommerceCinema.kind,available:window.__ecommerceCinema.available,mounts:window.__ecommerceCinema.mounts,vertices:window.__ecommerceCinema.meshVertices}:null);
 if(scene?.available){
  expect(scene.kind).toBe('native-webgl-ecommerce');
  expect(scene.mounts).toBe(2);
  expect(scene.vertices).toBeGreaterThan(250);
  await expect(page.locator('body')).toHaveClass(/ecommerce-webgl-ready/);
  await expect(page.locator('canvas.immersive-webgl')).toHaveCount(2);
  const depth=await page.locator('canvas.immersive-webgl').first().evaluate(el=>{const g=el.getContext('webgl');return{w:el.width,h:el.height,depth:g.isEnabled(g.DEPTH_TEST)};});
  expect(depth.w).toBeGreaterThan(100);
  expect(depth.h).toBeGreaterThan(100);
  expect(depth.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});

test('scroll forwards and backwards through product journey without horizontal overflow',async({page})=>{
 await page.goto(route);
 const end=page.locator('.ecommerce-cinema-chapter[data-ecommerce-chapter="3"]');
 await end.scrollIntoViewIfNeeded();
 await expect(end).toBeVisible();
 if(await page.evaluate(()=>window.__ecommerceCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__ecommerceCinema.progress),{timeout:7000}).toBeGreaterThan(2);
 }
 const first=page.locator('.ecommerce-cinema-chapter[data-ecommerce-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__ecommerceCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__ecommerceCinema.progress),{timeout:7000}).toBeLessThan(1);
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});

test('original journey stage buttons control narrative and keyboard navigation',async({page})=>{
 await page.goto(route);
 await page.locator('.e-stage[data-stage="consider"]').click();
 await expect(page.locator('#e-stage-no')).toHaveText('02 / 04');
 await expect(page.locator('.e-stage[data-stage="consider"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.e-stage[data-stage="return"]').click();
 await expect(page.locator('#e-stage-no')).toHaveText('04 / 04');
 if(await page.evaluate(()=>window.__ecommerceCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__ecommerceCinema.progress),{timeout:7000}).toBeGreaterThan(2.5);
 }
 await page.locator('.e-stage[data-stage="consider"]').focus();
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('.e-stage[data-stage="order"]')).toHaveAttribute('aria-pressed','true');
});

test('motion toggle and reduced-motion preference stop the animated scene',async({page})=>{
 await page.goto(route);
 const toggle=page.locator('.motion-toggle');
 await toggle.click();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__ecommerceCinema?.available))expect(await page.evaluate(()=>window.__ecommerceCinema.paused)).toBe(true);
 await toggle.click();
 await expect(page.locator('body')).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__ecommerceCinema?.available))expect(await page.evaluate(()=>window.__ecommerceCinema.paused)).toBe(true);
});

test('unavailable WebGL shows the original e-commerce illustrations and controls',async({page})=>{
 await page.addInitScript(()=>{
  const orig=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
   if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;
   return orig.call(this,type,...args);
  };
 });
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(route);
 await expect(page.locator('body')).not.toHaveClass(/ecommerce-webgl-ready/);
 await expect(page.locator('.e-hero-visual>img')).toBeVisible();
 await expect(page.locator('.ecommerce-cinema-fallback')).toBeVisible();
 await page.locator('.e-stage[data-stage="order"]').click();
 await expect(page.locator('#e-stage-title')).toHaveText('Connect the teams behind the order.');
 expect(errors).toEqual([]);
});

test('without JavaScript the full scroll story and local brief builder remain readable',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173'+route);
  await expect(page.locator('.e-cinema-hero h1')).toBeVisible();
  await expect(page.locator('.ecommerce-cinema-chapter')).toHaveCount(4);
  await expect(page.locator('.ecommerce-cinema-fallback')).toBeVisible();
  await expect(page.locator('#e-form')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 }finally{await context.close();}
});