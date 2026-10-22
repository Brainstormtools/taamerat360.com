/* Construction / cinematic industry scene.
 * Purpose: visualize four *business* handover moments with a stylized building
 * maquette. This does not imply architectural design, engineering or site work.
 */
(()=>{'use strict';
const Kit=window.TaameratSceneKit,hero=document.querySelector('[data-construction-hero]'),panel=document.querySelector('[data-construction-scene]');
if(!Kit||!hero||!panel)return;
const G=new Kit.Geometry();
const C={slate:[.19,.34,.40],steel:[.43,.66,.68],frame:[.88,.77,.53],orange:[.98,.32,.15],cream:[.98,.91,.72],blue:[.25,.47,.68],glass:[.47,.76,.82],green:[.28,.57,.43],dark:[.16,.28,.33],concrete:[.68,.70,.65],roof:[.30,.46,.49]};
const levels=[.25,1.53,2.81,4.09,5.37],xs=[-2.30,0,2.30],zs=[-1.2,1.2];
G.begin(0);
// A baseplate, plotted foundations and orange spatial connection.
G.box(0,-.23,0,7.7,.28,5.5,C.dark);
G.box(0,-.065,0,7.48,.055,5.28,C.concrete);
for(const x of xs)for(const z of zs)G.box(x,.075,z,.57,.22,.57,C.frame);
for(let i=0;i<13;i++){const t=i/12;G.box(-3.5+7*t,.025,2.30,.36,.035,.18,i%2?C.cream:C.orange);}
for(const z of zs)G.beam([-3.13,.045,z],[3.13,.045,z],.07,C.blue);
G.box(-3.40,.03,0,.19,.16,3.75,C.orange);
G.begin(1);
// 3D structural floor grid: columns + beams and cross braces.
for(const x of xs)for(const z of zs){G.box(x,2.65,z,.14,5.2,.15,C.steel);for(const y of levels)G.box(x,y,z,.42,.08,.46,C.frame);}
for(const y of levels.slice(1)){for(const z of zs)G.beam([-2.3,y,z],[2.3,y,z],.095,C.steel);for(const x of xs)G.beam([x,y,-1.2],[x,y,1.2],.095,C.steel);}
for(let y=0;y<4;y+=2){G.beam([-2.3,.24+y,-1.21],[0,2.78+y,-1.21],.045,C.orange);G.beam([0,.24+y,1.21],[2.3,2.78+y,1.21],.045,C.orange);}
G.begin(2);
// Glazing and side envelope with a distinct orange crane and suspension cable.
for(let floor=0;floor<3;floor++){
 const y=.90+floor*1.28;
 for(const x of [-1.58,-.81,.79,1.56])G.box(x,y,1.26,.65,.87,.055,C.glass);
 for(const x of [-1.58,-.81,.79,1.56])G.box(x,y,-1.26,.65,.87,.055,C.blue);
 G.box(2.34,y,0,.065,.89,1.8,C.glass);
}
G.beam([3.10,.05,-2.0],[3.10,7.2,-2.0],.14,C.orange);
G.beam([1.15,6.85,-2.0],[5.35,6.85,-2.0],.14,C.orange);
for(const dx of [2.2,3.1,4.1,5.0])G.beam([dx,6.55,-2.0],[dx+.12,7.12,-2.0],.035,C.cream);
G.beam([1.30,6.82,-2.0],[3.10,7.19,-2.0],.05,C.orange);
G.beam([4.80,6.85,-2.0],[4.80,4.5,-2.0],.022,C.cream);
G.box(4.80,4.44,-2.0,.35,.16,.31,C.orange);
G.begin(3);
// A unified roof/canopy, coherent project closing detail and a handover marker.
G.box(0,5.55,0,5.00,.24,2.84,C.roof);
for(const z of [-1.12,1.12])G.box(0,5.72,z,5.35,.05,.11,C.cream);
G.box(-1.55,.69,1.33,.70,1.04,.07,C.green);
G.box(1.55,.69,1.33,.70,1.04,.07,C.green);
G.box(0,6.05,0,.88,.11,.64,C.cream);
G.box(0,6.13,0,.36,.055,.20,C.orange);
const mesh=G.finish(),heroScene=Kit.create(hero,mesh),scrollScene=Kit.create(panel,mesh);
if(!heroScene&&!scrollScene)return;
document.body.classList.add('construction-webgl-ready');
const chapters=Array.from(document.querySelectorAll('.construction-cinema-chapter'));
const stageKeys=['enquiry','scope','coordinate','handover'];
const badge=document.getElementById('construction-cinema-progress');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches||document.body.classList.contains('motion-off'),selected=0,scrollValue=0,display=0,manualUntil=0,manualStage=null;
let pending=false,timer=null,active=!document.hidden;
const visible=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function scrollPosition(){
 if(!chapters.length)return 0;const center=innerHeight*.52,positions=chapters.map(ch=>{const r=ch.getBoundingClientRect();return r.top+r.height*.5;});
 if(center<=positions[0])return 0;if(center>=positions[3])return 3;
 for(let i=0;i<3;i++)if(center>=positions[i]&&center<=positions[i+1])return i+(center-positions[i])/(positions[i+1]-positions[i]);
 return selected;
}
function request(){if(!pending&&active){pending=true;requestAnimationFrame(tick);}}
function tick(ms){pending=false;if(!active)return;
 const dest=paused?selected:manualStage!==null&&performance.now()<manualUntil?manualStage:scrollValue;
 display=paused?dest:Kit.mix(display,dest,.14);
 if(heroScene&&visible(hero))heroScene.draw(paused?3:3,'hero',ms*.001);
 if(scrollScene&&visible(panel))scrollScene.draw(display,'chapter',ms*.001);
 if(badge)badge.textContent=String(Math.min(4,Math.floor(display+.34)+1)).padStart(2,'0')+' / 04';
 if(!paused&&(visible(hero)||visible(panel))&&timer===null){timer=setTimeout(()=>{timer=null;request();},90);}
 else if(Math.abs(dest-display)>.005)request();
}
function onScroll(){scrollValue=scrollPosition();if(performance.now()>=manualUntil)manualStage=null;request();}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{onScroll();request();},{passive:true});
addEventListener('construction:stage',e=>{
 const key=e.detail?.key,index=stageKeys.indexOf(key);
 if(index<0)return;selected=index;manualStage=index;manualUntil=performance.now()+1450;request();
});
addEventListener('construction:motion',e=>{paused=!!e.detail?.paused;manualStage=selected;request();});
document.addEventListener('visibilitychange',()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener('change',e=>{if(e.matches){paused=true;selected=Math.round(scrollValue);request();}});
scrollValue=scrollPosition();selected=Math.round(scrollValue);request();
window.__constructionCinema={kind:'native-webgl-construction',get available(){return !!(heroScene?.available||scrollScene?.available);},get progress(){return display;},get paused(){return paused;},get mounts(){return Number(!!heroScene)+Number(!!scrollScene);},get meshVertices(){return mesh.vertices.length/9;}};
})();