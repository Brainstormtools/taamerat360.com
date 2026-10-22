const {test,expect}=require('@playwright/test');

test('homepage cinematic master wires native WebGL and retains editorial content',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('.cinema-hero h1')).toContainText('Business,');
 await expect(page.locator('.cinema-journey #journey-title')).toContainText('connect.');
 await expect(page.locator('script[src="./cinematic-3d.js"]')).toHaveCount(1);
 await expect(page.locator('link[href="./cinematic-3d.css"]')).toHaveCount(1);
 await expect.poll(()=>page.evaluate(()=>typeof window.__taameratCinema!=='undefined'||!document.body.classList.contains('cinema-webgl-ready'))).toBe(true);
 const native=await page.evaluate(()=>window.__taameratCinema);
 if(native?.available){
  await expect(page.locator('canvas.cinema-webgl')).toHaveCount(native.mounts);
  await expect(page.locator('body')).toHaveClass(/cinema-webgl-ready/);
  expect(native.kind).toBe('native-webgl-3d');
  const live=await page.locator('canvas.cinema-webgl').first().evaluate(c=>{const gl=c.getContext('webgl');return{width:c.width,height:c.height,depth:gl.isEnabled(gl.DEPTH_TEST)};});
  expect(live.width).toBeGreaterThan(100);
  expect(live.height).toBeGreaterThan(100);
  expect(live.depth).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('3D journey chapter clicks remain keyboard accessible and use existing scene labels',async({page})=>{
 await page.goto('/');
 await page.locator('[data-stage="1"]').click();
 await expect(page.locator('#stage-index')).toHaveText('02');
 await expect(page.locator('#stage-badge')).toHaveText('THE CONVERSATION MOMENT');
 if(await page.evaluate(()=>window.__taameratCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__taameratCinema.progress)).toBeGreaterThan(0.75);
 }
 await page.locator('[data-stage="2"]').click();
 await expect(page.locator('#stage-index')).toHaveText('03');
 if(await page.evaluate(()=>window.__taameratCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__taameratCinema.progress)).toBeGreaterThan(1.7);
 }
 await page.locator('[data-stage="0"]').click();
 await expect(page.locator('#stage-index')).toHaveText('01');
});
test('scroll drives the journey while preserving ordinary document scrolling',async({page})=>{
 await page.goto('/');
 const target=page.locator('[data-journey="2"]');
 await target.scrollIntoViewIfNeeded();
 await expect(page.locator('.journey-steps')).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
 if(await page.evaluate(()=>window.__taameratCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__taameratCinema.progress),{timeout:5000}).toBeGreaterThan(1.0);
 }
 await page.locator('[data-journey="0"]').scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__taameratCinema?.available)){
  await expect.poll(()=>page.evaluate(()=>window.__taameratCinema.progress),{timeout:5000}).toBeLessThan(1.3);
 }
});
test('motion controls pause the camera and reduced-motion starts paused',async({page})=>{
 await page.goto('/');
 await page.locator('.motion-toggle').click();
 await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','true');
 if(await page.evaluate(()=>window.__taameratCinema?.available))expect(await page.evaluate(()=>window.__taameratCinema.paused)).toBe(true);
 await page.locator('.motion-toggle').click();
 await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed','false');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__taameratCinema?.available))expect(await page.evaluate(()=>window.__taameratCinema.paused)).toBe(true);
});
test('blocked WebGL uses the original illustrations, no JS errors or missing controls',async({page})=>{
 await page.addInitScript(()=>{
  const old=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...rest){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return old.call(this,type,...rest);};
 });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('body')).not.toHaveClass(/cinema-webgl-ready/);
 await expect(page.locator('img.hero-image')).toBeVisible();
 await expect(page.locator('.stage-img.is-current')).toHaveAttribute('src',/artwork-find\.svg/);
 await page.locator('[data-stage="1"]').click();
 await expect(page.locator('.stage-img.is-current')).toHaveAttribute('src',/artwork-connect\.svg/);
 expect(errors).toEqual([]);
});
