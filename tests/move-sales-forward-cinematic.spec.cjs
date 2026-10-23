const {test,expect}=require("@playwright/test");
const route="/solutions/move-sales-forward/";

test("Sales cinema preserves original sales editorial journey and claims",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator(".sf-cinema-hero h1")).toContainText("Interest is good");
 await expect(page.locator("#cinema-sales")).toBeVisible();
 await expect(page.locator(".sf-cinema-chapter")).toHaveCount(4);
 await expect(page.locator(".sf-cinema-heading")).toContainText("no customer database");
 await expect(page.locator(".sf-stage-button")).toHaveCount(4);
 await expect(page.locator(".sf-problems article")).toHaveCount(3);
 await expect(page.locator(".rc-proof-card")).toContainText("CASE STUDY / PLACEHOLDER");
 await expect(page.locator(".sf-demo-note")).toContainText("No leads are saved");
 await expect(page.locator("form")).toHaveCount(0);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 expect(errors).toEqual([]);
});
test("Native WebGL creates two depth-tested canvases with initialized mobile-safe frames",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 const scene=await page.evaluate(()=>window.__salesForwardCinema?{
  kind:window.__salesForwardCinema.kind,available:window.__salesForwardCinema.available,
  mounts:window.__salesForwardCinema.mounts,vertices:window.__salesForwardCinema.meshVertices
 }:null);
 expect(scene?.kind).toBe("native-webgl-move-sales-forward");
 expect(scene?.vertices).toBeGreaterThan(300);
 if(scene.available){
  expect(scene.mounts).toBe(2);
  await expect(page.locator("body")).toHaveClass(/sf-webgl-ready/);
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
test("Sales cinema chapters progress forward and reverse when scrolling",async({page})=>{
 await page.goto(route);
 const last=page.locator('.sf-cinema-chapter[data-sf-chapter="3"]');
 await last.scrollIntoViewIfNeeded();await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__salesForwardCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__salesForwardCinema.progress),{timeout:8000}).toBeGreaterThan(2);
 const first=page.locator('.sf-cinema-chapter[data-sf-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__salesForwardCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__salesForwardCinema.progress),{timeout:8000}).toBeLessThan(1);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});
test("Direct stage selectors work with clicks and keyboard navigation",async({page})=>{
 await page.goto(route);
 const controls=page.locator("[data-sf-cinema-stage]");
 await expect(controls).toHaveCount(4);
 await controls.nth(2).click();await expect(controls.nth(2)).toHaveAttribute("aria-pressed","true");
 if(await page.evaluate(()=>window.__salesForwardCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__salesForwardCinema.progress),{timeout:8000}).toBeGreaterThan(1.5);
 await controls.nth(1).focus();await page.keyboard.press("ArrowRight");
 await expect(controls.nth(2)).toBeFocused();
 await expect(controls.nth(2)).toHaveAttribute("aria-pressed","true");
});
test("Original four-stage sales route synchronizes the cinematic scene",async({page})=>{
 await page.goto(route);
 await page.locator('.sf-stage-button[data-stage="3"]').click();
 await expect(page.locator("#stage-panel-3")).toBeVisible();
 await expect(page.locator('.sf-stage-button[data-stage="3"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator('[data-sf-cinema-stage="2"]')).toHaveAttribute("aria-pressed","true");
 if(await page.evaluate(()=>window.__salesForwardCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__salesForwardCinema.progress),{timeout:8000}).toBeGreaterThan(1.5);
 await page.locator('.sf-stage-button[data-stage="2"]').focus();
 await page.keyboard.press("ArrowRight");
 await expect(page.locator('.sf-stage-button[data-stage="3"]')).toBeFocused();
 await expect(page.locator("#stage-panel-3")).toBeVisible();
});
test("Pause control and operating-system reduced motion keep the story readable",async({page})=>{
 await page.goto(route);
 const button=page.locator("#sf-cinema-motion");
 await button.click();await expect(button).toHaveAttribute("aria-pressed","true");
 await expect(page.locator("body")).toHaveClass(/sf-motion-paused/);
 expect(await page.evaluate(()=>window.__salesForwardCinema.paused)).toBe(true);
 await button.click();await expect(button).toHaveAttribute("aria-pressed","false");
 await page.emulateMedia({reducedMotion:"reduce"});await page.reload();
 await expect(page.locator("body")).toHaveClass(/sf-motion-paused/);
 expect(await page.evaluate(()=>window.__salesForwardCinema.paused)).toBe(true);
 await expect(page.locator(".sf-cinema-chapter")).toHaveCount(4);
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
 await expect(page.locator("body")).not.toHaveClass(/sf-webgl-ready/);
 await expect(page.locator(".sf-art-panel>img")).toBeVisible();
 await expect(page.locator(".sf-cinema-fallback")).toBeVisible();
 await page.locator('[data-sf-cinema-stage="1"]').click();
 await expect(page.locator('[data-sf-cinema-stage="1"]')).toHaveAttribute("aria-pressed","true");
 await page.locator('.sf-stage-button[data-stage="3"]').click();
 await expect(page.locator("#stage-panel-3")).toBeVisible();
 expect(errors).toEqual([]);
});
test("Without JavaScript sales editorial, proposal destinations and story chapters remain visible",async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();await page.goto("http://127.0.0.1:4173"+route);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".sf-cinema-chapter")).toHaveCount(4);
  await expect(page.locator(".sf-cinema-fallback")).toBeVisible();
  await expect(page.locator(".sf-stage-button")).toHaveCount(4);
  await expect(page.locator("#stage-panel-1")).toBeVisible();
  await expect(page.locator(".rc-final-action a")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 }finally{await context.close();}
});

test("Cinematic sales page exports hero and scroll-story visual review screenshots",async({page})=>{
 const fs=require("node:fs");
 fs.mkdirSync("screenshots",{recursive:true});
 await page.goto(route);
 await expect(page.locator(".sf-cinema-hero h1")).toBeVisible();
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:"screenshots/move-sales-forward-"+test.info().project.name+"-hero.png",animations:"disabled"});
 await page.locator('.sf-cinema-chapter[data-sf-chapter="1"]').scrollIntoViewIfNeeded();
 await expect(page.locator(".sf-cinema-frame")).toBeVisible();
 await page.screenshot({path:"screenshots/move-sales-forward-"+test.info().project.name+"-story.png",animations:"disabled"});
});
