/* Taamerat360 / Travel & Tourism cinematic destination-discovery pavilion.
 * Illustrative travel-business storytelling, not a real destination, journey or booking engine.
 * No live reservations, availability, pricing, tickets, visas, traveller records,
 * verified destinations, transport, guarantees or guest services are represented.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-travel-tourism-hero]");
const stage=document.querySelector("[data-travel-tourism-scene]");
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={
 sea:[.09,.40,.43],lagoon:[.23,.60,.60],mint:[.54,.79,.69],
 ocean:[.08,.25,.35],terrace:[.85,.80,.65],sand:[.93,.82,.59],
 cream:[.99,.94,.80],coral:[.97,.41,.29],sun:[.99,.69,.33],
 shade:[.28,.50,.47],paper:[.99,.96,.89],stone:[.63,.71,.65]
};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// DISCOVER: an imagined coastal discovery pavilion and its abstract
// landscape. This is not a real destination, itinerary or tour operator.
B(0,-.30,0,10.55,.38,7.2,C.ocean);
B(0,-.07,0,10.25,.08,6.9,C.sand);
B(-2.05,.75,-1.05,4.65,1.48,2.7,C.shade);
B(-2.05,1.56,-1.05,4.98,.19,3.03,C.cream);
B(-2.05,1.73,-1.05,5.06,.075,3.09,C.coral);
for(const x of [-3.85,-2.99,-2.13,-1.27,-.41])B(x,.93,.36,.63,.91,.065,C.mint);
for(const x of [-3.43,-2.57,-1.71,-.85])B(x,.95,.415,.052,.96,.05,C.cream);
// Scenic abstract gateway, not a verified landmark.
B(2.40,.92,-1.24,.34,1.87,.39,C.cream);
B(4.04,.92,-1.24,.34,1.87,.39,C.cream);
B(3.22,1.94,-1.24,2.0,.25,.42,C.cream);
B(3.22,2.12,-1.24,1.84,.075,.43,C.sun);
B(3.22,.11,-1.24,2.20,.26,1.32,C.lagoon);
B(3.22,.28,-1.24,2.13,.09,1.24,C.paper);
// Geometric sea / path bands; nothing represents geolocation.
for(let i=0;i<8;i++)B(-3.95+i*1.1,.045,2.46,.57,.04,.19,i%2?C.coral:C.sun);
G.begin(1);
// EXPLORE: three layered illustrated experience cards, explicitly
// illustrative rather than an availability or package search.
for(const [x,y,z,accent] of [[-3.63,3.04,.17,C.coral],[-1.35,3.23,-1.39,C.sun],[1.06,3.04,.21,C.lagoon],[3.42,3.24,-.45,C.coral]]){
 B(x,y,z,1.22,.90,.12,C.paper);
 B(x,y+.15,z+.071,.95,.30,.024,accent);
 B(x-.12,y-.18,z+.071,.68,.065,.024,C.shade);
 B(x+.12,y-.30,z+.071,.46,.05,.024,C.stone);
}
for(let i=0;i<5;i++){
 B(-3.60+i*.27,2.16,-2.18-i*.09,.88,.76,.09,i%2?C.sand:C.mint);
 B(-3.70+i*.27,2.28,-2.12-i*.09,.42,.055,.025,C.ocean);
}
G.begin(2);
// ENQUIRE: abstract orange wayfinding line and an information counter,
// not a real booking or check-in point.
B(2.58,.57,1.44,2.48,.91,1.23,C.sea);
B(2.58,1.07,1.44,2.70,.14,1.43,C.paper);
B(2.58,.82,2.11,1.18,.16,.06,C.coral);
B(3.48,2.16,1.39,1.00,.69,.10,C.paper);
B(3.48,2.34,1.449,.62,.06,.022,C.sun);
B(3.48,2.06,1.449,.51,.045,.022,C.ocean);
const stops=[[-4.0,.14,2.05],[-2.5,.14,2.15],[-.99,.14,1.79],[.80,.14,1.88],[2.52,.14,1.64]];
for(let i=0;i<stops.length-1;i++)L(stops[i],stops[i+1],.112,C.coral);
for(const [x,y,z] of [stops[0],stops[2],stops[4]])B(x,y+.07,z,.26,.16,.26,C.sun);
G.begin(3);
// COORDINATE: generic cards for marketing, guest relations, and
// partners, without any passenger records or travel-document details.
for(const [x,y,z,accent] of [[-3.59,4.24,-.88,C.sun],[-.28,4.48,-.24,C.coral],[3.24,4.32,-1.15,C.lagoon]]){
 B(x,y,z,1.19,.82,.12,C.paper);
 B(x-.13,y+.19,z+.071,.63,.065,.024,accent);
 B(x,y-.04,z+.071,.82,.05,.02,C.ocean);
 B(x-.14,y-.23,z+.071,.48,.05,.02,C.stone);
}
L([-2.98,4.23,-.88],[-.87,4.47,-.24],.066,C.coral);
L([.32,4.46,-.24],[2.64,4.31,-1.15],.066,C.sun);
// An abstract suitcase shape represents planning, not a booking.
B(-.05,3.42,.78,.94,.58,.21,C.sea);
B(-.05,3.75,.79,.36,.10,.21,C.sun);
B(-.05,3.43,.91,.57,.055,.023,C.paper);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
// Both frames must be drawn before replacing the visible SVG. On compact
// screens the chapter canvas begins below the fold and may never be
// scheduled by an on-screen-only draw loop.
if(a)a.draw(3,"hero",0);
if(b)b.draw(0,"chapter",0);
document.body.classList.add("travel-tourism-webgl-ready");
for(const scene of [a,b]){
 if(!scene)continue;
 scene.canvas.addEventListener("webglcontextlost",()=>{
  document.body.classList.remove("travel-tourism-webgl-ready");
 });
}
const chapters=[...document.querySelectorAll(".travel-tourism-cinema-chapter")];
const keys=["discover","understand","enquire","coordinate"];
const badge=document.getElementById("travel-tourism-cinema-progress");
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
addEventListener("travel-tourism:stage",e=>{
 const i=keys.indexOf(e.detail?.key);if(i<0)return;
 selected=i;manual=i;until=performance.now()+1550;request();
});
addEventListener("travel-tourism:motion",e=>{
 paused=!!e.detail?.paused;selected=Math.round(progress);manual=selected;request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener("change",e=>{
 if(e.matches){paused=true;selected=Math.round(scrollValue);request();}
});
scrollValue=scrollProgress();selected=Math.round(scrollValue);request();
window.__travelTourismCinema={
 kind:"native-webgl-travel-tourism",
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return progress},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();