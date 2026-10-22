/* Taamerat360 / Insurance cinematic communications atrium.
 * Fictional public-information and non-claims communications sculpture only.
 * No real insurer, policyholder information, underwriting, coverage, claims,
 * records, regulatory accreditation or licensed services are represented.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-insurance-hero]");
const stage=document.querySelector("[data-insurance-scene]");
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={forest:[.10,.29,.29],pine:[.17,.43,.40],slate:[.25,.48,.51],chalk:[.94,.94,.84],mist:[.74,.86,.83],glass:[.53,.78,.72],copper:[.98,.42,.28],brass:[.92,.69,.39],sand:[.73,.70,.57],deep:[.09,.22,.29],paper:[.98,.96,.87],teal:[.35,.65,.60]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// DISCOVER: imaginary business-communications atrium. The open architectural
// arch suggests clarity and access, not an insurer or coverage guarantee.
B(0,-.30,0,10.6,.36,7.3,C.deep);
B(0,-.08,0,10.38,.09,7.08,C.sand);
B(-1.3,.73,-1.13,6.65,1.43,3.24,C.forest);
B(-1.3,1.58,-1.13,6.98,.20,3.53,C.chalk);
for(const x of [-3.90,-2.94,-1.98,-1.02,-.06,.90])B(x,.88,.55,.66,.91,.08,C.glass);
for(const x of [-3.49,-2.53,-1.57,-.61,.35])B(x,.90,.61,.055,.99,.075,C.chalk);
const arch=[];
for(let i=0;i<=10;i++){const theta=Math.PI-i*Math.PI/10;arch.push([2.62+1.38*Math.cos(theta),2.16+1.52*Math.sin(theta),-.75]);}
for(let i=0;i<10;i++)L(arch[i],arch[i+1],.20,C.brass);
B(1.24,1.13,-.75,.25,2.28,.28,C.brass);
B(4.0,1.13,-.75,.25,2.28,.28,C.brass);
B(2.62,.18,-.75,2.35,.32,1.85,C.pine);
B(2.62,.39,-.75,2.58,.09,2.07,C.paper);
for(const [x,z] of [[-4.30,1.9],[-3.50,2.7],[3.95,2.35],[-4.2,-2.6]])B(x,.33,z,.28,.51,.27,C.teal);
for(let i=0;i<9;i++)B(-3.9+i*.88,.03,2.65,.44,.04,.17,i%2?C.brass:C.copper);
G.begin(1);
// UNDERSTAND: text-free approved-information sheets and disclosure layers.
for(const [x,y,z,accent] of [[-3.75,2.57,.22,C.copper],[-1.92,2.80,-1.22,C.brass],[.06,2.65,.12,C.teal],[3.65,3.24,-1.5,C.copper]]){
 B(x,y,z,1.27,.90,.11,C.paper);
 B(x-.10,y+.23,z+.066,.80,.065,.025,accent);
 B(x,y+.03,z+.066,.92,.055,.022,C.forest);
 B(x-.14,y-.17,z+.066,.63,.05,.022,C.sand);
}
for(let i=0;i<4;i++){
 B(-3.28+i*.22,2.15,-2.10-i*.08,.84,1.03,.09,i%2?C.mist:C.chalk);
 B(-3.36+i*.22,2.37,-2.038-i*.08,.47,.07,.022,C.pine);
}
for(let i=0;i<3;i++)B(1.45+i*.40,.91,1.13,.28,.52,.13,[C.teal,C.copper,C.brass][i]);
G.begin(2);
// ENQUIRE: non-sensitive general communications path and help point.
B(2.63,.69,1.36,2.55,.92,1.35,C.pine);
B(2.63,1.20,1.36,2.8,.15,1.55,C.paper);
B(2.65,.91,2.08,1.28,.18,.08,C.copper);
B(3.5,2.12,1.4,.92,.73,.10,C.paper);
B(3.5,2.27,1.46,.61,.055,.019,C.brass);
B(3.5,2.02,1.46,.50,.047,.019,C.forest);
const route=[[-3.9,.12,2.19],[-2.70,.13,2.19],[-1.35,.14,1.80],[.10,.14,1.80],[1.55,.14,1.48],[2.57,.14,1.48]];
for(let i=0;i<route.length-1;i++)L(route[i],route[i+1],.10,C.copper);
for(const [x,y,z] of [route[0],route[2],route[4],route[5]])B(x,y+.08,z,.21,.18,.21,C.chalk);
G.begin(3);
// COORDINATE: general administrative handover cards (no claims data).
for(const [x,y,z,accent] of [[-3.57,4.21,-.88,C.brass],[-.45,4.42,-.35,C.copper],[3.23,4.18,-1.38,C.teal]]){
 B(x,y,z,1.18,.77,.12,C.paper);
 B(x-.12,y+.17,z+.070,.64,.065,.022,accent);
 B(x,y-.05,z+.070,.81,.053,.022,C.forest);
 B(x-.16,y-.24,z+.070,.50,.045,.022,C.sand);
}
L([-2.98,4.20,-.88],[-1.04,4.39,-.35],.065,C.copper);
L([.15,4.39,-.35],[2.64,4.18,-1.38],.065,C.brass);
B(-.17,3.28,.86,.93,.62,.13,C.teal);
B(-.17,3.45,.937,.64,.05,.02,C.paper);
B(-.17,3.23,.937,.46,.05,.02,C.paper);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
// Both frames must be drawn before replacing the visible SVG. On compact
// screens the chapter canvas begins below the fold and may never be
// scheduled by an on-screen-only draw loop.
if(a)a.draw(3,"hero",0);
if(b)b.draw(0,"chapter",0);
document.body.classList.add("insurance-webgl-ready");
for(const scene of [a,b]){
 if(!scene)continue;
 scene.canvas.addEventListener("webglcontextlost",()=>{
  document.body.classList.remove("insurance-webgl-ready");
 });
}
const chapters=[...document.querySelectorAll(".insurance-cinema-chapter")];
const keys=["discover","understand","enquire","coordinate"];
const badge=document.getElementById("insurance-cinema-progress");
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
addEventListener("insurance:stage",e=>{
 const i=keys.indexOf(e.detail?.key);if(i<0)return;
 selected=i;manual=i;until=performance.now()+1550;request();
});
addEventListener("insurance:motion",e=>{
 paused=!!e.detail?.paused;selected=Math.round(progress);manual=selected;request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener("change",e=>{
 if(e.matches){paused=true;selected=Math.round(scrollValue);request();}
});
scrollValue=scrollProgress();selected=Math.round(scrollValue);request();
window.__insuranceCinema={
 kind:"native-webgl-insurance",
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return progress},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();