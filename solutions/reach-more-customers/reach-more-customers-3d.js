/* Taamerat360 — Reach More Customers / conceptual discovery constellation.
 * All symbols, contact paths and service panels are fictional; no actual
 * traffic, customers, lead volume, conversions, ad networks or results.
 * Reuses the self-hosted WebGL scene kit; no backend or tracking calls.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-reach-customers-hero]");
const stage=document.querySelector("[data-reach-customers-scene]");
const chapters=[...document.querySelectorAll(".rc-cinema-chapter")];
const controls=[...document.querySelectorAll("[data-rc-cinema-stage]")];
const pauseButton=document.getElementById("rc-cinema-motion");
const indicator=document.getElementById("rc-cinema-progress");
if(!K||!hero||!stage||chapters.length!==4||controls.length!==4)return;
const G=new K.Geometry();
const C={ink:[.09,.20,.24],evergreen:[.13,.38,.34],pine:[.16,.47,.41],
sea:[.28,.56,.58],copper:[.96,.43,.25],sun:[.99,.73,.36],
cream:[.96,.91,.79],paper:[.98,.97,.90],mist:[.72,.84,.77],
slate:[.40,.57,.57],stone:[.69,.69,.58],night:[.08,.16,.21]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
// Stage 0: public discovery as an imagined illuminated signal gallery,
// not a real storefront, social network or audience targeting engine.
G.begin(0);
B(0,-.37,0,10.8,.32,7.1,C.night);
B(0,-.16,0,10.5,.11,6.85,C.slate);
B(-2.52,.79,-1.18,4.47,1.52,2.61,C.evergreen);
B(-2.52,1.64,-1.18,4.7,.17,2.81,C.cream);
B(-2.52,1.78,-1.18,4.83,.055,2.97,C.copper);
for(const x of [-4.18,-3.29,-2.40,-1.51,-.62]){
 B(x,.98,.16,.61,.96,.06,C.mist);
 B(x,.99,.21,.045,1.04,.026,C.paper);
}
B(2.75,.35,-1.56,1.02,.61,.82,C.pine);
B(2.75,2.06,-1.56,.18,2.85,.18,C.cream);
B(2.75,3.49,-1.56,.50,.20,.46,C.sun);
for(const [x,y,z,col] of [[-4.33,.18,2.31,C.sun],[-3.09,.18,2.27,C.copper],[-1.67,.18,2.22,C.sun],[.05,.18,2.25,C.copper],[1.63,.18,2.22,C.sun],[3.69,.18,2.24,C.copper]])
 B(x,y,z,.29,.15,.30,col);
// Stage 1: connection arcs point toward relevant conversation channels;
// no actual channel integration or performance numbers.
G.begin(1);
const curve=(center,r,z,color)=>{
 let prev=null;
 for(let i=0;i<=18;i++){
  const q=Math.PI*.16+(Math.PI*.68)*i/18;
  const p=[center[0]+Math.cos(q)*r,center[1]+Math.sin(q)*r,z];
  if(prev)L(prev,p,.065,color);
  prev=p;
 }
};
curve([2.75,2.65],1.12,-1.56,C.cream);
curve([2.75,2.65],1.69,-1.56,C.sea);
curve([2.75,2.65],2.20,-1.56,C.sun);
for(const [x,y,z,col] of [[-3.73,3.14,.13,C.sun],[-1.78,3.56,-.65,C.copper],[.43,3.25,.26,C.sea],[3.81,3.27,-.32,C.sun]]){
 B(x,y,z,1.05,.77,.11,C.paper);
 B(x-.10,y+.14,z+.07,.59,.08,.020,col);
 B(x,y-.08,z+.07,.67,.048,.020,C.evergreen);
}
// Stage 2: editable-in-principle abstract message boards, no real offer.
G.begin(2);
for(const [x,y,z,col] of [[-3.58,2.08,.38,C.cream],[-1.55,2.22,-.65,C.sun],[.60,2.22,.46,C.paper]]){
 B(x,y,z,1.45,1.02,.11,col);
 B(x,y+.28,z+.07,1.03,.09,.022,C.evergreen);
 B(x-.10,y+.07,z+.07,.81,.057,.021,C.sea);
 B(x,y-.16,z+.07,.96,.052,.022,C.copper);
 B(x-.23,y-.33,z+.07,.48,.045,.020,C.stone);
}
// Stage 3: direct human enquiry and handover in a conceptual welcome desk.
G.begin(3);
B(2.72,.64,1.36,2.83,.91,1.36,C.pine);
B(2.72,1.14,1.36,3.05,.15,1.49,C.paper);
B(2.72,.90,2.12,1.38,.18,.06,C.copper);
B(3.73,2.26,1.24,1.01,.74,.12,C.paper);
B(3.73,2.40,1.31,.63,.073,.021,C.sun);
B(3.73,2.06,1.31,.49,.05,.021,C.evergreen);
const way=[[-4.23,.05,2.12],[-2.85,.06,2.12],[-1.08,.07,1.76],[.71,.08,1.76],[2.68,.08,1.55]];
for(let i=0;i<way.length-1;i++)L(way[i],way[i+1],.13,C.copper);
for(const pt of [way[0],way[2],way[4]])B(pt[0],pt[1]+.09,pt[2],.24,.17,.24,C.sun);
const mesh=G.finish(),heroScene=K.create(hero,mesh),chapterScene=K.create(stage,mesh);
if(heroScene)heroScene.draw(3,"hero",0);
if(chapterScene)chapterScene.draw(0,"chapter",0);
if(heroScene||chapterScene)document.body.classList.add("rc-webgl-ready");
for(const scene of [heroScene,chapterScene])if(scene)scene.canvas.addEventListener("webglcontextlost",()=>{
 document.body.classList.remove("rc-webgl-ready");
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
 document.body.classList.toggle("rc-motion-paused",paused);
 request();
}
pauseButton.addEventListener("click",()=>{userPaused=!userPaused;updatePause();});
if(mq.addEventListener)mq.addEventListener("change",updatePause);
addEventListener("scroll",syncScroll,{passive:true});
addEventListener("resize",syncScroll,{passive:true});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
scrollValue=measure();selected=Math.round(scrollValue);updateControls(selected);updatePause();
window.__reachCustomersCinema={
 kind:"native-webgl-reach-more-customers",
 get available(){return!!(heroScene?.available||chapterScene?.available)},
 get mounts(){return Number(!!heroScene)+Number(!!chapterScene)},
 get meshVertices(){return mesh.vertices.length/9},
 get progress(){return progress},
 get paused(){return paused}
};
})();
