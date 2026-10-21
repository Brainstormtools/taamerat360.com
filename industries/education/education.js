(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
let paused=matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion=$(".motion-toggle");
function applyMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));motion.setAttribute("aria-label",paused?"Resume motion":"Pause motion");$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ"}
motion.addEventListener("click",()=>{paused=!paused;applyMotion()});applyMotion();
const toggle=$(".nav-toggle"),nav=$(".nav-links");
function closeMenu(focus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");if(focus)toggle.focus()}
toggle.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const stages={
discovery:{number:"01 / 04",word:"DISCOVER",label:"VISIBILITY / PROGRAMME INFORMATION",title:"Make the first step easy.",description:"Help people find clear public information about programmes, opportunities and how to contact the right team.",focus:"Relevant discovery and clear information",count:1,offset:77},
enquiry:{number:"02 / 04",word:"ENQUIRE",label:"GENERAL QUESTIONS / ENQUIRY RESPONSE",title:"Guide the first conversation.",description:"Keep non-sensitive admissions questions and administrative replies clearer and more consistent.",focus:"General enquiry handling and timely response",count:2,offset:49},
welcome:{number:"03 / 04",word:"WELCOME",label:"FIRST STEPS / ONBOARDING COMMUNICATION",title:"Make the welcome count.",description:"Help staff explain general onboarding steps, timelines and responsibilities without accessing student records.",focus:"Administrative onboarding communication",count:3,offset:22},
connect:{number:"04 / 04",word:"CONNECT",label:"TEAM COORDINATION / BUSINESS PROCESS",title:"Keep the team in the loop.",description:"Make handovers between admissions, operations and other non-teaching teams less fragmented.",focus:"Clear administrative ownership and follow-up",count:4,offset:0}
};const keys=Object.keys(stages);
function selectStage(key){const v=stages[key];if(!v)return;
$$(".ed-stage").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#ed-stage-number").textContent=v.number;$("#ed-stage-word").textContent=v.word;$("#ed-stage-label").textContent=v.label;$("#ed-stage-title").textContent=v.title;$("#ed-stage-description").textContent=v.description;$("#ed-stage-focus").textContent=v.focus;$("#ed-stage-count").textContent=v.count+" OF 4";$("#ed-path").setAttribute("stroke-dashoffset",String(v.offset))}
$$(".ed-stage").forEach(b=>{b.addEventListener("click",()=>selectStage(b.dataset.stage));b.addEventListener("keydown",event=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))return;event.preventDefault();const delta=event.key==="ArrowDown"||event.key==="ArrowRight"?1:-1;const i=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+delta));selectStage(keys[i]);$$(".ed-stage")[i].focus()})});
const form=$("#ed-form"),copy=$("#ed-copy"),result=$("#ed-result-text"),status=$("#ed-status"),org=$("#ed-organisation"),challenge=$("#ed-challenge"),priority=$("#ed-priority");let brief="";
form.addEventListener("submit",e=>{e.preventDefault();brief=[
"TAAMERAT360 / EDUCATION — BUSINESS DISCUSSION BRIEF",
"Organisation category: "+org.value,
"Primary business challenge: "+challenge.value,
"First improvement priority: "+priority.value,
"",
"Discussion focus: Programme visibility, general enquiries, business communication and/or administrative coordination.",
"Service scope, integrations, deliverables, pricing, responsibilities and timeline: To be confirmed after consultation.",
"Do not include student names, grades, sensitive records or information about minors.",
"",
"This is not an application, admissions decision, teaching contract, accreditation or service commitment."
].join("\n");
$("#ed-result-title").textContent="Your education priorities, connected.";
$("#ed-result-summary").textContent=org.value+" · "+challenge.value+" · "+priority.value;
result.textContent=brief;result.hidden=false;copy.disabled=false;status.textContent="Brief ready. Copy it if you want to continue on the proposal page."});
form.addEventListener("change",()=>{if(!brief)return;brief="";copy.disabled=true;result.hidden=true;$("#ed-result-title").textContent="Your choices changed.";$("#ed-result-summary").textContent="Prepare the brief again to include updated selections.";status.textContent="Your previous brief is out of date."});
copy.addEventListener("click",async()=>{if(!brief)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(brief);status.textContent="Brief copied. Do not add or share student or sensitive personal information."}catch{result.hidden=false;status.textContent="Automatic copy is unavailable. Select the visible brief and copy manually.";const sel=getSelection();if(sel){sel.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);sel.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let working=false;function updateProgress(){if(working)return;working=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";working=false})}addEventListener("scroll",updateProgress,{passive:true});updateProgress();
})();