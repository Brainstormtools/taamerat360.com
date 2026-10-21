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
discover:{number:"01 / 04",word:"DISCOVER",label:"PUBLIC SERVICE DISCOVERY",title:"Help the right people find you.",description:"Present approved public connectivity plans, enterprise service information and official contact options without promising network availability.",focus:"Clear public packages and service information",count:1,offset:77},
understand:{number:"02 / 04",word:"UNDERSTAND",label:"PLAN CLARITY / NEXT STEPS",title:"Make options simpler to understand.",description:"Explain approved commercial plan details, applicable terms and next-step guidance without making technical performance claims.",focus:"Understandable business plan messaging",count:2,offset:49},
enquire:{number:"03 / 04",word:"ENQUIRE",label:"COMMERCIAL ENQUIRIES / RIGHT TEAM",title:"Route general enquiries with context.",description:"Give non-sensitive business questions a clear contact pathway and an appropriate commercial owner.",focus:"General lead routing and response",count:3,offset:22},
coordinate:{number:"04 / 04",word:"COORDINATE",label:"COMMERCIAL OPERATIONS / HANDOVERS",title:"Keep commercial teams connected.",description:"Coordinate routine marketing and administrative follow-ups without touching subscriber accounts, network operations or technical tickets.",focus:"Cross-team non-technical coordination",count:4,offset:0}
};
const keys=Object.keys(stages);
function setStage(key){const v=stages[key];if(!v)return;
$$(".t-step").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#t-stage-number").textContent=v.number;$("#t-stage-word").textContent=v.word;$("#t-stage-label").textContent=v.label;$("#t-stage-title").textContent=v.title;$("#t-stage-description").textContent=v.description;$("#t-stage-focus").textContent=v.focus;$("#t-stage-count").textContent=v.count+" OF 4";$("#t-progress-path").setAttribute("stroke-dashoffset",String(v.offset))}
$$(".t-step").forEach(b=>{b.addEventListener("click",()=>setStage(b.dataset.stage));b.addEventListener("keydown",e=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const step=e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1;const i=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+step));setStage(keys[i]);$$(".t-step")[i].focus()})});
const form=$("#t-form"),copy=$("#t-copy"),result=$("#t-result-text"),status=$("#t-status"),business=$("#t-business"),challenge=$("#t-challenge"),priority=$("#t-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();
brief=["TAAMERAT360 / TELECOM — NON-TECHNICAL BUSINESS DISCUSSION BRIEF",
"Organisation category: "+business.value,
"Business communication challenge: "+challenge.value,
"Initial improvement priority: "+priority.value,
"",
"Discussion focus: Approved commercial public information, non-sensitive enquiries, business visibility and administrative handovers.",
"Services, deliverables, regulatory/privacy review, integrations, fees, timelines and responsibilities: To be agreed after consultation.",
"Never include subscriber names, contact numbers, account IDs, addresses, passwords, payment information, service incident logs or network access details.",
"",
"Not a network coverage check, activation request, technical support ticket, telecommunications licence or binding proposal."].join("\n");
$("#t-result-title").textContent="Your communication priorities, connected.";
$("#t-result-summary").textContent=business.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Non-technical business brief ready. Copy it to continue the conversation.";
});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#t-result-title").textContent="Your choices changed.";$("#t-result-summary").textContent="Prepare a new brief to reflect your selections.";status.textContent="The previous draft is now out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. Do not add subscriber, account, billing or technical incident information."}catch{result.hidden=false;status.textContent="Automatic copy unavailable. Select the visible brief and copy manually.";const selection=getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let pending=false;function drawProgress(){if(pending)return;pending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";pending=false})}addEventListener("scroll",drawProgress,{passive:true});drawProgress();
})();