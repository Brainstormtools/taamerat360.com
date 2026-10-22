/* Taamerat360 — procedural native WebGL 3D; no CDNs or user data.
 * Decorative canvas layer: original editorial SVGs remain accessible and act as fallbacks.
 * A continuous orange tube binds FIND, CONNECT and DELIVER in 3D; scroll advances
 * the camera, chapter selection and the existing motion toggle remain functional.
 */
(()=>{"use strict";
const hero=document.querySelector('[data-cinema-hero]'),stage=document.querySelector('[data-cinema-stage]');
if(!hero||!stage)return;
const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)');
const state={stage:0,manual:null,scroll:0,paused:prefersReduced.matches,hover:0};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t;
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0]);}
function lookAt(eye,target){
 const diff=(a,b)=>a.map((v,i)=>v-b[i]),norm=v=>{const l=Math.hypot(...v)||1;return v.map(x=>x/l)},cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 const z=norm(diff(eye,target)),x=norm(cross([0,1,0],z)),y=cross(z,x);
 return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-x.reduce((s,v,i)=>s+v*eye[i],0),-y.reduce((s,v,i)=>s+v*eye[i],0),-z.reduce((s,v,i)=>s+v*eye[i],0),1]);
}
const C={orange:[.98,.30,.15],gold:[.99,.70,.31],cream:[.96,.86,.62],blue:[.24,.48,.88],cyan:[.44,.83,.91],jade:[.18,.63,.48],green:[.39,.86,.62],deep:[.12,.28,.38],pearl:[.86,.92,.89],skin:[.91,.57,.36]};
const data=[];let nverts=0;
function tri(a,b,c,n,col){for(const p of [a,b,c])data.push(...p,...n,...col);nverts+=3;}
function quad(a,b,c,d,n,col){tri(a,b,c,n,col);tri(a,c,d,n,col);}
function box(x,y,z,w,h,d,col,r=0){
 const verts=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]];
 const co=Math.cos(r),si=Math.sin(r),v=verts.map(p=>{const a=p[0]*w,b=p[1]*h,c=p[2]*d;return[x+a*co+c*si,y+b,z-a*si+c*co]});
 for(const f of [[4,5,6,7,[0,0,1]],[1,0,3,2,[0,0,-1]],[0,4,7,3,[-1,0,0]],[5,1,2,6,[1,0,0]],[3,7,6,2,[0,1,0]],[0,1,5,4,[0,-1,0]]]){
  const norm=[f[4][0]*co+f[4][2]*si,f[4][1],-f[4][0]*si+f[4][2]*co];
  quad(v[f[0]],v[f[1]],v[f[2]],v[f[3]],norm,col);
 }
}
function sphere(x,y,z,r,col){
 const S=12,R=7,p=(t,f)=>[x+r*Math.sin(t)*Math.cos(f),y+r*Math.cos(t),z+r*Math.sin(t)*Math.sin(f)];
 for(let j=0;j<R;j++)for(let i=0;i<S;i++){
  const t0=Math.PI*j/R,t1=Math.PI*(j+1)/R,f0=2*Math.PI*i/S,f1=2*Math.PI*(i+1)/S;
  const a=p(t0,f0),b=p(t1,f0),c=p(t1,f1),d=p(t0,f1);
  for(const v of [[a,b,c],[a,c,d]]){const n=v[0].map((q,k)=>(q+v[1][k]+v[2][k])/3-[x,y,z][k]),l=Math.hypot(...n)||1;tri(...v,n.map(q=>q/l),col);}
 }
}
// A continuous tubular spatial route joins the three business moments.
function route(){
 const N=110,S=8,P=[];for(let i=0;i<=N;i++){const t=i/N;P.push([mix(-5.9,5.9,t),.43+.21*Math.sin(3*Math.PI*t),.78+.60*Math.sin(5*Math.PI*t)]);}
 const ring=(i,j)=>{const p=P[i],pre=P[Math.max(0,i-1)],post=P[Math.min(N,i+1)],v=post.map((q,k)=>q-pre[k]),l=Math.hypot(...v)||1,t=v.map(q=>q/l);
  const u=[-t[2],0,t[0]],ul=Math.hypot(...u)||1,b=u.map(q=>q/ul),c=[t[1]*b[2]-t[2]*b[1],t[2]*b[0]-t[0]*b[2],t[0]*b[1]-t[1]*b[0]],a=2*Math.PI*j/S;
  const n=b.map((q,k)=>q*Math.cos(a)+c[k]*Math.sin(a));return{p:p.map((q,k)=>q+.105*n[k]),n};};
 for(let i=0;i<N;i++){const t=i/N,col=t<.5?C.orange.map((q,k)=>mix(q,C.gold[k],t*2)):C.gold.map((q,k)=>mix(q,C.orange[k],(t-.5)*1.4));
  for(let j=0;j<S;j++){const a=ring(i,j),b=ring(i+1,j),c=ring(i+1,(j+1)%S),d=ring(i,(j+1)%S);
   tri(a.p,b.p,c.p,a.n,col);tri(a.p,c.p,d.p,a.n,col);}
 }
}
for(const [x,col] of [[-4,C.blue],[0,C.gold],[4,C.jade]]){
 box(x,-.12,0,3.15,.14,2.65,C.deep);box(x,-.01,0,3.08,.05,2.59,col);
}
// FIND — storefront.
box(-4,.94,-.24,1.9,1.75,1.3,C.blue,-.09);
box(-4,1.85,-.24,2.21,.21,1.5,C.cream,-.09);
box(-4.55,.93,.45,.49,1.15,.08,C.cyan,-.09);
box(-3.55,1.17,.45,.60,.65,.085,C.gold,-.09);
box(-4,.41,.50,2.02,.08,.26,C.deep,-.09);
sphere(-2.85,.32,.79,.24,C.orange);
// CONNECT — two sculptural people and a conversation table.
box(0,.51,-.10,1.70,.13,.85,C.pearl,.1);
box(-.54,.25,-.10,.13,.58,.13,C.blue);box(.54,.25,-.10,.13,.58,.13,C.blue);
for(const [x,col] of [[-.82,C.blue],[.82,C.jade]]){box(x,.82,.20,.40,.65,.29,col);sphere(x,1.33,.18,.245,C.skin);sphere(x,1.59,.13,.23,C.deep);box(x,.27,.22,.18,.42,.15,C.deep);}
box(0,.66,.01,.39,.035,.27,C.gold);sphere(0,2.3,-.3,.19,C.cream);
// DELIVER — organized blocks and signed-off visual symbol (illustration only).
box(3.17,.51,-.23,1.15,.93,.95,C.jade,-.17);
box(4.37,.66,.28,1.07,1.22,.93,C.blue,.12);
box(4.65,1.42,-.38,.97,.28,.98,C.cream,.18);
box(3.35,1.24,-.28,.92,.24,.92,C.green,-.17);
for(let j=0;j<3;j++)box(3.40+j*.16,1.40+j*.14,-.07,.84,.08,.66,j%2?C.gold:C.pearl,-.17);
sphere(4.36,1.93,-.18,.31,C.gold);box(4.35,1.88,.10,.32,.085,.055,C.deep);
for(let i=0;i<21;i++)sphere(-6+i*.58,1.3+.52*Math.sin(i*2.3),-1.15-.25*Math.sin(i*1.7),.028+(i%3)*.012,i%4?C.cream:C.orange);
route();
const vertexSource='attribute vec3 aP;attribute vec3 aN;attribute vec3 aC;uniform mat4 uP;uniform mat4 uV;varying vec3 vN;varying vec3 vC;varying vec3 vW;varying vec3 vEye;void main(){vN=aN;vC=aC;vW=aP;vec4 view=uV*vec4(aP,1.);vEye=-view.xyz;gl_Position=uP*view;}';
const fragmentSource='precision mediump float;varying vec3 vN;varying vec3 vC;varying vec3 vW;varying vec3 vEye;uniform float uFocus;uniform float uOverview;void main(){vec3 n=normalize(vN);float d=max(dot(n,normalize(vec3(-.32,.88,1.))),0.);float rim=pow(1.-max(dot(n,normalize(vEye)),0.),2.);float fade=mix(.55+.45*(1.-smoothstep(1.,5.2,abs(vW.x-uFocus))),1.,uOverview);vec3 c=vC*(.34+.63*d)*fade+vec3(.15,.13,.09)*rim*.35;gl_FragColor=vec4(pow(c,vec3(.91)),1.);}';
function renderer(mount,kind){
 const canvas=document.createElement('canvas');canvas.className='cinema-webgl';canvas.setAttribute('aria-hidden','true');canvas.setAttribute('role','presentation');mount.prepend(canvas);
 let gl;try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,powerPreference:'low-power'});}catch(e){}
 if(!gl){canvas.remove();return null;}
 const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('WebGL shader compilation failed');return s;};
 let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('WebGL linking failed');}catch(e){canvas.remove();return null;}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
 for(const [a,offset] of [['aP',0],['aN',12],['aC',24]]){const loc=gl.getAttribLocation(program,a);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,36,offset);}
 const p=gl.getUniformLocation(program,'uP'),v=gl.getUniformLocation(program,'uV'),f=gl.getUniformLocation(program,'uFocus'),o=gl.getUniformLocation(program,'uOverview');
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
 let w=0,h=0,lost=false;canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;document.body.classList.remove('cinema-webgl-ready');});
 function draw(progress,clock){if(lost)return;const rect=mount.getBoundingClientRect();if(!rect.width||!rect.height)return;
  const scale=Math.min(devicePixelRatio||1,1.5),nw=Math.min(1400,Math.max(2,Math.round(rect.width*scale))),nh=Math.min(1000,Math.max(2,Math.round(rect.height*scale)));
  if(nw!==w||nh!==h){canvas.width=w=nw;canvas.height=h=nh;gl.viewport(0,0,w,h);}
  const a=Math.floor(progress),b=Math.min(2,a+1),t=progress-a,s=t*t*(3-2*t),target=mix([-4,0,4][a],[-4,0,4][b],s);
  const overview=kind==='hero';
  const eye=overview?[8+1.05*Math.sin(clock*.16),5.25,17.5]:[target+4.5+(state.paused?0:state.hover*.45),3.28+(state.paused?0:.06*Math.sin(clock*.35)),7.8];
  gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(p,false,perspective(.78,w/h,.1,65));gl.uniformMatrix4fv(v,false,lookAt(eye,overview?[0,.66,0]:[target,.82,0]));
  gl.uniform1f(f,target);gl.uniform1f(o,overview?1:0);gl.drawArrays(gl.TRIANGLES,0,nverts);
 }
 return{draw,canvas};
}
const a=renderer(hero,'hero'),b=renderer(stage,'journey');if(!a&&!b)return;
document.body.classList.add('cinema-webgl-ready');
const steps=[...document.querySelectorAll('[data-journey]')];
let pending=false,display=0,visible=!document.hidden,timer=null,manualLockUntil=0;
const onscreen=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;};
function position(){if(!steps.length)return state.stage;const center=innerHeight*.53,c=steps.map(e=>{const r=e.getBoundingClientRect();return r.top+r.height/2;});if(center<=c[0])return 0;if(center>=c[2])return 2;for(let i=0;i<2;i++)if(center>=c[i]&&center<=c[i+1])return i+(center-c[i])/(c[i+1]-c[i]);return state.stage;}
function frame(ms){pending=false;if(!visible)return;const target=clamp(state.paused?(state.manual??state.stage):(state.manual??state.scroll),0,2);display=state.paused?target:mix(display,target,.11);
 if(a&&onscreen(hero))a.draw(display,ms*.001);if(b&&onscreen(stage))b.draw(display,ms*.001);
 if(!state.paused&&visible&&(onscreen(hero)||onscreen(stage))&&timer===null){timer=setTimeout(()=>{timer=null;request();},75);}
 else if(!state.paused&&Math.abs(target-display)>.003)request();
}
function request(){if(!pending){pending=true;requestAnimationFrame(frame);}}
function scroll(){state.scroll=position();if(performance.now()>manualLockUntil)state.manual=null;request();}
addEventListener('scroll',scroll,{passive:true});addEventListener('resize',()=>{state.scroll=position();request();},{passive:true});
addEventListener('pointermove',e=>{if(state.paused||!onscreen(hero))return;const r=hero.getBoundingClientRect();state.hover=clamp((e.clientX-r.left)/Math.max(r.width,1)-.5,-.5,.5);request();},{passive:true});
addEventListener('taamerat:stage',e=>{state.stage=e.detail.index;state.manual=e.detail.index;manualLockUntil=performance.now()+1500;request();});
addEventListener('taamerat:motion',e=>{state.paused=!!e.detail.paused;state.manual=state.stage;request();});
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)request();});
if(prefersReduced.addEventListener)prefersReduced.addEventListener('change',e=>{if(e.matches){state.paused=true;state.manual=state.stage;request();}});
state.scroll=position();request();
window.__taameratCinema={kind:'native-webgl-3d',get available(){return!!(a||b)},get progress(){return display},get paused(){return state.paused},get mounts(){return[a,b].filter(Boolean).length}};
})();