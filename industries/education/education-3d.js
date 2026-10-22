/* Taamerat360 / Education. Fictional dimensional campus and learning journey.
 * Decorative, self-contained native WebGL; no students, records, admission decisions,
 * minors, accreditations or real learning/teaching systems represented.
 */
(()=>{'use strict';
const K=window.TaameratSceneKit,hero=document.querySelector('[data-education-hero]'),stage=document.querySelector('[data-education-scene]');
if(!K||!hero||!stage)return;
const G=new K.Geometry();
const C={ink:[.12,.25,.38],stone:[.83,.77,.64],paper:[.98,.94,.81],teal:[.25,.57,.52],blue:[.32,.55,.78],glass:[.50,.80,.86],orange:[.98,.39,.21],gold:[.98,.72,.40],green:[.38,.67,.47],dark:[.15,.32,.44],pale:[.75,.88,.87],sand:[.76,.67,.55]};
const B=(x,y,z,w,h,d,c)=>G.box(x,y,z,w,h,d,c),L=(a,b,w,c)=>G.beam(a,b,w,c);
G.begin(0);
// DISCOVER: fictional campus as an unbranded isometric learning model.
B(0,-.24,0,10.3,.32,7.3,C.ink);
B(0,-.05,0,10.06,.06,7.06,C.sand);
B(0,.045,2.45,9.74,.09,1.22,C.stone);
B(-1.03,1.22,-.66,5.55,2.31,3.25,C.paper);
B(-1.03,2.45,-.66,5.84,.19,3.52,C.teal);
B(-1.03,2.62,-.66,6.08,.09,3.78,C.gold);
for(const x of [-3.52,-2.50,-1.48,-.46,.56,1.57]){
 B(x,1.27,1.0,.084,1.63,.09,C.teal);
}
for(const x of [-3.00,-1.98,-.96,.06,1.06])B(x,1.31,1.06,.76,1.45,.048,C.glass);
B(-1.08,.55,1.10,.72,.96,.065,C.orange);
B(3.02,1.0,-1.15,2.14,1.92,1.65,C.blue);
B(3.02,2.08,-1.15,2.38,.19,1.88,C.paper);
for(const x of [2.48,3.1,3.72])B(x,1.14,-.25,.47,.78,.055,C.glass);
for(const x of [-4.1,-3.65,2.4,3.3,4.0]){
 B(x,.31,1.92,.38,.40,.42,C.green);
 B(x,.59,1.92,.22,.21,.23,C.teal);
}
for(let i=0;i<12;i++){const x=-4.22+i*.72;B(x,.09,3.05,.35,.05,.18,i%2?C.orange:C.gold);}
G.begin(1);
// ENQUIRE: communication cards and a clear public information panel.
for(const [x,y,z,col] of [[-4.02,3.19,-.80,C.orange],[2.75,3.45,.28,C.blue],[.35,3.50,-1.82,C.green]]){
 B(x,y,z,1.24,.80,.12,C.paper);
 B(x-.13,y+.15,z+.072,.65,.07,.025,col);
 B(x,y-.05,z+.072,.92,.057,.025,C.dark);
 B(x-.16,y-.23,z+.072,.53,.048,.025,C.stone);
}
L([-3.69,2.76,-.76],[-2.86,2.28,.96],.052,C.gold);
L([2.68,3.05,.28],[2.14,2.02,.30],.045,C.orange);
// Abstract books and public programme cards, without fabricated qualifications.
for(let i=0;i<4;i++)B(-3.5+i*.37,.62,-2.15,.29,.55+i*.16,.62,[C.teal,C.orange,C.blue,C.gold][i]);
G.begin(2);
// WELCOME: pathway, guidance desk, and onboarding information objects.
B(2.70,.43,1.08,2.6,.78,1.17,C.stone);
B(2.70,.88,1.08,2.88,.14,1.34,C.paper);
B(2.70,.64,1.69,1.55,.25,.05,C.teal);
B(3.55,1.86,1.21,.88,.71,.14,C.paper);
B(3.55,2.02,1.29,.60,.08,.02,C.green);
B(3.55,1.76,1.29,.52,.07,.02,C.dark);
for(let i=0;i<5;i++){
 B(.28+i*.50,.085,2.8,.28,.06,.18,i%2?C.gold:C.orange);
}
B(-2.96,3.31,1.31,1.13,.83,.12,C.paper);
B(-2.96,3.49,1.38,.73,.08,.025,C.orange);
B(-2.96,3.22,1.38,.84,.055,.025,C.teal);
// Four dimensional book spines become a coherent bundle.
for(let i=0;i<4;i++)B(-.90+i*.26,3.04,-1.51,.20,.68+i*.11,.34,[C.blue,C.gold,C.teal,C.orange][i]);
G.begin(3);
// CONNECT: staff, communications, and responsibility handover metaphors.
for(const [x,y,z,col] of [[-3.28,4.30,-.6,C.teal],[-.04,4.48,-.18,C.orange],[3.40,4.31,-.93,C.green]]){
 B(x,y,z,.90,.59,.13,C.paper);
 B(x-.12,y+.12,z+.076,.47,.065,.024,col);
 B(x,y-.12,z+.076,.60,.047,.025,C.dark);
}
L([-2.86,4.30,-.60],[-.48,4.45,-.20],.065,C.orange);
L([.38,4.45,-.16],[2.98,4.31,-.91],.065,C.gold);
B(2.64,2.85,1.04,.75,.66,.12,C.teal);
B(2.64,3.00,1.11,.50,.06,.022,C.paper);
B(2.64,2.81,1.11,.32,.05,.022,C.paper);
const mesh=G.finish(),a=K.create(hero,mesh),b=K.create(stage,mesh);
if(!a&&!b)return;
// Render both canvases once before hiding fallback SVGs. On a narrow viewport,
// the scene starts below the fold; off-screen-only animation scheduling would
// otherwise leave a blank hero during full-page capture and initial layout.
if(a)a.draw(3,'hero',0);
if(b)b.draw(0,'chapter',0);
document.body.classList.add('education-webgl-ready');
const chapters=[...document.querySelectorAll('.education-cinema-chapter')],keys=['discovery','enquiry','welcome','connect'];
const badge=document.getElementById('education-cinema-progress'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches||document.body.classList.contains('motion-off'),selected=0,scrollValue=0,progress=0,manual=null,until=0,active=!document.hidden,pending=false,timer=null;
const onScreen=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function getScrollProgress(){
 if(chapters.length!==4)return 0;
 const pivot=innerHeight*.52,centers=chapters.map(el=>{const r=el.getBoundingClientRect();return r.top+r.height/2;});
 if(pivot<=centers[0])return 0;if(pivot>=centers[3])return 3;
 for(let i=0;i<3;i++)if(pivot>=centers[i]&&pivot<=centers[i+1])return i+(pivot-centers[i])/(centers[i+1]-centers[i]);
 return 0;
}
function request(){if(active&&!pending){pending=true;requestAnimationFrame(tick);}}
function tick(ms){
 pending=false;if(!active)return;
 const goal=paused?selected:(manual!==null&&performance.now()<until?manual:scrollValue);
 progress=paused?goal:K.mix(progress,goal,.16);
 if(a&&onScreen(hero))a.draw(3,'hero',ms*.001);
 if(b&&onScreen(stage))b.draw(progress,'chapter',ms*.001);
 if(badge)badge.textContent=String(Math.min(4,Math.floor(progress+.34)+1)).padStart(2,'0')+' / 04';
 for(let i=0;i<chapters.length;i++)chapters[i].classList.toggle('is-current',Math.round(progress)===i);
 if(!paused&&(onScreen(hero)||onScreen(stage))&&timer===null)timer=setTimeout(()=>{timer=null;request();},110);
 else if(Math.abs(goal-progress)>.006)request();
}
function scroll(){scrollValue=getScrollProgress();if(performance.now()>until)manual=null;request();}
addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});
addEventListener('education:stage',e=>{const i=keys.indexOf(e.detail?.key);if(i<0)return;selected=i;manual=i;until=performance.now()+1550;request();});
addEventListener('education:motion',e=>{paused=!!e.detail?.paused;selected=Math.round(progress);manual=selected;request();});
document.addEventListener('visibilitychange',()=>{active=!document.hidden;if(active)request();});
if(reduced.addEventListener)reduced.addEventListener('change',e=>{if(e.matches){paused=true;selected=Math.round(scrollValue);request();}});
scrollValue=getScrollProgress();selected=Math.round(scrollValue);request();
window.__educationCinema={kind:'native-webgl-education',get available(){return!!(a?.available||b?.available)},get mounts(){return Number(!!a)+Number(!!b)},get progress(){return progress},get paused(){return paused},get meshVertices(){return mesh.vertices.length/9}};
})();