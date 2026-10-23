const {test,expect}=require("@playwright/test");
const route="/solutions/reach-more-customers/";
const state=()=>window.__reachCustomersCinema?{
 available:window.__reachCustomersCinema.available,
 kind:window.__reachCustomersCinema.kind,
 mounts:window.__reachCustomersCinema.mounts,
 vertices:window.__reachCustomersCinema.meshVertices
}:null;

test("Discovery cinema preserves original editorial content and non-guarantee claims",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator(".rc-cinema-hero h1")).toContainText("Good business");
 await expect(page.locator("#cinema-reach")).toBeVisible();
 await expect(page.locator(".rc-cinema-chapter")).toHaveCount(4);
 await expect(page.locator(".rc-cinema-heading")).toContainText("not real advertising-platform results");
 await expect(page.locator(".rc-proof-card")).toContainText("PLACEHOLDER");
 await expect(page.locator(".rc-final-action")).toContainText("Successful enquiry delivery has not yet been verified");
 await expect(page.locator(".rc-problem")).toHaveCount(3);
 await expect(page.locator(".rc-steps article")).toHaveCount(3);
 await expect(page.locator("form")).toHaveCount(0);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 expect(errors).toEqual([]);
});

test("Native WebGL renders two depth-tested canvases, including initial offscreen story",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 const snapshot=await page.evaluate(state);
 expect(snapshot?.kind).toBe("native-webgl-reach-more-customers");
 expect(snapshot?.vertices).toBeGreaterThan(300);
 if(snapshot?.available){
  expect(snapshot.mounts).toBe(2);
  await expect(page.locator("body")).toHaveClass(/rc-webgl-ready/);
  await expect(page.locator("canvas.immersive-webgl")).toHaveCount(2);
  const frames=await page.locator("canvas.immersive-webgl").evaluateAll(items=>items.map(c=>({w:c.width,h:c.height})));
  for(const f of frames){expect(f.w).toBeGreaterThan(100);expect(f.h).toBeGreaterThan(100);}
  const gl=await page.locator("canvas.immersive-webgl").first().evaluate(c=>{
   const gl=c.getContext("webgl");return gl?{depth:gl.isEnabled(gl.DEPTH_TEST),width:c.width}:null;
  });
  expect(gl?.depth).toBe(true);expect(gl.width).toBeGreaterThan(100);
 }
 expect(errors).toEqual([]);
});

test("Four discovery chapters advance with scroll and reverse accurately",async({page})=>{
 await page.goto(route);
 const last=page.locator('.rc-cinema-chapter[data-rc-chapter="3"]');
 await last.scrollIntoViewIfNeeded();await expect(last).toBeVisible();
 if(await page.evaluate(()=>window.__reachCustomersCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__reachCustomersCinema.progress),{timeout:8000}).toBeGreaterThan(2);
 const first=page.locator('.rc-cinema-chapter[data-rc-chapter="0"]');
 await first.scrollIntoViewIfNeeded();
 if(await page.evaluate(()=>window.__reachCustomersCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__reachCustomersCinema.progress),{timeout:8000}).toBeLessThan(1);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});

test("Four direct stage buttons work with mouse and arrow-key navigation",async({page})=>{
 await page.goto(route);
 const buttons=page.locator("[data-rc-cinema-stage]");
 await expect(buttons).toHaveCount(4);
 await buttons.nth(2).click();
 await expect(buttons.nth(2)).toHaveAttribute("aria-pressed","true");
 if(await page.evaluate(()=>window.__reachCustomersCinema?.available))
  await expect.poll(()=>page.evaluate(()=>window.__reachCustomersCinema.progress),{timeout:8000}).toBeGreaterThan(1.5);
 await buttons.nth(1).focus();
 await page.keyboard.press("ArrowRight");
 await expect(buttons.nth(2)).toBeFocused();
 await expect(buttons.nth(2)).toHaveAttribute("aria-pressed","true");
 await buttons.nth(3).click();
 await expect(buttons.nth(3)).toHaveAttribute("aria-pressed","true");
});

test("Motion pause and system reduced-motion settings work without losing text",async({page})=>{
 await page.goto(route);
 const button=page.locator("#rc-cinema-motion");
 await expect(button).toHaveAttribute("aria-pressed","false");
 await button.click();
 await expect(button).toHaveAttribute("aria-pressed","true");
 await expect(page.locator("body")).toHaveClass(/rc-motion-paused/);
 expect(await page.evaluate(()=>window.__reachCustomersCinema.paused)).toBe(true);
 await button.click();
 await expect(button).toHaveAttribute("aria-pressed","false");
 await page.emulateMedia({reducedMotion:"reduce"});await page.reload();
 expect(await page.evaluate(()=>window.__reachCustomersCinema.paused)).toBe(true);
 await expect(page.locator("body")).toHaveClass(/rc-motion-paused/);
 await expect(page.locator(".rc-cinema-chapter")).toHaveCount(4);
});

test("WebGL blocked: original SVG remains visible, stages and menus work",async({page})=>{
 await page.addInitScript(()=>{
  const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
   if(["webgl","webgl2","experimental-webgl"].includes(type))return null;
   return original.call(this,type,...args);
  };
 });
 const errors=[];page.on("pageerror",e=>errors.push(e.message));await page.goto(route);
 await expect(page.locator("body")).not.toHaveClass(/rc-webgl-ready/);
 await expect(page.locator(".rc-art-panel>img")).toBeVisible();
 await expect(page.locator(".rc-cinema-fallback")).toBeVisible();
 await page.locator('[data-rc-cinema-stage="2"]').click();
 await expect(page.locator('[data-rc-cinema-stage="2"]')).toHaveAttribute("aria-pressed","true");
 expect(errors).toEqual([]);
});

test("No JavaScript: SVG, four story chapters and existing proposal links remain readable",async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();await page.goto("http://127.0.0.1:4173"+route);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".rc-cinema-chapter")).toHaveCount(4);
  await expect(page.locator(".rc-cinema-fallback")).toBeVisible();
  await expect(page.locator(".rc-steps article")).toHaveCount(3);
  await expect(page.locator(".rc-final-action a")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
 }finally{await context.close();}
});

test("Cinematic page maintains keyboard-safe navigation and local page destinations",async({page})=>{
 await page.goto(route);
 await expect(page.locator('script[src="../../assets/immersive-scene-kit.js"]')).toHaveCount(1);
 await expect(page.locator('script[src="./reach-more-customers-3d.js"]')).toHaveCount(1);
 for(const id of ["challenge","cinema-reach","approach","packages","next-step"])
  await expect(page.locator("#"+id)).toHaveCount(1);
 const image=page.locator(".rc-art-panel>img");
 await expect.poll(()=>image.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 const menu=page.locator(".nav-toggle");
 if(await menu.isVisible()){
  await menu.click();await expect(menu).toHaveAttribute("aria-expanded","true");
  await page.keyboard.press("Escape");await expect(menu).toHaveAttribute("aria-expanded","false");
  await expect(menu).toBeFocused();
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2)).toBe(true);
});
