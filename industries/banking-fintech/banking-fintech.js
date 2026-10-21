(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
let paused=matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion=$(".motion-toggle");
function showMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));motion.setAttribute("aria-label",paused?"Resume motion":"Pause motion");$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ"}
motion.addEventListener("click",()=>{paused=!paused;showMotion()});showMotion();
const toggle=$(".nav-toggle"),nav=$(".nav-links");
function closeMenu(focus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");if(focus)toggle.focus()}
toggle.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const stages={
discover:{number:"01 / 04",word:"DISCOVER",label:"PUBLIC INFORMATION / DISCOVERY",title:"Make the offer easy to find.",description:"Share accurate, public-facing information about your approved services and direct people to the appropriate official channels.",focus:"Clear positioning and public information",count:1,offset:77},
understand:{number:"02 / 04",word:"UNDERSTAND",label:"PRODUCT CLARITY / INFORMED ENQUIRIES",title:"Help the next question become clear.",description:"Present approved service details, eligibility disclosures and official information links without recommending financial products.",focus:"Understandable public service information",count:2,offset:49},
enquire:{number:"03 / 04",word:"ENQUIRE",label:"GENERAL ENQUIRIES / RIGHT TEAM",title:"Give questions a clear destination.",description:"Route non-sensitive business enquiries to an authorised team and keep response ownership visible.",focus:"General enquiry routing and follow-up",count:3,offset:22},
coordinate:{number:"04 / 04",word:"CONNECT",label:"OPERATIONS / BUSINESS COMMUNICATION",title:"Connect people behind the process.",description:"Keep marketing, sales and operations aligned on routine business actions without touching regulated customer or transaction data.",focus:"Cross-team business coordination",count:4,offset:0}
};
const keys=Object.keys(stages);
function setStage(key){const v=stages[key];if(!v)return;
$$(".f-stage").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#f-stage-number").textContent=v.number;$("#f-stage-word").textContent=v.word;$("#f-stage-label").textContent=v.label;$("#f-stage-title").textContent=v.title;$("#f-stage-description").textContent=v.description;$("#f-stage-focus").textContent=v.focus;$("#f-stage-count").textContent=v.count+" OF 4";$("#f-progress-path").setAttribute("stroke-dashoffset",String(v.offset))}
$$(".f-stage").forEach(b=>{b.addEventListener("click",()=>setStage(b.dataset.stage));b.addEventListener("keydown",e=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const step=e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1;const i=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+step));setStage(keys[i]);$$(".f-stage")[i].focus()})});
const form=$("#f-form"),copy=$("#f-copy"),result=$("#f-result-text"),status=$("#f-status"),business=$("#f-business"),challenge=$("#f-challenge"),priority=$("#f-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();
brief=["TAAMERAT360 / BANKING & FINTECH — NON-TRANSACTIONAL BUSINESS DISCUSSION BRIEF",
"Organisation category: "+business.value,
"General business challenge: "+challenge.value,
"First improvement priority: "+priority.value,
"",
"Discussion focus: Approved public information, non-sensitive business enquiries and/or internal business coordination.",
"Scope, deliverables, regulatory/privacy/security review, integrations, timing and fees: To be agreed after consultation.",
"No customer data, account details, card numbers, login credentials, identification documents or transactions should be shared.",
"",
"This is not financial advice, regulated banking service, an account application, transaction, or binding proposal."].join("\n");
$("#f-result-title").textContent="Your business priorities, in focus.";
$("#f-result-summary").textContent=business.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Business brief prepared. Copy it if you'd like to continue the discussion.";
});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#f-result-title").textContent="Your choices changed.";$("#f-result-summary").textContent="Prepare a new brief to reflect your selections.";status.textContent="The previous draft is now out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. Do not include confidential banking, financial or customer information."}catch{result.hidden=false;status.textContent="Automatic copy unavailable. Select the visible brief and copy manually.";const selection=getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let pending=false;function drawProgress(){if(pending)return;pending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";pending=false})}addEventListener("scroll",drawProgress,{passive:true});drawProgress();
})();