(()=>{"use strict";
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let paused=reduced;
const motion=$(".motion-toggle");
function reflectMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ"}
motion.addEventListener("click",()=>{paused=!paused;reflectMotion()});reflectMotion();
const toggle=$(".nav-toggle"),nav=$(".nav-links");
function closeMenu(focus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");if(focus)toggle.focus()}
toggle.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(window.innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const stages={
discover:{index:"01 / 04",word:"DISCOVER",tag:"ATTRACTION / FIRST IMPRESSION",title:"Make the right first impression.",desc:"Present the offer clearly and help relevant buyers, tenants or sellers understand the next step.",focus:"Property discovery and relevant enquiries",n:1,offset:77},
qualify:{index:"02 / 04",word:"QUALIFY",tag:"ENQUIRY / RELEVANT INFORMATION",title:"Understand what matters to them.",desc:"Capture the right context and make it easier to respond to people with different needs, budgets and timeframes.",focus:"Consistent enquiry qualification and response",n:2,offset:49},
viewing:{index:"03 / 04",word:"COORDINATE",tag:"VIEWING / TEAM COMMUNICATION",title:"Make the viewing feel effortless.",desc:"Keep appointments, confirmations and useful property details in one clear conversation.",focus:"Viewing coordination and customer updates",n:3,offset:22},
followup:{index:"04 / 04",word:"FOLLOW THROUGH",tag:"FEEDBACK / NEXT DECISION",title:"Keep the conversation moving.",desc:"Give prospects timely follow-ups after a viewing and help staff know exactly which step comes next.",focus:"Decision follow-through and pipeline visibility",n:4,offset:0}
};
const keys=Object.keys(stages);let selected="discover";
function stage(id){const v=stages[id];if(!v)return;selected=id;
$$(".r-stage").forEach(b=>{const yes=b.dataset.stage===id;b.classList.toggle("is-active",yes);b.setAttribute("aria-pressed",String(yes))});
$("#r-stage-index").textContent=v.index;$("#r-stage-word").textContent=v.word;$("#r-stage-eyebrow").textContent=v.tag;$("#r-stage-title").textContent=v.title;$("#r-stage-desc").textContent=v.desc;$("#r-stage-focus").textContent=v.focus;$("#r-stage-count").textContent=v.n+" OF 4";$("#r-path").setAttribute("stroke-dashoffset",String(v.offset))}
$$(".r-stage").forEach(b=>{b.addEventListener("click",()=>stage(b.dataset.stage));b.addEventListener("keydown",e=>{if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"].includes(e.key))return;e.preventDefault();const step=e.key==="ArrowRight"||e.key==="ArrowDown"?1:-1;const index=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+step));stage(keys[index]);$$(".r-stage")[index].focus()})});
const form=$("#r-brief-form"),copy=$("#r-copy");let draft="";
const role=$("#r-business"),problem=$("#r-challenge"),priority=$("#r-priority"),status=$("#r-copy-status"),result=$("#r-result-text");
form.addEventListener("submit",e=>{e.preventDefault();
draft=["TAAMERAT360 / REAL ESTATE — DISCUSSION BRIEF",
"Business type: "+role.value,"Business bottleneck: "+problem.value,"Immediate priority: "+priority.value,"",
"Discussion focus: Explore suitable solutions for customer acquisition, sales follow-up and business operations.",
"Service scope, deliverables, pricing, timing and responsibilities: To be agreed after consultation.",
"",
"This is a planning brief, not a booking, accepted proposal, client claim or service commitment."].join("\n");
$("#r-result-title").textContent="Your priorities, clearly connected.";$("#r-result-desc").textContent=role.value+" · "+problem.value+" · "+priority.value;
result.textContent=draft;result.hidden=false;copy.disabled=false;status.textContent="Your brief is ready. Copy it, then paste it into the proposal conversation."
});
form.addEventListener("change",()=>{if(!draft)return;draft="";copy.disabled=true;result.hidden=true;$("#r-result-title").textContent="Selections updated.";$("#r-result-desc").textContent="Prepare the brief again to include your new choices.";status.textContent="Your previous brief is out of date. Generate an updated one."});
copy.addEventListener("click",async()=>{if(!draft)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(draft);status.textContent="Copied. Paste the brief into the proposal message when ready."}catch(e){result.hidden=false;status.textContent="Automatic copy is unavailable. Select the visible brief and copy manually.";const sel=window.getSelection();if(sel){sel.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);sel.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let ticking=false;function updateScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$(".scroll-meter").style.width=(max>0?scrollY/max*100:0)+"%";ticking=false})}
addEventListener("scroll",updateScroll,{passive:true});updateScroll();
})();