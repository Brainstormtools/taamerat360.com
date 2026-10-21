(()=>{"use strict";
const $=(s,ctx=document)=>ctx.querySelector(s),$$=(s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
const prefersReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!prefersReduced)document.documentElement.classList.add("js-motion");
const motionToggle=$(".motion-toggle");let paused=prefersReduced;
function applyMotion(){document.body.classList.toggle("motion-off",paused);motionToggle.setAttribute("aria-pressed",String(paused));$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ"}
applyMotion();motionToggle.addEventListener("click",()=>{paused=!paused;applyMotion()});
const menu=$(".nav-toggle"), nav=$(".nav-links");
function closeMenu(returnFocus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");if(returnFocus)menu.focus()}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(window.innerWidth<=760&&!e.target.closest(".site-header"))closeMenu()});
menu.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation")}));
function reveal(){const targets=$$("[data-reveal]");if(!("IntersectionObserver"in window)||prefersReduced){targets.forEach(e=>e.classList.add("is-visible"));return}const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("is-visible");io.unobserve(x.target)}}),{threshold:.07});targets.forEach(x=>io.observe(x))}reveal();
const scenes=[
{label:"THE DISCOVERY MOMENT",color:"#315be9",tag:"FIND",icon:"✳",title:"The right people find you",desc:"A welcome storefront, an offer worth discovering and one clear next step."},
{label:"THE CONVERSATION MOMENT",color:"#e9bf63",tag:"CONNECT",icon:"↗",title:"The conversation begins",desc:"Good questions, a confident answer and shared momentum."},
{label:"THE DELIVERY MOMENT",color:"#30694e",tag:"DELIVER",icon:"✓",title:"The work moves forward",desc:"A clearer handover, shared work and fewer loose ends."}
];
function sceneSvg(scene){const c=scene.color;return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="820" height="600" viewBox="0 0 820 600"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f8f5ee"/><stop offset="1" stop-color="#e8dfd0"/></linearGradient><filter id="sh"><feGaussianBlur stdDeviation="11"/></filter></defs><rect width="820" height="600" fill="url(#bg)"/><ellipse cx="400" cy="495" rx="315" ry="27" fill="#aa8a6b" opacity=".19" filter="url(#sh)"/><path d="M28 483 Q120 420 218 468 T434 468 Q555 430 639 452 T800 470" stroke="#ea4b2e" stroke-width="48" fill="none" stroke-linecap="round"/><rect x="145" y="207" width="239" height="225" rx="9" fill="'+c+'"/><polygon points="132,210 403,210 365,142 171,142" fill="'+c+'" stroke="#202020" stroke-opacity=".15" stroke-width="5"/><rect x="192" y="260" width="65" height="167" fill="#d8ebe6"/><rect x="278" y="260" width="64" height="95" fill="#f3d982"/><circle cx="310" cy="305" r="17" fill="#e59c69"/><rect x="460" y="250" width="202" height="170" rx="80" stroke="'+(scene.tag==="DELIVER"?"#30694e":"#d0ba96")+'" stroke-width="43" fill="none"/><circle cx="535" cy="383" r="36" fill="#f6c367"/><path d="M500 432 Q535 355 570 430" fill="#355f56"/><circle cx="613" cy="392" r="35" fill="#9cc5ae"/><path d="M580 433 Q610 354 650 430" fill="#22332e"/><rect x="250" y="475" width="280" height="21" rx="11" fill="#d53d26"/><text x="410" y="92" font-size="23" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#45413b" letter-spacing="7">'+scene.tag+'</text><text x="410" y="555" font-size="23" font-family="Arial" text-anchor="middle" fill="#45413b">'+scene.title+'</text></svg>')}
const imgs=$$(".stage-img");imgs.forEach((im,i)=>{im.addEventListener("error",()=>{if(!im.dataset.fallback){im.dataset.fallback="yes";im.src=sceneSvg(scenes[i])}});if(im.complete&&im.naturalWidth===0){im.dataset.fallback="yes";im.src=sceneSvg(scenes[i])}});
const heroImg=$(".hero-image");heroImg.addEventListener("error",()=>{if(!heroImg.dataset.fallback){heroImg.dataset.fallback="yes";heroImg.src=sceneSvg({tag:"BUSINESS CONNECTED",title:"From first interest to work well done",color:"#315be9"})}});if(heroImg.complete&&heroImg.naturalWidth===0){heroImg.dataset.fallback="yes";heroImg.src=sceneSvg({tag:"BUSINESS CONNECTED",title:"From first interest to work well done",color:"#315be9"})}
let currentStage=0;
function setStage(n){currentStage=Math.max(0,Math.min(2,n));imgs.forEach((im,i)=>im.classList.toggle("is-current",i===currentStage));$$("[data-stage]").forEach(b=>{const selected=Number(b.dataset.stage)===currentStage;b.classList.toggle("is-current",selected);b.setAttribute("aria-pressed",String(selected))});$$("[data-journey]").forEach((e,i)=>e.classList.toggle("is-current",i===currentStage));$("#stage-index").textContent=String(currentStage+1).padStart(2,"0");$("#stage-badge").textContent=scenes[currentStage].label;$("#stage-fill").style.width=((currentStage+1)*100/3)+"%";$(".visual-stage").style.setProperty("--chapter-color",scenes[currentStage].color);const connector=$("#connector-line");if(connector)connector.style.strokeDashoffset=String(780-currentStage*270)}
$$("[data-stage]").forEach(b=>{b.addEventListener("click",()=>{setStage(Number(b.dataset.stage));if(window.innerWidth<761){$(".journey-visual").scrollIntoView({behavior:paused?"auto":"smooth",block:"center"})}});b.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const delta=e.key==="ArrowRight"?1:-1;setStage(Math.max(0,Math.min(2,currentStage+delta)));$(`[data-stage="${currentStage}"]`).focus()})});
if("IntersectionObserver"in window&&window.innerWidth>760){const observer=new IntersectionObserver(entries=>{if(paused)return;let best=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(best)setStage(Number(best.target.dataset.journey))},{rootMargin:"-25% 0px -30% 0px",threshold:[0,.1,.2,.4,.65]});$$("[data-journey]").forEach(e=>observer.observe(e))}
const heroArt=$(".hero-art");if(heroArt&&window.matchMedia("(pointer:fine)").matches){heroArt.addEventListener("pointermove",e=>{if(paused)return;const r=heroArt.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;heroArt.style.setProperty("--pointer-x",(x*15).toFixed(2)+"px");heroArt.style.setProperty("--pointer-y",(y*12).toFixed(2)+"px")});heroArt.addEventListener("pointerleave",()=>{heroArt.style.setProperty("--pointer-x","0px");heroArt.style.setProperty("--pointer-y","0px")})}
let scrollRaf=false;function updateProgress(){if(scrollRaf)return;scrollRaf=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;$(".scroll-meter").style.width=(max>0?(window.scrollY/max)*100:0)+"%";scrollRaf=false})}window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();
const solutions={
leads:{category:"DISCOVERY / GROWTH",symbol:"✳",title:"Get seen by the right people.",description:"Clarify your offer, reach relevant audiences and turn attention into genuine enquiries.",link:"lead-growth",cta:"See Lead Growth"},
sales:{category:"FOLLOW-UP / MOMENTUM",symbol:"↗",title:"Turn interest into the next step.",description:"Make follow-ups more timely, conversations more useful and opportunities easier to move forward.",link:"sales-momentum",cta:"See Sales Momentum"},
experience:{category:"TRUST / EXPERIENCE",symbol:"♡",title:"Make every interaction count.",description:"Create a clearer customer journey with relevant communication and fewer frustrating gaps.",link:"connected-growth",cta:"See Connected Growth"},
operations:{category:"OPERATIONS / DELIVERY",symbol:"≋",title:"Make teamwork feel simpler.",description:"Reduce repetitive work, improve handovers and help everyone see what needs to happen next.",link:"business-efficiency",cta:"See Business Efficiency"}
};
function selectSolution(id){const s=solutions[id];if(!s)return;$$("[data-solution]").forEach(b=>{let active=b.dataset.solution===id;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});$("#solution-category").textContent=s.category;$("#solution-symbol").textContent=s.symbol;$("#solution-title").textContent=s.title;$("#solution-description").textContent=s.description;$("#solution-action").textContent=s.cta+" ↗";$("#solution-action").setAttribute("href",id==="leads"?"./solutions/reach-more-customers/":id==="sales"?"./solutions/move-sales-forward/":"#packages");$("#solution-art").className="detail-visual detail-"+id;}
$$("[data-solution]").forEach(b=>b.addEventListener("click",()=>selectSolution(b.dataset.solution)));$$("[data-target-solution]").forEach(a=>a.addEventListener("click",()=>selectSolution(a.dataset.targetSolution)));
const industryCopy={
"Construction":"Turn enquiries into clearly scoped projects and keep commitments visible from conversation to delivery.",
"Real Estate":"Help interested buyers and sellers receive timely information and clear next steps.",
"E-commerce":"Connect product discovery, customer questions and order follow-through in a smoother journey.",
"Architecture":"Turn initial project enquiries into structured briefs, proposals and coordinated delivery.",
"Healthcare":"Make enquiries, communication and everyday coordination clearer for teams and the people they serve.",
"Education":"Guide prospective learners from first enquiry through meaningful follow-ups and onboarding.",
"Banking & Fintech":"Connect customer education, enquiries and service workflows with clarity at each step.",
"Insurance":"Simplify early enquiries, follow-ups and communication across an often complex journey.",
"Telecom":"Make service discovery, sales conversations and customer support easier to follow.",
"Travel & Tourism":"Connect trip enquiries, booking conversations and coordinated customer service.",
"Ride Hailing":"Improve customer communication and coordination across everyday service journeys."
};
$$("[data-industry]").forEach(b=>b.addEventListener("click",()=>{const name=b.dataset.industry;$$("[data-industry]").forEach(el=>{const yes=el===b;el.classList.toggle("is-active",yes);el.setAttribute("aria-pressed",String(yes))});$("#industry-name").textContent=name;$("#industry-message").textContent=industryCopy[name];const industryLink=$("#industry-action");
const built={"Construction":"construction","Real Estate":"real-estate","E-commerce":"e-commerce","Architecture":"architecture","Healthcare":"healthcare","Education":"education","Banking & Fintech":"banking-fintech","Insurance":"insurance","Telecom":"telecom","Travel & Tourism":"travel-tourism","Ride Hailing":"ride-hailing"};
if(built[name]){
 industryLink.href="./industries/"+built[name]+"/";
 industryLink.removeAttribute("target");industryLink.removeAttribute("rel");
 industryLink.innerHTML="Explore "+name.toLowerCase()+" solutions <span aria-hidden=\"true\">↗</span>";
}else{
 industryLink.href="https://taamerat360-motion.margotdperrin67761.chatgpt.site/contact-us/?industry="+encodeURIComponent(name.toLowerCase().replaceAll(" ","-"));
 industryLink.target="_blank";industryLink.rel="noopener";
 industryLink.innerHTML='Discuss your business <span aria-hidden="true">↗</span>';
}}));
$("#year").textContent=String(new Date().getFullYear());
})();