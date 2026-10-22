/* Healthcare / cinematic NONCLINICAL service pathway.
 * All scenes and signage are fictional. This illustration does not represent
 * diagnosis, treatment, scheduling, triage, patient records or medical advice.
 */
(()=>{'use strict';
const K=window.TaameratSceneKit,hero=document.querySelector('[data-healthcare-hero]'),panel=document.querySelector('[data-healthcare-scene]');
if(!K||!hero||!panel)return;
const G=new K.Geometry();
const C={navy:[.12,.31,.37],deep:[.11,.24,.31],pine:[.22,.51,.43],sage:[.43,.70,.57],aqua:[.49,.79,.83],ivory:[.96,.94,.83],sand:[.83,.78,.67],gold:[.99,.75,.46],coral:[.97,.41,.29],mist:[.73,.88,.83],slate:[.37,.55,.58],soft:[.88,.92,.85]};
const B=(x,y,z,w,h,d,color)=>G.box(x,y,z,w,h,d,color),L=(a,b,w,c)=>G.beam(a,b,w,c);
// 01 — Wayfinding and welcoming public space.
G.begin(0);
B(0,-.26,0,10.0,.34,7.1,C.deep);
B(0,-.06,0,9.78,.08,6.91,C.sand);
B(-.5,.05,0,8.1,.05,5.1,C.ivory);
B(0,1.75,-2.58,8.3,3.49,.18,C.pine);
for(const x of [-3.68,3.68])B(x,1.76,-.84,.13,3.35,3.78,C.slate);
B(-2.8,2.2,-2.40,1.36,.92,.09,C.ivory);
B(-2.80,2.43,-2.34,.76,.09,.045,C.pine);
B(-2.80,2.15,-2.34,.91,.07,.045,C.sage);
B(-2.80,1.93,-2.34,.69,.07,.045,C.sage);
B(.5,1.56,-2.40,3.66,1.38,.08,C.aqua);
for(const x of [-.6,.52,1.64])B(x,1.56,-2.32,.09,1.36,.04,C.ivory);
B(2.9,1.48,-2.34,.42,1.70,.10,C.ivory);
B(2.9,2.30,-2.25,.26,.26,.06,C.gold);
// A public reception counter and generous circulation area.
B(-.65,.67,.35,3.67,1.18,1.0,C.ivory);
B(-.65,1.30,.35,3.97,.14,1.22,C.pine);
B(-.65,.94,.88,2.34,.28,.05,C.sage);
B(-2.25,.27,2.2,.79,.43,.70,C.slate);
B(-2.25,.57,2.2,.65,.21,.65,C.mist);
B(2.21,.25,1.8,.88,.43,.78,C.slate);
B(2.21,.57,1.8,.72,.22,.68,C.mist);
for(const x of [2.75,3.23])B(x,.37,.05,.26,.62,.28,C.sage);
B(2.98,.78,.05,.66,.22,.61,C.pine);
// A neutral wayfinding path; not a clinical route.
for(let i=0;i<11;i++)B(-3.40+i*.65,.06,2.90,.34,.04,.20,i%2?C.gold:C.coral);
// 02 — General contact and public-facing information.
G.begin(1);
for(const [x,y,z,w] of [[-3.15,3.33,.22,1.45],[2.42,3.36,-.24,1.55]]){
 B(x,y,z,w,.95,.13,C.ivory);
 B(x-w*.20,y+.17,z+.077,w*.47,.09,.025,C.pine);
 B(x,y-.05,z+.077,w*.65,.054,.024,C.slate);
 B(x-w*.18,y-.24,z+.077,w*.41,.048,.024,C.sage);
}
L([-2.95,2.78,.22],[-2.08,1.35,.86],.05,C.gold);
B(.75,2.25,.88,.90,.58,.14,C.mist);
B(.75,2.36,.96,.56,.07,.02,C.pine);
B(.75,2.16,.96,.44,.052,.02,C.slate);
// 03 — Administrative next steps; conceptual checklist (no appointment data).
G.begin(2);
B(2.65,1.70,1.35,1.52,2.04,.15,C.ivory);
B(2.65,2.55,1.44,.99,.13,.035,C.pine);
for(let j=0;j<3;j++){
 const y=2.22-j*.48;
 B(2.18,y,1.44,.19,.17,.033,C.sage);
 B(2.68,y,1.44,.63,.065,.026,C.slate);
}
B(1.60,3.67,1.05,1.20,.71,.12,C.aqua);
B(1.60,3.77,1.12,.83,.075,.024,C.pine);
B(1.60,3.55,1.12,.62,.06,.023,C.slate);
L([1.60,3.30,1.06],[2.44,2.77,1.39],.05,C.gold);
// 04 — Staff responsibility & business handovers (no patient systems).
G.begin(3);
for(const [x,y,z,color] of [[-2.94,3.91,-1.48,C.gold],[-.45,4.06,.28,C.aqua],[2.93,4.19,-1.15,C.sage]]){
 B(x,y,z,.83,.58,.13,C.ivory);
 B(x-.13,y+.10,z+.08,.36,.068,.022,color);
 B(x,y-.11,z+.08,.54,.048,.021,C.slate);
}
L([-2.60,3.91,-1.43],[-.82,4.05,.25],.065,C.coral);
L([-.05,4.09,.24],[2.55,4.19,-1.10],.065,C.gold);
B(-2.65,1.76,1.67,.73,.52,.12,C.sage);
B(-2.65,1.77,1.74,.46,.08,.022,C.ivory);
B(-2.65,1.58,1.74,.32,.057,.021,C.ivory);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(panel,mesh);
if(!a&&!b)return;
document.body.classList.add('healthcare-webgl-ready');
const chapters=[...document.querySelectorAll('.healthcare-cinema-chapter')],keys=['discover','enquire','followup','coordinate'];
const badge=document.getElementById('healthcare-cinema-progress'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches||document.body.classList.contains('motion-off'),selected=0,scrollValue=0,display=0,manual=null,lockUntil=0,visible=!document.hidden,pending=false,timer=null;
const onScreen=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function atScroll(){
 if(chapters.length!==4)return 0;
 const line=innerHeight*.52,centers=chapters.map(ch=>{const r=ch.getBoundingClientRect();return r.top+r.height*.5;});
 if(line<=centers[0])return 0;if(line>=centers[3])return 3;
 for(let i=0;i<3;i++)if(line>=centers[i]&&line<=centers[i+1])return i+(line-centers[i])/(centers[i+1]-centers[i]);
 return 0;
}
function request(){if(visible&&!pending){pending=true;requestAnimationFrame(frame);}}
function frame(ms){
 pending=false;if(!visible)return;
 const target=paused?selected:manual!==null&&performance.now()<lockUntil?manual:scrollValue;
 display=paused?target:K.mix(display,target,.16);
 if(a&&onScreen(hero))a.draw(3,'hero',ms*.001);
 if(b&&onScreen(panel))b.draw(display,'chapter',ms*.001);
 if(badge)badge.textContent=String(Math.min(4,Math.floor(display+.34)+1)).padStart(2,'0')+' / 04';
 chapters.forEach((el,i)=>el.classList.toggle('is-current',Math.round(display)===i));
 if(!paused&&(onScreen(hero)||onScreen(panel))&&timer===null)timer=setTimeout(()=>{timer=null;request();},110);
 else if(Math.abs(target-display)>.006)request();
}
function scroll(){scrollValue=atScroll();if(performance.now()>lockUntil)manual=null;request();}
addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});
addEventListener('healthcare:stage',e=>{const i=keys.indexOf(e.detail?.key);if(i<0)return;selected=i;manual=i;lockUntil=performance.now()+1550;request();});
addEventListener('healthcare:motion',e=>{paused=!!e.detail?.paused;selected=Math.round(display);manual=selected;request();});
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)request();});
if(reduced.addEventListener)reduced.addEventListener('change',e=>{if(e.matches){paused=true;selected=Math.round(scrollValue);request();}});
scrollValue=atScroll();selected=Math.round(scrollValue);request();
window.__healthcareCinema={kind:'native-webgl-healthcare',get available(){return!!(a?.available||b?.available)},get mounts(){return Number(!!a)+Number(!!b)},get progress(){return display},get paused(){return paused},get meshVertices(){return mesh.vertices.length/9}};
})();