/* Taamerat360 / E-commerce cinematic scene.
 * A fictional, unbranded product-display and customer journey. This visual is
 * not a storefront, a purchasable product, a checkout, a fulfilment service or
 * evidence of any client results. Reuses the shared native-WebGL scene kit.
 */
(()=>{'use strict';
const Kit=window.TaameratSceneKit;
const hero=document.querySelector('[data-ecommerce-hero]');
const displayPanel=document.querySelector('[data-ecommerce-scene]');
if(!Kit||!hero||!displayPanel)return;
const g=new Kit.Geometry();
const C={
 ink:[.13,.24,.32],navy:[.21,.36,.50],dark:[.09,.18,.28],
 pearl:[.95,.89,.74],ivory:[.99,.96,.85],
 pink:[.94,.58,.48],coral:[.96,.32,.19],gold:[.99,.73,.37],
 copper:[.78,.42,.23],leaf:[.27,.60,.48],mint:[.51,.80,.65],
 blue:[.36,.62,.86],sky:[.58,.84,.95],shadow:[.25,.36,.42]
};
const B=(x,y,z,w,h,d,c)=>g.box(x,y,z,w,h,d,c);
const L=(a,b,w,c)=>g.beam(a,b,w,c);
g.begin(0);
// Product discovery: unbranded sculptural packaging and a modular display.
B(0,-.27,0,9.4,.37,6.8,C.ink);
B(0,-.045,0,9.1,.10,6.48,C.shadow);
B(-.35,.15,.15,5.25,.24,3.55,C.navy);
B(-.35,.29,.15,5.47,.10,3.77,C.gold);
B(-.92,1.40,.25,1.55,2.20,1.15,C.ivory);
B(-.92,2.64,.25,1.67,.28,1.25,C.coral);
B(-.92,2.87,.25,1.00,.18,.81,C.gold);
// A clean abstract label, intentionally no product brand.
B(-.92,1.37,.855,.97,.76,.058,C.pearl);
B(-.92,1.58,.889,.66,.08,.024,C.copper);
B(-.92,1.39,.889,.50,.07,.024,C.leaf);
B(-.92,1.20,.889,.70,.045,.024,C.gold);
B(.68,1.07,-.35,.92,1.48,.92,C.pink);
B(.68,1.84,-.35,1.08,.18,1.04,C.ivory);
B(.68,2.00,-.35,.60,.14,.65,C.coral);
B(.68,1.12,.14,.66,.54,.053,C.ivory);
B(.68,1.26,.168,.43,.07,.015,C.copper);
B(.68,1.05,.168,.39,.045,.015,C.shadow);
B(-2.0,.73,-.40,.46,.94,.36,C.mint);
B(-2.0,1.22,-.40,.55,.11,.45,C.ivory);
B(-2.0,.68,-.205,.30,.18,.025,C.ivory);
// Floating light accents in the showroom.
for(const [x,z] of [[-3.60,-1.95],[2.90,-1.88],[-3.30,1.65],[3.36,1.65]]){
 B(x,.15,z,.30,.36,.28,C.gold);
 B(x,.41,z,.12,.17,.10,C.ivory);
}
g.begin(1);
// Consider: dimensional product-details cards, comparisons and clarity cues.
for(const [x,y,z,w,col] of [
 [-3.1,3.35,-.70,1.70,C.blue],
 [2.95,3.04,-.80,1.88,C.mint],
 [2.55,1.95,1.24,1.46,C.pink]]){
 B(x,y,z,w,1.03,.12,C.ivory);
 B(x-w*.25,y+.22,z+.072,w*.38,.12,.026,col);
 B(x,y-.02,z+.072,w*.75,.065,.025,C.navy);
 B(x-.13,y-.23,z+.072,w*.54,.052,.024,C.shadow);
}
L([-2.30,2.80,-.55],[-1.55,2.30,.52],.047,C.gold);
L([2.25,2.73,-.62],[1.29,2.12,.28],.047,C.gold);
B(1.96,3.97,-1.00,.40,.40,.38,C.coral);
B(2.02,4.23,-1.00,.21,.12,.18,C.ivory);
g.begin(2);
// Order: conceptual parcel and handover components, not a live order.
B(3.35,.32,-.08,2.15,.36,1.95,C.shadow);
B(3.33,.69,-.08,1.90,.66,1.54,C.copper);
B(3.33,1.08,-.08,2.04,.17,1.66,C.gold);
B(3.33,1.17,.80,1.67,.065,.045,C.pearl);
B(3.33,.60,.72,.74,.36,.07,C.ivory);
B(3.33,.72,.765,.53,.06,.017,C.shadow);
B(3.33,.58,.765,.40,.045,.017,C.shadow);
for(let i=0;i<4;i++){
 const x=1.25+i*.46;
 B(x,.11,1.91,.26,.045,.18,i%2?C.gold:C.coral);
}
B(4.05,2.20,-1.12,.75,.48,.12,C.mint);
B(4.05,2.20,-1.04,.54,.07,.02,C.navy);
B(4.05,2.03,-1.04,.39,.05,.02,C.navy);
g.begin(3);
// Return: repeat-visit feedback loop, open messages and connected touchpoints.
for(let i=0;i<=18;i++){
 const t=i/18,a=t*Math.PI*1.78+.42;
 const x=2.97+1.10*Math.cos(a),z=-.17+1.03*Math.sin(a),y=2.24+.19*Math.sin(2*a);
 B(x,y,z,.135,.11,.13,i%3===0?C.coral:i%3===1?C.gold:C.mint);
}
B(-3.13,1.70,1.30,1.22,.92,.14,C.ivory);
B(-3.13,1.90,1.39,.83,.075,.025,C.coral);
B(-3.13,1.67,1.39,.71,.052,.024,C.navy);
B(-3.13,1.47,1.39,.49,.050,.024,C.mint);
B(-2.67,3.96,.21,.30,.31,.31,C.coral);
B(-2.67,4.18,.21,.14,.12,.14,C.pearl);
const mesh=g.finish();
const sceneHero=Kit.create(hero,mesh),sceneJourney=Kit.create(displayPanel,mesh);
if(!sceneHero&&!sceneJourney)return;
document.body.classList.add('ecommerce-webgl-ready');
const chapters=[...document.querySelectorAll('.ecommerce-cinema-chapter')];
const keys=['discover','consider','order','return'];
const badge=document.getElementById('ecommerce-cinema-progress');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches||document.body.classList.contains('motion-off');
let selected=0,scrollValue=0,progress=0,manualIndex=null,manualUntil=0,visibleDocument=!document.hidden,pending=false,timer=null;
const onScreen=el=>{const rect=el.getBoundingClientRect();return rect.top<innerHeight&&rect.bottom>0;};
function scrollStage(){
 if(!chapters.length)return 0;
 const line=innerHeight*.52,centers=chapters.map(el=>{const rect=el.getBoundingClientRect();return rect.top+rect.height/2;});
 if(line<=centers[0])return 0;
 if(line>=centers[3])return 3;
 for(let i=0;i<3;i++)if(line>=centers[i]&&line<=centers[i+1])return i+(line-centers[i])/(centers[i+1]-centers[i]);
 return 0;
}
function request(){if(!pending&&visibleDocument){pending=true;requestAnimationFrame(tick);}}
function tick(ms){
 pending=false;if(!visibleDocument)return;
 const target=paused?selected:(manualIndex!==null&&performance.now()<manualUntil?manualIndex:scrollValue);
 progress=paused?target:Kit.mix(progress,target,.16);
 if(sceneHero&&onScreen(hero))sceneHero.draw(3,'hero',ms*.001);
 if(sceneJourney&&onScreen(displayPanel))sceneJourney.draw(progress,'chapter',ms*.001);
 if(badge)badge.textContent=String(Math.min(4,Math.floor(progress+.34)+1)).padStart(2,'0')+' / 04';
 for(let i=0;i<chapters.length;i++)chapters[i].classList.toggle('is-current',Math.round(progress)===i);
 if(!paused&&(onScreen(hero)||onScreen(displayPanel))&&timer===null)timer=setTimeout(()=>{timer=null;request();},100);
 else if(Math.abs(target-progress)>.006)request();
}
function onScroll(){scrollValue=scrollStage();if(performance.now()>=manualUntil)manualIndex=null;request();}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',onScroll,{passive:true});
addEventListener('ecommerce:stage',event=>{
 const idx=keys.indexOf(event.detail?.key);if(idx<0)return;
 selected=idx;manualIndex=idx;manualUntil=performance.now()+1550;request();
});
addEventListener('ecommerce:motion',event=>{paused=!!event.detail?.paused;selected=Math.round(progress);manualIndex=selected;request();});
document.addEventListener('visibilitychange',()=>{visibleDocument=!document.hidden;if(visibleDocument)request();});
if(reduced.addEventListener)reduced.addEventListener('change',event=>{if(event.matches){paused=true;selected=Math.round(scrollValue);request();}});
scrollValue=scrollStage();selected=Math.round(scrollValue);request();
window.__ecommerceCinema={
 kind:'native-webgl-ecommerce',
 get available(){return !!(sceneHero?.available||sceneJourney?.available);},
 get mounts(){return Number(!!sceneHero)+Number(!!sceneJourney);},
 get progress(){return progress;},
 get paused(){return paused;},
 get meshVertices(){return mesh.vertices.length/9;}
};
})();