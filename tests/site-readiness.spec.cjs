const {test,expect}=require('@playwright/test');

const industrySlugs=['architecture','banking-fintech','construction','e-commerce','education','healthcare','insurance','real-estate','ride-hailing','telecom','travel-tourism'];
const solutionSlugs=['reach-more-customers','move-sales-forward','improve-customer-experience','simplify-business-operations'];
const pages=['/',...industrySlugs.map(x=>'/industries/'+x+'/'),...solutionSlugs.map(x=>'/solutions/'+x+'/')];

test('site-wide catalog: all 16 pages have unique structure, metadata and safe links',async({page})=>{
 const observed=new Set();
 for(const route of pages){
  const response=await page.goto(route);
  expect(response.status(),route).toBe(200);
  const info=await page.evaluate(()=>{
   const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);
   const imgs=[...document.images];
   const blanks=[...document.querySelectorAll('a[target="_blank"]')];
   const badLocal=[...document.querySelectorAll('a[href],img[src],script[src],link[href]')].filter(el=>{
    const ref=el.getAttribute('href')||el.getAttribute('src');
    return ref==='#'||ref==='javascript:void(0)';
   }).map(el=>el.outerHTML.slice(0,170));
   return {
    title:document.title,description:document.querySelector('meta[name="description"]')?.content||'',
    robots:document.querySelector('meta[name="robots"]')?.content,
    h1:document.querySelectorAll('h1').length,
    dupIds:ids.filter((v,i)=>ids.indexOf(v)!==i),
    unlabeledImgs:imgs.filter(img=>!img.hasAttribute('alt')).map(img=>img.getAttribute('src')),
    unsafeBlankLinks:blanks.filter(a=>!a.rel.split(/\s+/).includes('noopener')).map(a=>a.href),
    invalidLocalRefs:badLocal
   };
  });
  expect(info.title,route).toBeTruthy();
  expect(info.description.length,route).toBeGreaterThan(30);
  expect(info.h1,route).toBe(1);
  expect(info.dupIds,route).toEqual([]);
  expect(info.unlabeledImgs,route).toEqual([]);
  expect(info.unsafeBlankLinks,route).toEqual([]);
  expect(info.invalidLocalRefs,route).toEqual([]);
  expect(info.robots,route).toBe('noindex, nofollow');
  observed.add(route);
 }
 expect(observed.size).toBe(16);
});

test('the initial selected business need opens its correct page before any interaction',async({page})=>{
 await page.goto('/');
 await expect(page.locator('[data-solution="leads"]')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/reach-more-customers/');
 await expect(page.locator('#solution-action')).toContainText('See Lead Growth');
 await page.locator('#solution-action').click();
 await expect(page).toHaveURL(/\/solutions\/reach-more-customers\/$/);
});

test('homepage lists all four working solution pages and 11 industry routes',async({page})=>{
 await page.goto('/');
 const routes=[['leads','reach-more-customers'],['sales','move-sales-forward'],['experience','improve-customer-experience'],['operations','simplify-business-operations']];
 for(const [key,slug] of routes){
  await page.locator('[data-solution="'+key+'"]').click();
  await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/'+slug+'/');
 }
 const industryRoutes={
  'Construction':'construction','Real Estate':'real-estate','E-commerce':'e-commerce','Architecture':'architecture',
  'Healthcare':'healthcare','Education':'education','Banking & Fintech':'banking-fintech','Insurance':'insurance',
  'Telecom':'telecom','Travel & Tourism':'travel-tourism','Ride Hailing':'ride-hailing'
 };
 for(const [label,slug] of Object.entries(industryRoutes)){
  await page.locator('[data-industry="'+label+'"]').click();
  await expect(page.locator('#industry-action')).toHaveAttribute('href','./industries/'+slug+'/');
 }
});

test('visitors without JavaScript can reach all 15 industry and business pages',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
  const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');
  const solutionNav=page.getByRole('navigation',{name:'Business-need landing pages'});
  const industryNav=page.getByRole('navigation',{name:'Industry landing pages'});
  await expect(solutionNav).toBeVisible();
  await expect(solutionNav.locator('a')).toHaveCount(4);
  await expect(industryNav).toBeVisible();
  await expect(industryNav.locator('a')).toHaveCount(11);
  await expect(page.locator('.solution-choice:visible')).toHaveCount(0);
  await expect(page.locator('.industry-chip:visible')).toHaveCount(0);
  await expect(page.locator('#solution-action')).toHaveAttribute('href','./solutions/reach-more-customers/');
  await solutionNav.getByRole('link',{name:/Simplify everyday operations/}).click();
  await expect(page).toHaveURL(/\/solutions\/simplify-business-operations\/$/);
  await page.goto('http://127.0.0.1:4173/');
  await page.getByRole('navigation',{name:'Industry landing pages'}).getByRole('link',{name:/Travel & Tourism/}).click();
  await expect(page).toHaveURL(/\/industries\/travel-tourism\/$/);
  await expect(page.locator('h1')).toBeVisible();
 }finally{await context.close();}
});

test('all 16 pages resolve their first-party static assets and local anchor destinations',async({page})=>{
 const checked=new Map();
 for(const route of pages){
  const res=await page.goto(route);
  expect(res.status()).toBe(200);
  const hrefs=await page.evaluate(()=>[...document.querySelectorAll('link[href],script[src],img[src],a[href]')]
   .map(el=>({url:el.getAttribute('href')||el.getAttribute('src'),tag:el.tagName}))
   .filter(x=>x.url&&!x.url.startsWith('data:')&&!x.url.startsWith('mailto:')&&!x.url.startsWith('tel:'))
  );
  for(const link of hrefs){
   const u=new URL(link.url,'http://127.0.0.1:4173'+route);
   if(u.origin!=='http://127.0.0.1:4173')continue;
   const target=u.pathname;
   if(!checked.has(target)){
    const response=await page.request.get(target,{failOnStatusCode:false});
    checked.set(target,{status:response.status(),html:response.headers()['content-type']?.includes('text/html')?(await response.text()):null});
   }
   const found=checked.get(target);
   expect(found.status,route+' refers to '+link.url).toBe(200);
   if(u.hash&&found.html){
    const fragment=decodeURIComponent(u.hash.slice(1));
    if(fragment)expect(found.html.includes('id="'+fragment+'"')||found.html.includes("id='"+fragment+"'"),route+' refers to #'+fragment+' in '+target).toBe(true);
   }
  }
 }
 expect(checked.size).toBeGreaterThan(30);
});