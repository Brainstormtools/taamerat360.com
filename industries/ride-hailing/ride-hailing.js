(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
let paused=matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion=$(".motion-toggle");
function showMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));motion.setAttribute("aria-label",paused?"Resume motion":"Pause motion");$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ";dispatchEvent(new CustomEvent("ride-hailing:motion",{detail:{paused}}))}
motion.addEventListener("click",()=>{paused=!paused;showMotion()});showMotion();
const toggle=$(".nav-toggle"),nav=$(".nav-links");
function closeMenu(focus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");if(focus)toggle.focus()}
toggle.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const stages={
discover:{number:"01 / 04",word:"DISCOVER",label:"SERVICE INFORMATION / DISCOVERY",title:"Make the service easy to understand.",description:"Present approved mobility business information, public service descriptions and official contact options without implying live ride coverage.",focus:"Accurate mobility service communication",count:1,offset:77},
understand:{number:"02 / 04",word:"UNDERSTAND",label:"BUSINESS OPTIONS / CLEAR EXPECTATIONS",title:"Make business options easier to explore.",description:"Help organisations understand published service categories, partnership opportunities and whom to contact, without providing actual fares or ride availability.",focus:"Transparent approved information and next steps",count:2,offset:49},
enquire:{number:"03 / 04",word:"ENQUIRE",label:"PARTNERS / GENERAL BUSINESS ENQUIRIES",title:"Give enquiries a clear destination.",description:"Route non-sensitive corporate, fleet and partner questions to an appropriate business team without collecting driver or passenger records.",focus:"Better general business enquiry handover",count:3,offset:22},
coordinate:{number:"04 / 04",word:"COORDINATE",label:"TEAM HANDOVERS / NON-TRIP PROCESSES",title:"Keep mobility business teams aligned.",description:"Coordinate marketing, commercial and administrative tasks without dispatching drivers, tracking rides or accessing operational systems.",focus:"Consistent non-trip business coordination",count:4,offset:0}
};
const keys=Object.keys(stages);
function setStage(key){const v=stages[key];if(!v)return;
$$(".rh-step").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#rh-stage-number").textContent=v.number;$("#rh-stage-word").textContent=v.word;$("#rh-stage-label").textContent=v.label;$("#rh-stage-title").textContent=v.title;$("#rh-stage-description").textContent=v.description;$("#rh-stage-focus").textContent=v.focus;$("#rh-stage-count").textContent=v.count+" OF 4";$("#rh-progress-path").setAttribute("stroke-dashoffset",String(v.offset));dispatchEvent(new CustomEvent("ride-hailing:stage",{detail:{key}}))}
$$(".rh-step").forEach(b=>{b.addEventListener("click",()=>setStage(b.dataset.stage));b.addEventListener("keydown",e=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const step=e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1;const i=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+step));setStage(keys[i]);$$(".rh-step")[i].focus()})});
const form=$("#rh-form"),copy=$("#rh-copy"),result=$("#rh-result-text"),status=$("#rh-status"),business=$("#rh-business"),challenge=$("#rh-challenge"),priority=$("#rh-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();
brief=["TAAMERAT360 / RIDE HAILING — GENERAL MOBILITY BUSINESS BRIEF",
"Organisation category: "+business.value,
"Business communication challenge: "+challenge.value,
"Initial improvement priority: "+priority.value,
"",
"Discussion focus: Approved public mobility service information, non-sensitive corporate or partner enquiries, business coordination and marketing operations.",
"Scope, deliverables, fees, integrations, operator permissions, privacy/security review and transport regulatory considerations: To be agreed after consultation.",
"Do not include rider/driver names, phone numbers, exact locations, trip logs, vehicle registrations, identity documents, passwords or payment details.",
"",
"Not a booking, driver dispatch, ride request, GPS tracking service, live fare quote or binding proposal."].join("\n");
$("#rh-result-title").textContent="Your mobility business priorities, connected.";
$("#rh-result-summary").textContent=business.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Mobility-business brief ready. Copy it to continue the conversation.";
});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#rh-result-title").textContent="Your choices changed.";$("#rh-result-summary").textContent="Prepare a new brief to reflect your selections.";status.textContent="The previous draft is now out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. Do not add rider, driver, location, trip or payment information."}catch{result.hidden=false;status.textContent="Automatic copy unavailable. Select the visible brief and copy manually.";const selection=getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let pending=false;function drawProgress(){if(pending)return;pending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";pending=false})}addEventListener("scroll",drawProgress,{passive:true});drawProgress();
})();