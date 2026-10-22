/* Taamerat360 / Banking & Fintech cinematic environment.
 * Fictional public-information and business-communication sculpture only.
 * No real financial institution, accounts, identity, transactions, customer
 * records, regulatory accreditation or financial services are represented.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-fintech-hero]");
const stage=document.querySelector("[data-fintech-scene]");
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={
 navy:[.10,.19,.28], deep:[.08,.28,.32], metal:[.69,.78,.82],
 pearl:[.93,.96,.91], glass:[.47,.78,.82], ice:[.70,.90,.90],
 copper:[.95,.39,.23], gold:[.95,.73,.41], jade:[.32,.69,.57],
 slate:[.29,.49,.59], dark:[.15,.35,.43], stone:[.76,.78,.72]
};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// DISCOVER: unbranded public service pavilion, not a digital bank.
B(0,-.27,0,10.5,.35,7.1,C.navy);
B(0,-.07,0,10.2,.055,6.85,C.metal);
for(const x of [-4.65,4.65])for(const z of [-2.84,2.84])
 B(x,.24,z,.30,.66,.30,C.copper);
B(-1.40,1.35,-.95,6.1,2.70,2.75,C.deep);
B(-1.40,2.80,-.95,6.45,.22,3.15,C.pearl);
B(-1.40,3.00,-.95,6.63,.09,3.35,C.copper);
for(const x of [-4.10,-3.10,-2.10,-1.10,-.10,.90])
 B(x,1.44,.48,.74,1.68,.055,C.glass);
for(const x of [-3.60,-2.60,-1.60,-.60,.40])
 B(x,1.48,.55,.065,1.76,.065,C.metal);
B(-1.40,.64,.56,1.05,1.23,.12,C.copper);
B(2.77,.68,-1.56,2.20,1.20,2.50,C.slate);
B(2.77,1.35,-1.56,2.52,.17,2.82,C.pearl);
B(2.77,1.49,-1.56,2.70,.075,3.01,C.gold);
for(let i=0;i<7;i++)B(-3.3+i*.95,.095,2.55,.46,.055,.18,i%2?C.copper:C.gold);
for(const z of [-2.4,-1.65,-.9,.1,1.05])B(4.42,.46,z,.27,.70,.25,C.jade);
G.begin(1);
// UNDERSTAND: transparent public information panes and disclosure layers.
for(const [x,y,z,col] of [
 [-4.17,3.77,.12,C.gold],[-2.25,4.00,-1.85,C.glass],
 [.16,3.75,.37,C.copper],[2.95,3.45,-.35,C.jade]
]){
 B(x,y,z,1.40,.92,.10,C.pearl);
 B(x,y+.23,z+.060,.96,.07,.022,col);
 B(x-.14,y+.035,z+.060,.70,.055,.022,C.dark);
 B(x-.25,y-.17,z+.060,.48,.055,.022,C.stone);
}
// Layered panels represent public descriptions, not actual financial UI.
for(let i=0;i<4;i++){
 B(2.05+i*.37,2.65-i*.11,1.15-i*.15,.69,.89,.055,i%2?C.glass:C.metal);
 B(2.05+i*.37,2.87-i*.11,1.18-i*.15,.34,.07,.018,C.deep);
}
L([-3.65,3.35,.20],[-2.78,2.9,.56],.045,C.gold);
G.begin(2);
// ENQUIRE: copper pathway joins only general information/contact markers.
B(2.74,.55,1.65,2.65,.96,1.00,C.dark);
B(2.74,1.08,1.65,2.95,.13,1.24,C.pearl);
B(2.70,.68,2.19,1.13,.22,.06,C.copper);
B(3.50,2.30,1.23,.87,.74,.10,C.pearl);
B(3.50,2.46,1.29,.59,.065,.018,C.jade);
B(3.50,2.21,1.29,.46,.052,.018,C.slate);
L([-3.85,.15,2.2],[-1.2,.18,2.2],.12,C.copper);
L([-1.2,.18,2.2],[1.0,.18,1.7],.12,C.copper);
L([1.0,.18,1.7],[2.55,.18,1.7],.12,C.gold);
for(const x of [-3.74,-1.18,1.05,2.55])B(x,.21,2.05,.26,.18,.26,C.pearl);
G.begin(3);
// COORDINATE: clear illustrative staff handover cards, never personal data.
for(const [x,y,z,col] of [
 [-3.48,4.82,-.70,C.jade],[-.25,4.75,-.12,C.copper],[3.13,4.58,-1.04,C.gold]
]){
 B(x,y,z,1.20,.78,.14,C.pearl);
 B(x-.17,y+.16,z+.081,.66,.07,.024,col);
 B(x,y-.06,z+.081,.80,.058,.024,C.dark);
 B(x-.15,y-.23,z+.081,.48,.045,.024,C.stone);
}
L([-2.89,4.77,-.68],[-.83,4.74,-.12],.078,C.copper);
L([.35,4.70,-.15],[2.52,4.57,-1.02],.078,C.gold);
B(-.30,3.25,.92,.98,.64,.11,C.jade);
B(-.30,3.35,.99,.70,.065,.022,C.pearl);
B(-.30,3.10,.99,.48,.05,.022,C.pearl);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
// Both frames must be drawn before replacing the visible SVG. On compact
// screens the chapter canvas begins below the fold and may never be
// scheduled by an on-screen-only draw loop.
if(a)a.draw(3,"hero",0);
if(b)b.draw(0,"chapter",0);
document.body.classList.add("fintech-webgl-ready");
for(const scene of [a,b]){
 if(!scene)continue;
 scene.canvas.addEventListener("webglcontextlost",()=>{
  document.body.classList.remove("fintech-webgl-ready");
 });
}
const chapters=[...document.querySelectorAll(".fintech-cinema-chapter")];
const keys=["discover","understand","enquire","coordinate"];
const badge=document.getElementById("fintech-cinema-progress");
const reduced=matchMedia("(prefers-reduced-motion: reduce)");
let paused=reduced.matches||document.body.classList.contains("motion-off");
let selected=0,scrollValue=0,progress=0,manual=null,until=0;
let active=!document.hidden,pending=false,timer=null;
const visible=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function scrollProgress(){
 if(chapters.length!==4)return 0;
 const pivot=innerHeight*.52,centers=chapters.map(el=>{const r=el.getBoundingClientRect();return r.top+r.height/2;});
 if(pivot<=centers[0])return 0;
 if(pivot>=centers[3])return 3;
 for(let i=0;i<3;i++)if(pivot>=centers[i]&&pivot<=centers[i+1])
  return i+(pivot-centers[i])/(centers[i+1]-centers[i]);
 return 0;
}
function request(){if(active&&!pending){pending=true;requestAnimationFrame(tick);}}
function tick(ms){
 pending=false;if(!active)return;
 const goal=paused?selected:(manual!==null&&performance.now()<until?manual:scrollValue);
 progress=paused?goal:K.mix(progress,goal,.17);
 if(a&&visible(hero))a.draw(3,"hero",ms*.001);
 if(b&&visible(stage))b.draw(progress,"chapter",ms*.001);
 if(badge)badge.textContent=String(Math.min(4,Math.floor(progress+.34)+1)).padStart(2,"0")+" / 04";
 for(let i=0;i<chapters.length;i++)chapters[i].classList.toggle("is-current",Math.round(progress)===i);
 if(!paused&&(visible(hero)||visible(stage))&&timer===null)
  timer=setTimeout(()=>{timer=null;request();},110);
 else if(Math.abs(goal-progress)>.006)request();
}
function syncScroll(){scrollValue=scrollProgress();if(performance.now()>until)manual=null;request();}
addEventListener("scroll",syncScroll,{passive:true});
addEventListener("resize",syncScroll,{passive:true});
addEventListener("fintech:stage",e=>{
 const i=keys.indexOf(e.detail?.key);if(i<0)return;
 selected=i;manual=i;until=performance.now()+1550;request();
});
addEventListener("fintech:motion",e=>{
 paused=!!e.detail?.paused;selected=Math.round(progress);manual=selected;request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener("change",e=>{
 if(e.matches){paused=true;selected=Math.round(scrollValue);request();}
});
scrollValue=scrollProgress();selected=Math.round(scrollValue);request();
window.__fintechCinema={
 kind:"native-webgl-fintech",
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return progress},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();