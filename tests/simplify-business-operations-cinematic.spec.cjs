const {test,expect}=require("@playwright/test");
const route="/solutions/simplify-business-operations/";

test("Sales cinema preserves original sales editorial journey and claims",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator(".op-cinema-hero h1")).toContainText("Less chasing");
 await expect(page.locator("#cinema-operations")).toBeVisible();
 await expect(page.locator(".op-cinema-chapter")).toHaveCount(4);
 await expect(page.locator(".op-cinema-heading")).toContainText("not a deployed workflow");
 await expect(page.locator(".op-step-button")).toHaveCount(4);
 await expect(page.locator(".op-problems article")).toHaveCount(3);
 await expect(page.locator(".rc-proof-card")).toContainText("CASE STUDY / PLACEHOLDER");
 await expect(page.locator(".op-demo-note")).toContainText("No tasks");
 await expect(page.locator("form")).toHaveCount(0);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 expect(errors).toEqual([]);
});
test("Native WebGL creates two depth-tested canvases with initialized mobile-safe frames",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 const scene=await page.evaluate(()=>window.__operationsCinema?{
  kind:window.__operationsCinema.kind,available:window.__operationsCinema.available,
  mounts:window.__operationsCinema.mounts,vertices:window.__operationsCinema.meshVertices
 }:null);
 expect(scene?.kind).toBe("native-webgl-simplify-operations");
 expect(scene?.vertices).toBeGreaterThan(300);
 if(scene.available){
  expect(scene.mounts).toBe(2);
  await expect(page.locator("body")).toHaveClass(/op-webgl-ready/);
  await expect(page.locator("canvas.immersive-webgl")).toHaveCount(2);
  const frames=await page.locator("canvas.immersive-webgl").evaluateAll(list=>list.map(c=>({w:c.width,h:c.height})));
  for(const f of frames){expect(f.w).toBeGreaterThan(100);expect(f.h).toBeGreaterThan(100);}
  const gl=await page.locator("canvas.immersive-webgl").first().evaluate(c=>{
   const context=c.getContext("webgl");return context?.isEnabled(context.DEPTH_TEST);
  });
  expect(gl).toBe(true);
 }
 expect(errors).toEqual([]);
});
test("Operations cinema chapters progress forward and reverse when scrolling",async({page})=>{
 await page.goto(route);
 const last=page.locator('.op-cinema-chapter[data-op-chapter="3"]');
 await last.scrollIntoViewIfNeeded();await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__operationsCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__operationsCinema.progress),{timeout:8000}).toBeGreaterThan(2);
 const first=page.locator('.op-cinema-chapter[data-op-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__operationsCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__operationsCinema.progress),{timeout:8000}).toBeLessThan(1);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});
test("Direct stage selectors work with clicks and keyboard navigation",async({page})=>{
 await page.goto(route);
 const controls=page.locator("[data-op-cinema-stage]");
 await expect(controls).toHaveCount(4);
 await controls.nth(2).click();await expect(controls.nth(2)).toHaveAttribute("aria-pressed","true");
 if(await page.evaluate(()=>window.__operationsCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__operationsCinema.progress),{timeout:8000}).toBeGreaterThan(1.5);
 await controls.nth(1).focus();await page.keyboard.press("ArrowRight");
 await expect(controls.nth(2)).toBeFocused();
 await expect(controls.nth(2)).toHaveAttribute("aria-pressed","true");
});
test("Original four-stage sales route synchronizes the cinematic scene",async({page})=>{
 await page.goto(route);
 await page.locator('.op-step-button[data-op-stage="3"]').click();
 await expect(page.locator("#op-step-panel-3")).toBeVisible();
 await expect(page.locator('.op-step-button[data-op-stage="3"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator('[data-op-cinema-stage="2"]')).toHaveAttribute("aria-pressed","true");
 if(await page.evaluate(()=>window.__operationsCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__operationsCinema.progress),{timeout:8000}).toBeGreaterThan(1.5);
 await page.locator('.op-step-button[data-op-stage="2"]').focus();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('.op-step-button[data-op-stage="3"]')).toBeFocused();
 await expect(page.locator("#op-step-panel-3")).toBeVisible();
});
test("Pause control and operating-system reduced motion keep the story readable",async({page})=>{
 await page.goto(route);
 const button=page.locator("#op-cinema-motion");
 await button.click();await expect(button).toHaveAttribute("aria-pressed","true");
 await expect(page.locator("body")).toHaveClass(/op-motion-paused/);
 expect(await page.evaluate(()=>window.__operationsCinema.paused)).toBe(true);
 await button.click();await expect(button).toHaveAttribute("aria-pressed","false");
 await page.emulateMedia({reducedMotion:"reduce"});await page.reload();
 await expect(page.locator("body")).toHaveClass(/op-motion-paused/);
 expect(await page.evaluate(()=>window.__operationsCinema.paused)).toBe(true);
 await expect(page.locator(".op-cinema-chapter")).toHaveCount(4);
});
test("Blocked WebGL retains the original SVG and sales journey interactions",async({page})=>{
 await page.addInitScript(()=>{
  const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
   if(["webgl","webgl2","experimental-webgl"].includes(type))return null;
   return original.call(this,type,...args);
  };
 });
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator("body")).not.toHaveClass(/op-webgl-ready/);
 await expect(page.locator(".op-art-panel>img")).toBeVisible();
 await expect(page.locator(".op-cinema-fallback")).toBeVisible();
 await page.locator('[data-op-cinema-stage="1"]').click();
 await expect(page.locator('[data-op-cinema-stage="1"]')).toHaveAttribute("aria-pressed","true");
 await page.locator('.op-step-button[data-op-stage="3"]').click();
 await expect(page.locator("#op-step-panel-3")).toBeVisible();
 expect(errors).toEqual([]);
});
test("Without JavaScript sales editorial, proposal destinations and story chapters remain visible",async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();await page.goto("http://127.0.0.1:4173"+route);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".op-cinema-chapter")).toHaveCount(4);
  await expect(page.locator(".op-cinema-fallback")).toBeVisible();
  await expect(page.locator(".op-step-button")).toHaveCount(4);
  await expect(page.locator("#op-step-panel-1")).toBeVisible();
  await expect(page.locator(".rc-final-action a")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 }finally{await context.close();}
});

test("Cinematic operations page exports hero and scroll-story visual review screenshots",async({page})=>{
 const fs=require("node:fs");
 fs.mkdirSync("screenshots",{recursive:true});
 await page.goto(route);
 await expect(page.locator(".op-cinema-hero h1")).toBeVisible();
 await page.evaluate(()=>document.fonts.ready);
 if(await page.evaluate(()=>window.__operationsCinema?.available)){
  await expect(page.locator("body")).toHaveClass(/op-webgl-ready/);
  await expect.poll(()=>page.locator(".op-art-panel>img").evaluate(i=>Number(getComputedStyle(i).opacity)),{timeout:8000}).toBeLessThan(.15);
 }
 await page.screenshot({path:"screenshots/simplify-business-operations-"+test.info().project.name+"-hero.png",animations:"disabled"});
 await page.locator('.op-cinema-chapter[data-op-chapter="1"]').scrollIntoViewIfNeeded();
 await expect(page.locator(".op-cinema-frame")).toBeVisible();
 await page.screenshot({path:"screenshots/simplify-business-operations-"+test.info().project.name+"-story.png",animations:"disabled"});
});
