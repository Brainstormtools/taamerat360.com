/* Taamerat360 — Move Sales Forward / conceptual sales momentum studio.
 * All stages, information cards and paths are fictional; no actual CRM data,
 * sales pipeline, qualified leads, customer identities or results.
 * Reuses the self-hosted WebGL scene kit; no backend or tracking calls.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-sales-forward-hero]");
const stage=document.querySelector("[data-sales-forward-scene]");
const chapters=[...document.querySelectorAll(".sf-cinema-chapter")];
const controls=[...document.querySelectorAll("[data-sf-cinema-stage]")];
const pauseButton=document.getElementById("sf-cinema-motion");
const indicator=document.getElementById("sf-cinema-progress");
if(!K||!hero||!stage||chapters.length!==4||controls.length!==4)return;
const G=new K.Geometry();
// Abstract sales-conversation studio, not a sales system or pipeline dashboard.
const C={night:[.15,.15,.27],purple:[.30,.25,.49],indigo:[.27,.39,.62],
 stone:[.72,.70,.76],chalk:[.93,.93,.88],gold:[.96,.72,.41],
 copper:[.96,.43,.31],ice:[.59,.80,.83],mint:[.47,.73,.66],
 wine:[.44,.23,.38],paper:[.97,.95,.90],shadow:[.11,.12,.23]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
// INBOUND / 01: a fictional, anonymous business reception, not stored leads.
G.begin(0);
B(0,-.37,0,10.8,.36,7.20,C.shadow);
B(0,-.13,0,10.4,.1,6.94,C.stone);
B(-2.98,.96,-1.41,2.60,1.93,2.66,C.purple);
B(-2.98,2.04,-1.41,2.82,.24,2.89,C.paper);
B(-2.98,2.25,-1.41,2.97,.07,3.01,C.copper);
for(const x of [-3.90,-3.30,-2.70,-2.10])
 B(x,1.12,-.035,.41,1.08,.06,C.ice);
B(.02,.60,-1.70,2.48,1.17,1.63,C.wine);
B(.02,1.26,-1.70,2.76,.17,1.87,C.paper);
B(.02,1.37,-1.70,2.91,.07,2.01,C.gold);
B(.02,.79,-.83,1.27,.73,.08,C.ice);
B(3.46,.40,-1.74,1.03,.82,1.19,C.indigo);
B(3.46,.88,-1.74,1.23,.13,1.36,C.paper);
B(3.46,1.04,-1.74,1.29,.09,1.41,C.copper);
for(let i=0;i<8;i++)B(-4.47+i*1.25,.04,2.53,.63,.05,.15,i%2?C.gold:C.copper);
// DISCOVERY / 02: open question boards and shared conversation context.
G.begin(1);
for(const [x,y,z,accent] of [
 [-3.67,3.38,.16,C.gold],[-1.25,3.69,-.79,C.ice],
 [1.13,3.30,.32,C.copper],[3.42,3.31,-.75,C.mint]]){
 B(x,y,z,1.24,.84,.12,C.paper);
 B(x-.14,y+.17,z+.072,.69,.07,.025,accent);
 B(x,y-.06,z+.072,.90,.051,.025,C.night);
 B(x-.11,y-.23,z+.072,.59,.045,.022,C.stone);
}
// Conversation arcs are storytelling motifs, never customer-contact records.
const arc=(cx,cy,cz,r,color)=>{
 let prev=null;
 for(let k=0;k<=14;k++){
  const angle=.17*Math.PI+(.66*Math.PI)*k/14;
  const p=[cx+r*Math.cos(angle),cy+r*Math.sin(angle),cz];
  if(prev)L(prev,p,.061,color);
  prev=p;
 }
};
arc(.02,1.50,-1.7,1.10,C.gold);
arc(.02,1.50,-1.7,1.63,C.ice);
// AGREEMENT / 03: transparent scope cards and fictional decision milestones.
G.begin(2);
for(const [x,y,z,c] of [
 [-3.76,2.24,.70,C.gold],[-1.55,2.32,.81,C.copper],
 [.70,2.22,.93,C.mint],[2.99,2.38,.82,C.ice]]){
 B(x,y,z,1.38,1.04,.12,C.chalk);
 B(x,y+.31,z+.076,.92,.10,.023,c);
 B(x-.12,y+.09,z+.076,.79,.056,.022,C.night);
 B(x-.09,y-.08,z+.076,.85,.053,.023,C.wine);
 B(x-.20,y-.26,z+.076,.46,.05,.020,C.stone);
}
const points=[[-4.2,.13,2.15],[-2.77,.13,2.16],[-1.18,.13,1.91],[.66,.13,1.98],[2.41,.13,2.04],[4.12,.13,2.04]];
for(let i=0;i<points.length-1;i++)L(points[i],points[i+1],.13,C.copper);
for(const a of [points[0],points[2],points[4],points[5]])B(a[0],a[1]+.09,a[2],.24,.18,.24,C.gold);
// FOLLOW THROUGH / 04: coordination desk plus floating commitment cards.
// No CRM access, automations, contact data, win-rate or closed deal claims.
G.begin(3);
B(2.57,.57,1.37,2.70,.86,1.22,C.purple);
B(2.57,1.04,1.37,2.99,.13,1.46,C.paper);
B(2.57,.78,2.05,1.20,.20,.08,C.copper);
for(const [x,y,z,accent] of [
 [-3.44,4.48,-.67,C.mint],[-.36,4.81,-.24,C.gold],[3.07,4.48,-.90,C.copper]]){
 B(x,y,z,1.21,.82,.12,C.paper);
 B(x-.14,y+.16,z+.071,.69,.077,.024,accent);
 B(x,y-.07,z+.071,.83,.052,.021,C.indigo);
 B(x-.14,y-.23,z+.071,.50,.045,.020,C.stone);
}
L([-2.82,4.49,-.67],[-.97,4.79,-.24],.066,C.gold);
L([.25,4.79,-.24],[2.47,4.49,-.90],.066,C.copper);
const mesh=G.finish(),heroScene=K.create(hero,mesh),chapterScene=K.create(stage,mesh);
if(heroScene)heroScene.draw(3,"hero",0);
if(chapterScene)chapterScene.draw(0,"chapter",0);
if(heroScene||chapterScene)document.body.classList.add("sf-webgl-ready");
for(const scene of [heroScene,chapterScene])if(scene)scene.canvas.addEventListener("webglcontextlost",()=>{
 document.body.classList.remove("sf-webgl-ready");
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
 document.body.classList.toggle("sf-motion-paused",paused);
 request();
}
pauseButton.addEventListener("click",()=>{userPaused=!userPaused;updatePause();});
if(mq.addEventListener)mq.addEventListener("change",updatePause);
addEventListener("scroll",syncScroll,{passive:true});
addEventListener("resize",syncScroll,{passive:true});
addEventListener("sales-forward:stage",event=>{
 const i=Number(event.detail?.index);
 if(!Number.isInteger(i)||i<0||i>3)return;
 selected=i;manual=i;until=performance.now()+1800;
 updateControls(i);request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
scrollValue=measure();selected=Math.round(scrollValue);updateControls(selected);updatePause();
window.__salesForwardCinema={
 kind:"native-webgl-move-sales-forward",
 get available(){return!!(heroScene?.available||chapterScene?.available)},
 get mounts(){return Number(!!heroScene)+Number(!!chapterScene)},
 get meshVertices(){return mesh.vertices.length/9},
 get progress(){return progress},
 get paused(){return paused}
};
})();
