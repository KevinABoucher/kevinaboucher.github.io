"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{6022:(M,m,d)=>{d.d(m,{c:()=>r});var l=d(9816),g=d(7864),i=d(1898);const r=(o,n)=>{let e,t;const a=(h,f,p)=>{if(typeof document>"u")return;const E=document.elementFromPoint(h,f);E&&n(E)?E!==e&&(v(),c(E,p)):v()},c=(h,f)=>{e=h,t||(t=e);const p=e;(0,l.w)(()=>p.classList.add("ion-activated")),f()},v=(h=!1)=>{if(!e)return;const f=e;(0,l.w)(()=>f.classList.remove("ion-activated")),h&&t!==e&&e.click(),e=void 0};return(0,i.createGesture)({el:o,gestureName:"buttonActiveDrag",threshold:0,onStart:h=>a(h.currentX,h.currentY,g.a),onMove:h=>a(h.currentX,h.currentY,g.b),onEnd:()=>{v(!0),(0,g.h)(),t=void 0}})}},2225:(M,m,d)=>{d.d(m,{g:()=>l});const l=(n,e,t,a,c)=>i(n[1],e[1],t[1],a[1],c).map(v=>g(n[0],e[0],t[0],a[0],v)),g=(n,e,t,a,c)=>c*(3*e*Math.pow(c-1,2)+c*(-3*t*c+3*t+a*c))-n*Math.pow(c-1,3),i=(n,e,t,a,c)=>o((a-=c)-3*(t-=c)+3*(e-=c)-(n-=c),3*t-6*e+3*n,3*e-3*n,n).filter(h=>h>=0&&h<=1),o=(n,e,t,a)=>{if(0===n)return((n,e,t)=>{const a=e*e-4*n*t;return a<0?[]:[(-e+Math.sqrt(a))/(2*n),(-e-Math.sqrt(a))/(2*n)]})(e,t,a);const c=(3*(t/=n)-(e/=n)*e)/3,v=(2*e*e*e-9*e*t+27*(a/=n))/27;if(0===c)return[Math.pow(-v,1/3)];if(0===v)return[Math.sqrt(-c),-Math.sqrt(-c)];const h=Math.pow(v/2,2)+Math.pow(c/3,3);if(0===h)return[Math.pow(v/2,.5)-e/3];if(h>0)return[Math.pow(-v/2+Math.sqrt(h),1/3)-Math.pow(v/2+Math.sqrt(h),1/3)-e/3];const f=Math.sqrt(Math.pow(-c/3,3)),p=Math.acos(-v/(2*Math.sqrt(Math.pow(-c/3,3)))),E=2*Math.pow(f,1/3);return[E*Math.cos(p/3)-e/3,E*Math.cos((p+2*Math.PI)/3)-e/3,E*Math.cos((p+4*Math.PI)/3)-e/3]}},5062:(M,m,d)=>{d.d(m,{i:()=>l});const l=g=>g&&""!==g.dir?"rtl"===g.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},6602:(M,m,d)=>{d.r(m),d.d(m,{startFocusVisible:()=>r});const l="ion-focused",i=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],r=o=>{let n=[],e=!0;const t=o?o.shadowRoot:document,a=o||document.body,c=y=>{n.forEach(u=>u.classList.remove(l)),y.forEach(u=>u.classList.add(l)),n=y},v=()=>{e=!1,c([])},h=y=>{e=i.includes(y.key),e||c([])},f=y=>{if(e&&void 0!==y.composedPath){const u=y.composedPath().filter(w=>!!w.classList&&w.classList.contains("ion-focusable"));c(u)}},p=()=>{t.activeElement===a&&c([])};return t.addEventListener("keydown",h),t.addEventListener("focusin",f),t.addEventListener("focusout",p),t.addEventListener("touchstart",v),t.addEventListener("mousedown",v),{destroy:()=>{t.removeEventListener("keydown",h),t.removeEventListener("focusin",f),t.removeEventListener("focusout",p),t.removeEventListener("touchstart",v),t.removeEventListener("mousedown",v)},setFocus:c}}},2509:(M,m,d)=>{d.d(m,{c:()=>l});const l=o=>{const n=o;let e;return{hasLegacyControl:()=>{if(void 0===e){const a=void 0!==n.label||g(n),c=n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")&&null===n.shadowRoot;e=!0===n.legacy||!a&&!c}return e}}},g=o=>null!==o.shadowRoot&&!!(i.includes(o.tagName)&&null!==o.querySelector('[slot="label"]')||r.includes(o.tagName)&&""!==o.textContent),i=["ION-RANGE"],r=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},7864:(M,m,d)=>{d.d(m,{a:()=>r,b:()=>o,c:()=>i,d:()=>e,h:()=>n});const l={getEngine(){var t;const a=window;return a.TapticEngine||(null===(t=a.Capacitor)||void 0===t?void 0:t.isPluginAvailable("Haptics"))&&a.Capacitor.Plugins.Haptics},available(){var t;const a=window;return!!this.getEngine()&&("web"!==(null===(t=a.Capacitor)||void 0===t?void 0:t.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(t){const a=this.getEngine();if(!a)return;const c=this.isCapacitor()?t.style.toUpperCase():t.style;a.impact({style:c})},notification(t){const a=this.getEngine();if(!a)return;const c=this.isCapacitor()?t.style.toUpperCase():t.style;a.notification({style:c})},selection(){this.impact({style:"light"})},selectionStart(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},g=()=>l.available(),i=()=>{g()&&l.selection()},r=()=>{g()&&l.selectionStart()},o=()=>{g()&&l.selectionChanged()},n=()=>{g()&&l.selectionEnd()},e=t=>{g()&&l.impact(t)}},7366:(M,m,d)=>{d.d(m,{a:()=>l,b:()=>f,c:()=>e,d:()=>p,e:()=>k,f:()=>n,g:()=>E,h:()=>i,i:()=>g,j:()=>_,k:()=>C,l:()=>t,m:()=>v,n:()=>y,o:()=>c,p:()=>o,q:()=>r,r:()=>s,s:()=>S,t:()=>h,u:()=>u,v:()=>w,w:()=>a});const l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",S="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",k="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},8986:(M,m,d)=>{d.d(m,{I:()=>n,a:()=>c,b:()=>o,c:()=>f,d:()=>E,f:()=>v,g:()=>a,i:()=>t,p:()=>p,r:()=>y,s:()=>h});var l=d(5861),g=d(9397),i=d(1178);const o="ion-content",n=".ion-content-scroll-host",e=`${o}, ${n}`,t=u=>"ION-CONTENT"===u.tagName,a=function(){var u=(0,l.Z)(function*(w){return t(w)?(yield new Promise(s=>(0,g.c)(w,s)),w.getScrollElement()):w});return function(s){return u.apply(this,arguments)}}(),c=u=>u.querySelector(n)||u.querySelector(e),v=u=>u.closest(e),h=(u,w)=>t(u)?u.scrollToTop(w):Promise.resolve(u.scrollTo({top:0,left:0,behavior:w>0?"smooth":"auto"})),f=(u,w,s,_)=>t(u)?u.scrollByPoint(w,s,_):Promise.resolve(u.scrollBy({top:s,left:w,behavior:_>0?"smooth":"auto"})),p=u=>(0,i.b)(u,o),E=u=>{if(t(u)){const s=u.scrollY;return u.scrollY=!1,s}return u.style.setProperty("overflow","hidden"),!0},y=(u,w)=>{t(u)?u.scrollY=w:u.style.removeProperty("overflow")}},9240:(M,m,d)=>{d.d(m,{g:()=>g});var l=d(1178);const g=(r,o,n)=>{const e=null==r?0:r.toString().length,t=i(e,o);if(void 0===n)return t;try{return n(e,o)}catch(a){return(0,l.a)("Exception in provided `counterFormatter`.",a),t}},i=(r,o)=>`${r} / ${o}`},5234:(M,m,d)=>{d.r(m),d.d(m,{KEYBOARD_DID_CLOSE:()=>g,KEYBOARD_DID_OPEN:()=>l,copyVisualViewport:()=>w,keyboardDidClose:()=>p,keyboardDidOpen:()=>h,keyboardDidResize:()=>f,resetKeyboardAssist:()=>e,setKeyboardClose:()=>v,setKeyboardOpen:()=>c,startKeyboardAssist:()=>t,trackViewportChanges:()=>u});const l="ionKeyboardDidShow",g="ionKeyboardDidHide";let r={},o={},n=!1;const e=()=>{r={},o={},n=!1},t=s=>{a(s),s.visualViewport&&(o=w(s.visualViewport),s.visualViewport.onresize=()=>{u(s),h()||f(s)?c(s):p(s)&&v(s)})},a=s=>{s.addEventListener("keyboardDidShow",_=>c(s,_)),s.addEventListener("keyboardDidHide",()=>v(s))},c=(s,_)=>{E(s,_),n=!0},v=s=>{y(s),n=!1},h=()=>!n&&r.width===o.width&&(r.height-o.height)*o.scale>150,f=s=>n&&!p(s),p=s=>n&&o.height===s.innerHeight,E=(s,_)=>{const S=new CustomEvent(l,{detail:{keyboardHeight:_?_.keyboardHeight:s.innerHeight-o.height}});s.dispatchEvent(S)},y=s=>{const _=new CustomEvent(g);s.dispatchEvent(_)},u=s=>{r=Object.assign({},o),o=w(s.visualViewport)},w=s=>({width:Math.round(s.width),height:Math.round(s.height),offsetTop:s.offsetTop,offsetLeft:s.offsetLeft,pageTop:s.pageTop,pageLeft:s.pageLeft,scale:s.scale})},9852:(M,m,d)=>{d.d(m,{c:()=>g});var l=d(3457);const g=i=>{let r,o,n;const e=()=>{r=()=>{n=!0,i&&i(!0)},o=()=>{n=!1,i&&i(!1)},null==l.w||l.w.addEventListener("keyboardWillShow",r),null==l.w||l.w.addEventListener("keyboardWillHide",o)};return e(),{init:e,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",r),null==l.w||l.w.removeEventListener("keyboardWillHide",o),r=o=void 0},isKeyboardVisible:()=>n}}},7741:(M,m,d)=>{d.d(m,{S:()=>g});const g={bubbles:{dur:1e3,circles:9,fn:(i,r,o)=>{const n=i*r/o-i+"ms",e=2*Math.PI*r/o;return{r:5,style:{top:9*Math.sin(e)+"px",left:9*Math.cos(e)+"px","animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:(i,r,o)=>{const n=r/o,e=i*n-i+"ms",t=2*Math.PI*n;return{r:5,style:{top:9*Math.sin(t)+"px",left:9*Math.cos(t)+"px","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(i,r)=>({r:6,style:{left:9-9*r+"px","animation-delay":-110*r+"ms"}})},lines:{dur:1e3,lines:8,fn:(i,r,o)=>({y1:14,y2:26,style:{transform:`rotate(${360/o*r+(r<o/2?180:-180)}deg)`,"animation-delay":i*r/o-i+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(i,r,o)=>({y1:12,y2:20,style:{transform:`rotate(${360/o*r+(r<o/2?180:-180)}deg)`,"animation-delay":i*r/o-i+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(i,r,o)=>({y1:17,y2:29,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":i*r/o-i+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(i,r,o)=>({y1:12,y2:20,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":i*r/o-i+"ms"}})}}},7135:(M,m,d)=>{d.r(m),d.d(m,{createSwipeBackGesture:()=>o});var l=d(9397),g=d(5062),i=d(1898);d(4349);const o=(n,e,t,a,c)=>{const v=n.ownerDocument.defaultView;let h=(0,g.i)(n);const p=s=>h?-s.deltaX:s.deltaX;return(0,i.createGesture)({el:n,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:s=>(h=(0,g.i)(n),(s=>{const{startX:C}=s;return h?C>=v.innerWidth-50:C<=50})(s)&&e()),onStart:t,onMove:s=>{const C=p(s)/v.innerWidth;a(C)},onEnd:s=>{const _=p(s),C=v.innerWidth,S=_/C,k=(s=>h?-s.velocityX:s.velocityX)(s),O=k>=0&&(k>.2||_>C/2),L=(O?1-S:S)*C;let x=0;if(L>5){const b=L/Math.abs(k);x=Math.min(b,540)}c(O,S<=0?.01:(0,l.l)(0,S,.9999),x)}})}},452:(M,m,d)=>{d.d(m,{g:()=>g});var l=d(8256);let g=(()=>{class i{constructor(){var o,n,e;this._muteSound=!1,this._snakeColor="green",this._levelColor="blue",this._snakeColor=null!==(o=localStorage.getItem("snakeColor"))&&void 0!==o?o:this._snakeColor,this._levelColor=null!==(n=localStorage.getItem("levelColor"))&&void 0!==n?n:this._levelColor,this._muteSound=null!==(e="true"===localStorage.getItem("muteSound"))&&void 0!==e?e:this._muteSound}get muteSound(){return this._muteSound}set muteSound(o){this._muteSound=o,localStorage.setItem("muteSound",this._muteSound+"")}get snakeColor(){return this._snakeColor}set snakeColor(o){this._snakeColor=o,localStorage.setItem("snakeColor",this._snakeColor)}get levelColor(){return this._levelColor}set levelColor(o){this._levelColor=o,localStorage.setItem("levelColor",this._levelColor)}}return i.\u0275fac=function(o){return new(o||i)},i.\u0275prov=l.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()}}]);