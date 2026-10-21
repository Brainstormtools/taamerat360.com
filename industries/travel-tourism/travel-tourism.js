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
discover:{number:"01 / 04",word:"DISCOVER",label:"DESTINATIONS / PUBLIC INFORMATION",title:"Help travellers imagine the journey.",description:"Present verified public information about destinations, experiences and general travel themes without suggesting live availability.",focus:"Discoverable, approved travel experiences",count:1,offset:77},
understand:{number:"02 / 04",word:"EXPLORE",label:"EXPERIENCE CLARITY / PLANNING",title:"Make experiences easier to explore.",description:"Clarify approved package descriptions, included services, typical steps and where to confirm terms with the actual operator.",focus:"Clear descriptions and responsible expectations",count:2,offset:49},
enquire:{number:"03 / 04",word:"ENQUIRE",label:"GENERAL TRAVEL ENQUIRIES / RIGHT TEAM",title:"Guide the next general enquiry.",description:"Give non-sensitive questions a clear route to an appropriate business contact without collecting passenger data or booking details.",focus:"Consistent guest-facing business communication",count:3,offset:22},
coordinate:{number:"04 / 04",word:"COORDINATE",label:"PARTNERS / BUSINESS HANDOVERS",title:"Connect the people behind the journey.",description:"Help marketing, guest relations and partner teams track routine non-booking handovers and follow-up responsibilities.",focus:"Coordinated administrative follow-through",count:4,offset:0}
};
const keys=Object.keys(stages);
function setStage(key){const v=stages[key];if(!v)return;
$$(".tt-step").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#tt-stage-number").textContent=v.number;$("#tt-stage-word").textContent=v.word;$("#tt-stage-label").textContent=v.label;$("#tt-stage-title").textContent=v.title;$("#tt-stage-description").textContent=v.description;$("#tt-stage-focus").textContent=v.focus;$("#tt-stage-count").textContent=v.count+" OF 4";$("#tt-progress-path").setAttribute("stroke-dashoffset",String(v.offset))}
$$(".tt-step").forEach(b=>{b.addEventListener("click",()=>setStage(b.dataset.stage));b.addEventListener("keydown",e=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const step=e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1;const i=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+step));setStage(keys[i]);$$(".tt-step")[i].focus()})});
const form=$("#tt-form"),copy=$("#tt-copy"),result=$("#tt-result-text"),status=$("#tt-status"),business=$("#tt-business"),challenge=$("#tt-challenge"),priority=$("#tt-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();
brief=["TAAMERAT360 / TRAVEL & TOURISM — GENERAL BUSINESS DISCUSSION BRIEF",
"Organisation category: "+business.value,
"General business challenge: "+challenge.value,
"First improvement priority: "+priority.value,
"",
"Discussion focus: Approved travel experience descriptions, non-sensitive guest enquiries, marketing and partner communication.",
"Scope, deliverables, integration requirements, permissions, privacy/security review, timeline and fees: To be confirmed after consultation.",
"Exclude passenger names, passport numbers, personal itineraries, booking references, identity documents, payment-card details and private guest information.",
"",
"This is not a live availability quote, travel booking, ticket confirmation, financial transaction or destination safety recommendation."].join("\n");
$("#tt-result-title").textContent="Your travel-business priorities, clearly connected.";
$("#tt-result-summary").textContent=business.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Travel-business brief prepared. Copy it to continue the conversation.";
});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#tt-result-title").textContent="Your choices changed.";$("#tt-result-summary").textContent="Prepare a new brief to reflect your selections.";status.textContent="The previous draft is now out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. Do not add personal traveller, passport, booking or payment information."}catch{result.hidden=false;status.textContent="Automatic copy unavailable. Select the visible brief and copy manually.";const selection=getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let pending=false;function drawProgress(){if(pending)return;pending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";pending=false})}addEventListener("scroll",drawProgress,{passive:true});drawProgress();
})();