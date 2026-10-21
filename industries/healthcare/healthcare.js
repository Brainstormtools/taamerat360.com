(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
let paused=matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion=$(".motion-toggle");function showMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ"}
motion.addEventListener("click",()=>{paused=!paused;showMotion()});showMotion();
const menu=$(".nav-toggle"),nav=$(".nav-links");
function closeMenu(focus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");if(focus)menu.focus()}
menu.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(link=>link.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const stages={
discover:{no:"01 / 04",word:"DISCOVERY",tag:"DISCOVERY / PUBLIC INFORMATION",title:"Help people find their next step.",desc:"Present nonclinical service information, contact options and expectations in a simple, accessible way.",focus:"Clear service information and pathways",count:1,offset:76},
enquire:{no:"02 / 04",word:"ENQUIRIES",tag:"GENERAL ENQUIRY / APPROPRIATE TEAM",title:"Make general enquiries easier.",desc:"Give nonclinical questions a clear route to an appropriate administrative contact, with expectations set from the start.",focus:"Front-office routing and response",count:2,offset:49},
followup:{no:"03 / 04",word:"FOLLOW-UP",tag:"ADMINISTRATION / NEXT STEP",title:"Keep administrative next steps clear.",desc:"Reduce missed nonclinical follow-ups through consistent ownership and information about what happens next.",focus:"Timely administrative follow-through",count:3,offset:22},
coordinate:{no:"04 / 04",word:"COORDINATE",tag:"STAFF / BUSINESS COMMUNICATION",title:"Help the front-office team stay aligned.",desc:"Give operational staff clarity about responsibilities and general communications without accessing clinical data.",focus:"Connected team responsibilities",count:4,offset:0}
};
const keys=Object.keys(stages);
function chooseStage(key){const item=stages[key];if(!item)return;
$$(".h-stage").forEach(btn=>{const active=btn.dataset.stage===key;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active))});
$("#h-stage-number").textContent=item.no;$("#h-stage-word").textContent=item.word;$("#h-stage-tag").textContent=item.tag;$("#h-stage-title").textContent=item.title;$("#h-stage-desc").textContent=item.desc;$("#h-stage-focus-text").textContent=item.focus;$("#h-stage-count").textContent=item.count+" OF 4";$("#h-journey-path").setAttribute("stroke-dashoffset",String(item.offset))
}
$$(".h-stage").forEach(btn=>{btn.addEventListener("click",()=>chooseStage(btn.dataset.stage));btn.addEventListener("keydown",event=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))return;event.preventDefault();const delta=event.key==="ArrowDown"||event.key==="ArrowRight"?1:-1;const index=Math.max(0,Math.min(keys.length-1,keys.indexOf(btn.dataset.stage)+delta));chooseStage(keys[index]);$$(".h-stage")[index].focus()})});
const form=$("#h-brief-form"),copy=$("#h-copy"),result=$("#h-result-text"),status=$("#h-status"),practice=$("#h-practice"),problem=$("#h-challenge"),priority=$("#h-priority");let draft="";
form.addEventListener("submit",e=>{e.preventDefault();
draft=["TAAMERAT360 / HEALTHCARE — NONCLINICAL BUSINESS DISCUSSION BRIEF",
"Organisation category: "+practice.value,"Administrative challenge: "+problem.value,"First business priority: "+priority.value,"",
"Discussion focus: Public service information, general business enquiries and/or front-office coordination.",
"Scope, deliverables, integrations, responsibilities, costs and timeline: To be confirmed after consultation.",
"Exclude patient names, medical histories, clinical records, diagnosis, treatment, triage and emergency response.",
"",
"Not a medical request, an appointment booking, a service guarantee or an accepted proposal."].join("\n");
$("#h-result-title").textContent="Your administrative priorities, clearly defined.";
$("#h-result-summary").textContent=practice.value+" · "+problem.value+" · "+priority.value;
result.textContent=draft;result.hidden=false;copy.disabled=false;status.textContent="Nonclinical brief ready. Copy it if you'd like to share this business discussion starting point."
});
form.addEventListener("change",()=>{if(!draft)return;draft="";copy.disabled=true;result.hidden=true;$("#h-result-title").textContent="Your selections changed.";$("#h-result-summary").textContent="Prepare a new brief to reflect your updated choices.";status.textContent="The previous brief is out of date."});
copy.addEventListener("click",async()=>{if(!draft)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(draft);status.textContent="Business brief copied. Please do not add or share patient or medical information."}catch{result.hidden=false;status.textContent="Automatic copy unavailable. Select the visible text and copy it manually.";const sel=getSelection();if(sel){sel.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);sel.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let busy=false;function progress(){if(busy)return;busy=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";busy=false})}
addEventListener("scroll",progress,{passive:true});progress();
})();