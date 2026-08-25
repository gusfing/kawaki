const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RacingScreen-CBXrd1jw.js","assets/components-CPMWcV2E.js","assets/index-DAmBVkoj.js","assets/constants-BmwGoqyb.js","assets/index-bjA0uzHd.js","assets/CustomEase-C6TodC71.js","assets/SoundToggle-Bo8RyjO9.js","assets/ConsoleArt-DTkB5pEo.js","assets/ResultsScreen-D-jknkkV.js","assets/index-BB7DeWDn.js","assets/client-DUo4tr1U.js"])))=>i.map(i=>d[i]);
var hu=Object.defineProperty;var du=(t,e,n)=>e in t?hu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Pt=(t,e,n)=>du(t,typeof e!="symbol"?e+"":e,n);import{r as S,j as _,C as fu,y as di,H as mu}from"./components-CPMWcV2E.js";import{s as tn,Q as le,V as R,x as Ye,aB as Dt,aC as qe,H as nn,aD as z,aa as ze,aE as as,e as re,p as $,aF as fi,aG as Ja,d as Yt,ad as pu,_ as gu,n as je,aH as gt,aI as Sr,aJ as cs,ab as Ya,aK as Fn,as as vu,a4 as yu,a5 as It,G as Pn,aj as kt,ak as Mt,aL as wu,aM as Su,ax as ls,aN as Qa,au as qs,al as Ks,aO as Nn,av as _u,aw as bu,aP as Pu,P as Tu,a9 as Un,j as Za,a8 as Le,a6 as ec,aQ as tc,N as Ct,l as At,I as Iu,aR as Au,L as Eu,aS as Fo,aT as Cu,i as xu,af as Ru,aU as mi,t as ku,c as ve,aV as Mu,aW as nc,aX as Du,aY as Ou,aZ as Lu,C as Fu,aA as Nu,B as Uu}from"./index-DAmBVkoj.js";import{c as rn,_ as pi}from"./constants-BmwGoqyb.js";import{N as ju,E as Vu,u as Bu,A as zu,d as $u}from"./ConsoleArt-DTkB5pEo.js";var rt=(t=>(t[t.notColliding=-1]="notColliding",t[t.collidingOnTheRight=0]="collidingOnTheRight",t[t.collidingOnTheLeft=1]="collidingOnTheLeft",t))(rt||{}),Ue=(t=>(t[t.notJumping=-1]="notJumping",t[t.ramp=0]="ramp",t[t.moon=1]="moon",t))(Ue||{}),Tt=(t=>(t[t.Beach=0]="Beach",t[t.Underwater=1]="Underwater",t[t.Moon=2]="Moon",t[t.None=3]="None",t))(Tt||{}),Qe=(t=>(t[t.SplashScreen=0]="SplashScreen",t[t.RacingScreen=1]="RacingScreen",t[t.ResultsScreen=2]="ResultsScreen",t))(Qe||{});const Q=rn(tn(t=>({prevPosition:new R(0,0,0),position:new R(0,1,0),velocity:new R(0,0,0),prevVelocity:new R(0,0,0),orientation:new le,prevOrientation:new le,forward:new R(-1,0,0),up:new R(0,1,0),right:new R(0,0,1),speed:0,segmentIndex:0,collisionState:rt.notColliding,normalizedProgress:0,rightFrontTireTrailTarget:null,leftFrontTireTrailTarget:null,rightBackTireTrailTarget:null,leftBackTireTrailTarget:null,rightTailLightTrailTarget:null,leftTailLightTrailTarget:null,velocityAlignedQuaternion:new le,shadowCameraTarget:null,isInJump:!1,isBraking:!1,currentJumpType:Ue.notJumping,lastCollisionEvent:null,isDrifting:!1,setPosition:(e,n,r)=>{t(i=>({prevPosition:i.position.clone(),position:new R(e,n,r)}))},debugSegment:0,setVelocity:(e,n,r)=>{const i=new R(e,n,r),o=i.length()*3.6;t(c=>({prevVelocity:c.velocity.clone(),velocity:i,speed:o}))},setOrientation:e=>{t(n=>({prevOrientation:n.orientation.clone(),orientation:e,forward:new R(0,0,1).applyQuaternion(e),up:new R(0,1,0).applyQuaternion(e),right:new R(1,0,0).applyQuaternion(e)}))},setSegmentIndex:e=>t({segmentIndex:e}),setCollisionState:e=>t({collisionState:e}),setNormalizedProgress:e=>t({normalizedProgress:e}),setRightFrontTireTrailTarget:e=>t({rightFrontTireTrailTarget:e}),setLeftFrontTireTrailTarget:e=>t({leftFrontTireTrailTarget:e}),setRightBackTireTrailTarget:e=>t({rightBackTireTrailTarget:e}),setLeftBackTireTrailTarget:e=>t({leftBackTireTrailTarget:e}),setRightTailLightTrailTarget:e=>t({rightTailLightTrailTarget:e}),setLeftTailLightTrailTarget:e=>t({leftTailLightTrailTarget:e}),setVelocityAlignedQuaternion:e=>t({velocityAlignedQuaternion:e}),setShadowCameraTarget:e=>t({shadowCameraTarget:e}),setDebugSegment:e=>t({debugSegment:e}),setCurrentJumpType:e=>t({currentJumpType:e,isInJump:e!==Ue.notJumping}),setLastCollisionEvent:e=>t({lastCollisionEvent:e}),setIsDrifting:e=>t({isDrifting:e}),setIsBraking:e=>t({isBraking:e})})));new R;const No=(t,e,n)=>{const r=new Ye;return r.makeBasis(n,e,t),new le().setFromRotationMatrix(r)},Gu=(t,e,n,r)=>{const i=Dt(t),o=Dt(e),c=n*o,h=(Math.random()*2-1)*i,u=Math.sin(h),d=Math.sin(c),y=Math.sqrt(Math.max(0,1-u*u-d*d));r.set(u,d,y),r.normalize()};function Wu(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}const Hu=`uniform float time;
const float duration = 0.15;
const float speed = 10.0;

attribute float startTime;
attribute vec3 spawnPosition;
attribute vec3 direction;
attribute float scaleX;
attribute float scaleY;

varying vec2 vUv;
varying float vLifetime;

void main() {
  vUv = uv;
  vLifetime = clamp((time - startTime) / duration, 0.0, 1.0);

  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    gl_Position = vec4(0.0);
    return;
  }

  vec3 particlePosition = spawnPosition;
  // Move the particle along the direction vector
  particlePosition += direction * vLifetime * speed;

  vec3 forward = normalize(direction);
  vec3 toCameraVector = normalize(cameraPosition - particlePosition);
  vec3 right = normalize(cross(forward, toCameraVector));
  // Orient the particle along the direction vector while at the same time making it face the camera
  vec3 orientedPosition = position.x * right * scaleX +
    position.y * forward * scaleY;

  gl_Position = projectionMatrix * viewMatrix * vec4(particlePosition + orientedPosition, 1.0);
}
`,qu=`const vec3 color = vec3(1.0, 0.5921619230803884, 0.1411817510240882);
const float bloomIntensity = 8.0;
const float alphaBloomIntensity = 5.4;
const float sparkWidthInUVSpace = 0.05;

varying vec2 vUv;
varying float vLifetime;

void main() {
  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    discard;
  }

  // Create a thin rectangle with rounded edges at top and bottom
  float cornerRadius = sparkWidthInUVSpace * 0.5;

  float horizontalDistanceFromCenter = abs(vUv.x - 0.5) / (sparkWidthInUVSpace * 0.5);
  bool inTopEnd = vUv.y < cornerRadius;
  bool inBottomEnd = vUv.y > (1.0 - cornerRadius);

  if(inTopEnd || inBottomEnd) {
    float circleCenter = inTopEnd ? cornerRadius : (1.0 - cornerRadius);
    float distanceToCircleCenter = length(vec2(vUv.x - 0.5, vUv.y - circleCenter));
    if(distanceToCircleCenter > cornerRadius) {
      // Outside the rounded edge
      discard;
    }
  } else if(horizontalDistanceFromCenter > 1.0) {
    // Outside the rectangle
    discard;
  }

  gl_FragColor = vec4(color * bloomIntensity, 1.0 * alphaBloomIntensity);
}
`,Ku=new R,Uo=new R,Xu=new R,Ju=new R,Yu=new R,Qu=new R,Zu=new R,eh=new R,th=new R,nh=new R,rh=new le;function sh(){const n=S.useMemo(()=>[-.7995,.418,.6825],[]),r=25,i=150,o=!1,c=2,h=.15,u=.1,d=3.45,y=10,P=.04,k=.3,A=1.94,E=80,I=12.5,C=12.5,F=S.useMemo(()=>{const N=new qe(new Float32Array(4500),9),v=new nn(.01,.01);return v.setAttribute("startTime",new z(N,1,0)),v.setAttribute("spawnPosition",new z(N,3,1)),v.setAttribute("direction",new z(N,3,4)),v.setAttribute("scaleX",new z(N,1,7)),v.setAttribute("scaleY",new z(N,1,8)),v},[]),M=S.useMemo(()=>new ze({uniforms:{time:{value:0}},vertexShader:Hu,fragmentShader:qu,transparent:!0,blending:as}),[]),O=S.useMemo(()=>Array.from({length:500},()=>({t:1,startTime:0})),[]),U=S.useCallback((N,v)=>{const g=F.attributes.startTime.data,f=g.array,b=v.length;let p=0;for(let T=0;T<b;T++){for(;p<500;){const V=O[p];if(V.t=(N-V.startTime)/h,V.t>=1)break;p++}if(p>=500)break;const w=v[T];f[p*9+0]=w.startTime,f[p*9+1]=w.spawnPosition[0],f[p*9+2]=w.spawnPosition[1],f[p*9+3]=w.spawnPosition[2],f[p*9+4]=w.direction[0],f[p*9+5]=w.direction[1],f[p*9+6]=w.direction[2],f[p*9+7]=A+Math.random()*I,f[p*9+8]=E+Math.random()*C,O[p].t=0,O[p].startTime=w.startTime,p++}g.needsUpdate=!0},[O,F]),L=S.useCallback((N,v,g)=>{const{position:f,orientation:b,velocity:p,speed:T,velocityAlignedQuaternion:w}=Q.getState(),V=Ku;V.copy(f),N===rt.collidingOnTheRight&&!o?V.add(Uo.set(n[0],n[1],n[2]).applyQuaternion(b)):(N===rt.collidingOnTheLeft||o)&&V.add(Uo.set(n[0]*-1,n[1],n[2]).applyQuaternion(b));const q=Xu.set(1,0,0).applyQuaternion(w).normalize(),B=Ju.set(0,1,0).applyQuaternion(w).normalize(),G=rh.setFromUnitVectors(Yu.set(0,0,1),Qu.copy(p).normalize().multiplyScalar(-1));let ee=(Math.min(Math.max(T,r),i)-r)/(i-r);const he=Math.floor(g*1e3*c*ee),ie=[];for(let de=0;de<he;de++){const Ce=(Math.random()*2-1)*P,ue=(Math.random()*2-1)*k,te=Zu.copy(V).add(eh.copy(q).multiplyScalar(Ce)).add(th.copy(B).multiplyScalar(ue)),Y=ue/k,W=nh;Gu(d,y,Y,W),W.applyQuaternion(G),W.normalize(),ie.push({startTime:v+Math.random()*u,spawnPosition:[te.x,te.y,te.z],direction:[W.x,W.y,W.z]})}U(v,ie)},[n,o,U]);return re((N,v)=>{const g=N.clock.elapsedTime,{collisionState:f,isInJump:b}=Q.getState();(f!==rt.notColliding&&!b||o)&&L(f,g,Math.min(v,.1)),M.uniforms.time.value=g}),_.jsx("instancedMesh",{args:[F,M,500],frustumCulled:!1})}var we=(t=>(t[t.Collision=0]="Collision",t[t.Drift=1]="Drift",t[t.Crash=2]="Crash",t[t.Splash=3]="Splash",t[t.SplashOut=4]="SplashOut",t[t.Launch=5]="Launch",t[t.Landing=6]="Landing",t[t.Cheer=7]="Cheer",t[t.Sparkle=8]="Sparkle",t[t.CarEngine=9]="CarEngine",t[t.EngineStart=10]="EngineStart",t[t.Music=11]="Music",t[t.ChaChing=12]="ChaChing",t[t.KonamiCode=13]="KonamiCode",t[t.Underwater=14]="Underwater",t))(we||{});const dt={0:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/crashing_rail_loop_02.mp3?v=1747680790",volume:1.25},10:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/carstart.mp3?v=1747716452",volume:.5},1:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/tire_drift_loop_01.mp3?v=1747159547",volume:.5},2:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/ramp_02.mp3?v=1747773614",volume:.75},3:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/splash_01.mp3?v=1747178566",volume:.6},4:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/splash_out_01.mp3?v=1747660269",volume:.7},5:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/boost_02.mp3?v=1747774009",volume:.6},6:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/landing_01.mp3?v=1747660262"},7:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/crowd_cheers_01.mp3?v=1747173507",volume:.6},8:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/crystal_cave_01.mp3?v=1747170749",volume:.2},9:{url:"/cdn.shopify.com/s/files/1/0884/4086/5047/files/carengine3.mp3?v=1747546320",volume:.3},11:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/beach_song.mp3?v=1747718397",volume:.3},12:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/trophy_win_03.mp3?v=1747773614",volume:.7},13:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/trophy_win_02.mp3?v=1747750259",volume:.7},14:{url:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/underwater_loop_01.mp3?v=1747774589",volume:2}},lr=rn(tn(t=>({addSoundToQueue:()=>{},isAudioEnabled:!1,setAddSoundToQueue:e=>t({addSoundToQueue:e}),setIsAudioEnabled:e=>t({isAudioEnabled:e}),isMuted:!1,setIsMuted:e=>t({isMuted:e})}))),ft=8,ih=15,oh=3,ah=Dt(40),ch=.2,lh=3,uh=3,rc=250,jo=.2,Vo=600,xn=1/60,_r={inputs:-5,car:-4,otherCar:-3,camera:-2,audio:-1},ne={firstJump:.223,signBreak:.234,secondJump:.49,firstShark:.435,secondShark:.452,fadeOutSpeedLines:.478,fadeInMoonshotSpeedLines:.4955,exitTheWater:.54,moonApex:.57,loadMoon:.59,spaceRollStart:.58,spaceRollEnd:.635,fadeInNormalSpeedLines:.65,moon:.68,turnOnFinishLineEffects:.8,moveEarthToCinematicLocation:.9,finishLine:.9764},mr={ramp:{start:.229,end:.262},moon:{start:.492,end:.68}},hh=new R(0,-1,0),sc=new $(15701092),Xs=new $(92550),ic=new $("#11192a").convertLinearToSRGB(),dh=15,fh=100,Ds={skip:{startPos:[0,0,0],endPos:[0,0,0],rotation:[0,0,0]},1:{startPos:[1,.6,0],endPos:[0,0,0],rotation:[0,0,0]},2:{startPos:[43,26.8,-39.2],endPos:[43,27.3,-39.2],rotation:[0,2.2,0]},3:{startPos:[34.6,27,-33.8],endPos:[36,27,-33.8],rotation:[0,-.9,0]},4:{startPos:[42.5,27,-35.8],endPos:[42.5,27,-36.5],rotation:[0,1.514,0]}},mh=1e3/20,Js=240*1e3,ph=[{position:.2312,sound:we.Crash},{position:.252,sound:we.Splash},{position:.495,sound:we.Launch},{position:.655,sound:we.Landing},{position:ne.exitTheWater,sound:we.SplashOut}],gh=15,Bo=6,zo=10,Os=(t,e,n)=>{const r=t.segments,i=Math.max(0,(n??0)-zo),o=Math.min(r.length-2,(n??0)+zo);let c;for(let h=i;h<=o;h++){const u=r[h],d=r[h+1],y=u.tangent,P=e.clone().sub(u.position).dot(y)/u.length,k=u.normal.clone().lerp(d.normal,P).normalize(),A=new R().crossVectors(y,k).normalize(),E=e.clone().sub(u.position).dot(A)/A.lengthSq(),I=u.position.clone().add(y.clone().multiplyScalar(P*u.length)).add(A.clone().multiplyScalar(E)),C=r[r.length-1].cumulativeLength,F=r[h].length,M=(r[h].cumulativeLength+P*F)/C;if(c={segmentIndex:h,nearestTrackPosition:I,distanceAlongSegment:P,distanceToCenterLine:E,normal:k,binormal:A,tangent:y,normalizedDistanceOfPoint:M},P<1)break}return c},vh=(t,e)=>{const r=t.segments.findIndex(i=>i.cumulativeLength>e*t.trackLength);return Math.max(0,r-1)},yh=t=>{const e=t;let n=0;return{segments:e.map((i,o)=>{let c;o<e.length-1?c=new R(-e[o+1][0][0]+i[0][0],e[o+1][0][2]-i[0][2],e[o+1][0][1]-i[0][1]):c=new R(-i[0][0]+e[o-1][0][0],i[0][2]-e[o-1][0][2],i[0][1]-e[o-1][0][1]);const h=c.length(),u=n;n+=h,c.normalize();const d=new R(-i[1][0],i[1][2],i[1][1]).normalize(),y=new R().crossVectors(c,d).normalize();return{position:new R(-i[0][0],i[0][2],i[0][1]),normal:d,tangent:c,binormal:y,length:h,cumulativeLength:u}}),width:t.width??ih,trackLength:n,startSegment:t.start_point??0,jumps:t.jumps??[]}},K=rn(tn(t=>({track:{segments:[],width:0,startSegment:0,trackLength:0,jumps:[mr.ramp,mr.moon]},countdownNumber:3,raceStartTime:null,raceEndTime:null,isCameraUnderwater:!1,isCameraInMoonArea:!1,gameScreen:Qe.SplashScreen,raceCount:0,rainbowMode:!1,setIsCameraUnderwater:e=>{t({isCameraUnderwater:e})},setIsCameraInMoonArea:e=>{t({isCameraInMoonArea:e})},loadedScene:Tt.Beach,setLoadedScene:e=>{t({loadedScene:e})},setTrack:e=>{t(n=>{var r;return{track:{...e,jumps:((r=n.track)==null?void 0:r.jumps)||[]}}})},setTrackWidth:e=>{t(n=>({track:{...n.track,width:e}}))},startRace:()=>t({raceStartTime:performance.now(),raceEndTime:null}),endRace:()=>t({raceEndTime:performance.now()}),resetRace:()=>t(e=>({raceStartTime:null,raceEndTime:null,raceCount:e.raceCount+1})),setGameScreen:e=>{e===Qe.SplashScreen?t(n=>(n.resetRace(),{gameScreen:e})):t({gameScreen:e})},incrementRaceCount:()=>t(e=>({raceCount:e.raceCount+1})),setCountdownNumber:e=>t({countdownNumber:e}),setRainbowMode:e=>t({rainbowMode:e}),hasShadersCompiled:!1,setHasShadersCompiled:e=>{t({hasShadersCompiled:e})}}))),us=t=>K(e=>e.gameScreen===t),wh=()=>K(t=>t.raceCount),oc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/track_data_39_condensed_2.json?v=1747537577";function Sh(){const t=fi(Ja,oc);return S.useEffect(()=>{if(t)try{const e=yh(JSON.parse(t));K.getState().setTrack(e)}catch(e){console.error("Error parsing track:",e)}},[t]),null}var Re=(t=>(t.Left="Left",t.Right="Right",t.Up="Up",t.Down="Down",t.A="A",t.B="B",t.Y="Y",t.X="X",t.Start="Start",t))(Re||{});const Ge=rn(tn(t=>({Left:!1,Right:!1,Up:!1,Down:!1,A:!1,B:!1,Y:!1,X:!1,Start:!1,joystick:{x:0,y:0},triggers:{left:0,right:0},setState:e=>t(e),setButtonDown:e=>t(n=>({...n,[e]:!0})),setButtonUp:e=>t(n=>({...n,[e]:!1})),setJoystick:(e,n)=>t(r=>({...r,joystick:{x:Math.max(-1,Math.min(1,e)),y:Math.max(-1,Math.min(1,n))}})),resetInputs:()=>t(e=>({...e,Left:!1,Right:!1,Up:!1,Down:!1,A:!1,B:!1,Y:!1,X:!1,Start:!1,joystick:{x:0,y:0},triggers:{left:0,right:0}})),setTriggers:(e,n)=>t(r=>({...r,triggers:{left:e,right:n}}))}))),_h=t=>Ge(t),Kr=rn(tn((t,e)=>({accumulator:0,physicsStep:0,progressToNextStep:0,processSteps:(n,r)=>{let o=e().accumulator;const c=Math.min(.25,n);for(o+=c;o>=xn;)r(xn),o-=xn,t(u=>({physicsStep:u.physicsStep+1}));const h=o/xn;return t({accumulator:o,progressToNextStep:h}),h}}))),bh=t=>typeof t=="function",Ys=S.forwardRef(({envMap:t,resolution:e=256,frames:n=1/0,makeDefault:r,children:i,...o},c)=>{const h=Yt(({set:C})=>C),u=Yt(({camera:C})=>C),d=Yt(({size:C})=>C),y=S.useRef(null);S.useImperativeHandle(c,()=>y.current,[]);const P=S.useRef(null),k=pu(e);S.useLayoutEffect(()=>{o.manual||(y.current.aspect=d.width/d.height)},[d,o]),S.useLayoutEffect(()=>{y.current.updateProjectionMatrix()});let A=0,E=null;const I=bh(i);return re(C=>{I&&(n===1/0||A<n)&&(P.current.visible=!1,C.gl.setRenderTarget(k),E=C.scene.background,t&&(C.scene.background=t),C.gl.render(C.scene,y.current),C.scene.background=E,C.gl.setRenderTarget(null),P.current.visible=!0,A++)}),S.useLayoutEffect(()=>{if(r){const C=u;return h(()=>({camera:y.current})),()=>h(()=>({camera:C}))}},[y,r,h]),S.createElement(S.Fragment,null,S.createElement("perspectiveCamera",gu({ref:y},o),!I&&i),S.createElement("group",{ref:P},I&&i(k.texture)))}),Xr=rn(tn(t=>({active:!1,shadowCameraTarget:null,setShadowCameraTarget:e=>t({shadowCameraTarget:e}),setActive:e=>t({active:e})}))),ac="/cdn.shopify.com/3d/models/f8a9f3a5bf9c4615/racing_game_car_18.glb",gi=S.forwardRef((t,e)=>{const n=S.useRef(null),r=S.useRef(null),i=S.useRef(null),o=S.useRef(null),c=S.useRef(null),h=S.useRef(null),u=S.useRef(null),d=S.useRef(null),y=S.useRef(null),P=S.useRef(null),k=S.useRef(null),A=S.useRef(null),{nodes:E,materials:I}=je(ac),C=I["palette car"].clone();C.depthWrite=!0,C.transparent=!1,C.emissive.set("#0033ff"),C.emissiveIntensity=.2,C.transparent=!0,C.opacity=.4,I["palette car"].transparent=!1,I["palette car"].depthWrite=!0;const F=6,M=8,O=8,U=8;return S.useImperativeHandle(e,()=>({updateVisuals:(L,N,v,g,f,b,p,T,w,V)=>{if(!n.current||!r.current||!c.current||!u.current||!o.current||!h.current||!P.current||!k.current||!i.current)return;if(n.current.position.copy(N),n.current.quaternion.copy(v),V>mr.moon.start&&V<mr.moon.end){const de=Sr(cs(ne.spaceRollStart,ne.spaceRollEnd,V),0,1);i.current.rotation.z=Wu(de)*2*Math.PI}else i.current.rotation.z=0;c.current.rotation.y=gt(c.current.rotation.y,ah*-b,oh,L),u.current.rotation.y=c.current.rotation.y;const J=Math.abs(g)*L/ch*Math.sign(g);c.current.rotation.x+=J,u.current.rotation.x+=J,o.current.rotation.x+=J,h.current.rotation.x+=J,P.current.visible=T,k.current.visible=!T;const ee=Math.min(Math.max(-F,p*M*(1-w)),F);r.current.rotation.x=gt(r.current.rotation.x,-Dt(ee),lh,L);const he=Math.min(1,Math.abs(f)/10)*U,ie=Math.min(Math.max(-O,-b*he),O);r.current.rotation.z=gt(r.current.rotation.z,Dt(ie),uh,L)}})),S.useEffect(()=>{A.current&&(t.ghostCar?Xr.getState():Q.getState()).setShadowCameraTarget(A.current)},[t.ghostCar]),S.useEffect(()=>{if(!t.ghostCar&&u.current&&c.current&&h.current&&o.current){const L=Q.getState();L.setRightFrontTireTrailTarget(u.current),L.setLeftFrontTireTrailTarget(c.current),L.setRightBackTireTrailTarget(h.current),L.setLeftBackTireTrailTarget(o.current),L.setRightTailLightTrailTarget(d.current),L.setLeftTailLightTrailTarget(y.current)}},[t.ghostCar]),_.jsx(_.Fragment,{children:_.jsx("group",{ref:n,children:_.jsxs("group",{dispose:null,ref:i,position:[0,0,0],scale:1,children:[_.jsxs("group",{position:[-.67,.252,-.718],ref:h,"rotation-order":"YXZ",children:[_.jsx("mesh",{geometry:E.right_tire_rear_1.geometry,material:I["palette car"]}),_.jsx("mesh",{geometry:E.right_tire_rear_2.geometry,material:I["headlight neon yellow"]})]}),_.jsxs("group",{position:[-.645,.252,1.085],ref:u,"rotation-order":"YXZ",children:[_.jsx("mesh",{geometry:E.right_tire_front_1.geometry,material:I["palette car"]}),_.jsx("mesh",{geometry:E.right_tire_front_2.geometry,material:I["headlight neon yellow"]})]}),_.jsxs("group",{position:[.67,.252,-.718],ref:o,"rotation-order":"YXZ",children:[_.jsx("mesh",{geometry:E.left_tire_rear_1.geometry,material:I["palette car"]}),_.jsx("mesh",{geometry:E.left_tire_rear_2.geometry,material:I["headlight neon yellow"]})]}),_.jsxs("group",{position:[.645,.252,1.085],ref:c,"rotation-order":"YXZ",children:[_.jsx("mesh",{geometry:E.left_tire_front_1.geometry,material:I["palette car"]}),_.jsx("mesh",{geometry:E.left_tire_front_2.geometry,material:I["headlight neon yellow"]})]}),_.jsxs("group",{ref:r,children:[_.jsxs("group",{position:[0,.425,.201],children:[_.jsx("mesh",{geometry:E.body_1.geometry,material:t.ghostCar?C:I["palette car"]}),_.jsx("mesh",{geometry:E.body_3.geometry,material:I["headlight neon yellow"]}),_.jsx("mesh",{geometry:E.body_2.geometry,ref:P,children:_.jsx("meshStandardMaterial",{color:[5.9,.1,0],emissive:[2,.05,0],emissiveIntensity:7})}),_.jsx("mesh",{geometry:E.body_2.geometry,ref:k,children:_.jsx("meshStandardMaterial",{color:[1.5,.1,0],emissive:[.7,.02,0],emissiveIntensity:5})})]}),_.jsx("group",{ref:d,position:[-.3995,.518,-1.3175]}),_.jsx("group",{ref:y,position:[.396,.518,-1.3175]}),_.jsx("group",{ref:A,position:[0,1,.3],rotation:[-Math.PI*.5,0,0]})]})]})})})});gi.displayName="CarModel";je.preload(ac);function Ph(){const t=S.useRef(null),e=K(A=>A.track),n=wh(),r=30,i=1,o=.8,c=2.5,h=250,u=1.5,d=4,y=.45,P=S.useCallback(A=>{const E=K.getState(),I=Q.getState();if(!E.track||!I)return;let C;A?C=vh(E.track,A):C=E.track.startSegment||25;const F=E.track.segments[C];I.setOrientation(No(F.tangent,F.normal,F.binormal).multiply(new le().setFromEuler(new Ya(0,-Math.PI,0)))),I.setPosition(F.position.x,F.position.y,F.position.z),I.setSegmentIndex(C),I.setVelocity(0,0,0)},[]);S.useEffect(()=>{n>0&&P()},[n,P]),S.useEffect(()=>{P()},[P,e==null?void 0:e.segments]),S.useEffect(()=>{const A=()=>{if(document.hidden)return;const E=Q.getState(),I=Ge.getState();E&&!E.isInJump&&E.setVelocity(0,0,0),I&&I.resetInputs&&I.resetInputs()};return window.addEventListener("focus",A),document.addEventListener("visibilitychange",A),()=>{document.removeEventListener("visibilitychange",A),window.removeEventListener("focus",A)}},[]);const k=A=>{var In;if(!e||e.segments.length===0)return;const E=Ge.getState(),I=Q.getState(),{position:C,velocity:F,forward:M,up:O,collisionState:U,normalizedProgress:L}=I,v=K.getState().raceStartTime!==null,g=K.getState().raceEndTime!==null,f=F.clone(),b=M.clone(),p=C.clone(),T=(In=e.jumps)==null?void 0:In.findIndex(_e=>L>=_e.start&&L<=_e.end),w=T!==Ue.notJumping,V=E.triggers.left>0,q=new R;let B=0;if(v&&!g)if(w)B=1;else if(V){const _e=E.triggers.right>0?.12:1;B=-E.triggers.left*_e}else B=E.triggers.right;const G=M.clone().multiplyScalar(B*r);q.add(G);const ee=f.clone().projectOnVector(M).multiplyScalar(-.4*(U!==rt.notColliding?c:1)*(w?.25:1));q.add(ee);const he=f.clone().projectOnVector(M),de=f.clone().sub(he).clone().multiplyScalar(-.25);q.add(de),f.add(q.multiplyScalar(A));const Ce=f.length(),ue=h/3.6,te=Ce/ue;let Y=ue;switch(T){case Ue.ramp:Y=ue*u;break;case Ue.moon:Y=ue*d;break;default:Y=ue}if(Ce>Y){const _e=f.length(),Ut=Fn(_e,Y,.05);f.normalize().multiplyScalar(Ut)}if(V){const _e=f.dot(M);_e<0&&f.sub(M.clone().multiplyScalar(_e))}p.add(f.clone().multiplyScalar(A));const W=i*vu(te,0,.2),X=v&&!g?-E.joystick.x*A*W*(w?0:1):0,Te=I.segmentIndex,Ie=e.segments[Te].tangent;if(b.applyAxisAngle(O,X),w)b.copy(Ie);else{const _e=b.dot(Ie);_e<y&&b.add(Ie.clone().multiplyScalar(y-_e)).normalize()}const{segmentIndex:be,nearestTrackPosition:Ae,normal:Me,normalizedDistanceOfPoint:Se}=Os(e,p,I.segmentIndex);p.copy(Ae);const Ne=new R().crossVectors(Me,b).normalize();b.crossVectors(Ne,Me).normalize();const Ze=p.clone().add(b.clone().multiplyScalar(1)),De=p.clone().add(b.clone().multiplyScalar(-1)),ye=Os(e,Ze,I.segmentIndex),se=Os(e,De,I.segmentIndex);if(b.copy(ye.nearestTrackPosition.clone().sub(se.nearestTrackPosition.clone()).normalize()),T===Ue.ramp){const _e=Math.max(0,hh.dot(b)+.3);b.copy(I.forward.clone().lerp(b.applyQuaternion(new le().setFromAxisAngle(I.right.clone(),Dt(6*_e))),.15))}const pe=new R().crossVectors(Me,b).normalize(),Ke=new R().crossVectors(b,pe).normalize(),Xe=No(b,Ke,pe);f.lerp(M.clone().multiplyScalar(f.length()),.045);const et=Math.abs(ye.distanceToCenterLine)+o-e.width*.5,ct=Math.abs(se.distanceToCenterLine)+o-e.width*.5;if(et>0||ct>0){if(f.length()>1){const Fe=f.clone().clampLength(0,60).length()/60;Q.getState().setLastCollisionEvent({intensity:Fe,timestamp:performance.now()})}const _e=new R(0,0,0);if(et>0){const Fe=-Math.sign(ye.distanceToCenterLine),Ut=ye.binormal.clone().multiplyScalar(et*Fe*Vo*A);_e.add(Ut);const bt=f.dot(ye.binormal.clone().multiplyScalar(Fe));bt<0&&f.sub(ye.binormal.clone().multiplyScalar(bt*Fe))}if(ct>0){const Fe=-Math.sign(se.distanceToCenterLine),Ut=se.binormal.clone().multiplyScalar(ct*Fe*Vo*A);_e.add(Ut);const bt=f.dot(se.binormal.clone().multiplyScalar(Fe));bt<0&&f.sub(se.binormal.clone().multiplyScalar(bt*Fe))}f.add(_e)}I.setSegmentIndex(be),I.setNormalizedProgress(Se),et>0||ct>0?I.setCollisionState(ye.distanceToCenterLine>0||se.distanceToCenterLine>0?rt.collidingOnTheRight:rt.collidingOnTheLeft):I.setCollisionState(rt.notColliding),I.setPosition(p.x,p.y,p.z),I.setVelocity(f.x,f.y,f.z),I.setOrientation(Xe);const lt=new R(0,1,0).applyQuaternion(Xe),sn=new R(0,0,1).applyQuaternion(Xe),qn=f.clone().normalize().projectOnPlane(lt),Tn=qn.angleTo(sn),gs=Tn*Math.sign(new R().crossVectors(sn,qn).dot(lt)),vs=new le().setFromAxisAngle(new R(0,1,0),gs);I.setVelocityAlignedQuaternion(Xe.clone().multiply(vs)),I.setCurrentJumpType(T);const Cr=Tn*180/Math.PI,on=f.length()*3.6>=fh&&Cr>=dh;I.setIsDrifting(on),I.setIsBraking(V)};return re((A,E)=>{if(!t.current||!e)return;const I=Kr.getState().processSteps(E,k),{position:C,prevPosition:F,orientation:M,prevOrientation:O,velocity:U,prevVelocity:L,forward:N,right:v,speed:g,normalizedProgress:f}=Q.getState(),b=Ge.getState(),p=b.triggers.left>0,T=g/h,w=F.clone().lerp(C,I),V=O.clone().slerp(M,I),q=U.dot(N),B=U.dot(v),G=q-L.dot(N);t.current.updateVisuals(E,w,V,q,B,b.joystick.x,G,p,T,f)},_r.car),_.jsx(_.Fragment,{children:_.jsx(gi,{ref:t})})}const Th=()=>{const t=S.useRef(null),e=()=>{const i=t.current;if(!i)return;const o=i.id.includes("Nintendo")||i.id.includes("057e"),c={[Re.Left]:i.axes[0]<-.1,[Re.Right]:i.axes[0]>.1,[Re.Up]:i.axes[1]<-.1,[Re.Down]:i.axes[1]>.1,[Re.A]:!!i.buttons[o?1:0],[Re.B]:!!i.buttons[o?0:1],[Re.X]:!!i.buttons[o?3:2],[Re.Y]:!!i.buttons[o?2:3],[Re.Start]:!!i.buttons[9],joystick:{x:i.axes[0],y:i.axes[1]},triggers:{left:i.buttons[6],right:i.buttons[7]}};Ge.getState().setState(c)},n=i=>{const{Up:o,Down:c,triggers:h}=Ge.getState();let u=h.right+ft*i*(o?1:-1),d=h.left+ft*i*(c?1:-1);u=Math.max(0,Math.min(1,u)),d=Math.max(0,Math.min(1,d)),Ge.getState().setTriggers(d,u)},r=i=>{const{Left:o,Right:c,Up:h,Down:u,joystick:d}=Ge.getState();let y=d.x,P=d.y;c&&!o?y+=ft*i:o&&!c?y-=ft*i:y=y>0?Math.max(0,y-ft*i):Math.min(0,y+ft*i),u&&!h?P+=ft*i:h&&!u?P-=ft*i:P=P>0?Math.max(0,P-ft*i):Math.min(0,P+ft*i),y=Math.max(-1,Math.min(1,y)),P=Math.max(-1,Math.min(1,P)),Ge.getState().setJoystick(y,P)};return re((i,o)=>{const h=navigator.getGamepads()[0];h?(t.current={id:h.id,axes:[...h.axes],buttons:h.buttons.map(u=>u.value)},e()):(r(o),n(o))},_r.inputs),S.useEffect(()=>{const i=h=>{switch(h){case"ArrowLeft":case"a":case"A":return Re.Left;case"ArrowRight":case"d":case"D":return Re.Right;case"ArrowUp":case"w":case"W":return Re.Up;case"ArrowDown":case"s":case"S":case" ":return Re.Down;case"Escape":return Re.Start;case"Delete":case"Backspace":case"Enter":return Re.Y;default:return null}},o=h=>{if(h.repeat)return;const u=i(h.key);u&&Ge.getState().setButtonDown(u)},c=h=>{const u=i(h.key);u&&Ge.getState().setButtonUp(u)};return window.addEventListener("keydown",o),window.addEventListener("keyup",c),()=>{window.removeEventListener("keydown",o),window.removeEventListener("keyup",c)}},[]),null};function Ih(){return re(()=>{const t=K.getState(),e=Q.getState(),{normalizedProgress:n}=e,r=t.track;!t.raceStartTime||!r||!e||t.raceEndTime||n>=ne.finishLine&&K.getState().endRace()}),null}const Ah=`attribute float side;
attribute float width;

varying vec2 vUv;

const float lineWidth = 0.2;

void main() {
  vUv = uv;
  vec3 offset = normal * (lineWidth * width * 0.5 * side);
  gl_Position = projectionMatrix * viewMatrix * vec4(position + offset, 1.0);
}
`,Eh=`uniform float time;
uniform bool rainbowMode;
const vec3 color = vec3(0.0, 0.0, 0.0);
const float globalOpacity = 0.5;

varying vec2 vUv;

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  if(rainbowMode) {
    float lerpFactor = mod(((1.0 - vUv.x) - time * 1.5) * 2.0, 1.0);
    vec3 rainbowColor = pal(lerpFactor, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
    gl_FragColor = vec4(rainbowColor * 5.0, globalOpacity);
  } else {
    gl_FragColor = vec4(color, globalOpacity);
  }
}
`;class Ch extends yu{constructor(){super();Pt(this,"positions",[]);Pt(this,"normals",[]);Pt(this,"side",[]);Pt(this,"width",[]);Pt(this,"uvs",[]);Pt(this,"indicesArray",[]);Pt(this,"widthCallback");Pt(this,"_attributes")}setPointsAndNormals(n,r,i){this.widthCallback=i!==void 0?i:void 0,this.positions=[],this.normals=[];for(let o=0;o<n.length;o+=3)this.positions.push(n[o],n[o+1],n[o+2]),this.positions.push(n[o],n[o+1],n[o+2]),this.normals.push(r[o],r[o+1],r[o+2]),this.normals.push(r[o],r[o+1],r[o+2]);this.process()}process(){const n=this.positions.length/6;this.side=[],this.width=[],this.indicesArray=[],this.uvs=[];let r;for(let i=0;i<n;i++)if(this.side.push(1),this.side.push(-1),this.widthCallback!==void 0?r=this.widthCallback(i/(n-1)):r=1,this.width.push(r),this.width.push(r),this.uvs.push(i/(n-1),0),this.uvs.push(i/(n-1),1),i<n-1){const o=i*2;this.indicesArray.push(o,o+1,o+2),this.indicesArray.push(o+2,o+1,o+3)}this._attributes?(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indicesArray)),this._attributes.index.needsUpdate=!0,this._attributes.normal.copyArray(new Float32Array(this.normals)),this._attributes.normal.needsUpdate=!0):this._attributes={position:new It(new Float32Array(this.positions),3),side:new It(new Float32Array(this.side),1),width:new It(new Float32Array(this.width),1),uv:new It(new Float32Array(this.uvs),2),index:new It(new Uint16Array(this.indicesArray),1),normal:new It(new Float32Array(this.normals),3)},this.setAttribute("position",this._attributes.position),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("normal",this._attributes.normal),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}}const $o=(t,e=1)=>(t.set(t.subarray(e)),t.fill(-1/0,-e),t),cr=S.forwardRef((t,e)=>{const{target:n,verticalOffset:r=0,attenuation:i,length:o=1,decay:c=1,stride:h=0,interval:u=1}={...t},d=S.useRef(null),y=S.useRef(null),P=S.useRef(new R),k=S.useRef(new le),A=S.useRef(new R(1,0,0)),E=S.useRef(new R),I=S.useRef(0),C=S.useMemo(()=>new Ch,[]),F=S.useMemo(()=>new ze({uniforms:{time:{value:0},rainbowMode:{value:!1}},vertexShader:Ah,fragmentShader:Eh,transparent:!0}),[]),M=S.useRef(!0),O=S.useCallback(()=>{if(n){const{up:L,velocityAlignedQuaternion:N}=Q.getState();n.getWorldPosition(P.current),P.current.addScaledVector(L,r),k.current.copy(N),A.current.set(1,0,0).applyQuaternion(k.current),d.current=Float32Array.from({length:o*10*3},(v,g)=>P.current.getComponent(g%3)),y.current=Float32Array.from({length:o*10*3},(v,g)=>A.current.getComponent(g%3)),C.setPointsAndNormals(d.current,y.current,i)}},[o,i,C,n,r]),U=S.useCallback(L=>{M.current=L},[]);return S.useLayoutEffect(()=>{O()},[O]),re(({clock:L})=>{if(!(!n||!d.current||!y.current||M.current)){if(I.current===0){const{up:N,velocityAlignedQuaternion:v}=Q.getState();n.getWorldPosition(P.current),P.current.addScaledVector(N,r),k.current.copy(v),A.current.set(1,0,0).applyQuaternion(k.current);const g=1*c;if(P.current.distanceTo(E.current)>=h)for(let f=0;f<g;f++)$o(d.current,3),$o(y.current,3),d.current.set(P.current.toArray(),d.current.length-3),y.current.set(A.current.toArray(),y.current.length-3);E.current.copy(P.current)}I.current++,I.current=I.current%u,C.setPointsAndNormals(d.current,y.current,i),F.uniforms.time.value=L.elapsedTime}}),S.useImperativeHandle(e,()=>({resetTrail:O,setFreeze:U})),S.useEffect(()=>{const L=K.subscribe(N=>N.rainbowMode,N=>{F.uniforms.rainbowMode.value=N},{fireImmediately:!0});return()=>{L()}},[F]),_.jsx("mesh",{geometry:C,material:F})});cr.displayName="Trail";function xh(){const n=Q(P=>P.rightFrontTireTrailTarget),r=Q(P=>P.leftFrontTireTrailTarget),i=Q(P=>P.rightBackTireTrailTarget),o=Q(P=>P.leftBackTireTrailTarget),c=S.useRef(!1),h=S.useRef(null),u=S.useRef(null),d=S.useRef(null),y=S.useRef(null);return re(()=>{var k,A,E,I,C,F,M,O,U,L,N,v;const{isDrifting:P}=Q.getState();P&&!c.current?((k=h.current)==null||k.resetTrail(),(A=u.current)==null||A.resetTrail(),(E=d.current)==null||E.resetTrail(),(I=y.current)==null||I.resetTrail(),(C=h.current)==null||C.setFreeze(!1),(F=u.current)==null||F.setFreeze(!1),(M=d.current)==null||M.setFreeze(!1),(O=y.current)==null||O.setFreeze(!1),c.current=!0):!P&&c.current&&((U=h.current)==null||U.setFreeze(!0),(L=u.current)==null||L.setFreeze(!0),(N=d.current)==null||N.setFreeze(!0),(v=y.current)==null||v.setFreeze(!0),c.current=!1)}),_.jsxs(_.Fragment,{children:[_.jsx(cr,{ref:h,target:n,verticalOffset:-.2,length:2,decay:1,stride:0,interval:1}),_.jsx(cr,{ref:u,target:r,verticalOffset:-.2,length:2,decay:1,stride:0,interval:1}),_.jsx(cr,{ref:d,target:i,verticalOffset:-.2,length:2,decay:1,stride:0,interval:1}),_.jsx(cr,{ref:y,target:o,verticalOffset:-.2,length:2,decay:1,stride:0,interval:1})]})}const Rh=`uniform vec3 startPos;
uniform vec3 midCoord1;
uniform vec3 midCoord2;
uniform vec3 endPos;
const float trailWidth = 2.0;
const float trailHeight = 1.13;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

vec3 cubicBezier(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {
  float t1 = 1.0 - t;
  float t1Squared = t1 * t1;
  float t1Cubed = t1Squared * t1;
  float tSquared = t * t;
  float tCubed = tSquared * t;
  return t1Cubed * p0 + 3.0 * t1Squared * t * p1 + 3.0 * t1 * tSquared * p2 + tCubed * p3;
}

void main() {
  vec3 currPoint = cubicBezier(startPos, midCoord1, midCoord2, endPos, uv.y);

  vec3 modelRight = normalize(vec3(modelMatrix[0].x, modelMatrix[0].y, modelMatrix[0].z));
  vec3 modelUp = normalize(vec3(modelMatrix[1].x, modelMatrix[1].y, modelMatrix[1].z));

  vec3 transformedPosition = currPoint +
    position.x * modelRight * trailWidth +
    position.y * modelUp * trailHeight;

  vec4 transformedNormal = modelMatrix * vec4(normal, 0.0);

  gl_Position = projectionMatrix * viewMatrix * vec4(transformedPosition, 1.0);

  vPosition = transformedPosition;
  vNormal = transformedNormal.xyz;
  vUv = uv;
}
`,kh=`uniform float time;
uniform vec3 color;
const float pulseSpeed = 1.0;
const float pulseDensity = 12.56;
const float pulseExponent = 0.25;
uniform float fadeProgress;
const float noiseScaleX = 80.0;
const float noiseScaleY = 0.001;
const float fireSpeed = 1000.0;
const float fireLength = 0.9;
uniform bool rainbowMode;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float ramp(float t) {
  float v = step(0.0, t) * (1.0 - step(1.0, t));
  return smoothstep(0.0, 1.0, (1.0 - t)) * v;
}

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 adjustedUV = vUv;
  adjustedUV.y = 1.0 - adjustedUV.y;

  // Normal
  vec3 normal = normalize(vNormal);
  if(!gl_FrontFacing) {
    normal *= -1.0;
  }

  // Pulse effect
  float pulsePhase = (adjustedUV.y + time * pulseSpeed);
  float pulse = abs(sin(pulsePhase * pulseDensity) * 0.5 + 1.0);
  pulse = pow(pulse, pulseExponent);

  // Fresnel
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.0;
  fresnel = pow(fresnel, 1.0);

  // Falloff
  float falloff = smoothstep(fadeProgress, 0.0, vUv.y);

  // When the trail is close to finish contracting, speed up the falloff
  if(fadeProgress < 0.05) {
    float finalFadeProgress = (0.05 - fadeProgress) / 0.05;
    falloff *= pow(1.0 - finalFadeProgress, 2.0);
  }

  // Fire
  float rampValue = ramp(1.0 - vUv.y);
  vec2 noiseUVs = vUv * vec2(noiseScaleX, noiseScaleY);
  noiseUVs.y -= time * fireSpeed;
  float noise = noise(noiseUVs) * fireLength;
  float fireMask = 1.0 - step(1.0 - rampValue, noise);

  // Holographic
  float holographic = pulse;
  holographic *= fresnel;
  holographic *= falloff * fireMask;

  if(rainbowMode) {
    float lerpFactor = mod(((1.0 - vUv.y) + time * 1.5), 1.0);
    vec3 rainbowColor = pal(lerpFactor, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
    gl_FragColor = vec4(rainbowColor * 2.0, holographic);
  } else {
    gl_FragColor = vec4(color, holographic);
  }
}
`,cc="/cdn.shopify.com/3d/models/2c2f4c6e2f46bc37/trail.glb",Mh=new R,Dh=new R,Oh=new R,Lh=new R,Fh=new R,Nh=new le,Uh=new $("#a36200").convertLinearToSRGB(),Go=new $("#ff3000").convertLinearToSRGB(),Wo=({tailLightTarget:t})=>{const{nodes:e}=je(cc),n=S.useMemo(()=>new ze({uniforms:{startPos:{value:new R(0,0,0)},midCoord1:{value:new R(0,0,0)},midCoord2:{value:new R(0,0,0)},endPos:{value:new R(0,0,0)},time:{value:0},color:{value:Go},fadeProgress:{value:0},rainbowMode:{value:!1}},vertexShader:Rh,fragmentShader:kh,transparent:!0,side:Pn,depthWrite:!1,blending:as}),[]),r=3,i=-.75,o=[5.4,4.2,3],c=[30,37.5,45],h=S.useRef(new R),u=S.useRef(new le),d=S.useRef(Array(r).fill(null).map(()=>new R)),y=S.useRef(null),P=S.useRef(Array(r).fill(null).map(()=>S.createRef())),k=S.useRef(!1),A=S.useRef(!1),E=S.useRef(!1);re((M,O)=>{if(!t||!y.current||!E.current&&!k.current)return;const U=Mh,L=Nh;t.getWorldPosition(U),t.getWorldQuaternion(L),y.current.position.copy(U),y.current.quaternion.copy(L);for(let v=0;v<r;v++){const g=Dh.set(0,0,i*(v+1)).applyQuaternion(L).add(U),f=Oh.set(0,0,0);if(h.current.lengthSq()>0){const V=Lh.set(0,0,i*(v+1)).applyQuaternion(u.current).add(U),q=Fh.copy(g).sub(V),B=c[v]*-1;f.add(q.multiplyScalar(B))}const b=Math.min(O,.1),p=gt(d.current[v].x,f.x,o[v],b),T=gt(d.current[v].y,f.y,o[v],b),w=gt(d.current[v].z,f.z,o[v],b);d.current[v].set(p,T,w),P.current[v].current&&P.current[v].current.position.copy(g).add(d.current[v])}h.current.copy(U),u.current.copy(L),n.uniforms.startPos.value.copy(U),n.uniforms.midCoord1.value.copy(P.current[0].current.position),n.uniforms.midCoord2.value.copy(P.current[1].current.position),n.uniforms.endPos.value.copy(P.current[2].current.position),n.uniforms.time.value=M.clock.getElapsedTime();const{normalizedProgress:N}=Q.getState();N>=ne.exitTheWater&&!A.current?(n.uniforms.color.value=Uh,A.current=!0):N<ne.exitTheWater&&A.current&&(n.uniforms.color.value=Go,A.current=!1),E.current&&(n.uniforms.fadeProgress.value=Sr((Q.getState().speed-50)/170,0,1))});const[I,C]=kt(()=>({from:{progress:0},onChange:()=>{const M=I.progress.get();n.uniforms.fadeProgress.value=M},onRest:()=>{y.current&&I.progress.get()===0&&(y.current.visible=!1,k.current=!1)}}),[n]),F=S.useRef(!1);return S.useEffect(()=>{const M=Q.subscribe(O=>O.currentJumpType,O=>{E.current||(O===Ue.moon?(y.current&&(y.current.visible=!0),C.start({to:{progress:1},delay:250,config:{easing:Mt.easeOutSine,duration:4e3}}),F.current=!0,k.current=!0):O===Ue.notJumping&&F.current&&(C.start({to:{progress:0},config:{easing:Mt.linear,duration:5e3}}),F.current=!1))});return()=>{M()}},[n,C]),S.useEffect(()=>{const M=K.subscribe(O=>O.rainbowMode,O=>{y.current&&(y.current.visible=O),n.uniforms.rainbowMode.value=O,E.current=O},{fireImmediately:!0});return()=>{M()}},[n]),_.jsxs(_.Fragment,{children:[_.jsx("group",{ref:y,visible:!1,children:_.jsx("mesh",{geometry:e.Trail.geometry,material:n,renderOrder:1})}),Array.from({length:r},(M,O)=>_.jsxs("mesh",{ref:P.current[O],visible:!1,renderOrder:1,children:[_.jsx("sphereGeometry",{args:[.015,32,16]}),_.jsx("meshBasicMaterial",{color:"red",depthTest:!1,transparent:!0})]},`lerped-sphere-${O}`))]})};je.preload(cc);function jh(){const t=Q(n=>n.rightTailLightTrailTarget),e=Q(n=>n.leftTailLightTrailTarget);return _.jsxs(_.Fragment,{children:[_.jsx(Wo,{tailLightTarget:t}),_.jsx(Wo,{tailLightTarget:e})]})}const Vh=wu(Su),Bh=`uniform highp sampler2D lut;
uniform bool screenBlend;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 lutColor = vec4(texture(lut, vec2(inputColor.r, 0.5)).r, 
                        texture(lut, vec2(inputColor.g, 0.5)).g, 
                        texture(lut, vec2(inputColor.b, 0.5)).b, 
                        inputColor.a);
    
    if (screenBlend) {
      outputColor = 1.0 - (1.0 - inputColor) * (1.0 - lutColor);
      outputColor.a = inputColor.a; // Preserve original alpha
    } else {
      outputColor = lutColor;
    }
}
`;class zh extends Qa{constructor(e,n,r){super("LUTEffect",Bh,{blendFunction:e,uniforms:new Map([["lut",new qs(n)],["screenBlend",new qs(r)]])})}}const $h=S.forwardRef(function(e,n){const r=S.useMemo(()=>new zh(ls.NORMAL,e.lut,!1),[]);return S.useEffect(()=>{r.uniforms.get("screenBlend").value=e.screenBlend},[r,e.screenBlend]),S.useEffect(()=>{r.uniforms.get("lut").value=e.lut},[r,e.lut]),_.jsx("primitive",{ref:n,object:r})}),Gh=`uniform float factor;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = inputColor;
}

void mainUv(inout vec2 uv) {
  if (factor > 0.0) {
    vec2 distortedUV = uv;
    float frequency = 6.0 * factor;
    float amplitude = 0.015 * factor;  
    float x = distortedUV.y * frequency + time * 0.7; 
    float y = distortedUV.x * frequency + time * 0.3;  
    distortedUV.x += cos(x + y) * amplitude * cos(y);
    distortedUV.y += sin(x - y) * amplitude * cos(y); 
    uv = distortedUV;
  }
}`;class Wh extends Qa{constructor({blendFunction:e=ls.NORMAL,factor:n=0}={}){super("WaterEffect",Gh,{blendFunction:e,uniforms:new Map([["factor",new qs(n)]])})}}const Hh=()=>{const t=S.useMemo(()=>new Wh({blendFunction:ls.NORMAL,factor:0}),[]),e=t.uniforms.get("factor"),[,n]=kt(()=>({from:{factor:0},config:{tension:40,friction:25},onChange:({value:r})=>{e&&(e.value=r.factor)},onRest:()=>{e&&(e.value=0)}}));return S.useEffect(()=>K.subscribe(r=>r.isCameraUnderwater,r=>{r&&n.start({from:{factor:3.8},to:{factor:0}})}),[n]),_.jsx("primitive",{object:t})};function qh(){const t=Ks("/cdn.shopify.com/s/files/1/0921/8919/6588/files/LUT_05_128_2.png?v=1747662787");t.colorSpace=Nn;const e=Ks("/cdn.shopify.com/s/files/1/0921/8919/6588/files/waterLUT_03_128_2.png?v=1747662579");e.colorSpace=Nn;const n=K(c=>c.isCameraUnderwater),r=K(c=>c.isCameraInMoonArea);let i=t;n?i=e:r&&(i=t);const o=S.useRef(null);return re(({scene:c,camera:h})=>{if(!K.getState().hasShadersCompiled&&o.current){const d=new Tu(40,1,.1,1e4);d.position.set(500,100,0),d.rotation.set(0,Math.PI/2,0);const y=[];c.traverse(P=>{P.visible===!1&&(y.push(P),P.visible=!0)}),o.current.setMainCamera(d),o.current.render(0),o.current.setMainCamera(h),K.getState().setHasShadersCompiled(!0),y.forEach(P=>P.visible=!1)}}),_.jsx(_.Fragment,{children:_.jsxs(_u,{stencilBuffer:!1,multisampling:0,ref:o,children:[_.jsx(Hh,{}),_.jsx($h,{lut:i,screenBlend:n}),_.jsx(bu,{luminanceThreshold:.3,luminanceSmoothing:1,intensity:.55,kernelSize:Pu.VERY_SMALL,mipmapBlur:!0,radius:.7,blendFunction:ls.SCREEN,levels:8}),_.jsx(Vh,{contrast:.32})]})})}const Kh=`attribute vec2 uv1;

varying vec3 vLocalPosition;
varying vec2 vUv;
varying vec2 vUv1;

void main() {
  vLocalPosition = position;
  // Regular icosphere UVs
  vUv = uv;
  // Special icosphere UVs (icosphere is split into 6 rounded planes)
  vUv1 = uv1;

  mat4 rotationMatrix = modelViewMatrix;
  // Remove the translation component
  rotationMatrix[3].xyz = vec3(0.0);

  gl_Position = projectionMatrix * rotationMatrix * vec4(position, 1.0);
}
`,Xh=`uniform float time;
uniform float beachToMoonLerpFactor;
// Beach gradient uniforms
uniform sampler2D beachGradientMap;
const float beachGradientBloomIntensity = 0.95;
const float beachGradientHorizonHeight = 0.01;
const float beachStarThreshold = 0.375;
const float beachStarColorWeight = 5.0;

// Transition gradient uniforms
const vec3 transitionGradientBottomColor = vec3(0.1058871939374596, 0.0, 0.3843198835185181);
const vec3 transitionGradientTopColor = vec3(0.0, 0.0, 0.0);
const float transitionGradientBloomIntensity = 1.0;
// Space gradient uniforms
const float spaceGradientBottomColorIntensity = 0.35;
const vec3 spaceGradientBottomColor = vec3(0, 1.0, 1.0);
const vec3 spaceGradientTopColor = vec3(0.0470626377157257, 0.0274509803904, 0.1803978064860461);
const float spaceGradientTopColorHeight = 0.075;
const float spaceGradientColorWeight = 0.5;
const float noiseScale = 25.0;
const float noiseAmplitude = 0.1;
// Star uniforms
const vec3 starColor = vec3(1.0, 1.0, 1.0);
const float starColorWeight = 1.0;
const float zoomLevel = 150.0;
const float innerFadeRadius = 0.0;
const float outerFadeRadius = 0.04;
const float minStarSize = 0.0;
const float starSeed = 10.0;
uniform float dprScalingFactor;
uniform float screenAreaScalingFactor;

varying vec3 vLocalPosition;
// Regular icosphere UVs
varying vec2 vUv;
// Special icosphere UVs (icosphere is split into 6 rounded planes)
varying vec2 vUv1;

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float Star(vec2 uv, float size, float n) {
  // Distance from center of grid cell
  float d = length(uv);
  // Scale the radii based on the star size
  float innerRadius = innerFadeRadius * size;
  float outerRadius = outerFadeRadius * size;
  // Smooth transition between inner solid part and outer fade
  float shape = smoothstep(outerRadius, innerRadius, d);
  return shape;
}

vec3 StarLayer(vec2 screenUVs) {
  // Grid UVs
  vec2 gv = fract(screenUVs) - 0.5;
  // ID of grid cell
  vec2 id = floor(screenUVs);
  // Compute the shape of the star
  float n = Hash21(id);
  float size = max(fract(n * 345.32), minStarSize);
  float starShape = Star(gv - vec2(n, fract(n * 34.)) + .5, size, n);
  return starColor * starShape * size;
}

vec3 screenSpaceDither(vec2 screenPos) {
  vec3 dither = vec3(dot(vec2(171.0, 231.0), screenPos + time));
  dither = fract(dither / vec3(103.0, 71.0, 97.0)) - 0.5;
  return dither / 255.0;
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = Hash21(i);
  float b = Hash21(i + vec2(1.0, 0.0));
  float c = Hash21(i + vec2(0.0, 1.0));
  float d = Hash21(i + vec2(1.0, 1.0));

  // Smooth interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Mix 4 corners
  return mix(a, b, u.x) +
    (c - a) * u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

vec3 computeGradientColor(float dotProduct) {
  float lerpFactor = clamp(dotProduct, beachGradientHorizonHeight, 1.0);
  vec3 gradientColor = texture(beachGradientMap, vec2(0.5, lerpFactor)).rgb * beachGradientBloomIntensity;
  gradientColor += screenSpaceDither(gl_FragCoord.xy);
  return gradientColor;
}

vec3 computeSpaceGradient(float dotProduct) {
  float noise = noise(vUv * noiseScale) * noiseAmplitude;
  float topColorPos = spaceGradientTopColorHeight + noise;
  float lerpFactor = clamp(dotProduct / topColorPos, 0.0, 1.0);
  vec3 gradientColor = mix(spaceGradientBottomColor * spaceGradientBottomColorIntensity, spaceGradientTopColor, lerpFactor);
  return gradientColor;
}

void main() {
  float dotProduct = dot(normalize(abs(vLocalPosition)), vec3(0.0, 1.0, 0.0));

  if(beachToMoonLerpFactor == 0.0) {
    vec3 gradientColor = computeGradientColor(dotProduct);
    vec3 starColor = StarLayer((vUv1 * zoomLevel * dprScalingFactor * screenAreaScalingFactor) + starSeed);
    float fadeStrength = smoothstep(beachStarThreshold, 1.0, vUv.y);
    gl_FragColor.rgb = gradientColor + starColor * beachStarColorWeight * pow(fadeStrength, 3.0);
  } else if(beachToMoonLerpFactor > 0.0 && beachToMoonLerpFactor < 1.0) {
    vec3 transitionGradientColor = mix(transitionGradientBottomColor, transitionGradientTopColor, dotProduct) * transitionGradientBloomIntensity;
    vec3 starColor = StarLayer((vUv1 * zoomLevel * dprScalingFactor * screenAreaScalingFactor) + starSeed);
    vec3 spaceColor = computeSpaceGradient(dotProduct) * spaceGradientColorWeight + starColor * starColorWeight;
    gl_FragColor.rgb = mix(transitionGradientColor, spaceColor, beachToMoonLerpFactor);
  } else {
    vec3 starColor = StarLayer((vUv1 * zoomLevel * dprScalingFactor * screenAreaScalingFactor) + starSeed);
    vec3 spaceColor = computeSpaceGradient(dotProduct) * spaceGradientColorWeight + starColor * starColorWeight;
    gl_FragColor.rgb = spaceColor;
  }

  gl_FragColor.a = 1.0;
}
`,lc="/cdn.shopify.com/3d/models/6a4c02f8702e5b91/sky_icosphere.glb",Jh="/cdn.shopify.com/s/files/1/0921/8919/6588/files/sky-gradient-17-skinny.webp?v=1747691933";function Yh(){const t=Yt(h=>h.gl),e=Yt(h=>h.size),{nodes:n}=je(lc),r=Ks(Jh);r.wrapS=r.wrapT=Un,r.colorSpace=Nn;const i=S.useCallback(()=>Sr(e.width*e.height/1045440,0,1),[e]),o=S.useMemo(()=>new ze({uniforms:{time:{value:0},beachToMoonLerpFactor:{value:0},beachGradientMap:{value:r},dprScalingFactor:{value:t.getPixelRatio()>=2?1:.5},screenAreaScalingFactor:{value:i()}},vertexShader:Kh,fragmentShader:Xh,side:Za}),[r,t,i]);S.useEffect(()=>{const h=()=>{o.uniforms.screenAreaScalingFactor.value=i()};return h(),window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h)}},[i,o]),re(({clock:h})=>{o.uniforms.time.value=h.getElapsedTime();const{normalizedProgress:u}=Q.getState();u>=ne.exitTheWater&&u<=ne.moonApex?o.uniforms.beachToMoonLerpFactor.value=cs(ne.exitTheWater,ne.moonApex,u):u>ne.moonApex?o.uniforms.beachToMoonLerpFactor.value=1:o.uniforms.beachToMoonLerpFactor.value=0});const c=K(h=>h.isCameraUnderwater);return _.jsx("mesh",{geometry:n.Mesh_0.geometry,material:o,scale:3e3,visible:!c})}je.preload(lc);const Qh=`const float uvScalingFactor = 4000.0;

varying vec2 vUv;
varying vec3 vViewPosition;
varying mat3 vNormalMatrix;

void main() {
  vUv = uv * uvScalingFactor;
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -viewPosition.xyz;
  vNormalMatrix = normalMatrix;
  gl_Position = projectionMatrix * viewPosition;
}
`,Zh=`uniform float time;
uniform sampler2D waterNormalMap;
const float distortionIntensity = 10.0;
const vec3 underWaterFogColor = vec3(0.00030352698352941176, 0.14126329113044458, 0.23839757380151394);
const vec3 aboveWaterFogColor = vec3(0.8631572134510892, 0.29613827078752575, 0.12743768042608497);
const vec3 aboveWaterColor1 = vec3(0.20863687013464577, 0.1844749944900301, 0.22696587349938613);
const vec3 aboveWaterColor2 = vec3(0.05126945836711539, 0.031896033067374104, 0.174647403645279);
uniform bool isCameraUnderwater;
uniform bool isExitingWater;

varying vec2 vUv;
varying vec3 vViewPosition;
varying mat3 vNormalMatrix;

vec4 getNoise(vec2 uv) {
  vec2 uv0 = (uv / 103.0) + vec2(time / 17.0, time / 29.0);
  vec2 uv1 = uv / 107.0 - vec2(time / -19.0, time / 31.0);
  vec2 uv2 = uv / vec2(8907.0, 9803.0) + vec2(time / 101.0, time / 97.0);
  vec2 uv3 = uv / vec2(1091.0, 1027.0) - vec2(time / 109.0, time / -113.0);
  vec4 noise = texture2D(waterNormalMap, uv0) +
    texture2D(waterNormalMap, uv1) +
    texture2D(waterNormalMap, uv2) +
    texture2D(waterNormalMap, uv3);
  return noise * 0.5 - 1.0;
}

vec3 inverseTransformDirection(in vec3 dir, in mat4 matrix) {
  return normalize((vec4(dir, 0.0) * matrix).xyz);
}

void main() {
  vec4 noise = getNoise(vUv);
  vec3 geometryNormal = normalize(noise.xzy * vec3(1.5, distortionIntensity, 1.5));
  geometryNormal = normalize(vNormalMatrix * geometryNormal);

  vec3 geometryViewDir = normalize(vViewPosition);
  vec3 reflectVec = normalize(reflect(-geometryViewDir, geometryNormal));
  reflectVec = inverseTransformDirection(reflectVec, viewMatrix);
  float dotProduct = dot(reflectVec, vec3(0.0, 1.0, 0.0));

  if(isCameraUnderwater) {
    vec3 underwaterColor = underWaterFogColor;
    underwaterColor.g *= 2.0;

    if(isExitingWater) {
      underwaterColor.g *= 1.25;
      underwaterColor *= (-dotProduct * 0.5) * (1.0 + step(0.5, -dotProduct));
    } else {
      underwaterColor *= -dotProduct * 8.0;
    }
    gl_FragColor = vec4(underwaterColor, 1.0);
    float fogFactor = smoothstep(1.0, 300.0, vViewPosition.z);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, underWaterFogColor, fogFactor);
  } else {
    dotProduct = abs(dotProduct) * 3.0;
    vec3 gradientColor = mix(aboveWaterColor1, aboveWaterColor2, dotProduct);
    gl_FragColor = vec4(gradientColor, 1.0);
    float fogFactor = smoothstep(1.0, 300.0, vViewPosition.z) * 0.3;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, aboveWaterFogColor, fogFactor);
  }
}
`,uc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/waternormals_512-min.jpg?v=1747657859";function ed(){const t=Le(uc,i=>{i.wrapS=i.wrapT=Un}),e=S.useRef(null),n=S.useMemo(()=>new ze({uniforms:{time:{value:0},waterNormalMap:{value:t},isCameraUnderwater:{value:!1},isExitingWater:{value:!1}},vertexShader:Qh,fragmentShader:Zh,side:Pn}),[t]);re(i=>{const{normalizedProgress:o}=Q.getState(),c=o<ne.exitTheWater;e.current&&(e.current.visible=c),c&&(n.uniforms.time.value=i.clock.elapsedTime*.5,n.uniforms.isExitingWater.value=o>mr.moon.start)}),S.useEffect(()=>{const i=K.subscribe(o=>o.isCameraUnderwater,o=>{n.uniforms.isCameraUnderwater.value=o});return()=>{i()}},[n]);const r=S.useMemo(()=>{const i=new nn(1,1);return i.applyMatrix4(new Ye().makeRotationX(Math.PI*-.5)),i},[]);return _.jsx("mesh",{ref:e,geometry:r,material:n,position:[-1366.0765370667104,0,0],scale:5e3})}Le.preload(uc);const td=`uniform mat4 textureProjectionMatrix;

varying vec3 vWorldPosition;
varying vec3 vViewPosition;
varying vec2 vUv;
varying vec4 vTextureProjectionUv;

#ifdef USE_PLAYER2_SHADOW
uniform mat4 player2TextureProjectionMatrix;
varying vec4 vPlayer2TextureProjectionUv;
#endif

void main() {
  vUv = uv;
  vTextureProjectionUv = textureProjectionMatrix * modelMatrix * vec4(position, 1.0);
  #ifdef USE_PLAYER2_SHADOW
  vPlayer2TextureProjectionUv = player2TextureProjectionMatrix * modelMatrix * vec4(position, 1.0); 
  #endif

  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -viewPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,nd=`uniform vec3 color1;
uniform vec3 color2;
uniform sampler2D carShadowTexture;
const vec3 shadowColor = vec3(0.0, 0.0, 0.0);
const float shadowOpacity = 0.95;
uniform bool enableCaustics;
uniform vec3 fogColor;
uniform float fogDistance;

varying vec2 vUv;
varying vec4 vTextureProjectionUv;

#ifdef USE_PLAYER2_SHADOW
varying vec4 vPlayer2TextureProjectionUv;
uniform sampler2D player2ShadowTexture;
#endif

uniform sampler2D causticsMap;
uniform float time;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

const float causticsSpeed = 0.04;
const float causticsStrength = 0.035;
const float caustics1Scale = 0.02;
const float caustics2Scale = 0.018;

vec3 sampleCaustics(sampler2D tex, vec3 worldPos, float scale, float speed, float time) {
  vec2 xzCoords = worldPos.xz;
  vec2 causticsUv = xzCoords * scale + speed * time;
  return texture2D(tex, causticsUv).rgb;
}

vec3 applyShadow(vec3 baseColor, vec4 projectionUv, sampler2D shadowTexture) {
  vec2 uv = projectionUv.xy * 0.5 + 0.5;
  if(uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0) {
    float shadowAlpha = texture(shadowTexture, uv).a;
    return mix(baseColor, shadowColor, shadowAlpha * shadowOpacity);
  }
  return baseColor;
}

void main() {
  float v = mod(vUv.x * 1000.0, 2.0);
  vec3 baseColor = v < 1.0 ? color1 : color2;

  float normalizedY = (vUv.y * 2.0) - 1.0;
  float edgeFactor = normalizedY * normalizedY;
  // Apply darkening based on distance from center
  float darkenAmount = 0.6 * edgeFactor;
  vec3 color = baseColor * (1.0 - darkenAmount);

  if(enableCaustics) {
    vec3 caustics1 = sampleCaustics(causticsMap, vWorldPosition, caustics1Scale, causticsSpeed, time);
    vec3 caustics2 = sampleCaustics(causticsMap, vWorldPosition, caustics2Scale, -causticsSpeed * 0.5, time);

    vec3 caustics = min(caustics1, caustics2);
    // Tint towards green and fade off towards edges
    caustics.g *= 4.5;
    color += caustics * causticsStrength * max(0.0, (1.0 - darkenAmount * 2.0));
  }

  // Apply player 1 shadow
  color = applyShadow(color, vTextureProjectionUv, carShadowTexture);

  // Apply player 2 shadow if enabled
  #ifdef USE_PLAYER2_SHADOW
  color = applyShadow(color, vPlayer2TextureProjectionUv, player2ShadowTexture);
  #endif

  gl_FragColor = vec4(color, 1.0);

  if(fogDistance > 0.0) {
    float fogFactor = smoothstep(1.0, fogDistance, vViewPosition.z);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
  }
}
`,hc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/car_shadow_128_256_compressed.png?v=1747659396",dc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/caustics-texture_128.jpg?v=1747660972";function vi({roadGeometry:t,color1:e=new $(.02,.02,.02),color2:n=new $(.025,.025,.025),fogDistance:r=-1,fogColor:i=new $(0,0,0),enableCaustics:o=!1}){const c=Le(hc,A=>{A.generateMipmaps=!1}),h=Xr(A=>A.active),u=Le(dc,A=>{A.wrapS=Un,A.wrapT=Un}),d=S.useMemo(()=>new ze({uniforms:{color1:{value:e},color2:{value:n},textureProjectionMatrix:{value:new Ye},player2TextureProjectionMatrix:{value:new Ye},carShadowTexture:{value:c},time:{value:0},causticsMap:{value:u},enableCaustics:{value:o},fogColor:{value:i},fogDistance:{value:r}},defines:{USE_PLAYER2_SHADOW:h?"1":"0"},vertexShader:td,fragmentShader:nd,side:Pn}),[c,u,o,e,n,r,i,h]),y=S.useRef(new R(1.2,1.75,1)),P=Q(A=>A.shadowCameraTarget),k=Xr(A=>A.shadowCameraTarget);return re(({clock:A})=>{d.uniforms.time.value=A.getElapsedTime()}),re(()=>{P&&(P.updateWorldMatrix(!0,!1),d.uniforms.textureProjectionMatrix.value.copy(P.matrixWorld).scale(y.current).invert()),k&&(k.updateWorldMatrix(!0,!1),d.uniforms.player2TextureProjectionMatrix.value.copy(k.matrixWorld).scale(y.current).invert())},1),_.jsx(_.Fragment,{children:t&&_.jsx("mesh",{geometry:t,material:d})})}Le.preload(hc);Le.preload(dc);const rd=`uniform float time;
const float speed = 25.0;
const float flapAmplitude = 5.0;
const float flapSpeed = 5.0;
const float flapFrequency = 1.0;

attribute vec3 circleCenter;
attribute float circleRadius;
attribute vec2 positionOffset;
attribute float scale;
attribute float timeOffset;
attribute float randomNumber;
attribute float rotationDirection;

const vec3 worldUp = vec3(0.0, 1.0, 0.0);

vec3 computeParticlePosition(float currentTime) {
  // Compute the position of the particle along the circular path
  float particleTime = currentTime + timeOffset;
  // Adjust speed based on radius to maintain constant linear velocity
  // This makes the parameter "speed" represent units per second regardless of circle size
  float angle = particleTime * speed / circleRadius * rotationDirection;
  vec3 radiusVector = vec3(cos(angle) * circleRadius, 0.0, sin(angle) * circleRadius);
  vec3 particlePosition = circleCenter + radiusVector;

  // Offset the particle along the radius vector and the up vector
  // Here we combine the constant offsets we receive as attributes with sinusoidal offsets
  float randomizedParticleTime = currentTime + randomNumber;
  float xOffset = positionOffset.x + cos(randomizedParticleTime * 2.5);
  float yOffset = positionOffset.y + sin(randomizedParticleTime * 2.5);
  particlePosition += xOffset * normalize(radiusVector) + yOffset * worldUp;

  return particlePosition;
}
`,sd=`// Compute the current position of the particle and the next one
vec3 particlePosition = computeParticlePosition(time);
vec3 nextParticlePosition = computeParticlePosition(time + 0.01);

// Compute the coordinate frame of the particle
vec3 direction = normalize(nextParticlePosition - particlePosition);
vec3 right = normalize(cross(direction, worldUp));
vec3 up = normalize(cross(right, direction));

// Orient the particle so it faces its movement direction
// Here we also make it flap to make it look like a bird that's flying
vec3 deformedPosition = position;
deformedPosition.y += cos((time + randomNumber) * flapSpeed + uv.y * flapFrequency) * flapAmplitude * (1.0 - uv.y);
vec3 orientedPosition = deformedPosition.x * right * scale + deformedPosition.y * up * scale + deformedPosition.z * direction * scale * - 1.0;

vec3 transformed = particlePosition + orientedPosition;
`;function id({circleCenters:t,circleRadii:e,seagullMesh:n}){const i=t.length,o=7*i,c=S.useMemo(()=>{const C=new Float32Array(o*10);let F=0;for(let U=0;U<i;U++){const L=t[U],N=e[U],v=5+Math.random()*1,g=2+Math.random()*1,f=Math.random()>.5?1:-1;for(let b=0;b<7;b++){const p=Math.random()*Math.PI*2,T=v*Math.random(),w=Math.cos(p)*T,V=Math.sin(p)*T;C[F*10+0]=L.x,C[F*10+1]=L.y,C[F*10+2]=L.z,C[F*10+3]=N,C[F*10+4]=w,C[F*10+5]=V,C[F*10+6]=.25+Math.random()*.1,C[F*10+7]=Math.random()*g,C[F*10+8]=Math.random()*100,C[F*10+9]=f,F++}}const M=new qe(C,10),O=n.geometry;return O.setAttribute("circleCenter",new z(M,3,0)),O.setAttribute("circleRadius",new z(M,1,3)),O.setAttribute("positionOffset",new z(M,2,4)),O.setAttribute("scale",new z(M,1,6)),O.setAttribute("timeOffset",new z(M,1,7)),O.setAttribute("randomNumber",new z(M,1,8)),O.setAttribute("rotationDirection",new z(M,1,9)),O},[t,e,i,o,n]),h=S.useRef(null),u=S.useMemo(()=>{const d=n.material.clone();return d.onBeforeCompile=y=>{h.current=y,y.uniforms.time={value:0},y.vertexShader=y.vertexShader.replace("#include <common>",`
        #include <common>
        ${rd}`),y.vertexShader=y.vertexShader.replace("#include <begin_vertex>",`
        ${sd}`)},d},[n]);return re(d=>{h.current&&(h.current.uniforms.time.value=d.clock.elapsedTime)}),_.jsx("instancedMesh",{args:[c,u,o],frustumCulled:!1})}const od=`uniform float time;
const float branchSwayAmplitude = 0.05;
const float branchSwaySpeed = 5.0;
const float branchSwayFrequency = 100.0;
const float trunkSwayAmplitude = 0.025;
const float trunkSwaySpeed = 0.5;

attribute float globalTimeOffset;
attribute vec2 uv1;
attribute float _timeoffset;
`,ad=`vec3 transformed = position;

// Make the branches sway vertically
float branchTime = time * branchSwaySpeed + globalTimeOffset + _timeoffset * 100.0 + uv1.y * branchSwayFrequency;
float branchAmplitude = (1.0 - uv1.y) * branchSwayAmplitude;
transformed.y += cos(branchTime) * branchAmplitude;

// Make the trunk sway in the XZ plane
float trunkTime = time * trunkSwaySpeed + globalTimeOffset;
float trunkAmplitude = position.y * trunkSwayAmplitude;
transformed.x += cos(trunkTime) * trunkAmplitude;
transformed.z += sin(trunkTime) * trunkAmplitude;
`;function cd({palmTreePositions:t,leftStartingLinePalmTreePosition:e,rightStartingLinePalmTreePosition:n,palmTreeMesh:r}){const i=t.length+2,o=S.useMemo(()=>{const y=new Float32Array(i*1);for(let A=0;A<i;A++)y[A*1+0]=Math.random()*100;const P=new qe(y,1),k=r.geometry;return k.setAttribute("globalTimeOffset",new z(P,1,0)),k},[r,i]),c=S.useRef(null);S.useEffect(()=>{if(c.current){const k=t.length;for(let A=0;A<k;A++){const E=.75+Math.random()*.5;c.current.setMatrixAt(A,new Ye().compose(t[A],new le().setFromAxisAngle(new R(0,1,0),2*Math.PI*Math.random()).multiply(new le().setFromAxisAngle(new R(1,0,0),10*Math.PI/180)),new R(E,E,E)))}c.current.setMatrixAt(k,new Ye().compose(e,new le().setFromAxisAngle(new R(0,1,0),Math.PI),new R(.9,.9,.9))),c.current.setMatrixAt(k+1,new Ye().compose(n.clone().add(new R(0,2.5,0)),new le().setFromAxisAngle(new R(0,1,0),.5*Math.PI).multiply(new le().setFromAxisAngle(new R(0,0,1),-7.5*Math.PI/180)),new R(.9,.9,.9))),c.current.instanceMatrix.needsUpdate=!0}},[t,e,n]);const h=S.useRef(null),u=S.useMemo(()=>{const d=r.material.clone();return d.onBeforeCompile=y=>{h.current=y,y.uniforms.time={value:0},y.vertexShader=y.vertexShader.replace("#include <common>",`
        #include <common>
        ${od}`),y.vertexShader=y.vertexShader.replace("#include <begin_vertex>",`
        ${ad}`)},d},[r]);return re(d=>{h.current&&(h.current.uniforms.time.value=d.clock.elapsedTime)}),_.jsx("instancedMesh",{ref:c,args:[o,u,i],frustumCulled:!1})}const ld=`uniform float time;
const float floatSpeed = 2.0;
const float rotationAmplitude = 0.5;
const float verticalFloatAmplitude = 0.75;

attribute float timeOffset;
`,ud=`float floatTime = time * floatSpeed + timeOffset;
float oneQuarterFloatTime = floatTime * 0.25;
float oneEighthAmplitude = 0.125 * rotationAmplitude;
float sinOneQuarterFloatTime = sin(oneQuarterFloatTime);

float rotX = cos(oneQuarterFloatTime) * oneEighthAmplitude;
float rotY = sinOneQuarterFloatTime * oneEighthAmplitude;
float rotZ = sinOneQuarterFloatTime * 0.05 * rotationAmplitude;

vec3 transformed = position;

// Approximate rotation
transformed.x += rotZ * transformed.y - rotY * transformed.z;
transformed.y += - rotZ * transformed.x + rotX * transformed.z;
transformed.z += rotY * transformed.x - rotX * transformed.y;

// Float vertically
transformed.y += sinOneQuarterFloatTime * verticalFloatAmplitude;
`;function hd({sailboatPositions:t,sailboatMesh:e}){const n=t.length,r=S.useMemo(()=>{const u=new Float32Array(n*1);for(let P=0;P<n;P++)u[P*1+0]=Math.random()*100;const d=new qe(u,1),y=e.geometry;return y.setAttribute("timeOffset",new z(d,1,0)),y},[e,n]),i=S.useRef(null);S.useEffect(()=>{if(i.current){for(let d=0;d<n;d++){const y=.75+Math.random()*.5;i.current.setMatrixAt(d,new Ye().compose(t[d],new le().setFromAxisAngle(new R(0,1,0),2*Math.PI*Math.random()),new R(y,y,y)))}i.current.instanceMatrix.needsUpdate=!0}},[n,t]);const o=S.useRef(null),c=S.useMemo(()=>{const h=e.material.clone();return h.onBeforeCompile=u=>{o.current=u,u.uniforms.time={value:0},u.vertexShader=u.vertexShader.replace("#include <common>",`
        #include <common>
        ${ld}`),u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`
        ${ud}`)},h},[e]);return re(h=>{o.current&&(o.current.uniforms.time.value=h.clock.elapsedTime)}),_.jsx("instancedMesh",{ref:i,args:[r,c,n],frustumCulled:!1})}const dd=`uniform float time;
const float floatAmplitude = 2.5;
const float floatSpeed = 0.15;

attribute float timeOffset;
attribute float balloonID;

varying float vBalloonID;
`,fd=`float t = time * floatSpeed + timeOffset;
vec3 transformed = position;
transformed.y += cos(t) * floatAmplitude;
vBalloonID = balloonID;
`,md=`varying float vBalloonID;
`,pd=`vec2 adjustedUV = vMapUv;
adjustedUV.x += vBalloonID * 0.125;
diffuseColor *= texture2D(map, adjustedUV);
`;function gd({balloonPositions:t,balloonMesh:e}){const n=t.length,r=S.useMemo(()=>{const u=new Float32Array(n*2);for(let P=0;P<n;P++)u[P*2+0]=Math.random()*100,u[P*2+1]=Math.floor(Math.random()*8);const d=new qe(u,2),y=e.geometry;return y.setAttribute("timeOffset",new z(d,1,0)),y.setAttribute("balloonID",new z(d,1,1)),y},[e,n]),i=S.useRef(null);S.useEffect(()=>{if(i.current){for(let d=0;d<n;d++){const y=7.5+Math.random()*0;i.current.setMatrixAt(d,new Ye().compose(t[d],new le().setFromAxisAngle(new R(0,1,0),2*Math.PI*Math.random()),new R(y,y,y)))}i.current.instanceMatrix.needsUpdate=!0}},[t,n]);const o=S.useRef(null),c=S.useMemo(()=>{const h=e.material.clone();return h.side=Pn,h.onBeforeCompile=u=>{o.current=u,u.uniforms.time={value:0},u.vertexShader=u.vertexShader.replace("#include <common>",`
        #include <common>
        ${dd}`),u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`
        ${fd}`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`
        #include <common>
        ${md}`),u.fragmentShader=u.fragmentShader.replace("#include <map_fragment>",`
        ${pd}`)},h},[e]);return re(h=>{o.current&&(o.current.uniforms.time.value=h.clock.elapsedTime)}),_.jsx("instancedMesh",{ref:i,args:[r,c,n],frustumCulled:!1})}const fc="/cdn.shopify.com/3d/models/054d73793e9e364e/racing_game_sign_break_12.glb",vd="ArmatureAction.001";function yd(t){const{animations:e,scene:n,nodes:r}=je(fc),{actions:i}=ec(e,n),o=S.useMemo(()=>i==null?void 0:i[vd],[i]);return S.useEffect(()=>{r.road_ramp020.frustumCulled=!1,r.road_ramp020_1.frustumCulled=!1},[r]),S.useEffect(()=>{o&&(o.loop=tc,o.clampWhenFinished=!0)},[o]),re(()=>{const{normalizedProgress:c}=Q.getState();o&&(c>=ne.signBreak?o.isRunning()||o.play():(o.isRunning()||o.paused)&&(o.stop(),o.reset()))}),_.jsxs(_.Fragment,{children:[_.jsx("group",{dispose:null,position:t.position,rotation:t.rotation,scale:t.scale,children:_.jsx("mesh",{geometry:t.geometry,material:t.material})}),_.jsx("primitive",{object:n})]})}je.preload(fc);const yi="/cdn.shopify.com/3d/models/43dd348f4b006010/racing_game_track_69_beach.glb";function wd({visible:t=!1}){const{nodes:e,materials:n,scene:r}=je(yi),[i,o]=S.useState(null),[c,h]=S.useState({centers:[],radii:[],mesh:null}),[u,d]=S.useState({positions:[],leftStartingLinePalmTreePosition:new R,rightStartingLinePalmTreePosition:new R,mesh:null}),[y,P]=S.useState({positions:[],mesh:null}),[k,A]=S.useState({positions:[],mesh:null});return S.useLayoutEffect(()=>{o(e.road_mesh_beach.geometry.clone()),r.remove(e.road_mesh_beach);const E=[],I=[];let C=null;const F=[],M=new R,O=new R;let U=null;const L=[];let N=null;const v=[];let g=null,f=null,b=null;r.traverse(p=>{if(p.name.startsWith("birdcircle")&&p instanceof Ct){const T=new R;p.getWorldPosition(T);const w=p.name.match(/birdcircle(\d+)m/);if(w&&w[1]){const V=parseInt(w[1],10);E.push(T),I.push(V)}}else if(p.name==="seagull"&&p instanceof At)C=p;else if(p.name.startsWith("palmempty")&&p instanceof Ct){const T=new R;p.getWorldPosition(T),p.name==="palmemptystartleft"?M.copy(T):p.name==="palmemptystartright"?O.copy(T):F.push(T)}else if(p.name==="palm_tree"&&p instanceof At)U=p;else if(p.name.startsWith("sailboatempty")&&p instanceof Ct){const T=new R;p.getWorldPosition(T),L.push(T)}else if(p.name==="sailboat"&&p instanceof At)N=p;else if(p.name.startsWith("balloonempty")&&p instanceof Ct){const T=new R;p.getWorldPosition(T),v.push(T)}else p.name==="balloon"&&p instanceof At?g=p:p.name==="the_sun"&&p instanceof At?f=p:p.name==="road_ramp"&&p instanceof At&&(b=p)}),b&&r.remove(b),f&&r.remove(f),C&&r.remove(C),U&&r.remove(U),N&&r.remove(N),g&&r.remove(g),h({centers:E,radii:I,mesh:C}),d({positions:F,leftStartingLinePalmTreePosition:M,rightStartingLinePalmTreePosition:O,mesh:U}),P({positions:L,mesh:N}),A({positions:v,mesh:g})},[n,e,r]),_.jsx(_.Fragment,{children:_.jsxs("group",{visible:t,children:[_.jsxs("group",{rotation:[0,Math.PI,0],children:[_.jsx("primitive",{object:r}),_.jsx(vi,{roadGeometry:i,fogColor:sc,fogDistance:800,color1:new $(.036,.025,.025),color2:new $(.04,.038,.035)}),_.jsx(yd,{position:[801.542,14.749,-15.648],scale:[1,1,1.47],geometry:e.road_ramp.geometry,material:n.wood}),_.jsx("mesh",{geometry:e.the_sun.geometry,position:[694.571,140.316,1338.42],rotation:[Math.PI/2,0,2.6],scale:250,children:_.jsx("meshBasicMaterial",{color:[26,6.3,1.2],transparent:!0,onBeforeCompile:E=>{E.vertexShader=E.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
                  varying float vPositionY;
                  `),E.vertexShader=E.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
                  vPositionY = position.z;
                  `),E.fragmentShader=E.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
                  varying float vPositionY;
                  `),E.fragmentShader=E.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
                  float fade = clamp((1.0 - vPositionY * 2.0) * 0.2, 0.0, 1.0);
                  gl_FragColor.rgb *= 12.0;
                  gl_FragColor.a = fade;`)}})})]}),c.centers.length>0&&c.radii.length>0&&c.mesh&&_.jsx(id,{circleCenters:c.centers,circleRadii:c.radii,seagullMesh:c.mesh}),u.positions.length>0&&u.mesh&&_.jsx(cd,{palmTreePositions:u.positions,leftStartingLinePalmTreePosition:u.leftStartingLinePalmTreePosition,rightStartingLinePalmTreePosition:u.rightStartingLinePalmTreePosition,palmTreeMesh:u.mesh}),y.positions.length>0&&y.mesh&&_.jsx(hd,{sailboatPositions:y.positions,sailboatMesh:y.mesh}),k.positions.length>0&&k.mesh&&_.jsx(gd,{balloonPositions:k.positions,balloonMesh:k.mesh})]})})}je.preload(yi);const Sd=`uniform float time;
const float jumpAmplitude = 2.5;
const float jumpSpeed = 4.0;
const float jumpFrequency = 1.0;

attribute float timeOffset;
attribute float pauseBetweenJumps;
attribute vec3 humanColor;

varying vec3 vHumanColor;
`,_d=`float t = time * jumpSpeed + timeOffset;
float cycleDuration = 1.0 / jumpFrequency + pauseBetweenJumps;
float cyclePosition = mod(t, cycleDuration);
float jumpDuration = 1.0 / jumpFrequency;

vec3 transformed = position;
float jumpProgress = cyclePosition / jumpDuration;
float jumpActive = step(cyclePosition, jumpDuration);
jumpProgress = clamp(jumpProgress, 0.0, 1.0);
transformed.y += sin(jumpProgress * PI) * jumpAmplitude * jumpActive;

vHumanColor = humanColor;
`,bd=`varying vec3 vHumanColor;
`,Pd=`diffuseColor.rgb *= vHumanColor;
`;function Td({crowdPositions:t,crowdQuaternions:e,isBigGrandstand:n,crowdMesh:r}){const i=n.filter(L=>L).length,o=n.filter(L=>!L).length,c=i+o,h=81,u=82,d=32,y=33,P=15,k=Math.floor(P/2),A=P-k,E=h*k+u*A,I=d*k+y*A,C=E*i+I*o,F=S.useMemo(()=>{const v=new Float32Array(C*5),g=[new $("#1c5ed1"),new $("#38b6fa"),new $("#17ac54"),new $("#0a3c3f"),new $("#fede57"),new $("#e59c01"),new $("#dd4979"),new $("#75022d"),new $("#8340d0"),new $("#2a0164"),new $("#a3638d"),new $("#dd8865"),new $("#ce6658"),new $("#fe3500"),new $("#ad2b1f"),new $("#ff7900"),new $("#b1e81b")];for(let p=0;p<C;p++){const T=g[Math.floor(Math.random()*g.length)];v[p*5+0]=Math.random()*100,v[p*5+1]=Math.random()*2.5,v[p*5+2]=T.r,v[p*5+3]=T.g,v[p*5+4]=T.b}const f=new qe(v,5),b=r.geometry;return b.setAttribute("timeOffset",new z(f,1,0)),b.setAttribute("pauseBetweenJumps",new z(f,1,1)),b.setAttribute("humanColor",new z(f,3,2)),b},[r,C]),M=S.useRef(null);S.useEffect(()=>{if(!M.current)return;const L=.4,N=.75;let v=0;for(let g=0;g<c;g++){const f=n[g],b=t[g],p=e[g],T=new R(1,0,0).applyQuaternion(p),w=new R(0,0,1).applyQuaternion(p.clone().multiply(new le().setFromAxisAngle(new R(1,0,0),Math.PI*.25)));for(let V=0;V<P;V++){const q=V%2===0,B=f?q?h:u:q?d:y,G=q?0:-2.5*.5;for(let J=0;J<B;J++){const ee=(Math.random()*2-1)*L;M.current.setMatrixAt(v,new Ye().compose(new R().copy(b).addScaledVector(T,J*2.5+G+ee).addScaledVector(w,V*-2.5),p,new R(N,N,N))),v++}}}M.current.instanceMatrix.needsUpdate=!0},[r,C,t,e,n,c,h,u,d,y,P]);const O=S.useRef(null),U=S.useMemo(()=>{const L=r.material.clone();return L.onBeforeCompile=N=>{O.current=N,N.uniforms.time={value:0},N.vertexShader=N.vertexShader.replace("#include <common>",`
        #include <common>
        ${Sd}`),N.vertexShader=N.vertexShader.replace("#include <begin_vertex>",`
        ${_d}`),N.fragmentShader=N.fragmentShader.replace("#include <common>",`
        #include <common>
        ${bd}`),N.fragmentShader=N.fragmentShader.replace("#include <color_fragment>",`
        ${Pd}`)},L},[r]);return re(L=>{if(O.current&&(O.current.uniforms.time.value=L.clock.elapsedTime),!M.current)return;const{normalizedProgress:N}=Q.getState();N>=ne.turnOnFinishLineEffects&&!M.current.visible?M.current.visible=!0:N<ne.turnOnFinishLineEffects&&M.current.visible&&(M.current.visible=!1)}),_.jsx("instancedMesh",{ref:M,args:[F,U,C],frustumCulled:!1,visible:!1})}const Id=`uniform float time;
const float flashSpeed = 6.0;
const float flashFrequency = 0.5;

attribute float timeOffset;
attribute float pauseBetweenFlashes;
attribute float cameraFlashID;

varying vec2 vUv;
varying float vCameraFlashID;

float easeInCubic(float x) {
  return x * x * x;
}

void main() {
  float t = time * flashSpeed + timeOffset;
  float cycleDuration = 1.0 / flashFrequency + pauseBetweenFlashes;
  float cyclePosition = mod(t, cycleDuration);
  float flashDuration = 1.0 / flashFrequency;

  float scale = 0.0;
  if(cyclePosition < flashDuration) {
    float flashProgress = cyclePosition / flashDuration;
    if(flashProgress <= 0.5) {
      // Grow
      float currProgress = flashProgress / 0.5;
      scale = easeInCubic(currProgress);
    } else {
      // Shrink
      float currProgress = (flashProgress - 0.5) / 0.5;
      scale = 1.0 - easeInCubic(currProgress);
    }
  }

  vUv = uv;
  vCameraFlashID = cameraFlashID;
  gl_Position = projectionMatrix * viewMatrix * instanceMatrix * vec4(position * scale, 1.0);
}
`,Ad=`uniform sampler2D cameraFlashAtlasTexture;
const vec3 centerColor = vec3(1.0, 1.0, 1.0);
const vec3 edgeColor = vec3(0.18824100442308295, 0.7254939595907695, 1.0);
const float centerBloomIntensity = 5.0;
const float edgeBloomIntensity = 1.0;
const float edge0 = 0.0;
const float edge1 = 0.3;

varying vec2 vUv;
varying float vCameraFlashID;

void main() {
  // Calculate the row and column based on vCameraFlashID, which ranges from 0 to 3
  // Column: 0 or 1
  float column = mod(vCameraFlashID, 2.0);
  // Row: 0 or 1
  float row = floor(vCameraFlashID / 2.0);

  // Calculate the UV coordinates for the specific camera flash
  vec2 cameraFlashUv = vec2((1.0 - vUv.x) * 0.5 + column * 0.5, // 0.5 (half of texture width)
  vUv.y * 0.5 + row * 0.5 // 0.5 (half of texture height)
  );

  vec4 cameraFlashShape = texture2D(cameraFlashAtlasTexture, cameraFlashUv);
  if(cameraFlashShape.a < 0.1) {
    discard;
  }

  float distanceFromCenter = length(vUv - 0.5) * 2.0;
  float colorLerpFactor = smoothstep(edge0, edge1, distanceFromCenter);
  vec3 color = mix(centerColor * centerBloomIntensity, edgeColor * edgeBloomIntensity, colorLerpFactor);

  gl_FragColor = vec4(color * cameraFlashShape.rgb, 1.0);
}
`,mc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/camera_flashes_atlas_256.png?v=1747659851";function Ed({crowdPositions:t,crowdQuaternions:e,isBigGrandstand:n}){const r=Le(mc,v=>{v.colorSpace=Nn}),i=n.filter(v=>v).length,o=n.filter(v=>!v).length,c=i+o,h=81,u=82,d=32,y=33,P=15,k=Math.floor(P/2),A=P-k,E=h*k+u*A,I=d*k+y*A,C=.15,F=Math.floor(E*C),M=Math.floor(I*C),O=F*i+M*o,U=S.useMemo(()=>{const f=new Float32Array(O*3);for(let T=0;T<O;T++)f[T*3+0]=Math.random()*100,f[T*3+1]=Math.random()*5,f[T*3+2]=Math.floor(Math.random()*4);const b=new qe(f,3),p=new nn(1,1);return p.setAttribute("timeOffset",new z(b,1,0)),p.setAttribute("pauseBetweenFlashes",new z(b,1,1)),p.setAttribute("cameraFlashID",new z(b,1,2)),p},[O]),L=S.useRef(null);S.useEffect(()=>{if(!L.current)return;const v=.4,g=10,f=2;let b=0;for(let p=0;p<c;p++){const T=n[p],w=t[p],V=e[p],q=new R(1,0,0).applyQuaternion(V),B=new R(0,1,0),G=new R(0,0,1).applyQuaternion(V),J=new R(0,0,1).applyQuaternion(V.clone().multiply(new le().setFromAxisAngle(new R(1,0,0),Math.PI*.25))),ee=[];for(let ue=0;ue<P;ue++){const te=ue%2===0,Y=T?te?h:u:te?d:y,W=te?0:-2.5*.5;for(let X=0;X<Y;X++)ee.push({rowIndex:ue,seatIndex:X,rowOffset:W})}const he=[],ie=[...ee],de=T?F:M;for(let ue=0;ue<de&&ie.length>0;ue++){const te=Math.floor(Math.random()*ie.length);he.push(ie[te]),ie.splice(te,1)}let Ce=0;for(const{rowIndex:ue,seatIndex:te,rowOffset:Y}of he){const W=g+Math.random()*f,X=(Math.random()*2-1)*v;L.current.setMatrixAt(b,new Ye().compose(new R().copy(w).addScaledVector(B,2).addScaledVector(G,1+Ce/(de-1)*.25).addScaledVector(q,te*2.5+Y+X).addScaledVector(J,ue*-2.5),V.clone().multiply(new le().setFromAxisAngle(new R(0,0,1),Math.random()*Math.PI*2)),new R(W,W,W))),b++,Ce++}}L.current.instanceMatrix.needsUpdate=!0},[O,t,e,n,c,F,M,h,u,d,y,P]);const N=S.useMemo(()=>new ze({uniforms:{time:{value:0},cameraFlashAtlasTexture:{value:r}},vertexShader:Id,fragmentShader:Ad,transparent:!1,blending:as}),[r]);return re(v=>{if(N.uniforms.time.value=v.clock.elapsedTime,!L.current)return;const{normalizedProgress:g}=Q.getState();g>=ne.turnOnFinishLineEffects&&!L.current.visible?L.current.visible=!0:g<ne.turnOnFinishLineEffects&&L.current.visible&&(L.current.visible=!1)}),_.jsx("instancedMesh",{ref:L,args:[U,N,O],frustumCulled:!1,visible:!1})}Le.preload(mc);const Cd=`const vec3 sunPosition = vec3(1.0, 1.0, 1.0);
const float sunDistance = 47.45;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vLightPosition;
varying vec3 vViewDir;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);

  vPosition = worldPosition.xyz;
  vNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
  vUv = uv;
  vLightPosition = (modelMatrix * vec4(normalize(sunPosition) * sunDistance, 1.0)).xyz;
  vViewDir = normalize(cameraPosition - worldPosition.xyz);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,xd=`uniform sampler2D mapTexture;
const vec3 fadeColor = vec3(0.0470626377157257, 0.0274509803904, 0.1803978064860461);
const float fadeColorWeight = 0.5;
const float fresnelStrength = 7.3;
const vec3 fresnelColor = vec3(0.0, 0.2588296174556353, 0.37255519841982493);
const float fresnelBloomIntensity = 7.72;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vLightPosition;
varying vec3 vViewDir;

void main() {
  // Lighting
  vec3 lightDir = normalize(vLightPosition - vPosition);
  float lightIntensity = clamp(dot(vNormal, lightDir), 0.0, 1.0);

  // Fresnel
  float viewDotNormal = clamp(dot(vViewDir, vNormal), 0.0, 1.0);
  float fresnelIntensity = (clamp(pow(1.0 - viewDotNormal, fresnelStrength), 0.0, 1.0));
  vec3 fresnel = fresnelIntensity * fresnelColor * fresnelBloomIntensity;

  // Mix
  vec3 baseColor = texture2D(mapTexture, vUv).rgb;
  vec3 finalColor = mix(baseColor + fresnel, fadeColor * fadeColorWeight, 1.0 - lightIntensity);

  gl_FragColor = vec4(finalColor, 1.0);
}
`,Rd=`const vec3 sunPosition = vec3(1.0, 1.0, 1.0);
const float shiftTowardsSunAmount = 0.14;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  // Move the atmosphere towards the sun
  // This hides the atmosphere in the dark side of the planet
  vec3 localPosition = position + normalize(sunPosition) * shiftTowardsSunAmount;
  vec4 worldPosition = modelMatrix * vec4(localPosition, 1.0);

  vNormal = normalize(modelMatrix * vec4(normal * -1.0, 0.0)).xyz;
  vViewDir = normalize(cameraPosition - worldPosition.xyz);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,kd=`const float fresnelStrength = 1.52;
const vec3 fresnelColor = vec3(0.0, 1.0, 0.9254913451083487);
const float fresnelBloomIntensity = 1.0;
const float atmosphereOpacity = 1.0;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  // Fresnel
  float viewDotNormal = clamp(dot(vViewDir, vNormal), 0.0, 1.0);
  float fresnelIntensity = (1.0 - clamp(pow(1.0 - viewDotNormal, fresnelStrength), 0.0, 1.0));

  gl_FragColor = vec4(fresnelIntensity * fresnelColor * fresnelBloomIntensity, fresnelIntensity * atmosphereOpacity);
}
`,Md=`const vec3 color = vec3(0.6653872982754769, 1.0, 0.33245153633549385);
const float bloomIntensity = 2.0;

varying float vAge;
varying vec2 vUv;

float ramp(float t) {
  float v = step(0.0, t) * (1.0 - step(1.0, t));
  return smoothstep(0.0, 1.0, (1.0 - t)) * v;
}

void main() {
  if(vAge <= 0.0 || vAge >= 2.0) {
    discard;
  }

  // AdjustedAge corresponds to the age of each vertex since the time the arc started
  float adjustedAge = vAge - vUv.y;

  float r = ramp(adjustedAge);

  float alpha = step(1.0 - r, 0.9);
  alpha *= pow(1.0 - adjustedAge, 8.0);
  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(color * bloomIntensity, alpha);
}
`,Dd=`uniform float time;
const float duration = 2.0;
const float repetitionPeriod = 2.0;
const float thickness = 1.1;

attribute vec3 startPos;
attribute vec3 midCoord1;
attribute vec3 midCoord2;
attribute vec3 endPos;
attribute float startTime;

varying float vAge;
varying vec2 vUv;

vec3 cubicBezier(vec3 startPoint, vec3 controlPoint1, vec3 controlPoint2, vec3 endPoint, float t) {
  float u = 1.0 - t;
  float tt = t * t;
  float uu = u * u;
  float uuu = uu * u;
  float ttt = tt * t;

  vec3 p = uuu * startPoint;
  p += 3.0 * uu * t * controlPoint1;
  p += 3.0 * u * tt * controlPoint2;
  p += ttt * endPoint;

  return p;
}

vec3 cubicBezierTangent(vec3 startPoint, vec3 controlPoint1, vec3 controlPoint2, vec3 endPoint, float t) {
  float u = 1.0 - t;
  float tt = t * t;
  float uu = u * u;

  vec3 p = -3.0 * uu * startPoint;
  p += 3.0 * (3.0 * tt - 4.0 * t + 1.0) * controlPoint1;
  p += 3.0 * (2.0 * t - 3.0 * tt) * controlPoint2;
  p += 3.0 * tt * endPoint;

  return normalize(p);
}

void main() {
  // Calculate the age and use the modulo operation to reset it after the repetition period
  vAge = mod((time - startTime) / duration, repetitionPeriod);

  // Normalize age to be between 0 and 2
  vAge = clamp(vAge, 0.0, 2.0);

  if(vAge <= 0.0 || vAge >= 2.0) {
    return;
  }

  vUv = uv;

  vec3 originalPosition = (modelMatrix * vec4(cubicBezier(startPos, midCoord1, midCoord2, endPos, uv.y), 1.0)).xyz;
  vec3 direction = (modelMatrix * vec4(cubicBezierTangent(startPos, midCoord1, midCoord2, endPos, uv.y), 0.0)).xyz;
  vec3 look = normalize(originalPosition - cameraPosition);
  float side = 2.0 * uv.x - 1.0;
  vec3 offset = cross(look, direction * side);

  gl_Position = projectionMatrix * viewMatrix * vec4(originalPosition + normalize(offset) * thickness, 1.0);
}
`;function Ho(t,e,n){const r=Dt(t),i=Dt(-e);return[Math.cos(r)*Math.cos(i)*n,Math.sin(r)*n,Math.cos(r)*Math.sin(i)*n]}function qo(t){const e=Math.sin(t*.5);return e*e}function Od(t,e){const n=Math.PI/180,r=e[0]*n,i=e[1]*n,o=t[0]*n,c=t[1]*n,h=Math.cos(i),u=Math.sin(i),d=Math.cos(c),y=Math.sin(c),P=h*Math.cos(r),k=h*Math.sin(r),A=d*Math.cos(o),E=d*Math.sin(o),I=2*Math.asin(Math.sqrt(qo(c-i)+h*d*qo(o-r))),C=Math.sin(I),F=I?function(M){const O=M*I,U=Math.sin(O)/C,L=Math.sin(I-O)/C,N=L*P+U*A,v=L*k+U*E,g=L*u+U*y;return[N,g,-v]}:function(){return[P,u,-k]};return F.distance=I,F}const Ld=new R,Fd=new R,Nd=new R,Ud=new R,jd=new R,Vd=new R;function Bd(t,e,n,r,i,o,c){const u=Ld.set(...Ho(t,e,1)),d=Fd.set(...Ho(n,r,1)),y=u.distanceTo(d),P=Fn(i,o,Mt.easeInQuad(y/2)),k=Od([r,n],[e,t]),A=Nd.set(...k(.25)).multiplyScalar(1+P),E=Ud.set(...k(.75)).multiplyScalar(1+P),I=jd.set(...k(.25)).multiplyScalar(1);I.sub(A),I.cross(Vd.copy(E).sub(A));const C=Fn(0,c,y/2);return I.normalize().multiplyScalar(Math.random()*C-C*.5),Math.random()>.5,A.add(I),E.add(I),{start:u,midCoord1:A,midCoord2:E,end:d}}function Ko({ordersURL:t,numSegmentsPerArc:e}){const[n,r]=S.useState([]),i=fi(Ja,t);S.useLayoutEffect(()=>{const h=JSON.parse(i);r(h)},[i,r]);const o=S.useMemo(()=>{if(n.length===0)return null;const h=13,u=n.length,d=new Float32Array(u*h),y=0,P=1,k=.55,A=new Uint16Array(e*6),E=new Float32Array((e+1)*2*3),I=new Float32Array((e+1)*2*2);for(let M=0,O=0;O<e*6;M+=2,O+=6)A[O+0]=M+0,A[O+1]=M+1,A[O+2]=M+2,A[O+3]=M+2,A[O+4]=M+1,A[O+5]=M+3;for(let M=0;M<=e;M++){const O=M/e;I[M*4+0]=0,I[M*4+1]=O,I[M*4+2]=1,I[M*4+3]=O}for(let M=0;M<u;M++){const{fromLat:O,fromLng:U,toLat:L,toLng:N}={fromLat:n[M][2],fromLng:n[M][3],toLat:n[M][0],toLng:n[M][1]},{start:v,midCoord1:g,midCoord2:f,end:b}=Bd(O,U,L,N,y,P,k);d[M*h+0]=v.x,d[M*h+1]=v.y,d[M*h+2]=v.z,d[M*h+3]=g.x,d[M*h+4]=g.y,d[M*h+5]=g.z,d[M*h+6]=f.x,d[M*h+7]=f.y,d[M*h+8]=f.z,d[M*h+9]=b.x,d[M*h+10]=b.y,d[M*h+11]=b.z,d[M*h+12]=10-(M+1)/u*10}const C=new qe(d,h),F=new Iu;return F.setIndex(new It(A,1)),F.setAttribute("position",new It(E,3)),F.setAttribute("uv",new It(I,2)),F.setAttribute("startPos",new z(C,3,0)),F.setAttribute("midCoord1",new z(C,3,3)),F.setAttribute("midCoord2",new z(C,3,6)),F.setAttribute("endPos",new z(C,3,9)),F.setAttribute("startTime",new z(C,1,12)),F},[n,e]),c=S.useMemo(()=>new ze({uniforms:{time:{value:0}},vertexShader:Dd,fragmentShader:Md,transparent:!0,depthWrite:!1}),[]);return re(({clock:h})=>{c.uniforms.time.value=h.elapsedTime}),n.length===0||!o?null:_.jsx("instancedMesh",{args:[o,c,n.length],frustumCulled:!1,renderOrder:1})}const pc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/earth_512_256.png?v=1747658988";function zd(){const t=Le(pc,o=>{o.minFilter=Au,o.magFilter=Eu,o.colorSpace=Nn}),e=S.useMemo(()=>new ze({uniforms:{mapTexture:{value:t}},vertexShader:Cd,fragmentShader:xd}),[t]),n=S.useMemo(()=>new ze({vertexShader:Rd,fragmentShader:kd,transparent:!0,side:Za,depthWrite:!1}),[]),r=S.useRef(null),i=S.useRef(!1);return re(()=>{if(!r.current)return;const{normalizedProgress:o}=Q.getState();o>=ne.moveEarthToCinematicLocation&&!i.current?(r.current.position.set(3,-.7,0),r.current.scale.set(.75,.75,.75),i.current=!0):o<ne.moveEarthToCinematicLocation&&i.current&&(r.current.position.set(-1.5,1,0),r.current.scale.set(1,1,1),i.current=!1)}),_.jsxs("group",{ref:r,position:[-1.5,1,0],rotation:[Math.PI*.15,Math.PI*.2,0],children:[_.jsxs("group",{children:[_.jsx("mesh",{material:e,children:_.jsx("sphereGeometry",{args:[1,32,16]})}),_.jsx(Ko,{ordersURL:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/short_orders_final.json?v=1747171987",numSegmentsPerArc:15}),_.jsx(Ko,{ordersURL:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/long_orders_final.json?v=1747171987",numSegmentsPerArc:40})]}),_.jsx("mesh",{material:n,renderOrder:0,scale:1.08,children:_.jsx("sphereGeometry",{args:[1,32,16]})})]})}Le.preload(pc);const $d=`attribute vec2 uv1;

varying vec2 vUv;
varying vec3 vViewDir;
`,Gd=`vUv = uv1;
vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
`,Wd=`const vec3 bloomColor = vec3(0.0, 0.32549640471294256, 1.0);
const float bloomIntensity = 35.48;
const float bloomVerticalFalloff = 3.58;
const float fresnelStrength = 3.4;

varying vec2 vUv;
varying vec3 vViewDir;
`,Hd=`float viewDotNormal = clamp(dot(normalize(vViewDir), normalize(vNormal)), 0.0, 1.0);
float fresnelIntensity = clamp(pow(clamp(1.0 - viewDotNormal, 0.0, 1.0), fresnelStrength), 0.0, 1.0);
// Bottom to top bloom that's also masked by the fresnel effect
diffuseColor.rgb += bloomColor * bloomIntensity * pow(clamp(vUv.y, 0.0, 1.0), bloomVerticalFalloff) * fresnelIntensity;
`;function qd({crystalsMesh:t}){const e=S.useMemo(()=>{const n=t.material.clone();return n.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("#include <common>",`
        #include <common>
        ${$d}`),r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        ${Gd}`),r.fragmentShader=r.fragmentShader.replace("#include <common>",`
        #include <common>
        ${Wd}`),r.fragmentShader=r.fragmentShader.replace("#include <map_fragment>",`
        #include <map_fragment>
        ${Hd}
        `)},n},[t]);return _.jsx(_.Fragment,{children:_.jsx("mesh",{geometry:t.geometry,material:e,position:t.position,quaternion:t.quaternion,scale:t.scale})})}const Kd=`uniform float time;
const float speed = 0.12;
const float twinkleSpeed = 4.5;

attribute vec3 spawnPosition;
attribute vec3 direction;
attribute float scale;
attribute float timeOffset;

varying vec2 vUv;
varying vec3 vViewPosition;

void main() {
  vUv = uv;

  float particleTime = time + timeOffset;

  vec3 particlePosition = (modelMatrix * vec4(spawnPosition, 1.0)).xyz;
  // Move back and forth along random direction vector
  particlePosition += direction * sin(particleTime * speed) * 2.0;

  vec3 toCameraVector = normalize(cameraPosition - particlePosition);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 right = normalize(cross(up, toCameraVector));
  up = normalize(cross(toCameraVector, right));

  // Twinkle
  float adjustedScale = scale + sin(particleTime * twinkleSpeed) * scale;

  // Orient the particle to face the camera
  vec3 orientedPosition = position.x * right * adjustedScale +
    position.y * up * adjustedScale;

  vec4 viewPosition = viewMatrix * vec4(particlePosition + orientedPosition, 1.0);
  vViewPosition = -viewPosition.xyz;

  gl_Position = projectionMatrix * viewPosition;
}
`,Xd=`uniform sampler2D sparklesTexture;
const vec3 particleColor = vec3(1.0, 0.8588256298682079, 0.2392216976529254);
const float particleBloomIntensity = 10.0;

varying vec2 vUv;
varying vec3 vViewPosition;

void main() {
  vec4 sparklesColor = texture2D(sparklesTexture, vUv);
  if(sparklesColor.a < 0.1) {
    discard;
  }

  gl_FragColor = vec4(sparklesColor.rgb * particleColor * particleBloomIntensity, 1.0);
}
`,gc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/star_64.png?v=1747352177";function Jd({crystalsPosition:t}){const n=Le(gc),r=S.useMemo(()=>{const y=new Float32Array(4e3);for(let A=0;A<500;A++){const E=75*Math.cbrt(Math.random()),I=Math.random()*Math.PI,C=Math.acos(2*Math.random()-1),F=E*Math.sin(C)*Math.cos(I)*.5,M=E*Math.sin(C)*Math.sin(I)*.5,O=E*Math.cos(C)*1.25,U=new R(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1).normalize();y[A*8+0]=F,y[A*8+1]=M,y[A*8+2]=O,y[A*8+3]=U.x,y[A*8+4]=U.y,y[A*8+5]=U.z,y[A*8+6]=30+Math.random()*20,y[A*8+7]=Math.random()*100}const P=new qe(y,8),k=new nn(.01,.01);return k.setAttribute("spawnPosition",new z(P,3,0)),k.setAttribute("direction",new z(P,3,3)),k.setAttribute("scale",new z(P,1,6)),k.setAttribute("timeOffset",new z(P,1,7)),k},[500]),i=S.useMemo(()=>new ze({uniforms:{time:{value:0},sparklesTexture:{value:n}},vertexShader:Kd,fragmentShader:Xd}),[n]),o=S.useRef(null);return re(c=>{if(i.uniforms.time.value=c.clock.elapsedTime,!o.current)return;const{normalizedProgress:h}=Q.getState();h>=ne.turnOnFinishLineEffects&&!o.current.visible?o.current.visible=!0:h<ne.turnOnFinishLineEffects&&o.current.visible&&(o.current.visible=!1)}),_.jsx("instancedMesh",{ref:o,args:[r,i,500],frustumCulled:!1,visible:!1,position:t,rotation:[Math.PI*-.05,Math.PI*.35,0]})}Le.preload(gc);const Yd=`uniform float time;
const float duration = 10.0;
const float speed = 60.0;

attribute vec3 spawnPosition;
attribute float scale;
attribute vec3 direction;
attribute float timeOffset;
attribute vec3 color;
attribute float rotationDirection;

varying float vLifetime;
varying vec3 vColor;

void main() {
  // Calculate looping particle time and lifetime
  float particleTime = mod(time + timeOffset, duration);
  vLifetime = particleTime / duration;

  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    gl_Position = vec4(0.0);
    return;
  }

  vec3 particlePosition = spawnPosition;
  // Velocity starts fast and gradually decelerates
  float velocityFactor = exp(-20.0 * vLifetime);
  // Distance traveled always increases but at decreasing rate
  float distanceTraveled = speed * (1.0 - velocityFactor) * 1.25;
  particlePosition += direction * distanceTraveled;
  // Gravity takes over as horizontal speed decreases
  particlePosition.y -= 9.8 * 0.5 * vLifetime * vLifetime * 15.0;
  // Particles oscillate down as gravity takes over
  float floatTime = time * 0.5 + timeOffset * 1000.0;
  float floatAmplitude = 10.0 * vLifetime;
  particlePosition.x += sin(floatTime) * floatAmplitude;
  particlePosition.z += cos(floatTime) * floatAmplitude;

  // Construct billboarded coordinate frame
  vec3 toCameraVector = normalize(cameraPosition - particlePosition);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 right = normalize(cross(up, toCameraVector));
  up = normalize(cross(toCameraVector, right));

  // Add rotation around the forward vector (camera-facing)
  float rotationAngle = 20.0 * rotationDirection * floatTime;
  float cosAngle = cos(rotationAngle);
  float sinAngle = sin(rotationAngle);
  vec3 rotatedUp = cosAngle * up + sinAngle * cross(toCameraVector, up);
  vec3 rotatedRight = cosAngle * right + sinAngle * cross(toCameraVector, right);
  // Rotate the up vector (already rotated around forward) around the right vector
  vec3 finalUp = cosAngle * rotatedUp + sinAngle * cross(rotatedRight, rotatedUp);

  vec3 orientedPosition = position.x * rotatedRight * scale +
    position.y * finalUp * scale;

  vColor = color;

  gl_Position = projectionMatrix * viewMatrix * vec4(particlePosition + orientedPosition, 1.0);
}
`,Qd=`varying float vLifetime;
varying vec3 vColor;

void main() {
  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    discard;
  }

  gl_FragColor = vec4(vColor, 1.0);
}
`;function Zd(){const{confettiEmitterPositions:i,confettiEmitterForwardVectors:o}=S.useMemo(()=>{const d=[new R(-2868.418649274429,332.00128173828125,-151.26460133596436),new R(-2914.6054824268967,332.00128173828125,-174.18768685244925),new R(-2959.6726347756685,332.00128173828125,-196.55506120489815),new R(-3004.7397871244407,332.00128173828125,-218.92243555734706),new R(-3049.8069394732124,332.00128173828125,-241.28980990979593),new R(-2989.8520651648887,333.0174255371094,-294.5401036876995),new R(-2938.641449867131,333.0174255371094,-288.526428681926),new R(-2888.672304031137,333.0174255371094,-282.65853973689855),new R(-2838.7031581951433,333.0174255371094,-276.7906507918711),new R(-2788.7340123591493,333.0174255371094,-270.9227618468436),new R(-2758.1878538748315,323.4066162109375,-182.8829572267196),new R(-2798.190391028749,323.4066162109375,-175.798633247015),new R(-2836.9620808856234,323.4066162109375,-168.93228846668592)],y=[new R(.26131106140371435,.8090169943749472,-.526505490950086),new R(.26131106140371435,.8090169943749472,-.526505490950086),new R(.26131106140371435,.8090169943749472,-.526505490950086),new R(.26131106140371435,.8090169943749472,-.526505490950086),new R(.26131106140371435,.8090169943749472,-.526505490950086),new R(-.06855271719706194,.8090169943749473,.5837739526369998),new R(-.06855271719706194,.8090169943749473,.5837739526369998),new R(-.06855271719706194,.8090169943749473,.5837739526369998),new R(-.06855271719706194,.8090169943749473,.5837739526369998),new R(-.06855271719706194,.8090169943749473,.5837739526369998),new R(-.10249996695956407,.8090169943749472,-.5787791112210381),new R(-.10249996695956407,.8090169943749472,-.5787791112210381),new R(-.10249996695956407,.8090169943749472,-.5787791112210381)];return{confettiEmitterPositions:d,confettiEmitterForwardVectors:y}},[]),c=S.useMemo(()=>{const E=new Float32Array(31200),I=new le,C=new R(0,0,1),F=new R,M=new le,O=new R,U=[new $("#1c5ed1"),new $("#38b6fa"),new $("#17ac54"),new $("#0a3c3f"),new $("#fede57"),new $("#e59c01"),new $("#dd4979"),new $("#75022d"),new $("#8340d0"),new $("#2a0164"),new $("#a3638d"),new $("#dd8865"),new $("#ce6658"),new $("#fe3500"),new $("#ad2b1f"),new $("#ff7900"),new $("#b1e81b")];let L=0;for(let g=0;g<13;g++){I.setFromUnitVectors(C,o[g]);for(let f=0;f<200;f++){const b=i[g],p=Math.random()*Math.PI*2,T=.54*Math.random(),w=Math.cos(p)*T,V=0,q=Math.sin(p)*T,B=Dt(15),G=Math.random()*2*Math.PI,J=Math.acos(1-Math.random()*(1-Math.cos(B)));F.set(Math.sin(J)*Math.cos(G),Math.sin(J)*Math.sin(G),Math.cos(J)),F.applyQuaternion(I),M.setFromUnitVectors(o[g],F),O.copy(o[g]).applyQuaternion(M).normalize();const ee=U[Math.floor(Math.random()*U.length)];E[L*12+0]=b.x+w,E[L*12+1]=b.y+V,E[L*12+2]=b.z+q,E[L*12+3]=25+Math.random()*25,E[L*12+4]=O.x,E[L*12+5]=O.y,E[L*12+6]=O.z,E[L*12+7]=Math.random()*10,E[L*12+8]=ee.r,E[L*12+9]=ee.g,E[L*12+10]=ee.b,E[L*12+11]=Math.random()<.5?-1:1,L++}}const N=new qe(E,12),v=new nn(.01,.005);return v.setAttribute("spawnPosition",new z(N,3,0)),v.setAttribute("scale",new z(N,1,3)),v.setAttribute("direction",new z(N,3,4)),v.setAttribute("timeOffset",new z(N,1,7)),v.setAttribute("color",new z(N,3,8)),v.setAttribute("rotationDirection",new z(N,1,11)),v},[i,o,13,2600]),h=S.useMemo(()=>new ze({uniforms:{time:{value:0}},vertexShader:Yd,fragmentShader:Qd,side:Pn}),[]),u=S.useRef(null);return re(d=>{if(h.uniforms.time.value=d.clock.elapsedTime,!u.current)return;const{normalizedProgress:y}=Q.getState();y>=ne.turnOnFinishLineEffects&&!u.current.visible?u.current.visible=!0:y<ne.turnOnFinishLineEffects&&u.current.visible&&(u.current.visible=!1)}),_.jsx("instancedMesh",{ref:u,args:[c,h,2600],frustumCulled:!1,visible:!1})}const wi="/cdn.shopify.com/3d/models/8da7a3be10a05a1a/racing_game_track_69_moon.glb";function ef({visible:t=!1}){const{nodes:e,materials:n,scene:r}=je(wi),[i,o]=S.useState(null),[c,h]=S.useState({positions:[],quaternions:[],isBigGrandstand:[],mesh:null}),[u,d]=S.useState({position:new R,quaternion:new le,scale:new R}),[y,P]=S.useState({position:new R,mesh:null});S.useLayoutEffect(()=>{o(e.road_mesh_moon.geometry.clone()),r.remove(e.road_mesh_moon);const A=[],E=[],I=[];let C=null;const F=new R,M=new R;let O=null;r.traverse(U=>{if(U.name.startsWith("crowdempty")&&U instanceof Ct){const L=new R,N=new le;U.getWorldPosition(L),U.getWorldQuaternion(N),A.push(L),E.push(N),I.push(U.name==="crowdempty000"||U.name==="crowdempty001")}else U.name==="lil_person"&&U instanceof At?C=U:U.name==="earthempty"&&U instanceof Ct?U.getWorldPosition(F):U.name==="gemeralds"&&U instanceof At&&(U.getWorldPosition(M),M.add(new R(0,-5,0)),O=U)}),C&&r.remove(C),O&&r.remove(O),h({positions:A,quaternions:E,isBigGrandstand:I,mesh:C}),d({position:F,quaternion:new le(-.11200613305991418,.4504190561655882,.0485347218704449,.8844329713187075).normalize(),scale:new R(145.80216147838505,145.80210975297229,145.80217606133363)}),P({position:M,mesh:O})},[n,e,r]);const k=S.useRef(null);return n["landing lights glow"].onBeforeCompile=A=>{k.current=A,A.uniforms.time={value:0},A.vertexShader=A.vertexShader.replace("#include <common>",`
    #include <common>
    varying vec2 vUv;`),A.vertexShader=A.vertexShader.replace("#include <begin_vertex>",`
    #include <begin_vertex>
    vUv = uv;`),A.fragmentShader=A.fragmentShader.replace("#include <common>",`
    #include <common>
    uniform float time;
    varying vec2 vUv;`),A.fragmentShader=A.fragmentShader.replace("#include <opaque_fragment>",`
    float lerpFactor = mod((1.0 - vUv.y) - time * 1.5, 1.0);
    outgoingLight *= lerpFactor;
    #include <opaque_fragment>`)},re(({clock:A})=>{k.current&&(k.current.uniforms.time.value=A.elapsedTime)}),_.jsx(_.Fragment,{children:_.jsxs("group",{visible:t,children:[_.jsxs("group",{rotation:[0,Math.PI,0],children:[_.jsx("primitive",{object:r}),_.jsx(vi,{roadGeometry:i,fogColor:ic,fogDistance:800}),y.mesh&&_.jsx(qd,{crystalsMesh:y.mesh})]}),c.positions.length>0&&c.quaternions.length>0&&c.mesh&&_.jsxs(_.Fragment,{children:[_.jsx(Td,{crowdPositions:c.positions,crowdQuaternions:c.quaternions,isBigGrandstand:c.isBigGrandstand,crowdMesh:c.mesh}),_.jsx(Ed,{crowdPositions:c.positions,crowdQuaternions:c.quaternions,isBigGrandstand:c.isBigGrandstand})]}),_.jsx("group",{position:u.position,quaternion:u.quaternion,scale:u.scale,children:_.jsx(zd,{})}),y.mesh&&_.jsx(Jd,{crystalsPosition:y.position}),_.jsx(Zd,{})]})})}je.preload(wi);const vc=`uniform sampler2D causticsMap;
uniform float time;
varying vec3 vWorldPosition;

const float causticsSpeed = 0.04;
const float causticsStrength = 0.5;
const float caustics1Scale = 0.03;
const float caustics2Scale = 0.018;

vec3 sampleCaustics(sampler2D tex, vec3 worldPos, float scale, float speed, float time) {
  vec2 xzCoords = worldPos.xz;
  vec2 causticsUv = xzCoords * scale + speed * time;
  return texture2D(tex, causticsUv).rgb;
}
`,yc=`vec3 caustics1 = sampleCaustics(causticsMap, vWorldPosition, caustics1Scale, causticsSpeed, time);
vec3 caustics2 = sampleCaustics(causticsMap, vWorldPosition, caustics2Scale, -causticsSpeed * 0.5, time);

vec3 caustics = min(caustics1, caustics2);

gl_FragColor.rgb += caustics * causticsStrength;
gl_FragColor.gb *= 2.2;
`,wc=`varying vec3 vWorldPosition;
`,Sc=`vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
`,tf=`uniform float time;
const float duration = 15.0;
const float speed = 60.0;

attribute vec3 spawnPosition;
attribute float scale;
attribute vec3 direction;
attribute float timeOffset;

varying vec2 vUv;
varying float vLifetime;
varying vec3 vViewPosition;

void main() {
  vUv = uv;

  // Calculate looping particle time and lifetime
  float particleTime = mod(time + timeOffset, duration);
  vLifetime = particleTime / duration;

  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    gl_Position = vec4(0.0);
    return;
  }

  vec3 particlePosition = spawnPosition;
  // Move the particle along the direction vector
  particlePosition += direction * vLifetime * speed;

  vec3 toCameraVector = normalize(cameraPosition - particlePosition);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 right = normalize(cross(up, toCameraVector));
  up = normalize(cross(toCameraVector, right));

  // Orient the particle to face the camera
  vec3 orientedPosition = position.x * right * scale +
    position.y * up * scale;

  vec4 viewPosition = viewMatrix * vec4(particlePosition + orientedPosition, 1.0);
  vViewPosition = -viewPosition.xyz;

  gl_Position = projectionMatrix * viewPosition;
}
`,nf=`uniform sampler2D bubbleTexture;
const vec3 fogColor = vec3(0.00030352698352941176, 0.14126329113044458, 0.23839757380151394);
const float fogDistance = 200.0;

varying vec2 vUv;
varying float vLifetime;
varying vec3 vViewPosition;

void main() {
  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    discard;
  }

  vec4 bubbleColor = texture2D(bubbleTexture, vUv);
  if(bubbleColor.a < 0.1) {
    discard;
  }

  gl_FragColor = bubbleColor;

  float fogFactor = smoothstep(1.0, fogDistance, vViewPosition.z);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
}
`,_c="/cdn.shopify.com/s/files/1/0921/8919/6588/files/bubble_blue_transparent_64.png?v=1746445929";function rf({bubbleEmitterPositions:t}){const n=t.length,r=100*n,i=Le(_c),o=15,c=S.useMemo(()=>{const A=new Float32Array(r*8);let E=0;for(let F=0;F<n;F++)for(let M=0;M<100;M++){const O=t[F],U=Math.random()*Math.PI*2,L=.54*Math.random(),N=Math.cos(U)*L,v=0,g=Math.sin(U)*L,f=new R((Math.random()*2-1)*.25,1,(Math.random()*2-1)*.25).normalize();A[E*8+0]=O.x+N,A[E*8+1]=O.y+v,A[E*8+2]=O.z+g,A[E*8+3]=10+Math.random()*120,A[E*8+4]=f.x,A[E*8+5]=f.y,A[E*8+6]=f.z,A[E*8+7]=Math.random()*o,E++}const I=new qe(A,8),C=new nn(.01,.01);return C.setAttribute("spawnPosition",new z(I,3,0)),C.setAttribute("scale",new z(I,1,3)),C.setAttribute("direction",new z(I,3,4)),C.setAttribute("timeOffset",new z(I,1,7)),C},[t,n,r]),h=S.useMemo(()=>new ze({uniforms:{time:{value:0},bubbleTexture:{value:i}},vertexShader:tf,fragmentShader:nf}),[i]);return re(u=>{h.uniforms.time.value=u.clock.elapsedTime}),_.jsx("instancedMesh",{args:[c,h,r],frustumCulled:!1})}Le.preload(_c);function sf(t){const e=new Map,n=new Map,r=t.clone();return bc(t,r,function(i,o){e.set(o,i),n.set(i,o)}),r.traverse(function(i){if(!i.isSkinnedMesh)return;const o=i,c=e.get(i),h=c.skeleton.bones;o.skeleton=c.skeleton.clone(),o.bindMatrix.copy(c.bindMatrix),o.skeleton.bones=h.map(function(u){return n.get(u)}),o.bind(o.skeleton,o.bindMatrix)}),r}function bc(t,e,n){n(t,e);for(let r=0;r<t.children.length;r++)bc(t.children[r],e.children[r],n)}const Pc="/cdn.shopify.com/3d/models/69754b2405c3dbe4/shark_super_optimized.glb";function Xo(t){const e=S.useRef(null),{scene:n,animations:r}=je(Pc),{actions:i}=ec(r,e),{nodes:o}=S.useMemo(()=>{const h=sf(n),u={Shark_Mesh:new Cu,spine003:new Fo,neutral_bone:new Fo};return h.traverse(d=>{d.name==="Shark_Mesh"?u.Shark_Mesh=d:d.name==="spine003"?u.spine003=d:d.name==="neutral_bone"&&(u.neutral_bone=d)}),{nodes:u}},[n]);S.useEffect(()=>{i!=null&&i.Move&&(i.Move.loop=tc,i.Move.clampWhenFinished=!0)},[i]);const c=S.useRef(!1);return re(()=>{var u,d,y,P,k,A;const{normalizedProgress:h}=Q.getState();h>=t.normalizedProgressAtWhichToPlayAnimation&&!c.current?(e.current.visible=!0,(u=i==null?void 0:i.Move)==null||u.reset(),(d=i==null?void 0:i.Chomp)==null||d.reset(),(y=i==null?void 0:i.Move)==null||y.play(),(P=i==null?void 0:i.Chomp)==null||P.play(),c.current=!0):h<t.normalizedProgressAtWhichToPlayAnimation&&c.current&&(e.current.visible=!1,(k=i==null?void 0:i.Move)==null||k.stop(),(A=i==null?void 0:i.Chomp)==null||A.stop(),c.current=!1)}),_.jsx("group",{ref:e,...t,dispose:null,visible:!1,children:_.jsx("group",{name:"Scene",children:_.jsxs("group",{name:"SharkRig",children:[_.jsx("skinnedMesh",{name:"Shark_Mesh",geometry:o.Shark_Mesh.geometry,material:t.paletteMaterial,skeleton:o.Shark_Mesh.skeleton}),_.jsx("primitive",{object:o.spine003}),_.jsx("primitive",{object:o.neutral_bone})]})})})}je.preload(Pc);const of=`uniform float time;
const float speed = 0.5;
const float wobbleAmplitude = 0.1;
const float wobbleSpeed = 10.0;
const float wobbleFrequency = 5.0;

attribute vec3 circleCenter;
attribute float circleRadius;
attribute vec2 positionOffset;
attribute float scale;
attribute float timeOffset;
attribute float randomNumber;
attribute float fishID;
attribute float rotationDirection;

varying vec2 vUv;
varying vec3 vViewPosition;
varying float vFishID;

const vec3 worldUp = vec3(0.0, 1.0, 0.0);

vec3 computeParticlePosition(float currentTime) {
  // Compute the position of the particle along the circular path
  float particleTime = currentTime + timeOffset;
  float angle = particleTime * speed * rotationDirection;
  vec3 radiusVector = vec3(cos(angle) * circleRadius, 0.0, sin(angle) * circleRadius);
  vec3 particlePosition = circleCenter + radiusVector;

  // Offset the particle along the radius vector and the up vector
  // Here we combine the constant offsets we receive as attributes with sinusoidal offsets
  float randomizedParticleTime = currentTime + randomNumber;
  float xOffset = positionOffset.x + cos(randomizedParticleTime * 2.5);
  float yOffset = positionOffset.y + sin(randomizedParticleTime * 2.5);
  particlePosition += xOffset * normalize(radiusVector) + yOffset * worldUp;

  return particlePosition;
}

void main() {
  vUv = uv;
  vFishID = fishID;

  // Compute the current position of the particle and the next one
  vec3 particlePosition = computeParticlePosition(time);
  vec3 nextParticlePosition = computeParticlePosition(time + 0.01);

  // Compute the coordinate frame of the particle
  vec3 direction = normalize(nextParticlePosition - particlePosition);
  vec3 right = normalize(cross(direction, worldUp));
  vec3 up = normalize(cross(right, direction));

  // Orient the particle so it faces its movement direction
  // Here we also make it wobble lengthwise to make it look like a fish that's swimming
  float wobble = cos((time + randomNumber) * wobbleSpeed + vUv.x * wobbleFrequency) * wobbleAmplitude;
  vec3 orientedPosition = position.x * direction * scale + position.y * up * scale + right * wobble;

  vec4 viewPosition = viewMatrix * vec4(particlePosition + orientedPosition, 1.0);
  vViewPosition = -viewPosition.xyz;
  gl_Position = projectionMatrix * viewPosition;
}
`,af=`uniform sampler2D fishTextureAtlas;
const vec3 fogColor = vec3(0.00030352698352941176, 0.14126329113044458, 0.23839757380151394);
const float fogDistance = 200.0;

varying vec2 vUv;
varying vec3 vViewPosition;
varying float vFishID;

void main() {
  // Calculate the row and column based on vFishID, which ranges from 0 to 7
  // Column: 0 or 1
  float column = mod(vFishID, 2.0);
  // Row: 0, 1, 2, or 3
  float row = floor(vFishID / 2.0);

  // Calculate the UV coordinates for the specific fish
  vec2 fishUv = vec2((1.0 - vUv.x) * 0.5 + column * 0.5, // 0.5 (half of texture width)
  vUv.y * 0.25 + row * 0.25 // 0.25 (quarter of texture height)
  );

  vec4 fishColor = texture2D(fishTextureAtlas, fishUv);
  if(fishColor.a < 0.9) {
    discard;
  }

  gl_FragColor = fishColor;

  float fogFactor = smoothstep(1.0, fogDistance, vViewPosition.z);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
}
`,Tc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/fish_atlas_256.png?v=1747660606";function cf({circleCenters:t,circleRadii:e}){const r=t.length,i=100*r,o=Le(Tc,u=>{u.colorSpace=Nn}),c=S.useMemo(()=>{const I=new Float32Array(i*11);let C=0;for(let O=0;O<r;O++){const U=t[O],L=e[O],N=5+Math.random()*1,v=2+Math.random()*1,g=Math.floor(Math.random()*8),f=Math.random()>.5?1:-1;for(let b=0;b<100;b++){const p=Math.random()*Math.PI*2,T=N*Math.random(),w=Math.cos(p)*T,V=Math.sin(p)*T;I[C*11+0]=U.x,I[C*11+1]=U.y,I[C*11+2]=U.z,I[C*11+3]=L,I[C*11+4]=w,I[C*11+5]=V,I[C*11+6]=100+Math.random()*120,I[C*11+7]=Math.random()*v,I[C*11+8]=Math.random()*100,I[C*11+9]=g,I[C*11+10]=f,C++}}const F=new qe(I,11),M=new nn(.02,.01,10,1);return M.setAttribute("circleCenter",new z(F,3,0)),M.setAttribute("circleRadius",new z(F,1,3)),M.setAttribute("positionOffset",new z(F,2,4)),M.setAttribute("scale",new z(F,1,6)),M.setAttribute("timeOffset",new z(F,1,7)),M.setAttribute("randomNumber",new z(F,1,8)),M.setAttribute("fishID",new z(F,1,9)),M.setAttribute("rotationDirection",new z(F,1,10)),M},[t,e,r,i]),h=S.useMemo(()=>new ze({uniforms:{time:{value:0},fishTextureAtlas:{value:o}},vertexShader:of,fragmentShader:af,side:Pn}),[o]);return re(u=>{h.uniforms.time.value=u.clock.elapsedTime}),_.jsx("instancedMesh",{args:[c,h,i],frustumCulled:!1})}Le.preload(Tc);const lf=`varying vec2 vUv;
varying vec3 vStartColor;
varying vec3 vEndColor;
`,uf=`diffuseColor = vec4(mix(vStartColor, vEndColor, 1.0 - vUv.y), 1.0);
`,hf=`uniform float time;
const float swayAmplitude = 1.5;
const float swaySpeed = 0.75;
const float swayFrequency = 5.0;

attribute vec3 seaweedPosition;
attribute float seaweedScale;
attribute float globalTimeOffset;
attribute vec3 startColor;
attribute vec3 endColor;
attribute float _timeoffset;

varying vec2 vUv;
varying vec3 vStartColor;
varying vec3 vEndColor;
`,df=`vec3 transformed = position * seaweedScale;
float t = time * swaySpeed + globalTimeOffset + _timeoffset * 100.0 + uv.y * swayFrequency;
float amplitude = (1.0 - uv.y) * swayAmplitude;
transformed.x += cos(t) * amplitude;
transformed.z += sin(t) * amplitude;
transformed += seaweedPosition;

vUv = uv;
vStartColor = startColor;
vEndColor = endColor;
`;function ff({seaweedPositions:t,seaweedMesh:e,causticsTexture:n}){const r=t.length,i=S.useMemo(()=>{const y=new Float32Array(r*11),P=[new $("#a16392"),new $("#7c5594"),new $("#ca7453"),new $("#618330")],k=[new $("#af6478"),new $("#9266a1"),new $("#ca7453"),new $("#a4c36b")];for(let I=0;I<r;I++){const C=t[I],F=Math.floor(Math.random()*P.length),M=P[F],O=k[F];y[I*11+0]=C.x,y[I*11+1]=C.y,y[I*11+2]=C.z,y[I*11+3]=.75+Math.random()*.5,y[I*11+4]=Math.random()*100,y[I*11+5]=M.r,y[I*11+6]=M.g,y[I*11+7]=M.b,y[I*11+8]=O.r,y[I*11+9]=O.g,y[I*11+10]=O.b}const A=new qe(y,11),E=e.geometry;return E.setAttribute("seaweedPosition",new z(A,3,0)),E.setAttribute("seaweedScale",new z(A,1,3)),E.setAttribute("globalTimeOffset",new z(A,1,4)),E.setAttribute("startColor",new z(A,3,5)),E.setAttribute("endColor",new z(A,3,8)),E},[r,e,t]),o=S.useRef(null),c=S.useMemo(()=>{const h=new xu({roughness:.9272727370262146,metalness:0,side:Pn});return h.onBeforeCompile=u=>{o.current=u,u.uniforms.time={value:0},u.uniforms.causticsMap={value:n},u.vertexShader=u.vertexShader.replace("#include <common>",`
        #include <common>
        ${hf}
        ${wc}`),u.vertexShader=u.vertexShader.replace("#include <begin_vertex>",`
        ${df}`),u.vertexShader=u.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
         ${Sc}`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`
        #include <common>
        ${lf}
        ${vc}`),u.fragmentShader=u.fragmentShader.replace("#include <color_fragment>",`
        ${uf}`),u.fragmentShader=u.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
        ${yc}`)},h},[n]);return re(h=>{o.current&&(o.current.uniforms.time.value=h.clock.elapsedTime)}),_.jsx("instancedMesh",{args:[i,c,r],frustumCulled:!1})}const Si="/cdn.shopify.com/3d/models/27d4cebda02b09a4/racing_game_track_64_underwater.glb",Ic="/cdn.shopify.com/s/files/1/0921/8919/6588/files/caustics-texture_128.jpg?v=1747660972";function mf({visible:t=!1}){const{nodes:e,materials:n,scene:r}=je(Si),[i,o]=S.useState(null),c=S.useRef(null),[h,u]=S.useState([]),[d,y]=S.useState({positions:[],mesh:null}),[P,k]=S.useState({centers:[],radii:[]}),A=Le(Ic,I=>{I.wrapS=Un,I.wrapT=Un});S.useLayoutEffect(()=>{n["glass tube"].transparent=!0,n["glass tube"].opacity=.4,n["glass tube"].roughness=.3,n["glass tube"].color=new $(48127),n["glass tube"].map=null,o(e.road_mesh_underwater.geometry.clone()),r.remove(e.road_mesh_underwater);const I=[],C=[];let F=null;const M=[],O=[];r.traverse(U=>{if(U.name.startsWith("bubbles")&&U instanceof Ct){const L=new R;U.getWorldPosition(L),I.push(L)}else if(U.name.startsWith("seaweedempty")&&U instanceof Ct){const L=new R;U.getWorldPosition(L),C.push(L)}else if(U.name==="seaweed"&&U instanceof At)F=U,F.geometry.rotateX(Math.PI*.5);else if(U.name.startsWith("fishcircle")&&U instanceof Ct){const L=new R;U.getWorldPosition(L);const N=U.name.match(/fishcircle(\d+)m/);if(N&&N[1]){const v=parseInt(N[1],10);M.push(L),O.push(v)}}}),F&&r.remove(F),u(I),y({positions:C,mesh:F}),k({centers:M,radii:O})},[n,e,r]),n.palette.onBeforeCompile=I=>{I.uniforms.causticsMap={value:A},I.uniforms.time={value:0},c.current=I,I.vertexShader=I.vertexShader.replace("#include <common>",`#include <common>
       ${wc}`),I.vertexShader=I.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
       ${Sc}`),I.fragmentShader=I.fragmentShader.replace("#include <common>",`#include <common>
      ${vc}`),I.fragmentShader=I.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
      ${yc}`)};const E=S.useRef(null);return n["glow rainbow"].onBeforeCompile=I=>{E.current=I,I.uniforms.time={value:0},I.vertexShader=I.vertexShader.replace("#include <common>",`
      #include <common>
      varying vec2 vUv;`),I.vertexShader=I.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      vUv = uv;`),I.fragmentShader=I.fragmentShader.replace("#include <common>",`
      #include <common>
      uniform float time;
      const float speed = 1.3;
      const float bloomIntensity = 10.0;
      varying vec2 vUv;
      vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
      {
        return a + b*cos( 6.28318*(c*t+d) );
      }`),I.fragmentShader=I.fragmentShader.replace("#include <opaque_fragment>",`
      float lerpFactor = mod((1.0 - vUv.y) - time * speed, 1.0);
      outgoingLight = pal(lerpFactor, vec3(0.5,0.5,0.5), vec3(0.5,0.5,0.5), vec3(1.0,1.0,1.0), vec3(0.0,0.33,0.67)) * bloomIntensity;
      #include <opaque_fragment>`)},re(({clock:I})=>{c.current&&(c.current.uniforms.time.value=I.elapsedTime),E.current&&(E.current.uniforms.time.value=I.elapsedTime)}),_.jsxs(_.Fragment,{children:[_.jsx("color",{attach:"background",args:[Xs]}),_.jsxs("group",{visible:t,children:[_.jsxs("group",{rotation:[0,Math.PI,0],children:[_.jsx("primitive",{object:r}),_.jsx(vi,{roadGeometry:i,enableCaustics:!0,color1:new $(.01,.045,.03),color2:new $(.01,.045,.03),fogDistance:200,fogColor:Xs})]}),h.length>0&&_.jsx(rf,{bubbleEmitterPositions:h}),d.positions.length>0&&d.mesh!==null&&_.jsx(ff,{seaweedPositions:d.positions,seaweedMesh:d.mesh,causticsTexture:A}),P.centers.length>0&&P.radii.length>0&&_.jsx(cf,{circleCenters:P.centers,circleRadii:P.radii}),_.jsx("group",{children:_.jsx(Xo,{position:[-824.937988281,-88.3865966797,-140.405487061],quaternion:new le(-.012816864381902621,.1286016332395578,-.006074555063051129,.9915949005269455).normalize(),scale:1.05,paletteMaterial:n.palette,normalizedProgressAtWhichToPlayAnimation:ne.firstShark})}),_.jsx("group",{children:_.jsx(Xo,{position:[-871.1156005859375,-81.8184127808,-206.072235107422],quaternion:new le(-.01590894803245324,-.37648649893108843,-.02576104563573861,.9259272059442236).normalize(),scale:.8,paletteMaterial:n.palette,normalizedProgressAtWhichToPlayAnimation:ne.secondShark})})]})]})}je.preload(Si);Le.preload(Ic);function pf(){re(({camera:e})=>{const{normalizedProgress:n}=Q.getState();e.position.y<0?K.getState().setLoadedScene(Tt.Underwater):n>=ne.loadMoon?K.getState().setLoadedScene(Tt.Moon):n<=ne.secondJump?K.getState().setLoadedScene(Tt.Beach):K.getState().setLoadedScene(Tt.None)});const t=K(e=>e.loadedScene);return _.jsxs(_.Fragment,{children:[_.jsx(wd,{visible:t===Tt.Beach}),_.jsx(mf,{visible:t===Tt.Underwater}),_.jsx(ef,{visible:t===Tt.Moon})]})}const Ac="/cdn.shopify.com/s/files/1/0921/8919/6588/files/env_map_05.1.exr?v=1747658945",Ec="/cdn.shopify.com/s/files/1/0921/8919/6588/files/waterenv-05.exr?v=1747658945",Cc="/cdn.shopify.com/s/files/1/0921/8919/6588/files/moonenv-02.exr?v=1747658945";function gf(){const t=K(n=>n.isCameraUnderwater),e=K(n=>n.isCameraInMoonArea);return _.jsx(_.Fragment,{children:_.jsx(Ru,{files:e?Cc:t?Ec:Ac,environmentRotation:[0,-Math.PI*.5,0],environmentIntensity:1.5})})}mi.preload({files:Ac});mi.preload({files:Ec});mi.preload({files:Cc});function vf(){const t=K(n=>n.isCameraUnderwater),e=K(n=>n.isCameraInMoonArea);return _.jsxs(_.Fragment,{children:[t&&_.jsx("fog",{attach:"fog",near:1,far:150,color:Xs}),!e&&!t&&_.jsx(_.Fragment,{children:_.jsx("fog",{attach:"fog",near:1,far:700,color:sc})}),e&&_.jsx("fog",{attach:"fog",near:1,far:1060,color:ic})]})}const yf=`uniform float time;
uniform float duration;
uniform float speed;

attribute vec3 spawnPosition;
attribute float scaleX;
attribute float scaleY;
attribute float timeOffset;
attribute float durationOffset;

varying vec2 vUv;
varying float vLifetime;

void main() {
  vUv = uv;

  // Calculate the duration time with extra randomness using durationOffset
  float randomizedDuration = duration + durationOffset;

  float particleTime = mod(time + timeOffset, randomizedDuration);
  // Keep using the base duration for lifetime calculation to not affect speed
  vLifetime = particleTime / duration;

  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    gl_Position = vec4(0.0);
    return;
  }

  vec3 particlePosition = spawnPosition;
  vec3 direction = vec3(0.0, 0.0, 1.0);
  // Move the particle along the direction vector
  particlePosition += direction * vLifetime * speed;

  vec3 forward = normalize(direction);
  // We are working in local space with the camera at the origin
  // That's why the toCameraVector is just the position of the particle negated,
  // which is the same as saying: normalize(cameraPosition - particlePosition)
  vec3 toCameraVector = normalize(-particlePosition);
  vec3 right = normalize(cross(forward, toCameraVector));
  // Orient the particle along the direction vector while at the same time making it face the camera
  vec3 orientedPosition = position.x * right * scaleX +
    position.y * forward * scaleY;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(particlePosition + orientedPosition, 1.0);
}
`,wf=`const float opacity = 0.65;
uniform float fadeProgress;
const vec3 color = vec3(1.0, 1.0, 1.0);
const float bloomIntensity = 1.32;
const float headWidth = 0.51;
const float tailWidth = 0.97;
uniform float globalOpacity;

varying vec2 vUv;
varying float vLifetime;

float easeInCubic(float x) {
  return x * x * x;
}

void main() {
  if(vLifetime <= 0.0 || vLifetime >= 1.0) {
    discard;
  }

  // vUv.y represents the position along the length of the particle
  // vUv.y = 0 is the tail of the particle and vUv.y = 1 is the head
  float currentWidth = mix(tailWidth, headWidth, vUv.y);

  // vUv.x ranges from 0 to 1 across the width of the particle
  // We want to normalize it to the [-0.5, 0.5] range where 0 is the center
  float normalizedX = vUv.x - 0.5;

  // Discard if the current x position is outside the width for this part of the line
  // We divide by 0.5 because normalizedX ranges from -0.5 to 0.5 (total width of 1)
  // and we want the width to be proportional to the current width
  if(abs(normalizedX) > (currentWidth * 0.5)) {
    discard;
  }

  gl_FragColor = vec4(color * bloomIntensity, easeInCubic(vUv.y) * opacity * fadeProgress * globalOpacity);
}
`;function Sf(){const e=S.useRef(null),n=230,r=195,i=10,o=1.12,c=1.5,h=2.24,u=5,d=-.84,y=-3.5,P=1.87,k=127,A=1.43,E=12.5,I=S.useMemo(()=>({speedLineSpeed:4.71,speedLineDuration:.35,baseScaleX:1.45,baseScaleY:187.7,maxRandomScaleIncreaseX:1.6,maxRandomScaleIncreaseY:200,maxRandomDurationIncrease:0,innerRadiusOfSpawnArea:1.36,outerRadiusOfSpawnArea:2}),[]),C=S.useCallback((B,G,J,ee,he,ie,de,Ce)=>{const te=new Float32Array(2100);for(let X=0;X<300;X++){const Te=Math.random()*Math.PI*2,Ie=B+Math.random()*(G-B),be=Math.cos(Te)*Ie,Ae=Math.sin(Te)*Ie;te[X*7+0]=be,te[X*7+1]=d+Ae,te[X*7+2]=y,te[X*7+3]=J+Math.random()*he,te[X*7+4]=ee+Math.random()*ie,te[X*7+5]=Math.random()*de,te[X*7+6]=Math.random()*Ce}const Y=new qe(te,7),W=new nn(.01,.01);return W.setAttribute("spawnPosition",new z(Y,3,0)),W.setAttribute("scaleX",new z(Y,1,3)),W.setAttribute("scaleY",new z(Y,1,4)),W.setAttribute("timeOffset",new z(Y,1,5)),W.setAttribute("durationOffset",new z(Y,1,6)),W},[y,d]),F=S.useMemo(()=>C(h,u,P,k,A,E,o,c),[P,k,A,E,h,u,o,c,C]),M=S.useMemo(()=>C(I.innerRadiusOfSpawnArea,I.outerRadiusOfSpawnArea,I.baseScaleX,I.baseScaleY,I.maxRandomScaleIncreaseX,I.maxRandomScaleIncreaseY,I.speedLineDuration,I.maxRandomDurationIncrease),[I,C]),O=S.useMemo(()=>new ze({uniforms:{time:{value:0},duration:{value:o},speed:{value:i},fadeProgress:{value:0},globalOpacity:{value:1}},vertexShader:yf,fragmentShader:wf,transparent:!0,blending:as,depthTest:!1}),[o,i]),U=S.useRef(0),L=S.useRef(0),[N,v]=kt(()=>({from:{progress:0},config:{easing:Mt.linear,duration:1e3},onChange:()=>{U.current=N.progress.get()}}),[O]),[g,f]=kt(()=>({from:{progress:0},config:{easing:Mt.linear,duration:1e3},onChange:()=>{L.current=g.progress.get()}}),[O]),[b,p]=kt(()=>({from:{progress:1},config:{easing:Mt.linear,duration:1e3},onChange:()=>{O.uniforms.globalOpacity.value=b.progress.get()}}),[O]),T=S.useRef(!1),w=S.useRef(!1),V=S.useRef("normal"),q=S.useRef(null);return re(B=>{const G=B.clock.elapsedTime;if(e.current){const de=B.camera;e.current.position.copy(de.position),e.current.quaternion.copy(de.quaternion)}const{isDrifting:J,speed:ee,normalizedProgress:he}=Q.getState();ee>=n&&!T.current?(v.start({to:{progress:1}}),T.current=!0):ee<n&&T.current&&(v.start({to:{progress:0}}),T.current=!1),J&&ee>=r&&!w.current?(f.start({to:{progress:1}}),w.current=!0):(!J||ee<r)&&w.current&&(f.start({to:{progress:0}}),w.current=!1);const ie=Math.max(U.current,L.current);O.uniforms.fadeProgress.value=ie,he>=ne.fadeOutSpeedLines&&he<ne.fadeInMoonshotSpeedLines&&V.current==="normal"?(p.start({to:{progress:0},config:{duration:1e3}}),V.current="faded_out"):he>=ne.fadeInMoonshotSpeedLines&&he<ne.moonApex&&V.current==="faded_out"?(q.current&&(q.current.geometry=M),O.uniforms.speed.value=I.speedLineSpeed,O.uniforms.duration.value=I.speedLineDuration,p.start({to:{progress:1},config:{duration:3e3}}),V.current="moonshot"):he>=ne.moonApex&&V.current==="moonshot"?(p.start({to:{progress:0},config:{duration:1500}}),V.current="faded_out_after_moonshot"):he>=ne.fadeInNormalSpeedLines&&V.current==="faded_out_after_moonshot"&&(q.current&&(q.current.geometry=F),O.uniforms.speed.value=i,O.uniforms.duration.value=o,p.start({to:{progress:1},config:{duration:2e3}}),V.current="return_to_normal"),O.uniforms.time.value=G}),S.useEffect(()=>K.subscribe(G=>G.raceCount,G=>{G>0&&(f.start({to:{progress:0},config:{duration:0}}),v.start({to:{progress:0},config:{duration:0}}),p.start({to:{progress:1},config:{duration:0}}),O.uniforms.speed.value=i,O.uniforms.duration.value=o,q.current&&(q.current.geometry=F),V.current="normal")}),[f,v,p,O,F]),_.jsx("group",{ref:e,children:_.jsx("instancedMesh",{ref:q,args:[F,O,300],frustumCulled:!1})})}const pn=rn()(tn(t=>({progress:0,loadStartTime:null,loadingScreenFadeComplete:!1,setProgress:e=>{t({progress:Math.min(Math.max(e,0),100)})},startLoading:()=>{t({progress:0,loadStartTime:Date.now()})},reset:()=>{t({progress:0,loadStartTime:null})},setLoadingScreenFadeComplete:e=>{t({loadingScreenFadeComplete:e})}})));function _f(){return pn(t=>t.progress>=100)}function _i(){return pn(t=>t.loadingScreenFadeComplete)}function bf({className:t,...e}){return _.jsx("div",{className:ku(ve("drive-headline5 text-center text-12 mobile-landscape-short:text-12 md:text-15"),t),...e,children:_.jsx(fu,{to:"/editions/summer2025",className:"inline-block focus:outline-none hover:no-underline underline",children:"Summer ’25 edition"})})}function Qs({icon1:t,icon2:e,text:n,className:r}){const i="h-auto w-26 mobile-landscape:w-26 md:w-[max(calc(37/1440*100vmax),2.43rem)] 2xl:w-37 select-none";return _.jsxs("div",{className:ve("drive-headline2 text-center flex flex-col gap-[0.14em] items-center justify-center",r),children:[_.jsxs("div",{className:ve("flex items-center gap-[0.51em]","mb-9 md:mb-[0.72em]"),children:[_.jsx("img",{src:t,alt:"",className:i}),_.jsx("img",{src:e,alt:"",className:i})]}),_.jsx("div",{className:"max-w-[10ch]",children:n})]})}function Pf({className:t}){return _.jsxs("div",{className:ve("drive-headline2 flex items-center gap-[2.85em] game-wide-short:gap-[25.85em] game-wide-short:absolute game-wide-short:bottom-28",t),children:[_.jsx(Qs,{icon1:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/left.png?v=1746265729",icon2:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/right.png?v=1746265730",text:"Steer Left & Right",className:ve("opacity-0","animate-splash-screen-controls","[animation-delay:0.5s]","[animation-play-state:var(--splash-animation-play-state)]")}),_.jsx(Qs,{icon1:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/up.png?v=1746265730",icon2:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/down.png?v=1746265730",text:"Accelerate & Brake",className:ve("opacity-0","animate-splash-screen-controls","[animation-delay:0.6s]","[animation-play-state:var(--splash-animation-play-state)]")})]})}function xc({className:t,children:e}){const n=_h(o=>o.A||o.B||o[Re.Down]||o[Re.Y]||o[Re.Start]),r=_i(),i=S.useCallback(()=>{r&&K.getState().setGameScreen(Qe.RacingScreen)},[r]);return S.useEffect(()=>{n&&K.getState().gameScreen===Qe.SplashScreen&&r&&i()},[n,i,r]),_.jsx("button",{onClick:i,className:ve(t,"focus:outline-none"),"aria-label":"Start Game","data-component-name":"start-game",children:e})}function Tf({className:t}){const e=ve("drive-headline2 flex flex-col items-center justify-end","opacity-0","animate-splash-screen-controls","[animation-play-state:var(--splash-animation-play-state)]");return _.jsxs(xc,{className:ve("mx-auto justify-center items-end gap-20 mobile-landscape:gap-34 mobile-landscape-short:gap-10","mobile-landscape-short:absolute mobile-landscape-short:bottom-28",t),children:[_.jsx(Qs,{icon1:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/left.png?v=1746265729",icon2:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/right.png?v=1746265730",text:"Left & Right",className:ve("opacity-0","animate-splash-screen-controls","[animation-play-state:var(--splash-animation-play-state)]","[animation-delay:0.5s]","mobile-landscape-short:justify-self-start mobile-landscape-short:pl-55")}),_.jsxs("div",{className:ve(e,"[animation-delay:0.6s] mobile-landscape-short:pl-93 mobile-landscape-tiny:pl-20 "),children:[_.jsx("img",{src:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/splash-brake.png?v=1746702001",alt:"Brake",className:"w-30  mb-7 select-none inline-block",draggable:"false"}),"Brake"]}),_.jsxs("div",{className:ve(e,"[animation-delay:0.7s]"),children:[_.jsx("img",{src:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/splash-accelerator.png?v=1746702001",alt:"Accelerate",className:"w-24 mb-5 select-none inline-block",draggable:"false"}),"Accelerate"]})]})}function If(){return _.jsxs(_.Fragment,{children:[_.jsx(Pf,{className:"hidden mobile-landscape:hidden md:flex"}),_.jsx(Tf,{className:"flex mobile-landscape-short:grid mobile-landscape:flex mobile-landscape-short:mx-auto mobile-landscape-short:grid-cols-[350px_auto_auto] md:hidden"})]})}const Jo=()=>{const{poster:t,vp9:e,hevc:n}={poster:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/Animated_Flags_-_White_00.png?v=1747667173",vp9:"/cdn.shopify.com/b/shopify-brochure2-assets/0d3f8dfe40d7d16e15762a178b7318e2.webm",hevc:"/cdn.shopify.com/b/shopify-brochure2-assets/b6d087f47674083b634a6183ef5e5714.mov"};return _.jsxs("video",{poster:t,muted:!0,playsInline:!0,autoPlay:!0,loop:!0,disablePictureInPicture:!0,disableRemotePlayback:!0,className:ve("w-40 mobile-landscape:w-40 md:w-60","animate-splash-screen-start","[animation-delay:0.3s] opacity-0","[animation-play-state:var(--splash-animation-play-state)]"),children:[_.jsx("source",{src:n,type:"video/mp4; codecs=hvc1"}),_.jsx("source",{src:e,type:"video/webm; codecs=vp9"})]})};function Af({className:t}){return _.jsxs(xc,{className:ve("flex items-center","drive-headline1","gap-[0.45em]","hover:-translate-y-3 hover:scale-105","transition-[scale,translate,opacity] duration-300",t),children:[_.jsx(Jo,{}),_.jsx("span",{className:ve("drive-headline1 relative top-[-0.07em]","animate-splash-screen-start","[animation-delay:0.3s] [animation-duration:1.3s] opacity-0","[animation-play-state:var(--splash-animation-play-state)]"),children:"Start"}),_.jsx(Jo,{})]})}function Ef(){const t=us(Qe.SplashScreen),e=_i();return _.jsxs("div",{className:ve("fixed top-0 left-0 size-full flex flex-col items-center justify-center","bg-gradient-to-t from-[rgba(9,0,16,0.64)] via-[rgba(9,0,16,0)] to-transparent bg-[rgba(20,3,31,0.3)]",t?"opacity-100":"opacity-0 pointer-events-none","transition-opacity duration-300"),style:{"--splash-animation-play-state":e?"running":"paused"},children:[_.jsx("div",{className:ve("relative","aspect-[620/248]","w-[75vw] mobile-landscape:w-250 md:w-[calc(620/1440*100vmax)] 2xl:w-620","mb-[clamp(40px,10vmax,100px)] mobile-landscape:mb-[7.5svh] lg:mb-[max(calc(107/1440*100vmax),3.25rem)] 2xl:mb-107","mt-68 mobile-landscape:mt-0 lg:mt-0"),children:_.jsx("div",{className:ve("h-full w-full","animate-splash-screen-logo","[animation-play-state:var(--splash-animation-play-state)]"),children:_.jsx("img",{src:"/cdn.shopify.com/s/files/1/0921/8919/6588/files/Logo_Game_2_2.png?v=1747336114",className:ve("absolute top-1/2 left-1/2 -translate-y-1/2 scale-[1.53]","translate-x-[calc(-50%+1.8%)]"),alt:"Horizons Drive logo",srcSet:`
            /cdn.shopify.com/s/files/1/0921/8919/6588/files/Logo_Game_2_2.png?v=1747336114 1512w,
            /cdn.shopify.com/s/files/1/0921/8919/6588/files/Logo_Game_2_2_-1000w.png?v=1747336725 1000w
          `,sizes:"(max-width: 600px) 1000px, 1512px"})})}),_.jsx(Af,{className:"mb-[clamp(40px,10vmax,100px)] mobile-landscape:mb-[7.5svh] lg:mb-[max(calc(108/1440*100vmax),4.3rem)] 2xl:mb-108"}),_.jsx(If,{}),_.jsx(bf,{className:ve("animate-splash-screen-controls","[animation-delay:0.5s]","[animation-play-state:var(--splash-animation-play-state)]"," text-white bottom-30 absolute opacity-0")})]})}const Cf=S.lazy(()=>pi(()=>import("./RacingScreen-CBXrd1jw.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])));function xf(){const[t,e]=S.useState(!1);return S.useEffect(()=>{setTimeout(()=>{e(!0)},100)},[]),t?_.jsx(S.Suspense,{fallback:null,children:_.jsx(Cf,{})}):null}const Rf=S.lazy(()=>pi(()=>import("./ResultsScreen-D-jknkkV.js"),__vite__mapDeps([8,1,2,3,5,6,7])));function kf(){return us(Qe.ResultsScreen)?_.jsx(S.Suspense,{fallback:null,children:_.jsx(Rf,{})}):null}function Mf(){return _.jsxs(_.Fragment,{children:[_.jsx(Ef,{}),_.jsx(xf,{}),_.jsx(kf,{})]})}function Df({active:t}){const e=S.useRef(.44),n=S.useRef(1),r=S.useRef(1),i=60,o=.6,c=3.15,h=1,u=0,d=2,y=.9,P=.7,k=.4,A=1.5,E=.02,I=.03,C=40,F=13.8,M=3.68,O=1.44,U=4.31,L=61.19,N=.21,v=240,g=300,f=S.useRef(null),b=S.useRef(new R),p=S.useRef(new R),T=S.useRef(new le),w=S.useRef(new le),V=S.useRef(new R(0,1,0)),[q,B]=kt(()=>({from:{progress:0},config:{duration:500,easing:Mt.easeOutQuad}})),[G,J]=kt(()=>({from:{progress:0}})),[ee,he]=kt(()=>({from:{progress:0},config:{tension:100,friction:20}})),ie=(Y,W,X,Te)=>{const Ie=Te+W*5;return Math.sin(Y*Ie+W*1e3)*Math.max(0,1-X)};S.useEffect(()=>{const Y=Kr.subscribe(W=>W.physicsStep,()=>{const W=Q.getState(),{position:X,forward:Te,up:Ie}=W,be=X.clone().add(Ie.clone().multiplyScalar(h)),Ae=be.clone().sub(p.current).normalize(),Me=Ae.dot(Te);Me<y&&Ae.add(Te.clone().multiplyScalar(y-Me)).normalize(),Ae.lerp(Te.clone(),d*xn).normalize();const Se=Fn(o,o*n.current,G.progress.get());b.current.copy(p.current),p.current.lerp(Ae.clone().multiplyScalar(-c).add(be),Se);const Ne=be.clone().addScaledVector(Ie,u);V.current.lerp(Ie,P*xn);const Ze=new Ye().lookAt(p.current,Ne,V.current);T.current.copy(w.current),w.current.setFromRotationMatrix(Ze)});return()=>{Y()}},[o,h,c,u,P,y,d,G]);const de=S.useCallback(Y=>{e.current=Y,he.start({from:{progress:0},to:{progress:1}})},[he]);S.useEffect(()=>{const Y=Q.subscribe(W=>W.lastCollisionEvent,W=>{if(!W)return;const{intensity:X}=W;e.current=X,de(X*.25)});return()=>{Y()}},[de]),S.useEffect(()=>{const Y=Q.subscribe(W=>W.currentJumpType,(W,X)=>{switch(W){case Ue.notJumping:X===Ue.ramp?(de(1),J.start({to:{progress:0},config:{duration:2e3}})):X===Ue.moon&&(de(1),B.start({to:{progress:0},config:{duration:2500,easing:Mt.easeInOutCubic}}));break;case Ue.ramp:X===Ue.notJumping&&(n.current=k,J.start({to:{progress:1},config:{duration:3e3}}));break;case Ue.moon:X===Ue.notJumping&&(r.current=A,B.start({to:{progress:1},config:{duration:750,easing:Mt.easeInOutCubic}}));break}});return()=>{Y()}},[de,J,k,A,B]);const{size:Ce}=Yt(),ue=Ce.width/Ce.height,te=ue<.7?1.5:ue<.8?1.2:1;return re(({clock:Y})=>{const{raceStartTime:W,raceEndTime:X}=K.getState();if(!f.current||W!==null&&X!==null)return;const{progressToNextStep:Te}=Kr.getState(),{isInJump:Ie,normalizedProgress:be,speed:Ae}=Q.getState(),Me=Fn(i,i*r.current,q.progress.get());f.current.fov=Me*te,f.current.updateProjectionMatrix();const Se=b.current.clone().lerp(p.current,Te),Ne=T.current.clone().slerp(w.current,Te);if(be>=ne.secondJump&&be<ne.moon&&Ae>=v){const De=1-cs(v,g,Ae),ye=Y.elapsedTime,se=ie(ye,0,De,U)*F/1e3,pe=ie(ye,1,De,L)*M/1e3,Ke=ie(ye,2,De,N)*O/1e3,Xe=new R(1,0,0).applyQuaternion(Ne).normalize(),et=new R(0,1,0).applyQuaternion(Ne).normalize(),ct=new R(0,0,1).applyQuaternion(Ne).normalize();Se.add(Xe.multiplyScalar(se)),Se.add(et.multiplyScalar(pe)),Se.add(ct.multiplyScalar(Ke))}if(ee.progress.isAnimating&&!Ie){const De=Y.elapsedTime,ye=e.current,se=ee.progress.get(),pe=ie(De,0,se,C)*E*ye,Ke=ie(De,1,se,C)*E*ye,Xe=ie(De,2,se,C)*E*ye;Se.x+=pe,Se.y+=Ke,Se.z+=Xe;const et=ie(De,3,se,C)*I*ye,ct=ie(De,4,se,C)*I*ye,lt=ie(De,5,se,C)*I*ye,sn=new le().setFromEuler(new Ya(et,ct,lt));Ne.multiply(sn)}f.current.position.copy(Se),f.current.quaternion.copy(Ne),K.getState().setIsCameraUnderwater(f.current.position.y<0&&be>ne.firstJump),K.getState().setIsCameraInMoonArea(f.current.position.y>=0&&be>ne.secondJump)},_r.camera),_.jsx(Ys,{ref:f,makeDefault:t,position:[0,3,-5],fov:i,near:.1,far:5e3})}function Of(){const t=K(d=>d.countdownNumber),e=us(Qe.SplashScreen),[n,r]=S.useState(!1),[i,o]=kt(()=>({from:{position:Ds[1].startPos,rotation:Ds[1].rotation},config:{mass:1,tension:280,friction:120,precision:.001}}));S.useEffect(()=>{r(t<=1)},[t]);const c=Yt(d=>d.size),u=c.width/c.height<.8;return S.useEffect(()=>{let d=t;t===-1&&(d="skip");const y=Ds[d];K.getState().setIsCameraUnderwater(!1),K.getState().setIsCameraInMoonArea(!1),y&&o.start({from:{position:y.startPos,rotation:y.rotation},to:{position:y.endPos,rotation:y.rotation},config:{mass:1,tension:280*jo,friction:120*jo}})},[t,o,e]),_.jsx(_.Fragment,{children:e?_.jsx(Ys,{makeDefault:!0,position:[45,45,0],rotation:[0,1,0],fov:u?60:40,near:.1,far:5e3}):_.jsxs(Mu.group,{position:i.position,rotation:i.rotation,children:[_.jsx(Ys,{makeDefault:!n,fov:u?75:40,near:.1,far:5e3}),_.jsx(Df,{active:n})]})})}const Lf=()=>{};var Yo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Ff=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=t[n++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=t[n++],c=t[n++],h=t[n++],u=((i&7)<<18|(o&63)<<12|(c&63)<<6|h&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const o=t[n++],c=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|c&63)}}return e.join("")},bi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const o=t[i],c=i+1<t.length,h=c?t[i+1]:0,u=i+2<t.length,d=u?t[i+2]:0,y=o>>2,P=(o&3)<<4|h>>4;let k=(h&15)<<2|d>>6,A=d&63;u||(A=64,c||(k=64)),r.push(n[y],n[P],n[k],n[A])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Rc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Ff(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const o=n[t.charAt(i++)],h=i<t.length?n[t.charAt(i)]:0;++i;const d=i<t.length?n[t.charAt(i)]:64;++i;const P=i<t.length?n[t.charAt(i)]:64;if(++i,o==null||h==null||d==null||P==null)throw new Nf;const k=o<<2|h>>4;if(r.push(k),d!==64){const A=h<<4&240|d>>2;if(r.push(A),P!==64){const E=d<<6&192|P;r.push(E)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Nf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Uf=function(t){const e=Rc(t);return bi.encodeByteArray(e,!0)},Jr=function(t){return Uf(t).replace(/\./g,"")},kc=function(t){try{return bi.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf=()=>Mc().__FIREBASE_DEFAULTS__,Vf=()=>{if(typeof process>"u"||typeof Yo>"u")return;const t=Yo.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Bf=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&kc(t[1]);return e&&JSON.parse(e)},Pi=()=>{try{return Lf()||jf()||Vf()||Bf()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Dc=t=>{var e,n;return(n=(e=Pi())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},Oc=t=>{const e=Dc(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Lc=()=>{var t;return(t=Pi())==null?void 0:t.config},Fc=t=>{var e;return(e=Pi())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const c={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Jr(JSON.stringify(n)),Jr(JSON.stringify(c)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $f(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($e())}function Gf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Wf(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Hf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qf(){const t=$e();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Ti(){try{return typeof indexedDB=="object"}catch{return!1}}function Kf(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;e(((o=i.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf="FirebaseError";class _t extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Xf,Object.setPrototypeOf(this,_t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,zn.prototype.create)}}class zn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,o=this.errors[e],c=o?Jf(o,r):"Error",h=`${this.serviceName}: ${c} (${i}).`;return new _t(i,h,r)}}function Jf(t,e){return t.replace(Yf,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Yf=/\{\$([^}]+)}/g;function Qf(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Sn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const o=t[i],c=e[i];if(Qo(o)&&Qo(c)){if(!Sn(o,c))return!1}else if(o!==c)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Qo(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function br(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Zf(t,e){const n=new em(t,e);return n.subscribe.bind(n)}class em{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");tm(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Ls),i.error===void 0&&(i.error=Ls),i.complete===void 0&&(i.complete=Ls);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function tm(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ls(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm=1e3,rm=2,sm=14400*1e3,im=.5;function om(t,e=nm,n=rm){const r=e*Math.pow(n,t),i=Math.round(im*r*(Math.random()-.5)*2);return Math.min(sm,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ii(t){return(await fetch(t,{credentials:"include"})).ok}class St{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new pr;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(lm(e))try{this.getOrInitializeService({instanceIdentifier:dn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=dn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dn){return this.instances.has(e)}getOptions(e=dn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,c]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(o);r===h&&c.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:cm(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=dn){return this.component?this.component.multipleInstances?e:dn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function cm(t){return t===dn?void 0:t}function lm(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new am(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(fe||(fe={}));const hm={debug:fe.DEBUG,verbose:fe.VERBOSE,info:fe.INFO,warn:fe.WARN,error:fe.ERROR,silent:fe.SILENT},dm=fe.INFO,fm={[fe.DEBUG]:"log",[fe.VERBOSE]:"log",[fe.INFO]:"info",[fe.WARN]:"warn",[fe.ERROR]:"error"},mm=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=fm[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class hs{constructor(e){this.name=e,this._logLevel=dm,this._logHandler=mm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in fe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?hm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,fe.DEBUG,...e),this._logHandler(this,fe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,fe.VERBOSE,...e),this._logHandler(this,fe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,fe.INFO,...e),this._logHandler(this,fe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,fe.WARN,...e),this._logHandler(this,fe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,fe.ERROR,...e),this._logHandler(this,fe.ERROR,...e)}}const pm=(t,e)=>e.some(n=>t instanceof n);let Zo,ea;function gm(){return Zo||(Zo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vm(){return ea||(ea=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Nc=new WeakMap,Zs=new WeakMap,Uc=new WeakMap,Fs=new WeakMap,Ai=new WeakMap;function ym(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",o),t.removeEventListener("error",c)},o=()=>{n(Qt(t.result)),i()},c=()=>{r(t.error),i()};t.addEventListener("success",o),t.addEventListener("error",c)});return e.then(n=>{n instanceof IDBCursor&&Nc.set(n,t)}).catch(()=>{}),Ai.set(e,t),e}function wm(t){if(Zs.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",c),t.removeEventListener("abort",c)},o=()=>{n(),i()},c=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",o),t.addEventListener("error",c),t.addEventListener("abort",c)});Zs.set(t,e)}let ei={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Zs.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Uc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Qt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Sm(t){ei=t(ei)}function _m(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ns(this),e,...n);return Uc.set(r,e.sort?e.sort():[e]),Qt(r)}:vm().includes(t)?function(...e){return t.apply(Ns(this),e),Qt(Nc.get(this))}:function(...e){return Qt(t.apply(Ns(this),e))}}function bm(t){return typeof t=="function"?_m(t):(t instanceof IDBTransaction&&wm(t),pm(t,gm())?new Proxy(t,ei):t)}function Qt(t){if(t instanceof IDBRequest)return ym(t);if(Fs.has(t))return Fs.get(t);const e=bm(t);return e!==t&&(Fs.set(t,e),Ai.set(e,t)),e}const Ns=t=>Ai.get(t);function Pm(t,e,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const c=indexedDB.open(t,e),h=Qt(c);return r&&c.addEventListener("upgradeneeded",u=>{r(Qt(c.result),u.oldVersion,u.newVersion,Qt(c.transaction),u)}),n&&c.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),h.then(u=>{o&&u.addEventListener("close",()=>o()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),h}const Tm=["get","getKey","getAll","getAllKeys","count"],Im=["put","add","delete","clear"],Us=new Map;function ta(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Us.get(e))return Us.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Im.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Tm.includes(n)))return;const o=async function(c,...h){const u=this.transaction(c,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(h.shift())),(await Promise.all([d[n](...h),i&&u.done]))[0]};return Us.set(e,o),o}Sm(t=>({...t,get:(e,n,r)=>ta(e,n)||t.get(e,n,r),has:(e,n)=>!!ta(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Em(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Em(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ti="@firebase/app",na="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new hs("@firebase/app"),Cm="@firebase/app-compat",xm="@firebase/analytics-compat",Rm="@firebase/analytics",km="@firebase/app-check-compat",Mm="@firebase/app-check",Dm="@firebase/auth",Om="@firebase/auth-compat",Lm="@firebase/database",Fm="@firebase/data-connect",Nm="@firebase/database-compat",Um="@firebase/functions",jm="@firebase/functions-compat",Vm="@firebase/installations",Bm="@firebase/installations-compat",zm="@firebase/messaging",$m="@firebase/messaging-compat",Gm="@firebase/performance",Wm="@firebase/performance-compat",Hm="@firebase/remote-config",qm="@firebase/remote-config-compat",Km="@firebase/storage",Xm="@firebase/storage-compat",Jm="@firebase/firestore",Ym="@firebase/ai",Qm="@firebase/firestore-compat",Zm="firebase",ep="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni="[DEFAULT]",tp={[ti]:"fire-core",[Cm]:"fire-core-compat",[Rm]:"fire-analytics",[xm]:"fire-analytics-compat",[Mm]:"fire-app-check",[km]:"fire-app-check-compat",[Dm]:"fire-auth",[Om]:"fire-auth-compat",[Lm]:"fire-rtdb",[Fm]:"fire-data-connect",[Nm]:"fire-rtdb-compat",[Um]:"fire-fn",[jm]:"fire-fn-compat",[Vm]:"fire-iid",[Bm]:"fire-iid-compat",[zm]:"fire-fcm",[$m]:"fire-fcm-compat",[Gm]:"fire-perf",[Wm]:"fire-perf-compat",[Hm]:"fire-rc",[qm]:"fire-rc-compat",[Km]:"fire-gcs",[Xm]:"fire-gcs-compat",[Jm]:"fire-fst",[Qm]:"fire-fst-compat",[Ym]:"fire-vertex","fire-js":"fire-js",[Zm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr=new Map,np=new Map,ri=new Map;function ra(t,e){try{t.container.addComponent(e)}catch(n){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Lt(t){const e=t.name;if(ri.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;ri.set(e,t);for(const n of Yr.values())ra(n,t);for(const n of np.values())ra(n,t);return!0}function Gn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function nt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zt=new zn("app","Firebase",rp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new St("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=ep;function jc(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:ni,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Zt.create("bad-app-name",{appName:String(i)});if(n||(n=Lc()),!n)throw Zt.create("no-options");const o=Yr.get(i);if(o){if(Sn(n,o.options)&&Sn(r,o.config))return o;throw Zt.create("duplicate-app",{appName:i})}const c=new um(i);for(const u of ri.values())c.addComponent(u);const h=new sp(n,r,c);return Yr.set(i,h),h}function ds(t=ni){const e=Yr.get(t);if(!e&&t===ni&&Lc())return jc();if(!e)throw Zt.create("no-app",{appName:t});return e}function ot(t,e,n){let r=tp[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${r}" with version "${e}":`];i&&c.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ot.warn(c.join(" "));return}Lt(new St(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip="firebase-heartbeat-database",op=1,gr="firebase-heartbeat-store";let js=null;function Vc(){return js||(js=Pm(ip,op,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(gr)}catch(n){console.warn(n)}}}}).catch(t=>{throw Zt.create("idb-open",{originalErrorMessage:t.message})})),js}async function ap(t){try{const n=(await Vc()).transaction(gr),r=await n.objectStore(gr).get(Bc(t));return await n.done,r}catch(e){if(e instanceof _t)Ot.warn(e.message);else{const n=Zt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ot.warn(n.message)}}}async function sa(t,e){try{const r=(await Vc()).transaction(gr,"readwrite");await r.objectStore(gr).put(e,Bc(t)),await r.done}catch(n){if(n instanceof _t)Ot.warn(n.message);else{const r=Zt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ot.warn(r.message)}}}function Bc(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp=1024,lp=30;class up{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new dp(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ia();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>lp){const c=fp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(c,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ot.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ia(),{heartbeatsToSend:r,unsentEntries:i}=hp(this._heartbeatsCache.heartbeats),o=Jr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return Ot.warn(n),""}}}function ia(){return new Date().toISOString().substring(0,10)}function hp(t,e=cp){const n=[];let r=t.slice();for(const i of t){const o=n.find(c=>c.agent===i.agent);if(o){if(o.dates.push(i.date),oa(n)>e){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),oa(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class dp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ti()?Kf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await ap(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function oa(t){return Jr(JSON.stringify({version:2,heartbeats:t})).length}function fp(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(t){Lt(new St("platform-logger",e=>new Am(e),"PRIVATE")),Lt(new St("heartbeat",e=>new up(e),"PRIVATE")),ot(ti,na,t),ot(ti,na,"esm2020"),ot("fire-js","")}mp("");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="type.googleapis.com/google.protobuf.Int64Value",gp="type.googleapis.com/google.protobuf.UInt64Value";function zc(t,e){const n={};for(const r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}function Qr(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>Qr(e));if(typeof t=="function"||typeof t=="object")return zc(t,e=>Qr(e));throw new Error("Data cannot be encoded in JSON: "+t)}function jn(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case pp:case gp:{const e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>jn(e)):typeof t=="function"||typeof t=="object"?zc(t,e=>jn(e)):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class We extends _t{constructor(e,n,r){super(`${Ei}/${e}`,n||""),this.details=r,Object.setPrototypeOf(this,We.prototype)}}function vp(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Zr(t,e){let n=vp(t),r=n,i;try{const o=e&&e.error;if(o){const c=o.status;if(typeof c=="string"){if(!aa[c])return new We("internal","internal");n=aa[c],r=c}const h=o.message;typeof h=="string"&&(r=h),i=o.details,i!==void 0&&(i=jn(i))}}catch{}return n==="ok"?null:new We(n,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e,n,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,nt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=n.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||n.get().then(o=>this.auth=o,()=>{}),this.messaging||r.get().then(o=>this.messaging=o,()=>{}),this.appCheck||i==null||i.get().then(o=>this.appCheck=o,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const n=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(e){const n=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:n,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si="us-central1",wp=/^data: (.*?)(?:\n|$)/;function Sp(t){let e=null;return{promise:new Promise((n,r)=>{e=setTimeout(()=>{r(new We("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}class _p{constructor(e,n,r,i,o=si,c=(...h)=>fetch(...h)){this.app=e,this.fetchImpl=c,this.emulatorOrigin=null,this.contextProvider=new yp(e,n,r,i),this.cancelAllRequests=new Promise(h=>{this.deleteService=()=>Promise.resolve(h())});try{const h=new URL(o);this.customDomain=h.origin+(h.pathname==="/"?"":h.pathname),this.region=si}catch{this.customDomain=null,this.region=o}}_delete(){return this.deleteService()}_url(e){const n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}}function bp(t,e,n){const r=$n(e);t.emulatorOrigin=`http${r?"s":""}://${e}:${n}`,r&&Ii(t.emulatorOrigin+"/backends")}function Pp(t,e,n){const r=i=>Ip(t,e,i,{});return r.stream=(i,o)=>Ep(t,e,i,o),r}function $c(t){return t.emulatorOrigin&&$n(t.emulatorOrigin)?"include":void 0}async function Tp(t,e,n,r,i){n["Content-Type"]="application/json";let o;try{o=await r(t,{method:"POST",body:JSON.stringify(e),headers:n,credentials:$c(i)})}catch{return{status:0,json:null}}let c=null;try{c=await o.json()}catch{}return{status:o.status,json:c}}async function Gc(t,e){const n={},r=await t.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(n.Authorization="Bearer "+r.authToken),r.messagingToken&&(n["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(n["X-Firebase-AppCheck"]=r.appCheckToken),n}function Ip(t,e,n,r){const i=t._url(e);return Ap(t,i,n,r)}async function Ap(t,e,n,r){n=Qr(n);const i={data:n},o=await Gc(t,r),c=r.timeout||7e4,h=Sp(c),u=await Promise.race([Tp(e,i,o,t.fetchImpl,t),h.promise,t.cancelAllRequests]);if(h.cancel(),!u)throw new We("cancelled","Firebase Functions instance was deleted.");const d=Zr(u.status,u.json);if(d)throw d;if(!u.json)throw new We("internal","Response is not valid JSON object.");let y=u.json.data;if(typeof y>"u"&&(y=u.json.result),typeof y>"u")throw new We("internal","Response is missing data field.");return{data:jn(y)}}function Ep(t,e,n,r){const i=t._url(e);return Cp(t,i,n,r||{})}async function Cp(t,e,n,r){var k;n=Qr(n);const i={data:n},o=await Gc(t,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await t.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r==null?void 0:r.signal,credentials:$c(t)})}catch(A){if(A instanceof Error&&A.name==="AbortError"){const I=new We("cancelled","Request was cancelled.");return{data:Promise.reject(I),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(I)}}}}}}const E=Zr(0,null);return{data:Promise.reject(E),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(E)}}}}}}let h,u;const d=new Promise((A,E)=>{h=A,u=E});(k=r==null?void 0:r.signal)==null||k.addEventListener("abort",()=>{const A=new We("cancelled","Request was cancelled.");u(A)});const y=c.body.getReader(),P=xp(y,h,u,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const A=P.getReader();return{async next(){const{value:E,done:I}=await A.read();return{value:E,done:I}},async return(){return await A.cancel(),{done:!0,value:void 0}}}}},data:d}}function xp(t,e,n,r){const i=(c,h)=>{const u=c.match(wp);if(!u)return;const d=u[1];try{const y=JSON.parse(d);if("result"in y){e(jn(y.result));return}if("message"in y){h.enqueue(jn(y.message));return}if("error"in y){const P=Zr(0,y);h.error(P),n(P);return}}catch(y){if(y instanceof We){h.error(y),n(y);return}}},o=new TextDecoder;return new ReadableStream({start(c){let h="";return u();async function u(){if(r!=null&&r.aborted){const d=new We("cancelled","Request was cancelled");return c.error(d),n(d),Promise.resolve()}try{const{value:d,done:y}=await t.read();if(y){h.trim()&&i(h.trim(),c),c.close();return}if(r!=null&&r.aborted){const k=new We("cancelled","Request was cancelled");c.error(k),n(k),await t.cancel();return}h+=o.decode(d,{stream:!0});const P=h.split(`
`);h=P.pop()||"";for(const k of P)k.trim()&&i(k.trim(),c);return u()}catch(d){const y=d instanceof We?d:Zr(0,null);c.error(y),n(y)}}},cancel(){return t.cancel()}})}const ca="@firebase/functions",la="0.13.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp="auth-internal",kp="app-check-internal",Mp="messaging-internal";function Dp(t){const e=(n,{instanceIdentifier:r})=>{const i=n.getProvider("app").getImmediate(),o=n.getProvider(Rp),c=n.getProvider(Mp),h=n.getProvider(kp);return new _p(i,o,c,h,r)};Lt(new St(Ei,e,"PUBLIC").setMultipleInstances(!0)),ot(ca,la,t),ot(ca,la,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Op(t=ds(),e=si){const r=Gn(at(t),Ei).getImmediate({identifier:e}),i=Oc("functions");return i&&Lp(r,...i),r}function Lp(t,e,n){bp(at(t),e,n)}function Fp(t,e,n){return Pp(at(t),e)}Dp();var Np="firebase",Up="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ot(Np,Up,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii=new Map,Wc={activated:!1,tokenObservers:[]},jp={initialized:!1,enabled:!1};function ke(t){return ii.get(t)||{...Wc}}function Vp(t,e){return ii.set(t,e),ii.get(t)}function fs(){return jp}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="https://content-firebaseappcheck.googleapis.com/v1",Bp="exchangeRecaptchaV3Token",zp="exchangeDebugToken",ua={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},$p=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e,n,r,i,o){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=i,i>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new pr,this.pending.promise.catch(n=>{}),await Wp(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new pr,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Wp(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},He=new zn("appCheck","AppCheck",Hp);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function Ci(t){if(!ke(t).activated)throw He.create("use-before-activation",{appName:t.name})}function qc(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),r=Math.floor((e-n*3600*24)/3600),i=Math.floor((e-n*3600*24-r*3600)/60),o=e-n*3600*24-r*3600-i*60;let c="";return n&&(c+=Nr(n)+"d:"),r&&(c+=Nr(r)+"h:"),c+=Nr(i)+"m:"+Nr(o)+"s",c}function Nr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xi({url:t,body:e},n){const r={"Content-Type":"application/json"},i=n.getImmediate({optional:!0});if(i){const P=await i.getHeartbeatsHeader();P&&(r["X-Firebase-Client"]=P)}const o={method:"POST",body:JSON.stringify(e),headers:r};let c;try{c=await fetch(t,o)}catch(P){throw He.create("fetch-network-error",{originalErrorMessage:P==null?void 0:P.message})}if(c.status!==200)throw He.create("fetch-status-error",{httpStatus:c.status});let h;try{h=await c.json()}catch(P){throw He.create("fetch-parse-error",{originalErrorMessage:P==null?void 0:P.message})}const u=h.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw He.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${h.ttl}`});const d=Number(u[1])*1e3,y=Date.now();return{token:h.token,expireTimeMillis:y+d,issuedAtTimeMillis:y}}function qp(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${Hc}/projects/${n}/apps/${r}:${Bp}?key=${i}`,body:{recaptcha_v3_token:e}}}function Kc(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${Hc}/projects/${n}/apps/${r}:${zp}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp="firebase-app-check-database",Xp=1,vr="firebase-app-check-store",Xc="debug-token";let Ur=null;function Jc(){return Ur||(Ur=new Promise((t,e)=>{try{const n=indexedDB.open(Kp,Xp);n.onsuccess=r=>{t(r.target.result)},n.onerror=r=>{var i;e(He.create("storage-open",{originalErrorMessage:(i=r.target.error)==null?void 0:i.message}))},n.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(vr,{keyPath:"compositeKey"})}}}catch(n){e(He.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),Ur)}function Jp(t){return Qc(Zc(t))}function Yp(t,e){return Yc(Zc(t),e)}function Qp(t){return Yc(Xc,t)}function Zp(){return Qc(Xc)}async function Yc(t,e){const r=(await Jc()).transaction(vr,"readwrite"),o=r.objectStore(vr).put({compositeKey:t,value:e});return new Promise((c,h)=>{o.onsuccess=u=>{c()},r.onerror=u=>{var d;h(He.create("storage-set",{originalErrorMessage:(d=u.target.error)==null?void 0:d.message}))}})}async function Qc(t){const n=(await Jc()).transaction(vr,"readonly"),i=n.objectStore(vr).get(t);return new Promise((o,c)=>{i.onsuccess=h=>{const u=h.target.result;o(u?u.value:void 0)},n.onerror=h=>{var u;c(He.create("storage-get",{originalErrorMessage:(u=h.target.error)==null?void 0:u.message}))}})}function Zc(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new hs("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eg(t){if(Ti()){let e;try{e=await Jp(t)}catch(n){Jt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Vs(t,e){return Ti()?Yp(t,e).catch(n=>{Jt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function tg(){let t;try{t=await Zp()}catch{}if(t)return t;{const e=crypto.randomUUID();return Qp(e).catch(n=>Jt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(){return fs().enabled}async function ki(){const t=fs();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function ng(){const t=Mc(),e=fs();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new pr;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(tg())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg={error:"UNKNOWN_ERROR"};function sg(t){return bi.encodeString(JSON.stringify(t),!1)}async function oi(t,e=!1,n=!1){const r=t.app;Ci(r);const i=ke(r);let o=i.token,c;if(o&&!Rn(o)&&(i.token=void 0,o=void 0),!o){const d=await i.cachedTokenPromise;d&&(Rn(d)?o=d:await Vs(r,void 0))}if(!e&&o&&Rn(o))return{token:o.token};let h=!1;if(Ri())try{const d=await ki();i.exchangeTokenPromise||(i.exchangeTokenPromise=xi(Kc(r,d),t.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),h=!0);const y=await i.exchangeTokenPromise;return await Vs(r,y),i.token=y,{token:y.token}}catch(d){return d.code==="appCheck/throttled"||d.code==="appCheck/initial-throttle"?Jt.warn(d.message):n&&Jt.error(d),Bs(d)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),h=!0),o=await ke(r).exchangeTokenPromise}catch(d){d.code==="appCheck/throttled"||d.code==="appCheck/initial-throttle"?Jt.warn(d.message):n&&Jt.error(d),c=d}let u;return o?c?Rn(o)?u={token:o.token,internalError:c}:u=Bs(c):(u={token:o.token},i.token=o,await Vs(r,o)):u=Bs(c),h&&nl(r,u),u}async function ig(t){const e=t.app;Ci(e);const{provider:n}=ke(e);if(Ri()){const r=await ki(),{token:i}=await xi(Kc(e,r),t.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await n.getToken();return{token:r}}}function el(t,e,n,r){const{app:i}=t,o=ke(i),c={next:n,error:r,type:e};if(o.tokenObservers=[...o.tokenObservers,c],o.token&&Rn(o.token)){const h=o.token;Promise.resolve().then(()=>{n({token:h.token}),da(t)}).catch(()=>{})}o.cachedTokenPromise.then(()=>da(t))}function tl(t,e){const n=ke(t),r=n.tokenObservers.filter(i=>i.next!==e);r.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=r}function da(t){const{app:e}=t,n=ke(e);let r=n.tokenRefresher;r||(r=og(t),n.tokenRefresher=r),!r.isRunning()&&n.isTokenAutoRefreshEnabled&&r.start()}function og(t){const{app:e}=t;return new Gp(async()=>{const n=ke(e);let r;if(n.token?r=await oi(t,!0):r=await oi(t),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const n=ke(e);if(n.token){let r=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const i=n.token.expireTimeMillis-300*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},ua.RETRIAL_MIN_WAIT,ua.RETRIAL_MAX_WAIT)}function nl(t,e){const n=ke(t).tokenObservers;for(const r of n)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Rn(t){return t.expireTimeMillis-Date.now()>0}function Bs(t){return{token:sg(rg),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=ke(this.app);for(const n of e)tl(this.app,n.next);return Promise.resolve()}}function cg(t,e){return new ag(t,e)}function lg(t){return{getToken:e=>oi(t,e),getLimitedUseToken:()=>ig(t),addTokenListener:e=>el(t,"INTERNAL",e),removeTokenListener:e=>tl(t.app,e)}}const ug="@firebase/app-check",hg="0.11.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="https://www.google.com/recaptcha/api.js";function fg(t,e){const n=new pr,r=ke(t);r.reCAPTCHAState={initialized:n};const i=mg(t),o=ha(!1);return o?fa(t,e,o,i,n):vg(()=>{const c=ha(!1);if(!c)throw new Error("no recaptcha");fa(t,e,c,i,n)}),n.promise}function fa(t,e,n,r,i){n.ready(()=>{gg(t,e,n,r),i.resolve(n)})}function mg(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function pg(t){Ci(t);const n=await ke(t).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const o=ke(t).reCAPTCHAState;n.ready(()=>{r(n.execute(o.widgetId,{action:"fire_app_check"}))})})}function gg(t,e,n,r){const i=n.render(r,{sitekey:e,size:"invisible",callback:()=>{ke(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ke(t).reCAPTCHAState.succeeded=!1}}),o=ke(t);o.reCAPTCHAState={...o.reCAPTCHAState,widgetId:i}}function vg(t){const e=document.createElement("script");e.src=dg,e.onload=t,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var r,i,o;wg(this._throttleData);const e=await pg(this._app).catch(c=>{throw He.create("recaptcha-error")});if(!((r=ke(this._app).reCAPTCHAState)!=null&&r.succeeded))throw He.create("recaptcha-error");let n;try{n=await xi(qp(this._app,e),this._heartbeatServiceProvider)}catch(c){throw(i=c.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=yg(Number((o=c.customData)==null?void 0:o.httpStatus),this._throttleData),He.create("initial-throttle",{time:qc(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):c}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Gn(e,"heartbeat"),fg(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Mi?this._siteKey===e._siteKey:!1}}function yg(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+$p,httpStatus:t};{const n=e?e.backoffCount:0,r=om(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+r,httpStatus:t}}}function wg(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw He.create("throttled",{time:qc(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sg(t=ds(),e){t=at(t);const n=Gn(t,"app-check");if(fs().initialized||ng(),Ri()&&ki().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const i=n.getImmediate(),o=n.getOptions();if(o.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&o.provider.isEqual(e.provider))return i;throw He.create("already-initialized",{appName:t.name})}const r=n.initialize({options:e});return _g(t,e.provider,e.isTokenAutoRefreshEnabled),ke(t).isTokenAutoRefreshEnabled&&el(r,"INTERNAL",()=>{}),r}function _g(t,e,n=!1){const r=Vp(t,{...Wc});r.activated=!0,r.provider=e,r.cachedTokenPromise=eg(t).then(i=>(i&&Rn(i)&&(r.token=i,nl(t,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Jt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(t)}const bg="app-check",ma="app-check-internal";function Pg(){Lt(new St(bg,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return cg(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(ma).initialize()})),Lt(new St(ma,t=>{const e=t.getProvider("app-check").getImmediate();return lg(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ot(ug,hg)}Pg();var pa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Di;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function f(){}f.prototype=g.prototype,v.F=g.prototype,v.prototype=new f,v.prototype.constructor=v,v.D=function(b,p,T){for(var w=Array(arguments.length-2),V=2;V<arguments.length;V++)w[V-2]=arguments[V];return g.prototype[p].apply(b,w)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,g,f){f||(f=0);const b=Array(16);if(typeof g=="string")for(var p=0;p<16;++p)b[p]=g.charCodeAt(f++)|g.charCodeAt(f++)<<8|g.charCodeAt(f++)<<16|g.charCodeAt(f++)<<24;else for(p=0;p<16;++p)b[p]=g[f++]|g[f++]<<8|g[f++]<<16|g[f++]<<24;g=v.g[0],f=v.g[1],p=v.g[2];let T=v.g[3],w;w=g+(T^f&(p^T))+b[0]+3614090360&4294967295,g=f+(w<<7&4294967295|w>>>25),w=T+(p^g&(f^p))+b[1]+3905402710&4294967295,T=g+(w<<12&4294967295|w>>>20),w=p+(f^T&(g^f))+b[2]+606105819&4294967295,p=T+(w<<17&4294967295|w>>>15),w=f+(g^p&(T^g))+b[3]+3250441966&4294967295,f=p+(w<<22&4294967295|w>>>10),w=g+(T^f&(p^T))+b[4]+4118548399&4294967295,g=f+(w<<7&4294967295|w>>>25),w=T+(p^g&(f^p))+b[5]+1200080426&4294967295,T=g+(w<<12&4294967295|w>>>20),w=p+(f^T&(g^f))+b[6]+2821735955&4294967295,p=T+(w<<17&4294967295|w>>>15),w=f+(g^p&(T^g))+b[7]+4249261313&4294967295,f=p+(w<<22&4294967295|w>>>10),w=g+(T^f&(p^T))+b[8]+1770035416&4294967295,g=f+(w<<7&4294967295|w>>>25),w=T+(p^g&(f^p))+b[9]+2336552879&4294967295,T=g+(w<<12&4294967295|w>>>20),w=p+(f^T&(g^f))+b[10]+4294925233&4294967295,p=T+(w<<17&4294967295|w>>>15),w=f+(g^p&(T^g))+b[11]+2304563134&4294967295,f=p+(w<<22&4294967295|w>>>10),w=g+(T^f&(p^T))+b[12]+1804603682&4294967295,g=f+(w<<7&4294967295|w>>>25),w=T+(p^g&(f^p))+b[13]+4254626195&4294967295,T=g+(w<<12&4294967295|w>>>20),w=p+(f^T&(g^f))+b[14]+2792965006&4294967295,p=T+(w<<17&4294967295|w>>>15),w=f+(g^p&(T^g))+b[15]+1236535329&4294967295,f=p+(w<<22&4294967295|w>>>10),w=g+(p^T&(f^p))+b[1]+4129170786&4294967295,g=f+(w<<5&4294967295|w>>>27),w=T+(f^p&(g^f))+b[6]+3225465664&4294967295,T=g+(w<<9&4294967295|w>>>23),w=p+(g^f&(T^g))+b[11]+643717713&4294967295,p=T+(w<<14&4294967295|w>>>18),w=f+(T^g&(p^T))+b[0]+3921069994&4294967295,f=p+(w<<20&4294967295|w>>>12),w=g+(p^T&(f^p))+b[5]+3593408605&4294967295,g=f+(w<<5&4294967295|w>>>27),w=T+(f^p&(g^f))+b[10]+38016083&4294967295,T=g+(w<<9&4294967295|w>>>23),w=p+(g^f&(T^g))+b[15]+3634488961&4294967295,p=T+(w<<14&4294967295|w>>>18),w=f+(T^g&(p^T))+b[4]+3889429448&4294967295,f=p+(w<<20&4294967295|w>>>12),w=g+(p^T&(f^p))+b[9]+568446438&4294967295,g=f+(w<<5&4294967295|w>>>27),w=T+(f^p&(g^f))+b[14]+3275163606&4294967295,T=g+(w<<9&4294967295|w>>>23),w=p+(g^f&(T^g))+b[3]+4107603335&4294967295,p=T+(w<<14&4294967295|w>>>18),w=f+(T^g&(p^T))+b[8]+1163531501&4294967295,f=p+(w<<20&4294967295|w>>>12),w=g+(p^T&(f^p))+b[13]+2850285829&4294967295,g=f+(w<<5&4294967295|w>>>27),w=T+(f^p&(g^f))+b[2]+4243563512&4294967295,T=g+(w<<9&4294967295|w>>>23),w=p+(g^f&(T^g))+b[7]+1735328473&4294967295,p=T+(w<<14&4294967295|w>>>18),w=f+(T^g&(p^T))+b[12]+2368359562&4294967295,f=p+(w<<20&4294967295|w>>>12),w=g+(f^p^T)+b[5]+4294588738&4294967295,g=f+(w<<4&4294967295|w>>>28),w=T+(g^f^p)+b[8]+2272392833&4294967295,T=g+(w<<11&4294967295|w>>>21),w=p+(T^g^f)+b[11]+1839030562&4294967295,p=T+(w<<16&4294967295|w>>>16),w=f+(p^T^g)+b[14]+4259657740&4294967295,f=p+(w<<23&4294967295|w>>>9),w=g+(f^p^T)+b[1]+2763975236&4294967295,g=f+(w<<4&4294967295|w>>>28),w=T+(g^f^p)+b[4]+1272893353&4294967295,T=g+(w<<11&4294967295|w>>>21),w=p+(T^g^f)+b[7]+4139469664&4294967295,p=T+(w<<16&4294967295|w>>>16),w=f+(p^T^g)+b[10]+3200236656&4294967295,f=p+(w<<23&4294967295|w>>>9),w=g+(f^p^T)+b[13]+681279174&4294967295,g=f+(w<<4&4294967295|w>>>28),w=T+(g^f^p)+b[0]+3936430074&4294967295,T=g+(w<<11&4294967295|w>>>21),w=p+(T^g^f)+b[3]+3572445317&4294967295,p=T+(w<<16&4294967295|w>>>16),w=f+(p^T^g)+b[6]+76029189&4294967295,f=p+(w<<23&4294967295|w>>>9),w=g+(f^p^T)+b[9]+3654602809&4294967295,g=f+(w<<4&4294967295|w>>>28),w=T+(g^f^p)+b[12]+3873151461&4294967295,T=g+(w<<11&4294967295|w>>>21),w=p+(T^g^f)+b[15]+530742520&4294967295,p=T+(w<<16&4294967295|w>>>16),w=f+(p^T^g)+b[2]+3299628645&4294967295,f=p+(w<<23&4294967295|w>>>9),w=g+(p^(f|~T))+b[0]+4096336452&4294967295,g=f+(w<<6&4294967295|w>>>26),w=T+(f^(g|~p))+b[7]+1126891415&4294967295,T=g+(w<<10&4294967295|w>>>22),w=p+(g^(T|~f))+b[14]+2878612391&4294967295,p=T+(w<<15&4294967295|w>>>17),w=f+(T^(p|~g))+b[5]+4237533241&4294967295,f=p+(w<<21&4294967295|w>>>11),w=g+(p^(f|~T))+b[12]+1700485571&4294967295,g=f+(w<<6&4294967295|w>>>26),w=T+(f^(g|~p))+b[3]+2399980690&4294967295,T=g+(w<<10&4294967295|w>>>22),w=p+(g^(T|~f))+b[10]+4293915773&4294967295,p=T+(w<<15&4294967295|w>>>17),w=f+(T^(p|~g))+b[1]+2240044497&4294967295,f=p+(w<<21&4294967295|w>>>11),w=g+(p^(f|~T))+b[8]+1873313359&4294967295,g=f+(w<<6&4294967295|w>>>26),w=T+(f^(g|~p))+b[15]+4264355552&4294967295,T=g+(w<<10&4294967295|w>>>22),w=p+(g^(T|~f))+b[6]+2734768916&4294967295,p=T+(w<<15&4294967295|w>>>17),w=f+(T^(p|~g))+b[13]+1309151649&4294967295,f=p+(w<<21&4294967295|w>>>11),w=g+(p^(f|~T))+b[4]+4149444226&4294967295,g=f+(w<<6&4294967295|w>>>26),w=T+(f^(g|~p))+b[11]+3174756917&4294967295,T=g+(w<<10&4294967295|w>>>22),w=p+(g^(T|~f))+b[2]+718787259&4294967295,p=T+(w<<15&4294967295|w>>>17),w=f+(T^(p|~g))+b[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(p+(w<<21&4294967295|w>>>11))&4294967295,v.g[2]=v.g[2]+p&4294967295,v.g[3]=v.g[3]+T&4294967295}r.prototype.v=function(v,g){g===void 0&&(g=v.length);const f=g-this.blockSize,b=this.C;let p=this.h,T=0;for(;T<g;){if(p==0)for(;T<=f;)i(this,v,T),T+=this.blockSize;if(typeof v=="string"){for(;T<g;)if(b[p++]=v.charCodeAt(T++),p==this.blockSize){i(this,b),p=0;break}}else for(;T<g;)if(b[p++]=v[T++],p==this.blockSize){i(this,b),p=0;break}}this.h=p,this.o+=g},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;g=this.o*8;for(var f=v.length-8;f<v.length;++f)v[f]=g&255,g/=256;for(this.v(v),v=Array(16),g=0,f=0;f<4;++f)for(let b=0;b<32;b+=8)v[g++]=this.g[f]>>>b&255;return v};function o(v,g){var f=h;return Object.prototype.hasOwnProperty.call(f,v)?f[v]:f[v]=g(v)}function c(v,g){this.h=g;const f=[];let b=!0;for(let p=v.length-1;p>=0;p--){const T=v[p]|0;b&&T==g||(f[p]=T,b=!1)}this.g=f}var h={};function u(v){return-128<=v&&v<128?o(v,function(g){return new c([g|0],g<0?-1:0)}):new c([v|0],v<0?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return P;if(v<0)return C(d(-v));const g=[];let f=1;for(let b=0;v>=f;b++)g[b]=v/f|0,f*=4294967296;return new c(g,0)}function y(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return C(y(v.substring(1),g));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const f=d(Math.pow(g,8));let b=P;for(let T=0;T<v.length;T+=8){var p=Math.min(8,v.length-T);const w=parseInt(v.substring(T,T+p),g);p<8?(p=d(Math.pow(g,p)),b=b.j(p).add(d(w))):(b=b.j(f),b=b.add(d(w)))}return b}var P=u(0),k=u(1),A=u(16777216);t=c.prototype,t.m=function(){if(I(this))return-C(this).m();let v=0,g=1;for(let f=0;f<this.g.length;f++){const b=this.i(f);v+=(b>=0?b:4294967296+b)*g,g*=4294967296}return v},t.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(E(this))return"0";if(I(this))return"-"+C(this).toString(v);const g=d(Math.pow(v,6));var f=this;let b="";for(;;){const p=U(f,g).g;f=F(f,p.j(g));let T=((f.g.length>0?f.g[0]:f.h)>>>0).toString(v);if(f=p,E(f))return T+b;for(;T.length<6;)T="0"+T;b=T+b}},t.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function E(v){if(v.h!=0)return!1;for(let g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function I(v){return v.h==-1}t.l=function(v){return v=F(this,v),I(v)?-1:E(v)?0:1};function C(v){const g=v.g.length,f=[];for(let b=0;b<g;b++)f[b]=~v.g[b];return new c(f,~v.h).add(k)}t.abs=function(){return I(this)?C(this):this},t.add=function(v){const g=Math.max(this.g.length,v.g.length),f=[];let b=0;for(let p=0;p<=g;p++){let T=b+(this.i(p)&65535)+(v.i(p)&65535),w=(T>>>16)+(this.i(p)>>>16)+(v.i(p)>>>16);b=w>>>16,T&=65535,w&=65535,f[p]=w<<16|T}return new c(f,f[f.length-1]&-2147483648?-1:0)};function F(v,g){return v.add(C(g))}t.j=function(v){if(E(this)||E(v))return P;if(I(this))return I(v)?C(this).j(C(v)):C(C(this).j(v));if(I(v))return C(this.j(C(v)));if(this.l(A)<0&&v.l(A)<0)return d(this.m()*v.m());const g=this.g.length+v.g.length,f=[];for(var b=0;b<2*g;b++)f[b]=0;for(b=0;b<this.g.length;b++)for(let p=0;p<v.g.length;p++){const T=this.i(b)>>>16,w=this.i(b)&65535,V=v.i(p)>>>16,q=v.i(p)&65535;f[2*b+2*p]+=w*q,M(f,2*b+2*p),f[2*b+2*p+1]+=T*q,M(f,2*b+2*p+1),f[2*b+2*p+1]+=w*V,M(f,2*b+2*p+1),f[2*b+2*p+2]+=T*V,M(f,2*b+2*p+2)}for(v=0;v<g;v++)f[v]=f[2*v+1]<<16|f[2*v];for(v=g;v<2*g;v++)f[v]=0;return new c(f,0)};function M(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function O(v,g){this.g=v,this.h=g}function U(v,g){if(E(g))throw Error("division by zero");if(E(v))return new O(P,P);if(I(v))return g=U(C(v),g),new O(C(g.g),C(g.h));if(I(g))return g=U(v,C(g)),new O(C(g.g),g.h);if(v.g.length>30){if(I(v)||I(g))throw Error("slowDivide_ only works with positive integers.");for(var f=k,b=g;b.l(v)<=0;)f=L(f),b=L(b);var p=N(f,1),T=N(b,1);for(b=N(b,2),f=N(f,2);!E(b);){var w=T.add(b);w.l(v)<=0&&(p=p.add(f),T=w),b=N(b,1),f=N(f,1)}return g=F(v,p.j(g)),new O(p,g)}for(p=P;v.l(g)>=0;){for(f=Math.max(1,Math.floor(v.m()/g.m())),b=Math.ceil(Math.log(f)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),T=d(f),w=T.j(g);I(w)||w.l(v)>0;)f-=b,T=d(f),w=T.j(g);E(T)&&(T=k),p=p.add(T),v=F(v,w)}return new O(p,v)}t.B=function(v){return U(this,v).h},t.and=function(v){const g=Math.max(this.g.length,v.g.length),f=[];for(let b=0;b<g;b++)f[b]=this.i(b)&v.i(b);return new c(f,this.h&v.h)},t.or=function(v){const g=Math.max(this.g.length,v.g.length),f=[];for(let b=0;b<g;b++)f[b]=this.i(b)|v.i(b);return new c(f,this.h|v.h)},t.xor=function(v){const g=Math.max(this.g.length,v.g.length),f=[];for(let b=0;b<g;b++)f[b]=this.i(b)^v.i(b);return new c(f,this.h^v.h)};function L(v){const g=v.g.length+1,f=[];for(let b=0;b<g;b++)f[b]=v.i(b)<<1|v.i(b-1)>>>31;return new c(f,v.h)}function N(v,g){const f=g>>5;g%=32;const b=v.g.length-f,p=[];for(let T=0;T<b;T++)p[T]=g>0?v.i(T+f)>>>g|v.i(T+f+1)<<32-g:v.i(T+f);return new c(p,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.B,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=d,c.fromString=y,Di=c}).apply(typeof pa<"u"?pa:typeof self<"u"?self:typeof window<"u"?window:{});var jr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=Object.defineProperty;function n(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof jr=="object"&&jr];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=n(this);function i(s,a){if(a)e:{var l=r;s=s.split(".");for(var m=0;m<s.length-1;m++){var x=s[m];if(!(x in l))break e;l=l[x]}s=s[s.length-1],m=l[s],a=a(m),a!=m&&a!=null&&e(l,s,{configurable:!0,writable:!0,value:a})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(a){var l=[],m;for(m in a)Object.prototype.hasOwnProperty.call(a,m)&&l.push([m,a[m]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function h(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function u(s,a,l){return s.call.apply(s.bind,arguments)}function d(s,a,l){return d=u,d.apply(null,arguments)}function y(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var m=l.slice();return m.push.apply(m,arguments),s.apply(this,m)}}function P(s,a){function l(){}l.prototype=a.prototype,s.Z=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Ob=function(m,x,D){for(var j=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)j[Z-2]=arguments[Z];return a.prototype[x].apply(m,j)}}var k=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function A(s){const a=s.length;if(a>0){const l=Array(a);for(let m=0;m<a;m++)l[m]=s[m];return l}return[]}function E(s,a){for(let m=1;m<arguments.length;m++){const x=arguments[m];var l=typeof x;if(l=l!="object"?l:x?Array.isArray(x)?"array":l:"null",l=="array"||l=="object"&&typeof x.length=="number"){l=s.length||0;const D=x.length||0;s.length=l+D;for(let j=0;j<D;j++)s[l+j]=x[j]}else s.push(x)}}class I{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return this.h>0?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function C(s){c.setTimeout(()=>{throw s},0)}function F(){var s=v;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class M{constructor(){this.h=this.g=null}add(a,l){const m=O.get();m.set(a,l),this.h?this.h.next=m:this.g=m,this.h=m}}var O=new I(()=>new U,s=>s.reset());class U{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let L,N=!1,v=new M,g=()=>{const s=Promise.resolve(void 0);L=()=>{s.then(f)}};function f(){for(var s;s=F();){try{s.h.call(s.g)}catch(l){C(l)}var a=O;a.j(s),a.h<100&&(a.h++,s.next=a.g,a.g=s)}N=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function p(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}p.prototype.h=function(){this.defaultPrevented=!0};var T=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};c.addEventListener("test",l,a),c.removeEventListener("test",l,a)}catch{}return s})();function w(s){return/^[\s\xa0]*$/.test(s)}function V(s,a){p.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,a)}P(V,p),V.prototype.init=function(s,a){const l=this.type=s.type,m=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget,a||(l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement)),this.relatedTarget=a,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&V.Z.h.call(this)},V.prototype.h=function(){V.Z.h.call(this);const s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var q="closure_listenable_"+(Math.random()*1e6|0),B=0;function G(s,a,l,m,x){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!m,this.ha=x,this.key=++B,this.da=this.fa=!1}function J(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function ee(s,a,l){for(const m in s)a.call(l,s[m],m,s)}function he(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function ie(s){const a={};for(const l in s)a[l]=s[l];return a}const de="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ce(s,a){let l,m;for(let x=1;x<arguments.length;x++){m=arguments[x];for(l in m)s[l]=m[l];for(let D=0;D<de.length;D++)l=de[D],Object.prototype.hasOwnProperty.call(m,l)&&(s[l]=m[l])}}function ue(s){this.src=s,this.g={},this.h=0}ue.prototype.add=function(s,a,l,m,x){const D=s.toString();s=this.g[D],s||(s=this.g[D]=[],this.h++);const j=Y(s,a,m,x);return j>-1?(a=s[j],l||(a.fa=!1)):(a=new G(a,this.src,D,!!m,x),a.fa=l,s.push(a)),a};function te(s,a){const l=a.type;if(l in s.g){var m=s.g[l],x=Array.prototype.indexOf.call(m,a,void 0),D;(D=x>=0)&&Array.prototype.splice.call(m,x,1),D&&(J(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function Y(s,a,l,m){for(let x=0;x<s.length;++x){const D=s[x];if(!D.da&&D.listener==a&&D.capture==!!l&&D.ha==m)return x}return-1}var W="closure_lm_"+(Math.random()*1e6|0),X={};function Te(s,a,l,m,x){if(Array.isArray(a)){for(let D=0;D<a.length;D++)Te(s,a[D],l,m,x);return null}return l=ye(l),s&&s[q]?s.J(a,l,h(m)?!!m.capture:!1,x):Ie(s,a,l,!1,m,x)}function Ie(s,a,l,m,x,D){if(!a)throw Error("Invalid event type");const j=h(x)?!!x.capture:!!x;let Z=Ze(s);if(Z||(s[W]=Z=new ue(s)),l=Z.add(a,l,m,j,D),l.proxy)return l;if(m=be(),l.proxy=m,m.src=s,m.listener=l,s.addEventListener)T||(x=j),x===void 0&&(x=!1),s.addEventListener(a.toString(),m,x);else if(s.attachEvent)s.attachEvent(Se(a.toString()),m);else if(s.addListener&&s.removeListener)s.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return l}function be(){function s(l){return a.call(s.src,s.listener,l)}const a=Ne;return s}function Ae(s,a,l,m,x){if(Array.isArray(a))for(var D=0;D<a.length;D++)Ae(s,a[D],l,m,x);else m=h(m)?!!m.capture:!!m,l=ye(l),s&&s[q]?(s=s.i,D=String(a).toString(),D in s.g&&(a=s.g[D],l=Y(a,l,m,x),l>-1&&(J(a[l]),Array.prototype.splice.call(a,l,1),a.length==0&&(delete s.g[D],s.h--)))):s&&(s=Ze(s))&&(a=s.g[a.toString()],s=-1,a&&(s=Y(a,l,m,x)),(l=s>-1?a[s]:null)&&Me(l))}function Me(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[q])te(a.i,s);else{var l=s.type,m=s.proxy;a.removeEventListener?a.removeEventListener(l,m,s.capture):a.detachEvent?a.detachEvent(Se(l),m):a.addListener&&a.removeListener&&a.removeListener(m),(l=Ze(a))?(te(l,s),l.h==0&&(l.src=null,a[W]=null)):J(s)}}}function Se(s){return s in X?X[s]:X[s]="on"+s}function Ne(s,a){if(s.da)s=!0;else{a=new V(a,this);const l=s.listener,m=s.ha||s.src;s.fa&&Me(s),s=l.call(m,a)}return s}function Ze(s){return s=s[W],s instanceof ue?s:null}var De="__closure_events_fn_"+(Math.random()*1e9>>>0);function ye(s){return typeof s=="function"?s:(s[De]||(s[De]=function(a){return s.handleEvent(a)}),s[De])}function se(){b.call(this),this.i=new ue(this),this.M=this,this.G=null}P(se,b),se.prototype[q]=!0,se.prototype.removeEventListener=function(s,a,l,m){Ae(this,s,a,l,m)};function pe(s,a){var l,m=s.G;if(m)for(l=[];m;m=m.G)l.push(m);if(s=s.M,m=a.type||a,typeof a=="string")a=new p(a,s);else if(a instanceof p)a.target=a.target||s;else{var x=a;a=new p(m,s),Ce(a,x)}x=!0;let D,j;if(l)for(j=l.length-1;j>=0;j--)D=a.g=l[j],x=Ke(D,m,!0,a)&&x;if(D=a.g=s,x=Ke(D,m,!0,a)&&x,x=Ke(D,m,!1,a)&&x,l)for(j=0;j<l.length;j++)D=a.g=l[j],x=Ke(D,m,!1,a)&&x}se.prototype.N=function(){if(se.Z.N.call(this),this.i){var s=this.i;for(const a in s.g){const l=s.g[a];for(let m=0;m<l.length;m++)J(l[m]);delete s.g[a],s.h--}}this.G=null},se.prototype.J=function(s,a,l,m){return this.i.add(String(s),a,!1,l,m)},se.prototype.K=function(s,a,l,m){return this.i.add(String(s),a,!0,l,m)};function Ke(s,a,l,m){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();let x=!0;for(let D=0;D<a.length;++D){const j=a[D];if(j&&!j.da&&j.capture==l){const Z=j.listener,xe=j.ha||j.src;j.fa&&te(s.i,j),x=Z.call(xe,m)!==!1&&x}}return x&&!m.defaultPrevented}function Xe(s,a){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=d(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(a)>2147483647?-1:c.setTimeout(s,a||0)}function et(s){s.g=Xe(()=>{s.g=null,s.i&&(s.i=!1,et(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class ct extends b{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:et(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lt(s){b.call(this),this.h=s,this.g={}}P(lt,b);var sn=[];function qn(s){ee(s.g,function(a,l){this.g.hasOwnProperty(l)&&Me(a)},s),s.g={}}lt.prototype.N=function(){lt.Z.N.call(this),qn(this)},lt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Tn=c.JSON.stringify,gs=c.JSON.parse,vs=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Cr(){}function qi(){}var on={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function In(){p.call(this,"d")}P(In,p);function _e(){p.call(this,"c")}P(_e,p);var Fe={},Ut=null;function bt(){return Ut=Ut||new se}Fe.Ia="serverreachability";function Ki(s){p.call(this,Fe.Ia,s)}P(Ki,p);function Kn(s){const a=bt();pe(a,new Ki(a))}Fe.STAT_EVENT="statevent";function Xi(s,a){p.call(this,Fe.STAT_EVENT,s),this.stat=a}P(Xi,p);function Ve(s){const a=bt();pe(a,new Xi(a,s))}Fe.Ja="timingevent";function Ji(s,a){p.call(this,Fe.Ja,s),this.size=a}P(Ji,p);function Xn(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},a)}function Jn(){this.g=!0}Jn.prototype.ua=function(){this.g=!1};function zl(s,a,l,m,x,D){s.info(function(){if(s.g)if(D){var j="",Z=D.split("&");for(let me=0;me<Z.length;me++){var xe=Z[me].split("=");if(xe.length>1){const Oe=xe[0];xe=xe[1];const ht=Oe.split("_");j=ht.length>=2&&ht[1]=="type"?j+(Oe+"="+xe+"&"):j+(Oe+"=redacted&")}}}else j=null;else j=D;return"XMLHTTP REQ ("+m+") [attempt "+x+"]: "+a+`
`+l+`
`+j})}function $l(s,a,l,m,x,D,j){s.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+x+"]: "+a+`
`+l+`
`+D+" "+j})}function An(s,a,l,m){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+Wl(s,l)+(m?" "+m:"")})}function Gl(s,a){s.info(function(){return"TIMEOUT: "+a})}Jn.prototype.info=function(){};function Wl(s,a){if(!s.g)return a;if(!a)return null;try{const D=JSON.parse(a);if(D){for(s=0;s<D.length;s++)if(Array.isArray(D[s])){var l=D[s];if(!(l.length<2)){var m=l[1];if(Array.isArray(m)&&!(m.length<1)){var x=m[0];if(x!="noop"&&x!="stop"&&x!="close")for(let j=1;j<m.length;j++)m[j]=""}}}}return Tn(D)}catch{return a}}var ys={NO_ERROR:0,TIMEOUT:8},Hl={},Yi;function ws(){}P(ws,Cr),ws.prototype.g=function(){return new XMLHttpRequest},Yi=new ws;function Yn(s){return encodeURIComponent(String(s))}function ql(s){var a=1;s=s.split(":");const l=[];for(;a>0&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function jt(s,a,l,m){this.j=s,this.i=a,this.l=l,this.S=m||1,this.V=new lt(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Qi}function Qi(){this.i=null,this.g="",this.h=!1}var Zi={},Ss={};function _s(s,a,l){s.M=1,s.A=Rr(ut(a)),s.u=l,s.R=!0,eo(s,null)}function eo(s,a){s.F=Date.now(),xr(s),s.B=ut(s.A);var l=s.B,m=s.S;Array.isArray(m)||(m=[String(m)]),mo(l.i,"t",m),s.C=0,l=s.j.L,s.h=new Qi,s.g=Mo(s.j,l?a:null,!s.u),s.P>0&&(s.O=new ct(d(s.Y,s,s.g),s.P)),a=s.V,l=s.g,m=s.ba;var x="readystatechange";Array.isArray(x)||(x&&(sn[0]=x.toString()),x=sn);for(let D=0;D<x.length;D++){const j=Te(l,x[D],m||a.handleEvent,!1,a.h||a);if(!j)break;a.g[j.key]=j}a=s.J?ie(s.J):{},s.u?(s.v||(s.v="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,a)):(s.v="GET",s.g.ea(s.B,s.v,null,a)),Kn(),zl(s.i,s.v,s.B,s.l,s.S,s.u)}jt.prototype.ba=function(s){s=s.target;const a=this.O;a&&zt(s)==3?a.j():this.Y(s)},jt.prototype.Y=function(s){try{if(s==this.g)e:{const Z=zt(this.g),xe=this.g.ya(),me=this.g.ca();if(!(Z<3)&&(Z!=3||this.g&&(this.h.h||this.g.la()||_o(this.g)))){this.K||Z!=4||xe==7||(xe==8||me<=0?Kn(3):Kn(2)),bs(this);var a=this.g.ca();this.X=a;var l=Kl(this);if(this.o=a==200,$l(this.i,this.v,this.B,this.l,this.S,Z,a),this.o){if(this.U&&!this.L){t:{if(this.g){var m,x=this.g;if((m=x.g?x.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(m)){var D=m;break t}}D=null}if(s=D)An(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ps(this,s);else{this.o=!1,this.m=3,Ve(12),an(this),Qn(this);break e}}if(this.R){s=!0;let Oe;for(;!this.K&&this.C<l.length;)if(Oe=Xl(this,l),Oe==Ss){Z==4&&(this.m=4,Ve(14),s=!1),An(this.i,this.l,null,"[Incomplete Response]");break}else if(Oe==Zi){this.m=4,Ve(15),An(this.i,this.l,l,"[Invalid Chunk]"),s=!1;break}else An(this.i,this.l,Oe,null),Ps(this,Oe);if(to(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Z!=4||l.length!=0||this.h.h||(this.m=1,Ve(16),s=!1),this.o=this.o&&s,!s)An(this.i,this.l,l,"[Invalid Chunked Response]"),an(this),Qn(this);else if(l.length>0&&!this.W){this.W=!0;var j=this.j;j.g==this&&j.aa&&!j.P&&(j.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),ks(j),j.P=!0,Ve(11))}}else An(this.i,this.l,l,null),Ps(this,l);Z==4&&an(this),this.o&&!this.K&&(Z==4?Co(this.j,this):(this.o=!1,xr(this)))}else lu(this.g),a==400&&l.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),an(this),Qn(this)}}}catch{}finally{}};function Kl(s){if(!to(s))return s.g.la();const a=_o(s.g);if(a==="")return"";let l="";const m=a.length,x=zt(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return an(s),Qn(s),"";s.h.i=new c.TextDecoder}for(let D=0;D<m;D++)s.h.h=!0,l+=s.h.i.decode(a[D],{stream:!(x&&D==m-1)});return a.length=0,s.h.g+=l,s.C=0,s.h.g}function to(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function Xl(s,a){var l=s.C,m=a.indexOf(`
`,l);return m==-1?Ss:(l=Number(a.substring(l,m)),isNaN(l)?Zi:(m+=1,m+l>a.length?Ss:(a=a.slice(m,m+l),s.C=m+l,a)))}jt.prototype.cancel=function(){this.K=!0,an(this)};function xr(s){s.T=Date.now()+s.H,no(s,s.H)}function no(s,a){if(s.D!=null)throw Error("WatchDog timer not null");s.D=Xn(d(s.aa,s),a)}function bs(s){s.D&&(c.clearTimeout(s.D),s.D=null)}jt.prototype.aa=function(){this.D=null;const s=Date.now();s-this.T>=0?(Gl(this.i,this.B),this.M!=2&&(Kn(),Ve(17)),an(this),this.m=2,Qn(this)):no(this,this.T-s)};function Qn(s){s.j.I==0||s.K||Co(s.j,s)}function an(s){bs(s);var a=s.O;a&&typeof a.dispose=="function"&&a.dispose(),s.O=null,qn(s.V),s.g&&(a=s.g,s.g=null,a.abort(),a.dispose())}function Ps(s,a){try{var l=s.j;if(l.I!=0&&(l.g==s||Ts(l.h,s))){if(!s.L&&Ts(l.h,s)&&l.I==3){try{var m=l.Ba.g.parse(a)}catch{m=null}if(Array.isArray(m)&&m.length==3){var x=m;if(x[0]==0){e:if(!l.v){if(l.g)if(l.g.F+3e3<s.F)Lr(l),Dr(l);else break e;Rs(l),Ve(18)}}else l.xa=x[1],0<l.xa-l.K&&x[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=Xn(d(l.Va,l),6e3));io(l.h)<=1&&l.ta&&(l.ta=void 0)}else ln(l,11)}else if((s.L||l.g==s)&&Lr(l),!w(a))for(x=l.Ba.g.parse(a),a=0;a<x.length;a++){let me=x[a];const Oe=me[0];if(!(Oe<=l.K))if(l.K=Oe,me=me[1],l.I==2)if(me[0]=="c"){l.M=me[1],l.ba=me[2];const ht=me[3];ht!=null&&(l.ka=ht,l.j.info("VER="+l.ka));const un=me[4];un!=null&&(l.za=un,l.j.info("SVER="+l.za));const $t=me[5];$t!=null&&typeof $t=="number"&&$t>0&&(m=1.5*$t,l.O=m,l.j.info("backChannelRequestTimeoutMs_="+m)),m=l;const Gt=s.g;if(Gt){const Fr=Gt.g?Gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fr){var D=m.h;D.g||Fr.indexOf("spdy")==-1&&Fr.indexOf("quic")==-1&&Fr.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Is(D,D.h),D.h=null))}if(m.G){const Ms=Gt.g?Gt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ms&&(m.wa=Ms,ge(m.J,m.G,Ms))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-s.F,l.j.info("Handshake RTT: "+l.T+"ms")),m=l;var j=s;if(m.na=ko(m,m.L?m.ba:null,m.W),j.L){oo(m.h,j);var Z=j,xe=m.O;xe&&(Z.H=xe),Z.D&&(bs(Z),xr(Z)),m.g=j}else Ao(m);l.i.length>0&&Or(l)}else me[0]!="stop"&&me[0]!="close"||ln(l,7);else l.I==3&&(me[0]=="stop"||me[0]=="close"?me[0]=="stop"?ln(l,7):xs(l):me[0]!="noop"&&l.l&&l.l.qa(me),l.A=0)}}Kn(4)}catch{}}var Jl=class{constructor(s,a){this.g=s,this.map=a}};function ro(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function so(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function io(s){return s.h?1:s.g?s.g.size:0}function Ts(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Is(s,a){s.g?s.g.add(a):s.h=a}function oo(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}ro.prototype.cancel=function(){if(this.i=ao(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function ao(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.G);return a}return A(s.i)}var co=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Yl(s,a){if(s){s=s.split("&");for(let l=0;l<s.length;l++){const m=s[l].indexOf("=");let x,D=null;m>=0?(x=s[l].substring(0,m),D=s[l].substring(m+1)):x=s[l],a(x,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function Vt(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let a;s instanceof Vt?(this.l=s.l,Zn(this,s.j),this.o=s.o,this.g=s.g,er(this,s.u),this.h=s.h,As(this,po(s.i)),this.m=s.m):s&&(a=String(s).match(co))?(this.l=!1,Zn(this,a[1]||"",!0),this.o=tr(a[2]||""),this.g=tr(a[3]||"",!0),er(this,a[4]),this.h=tr(a[5]||"",!0),As(this,a[6]||"",!0),this.m=tr(a[7]||"")):(this.l=!1,this.i=new rr(null,this.l))}Vt.prototype.toString=function(){const s=[];var a=this.j;a&&s.push(nr(a,lo,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(nr(a,lo,!0),"@"),s.push(Yn(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&s.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(nr(l,l.charAt(0)=="/"?eu:Zl,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",nr(l,nu)),s.join("")},Vt.prototype.resolve=function(s){const a=ut(this);let l=!!s.j;l?Zn(a,s.j):l=!!s.o,l?a.o=s.o:l=!!s.g,l?a.g=s.g:l=s.u!=null;var m=s.h;if(l)er(a,s.u);else if(l=!!s.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var x=a.h.lastIndexOf("/");x!=-1&&(m=a.h.slice(0,x+1)+m)}if(x=m,x==".."||x==".")m="";else if(x.indexOf("./")!=-1||x.indexOf("/.")!=-1){m=x.lastIndexOf("/",0)==0,x=x.split("/");const D=[];for(let j=0;j<x.length;){const Z=x[j++];Z=="."?m&&j==x.length&&D.push(""):Z==".."?((D.length>1||D.length==1&&D[0]!="")&&D.pop(),m&&j==x.length&&D.push("")):(D.push(Z),m=!0)}m=D.join("/")}else m=x}return l?a.h=m:l=s.i.toString()!=="",l?As(a,po(s.i)):l=!!s.m,l&&(a.m=s.m),a};function ut(s){return new Vt(s)}function Zn(s,a,l){s.j=l?tr(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function er(s,a){if(a){if(a=Number(a),isNaN(a)||a<0)throw Error("Bad port number "+a);s.u=a}else s.u=null}function As(s,a,l){a instanceof rr?(s.i=a,ru(s.i,s.l)):(l||(a=nr(a,tu)),s.i=new rr(a,s.l))}function ge(s,a,l){s.i.set(a,l)}function Rr(s){return ge(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function tr(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function nr(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,Ql),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Ql(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var lo=/[#\/\?@]/g,Zl=/[#\?:]/g,eu=/[#\?]/g,tu=/[#\?@]/g,nu=/#/g;function rr(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function cn(s){s.g||(s.g=new Map,s.h=0,s.i&&Yl(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}t=rr.prototype,t.add=function(s,a){cn(this),this.i=null,s=En(this,s);let l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function uo(s,a){cn(s),a=En(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function ho(s,a){return cn(s),a=En(s,a),s.g.has(a)}t.forEach=function(s,a){cn(this),this.g.forEach(function(l,m){l.forEach(function(x){s.call(a,x,m,this)},this)},this)};function fo(s,a){cn(s);let l=[];if(typeof a=="string")ho(s,a)&&(l=l.concat(s.g.get(En(s,a))));else for(s=Array.from(s.g.values()),a=0;a<s.length;a++)l=l.concat(s[a]);return l}t.set=function(s,a){return cn(this),this.i=null,s=En(this,s),ho(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},t.get=function(s,a){return s?(s=fo(this,s),s.length>0?String(s[0]):a):a};function mo(s,a,l){uo(s,a),l.length>0&&(s.i=null,s.g.set(En(s,a),A(l)),s.h+=l.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(let m=0;m<a.length;m++){var l=a[m];const x=Yn(l);l=fo(this,l);for(let D=0;D<l.length;D++){let j=x;l[D]!==""&&(j+="="+Yn(l[D])),s.push(j)}}return this.i=s.join("&")};function po(s){const a=new rr;return a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),a}function En(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function ru(s,a){a&&!s.j&&(cn(s),s.i=null,s.g.forEach(function(l,m){const x=m.toLowerCase();m!=x&&(uo(this,m),mo(this,x,l))},s)),s.j=a}function su(s,a){const l=new Jn;if(c.Image){const m=new Image;m.onload=y(Bt,l,"TestLoadImage: loaded",!0,a,m),m.onerror=y(Bt,l,"TestLoadImage: error",!1,a,m),m.onabort=y(Bt,l,"TestLoadImage: abort",!1,a,m),m.ontimeout=y(Bt,l,"TestLoadImage: timeout",!1,a,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=s}else a(!1)}function iu(s,a){const l=new Jn,m=new AbortController,x=setTimeout(()=>{m.abort(),Bt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:m.signal}).then(D=>{clearTimeout(x),D.ok?Bt(l,"TestPingServer: ok",!0,a):Bt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(x),Bt(l,"TestPingServer: error",!1,a)})}function Bt(s,a,l,m,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),m(l)}catch{}}function ou(){this.g=new vs}function Es(s){this.i=s.Sb||null,this.h=s.ab||!1}P(Es,Cr),Es.prototype.g=function(){return new kr(this.i,this.h)};function kr(s,a){se.call(this),this.H=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}P(kr,se),t=kr.prototype,t.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=a,this.readyState=1,ir(this)},t.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const a={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(a.body=s),(this.H||c).fetch(new Request(this.D,a)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,sr(this)),this.readyState=0},t.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,ir(this)),this.g&&(this.readyState=3,ir(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;go(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function go(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}t.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.B.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?sr(this):ir(this),this.readyState==3&&go(this)}},t.Oa=function(s){this.g&&(this.response=this.responseText=s,sr(this))},t.Na=function(s){this.g&&(this.response=s,sr(this))},t.ga=function(){this.g&&sr(this)};function sr(s){s.readyState=4,s.l=null,s.j=null,s.B=null,ir(s)}t.setRequestHeader=function(s,a){this.A.append(s,a)},t.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function ir(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(kr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function vo(s){let a="";return ee(s,function(l,m){a+=m,a+=":",a+=l,a+=`\r
`}),a}function Cs(s,a,l){e:{for(m in l){var m=!1;break e}m=!0}m||(l=vo(l),typeof s=="string"?l!=null&&Yn(l):ge(s,a,l))}function Pe(s){se.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}P(Pe,se);var au=/^https?$/i,cu=["POST","PUT"];t=Pe.prototype,t.Fa=function(s){this.H=s},t.ea=function(s,a,l,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Yi.g(),this.g.onreadystatechange=k(d(this.Ca,this));try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(D){yo(this,D);return}if(s=l||"",l=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var x in m)l.set(x,m[x]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const D of m.keys())l.set(D,m.get(D));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(l.keys()).find(D=>D.toLowerCase()=="content-type"),x=c.FormData&&s instanceof c.FormData,!(Array.prototype.indexOf.call(cu,a,void 0)>=0)||m||x||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,j]of l)this.g.setRequestHeader(D,j);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(D){yo(this,D)}};function yo(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.o=5,wo(s),Mr(s)}function wo(s){s.A||(s.A=!0,pe(s,"complete"),pe(s,"error"))}t.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,pe(this,"complete"),pe(this,"abort"),Mr(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mr(this,!0)),Pe.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?So(this):this.Xa())},t.Xa=function(){So(this)};function So(s){if(s.h&&typeof o<"u"){if(s.v&&zt(s)==4)setTimeout(s.Ca.bind(s),0);else if(pe(s,"readystatechange"),zt(s)==4){s.h=!1;try{const D=s.ca();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var m;if(m=D===0){let j=String(s.D).match(co)[1]||null;!j&&c.self&&c.self.location&&(j=c.self.location.protocol.slice(0,-1)),m=!au.test(j?j.toLowerCase():"")}l=m}if(l)pe(s,"complete"),pe(s,"success");else{s.o=6;try{var x=zt(s)>2?s.g.statusText:""}catch{x=""}s.l=x+" ["+s.ca()+"]",wo(s)}}finally{Mr(s)}}}}function Mr(s,a){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);const l=s.g;s.g=null,a||pe(s,"ready");try{l.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function zt(s){return s.g?s.g.readyState:0}t.ca=function(){try{return zt(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),gs(a)}};function _o(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function lu(s){const a={};s=(s.g&&zt(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<s.length;m++){if(w(s[m]))continue;var l=ql(s[m]);const x=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const D=a[x]||[];a[x]=D,D.push(l)}he(a,function(m){return m.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function or(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function bo(s){this.za=0,this.i=[],this.j=new Jn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=or("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=or("baseRetryDelayMs",5e3,s),this.Za=or("retryDelaySeedMs",1e4,s),this.Ta=or("forwardChannelMaxRetries",2,s),this.va=or("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new ro(s&&s.concurrentRequestLimit),this.Ba=new ou,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=bo.prototype,t.ka=8,t.I=1,t.connect=function(s,a,l,m){Ve(0),this.W=s,this.H=a||{},l&&m!==void 0&&(this.H.OSID=l,this.H.OAID=m),this.F=this.X,this.J=ko(this,null,this.W),Or(this)};function xs(s){if(Po(s),s.I==3){var a=s.V++,l=ut(s.J);if(ge(l,"SID",s.M),ge(l,"RID",a),ge(l,"TYPE","terminate"),ar(s,l),a=new jt(s,s.j,a),a.M=2,a.A=Rr(ut(l)),l=!1,c.navigator&&c.navigator.sendBeacon)try{l=c.navigator.sendBeacon(a.A.toString(),"")}catch{}!l&&c.Image&&(new Image().src=a.A,l=!0),l||(a.g=Mo(a.j,null),a.g.ea(a.A)),a.F=Date.now(),xr(a)}Ro(s)}function Dr(s){s.g&&(ks(s),s.g.cancel(),s.g=null)}function Po(s){Dr(s),s.v&&(c.clearTimeout(s.v),s.v=null),Lr(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&c.clearTimeout(s.m),s.m=null)}function Or(s){if(!so(s.h)&&!s.m){s.m=!0;var a=s.Ea;L||g(),N||(L(),N=!0),v.add(a,s),s.D=0}}function uu(s,a){return io(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=a.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=Xn(d(s.Ea,s,a),xo(s,s.D)),s.D++,!0)}t.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;const x=new jt(this,this.j,s);let D=this.o;if(this.U&&(D?(D=ie(D),Ce(D,this.U)):D=this.U),this.u!==null||this.R||(x.J=D,D=null),this.S)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var m=this.i[l];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(a+=m,a>4096){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=Io(this,x,a),l=ut(this.J),ge(l,"RID",s),ge(l,"CVER",22),this.G&&ge(l,"X-HTTP-Session-Id",this.G),ar(this,l),D&&(this.R?a="headers="+Yn(vo(D))+"&"+a:this.u&&Cs(l,this.u,D)),Is(this.h,x),this.Ra&&ge(l,"TYPE","init"),this.S?(ge(l,"$req",a),ge(l,"SID","null"),x.U=!0,_s(x,l,null)):_s(x,l,a),this.I=2}}else this.I==3&&(s?To(this,s):this.i.length==0||so(this.h)||To(this))};function To(s,a){var l;a?l=a.l:l=s.V++;const m=ut(s.J);ge(m,"SID",s.M),ge(m,"RID",l),ge(m,"AID",s.K),ar(s,m),s.u&&s.o&&Cs(m,s.u,s.o),l=new jt(s,s.j,l,s.D+1),s.u===null&&(l.J=s.o),a&&(s.i=a.G.concat(s.i)),a=Io(s,l,1e3),l.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),Is(s.h,l),_s(l,m,a)}function ar(s,a){s.H&&ee(s.H,function(l,m){ge(a,m,l)}),s.l&&ee({},function(l,m){ge(a,m,l)})}function Io(s,a,l){l=Math.min(s.i.length,l);const m=s.l?d(s.l.Ka,s.l,s):null;e:{var x=s.i;let Z=-1;for(;;){const xe=["count="+l];Z==-1?l>0?(Z=x[0].g,xe.push("ofs="+Z)):Z=0:xe.push("ofs="+Z);let me=!0;for(let Oe=0;Oe<l;Oe++){var D=x[Oe].g;const ht=x[Oe].map;if(D-=Z,D<0)Z=Math.max(0,x[Oe].g-100),me=!1;else try{D="req"+D+"_"||"";try{var j=ht instanceof Map?ht:Object.entries(ht);for(const[un,$t]of j){let Gt=$t;h($t)&&(Gt=Tn($t)),xe.push(D+un+"="+encodeURIComponent(Gt))}}catch(un){throw xe.push(D+"type="+encodeURIComponent("_badmap")),un}}catch{m&&m(ht)}}if(me){j=xe.join("&");break e}}j=void 0}return s=s.i.splice(0,l),a.G=s,j}function Ao(s){if(!s.g&&!s.v){s.Y=1;var a=s.Da;L||g(),N||(L(),N=!0),v.add(a,s),s.A=0}}function Rs(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=Xn(d(s.Da,s),xo(s,s.A)),s.A++,!0)}t.Da=function(){if(this.v=null,Eo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=Xn(d(this.Wa,this),s)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),Dr(this),Eo(this))};function ks(s){s.B!=null&&(c.clearTimeout(s.B),s.B=null)}function Eo(s){s.g=new jt(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var a=ut(s.na);ge(a,"RID","rpc"),ge(a,"SID",s.M),ge(a,"AID",s.K),ge(a,"CI",s.F?"0":"1"),!s.F&&s.ia&&ge(a,"TO",s.ia),ge(a,"TYPE","xmlhttp"),ar(s,a),s.u&&s.o&&Cs(a,s.u,s.o),s.O&&(s.g.H=s.O);var l=s.g;s=s.ba,l.M=1,l.A=Rr(ut(a)),l.u=null,l.R=!0,eo(l,s)}t.Va=function(){this.C!=null&&(this.C=null,Dr(this),Rs(this),Ve(19))};function Lr(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function Co(s,a){var l=null;if(s.g==a){Lr(s),ks(s),s.g=null;var m=2}else if(Ts(s.h,a))l=a.G,oo(s.h,a),m=1;else return;if(s.I!=0){if(a.o)if(m==1){l=a.u?a.u.length:0,a=Date.now()-a.F;var x=s.D;m=bt(),pe(m,new Ji(m,l)),Or(s)}else Ao(s);else if(x=a.m,x==3||x==0&&a.X>0||!(m==1&&uu(s,a)||m==2&&Rs(s)))switch(l&&l.length>0&&(a=s.h,a.i=a.i.concat(l)),x){case 1:ln(s,5);break;case 4:ln(s,10);break;case 3:ln(s,6);break;default:ln(s,2)}}}function xo(s,a){let l=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(l*=2),l*a}function ln(s,a){if(s.j.info("Error code "+a),a==2){var l=d(s.bb,s),m=s.Ua;const x=!m;m=new Vt(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Zn(m,"https"),Rr(m),x?su(m.toString(),l):iu(m.toString(),l)}else Ve(2);s.I=0,s.l&&s.l.pa(a),Ro(s),Po(s)}t.bb=function(s){s?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function Ro(s){if(s.I=0,s.ja=[],s.l){const a=ao(s.h);(a.length!=0||s.i.length!=0)&&(E(s.ja,a),E(s.ja,s.i),s.h.i.length=0,A(s.i),s.i.length=0),s.l.oa()}}function ko(s,a,l){var m=l instanceof Vt?ut(l):new Vt(l);if(m.g!="")a&&(m.g=a+"."+m.g),er(m,m.u);else{var x=c.location;m=x.protocol,a=a?a+"."+x.hostname:x.hostname,x=+x.port;const D=new Vt(null);m&&Zn(D,m),a&&(D.g=a),x&&er(D,x),l&&(D.h=l),m=D}return l=s.G,a=s.wa,l&&a&&ge(m,l,a),ge(m,"VER",s.ka),ar(s,m),m}function Mo(s,a,l){if(a&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Aa&&!s.ma?new Pe(new Es({ab:l})):new Pe(s.ma),a.Fa(s.L),a}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Do(){}t=Do.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Je(s,a){se.call(this),this.g=new bo(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.sa&&(s?s["X-WebChannel-Client-Profile"]=a.sa:s={"X-WebChannel-Client-Profile":a.sa}),this.g.U=s,(s=a&&a.Qb)&&!w(s)&&(this.g.u=s),this.A=a&&a.supportsCrossDomainXhr||!1,this.v=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!w(a)&&(this.g.G=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new Cn(this)}P(Je,se),Je.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Je.prototype.close=function(){xs(this.g)},Je.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.v&&(l={},l.__data__=Tn(s),s=l);a.i.push(new Jl(a.Ya++,s)),a.I==3&&Or(a)},Je.prototype.N=function(){this.g.l=null,delete this.j,xs(this.g),delete this.g,Je.Z.N.call(this)};function Oo(s){In.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){e:{for(const l in a){s=l;break e}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}P(Oo,In);function Lo(){_e.call(this),this.status=1}P(Lo,_e);function Cn(s){this.g=s}P(Cn,Do),Cn.prototype.ra=function(){pe(this.g,"a")},Cn.prototype.qa=function(s){pe(this.g,new Oo(s))},Cn.prototype.pa=function(s){pe(this.g,new Lo)},Cn.prototype.oa=function(){pe(this.g,"b")},Je.prototype.send=Je.prototype.o,Je.prototype.open=Je.prototype.m,Je.prototype.close=Je.prototype.close,ys.NO_ERROR=0,ys.TIMEOUT=8,ys.HTTP_ERROR=6,Hl.COMPLETE="complete",qi.EventType=on,on.OPEN="a",on.CLOSE="b",on.ERROR="c",on.MESSAGE="d",se.prototype.listen=se.prototype.J,Pe.prototype.listenOnce=Pe.prototype.K,Pe.prototype.getLastError=Pe.prototype.Ha,Pe.prototype.getLastErrorCode=Pe.prototype.ya,Pe.prototype.getStatus=Pe.prototype.ca,Pe.prototype.getResponseJson=Pe.prototype.La,Pe.prototype.getResponseText=Pe.prototype.la,Pe.prototype.send=Pe.prototype.ea,Pe.prototype.setWithCredentials=Pe.prototype.Fa}).apply(typeof jr<"u"?jr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Be.UNAUTHENTICATED=new Be(null),Be.GOOGLE_CREDENTIALS=new Be("google-credentials-uid"),Be.FIRST_PARTY=new Be("first-party-uid"),Be.MOCK_USER=new Be("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pr="12.12.0";function Tg(t){Pr=t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=new hs("@firebase/firestore");function st(t,...e){if(Vn.logLevel<=fe.DEBUG){const n=e.map(Oi);Vn.debug(`Firestore (${Pr}): ${t}`,...n)}}function rl(t,...e){if(Vn.logLevel<=fe.ERROR){const n=e.map(Oi);Vn.error(`Firestore (${Pr}): ${t}`,...n)}}function Ig(t,...e){if(Vn.logLevel<=fe.WARN){const n=e.map(Oi);Vn.warn(`Firestore (${Pr}): ${t}`,...n)}}function Oi(t){if(typeof t=="string")return t;try{return(function(n){return JSON.stringify(n)})(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,sl(t,r,n)}function sl(t,e,n){let r=`FIRESTORE (${Pr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw rl(r),new Error(r)}function ur(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||sl(e,i,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class ce extends _t{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ag{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(Be.UNAUTHENTICATED)))}shutdown(){}}class Eg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class Cg{constructor(e){this.t=e,this.currentUser=Be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ur(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let o=new hr;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new hr,e.enqueueRetryable((()=>i(this.currentUser)))};const c=()=>{const u=o;e.enqueueRetryable((async()=>{await u.promise,await i(this.currentUser)}))},h=u=>{st("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit((u=>h(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?h(u):(st("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new hr)}}),0),c()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==e?(st("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ur(typeof r.accessToken=="string",31837,{l:r}),new il(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ur(e===null||typeof e=="string",2055,{h:e}),new Be(e)}}class xg{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=Be.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Rg{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new xg(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(Be.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ga{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class kg{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,nt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){ur(this.o===void 0,3512);const r=o=>{o.error!=null&&st("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const c=o.token!==this.m;return this.m=o.token,st("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?n(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>r(o)))};const i=o=>{st("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):st("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ga(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(ur(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new ga(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=Mg(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<n&&(r+=e.charAt(i[o]%62))}return r}}function en(t,e){return t<e?-1:t>e?1:0}function Og(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const i=t.charAt(r),o=e.charAt(r);if(i!==o)return zs(i)===zs(o)?en(i,o):zs(i)?1:-1}return en(t.length,e.length)}const Lg=55296,Fg=57343;function zs(t){const e=t.charCodeAt(0);return e>=Lg&&e<=Fg}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="__name__";class mt{constructor(e,n,r){n===void 0?n=0:n>e.length&&yr(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&yr(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return mt.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof mt?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const o=mt.compareSegments(e.get(i),n.get(i));if(o!==0)return o}return en(e.length,n.length)}static compareSegments(e,n){const r=mt.isNumericId(e),i=mt.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?mt.extractNumericId(e).compare(mt.extractNumericId(n)):Og(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Di.fromString(e.substring(4,e.length-2))}}class tt extends mt{construct(e,n,r){return new tt(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new ce(ae.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((i=>i.length>0)))}return new tt(n)}static emptyPath(){return new tt([])}}const Ng=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fn extends mt{construct(e,n,r){return new fn(e,n,r)}static isValidIdentifier(e){return Ng.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fn.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===va}static keyField(){return new fn([va])}static fromServerFormat(e){const n=[];let r="",i=0;const o=()=>{if(r.length===0)throw new ce(ae.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let c=!1;for(;i<e.length;){const h=e[i];if(h==="\\"){if(i+1===e.length)throw new ce(ae.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new ce(ae.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else h==="`"?(c=!c,i++):h!=="."||c?(r+=h,i++):(o(),i++)}if(o(),c)throw new ce(ae.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fn(n)}static emptyPath(){return new fn([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this.path=e}static fromPath(e){return new gn(tt.fromString(e))}static fromName(e){return new gn(tt.fromString(e).popFirst(5))}static empty(){return new gn(tt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&tt.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return tt.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new gn(new tt(e.slice()))}}function Ug(t,e,n,r){if(e===!0&&r===!0)throw new ce(ae.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function jg(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Vg(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":yr(12329,{type:typeof t})}function Bg(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ce(ae.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Vg(t);throw new ce(ae.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(t,e){const n={typeString:t};return e&&(n.value=e),n}function Tr(t,e){if(!jg(t))throw new ce(ae.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,o="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const c=t[r];if(i&&typeof c!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&c!==o.value){n=`Expected '${r}' field to equal '${o.value}'`;break}}if(n)throw new ce(ae.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=-62135596800,wa=1e6;class pt{static now(){return pt.fromMillis(Date.now())}static fromDate(e){return pt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*wa);return new pt(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new ce(ae.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new ce(ae.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<ya)throw new ce(ae.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ce(ae.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/wa}_compareTo(e){return this.seconds===e.seconds?en(this.nanoseconds,e.nanoseconds):en(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:pt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Tr(e,pt._jsonSchema))return new pt(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ya;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}pt._jsonSchemaVersion="firestore/timestamp/1.0",pt._jsonSchema={type:Ee("string",pt._jsonSchemaVersion),seconds:Ee("number"),nanoseconds:Ee("number")};function zg(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new $g("Invalid base64 string: "+o):o}})(e);return new _n(n)}static fromUint8Array(e){const n=(function(i){let o="";for(let c=0;c<i.length;++c)o+=String.fromCharCode(i[c]);return o})(e);return new _n(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return en(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_n.EMPTY_BYTE_STRING=new _n("");const ai="(default)";class es{constructor(e,n){this.projectId=e,this.database=n||ai}static empty(){return new es("","")}get isDefaultDatabase(){return this.database===ai}isEqual(e){return e instanceof es&&e.projectId===this.projectId&&e.database===this.database}}function Gg(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new ce(ae.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new es(t.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e,n=null,r=[],i=[],o=null,c="F",h=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=c,this.startAt=h,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Hg(t){return new Wg(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sa,oe;(oe=Sa||(Sa={}))[oe.OK=0]="OK",oe[oe.CANCELLED=1]="CANCELLED",oe[oe.UNKNOWN=2]="UNKNOWN",oe[oe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",oe[oe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",oe[oe.NOT_FOUND=5]="NOT_FOUND",oe[oe.ALREADY_EXISTS=6]="ALREADY_EXISTS",oe[oe.PERMISSION_DENIED=7]="PERMISSION_DENIED",oe[oe.UNAUTHENTICATED=16]="UNAUTHENTICATED",oe[oe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",oe[oe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",oe[oe.ABORTED=10]="ABORTED",oe[oe.OUT_OF_RANGE=11]="OUT_OF_RANGE",oe[oe.UNIMPLEMENTED=12]="UNIMPLEMENTED",oe[oe.INTERNAL=13]="INTERNAL",oe[oe.UNAVAILABLE=14]="UNAVAILABLE",oe[oe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Di([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=1048576;function $s(){return typeof document<"u"?document:null}class Xg{constructor(e,n,r=1e3,i=1.5,o=6e4){this.Ci=e,this.timerId=n,this.R_=r,this.A_=i,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const n=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,n-r);i>0&&st("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,n,r,i,o){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new hr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((c=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,o){const c=Date.now()+r,h=new Li(e,n,c,i,o);return h.start(r),h}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ce(ae.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var _a,ba;(ba=_a||(_a={})).Ma="default",ba.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg="ComponentProvider",Pa=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="firestore.googleapis.com",Ta=!0;class Ia{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new ce(ae.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ol,this.ssl=Ta}else this.host=e.host,this.ssl=e.ssl??Ta;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=qg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Kg)throw new ce(ae.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ug("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Jg(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new ce(ae.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new ce(ae.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new ce(ae.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class al{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ia({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ce(ae.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ce(ae.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ia(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ag;switch(r.type){case"firstParty":return new Rg(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new ce(ae.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=Pa.get(n);r&&(st(Yg,"Removing Datastore"),Pa.delete(n),r.terminate())})(this),Promise.resolve()}}function Qg(t,e,n,r={}){var d;t=Bg(t,al);const i=$n(e),o=t._getSettings(),c={...o,emulatorOptions:t._getEmulatorOptions()},h=`${e}:${n}`;i&&Ii(`https://${h}`),o.host!==ol&&o.host!==h&&Ig("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:h,ssl:i,emulatorOptions:r};if(!Sn(u,c)&&(t._setSettings(u),r.mockUserToken)){let y,P;if(typeof r.mockUserToken=="string")y=r.mockUserToken,P=Be.MOCK_USER;else{y=zf(r.mockUserToken,(d=t._app)==null?void 0:d.options.projectId);const k=r.mockUserToken.sub||r.mockUserToken.user_id;if(!k)throw new ce(ae.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");P=new Be(k)}t._authCredentials=new Eg(new il(y,P))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Fi(this.firestore,e,this._query)}}class vt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ni(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new vt(this.firestore,e,this._key)}toJSON(){return{type:vt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Tr(n,vt._jsonSchema))return new vt(e,r||null,new gn(tt.fromString(n.referencePath)))}}vt._jsonSchemaVersion="firestore/documentReference/1.0",vt._jsonSchema={type:Ee("string",vt._jsonSchemaVersion),referencePath:Ee("string")};class Ni extends Fi{constructor(e,n,r){super(e,n,Hg(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new vt(this.firestore,null,new gn(e))}withConverter(e){return new Ni(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa="AsyncQueue";class Ea{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Xg(this,"async_queue_retry"),this._c=()=>{const r=$s();r&&st(Aa,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=$s();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=$s();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const n=new hr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!zg(e))throw e;st(Aa,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const n=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,rl("INTERNAL UNHANDLED ERROR: ",Ca(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const i=Li.createAndSchedule(this,e,n,r,(o=>this.hc(o)));return this.tc.push(i),i}uc(){this.nc&&yr(47125,{Pc:Ca(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Ca(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Zg extends al{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Ea,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ea(e),this._firestoreClient=void 0,await e}}}function e0(t,e){const n=typeof t=="object"?t:ds(),r=typeof t=="string"?t:ai,i=Gn(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=Oc("firestore");o&&Qg(i,...o)}return i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Et(_n.fromBase64String(e))}catch(n){throw new ce(ae.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Et(_n.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Et._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Tr(e,Et._jsonSchema))return Et.fromBase64String(e.bytes)}}Et._jsonSchemaVersion="firestore/bytes/1.0",Et._jsonSchema={type:Ee("string",Et._jsonSchemaVersion),bytes:Ee("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new ce(ae.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fn(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new ce(ae.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new ce(ae.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return en(this._lat,e._lat)||en(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:vn._jsonSchemaVersion}}static fromJSON(e){if(Tr(e,vn._jsonSchema))return new vn(e.latitude,e.longitude)}}vn._jsonSchemaVersion="firestore/geoPoint/1.0",vn._jsonSchema={type:Ee("string",vn._jsonSchemaVersion),latitude:Ee("number"),longitude:Ee("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:yn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Tr(e,yn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new yn(e.vectorValues);throw new ce(ae.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}yn._jsonSchemaVersion="firestore/vectorValue/1.0",yn._jsonSchema={type:Ee("string",yn._jsonSchemaVersion),vectorValues:Ee("object")};function ll(t,e,n){if((e=at(e))instanceof cl)return e._internalPath;if(typeof e=="string")return n0(t,e);throw ci("Field path arguments must be of type string or ",t)}const t0=new RegExp("[~\\*/\\[\\]]");function n0(t,e,n){if(e.search(t0)>=0)throw ci(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t);try{return new cl(...e.split("."))._internalPath}catch{throw ci(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t)}}function ci(t,e,n,r,i){let o=`Function ${e}() called with invalid data`;o+=". ";let c="";return new ce(ae.INVALID_ARGUMENT,o+t+c)}const xa="@firebase/firestore",Ra="4.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e,n,r,i,o){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new vt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new r0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(ll("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class r0 extends ul{data(){return super.data()}}class Vr{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Mn extends ul{constructor(e,n,r,i,o,c){super(e,n,r,i,c),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new zr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(ll("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new ce(ae.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Mn._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Mn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Mn._jsonSchema={type:Ee("string",Mn._jsonSchemaVersion),bundleSource:Ee("string","DocumentSnapshot"),bundleName:Ee("string"),bundle:Ee("string")};class zr extends Mn{data(e={}){return super.data(e)}}class dr{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Vr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new zr(this._firestore,this._userDataWriter,r.key,r,new Vr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new ce(ae.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let c=0;return i._snapshot.docChanges.map((h=>{const u=new zr(i._firestore,i._userDataWriter,h.doc.key,h.doc,new Vr(i._snapshot.mutatedKeys.has(h.doc.key),i._snapshot.fromCache),i.query.converter);return h.doc,{type:"added",doc:u,oldIndex:-1,newIndex:c++}}))}{let c=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((h=>o||h.type!==3)).map((h=>{const u=new zr(i._firestore,i._userDataWriter,h.doc.key,h.doc,new Vr(i._snapshot.mutatedKeys.has(h.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,y=-1;return h.type!==0&&(d=c.indexOf(h.doc.key),c=c.delete(h.doc.key)),h.type!==1&&(c=c.add(h.doc),y=c.indexOf(h.doc.key)),{type:s0(h.type),doc:u,oldIndex:d,newIndex:y}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new ce(ae.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=dr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Dg.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(n.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function s0(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return yr(61501,{type:t})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dr._jsonSchemaVersion="firestore/querySnapshot/1.0",dr._jsonSchema={type:Ee("string",dr._jsonSchemaVersion),bundleSource:Ee("string","QuerySnapshot"),bundleName:Ee("string"),bundle:Ee("string")};(function(e,n=!0){Tg(Wn),Lt(new St("firestore",((r,{instanceIdentifier:i,options:o})=>{const c=r.getProvider("app").getImmediate(),h=new Zg(new Cg(r.getProvider("auth-internal")),new kg(c,r.getProvider("app-check-internal")),Gg(c,i),c);return o={useFetchStreams:n,...o},h._setSettings(o),h}),"PUBLIC").setMultipleInstances(!0)),ot(xa,Ra,e),ot(xa,Ra,"esm2020")})();function hl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const i0=hl,dl=new zn("auth","Firebase",hl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts=new hs("@firebase/auth");function o0(t,...e){ts.logLevel<=fe.WARN&&ts.warn(`Auth (${Wn}): ${t}`,...e)}function $r(t,...e){ts.logLevel<=fe.ERROR&&ts.error(`Auth (${Wn}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(t,...e){throw Ui(t,...e)}function yt(t,...e){return Ui(t,...e)}function fl(t,e,n){const r={...i0(),[e]:n};return new zn("auth","Firebase",r).create(e,{appName:t.name})}function wn(t){return fl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ui(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return dl.create(t,...e)}function H(t,e,...n){if(!t)throw Ui(e,...n)}function xt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw $r(e),new Error(e)}function Nt(t,e){t||xt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function a0(){return ka()==="http:"||ka()==="https:"}function ka(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(a0()||Wf()||"connection"in navigator)?navigator.onLine:!0}function l0(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,n){this.shortDelay=e,this.longDelay=n,Nt(n>e,"Short delay should be less than long delay!"),this.isMobile=$f()||Hf()}get(){return c0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(t,e){Nt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h0=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],d0=new Ir(3e4,6e4);function Vi(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Hn(t,e,n,r,i={}){return pl(t,i,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});const h=br({key:t.config.apiKey,...c}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const d={method:e,headers:u,...o};return Gf()||(d.referrerPolicy="no-referrer"),t.emulatorConfig&&$n(t.emulatorConfig.host)&&(d.credentials="include"),ml.fetch()(await gl(t,t.config.apiHost,n,h),d)})}async function pl(t,e,n){t._canInitEmulator=!1;const r={...u0,...e};try{const i=new m0(t),o=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw Br(t,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const h=o.ok?c.errorMessage:c.error.message,[u,d]=h.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Br(t,"credential-already-in-use",c);if(u==="EMAIL_EXISTS")throw Br(t,"email-already-in-use",c);if(u==="USER_DISABLED")throw Br(t,"user-disabled",c);const y=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw fl(t,y,d);Ft(t,y)}}catch(i){if(i instanceof _t)throw i;Ft(t,"network-request-failed",{message:String(i)})}}async function f0(t,e,n,r,i={}){const o=await Hn(t,e,n,r,i);return"mfaPendingCredential"in o&&Ft(t,"multi-factor-auth-required",{_serverResponse:o}),o}async function gl(t,e,n,r){const i=`${e}${n}?${r}`,o=t,c=o.config.emulator?ji(t.config,i):`${t.config.apiScheme}://${i}`;return h0.includes(n)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(c).toString():c}class m0{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(yt(this.auth,"network-request-failed")),d0.get())})}}function Br(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=yt(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function p0(t,e){return Hn(t,"POST","/v1/accounts:delete",e)}async function ns(t,e){return Hn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fr(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function g0(t,e=!1){const n=at(t),r=await n.getIdToken(e),i=Bi(r);H(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,c=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:fr(Gs(i.auth_time)),issuedAtTime:fr(Gs(i.iat)),expirationTime:fr(Gs(i.exp)),signInProvider:c||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Gs(t){return Number(t)*1e3}function Bi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return $r("JWT malformed, contained fewer than 3 sections"),null;try{const i=kc(n);return i?JSON.parse(i):($r("Failed to decode base64 JWT payload"),null)}catch(i){return $r("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Ma(t){const e=Bi(t);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wr(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof _t&&v0(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function v0({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=fr(this.lastLoginAt),this.creationTime=fr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rs(t){var P;const e=t.auth,n=await t.getIdToken(),r=await wr(t,ns(e,{idToken:n}));H(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=(P=i.providerUserInfo)!=null&&P.length?vl(i.providerUserInfo):[],c=S0(t.providerData,o),h=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),d=h?u:!1,y={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new ui(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,y)}async function w0(t){const e=at(t);await rs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function S0(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function vl(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _0(t,e){const n=await pl(t,{},async()=>{const r=br({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=t.config,c=await gl(t,i,"/v1/token",`key=${o}`),h=await t._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:h,body:r};return t.emulatorConfig&&$n(t.emulatorConfig.host)&&(u.credentials="include"),ml.fetch()(c,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function b0(t,e){return Hn(t,"POST","/v2/accounts:revokeToken",Vi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ma(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){H(e.length!==0,"internal-error");const n=Ma(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:o}=await _0(e,n);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:o}=n,c=new Dn;return r&&(H(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),i&&(H(typeof i=="string","internal-error",{appName:e}),c.accessToken=i),o&&(H(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Dn,this.toJSON())}_performRefresh(){return xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(t,e){H(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class it{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new y0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ui(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await wr(this,this.stsTokenManager.getToken(this.auth,e));return H(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return g0(this,e)}reload(){return w0(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new it({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await rs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(nt(this.auth.app))return Promise.reject(wn(this.auth));const e=await this.getIdToken();return await wr(this,p0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,o=n.phoneNumber??void 0,c=n.photoURL??void 0,h=n.tenantId??void 0,u=n._redirectEventId??void 0,d=n.createdAt??void 0,y=n.lastLoginAt??void 0,{uid:P,emailVerified:k,isAnonymous:A,providerData:E,stsTokenManager:I}=n;H(P&&I,e,"internal-error");const C=Dn.fromJSON(this.name,I);H(typeof P=="string",e,"internal-error"),Wt(r,e.name),Wt(i,e.name),H(typeof k=="boolean",e,"internal-error"),H(typeof A=="boolean",e,"internal-error"),Wt(o,e.name),Wt(c,e.name),Wt(h,e.name),Wt(u,e.name),Wt(d,e.name),Wt(y,e.name);const F=new it({uid:P,auth:e,email:i,emailVerified:k,displayName:r,isAnonymous:A,photoURL:c,phoneNumber:o,tenantId:h,stsTokenManager:C,createdAt:d,lastLoginAt:y});return E&&Array.isArray(E)&&(F.providerData=E.map(M=>({...M}))),u&&(F._redirectEventId=u),F}static async _fromIdTokenResponse(e,n,r=!1){const i=new Dn;i.updateFromServerResponse(n);const o=new it({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await rs(o),o}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];H(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?vl(i.providerUserInfo):[],c=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),h=new Dn;h.updateFromIdToken(r);const u=new it({uid:i.localId,auth:e,stsTokenManager:h,isAnonymous:c}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ui(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da=new Map;function Rt(t){Nt(t instanceof Function,"Expected a class definition");let e=Da.get(t);return e?(Nt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Da.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}yl.type="NONE";const Oa=yl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(t,e,n){return`firebase:${t}:${e}:${n}`}class On{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=Gr(this.userKey,i.apiKey,o),this.fullPersistenceKey=Gr("persistence",i.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ns(this.auth,{idToken:e}).catch(()=>{});return n?it._fromGetAccountInfoResponse(this.auth,n,e):null}return it._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new On(Rt(Oa),e,r);const i=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=i[0]||Rt(Oa);const c=Gr(r,e.config.apiKey,e.name);let h=null;for(const d of n)try{const y=await d._get(c);if(y){let P;if(typeof y=="string"){const k=await ns(e,{idToken:y}).catch(()=>{});if(!k)break;P=await it._fromGetAccountInfoResponse(e,k,y)}else P=it._fromJSON(e,y);d!==o&&(h=P),o=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new On(o,e,r):(o=u[0],h&&await o._set(c,h.toJSON()),await Promise.all(n.map(async d=>{if(d!==o)try{await d._remove(c)}catch{}})),new On(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(bl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Tl(e))return"Blackberry";if(Il(e))return"Webos";if(Sl(e))return"Safari";if((e.includes("chrome/")||_l(e))&&!e.includes("edge/"))return"Chrome";if(Pl(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function wl(t=$e()){return/firefox\//i.test(t)}function Sl(t=$e()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _l(t=$e()){return/crios\//i.test(t)}function bl(t=$e()){return/iemobile/i.test(t)}function Pl(t=$e()){return/android/i.test(t)}function Tl(t=$e()){return/blackberry/i.test(t)}function Il(t=$e()){return/webos/i.test(t)}function zi(t=$e()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function P0(t=$e()){var e;return zi(t)&&!!((e=window.navigator)!=null&&e.standalone)}function T0(){return qf()&&document.documentMode===10}function Al(t=$e()){return zi(t)||Pl(t)||Il(t)||Tl(t)||/windows phone/i.test(t)||bl(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(t,e=[]){let n;switch(t){case"Browser":n=La($e());break;case"Worker":n=`${La($e())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Wn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=o=>new Promise((c,h)=>{try{const u=e(o);c(u)}catch(u){h(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function A0(t,e={}){return Hn(t,"GET","/v2/passwordPolicy",Vi(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E0=6;class C0{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??E0,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x0{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fa(this),this.idTokenSubscription=new Fa(this),this.beforeStateQueue=new I0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=dl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Rt(n)),this._initializationPromise=this.queue(async()=>{var r,i,o;if(!this._deleted&&(this.persistenceManager=await On.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ns(this,{idToken:e}),r=await it._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(nt(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(h,h))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(o=this.redirectUser)==null?void 0:o._redirectEventId,h=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!c||c===h)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(c){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await rs(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=l0()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(nt(this.app))return Promise.reject(wn(this));const n=e?at(e):null;return n&&H(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return nt(this.app)?Promise.reject(wn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return nt(this.app)?Promise.reject(wn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await A0(this),n=new C0(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new zn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await b0(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Rt(e)||this._popupRedirectResolver;H(n,this,"argument-error"),this.redirectPersistenceManager=await On.create(this,[Rt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let c=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(h,this,"internal-error"),h.then(()=>{c||o(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{c=!0,u()}}else{const u=e.addObserver(n);return()=>{c=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=El(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(nt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&o0(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function $i(t){return at(t)}class Fa{constructor(e){this.auth=e,this.observer=null,this.addObserver=Zf(n=>this.observer=n)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function R0(t){Gi=t}function k0(t){return Gi.loadJS(t)}function M0(){return Gi.gapiScript}function D0(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O0(t,e){const n=Gn(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),o=n.getOptions();if(Sn(o,e??{}))return i;Ft(i,"already-initialized")}return n.initialize({options:e})}function L0(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Rt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function F0(t,e,n){const r=$i(t);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=Cl(e),{host:c,port:h}=N0(e),u=h===null?"":`:${h}`,d={url:`${o}//${c}${u}/`},y=Object.freeze({host:c,port:h,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Sn(d,r.config.emulator)&&Sn(y,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=y,r.settings.appVerificationDisabledForTesting=!0,$n(c)?Ii(`${o}//${c}${u}`):U0()}function Cl(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function N0(t){const e=Cl(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Na(r.substr(o.length+1))}}else{const[o,c]=r.split(":");return{host:o,port:Na(c)}}}function Na(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function U0(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return xt("not implemented")}_getIdTokenResponse(e){return xt("not implemented")}_linkToIdToken(e,n){return xt("not implemented")}_getReauthenticationResolver(e){return xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ln(t,e){return f0(t,"POST","/v1/accounts:signInWithIdp",Vi(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j0="http://localhost";class bn extends xl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new bn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ft("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...o}=n;if(!r||!i)return null;const c=new bn(r,i);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){const n=this.buildRequest();return Ln(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ln(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ln(e,n)}buildRequest(){const e={requestUri:j0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=br(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar extends Rl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends Ar{constructor(){super("facebook.com")}static credential(e){return bn._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ht.credential(e.oauthAccessToken)}catch{return null}}}Ht.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ht.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Ar{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return bn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return qt.credential(n,r)}catch{return null}}}qt.GOOGLE_SIGN_IN_METHOD="google.com";qt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Ar{constructor(){super("github.com")}static credential(e){return bn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.GITHUB_SIGN_IN_METHOD="github.com";Kt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt extends Ar{constructor(){super("twitter.com")}static credential(e,n){return bn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Xt.credential(n,r)}catch{return null}}}Xt.TWITTER_SIGN_IN_METHOD="twitter.com";Xt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const o=await it._fromIdTokenResponse(e,r,i),c=Ua(r);return new Bn({user:o,providerId:c,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Ua(r);return new Bn({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Ua(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss extends _t{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ss.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new ss(e,n,r,i)}}function kl(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?ss._fromErrorAndOperation(t,o,e,r):o})}async function V0(t,e,n=!1){const r=await wr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Bn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function B0(t,e,n=!1){const{auth:r}=t;if(nt(r.app))return Promise.reject(wn(r));const i="reauthenticate";try{const o=await wr(t,kl(r,i,e,t),n);H(o.idToken,r,"internal-error");const c=Bi(o.idToken);H(c,r,"internal-error");const{sub:h}=c;return H(t.uid===h,r,"user-mismatch"),Bn._forOperation(t,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Ft(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z0(t,e,n=!1){if(nt(t.app))return Promise.reject(wn(t));const r="signIn",i=await kl(t,r,e),o=await Bn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(o.user),o}function $0(t,e,n,r){return at(t).onIdTokenChanged(e,n,r)}function G0(t,e,n){return at(t).beforeAuthStateChanged(e,n)}const is="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(is,"1"),this.storage.removeItem(is),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W0=1e3,H0=10;class Dl extends Ml{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Al(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((c,h,u)=>{this.notifyListeners(c,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const c=this.storage.getItem(r);!n&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);T0()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,H0):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},W0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Dl.type="LOCAL";const q0=Dl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol extends Ml{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ol.type="SESSION";const Ll=Ol;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K0(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new ms(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:o}=n.data,c=this.handlersMap[i];if(!(c!=null&&c.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const h=Array.from(c).map(async d=>d(n.origin,o)),u=await K0(h);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ms.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,c;return new Promise((h,u)=>{const d=Wi("",20);i.port1.start();const y=setTimeout(()=>{u(new Error("unsupported_event"))},r);c={messageChannel:i,onMessage(P){const k=P;if(k.data.eventId===d)switch(k.data.status){case"ack":clearTimeout(y),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),h(k.data.response);break;default:clearTimeout(y),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(c),i.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[i.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(){return window}function J0(t){wt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fl(){return typeof wt().WorkerGlobalScope<"u"&&typeof wt().importScripts=="function"}async function Y0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Q0(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function Z0(){return Fl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl="firebaseLocalStorageDb",ev=1,os="firebaseLocalStorage",Ul="fbase_key";class Er{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ps(t,e){return t.transaction([os],e?"readwrite":"readonly").objectStore(os)}function tv(){const t=indexedDB.deleteDatabase(Nl);return new Er(t).toPromise()}function hi(){const t=indexedDB.open(Nl,ev);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(os,{keyPath:Ul})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(os)?e(r):(r.close(),await tv(),e(await hi()))})})}async function ja(t,e,n){const r=ps(t,!0).put({[Ul]:e,value:n});return new Er(r).toPromise()}async function nv(t,e){const n=ps(t,!1).get(e),r=await new Er(n).toPromise();return r===void 0?null:r.value}function Va(t,e){const n=ps(t,!0).delete(e);return new Er(n).toPromise()}const rv=800,sv=3;class jl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await hi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>sv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Fl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ms._getInstance(Z0()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await Y0(),!this.activeServiceWorker)return;this.sender=new X0(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Q0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await hi();return await ja(e,is,"1"),await Va(e,is),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>ja(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>nv(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Va(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=ps(i,!1).getAll();return new Er(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}jl.type="LOCAL";const iv=jl;new Ir(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ov(t,e){return e?Rt(e):(H(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends xl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ln(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ln(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ln(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function av(t){return z0(t.auth,new Hi(t),t.bypassAuthState)}function cv(t){const{auth:e,user:n}=t;return H(n,e,"internal-error"),B0(n,new Hi(t),t.bypassAuthState)}async function lv(t){const{auth:e,user:n}=t;return H(n,e,"internal-error"),V0(n,new Hi(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e,n,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:o,error:c,type:h}=e;if(c){this.reject(c);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return av;case"linkViaPopup":case"linkViaRedirect":return lv;case"reauthViaPopup":case"reauthViaRedirect":return cv;default:Ft(this.auth,"internal-error")}}resolve(e){Nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv=new Ir(2e3,1e4);class kn extends Vl{constructor(e,n,r,i,o){super(e,n,i,o),this.provider=r,this.authWindow=null,this.pollId=null,kn.currentPopupAction&&kn.currentPopupAction.cancel(),kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Nt(this.filter.length===1,"Popup operations only handle one event");const e=Wi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,uv.get())};e()}}kn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv="pendingRedirect",Wr=new Map;class dv extends Vl{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Wr.get(this.auth._key());if(!e){try{const r=await fv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Wr.set(this.auth._key(),e)}return this.bypassAuthState||Wr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function fv(t,e){const n=gv(e),r=pv(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function mv(t,e){Wr.set(t._key(),e)}function pv(t){return Rt(t._redirectPersistence)}function gv(t){return Gr(hv,t.config.apiKey,t.name)}async function vv(t,e,n=!1){if(nt(t.app))return Promise.reject(wn(t));const r=$i(t),i=ov(r,e),c=await new dv(r,i,n).execute();return c&&!n&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=600*1e3;class wv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sv(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Bl(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(yt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ba(e))}saveEventToCache(e){this.cachedEventUids.add(Ba(e)),this.lastProcessedEventTime=Date.now()}}function Ba(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Bl({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Sv(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Bl(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _v(t,e={}){return Hn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Pv=/^https?/;async function Tv(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _v(t);for(const n of e)try{if(Iv(n))return}catch{}Ft(t,"unauthorized-domain")}function Iv(t){const e=li(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const c=new URL(t);return c.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&c.hostname===r}if(!Pv.test(n))return!1;if(bv.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av=new Ir(3e4,6e4);function za(){const t=wt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Ev(t){return new Promise((e,n)=>{var i,o,c;function r(){za(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{za(),n(yt(t,"network-request-failed"))},timeout:Av.get()})}if((o=(i=wt().gapi)==null?void 0:i.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((c=wt().gapi)!=null&&c.load)r();else{const h=D0("iframefcb");return wt()[h]=()=>{gapi.load?r():n(yt(t,"network-request-failed"))},k0(`${M0()}?onload=${h}`).catch(u=>n(u))}}).catch(e=>{throw Hr=null,e})}let Hr=null;function Cv(t){return Hr=Hr||Ev(t),Hr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xv=new Ir(5e3,15e3),Rv="__/auth/iframe",kv="emulator/auth/iframe",Mv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Dv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ov(t){const e=t.config;H(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ji(e,kv):`https://${t.config.authDomain}/${Rv}`,r={apiKey:e.apiKey,appName:t.name,v:Wn},i=Dv.get(t.config.apiHost);i&&(r.eid=i);const o=t._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${br(r).slice(1)}`}async function Lv(t){const e=await Cv(t),n=wt().gapi;return H(n,t,"internal-error"),e.open({where:document.body,url:Ov(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Mv,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const c=yt(t,"network-request-failed"),h=wt().setTimeout(()=>{o(c)},xv.get());function u(){wt().clearTimeout(h),i(r)}r.ping(u).then(u,()=>{o(c)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Nv=500,Uv=600,jv="_blank",Vv="http://localhost";class $a{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Bv(t,e,n,r=Nv,i=Uv){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString();let h="";const u={...Fv,width:r.toString(),height:i.toString(),top:o,left:c},d=$e().toLowerCase();n&&(h=_l(d)?jv:n),wl(d)&&(e=e||Vv,u.scrollbars="yes");const y=Object.entries(u).reduce((k,[A,E])=>`${k}${A}=${E},`,"");if(P0(d)&&h!=="_self")return zv(e||"",h),new $a(null);const P=window.open(e||"",h,y);H(P,t,"popup-blocked");try{P.focus()}catch{}return new $a(P)}function zv(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $v="__/auth/handler",Gv="emulator/auth/handler",Wv=encodeURIComponent("fac");async function Ga(t,e,n,r,i,o){H(t.config.authDomain,t,"auth-domain-config-required"),H(t.config.apiKey,t,"invalid-api-key");const c={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Wn,eventId:i};if(e instanceof Rl){e.setDefaultLanguage(t.languageCode),c.providerId=e.providerId||"",Qf(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[y,P]of Object.entries({}))c[y]=P}if(e instanceof Ar){const y=e.getScopes().filter(P=>P!=="");y.length>0&&(c.scopes=y.join(","))}t.tenantId&&(c.tid=t.tenantId);const h=c;for(const y of Object.keys(h))h[y]===void 0&&delete h[y];const u=await t._getAppCheckToken(),d=u?`#${Wv}=${encodeURIComponent(u)}`:"";return`${Hv(t)}?${br(h).slice(1)}${d}`}function Hv({config:t}){return t.emulator?ji(t,Gv):`https://${t.authDomain}/${$v}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws="webStorageSupport";class qv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ll,this._completeRedirectFn=vv,this._overrideRedirectResult=mv}async _openPopup(e,n,r,i){var c;Nt((c=this.eventManagers[e._key()])==null?void 0:c.manager,"_initialize() not called before _openPopup()");const o=await Ga(e,n,r,li(),i);return Bv(e,o,Wi())}async _openRedirect(e,n,r,i){await this._originValidation(e);const o=await Ga(e,n,r,li(),i);return J0(o),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:o}=this.eventManagers[n];return i?Promise.resolve(i):(Nt(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Lv(e),r=new wv(e);return n.register("authEvent",i=>(H(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ws,{type:Ws},i=>{var c;const o=(c=i==null?void 0:i[0])==null?void 0:c[Ws];o!==void 0&&n(!!o),Ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Tv(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Al()||Sl()||zi()}}const Kv=qv;var Wa="@firebase/auth",Ha="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jv(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Yv(t){Lt(new St("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:h}=r.options;H(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:c,authDomain:h,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:El(t)},d=new x0(r,i,o,u);return L0(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Lt(new St("auth-internal",e=>{const n=$i(e.getProvider("auth").getImmediate());return(r=>new Xv(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ot(Wa,Ha,Jv(t)),ot(Wa,Ha,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qv=300,Zv=Fc("authIdTokenMaxAge")||Qv;let qa=null;const ey=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Zv)return;const i=n==null?void 0:n.token;qa!==i&&(qa=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ty(t=ds()){const e=Gn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=O0(t,{popupRedirectResolver:Kv,persistence:[iv,q0,Ll]}),r=Fc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const c=ey(o.toString());G0(n,c,()=>c(n.currentUser)),$0(n,h=>c(h))}}const i=Dc("auth");return i&&F0(n,`http://${i}`),n}function ny(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}R0({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const o=yt("internal-error");o.customData=i,n(o)},r.type="text/javascript",r.charset="UTF-8",ny().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Yv("Browser");let mn;function ry(t,e,n){if(!(!t||!e))return typeof document>"u"?!1:(mn||(mn=jc(t),e0(mn),ty(mn),Sg(mn,{provider:new Mi(e.apiKey)})),!0)}const qr=rn(tn(t=>({lastRecordedData:[],lastGhostId:null,setLastRecordedData:e=>t({lastRecordedData:e}),setLastGhostId:e=>t({lastGhostId:e}),clearLastRecordedData:()=>t({lastRecordedData:[]}),replayingGhostRaceTime:null,setReplayingGhostRaceTime:e=>t({replayingGhostRaceTime:e})})));function sy(){const t=K(P=>P.raceStartTime),e=K(P=>P.raceEndTime),n=K(P=>P.raceCount),{firebaseConfig:r,recaptchaConfig:i,gameContent:o}=di(),{enableGhostReplay:c}=o;ry(r,i);async function h(P){if(!mn)throw new Error("Firebase app not initialized. Cannot get Functions instance.");const k=Op(mn),A=Fp(k,"uploadGhostReplay");try{const E=await A({replayData:P});if(!E.data||!E.data.ghostId||!E.data.publicUrl)throw new Error("Callable function did not return expected data (ghostId, publicUrl).");return E.data}catch(E){throw E instanceof Error?E:new Error("An unknown error occurred while saving the ghost replay via callable function.")}}const u=S.useRef({frames:[]}),d=S.useRef(0);S.useEffect(()=>{u.current.frames=[],d.current=0},[n]);const y=S.useCallback(async()=>{if(!c)return;const P=u.current.frames;if(!(P.length===0||P[P.length-1][0]>Js))try{const k=await h(P);k&&k.ghostId&&qr.getState().setLastGhostId(k.ghostId)}catch{}},[c]);return S.useEffect(()=>{if(e&&t){if(u.current.frames.length>0){const P=e-t;u.current.frames[u.current.frames.length-1][0]=P}qr.getState().setLastRecordedData(u.current.frames),qr.getState().setLastGhostId(null),y()}},[e,y,t]),re(()=>{if(t&&!e){const P=performance.now(),k=P-d.current,A=P-t;if(k>=mh&&A<Js){const{prevPosition:E,position:I,orientation:C}=Q.getState(),{progressToNextStep:F}=Kr.getState(),M=Ge.getState(),O=M.joystick.x,U=M.triggers.left>0,L=E.clone().lerp(I,F),N=C.w>0?1:-1;u.current.frames.push([Number(A.toFixed(3)),Number(L.x.toFixed(3)),Number(L.y.toFixed(3)),Number(L.z.toFixed(3)),Number(C.x.toFixed(3))*N,Number(C.y.toFixed(3))*N,Number(C.z.toFixed(3))*N,Number(O.toFixed(2)),U?1:0]),d.current=P}}},_r.otherCar),_.jsx(_.Fragment,{})}function iy({ghostData:t}){const e=S.useRef(null),n=K(i=>i.raceStartTime),r=S.useRef(0);return S.useEffect(()=>{r.current=0},[n]),re((i,o)=>{const c=t;if(!n||!e.current||c.length<=2)return;const u=performance.now()-n;let d=r.current;for(;d<c.length-1&&c[d+1][0]<=u;)d++;r.current=d,d>=c.length-1&&(d=c.length-2);const y=c[d],P=c[d+1],[k,A,E,I,C,F,M,O,U]=y,[L,N,v,g,f,b,p,T,,]=P,w=L-k,V=Sr((u-k)/w,0,1),q=new R(A,E,I),B=new R(N,v,g),G=Math.sqrt(Math.max(0,1-(C*C+F*F+M*M))),J=Math.sqrt(Math.max(0,1-(f*f+b*b+p*p))),ee=new le(C,F,M,G),he=new le(f,b,p,J),ie=q.clone().lerp(B,V),de=ee.clone().slerp(he,V),Ce=Fn(O,T,V),ue=U>0,te=new R;te.copy(B).sub(q).divideScalar(L-k).multiplyScalar(1e3);const Y=new R(0,0,1).applyQuaternion(de),W=new R(-1,0,0).applyQuaternion(de),X=te.dot(Y),Te=te.dot(W),Ie=te.length(),be=c[Math.max(0,d-1)],Ae=new R(be[1],be[2],be[3]),Me=k-be[0],Se=new R;Me>0&&Se.copy(q).sub(Ae).divideScalar(Me).multiplyScalar(1e3);const Ne=X-Se.dot(Y);e.current.updateVisuals(o,ie,de,X,Te*.8,Ce,Ne*.6,ue,Ie/(rc/3.6),0)}),_.jsx(_.Fragment,{children:_.jsx("group",{visible:!!n,children:_.jsx(gi,{ref:e,ghostCar:!0})})})}const oy=t=>!Array.isArray(t)||t.length===0||t.length>6e3?!1:t.every(e=>{if(!Array.isArray(e)||e.length!==9||!e.every(P=>typeof P=="number"))return!1;const[n,r,i,o,c,h,u,d,y]=e;return!(n<0||n>Js+5e3||!isFinite(r)||!isFinite(i)||!isFinite(o)||Math.abs(c)>1||Math.abs(h)>1||Math.abs(u)>1||d<-1||d>1||y!==0&&y!==1)}),ay="shopify-editions-winter-2025.firebasestorage.app",cy=`https://storage.googleapis.com/${ay}`,ly="ghostReplays",uy=async t=>{const e=`${ly}/${t}.json`,n=`${cy}/${e}?alt=media`,r=await fetch(n);if(!r.ok){let o=r.statusText||"Unknown error fetching from GCS.";try{const c=await r.json();c&&c.error&&typeof c.error.message=="string"?o=c.error.message:c&&typeof c.message=="string"&&(o=c.message)}catch{}throw new Error(`Failed to fetch ghost data from GCS. Status: ${r.status}. Detail: ${o}`)}const i=await r.json();if(!oy(i))throw new Error("Invalid ghost replay data format received from GCS.");return i};function hy(){const[t,e]=S.useState(null),[n,r]=S.useState(null),[i,o]=S.useState(null),{gameContent:c}=di(),{enableGhostReplay:h}=c;return S.useEffect(()=>{if(h&&typeof window<"u"){const d=new URLSearchParams(window.location.search).get("ghostId");o(d)}},[h]),S.useEffect(()=>{if(!i){e(null),r(null);return}(async()=>{r(null),e(null);try{const d=await uy(i);e(d)}catch(d){r(d.message||"Failed to load ghost replay data from GCS"),e(null)}})()},[i]),S.useEffect(()=>{var u;if(t){const d=((u=t[t.length-1])==null?void 0:u[0])??null;qr.getState().setReplayingGhostRaceTime(d)}},[t]),{ghostData:t,error:n,isLoading:!t&&!n&&!!i}}const hn=({listener:t,buffer:e,initialVolume:n=0,autoPlay:r=!0})=>{const i=S.useMemo(()=>{const A=new nc(t);return A.setBuffer(e),A.loop=!0,A.gain.gain.value=n,A},[t,e,n]),o=lr(A=>A.isAudioEnabled);S.useEffect(()=>{o?r&&i.play():i.stop()},[o,r,i]),S.useEffect(()=>()=>{i.stop(),i.disconnect()},[i]);const c=S.useCallback((A=1e3)=>{i.setVolume(n)},[i,n]),h=S.useCallback((A=1e3)=>{i.setVolume(0)},[i]),u=S.useCallback(()=>{i.stop(),i.play()},[i]),d=S.useCallback(()=>{i.play()},[i]),y=S.useCallback(()=>{i.stop()},[i]),P=S.useCallback(A=>{i.setVolume(A)},[i]),k=S.useCallback(A=>{i.source&&(i.source.playbackRate.value=A)},[i]);return{audioSource:i,play:d,stop:y,restart:u,fadeIn:c,fadeOut:h,setVolume:P,setPitch:k}};function dy(){const t=lr(B=>B.setIsAudioEnabled),e=lr(B=>B.isMuted),n=_i(),r=K(B=>B.raceCount),i=K(B=>B.raceEndTime),o=K(B=>B.gameScreen),c=S.useCallback(()=>{n&&t(!0),document.removeEventListener("click",c),document.removeEventListener("touchstart",c),document.removeEventListener("keydown",c)},[t,n]);S.useEffect(()=>(document.addEventListener("click",c),document.addEventListener("touchstart",c),document.addEventListener("keydown",c),()=>{document.removeEventListener("click",c),document.removeEventListener("touchstart",c),document.removeEventListener("keydown",c)}),[c]);const h=Yt(B=>B.camera),u=S.useMemo(()=>new Du,[]);S.useEffect(()=>(h.add(u),()=>{h.remove(u)}),[h,u]);const d=fi(Ou,Object.values(dt).map(B=>B.url)),y=S.useMemo(()=>{const B={};return Object.keys(dt).forEach((G,J)=>{B[G]=d[J]}),B},[d]),P=S.useMemo(()=>Array.from({length:10},()=>new nc(u)),[u]),k=S.useRef([]),A=B=>{k.current.push(B)},E=lr(B=>B.setAddSoundToQueue);S.useEffect(()=>{E(A)},[E]);const{setVolume:I}=hn({listener:u,buffer:y[we.Collision]}),{setVolume:C}=hn({listener:u,buffer:y[we.Drift]}),{setVolume:F}=hn({listener:u,buffer:y[we.Sparkle]}),{setVolume:M}=hn({listener:u,buffer:y[we.Underwater]}),{setVolume:O}=hn({listener:u,buffer:y[we.Cheer]}),{setVolume:U,setPitch:L}=hn({listener:u,buffer:y[we.CarEngine]}),{restart:N,fadeOut:v,fadeIn:g}=hn({listener:u,buffer:y[we.Music],initialVolume:dt[we.Music].volume,autoPlay:!1}),f=S.useRef(new Set);S.useEffect(()=>{const B=K.subscribe(G=>G.raceStartTime,G=>{G!==null&&f.current.clear()});return()=>{B()}},[]);const b=S.useCallback(()=>{function B(){return P.find(G=>!G.isPlaying)}for(;k.current.length;){const G=B();if(G){const J=k.current.shift();if(J!==void 0){const ee=dt[J];G.setBuffer(y[J]),G.setVolume(ee.volume||1),G.setPlaybackRate(ee.playbackRate||1),ee.maxPitchVariation&&(G.detune=ee.maxPitchVariation*Math.random()),G.play()}}else break}},[y,P]),p=S.useCallback(()=>{const{normalizedProgress:B}=Q.getState();ph.forEach(G=>{f.current.has(G)||B>=G.position&&(B<G.position+.05&&A(G.sound),f.current.add(G))})},[]);S.useEffect(()=>{i&&A(we.ChaChing)},[i]),S.useEffect(()=>{o===Qe.RacingScreen?(A(we.EngineStart),N(),g()):o===Qe.SplashScreen&&v()},[o,N,r,g,v]),S.useEffect(()=>{u.setMasterVolume(e?0:1)},[e,u]);const T=S.useRef(0),w=S.useRef(0),V=S.useRef(0),q=S.useRef(0);return re((B,G)=>{var pe,Ke,Xe;p(),b();const{collisionState:J,isDrifting:ee,speed:he,normalizedProgress:ie,isInJump:de,isBraking:Ce}=Q.getState(),ue=Ge.getState(),te=o===Qe.RacingScreen?1:0,Y=cs(0,rc,he),W=(J===rt.collidingOnTheRight||J===rt.collidingOnTheLeft)&&!de;let X=0;W&&Y>.05&&(Y<.1?X=0:Y<.5?X=.5:X=1);const Te=gt(T.current,X*(((pe=dt[we.Collision])==null?void 0:pe.volume)??1)*te,15,G);T.current=Te,I(T.current);const Ie=ee||Ce&&he>10?1:0,be=gt(w.current,de?0:Ie*(((Ke=dt[we.Drift])==null?void 0:Ke.volume)??1)*te,gh,G);w.current=be,C(w.current);let Ae=he;he===0&&ue.triggers.right>0&&(Ae=150*Ge.getState().triggers.right);let Me=Lu(Ae,0,250,1,.7);he===0&&ue.triggers.right>0&&(Me=1.2);let Se=.3+Math.pow(Ae/250,2)*.6;ee&&(Se-=.05),Se=Sr(Se,.3,1);const Ne=gt(V.current,Me*(((Xe=dt[we.CarEngine])==null?void 0:Xe.volume)??1)*te,Bo,G);V.current=Ne,U(Ne);const Ze=gt(q.current,Se,Bo,G);q.current=Ze,L(Ze);const De=Math.max(0,1-Math.abs(ie-.828)/.02);F(De*(dt[we.Sparkle].volume??1));const ye=Math.min(1,Math.max(0,(ie-.26)/.02)*Math.max(0,(.5-ie)/.02));M(ye*(dt[we.Underwater].volume??1));const se=Math.max(0,1-Math.abs(ie-.96)/.04);O(se*(dt[we.Cheer].volume??1))},_r.audio),null}function fy(){const[t,e]=S.useState(!1);S.useEffect(()=>{const i=new URLSearchParams(window.location.search);e(i.has("debug"))},[]);const n=S.lazy(()=>pi(()=>import("./index-BB7DeWDn.js"),__vite__mapDeps([9,1,2,3,10])).then(i=>({default:i.Perf}))),{ghostData:r}=hy();return S.useEffect(()=>{Xr.getState().setActive(!!r)},[r]),_.jsxs("div",{className:"w-full h-dvh overflow-hidden","data-section-name":"game",children:[_.jsx(Fu,{className:"size-full",dpr:[1,2],camera:{position:[0,1.5,-2],near:.1,far:5e3},gl:{powerPreference:"high-performance",antialias:!0},onContextMenu:i=>i.preventDefault(),children:_.jsxs(S.Suspense,{fallback:null,children:[t&&_.jsx(n,{position:"bottom-left"}),_.jsx(Of,{}),_.jsx(gf,{}),_.jsx(vf,{}),_.jsx(pf,{}),_.jsx(dy,{}),_.jsx(Sh,{}),_.jsx(Ph,{}),r&&_.jsx(iy,{ghostData:r}),_.jsx(Th,{}),_.jsx(Ih,{}),_.jsx(xh,{}),_.jsx(jh,{}),_.jsx(qh,{}),_.jsx(Yh,{}),_.jsx(ed,{}),_.jsx(sh,{}),_.jsx(Sf,{}),_.jsx(sy,{})]})}),_.jsx(Mf,{})]})}const my="/cdn.shopify.com/oxygen-v2/40436/33939/71168/4075870/assets/style-C_9vDQsB.css";function py({globalStrings:t,localeDetails:e,locale:n,canonicalUrl:r,searchResultEditionKeys:i}){const o=us(Qe.SplashScreen);return _.jsx("div",{"data-nosnippet":!0,className:ve("fixed top-0 left-0 w-full z-9999 [&>a]:no-underline transition-[opacity,visibility] duration-300","print:hidden",o?"opacity-100 visible":"opacity-0 invisible"),children:_.jsx(ju,{className:"limited-nav",backgroundClassName:"bg-nav-header",currentEdition:Vu.summer2025,localeSettings:{locale:e.localeSignUp,language:e.language,localeShopifyDotCom:n,canonicalUrl:r},itemDelay:40,itemClassName:"ease-out-cubic",navSettings:{isMenuOpen:!1,onMenuToggle:()=>{},titleClickCallback:()=>{}},searchQuery:"",localSearchPath:"/editions/summer2025",theme:"dark",translations:t,skipLinkHref:"",hasAllEditionsDropdown:!1,searchResultEditionKeys:i})})}function gy(){const{progress:t,total:e,loaded:n}=Bu(),r=pn(o=>o.setProgress),i=_f();return S.useEffect(()=>{if(!i){if(t===100||e>0&&n===e){r(100);return}r(t)}},[t,r,n,e,i]),null}const vy=1200,Ka=500,Xa=500,Hs=25;function yy(){const t=pn(P=>P.startLoading),[e,n]=S.useState(!0),[r,i]=S.useState(!1),o=pn(P=>P.progress),[c,h]=S.useState(!1),u=S.useRef(null),d=S.useRef(!1),y=S.useRef(null);return S.useEffect(()=>{t()},[t]),S.useEffect(()=>{setTimeout(()=>{h(!0)},Ka)},[]),S.useEffect(()=>{var P;if(c){if(!d.current){d.current=!0,y.current=setTimeout(()=>{var k;(k=u.current)==null||k.style.setProperty("--loading-bar-width",`${Math.max(o,Hs)}%`)},100);return}y.current&&clearTimeout(y.current),(P=u.current)==null||P.style.setProperty("--loading-bar-width",`${Math.max(o,Hs)}%`)}},[o,c]),S.useEffect(()=>{if(o>=100){setTimeout(()=>{n(!1),pn.getState().setLoadingScreenFadeComplete(!0)},vy);return}return()=>{pn.getState().setLoadingScreenFadeComplete(!1)}},[o]),S.useEffect(()=>{e||setTimeout(()=>{i(!0)},Xa)},[e]),!e&&r?null:_.jsxs(_.Fragment,{children:[_.jsx(gy,{}),_.jsx("div",{className:ve("fixed inset-0 z-[99999] flex items-center justify-center bg-dark transition-[opacity,visibility]",e?"opacity-100":"opacity-0 pointer-events-none"),style:{transitionDuration:`${Xa}ms`},children:_.jsxs("div",{ref:u,className:"relative w-150 h-4",style:{"--loading-bar-width":`${Hs}%`,"--initial-animation-duration":`${Ka}ms`},children:[_.jsx("div",{className:"absolute top-0 left-0 bg-white/25 size-full rounded-full"}),_.jsx("div",{className:ve("absolute top-0 left-0 bg-white h-full rounded-full","transition-[width,opacity] duration-1000 origin-left",c?"w-[var(--loading-bar-width)]":"animate-initial-loader-line")}),_.jsx("div",{className:ve("absolute top-0 left-0 bg-transparent h-full rounded-full mix-blend-lighten","bg-[var(--glow-color)] box-shadow-[0_0_var(--glow-spread)_var(--glow-color)]","transition-[width,opacity] origin-left duration-1000",c?"w-[var(--loading-bar-width)]":"animate-initial-loader-line"),style:{"--glow-color":"#B36AF7","--glow-opacity":"0.8","--glow-blur":"16px","--glow-spread":"12px"},children:_.jsx("div",{className:ve("absolute inset-[calc(-1*var(--glow-spread))] bg-[var(--glow-color)]"," rounded-inherit pointer-events-none blur-[var(--glow-blur)]","opacity-[var(--glow-opacity)] [transform:translateZ(0)]")})})]})})]})}const Ty=(...t)=>[{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"},...$u(...t)??[]],Iy=()=>[{rel:"stylesheet",href:my},{rel:"preload",href:oc,as:"fetch",crossOrigin:"anonymous"},{rel:"preload",href:Si,as:"fetch",crossOrigin:"anonymous"},{rel:"preload",href:wi,as:"fetch",crossOrigin:"anonymous"},{rel:"preload",href:yi,as:"fetch",crossOrigin:"anonymous"}];function Ay(){const{locale:t,globalStrings:e,searchResultEditionKeys:n}=di(),r=mu("root"),i=(r==null?void 0:r.canonicalUrl.toString())||"",o=Nu(t);return S.useEffect(()=>{if(window.matchMedia("(max-width: 767px)").matches)return;function h(d){let y=[];const P="ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";return k=>{y.push(k.key),y.toString().indexOf(P)>=0&&(d(),y=[])}}const u=h(()=>{K.getState().setRainbowMode(!0),lr.getState().addSoundToQueue(we.KonamiCode),window.removeEventListener("keydown",u)});return window.addEventListener("keydown",u),()=>{window.removeEventListener("keydown",u)}}),_.jsxs(_.Fragment,{children:[_.jsx(yy,{}),_.jsx(py,{globalStrings:e,localeDetails:o,canonicalUrl:i,locale:t,searchResultEditionKeys:n}),_.jsx(Uu,{}),_.jsx("div",{className:"w-screen h-dvh select-none",children:_.jsx(fy,{})}),_.jsx(zu,{drive:!0})]})}export{Re as B,Qe as G,bf as L,K as a,lr as b,qr as c,Q as d,Ge as e,us as f,wh as g,Ay as h,Iy as l,Ty as m,_h as u};
//# sourceMappingURL=(_locale).editions.summer2025_.drive-CXqQNE_v.js.map
