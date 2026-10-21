(() => {"use strict";
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let paused=reduced;
const motion=$(".motion-toggle");
function setMotion(){document.body.classList.toggle("motion-off",paused);motion.setAttribute("aria-pressed",String(paused));$(".motion-label").textContent=paused?"Resume motion":"Pause motion";$(".motion-indicator").textContent=paused?"▶":"Ⅱ"}
motion.addEventListener("click",()=>{paused=!paused;setMotion()});setMotion();
const toggle=$(".nav-toggle"),nav=$(".nav-links");
function closeMenu(focus=false){if(!nav.classList.contains("is-open"))return;nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation");if(focus)toggle.focus()}
toggle.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu(true)});
document.addEventListener("pointerdown",e=>{if(window.innerWidth<=980&&!e.target.closest(".site-header"))closeMenu()});
const journey={
inquiry:{number:"01 / 04",word:"DISCOVERY",label:"INTEREST / FIRST CONTACT",title:"Make it easy to begin.",description:"Help potential clients find a relevant practice, understand its approach and start the right conversation.",outcome:"Enquiry capture and response",count:1,offset:76},
brief:{number:"02 / 04",word:"BRIEF",label:"PROJECT GOALS / INITIAL REQUIREMENTS",title:"Listen before planning.",description:"Use a repeatable intake process to gather priorities, constraints and questions before a proposal is drafted.",outcome:"Clearer client intake and expectations",count:2,offset:49},
proposal:{number:"03 / 04",word:"AGREEMENT",label:"PROPOSAL / COMMERCIAL NEXT STEP",title:"Give decisions a clear route.",description:"Make it easier to follow up on proposals and clarify responsibilities, approvals and the next business action.",outcome:"Visible proposal status and follow-ups",count:3,offset:22},
coordinate:{number:"04 / 04",word:"DELIVERY",label:"STUDIO / CLIENT COMMUNICATION",title:"Keep the people connected.",description:"Coordinate business communications and next actions across project stakeholders without replacing technical design management.",outcome:"Consistent communication and handovers",count:4,offset:0}
};
const keys=Object.keys(journey);
function setStage(key){const s=journey[key];if(!s)return;
$$(".a-step").forEach(b=>{const active=b.dataset.stage===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
$("#a-step-number").textContent=s.number;$("#a-plan-name").textContent=s.word;$("#a-step-eyebrow").textContent=s.label;$("#a-step-title").textContent=s.title;$("#a-step-description").textContent=s.description;$("#a-step-outcome").textContent=s.outcome;$("#a-step-count").textContent=s.count+" OF 4";$("#a-flow-path").setAttribute("stroke-dashoffset",String(s.offset))
}
$$(".a-step").forEach(b=>{
b.addEventListener("click",()=>setStage(b.dataset.stage));
b.addEventListener("keydown",e=>{if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;e.preventDefault();const direction=e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1;const index=Math.max(0,Math.min(keys.length-1,keys.indexOf(b.dataset.stage)+direction));setStage(keys[index]);$$(".a-step")[index].focus()})
});
const form=$("#a-brief-form"),copy=$("#a-copy"),result=$("#a-result-text"),status=$("#a-copy-status"),practice=$("#a-practice"),bottleneck=$("#a-bottleneck"),priority=$("#a-priority");let draft="";
form.addEventListener("submit",e=>{e.preventDefault();
draft=["TAAMERAT360 / ARCHITECTURE — STARTING BUSINESS DISCUSSION BRIEF",
"Practice type: "+practice.value,
"Current workflow challenge: "+bottleneck.value,
"First improvement priority: "+priority.value,
"",
"Discussion objective: Explore appropriate business growth, client intake, proposal follow-up or coordination support.",
"Detailed scope, integrations, deliverables, budget, timing and responsibilities: To be agreed after consultation.",
"Architectural drawings, professional certifications and regulatory approvals are not implied.",
"",
"This is a discussion brief, not a signed proposal or service commitment."].join("\n");
$("#a-result-title").textContent="Your next step, in focus.";$("#a-result-summary").textContent=practice.value+" · "+bottleneck.value+" · "+priority.value;
result.textContent=draft;result.hidden=false;copy.disabled=false;status.textContent="Your brief is ready. Copy it, then paste it into your message on the proposal page."
});
form.addEventListener("change",()=>{if(!draft)return;draft="";copy.disabled=true;result.hidden=true;$("#a-result-title").textContent="Your selections changed.";$("#a-result-summary").textContent="Prepare the brief again to include your updated information.";status.textContent="The previous draft is out of date. Generate a new one."});
copy.addEventListener("click",async()=>{if(!draft)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(draft);status.textContent="Brief copied. You can paste it into the proposal conversation."}catch{result.hidden=false;status.textContent="Automatic copy is not available. Select the brief above and copy it manually.";const selection=window.getSelection();if(selection){selection.removeAllRanges();const range=document.createRange();range.selectNodeContents(result);selection.addRange(range)}}});
$("#year").textContent=String(new Date().getFullYear());
let raf=false;function progress(){if(raf)return;raf=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;$(".scroll-meter").style.width=(max>0?window.scrollY/max*100:0)+"%";raf=false})}
window.addEventListener("scroll",progress,{passive:true});progress();
})();