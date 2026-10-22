/* Taamerat360 / Telecom cinematic communications atrium.
 * Fictional public-commercial-communications sculpture, not an operating network.
 * No actual provider, coverage, network availability, speed, activation, billing,
 * subscribers, technical support, telemetry or regulatory claims are represented.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-telecom-hero]");
const stage=document.querySelector("[data-telecom-scene]");
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={night:[.07,.15,.29],blue:[.13,.29,.57],cobalt:[.22,.43,.82],
 ice:[.67,.87,.96],light:[.92,.95,.95],teal:[.20,.61,.59],
 mint:[.55,.85,.76],orange:[.98,.42,.22],gold:[.99,.72,.35],
 stone:[.57,.66,.75],dark:[.12,.29,.36],screen:[.37,.72,.82]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// DISCOVER: a fictional unbranded telecom public-information district,
// not actual network infrastructure or an RF / coverage simulation.
B(0,-.28,0,10.6,.35,7.15,C.night);
B(0,-.08,0,10.38,.055,6.94,C.stone);
B(-2.1,.91,-.97,4.65,1.85,2.70,C.dark);
B(-2.1,1.95,-.97,4.94,.22,2.98,C.light);
B(-2.1,2.13,-.97,5.11,.065,3.17,C.orange);
for(const x of [-3.97,-3.08,-2.19,-1.30,-.41]){
 B(x,1.11,.40,.63,1.07,.065,C.screen);
 B(x,1.12,.45,.045,1.19,.04,C.ice);
}
B(2.6,.86,-.92,2.35,1.75,1.85,C.blue);
B(2.6,1.82,-.92,2.62,.17,2.14,C.light);
B(2.6,1.95,-.92,2.8,.08,2.33,C.gold);
B(2.6,1.02,.08,1.26,.93,.06,C.ice);
B(2.6,1.03,.115,.93,.58,.018,C.cobalt);
// An abstract signal sculpture over a plaza: not a cell tower.
B(3.70,.25,-2.70,.72,.50,.68,C.cobalt);
B(3.70,1.49,-2.70,.19,2.01,.19,C.light);
B(3.70,2.59,-2.70,.51,.17,.47,C.orange);
for(let i=0;i<9;i++)B(-4.2+i*.99,.075,2.65,.46,.045,.18,i%2?C.gold:C.orange);
G.begin(1);
// UNDERSTAND: public plan cards and open, illustrative signal arcs.
// All arcs are decorative lines: no measured range or bandwidth.
for(const [x,y,z,col] of [[-3.74,3.01,.35,C.gold],[-1.45,3.34,-1.50,C.mint],[.85,3.12,.13,C.orange],[3.3,3.36,-.52,C.ice]]){
 B(x,y,z,1.29,.86,.11,C.light);
 B(x-.1,y+.22,z+.067,.85,.073,.022,col);
 B(x,y,z+.067,.89,.05,.025,C.dark);
 B(x-.18,y-.19,z+.067,.55,.05,.025,C.stone);
}
const arc=(cx,cy,cz,r,from,to,color)=>{
 let prev=null;
 for(let k=0;k<=15;k++){
  const theta=from+(to-from)*k/15,pt=[cx+r*Math.cos(theta),cy+r*Math.sin(theta),cz];
  if(prev)L(prev,pt,.052,color);
  prev=pt;
 }
};
// Abstract curved arcs frame information, not signal strength or coverage.
arc(3.70,2.31,-2.70,1.09,.35,Math.PI-.35,C.ice);
arc(3.70,2.31,-2.70,1.65,.42,Math.PI-.42,C.teal);
G.begin(2);
// ENQUIRE: an orange route to a generic, non-sensitive business help desk.
B(2.60,.54,1.48,2.60,.85,1.13,C.blue);
B(2.60,1.02,1.48,2.87,.11,1.36,C.light);
B(2.60,.76,2.07,1.35,.18,.07,C.orange);
B(3.46,2.20,1.45,.97,.72,.10,C.light);
B(3.46,2.36,1.51,.64,.055,.016,C.teal);
B(3.46,2.08,1.51,.55,.045,.016,C.night);
const nodes=[[-4.12,.15,2.05],[-2.45,.15,2.05],[-.58,.16,1.83],[.96,.16,1.83],[2.52,.16,1.66]];
for(let i=0;i<nodes.length-1;i++)L(nodes[i],nodes[i+1],.115,C.orange);
for(const [x,y,z] of [nodes[0],nodes[2],nodes[4]])B(x,y+.09,z,.27,.17,.27,C.gold);
G.begin(3);
// COORDINATE: public marketing-to-operations handover cards,
// without subscriber identities, account numbers or network events.
for(const [x,y,z,accent] of [[-3.67,4.40,-.68,C.teal],[-.37,4.66,-.22,C.orange],[3.10,4.30,-1.11,C.gold]]){
 B(x,y,z,1.21,.78,.12,C.light);
 B(x-.15,y+.16,z+.072,.68,.064,.024,accent);
 B(x,y-.06,z+.072,.86,.052,.02,C.night);
 B(x-.13,y-.22,z+.072,.48,.05,.02,C.stone);
}
L([-3.06,4.39,-.68],[-.98,4.60,-.22],.071,C.orange);
L([.24,4.58,-.22],[2.49,4.27,-1.11],.071,C.gold);
B(-.22,3.48,.83,1.00,.61,.12,C.teal);
B(-.22,3.61,.9,.66,.055,.018,C.light);
B(-.22,3.36,.9,.50,.044,.018,C.light);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
// Both frames must be drawn before replacing the visible SVG. On compact
// screens the chapter canvas begins below the fold and may never be
// scheduled by an on-screen-only draw loop.
if(a)a.draw(3,"hero",0);
if(b)b.draw(0,"chapter",0);
document.body.classList.add("telecom-webgl-ready");
for(const scene of [a,b]){
 if(!scene)continue;
 scene.canvas.addEventListener("webglcontextlost",()=>{
  document.body.classList.remove("telecom-webgl-ready");
 });
}
const chapters=[...document.querySelectorAll(".telecom-cinema-chapter")];
const keys=["discover","understand","enquire","coordinate"];
const badge=document.getElementById("telecom-cinema-progress");
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
addEventListener("telecom:stage",e=>{
 const i=keys.indexOf(e.detail?.key);if(i<0)return;
 selected=i;manual=i;until=performance.now()+1550;request();
});
addEventListener("telecom:motion",e=>{
 paused=!!e.detail?.paused;selected=Math.round(progress);manual=selected;request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener("change",e=>{
 if(e.matches){paused=true;selected=Math.round(scrollValue);request();}
});
scrollValue=scrollProgress();selected=Math.round(scrollValue);request();
window.__telecomCinema={
 kind:"native-webgl-telecom",
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return progress},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();