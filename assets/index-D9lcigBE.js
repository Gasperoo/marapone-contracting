import{r as w,a as ke,R as ae,L as je,B as Be,b as Le,c as ie}from"./react-vendor-BcREprs3.js";import{C as re,D as Ie,R as Oe,L,a as I,V as d,W as Ne,b as Ue,S as se,c as oe,M as $,P as q,d as O,e as Ve,H as He,F as We,f as Ge,B as Ye,g as Xe,h as $e,A as qe}from"./three-vendor-Cv8pSpCK.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))h(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const x of u.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&h(x)}).observe(document,{childList:!0,subtree:!0});function g(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function h(a){if(a.ep)return;a.ep=!0;const u=g(a);fetch(a.href,u)}})();var ce={exports:{}},N={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pe=w,Je=Symbol.for("react.element"),Ke=Symbol.for("react.fragment"),Qe=Object.prototype.hasOwnProperty,Ze=Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,et={key:!0,ref:!0,__self:!0,__source:!0};function ue(c,n,g){var h,a={},u=null,x=null;g!==void 0&&(u=""+g),n.key!==void 0&&(u=""+n.key),n.ref!==void 0&&(x=n.ref);for(h in n)Qe.call(n,h)&&!et.hasOwnProperty(h)&&(a[h]=n[h]);if(c&&c.defaultProps)for(h in n=c.defaultProps,n)a[h]===void 0&&(a[h]=n[h]);return{$$typeof:Je,type:c,key:u,ref:x,props:a,_owner:Ze.current}}N.Fragment=Ke;N.jsx=ue;N.jsxs=ue;ce.exports=N;var r=ce.exports,P={},ne=ke;P.createRoot=ne.createRoot,P.hydrateRoot=ne.hydrateRoot;class le extends ae.Component{constructor(n){super(n),this.state={hasError:!1,error:null}}static getDerivedStateFromError(n){return{hasError:!0}}componentDidCatch(n,g){console.error("ErrorBoundary caught an error:",n,g),this.setState({error:n})}render(){return this.state.hasError?r.jsxs("div",{style:{padding:"2rem",textAlign:"center",color:"#e0e0e0",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"#0a0e1a"},children:[r.jsx("h1",{style:{fontSize:"2rem",marginBottom:"1rem"},children:"Something went wrong"}),r.jsx("p",{style:{marginBottom:"2rem",color:"#999"},children:"Please refresh the page or try again later."}),r.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"0.75rem 2rem",backgroundColor:"#4da6ff",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"1rem"},children:"Reload Page"})]}):this.props.children}}function tt({mouseForce:c=20,cursorSize:n=100,isViscous:g=!1,viscous:h=30,iterationsViscous:a=32,iterationsPoisson:u=32,dt:x=.014,BFECC:F=!0,resolution:S=.5,isBounce:M=!1,colors:J=["#5227FF","#FF9FFC","#B19EEF"],style:he={},className:de="",autoDemo:E=!0,autoSpeed:R=.5,autoIntensity:A=2.2,takeoverDuration:k=.25,autoResumeDelay:j=1e3,autoRampDuration:B=.6}){const U=w.useRef(null),f=w.useRef(null),V=w.useRef(null),D=w.useRef(null),H=w.useRef(null),K=w.useRef(!0),W=w.useRef(null);return w.useEffect(()=>{if(!U.current)return;function p(s){let e;Array.isArray(s)&&s.length>0?s.length===1?e=[s[0],s[0]]:e=s:e=["#ffffff","#ffffff"];const t=e.length,i=new Uint8Array(t*4);for(let l=0;l<t;l++){const m=new re(e[l]);i[l*4+0]=Math.round(m.r*255),i[l*4+1]=Math.round(m.g*255),i[l*4+2]=Math.round(m.b*255),i[l*4+3]=255}const o=new Ie(i,t,1,Oe);return o.magFilter=L,o.minFilter=L,o.wrapS=I,o.wrapT=I,o.generateMipmaps=!1,o.needsUpdate=!0,o}const T=p(J),G=new Ve(0,0,0,0),_=`
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `,ve=`
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main(){
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px * 1.0;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `,fe=`
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `,Q=`
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spot_new = uv;
          vec2 vel_old = texture2D(velocity, uv).xy;
          vec2 spot_old = spot_new - vel_old * dt * ratio;
          vec2 vel_new1 = texture2D(velocity, spot_old).xy;
          vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
          vec2 error = spot_new2 - spot_new;
          vec2 spot_new3 = spot_new - error / 2.0;
          vec2 vel_2 = texture2D(velocity, spot_new3).xy;
          vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `,pe=`
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `,me=`
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `,ge=`
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `,xe=`
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `,ye=`
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `,we=`
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        vec2 old = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
        newv /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newv, 0.0, 0.0);
      }
    `;class _e{constructor(){this.width=0,this.height=0,this.aspect=1,this.pixelRatio=1,this.container=null,this.renderer=null,this.clock=null,this.time=0,this.delta=0}init(e){this.container=e,this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.resize(),this.renderer=new Ne({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(new re(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.renderer.domElement.style.display="block",this.clock=new Ue,this.clock.start()}resize(){if(!this.container)return;const e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.delta=this.clock.getDelta(),this.time+=this.delta}}const v=new _e;class be{constructor(){this.mouseMoved=!1,this.coords=new d,this.coords_old=new d,this.diff=new d,this.timer=null,this.container=null,this.docTarget=null,this.listenerTarget=null,this.isHoverInside=!1,this.hasUserControl=!1,this.isAutoActive=!1,this.autoIntensity=2,this.takeoverActive=!1,this.takeoverStartTime=0,this.takeoverDuration=.25,this.takeoverFrom=new d,this.takeoverTo=new d,this.onInteract=null,this._onMouseMove=this.onDocumentMouseMove.bind(this),this._onTouchStart=this.onDocumentTouchStart.bind(this),this._onTouchMove=this.onDocumentTouchMove.bind(this),this._onTouchEnd=this.onTouchEnd.bind(this),this._onDocumentLeave=this.onDocumentLeave.bind(this)}init(e){this.container=e,this.docTarget=e.ownerDocument||null;const t=this.docTarget&&this.docTarget.defaultView||(typeof window<"u"?window:null);t&&(this.listenerTarget=t,this.listenerTarget.addEventListener("mousemove",this._onMouseMove),this.listenerTarget.addEventListener("touchstart",this._onTouchStart,{passive:!0}),this.listenerTarget.addEventListener("touchmove",this._onTouchMove,{passive:!0}),this.listenerTarget.addEventListener("touchend",this._onTouchEnd),this.docTarget&&this.docTarget.addEventListener("mouseleave",this._onDocumentLeave))}dispose(){this.listenerTarget&&(this.listenerTarget.removeEventListener("mousemove",this._onMouseMove),this.listenerTarget.removeEventListener("touchstart",this._onTouchStart),this.listenerTarget.removeEventListener("touchmove",this._onTouchMove),this.listenerTarget.removeEventListener("touchend",this._onTouchEnd)),this.docTarget&&this.docTarget.removeEventListener("mouseleave",this._onDocumentLeave),this.listenerTarget=null,this.docTarget=null,this.container=null}isPointInside(e,t){if(!this.container)return!1;const i=this.container.getBoundingClientRect();return i.width===0||i.height===0?!1:e>=i.left&&e<=i.right&&t>=i.top&&t<=i.bottom}updateHoverState(e,t){return this.isHoverInside=this.isPointInside(e,t),this.isHoverInside}setCoords(e,t){if(!this.container)return;this.timer&&window.clearTimeout(this.timer);const i=this.container.getBoundingClientRect();if(i.width===0||i.height===0)return;const o=(e-i.left)/i.width,l=(t-i.top)/i.height;this.coords.set(o*2-1,-(l*2-1)),this.mouseMoved=!0,this.timer=window.setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.updateHoverState(e.clientX,e.clientY)){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){if(!this.container)return;const t=this.container.getBoundingClientRect();if(t.width===0||t.height===0)return;const i=(e.clientX-t.left)/t.width,o=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(i*2-1,-(o*2-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}}onDocumentTouchStart(e){if(e.touches.length!==1)return;const t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY),this.hasUserControl=!0)}onDocumentTouchMove(e){if(e.touches.length!==1)return;const t=e.touches[0];this.updateHoverState(t.clientX,t.clientY)&&(this.onInteract&&this.onInteract(),this.setCoords(t.clientX,t.clientY))}onTouchEnd(){this.isHoverInside=!1}onDocumentLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){const e=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1e3);if(e>=1)this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0);else{const t=e*e*(3-2*e);this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,t)}}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}const y=new be;class Se{constructor(e,t,i){this.mouse=e,this.manager=t,this.enabled=i.enabled,this.speed=i.speed,this.resumeDelay=i.resumeDelay||3e3,this.rampDurationMs=(i.rampDuration||0)*1e3,this.active=!1,this.current=new d(0,0),this.target=new d,this.lastTime=performance.now(),this.activationTime=0,this.margin=.2,this._tmpDir=new d,this.pickNewTarget()}pickNewTarget(){const e=Math.random;this.target.set((e()*2-1)*(1-this.margin),(e()*2-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;const e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay){this.active&&this.forceStop();return}if(this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let i=(e-this.lastTime)/1e3;this.lastTime=e,i>.2&&(i=.016);const o=this._tmpDir.subVectors(this.target,this.current),l=o.length();if(l<.01){this.pickNewTarget();return}o.normalize();let m=1;if(this.rampDurationMs>0){const X=Math.min(1,(e-this.activationTime)/this.rampDurationMs);m=X*X*(3-2*X)}const Y=this.speed*i*m,z=Math.min(Y,l);this.current.addScaledVector(o,z),this.mouse.setNormalized(this.current.x,this.current.y)}}class C{constructor(e){var t;this.props=e||{},this.uniforms=(t=this.props.material)==null?void 0:t.uniforms,this.scene=null,this.camera=null,this.material=null,this.geometry=null,this.plane=null}init(){this.scene=new se,this.camera=new oe,this.uniforms&&(this.material=new O(this.props.material),this.geometry=new q(2,2),this.plane=new $(this.geometry,this.material),this.scene.add(this.plane))}update(){v.renderer.setRenderTarget(this.props.output||null),v.renderer.render(this.scene,this.camera),v.renderer.setRenderTarget(null)}}class De extends C{constructor(e){super({material:{vertexShader:_,fragmentShader:Q,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){const e=new Ye,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new Xe(t,3));const i=new O({vertexShader:ve,fragmentShader:Q,uniforms:this.uniforms});this.line=new $e(e,i),this.scene.add(this.line)}update({dt:e,isBounce:t,BFECC:i}){this.uniforms.dt.value=e,this.line.visible=t,this.uniforms.isBFECC.value=i,super.update()}}class Te extends C{constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();const t=new q(1,1),i=new O({vertexShader:fe,fragmentShader:ge,blending:qe,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new d(0,0)},center:{value:new d(0,0)},scale:{value:new d(e.cursor_size,e.cursor_size)}}});this.mouse=new $(t,i),this.scene.add(this.mouse)}update(e){const t=y.diff.x/2*e.mouse_force,i=y.diff.y/2*e.mouse_force,o=e.cursor_size*e.cellScale.x,l=e.cursor_size*e.cellScale.y,m=Math.min(Math.max(y.coords.x,-1+o+e.cellScale.x*2),1-o-e.cellScale.x*2),Y=Math.min(Math.max(y.coords.y,-1+l+e.cellScale.y*2),1-l-e.cellScale.y*2),z=this.mouse.material.uniforms;z.force.value.set(t,i),z.center.value.set(m,Y),z.scale.value.set(e.cursor_size,e.cursor_size),super.update()}}class Ce extends C{constructor(e){super({material:{vertexShader:_,fragmentShader:we,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({viscous:e,iterations:t,dt:i}){let o,l;this.uniforms.v.value=e;for(let m=0;m<t;m++)m%2===0?(o=this.props.output0,l=this.props.output1):(o=this.props.output1,l=this.props.output0),this.uniforms.velocity_new.value=o.texture,this.props.output=l,this.uniforms.dt.value=i,super.update();return l}}class ze extends C{constructor(e){super({material:{vertexShader:_,fragmentShader:me,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e}){this.uniforms.velocity.value=e.texture,super.update()}}class Fe extends C{constructor(e){super({material:{vertexShader:_,fragmentShader:xe,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({iterations:e}){let t,i;for(let o=0;o<e;o++)o%2===0?(t=this.props.output0,i=this.props.output1):(t=this.props.output1,i=this.props.output0),this.uniforms.pressure.value=t.texture,this.props.output=i,super.update();return i}}class Me extends C{constructor(e){super({material:{vertexShader:_,fragmentShader:ye,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e,pressure:t}){this.uniforms.velocity.value=e.texture,this.uniforms.pressure.value=t.texture,super.update()}}class Ee{constructor(e){this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null},this.fboSize=new d,this.cellScale=new d,this.boundarySpace=new d,this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?He:We}createAllFBO(){const t={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:L,magFilter:L,wrapS:I,wrapT:I};for(let i in this.fbos)this.fbos[i]=new Ge(this.fboSize.x,this.fboSize.y,t)}createShaderPass(){this.advection=new De({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new Te({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new Ce({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new ze({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new Fe({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new Me({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){const e=Math.max(1,Math.round(this.options.resolution*v.width)),t=Math.max(1,Math.round(this.options.resolution*v.height)),i=1/e,o=1/t;this.cellScale.set(i,o),this.fboSize.set(e,t)}resize(){this.calcSize();for(let e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});const t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class Re{constructor(){this.init()}init(){this.simulation=new Ee,this.scene=new se,this.camera=new oe,this.output=new $(new q(2,2),new O({vertexShader:_,fragmentShader:pe,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new d},palette:{value:T},bgColor:{value:G}}})),this.scene.add(this.output)}resize(){this.simulation.resize()}render(){v.renderer.setRenderTarget(null),v.renderer.render(this.scene,this.camera)}update(){this.simulation.update(),this.render()}}class Ae{constructor(e){this.props=e,v.init(e.$wrapper),y.init(e.$wrapper),y.autoIntensity=e.autoIntensity,y.takeoverDuration=e.takeoverDuration,this.lastUserInteraction=performance.now(),y.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new Se(y,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),this._loop=this.loop.bind(this),this._resize=this.resize.bind(this),window.addEventListener("resize",this._resize),this._onVisibility=()=>{document.hidden?this.pause():K.current&&this.start()},document.addEventListener("visibilitychange",this._onVisibility),this.running=!1}init(){this.props.$wrapper.prepend(v.renderer.domElement),this.output=new Re}resize(){v.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),y.update(),v.update(),this.output.update()}loop(){this.running&&(this.render(),D.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,D.current&&(cancelAnimationFrame(D.current),D.current=null)}dispose(){try{if(window.removeEventListener("resize",this._resize),document.removeEventListener("visibilitychange",this._onVisibility),y.dispose(),v.renderer){const e=v.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),v.renderer.dispose()}}catch{}}}const b=U.current;b.style.position=b.style.position||"relative",b.style.overflow=b.style.overflow||"hidden";const Z=new Ae({$wrapper:b,autoDemo:E,autoSpeed:R,autoIntensity:A,takeoverDuration:k,autoResumeDelay:j,autoRampDuration:B});f.current=Z,(()=>{var t;if(!f.current)return;const s=(t=f.current.output)==null?void 0:t.simulation;if(!s)return;const e=s.options.resolution;Object.assign(s.options,{mouse_force:c,cursor_size:n,isViscous:g,viscous:h,iterations_viscous:a,iterations_poisson:u,dt:x,BFECC:F,resolution:S,isBounce:M}),S!==e&&s.resize()})(),Z.start();const ee=new IntersectionObserver(s=>{const e=s[0],t=e.isIntersecting&&e.intersectionRatio>0;K.current=t,f.current&&(t&&!document.hidden?f.current.start():f.current.pause())},{threshold:[0,.01,.1]});ee.observe(b),H.current=ee;const te=new ResizeObserver(()=>{f.current&&(W.current&&cancelAnimationFrame(W.current),W.current=requestAnimationFrame(()=>{f.current&&f.current.resize()}))});return te.observe(b),V.current=te,()=>{if(D.current&&cancelAnimationFrame(D.current),V.current)try{V.current.disconnect()}catch{}if(H.current)try{H.current.disconnect()}catch{}f.current&&f.current.dispose(),f.current=null}},[F,n,x,M,g,u,a,c,S,h,J,E,R,A,k,j,B]),w.useEffect(()=>{var _;const p=f.current;if(!p)return;const T=(_=p.output)==null?void 0:_.simulation;if(!T)return;const G=T.options.resolution;Object.assign(T.options,{mouse_force:c,cursor_size:n,isViscous:g,viscous:h,iterations_viscous:a,iterations_poisson:u,dt:x,BFECC:F,resolution:S,isBounce:M}),p.autoDriver&&(p.autoDriver.enabled=E,p.autoDriver.speed=R,p.autoDriver.resumeDelay=j,p.autoDriver.rampDurationMs=B*1e3,p.autoDriver.mouse&&(p.autoDriver.mouse.autoIntensity=A,p.autoDriver.mouse.takeoverDuration=k)),S!==G&&T.resize()},[c,n,g,h,a,u,x,F,S,M,E,R,A,k,j,B]),r.jsx("div",{ref:U,className:`liquid-ether-container ${de||""}`,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none",...he}})}function it(){const c=typeof window<"u"&&(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||window.innerWidth<=768);return r.jsxs("div",{className:"homepage-container",children:[r.jsx(tt,{colors:["#5227FF","#FF9FFC","#B19EEF"],mouseForce:c?18:24,cursorSize:c?80:100,isViscous:!0,viscous:30,iterationsViscous:c?24:32,iterationsPoisson:c?24:32,resolution:c?.35:.5,isBounce:!1,autoDemo:!0,autoSpeed:c?.4:.5,autoIntensity:2.2,takeoverDuration:.25,autoResumeDelay:3e3,autoRampDuration:.6}),r.jsxs("div",{className:"homepage-content",children:[r.jsx("div",{className:"logo-section",children:r.jsx("img",{src:"/logo.png",alt:"Marapone Contracting Inc. Logo"})}),r.jsxs("div",{className:"welcome-section",children:[r.jsx("h1",{className:"welcome-title",children:"Marapone Contracting Inc."}),r.jsx("p",{className:"welcome-text",children:"Delivering exceptional results with precision and professionalism. Your trusted partner in contracting excellence."})]}),r.jsxs("section",{className:"about-section",children:[r.jsx("h2",{className:"about-title",children:"About Us"}),r.jsxs("div",{className:"about-content",children:[r.jsx("p",{children:"Marapone Contracting Inc. is a trusted leader in the contracting industry, delivering exceptional results with precision and professionalism. With years of experience and a commitment to excellence, we bring your vision to life through quality craftsmanship and reliable service."}),r.jsx("p",{children:"Our team combines expertise with innovation, ensuring every project meets the highest standards. We take pride in building lasting relationships with our clients and delivering solutions that exceed expectations."})]})]})]})]})}function rt(){return r.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"2rem",backgroundColor:"#0a0e1a",color:"#ffffff"},children:[r.jsx("h1",{style:{fontSize:"6rem",marginBottom:"1rem",fontWeight:"bold"},children:"404"}),r.jsx("h2",{style:{fontSize:"2rem",marginBottom:"1rem"},children:"Page Not Found"}),r.jsx("p",{style:{marginBottom:"2rem",color:"#e0e0e0",fontSize:"1.1rem"},children:"The page you're looking for doesn't exist."}),r.jsx(je,{to:"/",style:{display:"inline-block",padding:"0.75rem 2rem",backgroundColor:"#4da6ff",color:"#fff",textDecoration:"none",borderRadius:"4px",transition:"background-color 0.3s",fontSize:"1rem"},onMouseEnter:c=>c.target.style.backgroundColor="#3d8fdd",onMouseLeave:c=>c.target.style.backgroundColor="#4da6ff",children:"Go Home"})]})}function st(){return r.jsx(Be,{children:r.jsx(le,{children:r.jsxs(Le,{children:[r.jsx(ie,{path:"/",element:r.jsx(it,{})}),r.jsx(ie,{path:"*",element:r.jsx(rt,{})})]})})})}P.createRoot(document.getElementById("root")).render(r.jsx(ae.StrictMode,{children:r.jsx(le,{children:r.jsx(st,{})})}));
