(()=>{"use strict";
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
let paused=reduced;
const motion=$(".motion-toggle");
function updateMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ";window.dispatchEvent(new CustomEvent("ecommerce:motion",{detail:{paused}}))}
motion.addEventListener("click",()=>{paused=!paused;updateMotion()});updateMotion();
const menu=$(".nav-toggle"),links=$(".nav-links");
function closeMenu(returnFocus=false){if(!links.classList.contains("is-open"))return;links.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");if(returnFocus)menu.focus()}
menu.addEventListener("click",()=>{let yes=!links.classList.contains("is-open");links.classList.toggle("is-open",yes);menu.setAttribute("aria-expanded",String(yes));menu.setAttribute("aria-label",yes?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const scenes={
discover:{number:"01 / 04",word:"DISCOVER",tag:"GET SEEN / MAKE A PROMISE CLEAR",title:"Meet customers where they look.",desc:"Present the right offer clearly so shoppers understand its value and know how to enquire or buy.",focus:"Relevant discovery and product clarity",count:1,offset:77},
consider:{number:"02 / 04",word:"CONSIDER",tag:"ANSWER QUESTIONS / BUILD CONFIDENCE",title:"Make the decision feel easier.",desc:"Respond to genuine questions about products, availability and suitability without losing the conversation.",focus:"Product information and customer follow-up",count:2,offset:49},
order:{number:"03 / 04",word:"ORDER",tag:"AFTER PURCHASE / KEEP WORK MOVING",title:"Connect the teams behind the order.",desc:"Organise who follows up with customers and how updates move across the business after an order is placed.",focus:"Operational coordination and communication",count:3,offset:22},
return:{number:"04 / 04",word:"RETURN",tag:"AFTERCARE / STAY RELEVANT",title:"Make the next interaction count.",desc:"Create clearer post-purchase follow-through and appropriate opportunities to reconnect with customers.",focus:"Aftercare communication and retention workflows",count:4,offset:0}
};
const stageKeys=Object.keys(scenes);
function selectStage(key){const s=scenes[key];if(!s)return;
$$(".e-stage").forEach(btn=>{const active=btn.dataset.stage===key;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
$("#e-stage-no").textContent=s.number;$("#e-stage-word").textContent=s.word;$("#e-stage-label").textContent=s.tag;$("#e-stage-title").textContent=s.title;$("#e-stage-desc").textContent=s.desc;$("#e-stage-focus").textContent=s.focus;$("#e-stage-count").textContent=s.count+" OF 4";$("#e-progress-path").setAttribute("stroke-dashoffset",String(s.offset));window.dispatchEvent(new CustomEvent("ecommerce:stage",{detail:{key}}))}
$$(".e-stage").forEach(btn=>{btn.addEventListener("click",()=>selectStage(btn.dataset.stage));btn.addEventListener("keydown",event=>{if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(event.key))return;event.preventDefault();const direction=event.key==="ArrowRight"||event.key==="ArrowDown"?1:-1;const index=Math.max(0,Math.min(stageKeys.length-1,stageKeys.indexOf(btn.dataset.stage)+direction));selectStage(stageKeys[index]);$$(".e-stage")[index].focus()})});
const form=$("#e-form"),copy=$("#e-copy"),result=$("#e-brief-text"),status=$("#e-copy-status"),business=$("#e-business"),challenge=$("#e-challenge"),priority=$("#e-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();
brief=["TAAMERAT360 / E-COMMERCE — STARTING DISCUSSION BRIEF",
"Business type: "+business.value,
"Primary challenge: "+challenge.value,
"Priority improvement: "+priority.value,
"",
"Discussion focus: Consider appropriate customer acquisition, communication, sales follow-up and operations improvements.",
"Scope, timetable, responsibilities, fees and deliverables: To be confirmed after discussion.",
"",
"This is an initial brief, not an order, a service guarantee or an accepted proposal."].join("\n");
$("#e-brief-title").textContent="Your next step, more clearly defined.";$("#e-brief-summary").textContent=business.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Brief prepared. Copy it, then paste it into the proposal conversation if useful."
});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#e-brief-title").textContent="Your choices have changed.";$("#e-brief-summary").textContent="Prepare the brief again to include the updated details.";status.textContent="The previous draft is now out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. You can paste it into the proposal message."}catch{result.hidden=false;status.textContent="Automatic copy is unavailable. Select the visible brief and copy manually.";const selection=getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let pending=false;function drawScroll(){if(pending)return;pending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";pending=false})}
addEventListener("scroll",drawScroll,{passive:true});drawScroll();
})();