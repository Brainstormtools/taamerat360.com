/* Architecture / cinematic studio maquette.
 * Fictitious design-study illustration of enquiry, briefing, proposal and
 * coordination. Not project deliverables, architectural services or proof.
 */
(()=>{'use strict';
const K=window.TaameratSceneKit,hero=document.querySelector('[data-architecture-hero]'),panel=document.querySelector('[data-architecture-scene]');
if(!K||!hero||!panel)return;
const G=new K.Geometry();
const C={
 ink:[.14,.30,.38],blueprint:[.36,.67,.78],fine:[.58,.83,.84],
 cream:[.91,.85,.71],concrete:[.72,.71,.65],orange:[.99,.39,.22],
 ochre:[.96,.69,.39],jade:[.27,.53,.48],glass:[.45,.75,.79],
 deep:[.13,.23,.29],pale:[.95,.94,.84],cobalt:[.24,.45,.60]
};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// Flat blueprint grid, surrounding technical construction guides and a
// raised site plinth — concept drawing, not measurable architectural output.
B(0,-.30,0,9.9,.32,7.1,C.deep);
B(0,-.11,0,9.64,.09,6.82,C.ink);
for(let i=-4;i<=4;i++)L([i*.99,-.048,-3.25],[i*.99,-.048,3.25],.018,i===0?C.ochre:C.blueprint);
for(let i=-3;i<=3;i++)L([-4.65,-.043,i*.91],[4.65,-.043,i*.91],.018,i===0?C.ochre:C.blueprint);
for(const x of [-2.45,0,2.45]){
 for(const z of [-1.55,.92]){
  B(x,.012,z,.38,.095,.38,C.ochre);
  L([x-.30,.081,z-.29],[x+.30,.081,z-.29],.032,C.pale);
 }
}
for(const [x,z] of [[-3.9,-2.6],[-3.9,2.6],[3.9,-2.6],[3.9,2.6]]){
 B(x,.11,z,.26,.26,.26,C.cream);
 B(x,.28,z,.14,.12,.14,C.orange);
}
// Delineate a courtyard and first-level plan with physical thin edge beams.
for(const z of [-1.55,.92])L([-2.45,.16,z],[2.45,.16,z],.055,C.fine);
for(const x of [-2.45,2.45])L([x,.16,-1.55],[x,.16,.92],.055,C.fine);
for(const x of [-1.2,1.2])L([x,.16,-1.55],[x,.16,.92],.027,C.blueprint);
G.begin(1);
// From drawing to scale model: assemble a pavilion's true 3D load-bearing
// sculptural frame, plates and ground-floor datum.
for(const x of [-2.45,0,2.45])for(const z of [-1.55,.92]){
 B(x,1.56,z,.13,3.05,.14,C.cream);
 B(x,3.10,z,.25,.13,.26,C.ochre);
}
for(const y of [1.55,3.10]){
 for(const z of [-1.55,.92])L([-2.45,y,z],[2.45,y,z],.095,C.fine);
 for(const x of [-2.45,0,2.45])L([x,y,-1.55],[x,y,.92],.095,C.fine);
}
B(0,1.51,-.29,5.10,.115,3.40,C.concrete);
B(0,3.10,-.29,5.28,.16,3.51,C.cream);
B(-2.25,.75,.99,.24,1.34,.22,C.ochre);
B(2.25,.75,.99,.24,1.34,.22,C.ochre);
for(let step=0;step<5;step++){
 const t=step/4;
 B(2.02+t*.85,.10+step*.19,1.75+step*.05,.65,.09,.48,C.concrete);
}
G.begin(2);
// Proposal is represented by enclosure, daylight glazing, floating roof
// and materials — not a promised architectural concept delivered to clients.
for(const x of [-1.83,-.73,.40,1.55]){
 B(x,.82,.98,.94,1.27,.055,C.glass);
 B(x,2.36,.98,.96,1.26,.06,C.glass);
}
for(const z of [-1.16,-.27,.62]){
 B(2.49,2.36,z,.065,1.23,.70,C.glass);
 B(-2.49,.82,z,.065,1.21,.72,C.glass);
}
B(0,3.36,-.26,5.67,.19,3.95,C.pale);
B(0,3.55,-.26,5.42,.09,3.71,C.ochre);
B(-.85,4.04,-.54,2.28,.88,1.65,C.ink);
B(-.85,4.52,-.54,2.51,.14,1.86,C.cream);
for(const x of [-1.56,-.87,-.18])B(x,4.04,.32,.52,.66,.06,C.glass);
B(1.88,3.75,-1.32,.23,.57,.21,C.orange);
B(2.44,3.73,-1.32,.22,.61,.23,C.orange);
// Roof garden and patio volumes enhance depth and spatial readability.
for(const x of [1.17,1.64,2.12]){
 B(x,3.70,.65,.40,.22,.42,C.jade);
 B(x,3.93,.65,.20,.19,.19,C.fine);
}
B(0,.09,2.04,5.23,.13,1.20,C.concrete);
for(const x of [-2.22,2.20])B(x,.24,2.33,.46,.36,.42,C.cream);
G.begin(3);
// Business coordination layer: floating conversation cards linked by
// an orange physical route, not a live client portal or CRM.
for(const [x,y,z,w,col] of [
 [-3.40,3.35,-.50,1.18,C.orange],
 [3.15,3.95,-.74,1.40,C.ochre],
 [-.72,5.25,-.84,1.48,C.jade],
 [2.52,5.05,.67,1.22,C.blueprint]
]){
 B(x,y,z,w,.73,.12,C.pale);
 B(x-w*.26,y+.18,z+.071,w*.37,.09,.024,col);
 B(x,y-.03,z+.071,w*.70,.054,.022,C.ink);
 B(x-w*.17,y-.20,z+.071,w*.45,.045,.022,C.concrete);
}
L([-3.15,2.83,-.48],[-2.38,2.50,1.0],.052,C.orange);
L([3.05,3.40,-.55],[2.42,3.17,.65],.052,C.ochre);
L([-.65,4.76,-.83],[-.47,4.48,.36],.056,C.orange);
for(let i=0;i<11;i++){
 const t=i/10,x=-3.72+7.25*t,z=2.75-.48*Math.sin(t*Math.PI);
 B(x,.05,z,.31,.055,.16,i%2?C.orange:C.ochre);
}
const mesh=G.finish();
const a=K.create(hero,mesh),b=K.create(panel,mesh);
if(!a&&!b)return;
document.body.classList.add('architecture-webgl-ready');
const chapters=Array.from(document.querySelectorAll('.architecture-cinema-chapter'));
const names=['inquiry','brief','proposal','coordinate'];
const count=document.getElementById('architecture-cinema-progress');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches||document.body.classList.contains('motion-off');
let selected=0,scrollValue=0,display=0,manual=null,manualLockUntil=0,visible=!document.hidden,pending=false,timer=null;
const onScreen=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function position(){
 if(!chapters.length)return 0;
 const midpoint=innerHeight*.52,centers=chapters.map(ch=>{const r=ch.getBoundingClientRect();return r.top+r.height*.5;});
 if(midpoint<=centers[0])return 0;if(midpoint>=centers[3])return 3;
 for(let i=0;i<3;i++)if(midpoint>=centers[i]&&midpoint<=centers[i+1])return i+(midpoint-centers[i])/(centers[i+1]-centers[i]);
 return 0;
}
function request(){if(!pending&&visible){pending=true;requestAnimationFrame(frame);}}
function frame(ms){
 pending=false;if(!visible)return;
 const dest=paused?selected:manual!==null&&performance.now()<manualLockUntil?manual:scrollValue;
 display=paused?dest:K.mix(display,dest,.16);
 if(a&&onScreen(hero))a.draw(3,'hero',ms*.001);
 if(b&&onScreen(panel))b.draw(display,'chapter',ms*.001);
 if(count)count.textContent=String(Math.min(4,Math.floor(display+.34)+1)).padStart(2,'0')+' / 04';
 chapters.forEach((ch,i)=>ch.classList.toggle('is-current',Math.round(display)===i));
 if(!paused&&(onScreen(hero)||onScreen(panel))&&timer===null)timer=setTimeout(()=>{timer=null;request();},95);
 else if(Math.abs(dest-display)>.006)request();
}
function scroll(){scrollValue=position();if(performance.now()>=manualLockUntil)manual=null;request();}
addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});
addEventListener('architecture:stage',e=>{
 const index=names.indexOf(e.detail?.key);if(index<0)return;
 selected=index;manual=index;manualLockUntil=performance.now()+1550;request();
});
addEventListener('architecture:motion',e=>{paused=!!e.detail?.paused;selected=Math.round(display);manual=selected;request();});
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)request();});
if(reduced.addEventListener)reduced.addEventListener('change',e=>{if(e.matches){paused=true;selected=Math.round(scrollValue);request();}});
scrollValue=position();selected=Math.round(scrollValue);request();
window.__architectureCinema={
 kind:'native-webgl-architecture',
 get available(){return!!(a?.available||b?.available)},
 get mounts(){return Number(!!a)+Number(!!b)},
 get progress(){return display},
 get paused(){return paused},
 get meshVertices(){return mesh.vertices.length/9}
};
})();