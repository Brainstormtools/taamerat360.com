/* Taamerat360 / Ride Hailing cinematic public mobility information district.
 * Illustrative public business communications, not a ride-hailing service, live map or transport platform.
 * No rides, fares, dispatch, GPS tracking, ride matching, passengers, drivers,
 * actual routes, safety ratings, operational data or payments are represented.
 */
(()=>{"use strict";
const K=window.TaameratSceneKit;
const hero=document.querySelector("[data-ride-hailing-hero]");
const stage=document.querySelector("[data-ride-hailing-scene]");
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={
 asphalt:[.08,.17,.23],ink:[.12,.22,.29],blue:[.17,.39,.64],
 cobalt:[.28,.50,.75],sky:[.66,.81,.88],chalk:[.94,.94,.87],
 fog:[.64,.73,.73],mint:[.41,.72,.60],pine:[.14,.37,.34],
 orange:[.99,.39,.20],amber:[.99,.72,.31],paper:[.99,.97,.91],
 bronze:[.73,.52,.36],glass:[.54,.75,.83]
};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// DISCOVER / city public service information, fictional and not a ride map.
B(0,-.32,0,10.7,.40,7.34,C.asphalt);
B(0,-.08,0,10.5,.09,7.12,C.fog);
B(0,-.021,1.12,10.5,.016,2.23,C.ink);
for(let i=0;i<8;i++)B(-4.54+i*1.24,.004,1.12,.65,.025,.08,C.amber);
B(-3.45,.93,-1.45,2.19,1.87,2.50,C.blue);
B(-3.45,1.97,-1.45,2.38,.21,2.71,C.chalk);
B(-.92,1.24,-1.50,2.12,2.49,2.33,C.pine);
B(-.92,2.56,-1.50,2.29,.24,2.52,C.sky);
B(1.51,.82,-1.52,2.05,1.64,2.38,C.blue);
B(1.51,1.74,-1.52,2.26,.20,2.61,C.chalk);
for(const [cx,cy,cz,cols] of [
 [-3.45,.98,-.15,3],[-.92,1.29,-.31,3],[1.51,.91,-.25,3]
]){
 for(let i=0;i<cols;i++)B(cx-.69+i*.68,cy,cz,.47,.69,.06,i%2?C.glass:C.sky);
}
B(3.57,.45,-1.27,1.37,.91,1.19,C.pine);
B(3.57,1.0,-1.27,1.53,.15,1.33,C.chalk);
B(3.57,1.10,-1.27,1.41,.05,1.27,C.orange);
// Fictional geometric mobility display; it represents no trip request.
B(3.57,.62,-.63,.85,.58,.055,C.sky);
B(3.57,.60,-.591,.53,.09,.021,C.blue);
G.begin(1);
// UNDERSTAND / abstract public explanatory cards and wayfinding motifs.
for(const [x,y,z,accent] of [
 [-3.61,3.14,.05,C.orange],[-1.32,3.56,-1.25,C.amber],
 [1.06,3.14,.14,C.mint],[3.45,3.18,-1.02,C.orange]
]){
 B(x,y,z,1.12,.87,.12,C.paper);
 B(x-.11,y+.21,z+.071,.64,.08,.024,accent);
 B(x,y-.03,z+.071,.76,.055,.02,C.ink);
 B(x-.13,y-.20,z+.071,.50,.045,.02,C.fog);
}
// Stylized service symbol rather than live pick-up or driver location.
B(2.23,2.51,.23,.26,.42,.19,C.orange);
B(2.23,2.80,.23,.37,.20,.19,C.amber);
G.begin(2);
// ENQUIRE / public-business meeting desk and non-transactional route.
B(-2.06,.36,1.54,1.89,.37,1.14,C.blue);
B(-2.06,.61,1.54,2.05,.12,1.27,C.paper);
B(-2.06,.41,2.22,1.22,.16,.07,C.orange);
// Abstract vehicle sculpture, not an operable car, route or dispatched ride.
B(1.38,.39,1.18,1.85,.46,.88,C.orange);
B(1.15,.69,1.15,1.05,.30,.65,C.chalk);
for(const x of [.69,2.08]){
 B(x,.15,.59,.40,.31,.24,C.asphalt);
 B(x,.15,1.80,.40,.31,.24,C.asphalt);
}
const nodes=[[-4.52,.05,2.52],[-2.76,.05,2.52],[-.91,.05,2.36],[.38,.05,2.36],[2.11,.05,2.50],[3.99,.05,2.50]];
for(let i=0;i<nodes.length-1;i++)L(nodes[i],nodes[i+1],.10,C.orange);
for(const [x,y,z] of [nodes[0],nodes[2],nodes[4],nodes[5]])B(x,y+.09,z,.23,.16,.23,C.amber);
G.begin(3);
// COORDINATE / abstract fleet marketing and partnership handover notes.
// No driver identity, rider location or transportation record is shown.
for(const [x,y,z,accent] of [
 [-3.50,4.42,-.82,C.amber],[-.45,4.63,-.22,C.orange],
 [3.19,4.28,-1.12,C.mint]
]){
 B(x,y,z,1.20,.79,.12,C.paper);
 B(x-.13,y+.17,z+.07,.63,.065,.022,accent);
 B(x,y-.05,z+.07,.81,.055,.02,C.blue);
 B(x-.12,y-.23,z+.07,.53,.046,.02,C.fog);
}
L([-2.90,4.40,-.82],[-1.05,4.60,-.22],.07,C.orange);
L([.15,4.60,-.22],[2.59,4.28,-1.12],.07,C.amber);
B(-.11,3.51,.80,.96,.65,.13,C.pine);
B(-.11,3.66,.878,.65,.055,.022,C.paper);
B(-.11,3.43,.878,.45,.048,.022,C.paper);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
// Both frames must be drawn before replacing the visible SVG. On compact
// screens the chapter canvas begins below the fold and may never be
// scheduled by an on-screen-only draw loop.
if(a)a.draw(3,"hero",0);
if(b)b.draw(0,"chapter",0);
document.body.classList.add("ride-hailing-webgl-ready");
for(const scene of [a,b]){
 if(!scene)continue;
 scene.canvas.addEventListener("webglcontextlost",()=>{
  document.body.classList.remove("ride-hailing-webgl-ready");
 });
}
const chapters=[...document.querySelectorAll(".ride-hailing-cinema-chapter")];
const keys=["discover","understand","enquire","coordinate"];
const badge=document.getElementById("ride-hailing-cinema-progress");
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
addEventListener("ride-hailing:stage",e=>{
 const i=keys.indexOf(e.detail?.key);if(i<0)return;
 selected=i;manual=i;until=performance.now()+1550;request();
});
addEventListener("ride-hailing:motion",e=>{
 paused=!!e.detail?.paused;selected=Math.round(progress);manual=selected;request();
});
document.addEventListener("visibilitychange",()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener("change",e=>{
 if(e.matches){paused=true;selected=Math.round(scrollValue);request();}
});
scrollValue=scrollProgress();selected=Math.round(scrollValue);request();
window.__rideHailingCinema={
 kind:"native-webgl-ride-hailing",
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return progress},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();