/* Taamerat360 / Real Estate cinematic 3D.
 * A fictional model of a property neighbourhood and the business touchpoints
 * around discovery, enquiry, viewing and follow-through. Not a live listing.
 */
(()=>{'use strict';
const K=window.TaameratSceneKit;
const hero=document.querySelector('[data-property-hero]');
const stage=document.querySelector('[data-property-scene]');
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={
 stone:[.84,.78,.67],stoneLight:[.97,.89,.73],sand:[.71,.63,.52],
 night:[.15,.30,.37],facade:[.38,.57,.61],glass:[.35,.73,.81],
 bronze:[.98,.70,.42],orange:[.97,.35,.19],jade:[.31,.58,.48],
 leaf:[.40,.65,.47],shadow:[.21,.36,.42],pearl:[.91,.96,.90],
 cobalt:[.28,.43,.62],soft:[.69,.85,.82]
};
const path=(a,b,w,c)=>G.beam(a,b,w,c);
const windowPane=(x,y,z,w,h,c=C.glass)=>G.box(x,y,z,w,h,.055,c);
G.begin(0);
// A calm miniature neighbourhood and an attractive, fictional property exterior.
G.box(0,-.23,0,10.8,.30,7.4,C.shadow);
G.box(0,-.035,0,10.45,.07,7.05,C.stone);
G.box(0,.03,2.42,10.2,.045,1.27,C.sand);
G.box(0,.08,1.98,10.4,.045,.15,C.pearl);
for(let i=0;i<21;i++)G.box(-4.95+i*.49,.115,2.35,.25,.04,.11,i%2?C.orange:C.bronze);
// The central architectural maquette has a ground and two stepped levels.
G.box(-.8,1.13,-.45,4.7,2.16,3.4,C.stoneLight);
G.box(-.8,2.28,-.43,4.90,.16,3.62,C.bronze);
G.box(-1.0,3.34,-.76,3.55,1.99,2.50,C.stone);
G.box(-1.0,4.39,-.76,3.79,.13,2.78,C.pearl);
G.box(-.75,4.55,-.78,3.35,.12,2.39,C.shadow);
// Architectural facade with dimensional columns, vertical glazing, terrace.
for(const x of [-2.83,-1.71,-.62,.48,1.32]){
 G.box(x,1.23,1.31,.12,2.12,.24,C.facade);
}
for(const x of [-2.30,-1.18,-.12,.91])windowPane(x,1.21,1.29,.80,1.70);
for(const x of [-2.23,-1.38,-.52,.34])windowPane(x,3.30,.55,.57,1.58,C.glass);
G.box(-.94,2.53,1.19,4.46,.07,.17,C.pearl);
G.box(.43,2.06,1.32,.85,.84,.12,C.bronze);
G.box(1.20,.74,1.32,.42,1.46,.11,C.night);
// Background neighborhood as context, not available properties.
G.box(-4.02,1.02,-1.95,1.30,1.98,1.24,C.facade);
G.box(-4.02,2.07,-1.95,1.46,.09,1.39,C.pearl);
G.box(3.56,.88,-1.92,1.38,1.75,1.39,C.sand);
G.box(3.56,1.83,-1.92,1.52,.12,1.57,C.stoneLight);
for(const [x,z] of [[-4.12,-1.27],[3.31,-1.19],[3.88,-1.19]])for(const y of [.6,1.30])windowPane(x,y,z,.27,.40,C.glass);
// Low garden edges / landscaping.
for(const x of [-4.5,-3.9,2.7,3.3,3.9,4.5]){
 G.box(x,.25,1.10,.38,.34,.39,C.leaf);
 G.box(x,.48,1.10,.18,.23,.21,C.jade);
}
G.begin(1);
// Enquiry and qualification shown as abstract communication layers. No real UI.
for(const [x,y,z,col] of [[-3.8,3.95,.0,C.orange],[2.0,3.8,-.10,C.bronze],[3.25,2.70,.72,C.glass]]){
 G.box(x,y,z,.87,.55,.09,C.pearl);
 G.box(x-.12,y+.11,z+.056,.42,.065,.024,col);
 G.box(x-.06,y-.07,z+.056,.58,.050,.024,C.facade);
 G.box(x-.18,y-.20,z+.056,.30,.035,.024,C.sand);
}
path([-3.7,3.30,.16],[-2.72,2.70,1.26],.055,C.orange);
path([2.0,3.28,-.10],[1.2,2.31,1.35],.052,C.bronze);
// A warm welcome marker and pathway from enquiry to the building.
G.box(-.55,.075,3.0,1.8,.045,.48,C.orange);
G.box(.72,.15,3.12,.46,.17,.47,C.bronze);
G.begin(2);
// Guided viewing: spatial route, front porch, glass pavilion and direction markers.
G.box(2.1,.16,.62,2.55,.24,1.55,C.shadow);
G.box(2.18,.30,.61,2.30,.10,1.38,C.stoneLight);
for(const x of [1.13,3.20]){
 G.box(x,1.45,1.11,.075,2.12,.09,C.facade);
}
G.box(2.18,2.56,1.10,2.33,.14,1.45,C.pearl);
G.box(2.18,1.45,1.16,2.20,1.97,.07,C.glass);
G.box(2.16,1.45,1.22,.10,1.96,.08,C.facade);
for(let i=0;i<6;i++){
 const t=i/5,x=3.8+1.0*t,z=2.18-1.72*t;
 G.box(x,.155,z,.32,.07,.30,i%2?C.orange:C.stoneLight);
}
G.box(4.15,.72,.62,.17,1.39,.18,C.jade);
G.box(4.15,1.49,.62,.50,.12,.25,C.bronze);
// Small architectural scale trees.
for(const [x,z] of [[-4.65,0.85],[-3.60,.93],[4.57,-.68]]){
 G.box(x,.58,z,.12,1.10,.10,C.shadow);
 G.box(x,1.18,z,.70,.60,.65,C.leaf);
 G.box(x,1.62,z,.44,.30,.42,C.jade);
}
G.begin(3);
// Visible decision/follow-up touchpoints; a continuous spatial orange route
// reaches a final clear next action, without implying any real transaction.
for(let i=0;i<9;i++){
 const t=i/8,px=-4.75+t*9.2,pz=2.93-.36*Math.sin(t*3.14159);
 G.box(px,.13,pz,.37,.07,.19,i%2?C.orange:C.bronze);
}
G.box(3.38,3.42,.06,.90,.85,.13,C.jade);
G.box(3.38,3.42,.14,.66,.62,.05,C.pearl);
path([3.12,3.42,.18],[3.31,3.23,.18],.068,C.orange);
path([3.31,3.23,.18],[3.67,3.65,.18],.068,C.orange);
G.box(2.35,3.76,-.95,1.12,.14,.86,C.bronze);
G.box(2.35,3.88,-.95,.58,.085,.32,C.pearl);
const mesh=G.finish();
const a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
document.body.classList.add('property-webgl-ready');
const chapters=[...document.querySelectorAll('.property-cinema-chapter')];
const keys=['discover','qualify','viewing','followup'];
const badge=document.getElementById('property-cinema-progress');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches||document.body.classList.contains('motion-off'),current=0,scrollValue=0,display=0,manualStage=null,lockUntil=0;
let active=!document.hidden,pending=false,timer=null;
const visible=el=>{const r=el.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;};
function atScroll(){
 if(!chapters.length)return 0;const middle=innerHeight*.52;
 const center=chapters.map(el=>{const r=el.getBoundingClientRect();return r.top+r.height*.5;});
 if(middle<=center[0])return 0;if(middle>=center[3])return 3;
 for(let i=0;i<3;i++)if(middle>=center[i]&&middle<=center[i+1])return i+(middle-center[i])/(center[i+1]-center[i]);
 return 0;
}
function request(){if(!pending&&active){pending=true;requestAnimationFrame(frame);}}
function frame(ms){
 pending=false;if(!active)return;
 const goal=paused?current:manualStage!==null&&performance.now()<lockUntil?manualStage:scrollValue;
 display=paused?goal:K.mix(display,goal,.15);
 if(a&&visible(hero))a.draw(3,'hero',ms*.001);
 if(b&&visible(stage))b.draw(display,'chapter',ms*.001);
 if(badge)badge.textContent=String(Math.min(4,Math.floor(display+.34)+1)).padStart(2,'0')+' / 04';
 for(let i=0;i<chapters.length;i++)chapters[i].classList.toggle('is-current',Math.round(display)===i);
 if(!paused&&(visible(hero)||visible(stage))&&timer===null)timer=setTimeout(()=>{timer=null;request();},95);
 else if(Math.abs(goal-display)>.006)request();
}
function onScroll(){scrollValue=atScroll();if(performance.now()>lockUntil)manualStage=null;request();}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});
addEventListener('property:stage',event=>{
 const i=keys.indexOf(event.detail?.key);if(i<0)return;
 current=i;manualStage=i;lockUntil=performance.now()+1550;request();
});
addEventListener('property:motion',event=>{paused=!!event.detail?.paused;current=Math.round(display);manualStage=current;request();});
document.addEventListener('visibilitychange',()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener('change',event=>{if(event.matches){paused=true;current=Math.round(scrollValue);request();}});
scrollValue=atScroll();current=Math.round(scrollValue);request();
window.__propertyCinema={
 kind:'native-webgl-real-estate',
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return display},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();