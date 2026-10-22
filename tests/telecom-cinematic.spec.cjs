const {test,expect}=require("@playwright/test");
const route="/industries/telecom/";

test("Telecom cinematic experience retains truthful business scope and original content",async({page})=>{
 const errors=[];page.on("pageerror",error=>errors.push(error.message));await page.goto(route);
 await expect(page.locator(".t-cinema-hero h1")).toContainText("Make every");
 await expect(page.locator("#cinema-telecom")).toBeVisible();
 await expect(page.locator(".telecom-cinema-chapter")).toHaveCount(4);
 await expect(page.locator(".telecom-cinema-heading")).toContainText("not an operating network");
 await expect(page.locator("#journey")).toContainText("No network activation");
 await expect(page.locator(".t-proof-head")).toContainText("CONTENT PLACEHOLDER");
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./telecom-3d.js"]')).toHaveCount(1);
 await expect.poll(()=>page.locator(".t-art>img").evaluate(im=>im.complete&&im.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});

test("Native Telecom WebGL provides a real depth-tested two-canvas 3D model",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 const scene=await page.evaluate(()=>window.__telecomCinema?{
  kind:window.__telecomCinema.kind,available:window.__telecomCinema.available,
  mounts:window.__telecomCinema.mounts,vertices:window.__telecomCinema.meshVertices
 }:null);
 if(scene?.available){
  expect(scene.kind).toBe("native-webgl-telecom");
  expect(scene.mounts).toBe(2);
  expect(scene.vertices).toBeGreaterThan(300);
  await expect(page.locator("body")).toHaveClass(/telecom-webgl-ready/);
  await expect(page.locator("canvas.immersive-webgl")).toHaveCount(2);
  const frames=await page.locator("canvas.immersive-webgl").evaluateAll(list=>list.map(c=>({width:c.width,height:c.height})));
  for(const frame of frames){expect(frame.width).toBeGreaterThan(100);expect(frame.height).toBeGreaterThan(100);}
  const gl=await page.locator("canvas.immersive-webgl").first().evaluate(c=>{
   const g=c.getContext("webgl");return{depth:g.isEnabled(g.DEPTH_TEST),width:c.width};
  });
  expect(gl.depth).toBe(true);expect(gl.width).toBeGreaterThan(100);
 }
 expect(errors).toEqual([]);
});

test("Telecom scroll chapter progression is continuous and reversible",async({page})=>{
 await page.goto(route);
 const last=page.locator('.telecom-cinema-chapter[data-telecom-chapter="3"]');
 await last.scrollIntoViewIfNeeded();await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__telecomCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__telecomCinema.progress),{timeout:8000}).toBeGreaterThan(2);
 const first=page.locator('.telecom-cinema-chapter[data-telecom-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__telecomCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__telecomCinema.progress),{timeout:8000}).toBeLessThan(1);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});

test("Telecom existing stage buttons sync the 3D world and keep keyboard navigation",async({page})=>{
 await page.goto(route);
 await page.locator('.t-step[data-stage="understand"]').click();
 await expect(page.locator("#t-stage-title")).toHaveText("Make options simpler to understand.");
 await expect(page.locator('.t-step[data-stage="understand"]')).toHaveAttribute("aria-pressed","true");
 await page.locator('.t-step[data-stage="coordinate"]').click();
 await expect(page.locator("#t-stage-number")).toHaveText("04 / 04");
 if(await page.evaluate(()=>window.__telecomCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__telecomCinema.progress),{timeout:8000}).toBeGreaterThan(2.5);
 await page.locator('.t-step[data-stage="understand"]').focus();
 await page.keyboard.press("ArrowDown");
 await expect(page.locator('.t-step[data-stage="enquire"]')).toHaveAttribute("aria-pressed","true");
});

test("Telecom 3D respects pause and operating-system reduced motion",async({page})=>{
 await page.goto(route);
 await page.locator(".motion-toggle").click();
 await expect(page.locator("body")).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__telecomCinema?.available))
  expect(await page.evaluate(()=>window.__telecomCinema.paused)).toBe(true);
 await page.locator(".motion-toggle").click();
 await expect(page.locator("body")).not.toHaveClass(/motion-off/);
 await page.emulateMedia({reducedMotion:"reduce"});await page.reload();
 await expect(page.locator("body")).toHaveClass(/motion-off/);
 if(await page.evaluate(()=>window.__telecomCinema?.available))
  expect(await page.evaluate(()=>window.__telecomCinema.paused)).toBe(true);
});

test("Without WebGL, the original SVG and four-stage interaction remain available",async({page})=>{
 await page.addInitScript(()=>{
  const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
   if(["webgl","webgl2","experimental-webgl"].includes(type))return null;
   return original.call(this,type,...args);
  };
 });
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator("body")).not.toHaveClass(/telecom-webgl-ready/);
 await expect(page.locator(".t-art>img")).toBeVisible();
 await expect(page.locator(".telecom-cinema-fallback")).toBeVisible();
 await page.locator('.t-step[data-stage="enquire"]').click();
 await expect(page.locator("#t-stage-title")).toHaveText("Route general enquiries with context.");
 expect(errors).toEqual([]);
});

test("Without JavaScript, public business chapters, FAQ and brief stay readable",async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();await page.goto("http://127.0.0.1:4173"+route);
  await expect(page.locator(".t-cinema-hero h1")).toBeVisible();
  await expect(page.locator(".telecom-cinema-chapter")).toHaveCount(4);
  await expect(page.locator(".telecom-cinema-fallback")).toBeVisible();
  await expect(page.locator("#t-form")).toBeVisible();
  await expect(page.locator("#questions details")).toHaveCount(3);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 }finally{await context.close();}
});
