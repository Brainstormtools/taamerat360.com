/* Reusable Taamerat360 native-WebGL scene kit.
 * Procedural meshes only; no network, persistent state, user data or CDN dependency.
 * Industry scenes supply geometry; this toolkit supplies projection, lighting and fallbacks.
 */
(()=>{"use strict";
if(window.TaameratSceneKit)return;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const mix=(a,b,t)=>a+(b-a)*t;
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0]);}
function viewMatrix(eye,look){
 const sub=(a,b)=>a.map((x,i)=>x-b[i]),norm=a=>{const m=Math.hypot(...a)||1;return a.map(v=>v/m);},cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 const z=norm(sub(eye,look)),x=norm(cross([0,1,0],z)),y=cross(z,x);
 return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-x.reduce((a,v,i)=>a+v*eye[i],0),-y.reduce((a,v,i)=>a+v*eye[i],0),-z.reduce((a,v,i)=>a+v*eye[i],0),1]);
}
function Geometry(){this.vertices=[];this.groups=[];this.phase=0;}
Geometry.prototype.begin=function(phase){this.phase=phase;this.groups.push({phase,start:this.vertices.length/9,count:0});};
Geometry.prototype.tri=function(a,b,c,n,col){for(const p of [a,b,c])this.vertices.push(...p,...n,...col);this.groups[this.groups.length-1].count+=3;};
Geometry.prototype.quad=function(a,b,c,d,n,col){this.tri(a,b,c,n,col);this.tri(a,c,d,n,col);};
Geometry.prototype.box=function(x,y,z,w,h,d,col){
 const v=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]
 .map(p=>[x+p[0]*w,y+p[1]*h,z+p[2]*d]);
 for(const [a,b,c,d,n] of [[4,5,6,7,[0,0,1]],[1,0,3,2,[0,0,-1]],[0,4,7,3,[-1,0,0]],[5,1,2,6,[1,0,0]],[3,7,6,2,[0,1,0]],[0,1,5,4,[0,-1,0]]])this.quad(v[a],v[b],v[c],v[d],n,col);
};
Geometry.prototype.beam=function(a,b,width,col){
 const delta=b.map((v,i)=>v-a[i]),len=Math.hypot(...delta);if(len<.0001)return;
 // Rectangular prism oriented between two points, used for braces/crane diagonals.
 const y=delta.map(v=>v/len),ref=Math.abs(y[1])>.91?[1,0,0]:[0,1,0];
 const cross=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
 const normalize=v=>{const m=Math.hypot(...v)||1;return v.map(x=>x/m);},u=normalize(cross(y,ref)),z=normalize(cross(u,y));
 const p=(end,us,zs)=>end.map((q,i)=>q+(u[i]*us+z[i]*zs)*width/2);
 const v=[p(a,-1,-1),p(a,1,-1),p(a,1,1),p(a,-1,1),p(b,-1,-1),p(b,1,-1),p(b,1,1),p(b,-1,1)];
 for(const [q,r,s,t,n]of [[0,1,2,3,y.map(x=>-x)],[4,5,6,7,y],[0,4,7,3,u.map(x=>-x)],[1,5,6,2,u],[0,1,5,4,z.map(x=>-x)],[3,2,6,7,z]])this.quad(v[q],v[r],v[s],v[t],n,col);
};
Geometry.prototype.finish=function(){return{vertices:new Float32Array(this.vertices),groups:this.groups.filter(g=>g.count)};};
const vert='attribute vec3 aP;attribute vec3 aN;attribute vec3 aC;uniform mat4 uP;uniform mat4 uV;varying vec3 vN;varying vec3 vC;varying vec3 vPos;void main(){vN=aN;vC=aC;vPos=aP;gl_Position=uP*uV*vec4(aP,1.);}';
const frag='precision mediump float;varying vec3 vN;varying vec3 vC;varying vec3 vPos;uniform float uAlpha;void main(){vec3 n=normalize(vN);float diffuse=max(dot(n,normalize(vec3(-.42,.85,.92))),0.);float bounce=max(dot(n,normalize(vec3(.72,.28,-.6))),0.);vec3 c=vC*(.36+.55*diffuse+.16*bounce);gl_FragColor=vec4(pow(c,vec3(.89)),uAlpha);}';
function create(container,mesh){
 const canvas=document.createElement('canvas');canvas.className='immersive-webgl';canvas.setAttribute('aria-hidden','true');canvas.setAttribute('role','presentation');
 container.prepend(canvas);
 let gl;try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,powerPreference:'low-power'});}catch(e){}
 if(!gl){canvas.remove();return null;}
 const shader=(kind,src)=>{const sh=gl.createShader(kind);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error('shader unavailable');return sh;};
 let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vert));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,frag));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('link unavailable');}catch(e){canvas.remove();return null;}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,mesh.vertices,gl.STATIC_DRAW);
 for(const [name,offset] of [['aP',0],['aN',12],['aC',24]]){const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,36,offset);}
 const P=gl.getUniformLocation(program,'uP'),V=gl.getUniformLocation(program,'uV'),A=gl.getUniformLocation(program,'uAlpha');
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);let width=0,height=0,lost=false;canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;document.body.classList.remove('construction-webgl-ready');});
 function draw(progress,mode,clock=0){if(lost)return;const rect=container.getBoundingClientRect();if(rect.width<20||rect.height<20)return;
  const dpr=Math.min(devicePixelRatio||1,1.4),w=Math.min(1250,Math.round(rect.width*dpr)),h=Math.min(880,Math.round(rect.height*dpr));
  if(width!==w||height!==h){width=canvas.width=w;height=canvas.height=h;gl.viewport(0,0,w,h);}
  gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const isHero=mode==='hero',t=clamp(progress/3,0,1),yaw=isHero?(.18*Math.sin(clock*.19)):(-.45+t*.78),eye=[Math.sin(yaw)*10+5.8,5.2-t*.7,isHero?13.8:11.8],target=[.0,2.65,0];
  gl.uniformMatrix4fv(P,false,perspective(isHero?.77:.73,w/h,.1,100));gl.uniformMatrix4fv(V,false,viewMatrix(eye,target));
  for(const group of mesh.groups){if(group.phase>progress+.08)continue;const opacity=group.phase===0?1:clamp((progress-group.phase+.18)*3.2,.05,1);
   if(opacity<.99){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);}else{gl.disable(gl.BLEND);gl.depthMask(true);}
   gl.uniform1f(A,opacity);gl.drawArrays(gl.TRIANGLES,group.start,group.count);
  }
  gl.depthMask(true);gl.disable(gl.BLEND);
 }
 return{canvas,draw,get available(){return!lost}};
}
window.TaameratSceneKit=Object.freeze({Geometry,create,clamp,mix});
})();