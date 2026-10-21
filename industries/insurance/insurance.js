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
discover:{number:"01 / 04",word:"DISCOVER",label:"PUBLIC INFORMATION / DISCOVERY",title:"Help the right people find you.",description:"Share accurate, insurer-approved public information and guide prospects toward official communication channels.",focus:"Clear approved service messaging",count:1,offset:77},
understand:{number:"02 / 04",word:"UNDERSTAND",label:"APPROVED INFORMATION / CLARITY",title:"Make the options easier to understand.",description:"Present approved product explanations, important exclusions and appropriate official contact routes without making coverage recommendations.",focus:"Clear public guidance and disclaimers",count:2,offset:49},
enquire:{number:"03 / 04",word:"ENQUIRE",label:"GENERAL ENQUIRIES / APPROPRIATE TEAM",title:"Send questions to the right team.",description:"Organise general non-sensitive enquiries and communicate who owns the next business step.",focus:"Responsible enquiry routing and follow-up",count:3,offset:22},
coordinate:{number:"04 / 04",word:"COORDINATE",label:"NON-CLAIMS BUSINESS TEAM / NEXT STEPS",title:"Make routine handovers clearer.",description:"Help marketing and administrative colleagues coordinate approved business work without accessing policyholder or claims information.",focus:"Consistent non-claims coordination",count:4,offset:0}
};
const keys=Object.keys(stages);
function setStage(key){const v=stages[key];if(!v)return;
$$(".i-stage").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#i-stage-number").textContent=v.number;$("#i-stage-word").textContent=v.word;$("#i-stage-label").textContent=v.label;$("#i-stage-title").textContent=v.title;$("#i-stage-description").textContent=v.description;$("#i-stage-focus").textContent=v.focus;$("#i-stage-count").textContent=v.count+" OF 4";$("#i-progress-path").setAttribute("stroke-dashoffset",String(v.offset))}
$$(".i-stage").forEach(b=>{b.addEventListener("click",()=>setStage(b.dataset.stage));b.addEventListener("keydown",e=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const step=e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1;const i=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+step));setStage(keys[i]);$$(".i-stage")[i].focus()})});
const form=$("#i-form"),copy=$("#i-copy"),result=$("#i-result-text"),status=$("#i-status"),business=$("#i-business"),challenge=$("#i-challenge"),priority=$("#i-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();
brief=["TAAMERAT360 / INSURANCE — NON-CLAIMS BUSINESS DISCUSSION BRIEF",
"Organisation category: "+business.value,
"General communication challenge: "+challenge.value,
"First business improvement priority: "+priority.value,
"",
"Discussion focus: Approved public service messaging, non-sensitive enquiries and/or non-claims business coordination.",
"Scope, deliverables, privacy, security and insurance-sector compliance review, integrations, fees and timeline: To be agreed after consultation.",
"Do not include policy numbers, claim records, identity data, health details, card information or confidential customer records.",
"",
"This is not an insurance quote, application, coverage recommendation, policy, claim decision or binding proposal."].join("\n");
$("#i-result-title").textContent="Your next business step, more clearly defined.";
$("#i-result-summary").textContent=business.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Non-claims business brief ready. Copy it to continue the conversation.";
});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#i-result-title").textContent="Your choices changed.";$("#i-result-summary").textContent="Prepare a new brief to reflect your selections.";status.textContent="The previous draft is now out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. Do not add policyholder, claims or other sensitive data."}catch{result.hidden=false;status.textContent="Automatic copy unavailable. Select the visible brief and copy manually.";const selection=getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let pending=false;function drawProgress(){if(pending)return;pending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";pending=false})}addEventListener("scroll",drawProgress,{passive:true});drawProgress();
})();