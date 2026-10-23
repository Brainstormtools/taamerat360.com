/* Taamerat360 — Simplify Business Operations / conceptual operations workshop.
 * All workshop tables and process cards are fictional; no real projects,
 * tasks, employee records, system connections or automation.
 * Reuses the self-hosted WebGL scene kit; no backend or tracking calls.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-operations-flow-hero]");
const stage=document.querySelector("[data-operations-flow-scene]");
const chapters=[...document.querySelectorAll(".op-cinema-chapter")];
const controls=[...document.querySelectorAll("[data-op-cinema-stage]")];
const pauseButton=document.getElementById("op-cinema-motion");
const indicator=document.getElementById("op-cinema-progress");
if(!K||!hero||!stage||chapters.length!==4||controls.length!==4)return;
const G=new K.Geometry();
const C={ground:[.12,.22,.24],pine:[.13,.37,.34],jade:[.26,.56,.45],sage:[.47,.72,.57],teal:[.29,.51,.60],aqua:[.49,.77,.72],paper:[.97,.95,.87],linen:[.88,.84,.66],orange:[.97,.46,.26],sun:[.99,.76,.38],stone:[.63,.73,.66],ink:[.12,.25,.29]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
// Fictional process design workshop, not real staff, projects or automation.
G.begin(0);
B(0,-.36,0,10.8,.35,7.12,C.ground);B(0,-.14,0,10.5,.11,6.94,C.stone);
B(-2.93,.89,-1.52,3.3,1.71,2.72,C.pine);B(-2.93,1.86,-1.52,3.55,.20,2.95,C.paper);
B(-2.93,2.00,-1.52,3.64,.065,3.04,C.sun);
for(let i=0;i<4;i++)B(-4.05+i*.77,.95,-.14,.52,1.12,.06,C.aqua);
B(.52,.65,-1.55,2.56,1.22,2.03,C.teal);B(.52,1.34,-1.55,2.80,.15,2.24,C.paper);
B(.52,1.45,-1.55,2.84,.07,2.33,C.orange);
B(3.58,.38,-1.61,1.13,.73,1.31,C.pine);B(3.58,.79,-1.61,1.37,.14,1.49,C.paper);
for(let i=0;i<6;i++)B(-4.2+i*1.65,.04,2.42,.65,.055,.15,i%2?C.sun:C.orange);
G.begin(1);
for(const [x,y,z,a] of [[-3.72,3.12,.24,C.paper],[-1.13,3.45,-.65,C.linen],[1.32,3.26,.36,C.paper],[3.7,3.13,-.64,C.linen]]){
 B(x,y,z,1.16,.86,.13,a);B(x-.11,y+.18,z+.076,.67,.075,.023,C.jade);
 B(x,y-.05,z+.076,.81,.052,.023,C.ink);B(x-.16,y-.24,z+.076,.49,.048,.023,C.orange);
}
L([-3.12,3.15,.24],[-1.73,3.43,-.65],.072,C.sun);
L([-.53,3.43,-.65],[.73,3.26,.36],.072,C.aqua);
L([1.92,3.26,.36],[3.10,3.13,-.64],.072,C.orange);
G.begin(2);
for(let i=0;i<4;i++){
 const x=-3.7+i*2.45;
 B(x,2.21,.79,1.41,.98,.13,C.paper);B(x,2.52,.865,.89,.092,.021,i%2?C.aqua:C.sun);
 B(x-.13,2.23,.865,.82,.053,.021,C.pine);B(x-.18,2.05,.865,.52,.051,.021,C.stone);
}
const route=[[-4.2,.10,2.02],[-2.6,.10,2.02],[-.8,.10,1.72],[.9,.10,1.72],[2.7,.10,1.99],[4.2,.10,1.99]];
for(let i=0;i<route.length-1;i++)L(route[i],route[i+1],.13,C.orange);
for(const p of [route[0],route[2],route[4],route[5]])B(p[0],p[1]+.09,p[2],.24,.17,.24,C.sun);
G.begin(3);
B(2.42,.56,1.29,2.73,.82,1.27,C.jade);B(2.42,1.03,1.29,3,.16,1.49,C.paper);
B(2.42,.83,2.04,1.26,.16,.06,C.orange);
for(const [x,y,z,col] of [[-3.40,4.35,-.75,C.sun],[-.33,4.67,-.12,C.aqua],[3.08,4.42,-.75,C.orange]]){
 B(x,y,z,1.23,.86,.13,C.paper);B(x-.14,y+.20,z+.074,.70,.075,.021,col);
 B(x,y-.05,z+.074,.83,.054,.021,C.ink);B(x-.16,y-.25,z+.074,.51,.049,.021,C.stone);
}
L([-2.78,4.35,-.75],[-.95,4.67,-.12],.075,C.orange);
L([.29,4.67,-.12],[2.46,4.42,-.75],.075,C.aqua);
const mesh=G.finish(),heroScene=K.create(hero,mesh),chapterScene=K.create(stage,mesh);
if(heroScene)heroScene.draw(3,"hero",0);
if(chapterScene)chapterScene.draw(0,"chapter",0);
if(heroScene||chapterScene)document.body.classList.add("op-webgl-ready");
for(const scene of [heroScene,chapterScene])if(scene)scene.canvas.addEventListener("webglcontextlost",()=>{
 document.body.classList.remove("op-webgl-ready");
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
 document.body.classList.toggle("op-motion-paused",paused);
 request();
}
pauseButton.addEventListener("click",()=>{userPaused=!userPaused;updatePause();});
if(mq.addEventListener)mq.addEventListener("change",updatePause);
addEventListener("scroll",syncScroll,{passive:true});
addEventListener("resize",syncScroll,{passive:true});
addEventListener("operations:stage",event=>{
 const i=Number(event.detail?.index);
 if(!Number.isInteger(i)||i<0||i>3)return;
 selected=i;manual=i;until=performance.now()+1800;
 updateControls(i);request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
scrollValue=measure();selected=Math.round(scrollValue);updateControls(selected);updatePause();
window.__operationsCinema={
 kind:"native-webgl-simplify-operations",
 get available(){return!!(heroScene?.available||chapterScene?.available)},
 get mounts(){return Number(!!heroScene)+Number(!!chapterScene)},
 get meshVertices(){return mesh.vertices.length/9},
 get progress(){return progress},
 get paused(){return paused}
};
})();
