/* Taamerat360 — Improve Customer Experience / conceptual conversation atrium.
 * All information panels are conceptual; no real customer accounts,
 * tickets, support messages, customer identity or measured satisfaction.
 * Reuses the self-hosted WebGL scene kit; no backend or tracking calls.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-customer-experience-hero]");
const stage=document.querySelector("[data-customer-experience-scene]");
const chapters=[...document.querySelectorAll(".cx-cinema-chapter")];
const controls=[...document.querySelectorAll("[data-cx-cinema-stage]")];
const pauseButton=document.getElementById("cx-cinema-motion");
const indicator=document.getElementById("cx-cinema-progress");
if(!K||!hero||!stage||chapters.length!==4||controls.length!==4)return;
const G=new K.Geometry();
// Fictional customer-conversation atrium; no identifiable people, accounts,
// service tickets, contact logs or measurable satisfaction claims.
const C={base:[.16,.20,.34],violet:[.36,.34,.56],aubergine:[.31,.25,.43],teal:[.24,.52,.57],lagoon:[.43,.74,.72],lavender:[.72,.68,.85],blush:[.94,.62,.60],coral:[.97,.48,.35],sun:[.99,.78,.52],cream:[.97,.94,.85],mist:[.84,.89,.89],ink:[.19,.32,.42]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
// DISCOVER — speculative luminous information salon and signage.
G.begin(0);
B(0,-.38,0,10.8,.36,7.18,C.base);
B(0,-.15,0,10.58,.11,6.92,C.mist);
B(-2.89,.92,-1.54,3.45,1.79,2.64,C.violet);
B(-2.89,1.94,-1.54,3.7,.21,2.86,C.cream);
B(-2.89,2.10,-1.54,3.77,.07,2.95,C.coral);
for(let i=0;i<4;i++){
 B(-4.07+i*.80,1.06,-.165,.56,1.08,.075,i%2?C.lagoon:C.lavender);
 B(-4.07+i*.80,.66,-.105,.36,.065,.021,C.cream);
}
B(.32,.66,-1.51,2.52,1.22,2.07,C.teal);
B(.32,1.36,-1.51,2.77,.16,2.28,C.cream);
B(.32,1.47,-1.51,2.86,.055,2.37,C.sun);
B(.32,.89,-.47,1.20,.66,.073,C.blush);
B(3.50,.35,-1.45,1.28,.70,1.12,C.aubergine);
B(3.50,.76,-1.45,1.46,.12,1.30,C.cream);
for(let i=0;i<5;i++)B(-4.18+i*2.05,.05,2.45,.62,.05,.17,i%2?C.coral:C.sun);
// CONNECT — abstract conversation bubbles and curved arcs; no messenger API.
G.begin(1);
for(const [x,y,z,col] of [[-3.56,3.03,.25,C.lavender],[-1.18,3.50,-.55,C.blush],[1.22,3.19,.28,C.lagoon],[3.53,3.18,-.74,C.sun]]){
 B(x,y,z,1.24,.86,.13,C.cream);
 B(x-.15,y+.18,z+.075,.69,.07,.023,col);
 B(x,y-.05,z+.075,.83,.055,.024,C.ink);
 B(x-.19,y-.25,z+.075,.48,.05,.023,C.violet);
}
const arc=(cx,cy,r,z,color)=>{
 let prior=null;
 for(let i=0;i<=16;i++){
  const t=Math.PI*.14+Math.PI*.73*(i/16);
  const p=[cx+Math.cos(t)*r,cy+Math.sin(t)*r,z];
  if(prior)L(prior,p,.068,color);
  prior=p;
 }
};
arc(.32,1.52,1.23,-1.51,C.coral);
arc(.32,1.52,1.72,-1.51,C.sun);
// CONTINUE — relationship as an abstract continuous waypoint ribbon,
// deliberately not a real notification, delivery promise or status.
G.begin(2);
for(const [i,x] of [0,1,2,3].map((i)=>[i,-3.69+i*2.43])){
 const z=i%2?-.21:.72;
 B(x,2.25,z,1.35,.96,.12,C.cream);
 B(x,2.51,z+.075,.88,.095,.021,i%2?C.lagoon:C.blush);
 B(x-.13,2.25,z+.075,.75,.052,.024,C.ink);
 B(x-.18,2.06,z+.075,.49,.047,.023,C.violet);
}
const path=[[-4.24,.11,2.01],[-2.66,.11,2.01],[-.90,.11,1.71],[.91,.11,1.71],[2.62,.11,1.94],[4.15,.11,1.94]];
for(let i=0;i<path.length-1;i++)L(path[i],path[i+1],.134,C.coral);
for(const p of [path[0],path[2],path[4],path[5]])B(p[0],p[1]+.10,p[2],.24,.18,.24,C.sun);
// IMPROVE — public-information feedback gallery with generic cards;
// no recording, ratings collection, support desk, or real outcomes.
G.begin(3);
B(2.56,.58,1.27,2.69,.86,1.31,C.teal);
B(2.56,1.05,1.27,2.96,.15,1.50,C.cream);
B(2.56,.85,2.04,1.23,.17,.071,C.coral);
for(const [x,y,z,col] of [[-3.37,4.29,-.72,C.sun],[-.30,4.67,-.22,C.blush],[3.13,4.38,-.78,C.lagoon]]){
 B(x,y,z,1.20,.83,.12,C.cream);
 B(x-.14,y+.20,z+.074,.68,.074,.025,col);
 B(x,y-.04,z+.074,.81,.050,.022,C.ink);
 B(x-.15,y-.25,z+.074,.49,.046,.022,C.violet);
}
L([-2.77,4.30,-.72],[-.90,4.66,-.22],.072,C.coral);
L([.30,4.65,-.22],[2.53,4.38,-.78],.072,C.sun);
const mesh=G.finish(),heroScene=K.create(hero,mesh),chapterScene=K.create(stage,mesh);
if(heroScene)heroScene.draw(3,"hero",0);
if(chapterScene)chapterScene.draw(0,"chapter",0);
if(heroScene||chapterScene)document.body.classList.add("cx-webgl-ready");
for(const scene of [heroScene,chapterScene])if(scene)scene.canvas.addEventListener("webglcontextlost",()=>{
 document.body.classList.remove("cx-webgl-ready");
});
const mq=matchMedia("(prefers-reduced-motion: reduce)");
let userPaused=false,paused=mq.matches;
let selected=0,scrollValue=0,progress=0,manual=null,until=0,pending=false;
let active=!document.hidden;
let timer=null;
const visible=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function measure(){
 const pivot=innerHeight*.52,centers=chapters.map(el=>{const r=el.getBoundingClientRect();return r.top+r.height/2;});
 if(pivot<=centers[0])return 0;
 if(pivot>=centers[3])return 3;
 for(let i=0;i<3;i++)if(pivot>=centers[i]&&pivot<=centers[i+1])
  return i+(pivot-centers[i])/(centers[i+1]-centers[i]);
 return 0;
}
function updateControls(index){
 controls.forEach((btn,i)=>{const current=i===index;btn.setAttribute("aria-pressed",String(current));btn.classList.toggle("is-active",current);});
 chapters.forEach((el,i)=>el.classList.toggle("is-current",i===index));
 if(indicator)indicator.textContent=String(index+1).padStart(2,"0")+" / 04";
}
function request(){if(active&&!pending){pending=true;requestAnimationFrame(draw);}}
function draw(ms){
 pending=false;if(!active)return;
 const goal=manual!==null&&performance.now()<until?manual:scrollValue;
 if(paused)progress=goal;
 else progress=K.mix(progress,goal,.19);
 if(heroScene&&visible(hero))heroScene.draw(3,"hero",paused?0:ms*.001);
 if(chapterScene&&visible(stage))chapterScene.draw(progress,"chapter",paused?0:ms*.001);
 updateControls(Math.max(0,Math.min(3,Math.round(progress))));
 if(!paused&&(visible(hero)||visible(stage))&&timer===null)
  timer=setTimeout(()=>{timer=null;request();},110);
 else if(Math.abs(goal-progress)>.006)request();
}
function syncScroll(){
 scrollValue=measure();
 if(performance.now()>=until)manual=null;
 if(paused)selected=Math.round(scrollValue);
 request();
}
controls.forEach((btn,i)=>{
 btn.addEventListener("click",()=>{
  selected=i;manual=i;until=performance.now()+2200;
  // The stage buttons also work when WebGL is blocked.
  updateControls(i);request();
 });
 btn.addEventListener("keydown",e=>{
  if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;
  e.preventDefault();
  const next=Math.max(0,Math.min(3,i+(["ArrowRight","ArrowDown"].includes(e.key)?1:-1)));
  controls[next].focus();controls[next].click();
 });
});
function updatePause(){
 paused=userPaused||mq.matches;
 pauseButton.setAttribute("aria-pressed",String(userPaused));
 pauseButton.setAttribute("aria-label",userPaused?"Resume cinematic motion":"Pause cinematic motion");
 pauseButton.textContent=userPaused?"Resume motion ↗":"Pause motion Ⅱ";
 document.body.classList.toggle("cx-motion-paused",paused);
 request();
}
pauseButton.addEventListener("click",()=>{userPaused=!userPaused;updatePause();});
if(mq.addEventListener)mq.addEventListener("change",updatePause);
addEventListener("scroll",syncScroll,{passive:true});
addEventListener("resize",syncScroll,{passive:true});
addEventListener("customer-experience:stage",event=>{
 const i=Number(event.detail?.index);
 if(!Number.isInteger(i)||i<0||i>3)return;
 selected=i;manual=i;until=performance.now()+1800;
 updateControls(i);request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
scrollValue=measure();selected=Math.round(scrollValue);updateControls(selected);updatePause();
window.__customerExperienceCinema={
 kind:"native-webgl-improve-customer-experience",
 get available(){return!!(heroScene?.available||chapterScene?.available)},
 get mounts(){return Number(!!heroScene)+Number(!!chapterScene)},
 get meshVertices(){return mesh.vertices.length/9},
 get progress(){return progress},
 get paused(){return paused}
};
})();
