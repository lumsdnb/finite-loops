(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis,de=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),me=new WeakMap;let Ce=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(de&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=me.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&me.set(t,e))}return e}toString(){return this.cssText}};const Oe=r=>new Ce(typeof r=="string"?r:r+"",void 0,ce),U=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((n,s,i)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[i+1]),r[0]);return new Ce(t,r,ce)},ke=(r,e)=>{if(de)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const n=document.createElement("style"),s=J.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=t.cssText,r.appendChild(n)}},be=de?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Oe(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Be,defineProperty:De,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:Le,getOwnPropertySymbols:He,getPrototypeOf:Ge}=Object,ne=globalThis,ge=ne.trustedTypes,Fe=ge?ge.emptyScript:"",Ve=ne.reactiveElementPolyfillSupport,F=(r,e)=>r,Z={toAttribute(r,e){switch(e){case Boolean:r=r?Fe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},he=(r,e)=>!Be(r,e),Ee={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),ne.litPropertyMetadata??=new WeakMap;let P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(e,n,t);s!==void 0&&De(this.prototype,e,s)}}static getPropertyDescriptor(e,t,n){const{get:s,set:i}=Ue(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){const c=s?.call(this);i?.call(this,a),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ee}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;const e=Ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){const t=this.properties,n=[...Le(t),...He(t)];for(const s of n)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,s]of t)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const s=this._$Eu(t,n);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const s of n)t.unshift(be(s))}else e!==void 0&&t.push(be(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ke(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,n);if(s!==void 0&&n.reflect===!0){const i=(n.converter?.toAttribute!==void 0?n.converter:Z).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){const n=this.constructor,s=n._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const i=n.getPropertyOptions(s),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Z;this._$Em=s;const c=a.fromAttribute(t,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){const s=this.constructor,i=this[e];if(n??=s.getPropertyOptions(e),!((n.hasChanged??he)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:s,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),i!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,i]of n){const{wrapped:a}=i,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[F("elementProperties")]=new Map,P[F("finalized")]=new Map,Ve?.({ReactiveElement:P}),(ne.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ue=globalThis,ee=ue.trustedTypes,ye=ee?ee.createPolicy("lit-html",{createHTML:r=>r}):void 0,xe="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+S,ze=`<${Ie}>`,I=document,z=()=>I.createComment(""),j=r=>r===null||typeof r!="object"&&typeof r!="function",fe=Array.isArray,je=r=>fe(r)||typeof r?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,we=/>/g,C=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,Ne=/"/g,Te=/^(?:script|style|textarea|title)$/i,qe=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),E=qe(1),k=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Se=new WeakMap,x=I.createTreeWalker(I,129);function Re(r,e){if(!fe(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(e):e}const Ye=(r,e)=>{const t=r.length-1,n=[];let s,i=e===2?"<svg>":e===3?"<math>":"",a=G;for(let c=0;c<t;c++){const h=r[c];let p,b,u=-1,v=0;for(;v<h.length&&(a.lastIndex=v,b=a.exec(h),b!==null);)v=a.lastIndex,a===G?b[1]==="!--"?a=_e:b[1]!==void 0?a=we:b[2]!==void 0?(Te.test(b[2])&&(s=RegExp("</"+b[2],"g")),a=C):b[3]!==void 0&&(a=C):a===C?b[0]===">"?(a=s??G,u=-1):b[1]===void 0?u=-2:(u=a.lastIndex-b[2].length,p=b[1],a=b[3]===void 0?C:b[3]==='"'?Ne:ve):a===Ne||a===ve?a=C:a===_e||a===we?a=G:(a=C,s=void 0);const N=a===C&&r[c+1].startsWith("/>")?" ":"";i+=a===G?h+ze:u>=0?(n.push(p),h.slice(0,u)+xe+h.slice(u)+S+N):h+S+(u===-2?c:N)}return[Re(r,i+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class q{constructor({strings:e,_$litType$:t},n){let s;this.parts=[];let i=0,a=0;const c=e.length-1,h=this.parts,[p,b]=Ye(e,t);if(this.el=q.createElement(p,n),x.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=x.nextNode())!==null&&h.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(xe)){const v=b[a++],N=s.getAttribute(u).split(S),Q=/([.?@])?(.*)/.exec(v);h.push({type:1,index:i,name:Q[2],strings:N,ctor:Q[1]==="."?Ke:Q[1]==="?"?Xe:Q[1]==="@"?Qe:se}),s.removeAttribute(u)}else u.startsWith(S)&&(h.push({type:6,index:i}),s.removeAttribute(u));if(Te.test(s.tagName)){const u=s.textContent.split(S),v=u.length-1;if(v>0){s.textContent=ee?ee.emptyScript:"";for(let N=0;N<v;N++)s.append(u[N],z()),x.nextNode(),h.push({type:2,index:++i});s.append(u[v],z())}}}else if(s.nodeType===8)if(s.data===Ie)h.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(S,u+1))!==-1;)h.push({type:7,index:i}),u+=S.length-1}i++}}static createElement(e,t){const n=I.createElement("template");return n.innerHTML=e,n}}function B(r,e,t=r,n){if(e===k)return e;let s=n!==void 0?t._$Co?.[n]:t._$Cl;const i=j(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(r),s._$AT(r,t,n)),n!==void 0?(t._$Co??=[])[n]=s:t._$Cl=s),s!==void 0&&(e=B(r,s._$AS(r,e.values),s,n)),e}class We{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,s=(e?.creationScope??I).importNode(t,!0);x.currentNode=s;let i=x.nextNode(),a=0,c=0,h=n[0];for(;h!==void 0;){if(a===h.index){let p;h.type===2?p=new Y(i,i.nextSibling,this,e):h.type===1?p=new h.ctor(i,h.name,h.strings,this,e):h.type===6&&(p=new Je(i,this,e)),this._$AV.push(p),h=n[++c]}a!==h?.index&&(i=x.nextNode(),a++)}return x.currentNode=I,s}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),j(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=q.createElement(Re(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(t);else{const i=new We(s,this),a=i.u(this.options);i.p(t),this.T(a),this._$AH=i}}_$AC(e){let t=Se.get(e.strings);return t===void 0&&Se.set(e.strings,t=new q(e)),t}k(e){fe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,s=0;for(const i of e)s===t.length?t.push(n=new Y(this.O(z()),this.O(z()),this,this.options)):n=t[s],n._$AI(i),s++;s<t.length&&(this._$AR(n&&n._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class se{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,s,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=m}_$AI(e,t=this,n,s){const i=this.strings;let a=!1;if(i===void 0)e=B(this,e,t,0),a=!j(e)||e!==this._$AH&&e!==k,a&&(this._$AH=e);else{const c=e;let h,p;for(e=i[0],h=0;h<i.length-1;h++)p=B(this,c[n+h],t,h),p===k&&(p=this._$AH[h]),a||=!j(p)||p!==this._$AH[h],p===m?e=m:e!==m&&(e+=(p??"")+i[h+1]),this._$AH[h]=p}a&&!s&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ke extends se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Xe extends se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class Qe extends se{constructor(e,t,n,s,i){super(e,t,n,s,i),this.type=5}_$AI(e,t=this){if((e=B(this,e,t,0)??m)===k)return;const n=this._$AH,s=e===m&&n!==m||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==m&&(n===m||s);s&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const Ze=ue.litHtmlPolyfillSupport;Ze?.(q,Y),(ue.litHtmlVersions??=[]).push("3.3.1");const et=(r,e,t)=>{const n=t?.renderBefore??e;let s=n._$litPart$;if(s===void 0){const i=t?.renderBefore??null;n._$litPart$=s=new Y(e.insertBefore(z(),i),i,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=globalThis;let w=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};w._$litElement$=!0,w.finalized=!0,pe.litElementHydrateSupport?.({LitElement:w});const tt=pe.litElementPolyfillSupport;tt?.({LitElement:w});(pe.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:he},st=(r=nt,e,t)=>{const{kind:n,metadata:s}=t;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),n==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(t.name,r),n==="accessor"){const{name:a}=t;return{set(c){const h=e.get.call(this);e.set.call(this,c),this.requestUpdate(a,h,r)},init(c){return c!==void 0&&this.C(a,void 0,r,c),c}}}if(n==="setter"){const{name:a}=t;return function(c){const h=this[a];e.call(this,c),this.requestUpdate(a,h,r)}}throw Error("Unsupported decorator location: "+n)};function f(r){return(e,t)=>typeof t=="object"?st(r,e,t):((n,s,i)=>{const a=s.hasOwnProperty(i);return s.constructor.createProperty(i,n),a?Object.getOwnPropertyDescriptor(s,i):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function M(r){return f({...r,state:!0,attribute:!1})}class y{constructor(e=!1){this.eventMap={},this.eventsSuspended=e==!0}addListener(e,t,n={}){if(typeof e=="string"&&e.length<1||e instanceof String&&e.length<1||typeof e!="string"&&!(e instanceof String)&&e!==y.ANY_EVENT)throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");if(typeof t!="function")throw new TypeError("The callback must be a function.");const s=new Ae(e,this,t,n);return this.eventMap[e]||(this.eventMap[e]=[]),n.prepend?this.eventMap[e].unshift(s):this.eventMap[e].push(s),s}addOneTimeListener(e,t,n={}){n.remaining=1,this.addListener(e,t,n)}static get ANY_EVENT(){return Symbol.for("Any event")}hasListener(e,t){return e===void 0?this.eventMap[y.ANY_EVENT]&&this.eventMap[y.ANY_EVENT].length>0?!0:Object.entries(this.eventMap).some(([,n])=>n.length>0):this.eventMap[e]&&this.eventMap[e].length>0?t instanceof Ae?this.eventMap[e].filter(s=>s===t).length>0:typeof t=="function"?this.eventMap[e].filter(s=>s.callback===t).length>0:t==null:!1}get eventNames(){return Object.keys(this.eventMap)}getListeners(e){return this.eventMap[e]||[]}suspendEvent(e){this.getListeners(e).forEach(t=>{t.suspended=!0})}unsuspendEvent(e){this.getListeners(e).forEach(t=>{t.suspended=!1})}getListenerCount(e){return this.getListeners(e).length}emit(e,...t){if(typeof e!="string"&&!(e instanceof String))throw new TypeError("The 'event' parameter must be a string.");if(this.eventsSuspended)return;let n=[],s=this.eventMap[y.ANY_EVENT]||[];return this.eventMap[e]&&(s=s.concat(this.eventMap[e])),s.forEach(i=>{if(i.suspended)return;let a=[...t];Array.isArray(i.arguments)&&(a=a.concat(i.arguments)),i.remaining>0&&(n.push(i.callback.apply(i.context,a)),i.count++),--i.remaining<1&&i.remove()}),n}removeListener(e,t,n={}){if(e===void 0){this.eventMap={};return}else if(!this.eventMap[e])return;let s=this.eventMap[e].filter(i=>t&&i.callback!==t||n.remaining&&n.remaining!==i.remaining||n.context&&n.context!==i.context);s.length?this.eventMap[e]=s:delete this.eventMap[e]}async waitFor(e,t={}){return t.duration=parseInt(t.duration),(isNaN(t.duration)||t.duration<=0)&&(t.duration=1/0),new Promise((n,s)=>{let i,a=this.addListener(e,()=>{clearTimeout(i),n()},{remaining:1});t.duration!==1/0&&(i=setTimeout(()=>{a.remove(),s("The duration expired before the event was emitted.")},t.duration))})}get eventCount(){return Object.keys(this.eventMap).length}}class Ae{constructor(e,t,n,s={}){if(typeof e!="string"&&!(e instanceof String)&&e!==y.ANY_EVENT)throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");if(!t)throw new ReferenceError("The 'target' parameter is mandatory.");if(typeof n!="function")throw new TypeError("The 'callback' must be a function.");s.arguments!==void 0&&!Array.isArray(s.arguments)&&(s.arguments=[s.arguments]),s=Object.assign({context:t,remaining:1/0,arguments:void 0,duration:1/0},s),s.duration!==1/0&&setTimeout(()=>this.remove(),s.duration),this.arguments=s.arguments,this.callback=n,this.context=s.context,this.count=0,this.event=e,this.remaining=parseInt(s.remaining)>=1?parseInt(s.remaining):1/0,this.suspended=!1,this.target=t}remove(){this.target.removeListener(this.event,this.callback,{context:this.context,remaining:this.remaining})}}/**
 * The `Enumerations` class contains enumerations and arrays of elements used throughout the
 * library. All its properties are static and should be referenced using the class name. For
 * example: `Enumerations.CHANNEL_MESSAGES`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class o{static get MIDI_CHANNEL_MESSAGES(){return this.validation&&console.warn("The MIDI_CHANNEL_MESSAGES enum has been deprecated. Use the Enumerations.CHANNEL_MESSAGES enum instead."),o.CHANNEL_MESSAGES}static get CHANNEL_MESSAGES(){return{noteoff:8,noteon:9,keyaftertouch:10,controlchange:11,programchange:12,channelaftertouch:13,pitchbend:14}}static get CHANNEL_NUMBERS(){return[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}static get MIDI_CHANNEL_NUMBERS(){return this.validation&&console.warn("The MIDI_CHANNEL_NUMBERS array has been deprecated. Use the Enumerations.CHANNEL_NUMBERS array instead."),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}static get CHANNEL_MODE_MESSAGES(){return{allsoundoff:120,resetallcontrollers:121,localcontrol:122,allnotesoff:123,omnimodeoff:124,omnimodeon:125,monomodeon:126,polymodeon:127}}static get MIDI_CHANNEL_MODE_MESSAGES(){return this.validation&&console.warn("The MIDI_CHANNEL_MODE_MESSAGES enum has been deprecated. Use the Enumerations.CHANNEL_MODE_MESSAGES enum instead."),o.CHANNEL_MODE_MESSAGES}static get MIDI_CONTROL_CHANGE_MESSAGES(){return this.validation&&console.warn("The MIDI_CONTROL_CHANGE_MESSAGES enum has been deprecated. Use the Enumerations.CONTROL_CHANGE_MESSAGES array instead."),{bankselectcoarse:0,modulationwheelcoarse:1,breathcontrollercoarse:2,controller3:3,footcontrollercoarse:4,portamentotimecoarse:5,dataentrycoarse:6,volumecoarse:7,balancecoarse:8,controller9:9,pancoarse:10,expressioncoarse:11,effectcontrol1coarse:12,effectcontrol2coarse:13,controller14:14,controller15:15,generalpurposeslider1:16,generalpurposeslider2:17,generalpurposeslider3:18,generalpurposeslider4:19,controller20:20,controller21:21,controller22:22,controller23:23,controller24:24,controller25:25,controller26:26,controller27:27,controller28:28,controller29:29,controller30:30,controller31:31,bankselectfine:32,modulationwheelfine:33,breathcontrollerfine:34,controller35:35,footcontrollerfine:36,portamentotimefine:37,dataentryfine:38,volumefine:39,balancefine:40,controller41:41,panfine:42,expressionfine:43,effectcontrol1fine:44,effectcontrol2fine:45,controller46:46,controller47:47,controller48:48,controller49:49,controller50:50,controller51:51,controller52:52,controller53:53,controller54:54,controller55:55,controller56:56,controller57:57,controller58:58,controller59:59,controller60:60,controller61:61,controller62:62,controller63:63,holdpedal:64,portamento:65,sustenutopedal:66,softpedal:67,legatopedal:68,hold2pedal:69,soundvariation:70,resonance:71,soundreleasetime:72,soundattacktime:73,brightness:74,soundcontrol6:75,soundcontrol7:76,soundcontrol8:77,soundcontrol9:78,soundcontrol10:79,generalpurposebutton1:80,generalpurposebutton2:81,generalpurposebutton3:82,generalpurposebutton4:83,controller84:84,controller85:85,controller86:86,controller87:87,controller88:88,controller89:89,controller90:90,reverblevel:91,tremololevel:92,choruslevel:93,celestelevel:94,phaserlevel:95,databuttonincrement:96,databuttondecrement:97,nonregisteredparametercoarse:98,nonregisteredparameterfine:99,registeredparametercoarse:100,registeredparameterfine:101,controller102:102,controller103:103,controller104:104,controller105:105,controller106:106,controller107:107,controller108:108,controller109:109,controller110:110,controller111:111,controller112:112,controller113:113,controller114:114,controller115:115,controller116:116,controller117:117,controller118:118,controller119:119,allsoundoff:120,resetallcontrollers:121,localcontrol:122,allnotesoff:123,omnimodeoff:124,omnimodeon:125,monomodeon:126,polymodeon:127}}static get CONTROL_CHANGE_MESSAGES(){return[{number:0,name:"bankselectcoarse",description:"Bank Select (Coarse)",position:"msb"},{number:1,name:"modulationwheelcoarse",description:"Modulation Wheel (Coarse)",position:"msb"},{number:2,name:"breathcontrollercoarse",description:"Breath Controller (Coarse)",position:"msb"},{number:3,name:"controller3",description:"Undefined",position:"msb"},{number:4,name:"footcontrollercoarse",description:"Foot Controller (Coarse)",position:"msb"},{number:5,name:"portamentotimecoarse",description:"Portamento Time (Coarse)",position:"msb"},{number:6,name:"dataentrycoarse",description:"Data Entry (Coarse)",position:"msb"},{number:7,name:"volumecoarse",description:"Channel Volume (Coarse)",position:"msb"},{number:8,name:"balancecoarse",description:"Balance (Coarse)",position:"msb"},{number:9,name:"controller9",description:"Controller 9 (Coarse)",position:"msb"},{number:10,name:"pancoarse",description:"Pan (Coarse)",position:"msb"},{number:11,name:"expressioncoarse",description:"Expression Controller (Coarse)",position:"msb"},{number:12,name:"effectcontrol1coarse",description:"Effect Control 1 (Coarse)",position:"msb"},{number:13,name:"effectcontrol2coarse",description:"Effect Control 2 (Coarse)",position:"msb"},{number:14,name:"controller14",description:"Undefined",position:"msb"},{number:15,name:"controller15",description:"Undefined",position:"msb"},{number:16,name:"generalpurposecontroller1",description:"General Purpose Controller 1 (Coarse)",position:"msb"},{number:17,name:"generalpurposecontroller2",description:"General Purpose Controller 2 (Coarse)",position:"msb"},{number:18,name:"generalpurposecontroller3",description:"General Purpose Controller 3 (Coarse)",position:"msb"},{number:19,name:"generalpurposecontroller4",description:"General Purpose Controller 4 (Coarse)",position:"msb"},{number:20,name:"controller20",description:"Undefined",position:"msb"},{number:21,name:"controller21",description:"Undefined",position:"msb"},{number:22,name:"controller22",description:"Undefined",position:"msb"},{number:23,name:"controller23",description:"Undefined",position:"msb"},{number:24,name:"controller24",description:"Undefined",position:"msb"},{number:25,name:"controller25",description:"Undefined",position:"msb"},{number:26,name:"controller26",description:"Undefined",position:"msb"},{number:27,name:"controller27",description:"Undefined",position:"msb"},{number:28,name:"controller28",description:"Undefined",position:"msb"},{number:29,name:"controller29",description:"Undefined",position:"msb"},{number:30,name:"controller30",description:"Undefined",position:"msb"},{number:31,name:"controller31",description:"Undefined",position:"msb"},{number:32,name:"bankselectfine",description:"Bank Select (Fine)",position:"lsb"},{number:33,name:"modulationwheelfine",description:"Modulation Wheel (Fine)",position:"lsb"},{number:34,name:"breathcontrollerfine",description:"Breath Controller (Fine)",position:"lsb"},{number:35,name:"controller35",description:"Undefined",position:"lsb"},{number:36,name:"footcontrollerfine",description:"Foot Controller (Fine)",position:"lsb"},{number:37,name:"portamentotimefine",description:"Portamento Time (Fine)",position:"lsb"},{number:38,name:"dataentryfine",description:"Data Entry (Fine)",position:"lsb"},{number:39,name:"channelvolumefine",description:"Channel Volume (Fine)",position:"lsb"},{number:40,name:"balancefine",description:"Balance (Fine)",position:"lsb"},{number:41,name:"controller41",description:"Undefined",position:"lsb"},{number:42,name:"panfine",description:"Pan (Fine)",position:"lsb"},{number:43,name:"expressionfine",description:"Expression Controller (Fine)",position:"lsb"},{number:44,name:"effectcontrol1fine",description:"Effect control 1 (Fine)",position:"lsb"},{number:45,name:"effectcontrol2fine",description:"Effect control 2 (Fine)",position:"lsb"},{number:46,name:"controller46",description:"Undefined",position:"lsb"},{number:47,name:"controller47",description:"Undefined",position:"lsb"},{number:48,name:"controller48",description:"General Purpose Controller 1 (Fine)",position:"lsb"},{number:49,name:"controller49",description:"General Purpose Controller 2 (Fine)",position:"lsb"},{number:50,name:"controller50",description:"General Purpose Controller 3 (Fine)",position:"lsb"},{number:51,name:"controller51",description:"General Purpose Controller 4 (Fine)",position:"lsb"},{number:52,name:"controller52",description:"Undefined",position:"lsb"},{number:53,name:"controller53",description:"Undefined",position:"lsb"},{number:54,name:"controller54",description:"Undefined",position:"lsb"},{number:55,name:"controller55",description:"Undefined",position:"lsb"},{number:56,name:"controller56",description:"Undefined",position:"lsb"},{number:57,name:"controller57",description:"Undefined",position:"lsb"},{number:58,name:"controller58",description:"Undefined",position:"lsb"},{number:59,name:"controller59",description:"Undefined",position:"lsb"},{number:60,name:"controller60",description:"Undefined",position:"lsb"},{number:61,name:"controller61",description:"Undefined",position:"lsb"},{number:62,name:"controller62",description:"Undefined",position:"lsb"},{number:63,name:"controller63",description:"Undefined",position:"lsb"},{number:64,name:"damperpedal",description:"Damper Pedal On/Off"},{number:65,name:"portamento",description:"Portamento On/Off"},{number:66,name:"sostenuto",description:"Sostenuto On/Off"},{number:67,name:"softpedal",description:"Soft Pedal On/Off"},{number:68,name:"legatopedal",description:"Legato Pedal On/Off"},{number:69,name:"hold2",description:"Hold 2 On/Off"},{number:70,name:"soundvariation",description:"Sound Variation",position:"lsb"},{number:71,name:"resonance",description:"Resonance",position:"lsb"},{number:72,name:"releasetime",description:"Release Time",position:"lsb"},{number:73,name:"attacktime",description:"Attack Time",position:"lsb"},{number:74,name:"brightness",description:"Brightness",position:"lsb"},{number:75,name:"decaytime",description:"Decay Time",position:"lsb"},{number:76,name:"vibratorate",description:"Vibrato Rate",position:"lsb"},{number:77,name:"vibratodepth",description:"Vibrato Depth",position:"lsb"},{number:78,name:"vibratodelay",description:"Vibrato Delay",position:"lsb"},{number:79,name:"controller79",description:"Undefined",position:"lsb"},{number:80,name:"generalpurposecontroller5",description:"General Purpose Controller 5",position:"lsb"},{number:81,name:"generalpurposecontroller6",description:"General Purpose Controller 6",position:"lsb"},{number:82,name:"generalpurposecontroller7",description:"General Purpose Controller 7",position:"lsb"},{number:83,name:"generalpurposecontroller8",description:"General Purpose Controller 8",position:"lsb"},{number:84,name:"portamentocontrol",description:"Portamento Control",position:"lsb"},{number:85,name:"controller85",description:"Undefined"},{number:86,name:"controller86",description:"Undefined"},{number:87,name:"controller87",description:"Undefined"},{number:88,name:"highresolutionvelocityprefix",description:"High Resolution Velocity Prefix",position:"lsb"},{number:89,name:"controller89",description:"Undefined"},{number:90,name:"controller90",description:"Undefined"},{number:91,name:"effect1depth",description:"Effects 1 Depth (Reverb Send Level)"},{number:92,name:"effect2depth",description:"Effects 2 Depth"},{number:93,name:"effect3depth",description:"Effects 3 Depth (Chorus Send Level)"},{number:94,name:"effect4depth",description:"Effects 4 Depth"},{number:95,name:"effect5depth",description:"Effects 5 Depth"},{number:96,name:"dataincrement",description:"Data Increment"},{number:97,name:"datadecrement",description:"Data Decrement"},{number:98,name:"nonregisteredparameterfine",description:"Non-Registered Parameter Number (Fine)",position:"lsb"},{number:99,name:"nonregisteredparametercoarse",description:"Non-Registered Parameter Number (Coarse)",position:"msb"},{number:100,name:"registeredparameterfine",description:"Registered Parameter Number (Fine)",position:"lsb"},{number:101,name:"registeredparametercoarse",description:"Registered Parameter Number (Coarse)",position:"msb"},{number:102,name:"controller102",description:"Undefined"},{number:103,name:"controller103",description:"Undefined"},{number:104,name:"controller104",description:"Undefined"},{number:105,name:"controller105",description:"Undefined"},{number:106,name:"controller106",description:"Undefined"},{number:107,name:"controller107",description:"Undefined"},{number:108,name:"controller108",description:"Undefined"},{number:109,name:"controller109",description:"Undefined"},{number:110,name:"controller110",description:"Undefined"},{number:111,name:"controller111",description:"Undefined"},{number:112,name:"controller112",description:"Undefined"},{number:113,name:"controller113",description:"Undefined"},{number:114,name:"controller114",description:"Undefined"},{number:115,name:"controller115",description:"Undefined"},{number:116,name:"controller116",description:"Undefined"},{number:117,name:"controller117",description:"Undefined"},{number:118,name:"controller118",description:"Undefined"},{number:119,name:"controller119",description:"Undefined"},{number:120,name:"allsoundoff",description:"All Sound Off"},{number:121,name:"resetallcontrollers",description:"Reset All Controllers"},{number:122,name:"localcontrol",description:"Local Control On/Off"},{number:123,name:"allnotesoff",description:"All Notes Off"},{number:124,name:"omnimodeoff",description:"Omni Mode Off"},{number:125,name:"omnimodeon",description:"Omni Mode On"},{number:126,name:"monomodeon",description:"Mono Mode On"},{number:127,name:"polymodeon",description:"Poly Mode On"}]}static get REGISTERED_PARAMETERS(){return{pitchbendrange:[0,0],channelfinetuning:[0,1],channelcoarsetuning:[0,2],tuningprogram:[0,3],tuningbank:[0,4],modulationrange:[0,5],azimuthangle:[61,0],elevationangle:[61,1],gain:[61,2],distanceratio:[61,3],maximumdistance:[61,4],maximumdistancegain:[61,5],referencedistanceratio:[61,6],panspreadangle:[61,7],rollangle:[61,8]}}static get MIDI_REGISTERED_PARAMETERS(){return this.validation&&console.warn("The MIDI_REGISTERED_PARAMETERS enum has been deprecated. Use the Enumerations.REGISTERED_PARAMETERS enum instead."),o.MIDI_REGISTERED_PARAMETERS}static get SYSTEM_MESSAGES(){return{sysex:240,timecode:241,songposition:242,songselect:243,tunerequest:246,tuningrequest:246,sysexend:247,clock:248,start:250,continue:251,stop:252,activesensing:254,reset:255,midimessage:0,unknownsystemmessage:-1}}static get MIDI_SYSTEM_MESSAGES(){return this.validation&&console.warn("The MIDI_SYSTEM_MESSAGES enum has been deprecated. Use the Enumerations.SYSTEM_MESSAGES enum instead."),o.SYSTEM_MESSAGES}static get CHANNEL_EVENTS(){return["noteoff","controlchange","noteon","keyaftertouch","programchange","channelaftertouch","pitchbend","allnotesoff","allsoundoff","localcontrol","monomode","omnimode","resetallcontrollers","nrpn","nrpn-dataentrycoarse","nrpn-dataentryfine","nrpn-dataincrement","nrpn-datadecrement","rpn","rpn-dataentrycoarse","rpn-dataentryfine","rpn-dataincrement","rpn-datadecrement","nrpn-databuttonincrement","nrpn-databuttondecrement","rpn-databuttonincrement","rpn-databuttondecrement"]}}/**
 * The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.
 *
 * `Note` objects can be played back on a single channel by calling
 * [`OutputChannel.playNote()`]{@link OutputChannel#playNote} or, on multiple channels of the same
 * output, by calling [`Output.playNote()`]{@link Output#playNote}.
 *
 * The note has [`attack`](#attack) and [`release`](#release) velocities set at `0.5` by default.
 * These can be changed by passing in the appropriate option. It is also possible to set a
 * system-wide default for attack and release velocities by using the
 * [`WebMidi.defaults`](WebMidi#defaults) property.
 *
 * If you prefer to work with raw MIDI values (`0` to `127`), you can use [`rawAttack`](#rawAttack) and
 * [`rawRelease`](#rawRelease) to both get and set the values.
 *
 * The note may have a [`duration`](#duration). If it does, playback will be automatically stopped
 * when the duration has elapsed by sending a `"noteoff"` event. By default, the duration is set to
 * `Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
 * method such as [`OutputChannel.stopNote()`]{@link OutputChannel#stopNote},
 * [`Output.stopNote()`]{@link Output#stopNote} or similar.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class O{constructor(e,t={}){this.duration=d.defaults.note.duration,this.attack=d.defaults.note.attack,this.release=d.defaults.note.release,t.duration!=null&&(this.duration=t.duration),t.attack!=null&&(this.attack=t.attack),t.rawAttack!=null&&(this.attack=l.from7bitToFloat(t.rawAttack)),t.release!=null&&(this.release=t.release),t.rawRelease!=null&&(this.release=l.from7bitToFloat(t.rawRelease)),Number.isInteger(e)?this.identifier=l.toNoteIdentifier(e):this.identifier=e}get identifier(){return this._name+(this._accidental||"")+this._octave}set identifier(e){const t=l.getNoteDetails(e);if(d.validation&&!e)throw new Error("Invalid note identifier");this._name=t.name,this._accidental=t.accidental,this._octave=t.octave}get name(){return this._name}set name(e){if(d.validation&&(e=e.toUpperCase(),!["C","D","E","F","G","A","B"].includes(e)))throw new Error("Invalid name value");this._name=e}get accidental(){return this._accidental}set accidental(e){if(d.validation&&(e=e.toLowerCase(),!["#","##","b","bb"].includes(e)))throw new Error("Invalid accidental value");this._accidental=e}get octave(){return this._octave}set octave(e){if(d.validation&&(e=parseInt(e),isNaN(e)))throw new Error("Invalid octave value");this._octave=e}get duration(){return this._duration}set duration(e){if(d.validation&&(e=parseFloat(e),isNaN(e)||e===null||e<0))throw new RangeError("Invalid duration value.");this._duration=e}get attack(){return this._attack}set attack(e){if(d.validation&&(e=parseFloat(e),isNaN(e)||!(e>=0&&e<=1)))throw new RangeError("Invalid attack value.");this._attack=e}get release(){return this._release}set release(e){if(d.validation&&(e=parseFloat(e),isNaN(e)||!(e>=0&&e<=1)))throw new RangeError("Invalid release value.");this._release=e}get rawAttack(){return l.fromFloatTo7Bit(this._attack)}set rawAttack(e){this._attack=l.from7bitToFloat(e)}get rawRelease(){return l.fromFloatTo7Bit(this._release)}set rawRelease(e){this._release=l.from7bitToFloat(e)}get number(){return l.toNoteNumber(this.identifier)}getOffsetNumber(e=0,t=0){return d.validation&&(e=parseInt(e)||0,t=parseInt(t)||0),Math.min(Math.max(this.number+e*12+t,0),127)}}/**
 * The `Utilities` class contains general-purpose utility methods. All methods are static and
 * should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class l{static toNoteNumber(e,t=0){if(t=t==null?0:parseInt(t),isNaN(t))throw new RangeError("Invalid 'octaveOffset' value");typeof e!="string"&&(e="");const n=this.getNoteDetails(e);if(!n)throw new TypeError("Invalid note identifier");const s={C:0,D:2,E:4,F:5,G:7,A:9,B:11};let i=(n.octave+1+t)*12;if(i+=s[n.name],n.accidental&&(n.accidental.startsWith("b")?i-=n.accidental.length:i+=n.accidental.length),i<0||i>127)throw new RangeError("Invalid octaveOffset value");return i}static getNoteDetails(e){Number.isInteger(e)&&(e=this.toNoteIdentifier(e));const t=e.match(/^([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)$/i);if(!t)throw new TypeError("Invalid note identifier");const n=t[1].toUpperCase(),s=parseInt(t[3]);let i=t[2].toLowerCase();return i=i===""?void 0:i,{accidental:i,identifier:n+(i||"")+s,name:n,octave:s}}static sanitizeChannels(e){let t;if(d.validation){if(e==="all")t=["all"];else if(e==="none")return[]}return Array.isArray(e)?t=e:t=[e],t.indexOf("all")>-1&&(t=o.MIDI_CHANNEL_NUMBERS),t.map(function(n){return parseInt(n)}).filter(function(n){return n>=1&&n<=16})}static toTimestamp(e){let t=!1;const n=parseFloat(e);return isNaN(n)?!1:(typeof e=="string"&&e.substring(0,1)==="+"?n>=0&&(t=d.time+n):n>=0&&(t=n),t)}static guessNoteNumber(e,t){t=parseInt(t)||0;let n=!1;if(Number.isInteger(e)&&e>=0&&e<=127)n=parseInt(e);else if(parseInt(e)>=0&&parseInt(e)<=127)n=parseInt(e);else if(typeof e=="string"||e instanceof String)try{n=this.toNoteNumber(e.trim(),t)}catch{return!1}return n}static toNoteIdentifier(e,t){if(e=parseInt(e),isNaN(e)||e<0||e>127)throw new RangeError("Invalid note number");if(t=t==null?0:parseInt(t),isNaN(t))throw new RangeError("Invalid octaveOffset value");const n=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],s=Math.floor(e/12-1)+t;return n[e%12]+s.toString()}static buildNote(e,t={}){if(t.octaveOffset=parseInt(t.octaveOffset)||0,e instanceof O)return e;let n=this.guessNoteNumber(e,t.octaveOffset);if(n===!1)throw new TypeError(`The input could not be parsed as a note (${e})`);return t.octaveOffset=void 0,new O(n,t)}static buildNoteArray(e,t={}){let n=[];return Array.isArray(e)||(e=[e]),e.forEach(s=>{n.push(this.buildNote(s,t))}),n}static from7bitToFloat(e){return e===1/0&&(e=127),e=parseInt(e)||0,Math.min(Math.max(e/127,0),1)}static fromFloatTo7Bit(e){return e===1/0&&(e=1),e=parseFloat(e)||0,Math.min(Math.max(Math.round(e*127),0),127)}static fromMsbLsbToFloat(e,t=0){d.validation&&(e=Math.min(Math.max(parseInt(e)||0,0),127),t=Math.min(Math.max(parseInt(t)||0,0),127));const n=((e<<7)+t)/16383;return Math.min(Math.max(n,0),1)}static fromFloatToMsbLsb(e){d.validation&&(e=Math.min(Math.max(parseFloat(e)||0,0),1));const t=Math.round(e*16383);return{msb:t>>7,lsb:t&127}}static offsetNumber(e,t=0,n=0){if(d.validation){if(e=parseInt(e),isNaN(e))throw new Error("Invalid note number");t=parseInt(t)||0,n=parseInt(n)||0}return Math.min(Math.max(e+t*12+n,0),127)}static getPropertyByValue(e,t){return Object.keys(e).find(n=>e[n]===t)}static getCcNameByNumber(e){if(!(d.validation&&(e=parseInt(e),!(e>=0&&e<=127))))return o.CONTROL_CHANGE_MESSAGES[e].name}static getCcNumberByName(e){let t=o.CONTROL_CHANGE_MESSAGES.find(n=>n.name===e);return t?t.number:o.MIDI_CONTROL_CHANGE_MESSAGES[e]}static getChannelModeByNumber(e){if(!(e>=120&&e<=127))return!1;for(let t in o.CHANNEL_MODE_MESSAGES)if(o.CHANNEL_MODE_MESSAGES.hasOwnProperty(t)&&e===o.CHANNEL_MODE_MESSAGES[t])return t;return!1}static get isNode(){return typeof process<"u"&&process.versions!=null&&process.versions.node!=null}static get isBrowser(){return typeof window<"u"&&typeof window.document<"u"}}/**
 * The `OutputChannel` class represents a single output MIDI channel. `OutputChannel` objects are
 * provided by an [`Output`](Output) port which, itself, is made available by a device. The
 * `OutputChannel` object is derived from the host's MIDI subsystem and should not be instantiated
 * directly.
 *
 * All 16 `OutputChannel` objects can be found inside the parent output's
 * [`channels`]{@link Output#channels} property.
 *
 * @param {Output} output The [`Output`](Output) this channel belongs to.
 * @param {number} number The MIDI channel number (`1` - `16`).
 *
 * @extends EventEmitter
 * @license Apache-2.0
 * @since 3.0.0
 */class rt extends y{constructor(e,t){super(),this._output=e,this._number=t,this._octaveOffset=0}destroy(){this._output=null,this._number=null,this._octaveOffset=0,this.removeListener()}send(e,t={time:0}){return this.output.send(e,t),this}sendKeyAftertouch(e,t,n={}){if(d.validation){if(n.useRawValue&&(n.rawValue=n.useRawValue),isNaN(parseFloat(t)))throw new RangeError("Invalid key aftertouch value.");if(n.rawValue){if(!(t>=0&&t<=127&&Number.isInteger(t)))throw new RangeError("Key aftertouch raw value must be an integer between 0 and 127.")}else if(!(t>=0&&t<=1))throw new RangeError("Key aftertouch value must be a float between 0 and 1.")}n.rawValue||(t=l.fromFloatTo7Bit(t));const s=d.octaveOffset+this.output.octaveOffset+this.octaveOffset;return Array.isArray(e)||(e=[e]),l.buildNoteArray(e).forEach(i=>{this.send([(o.CHANNEL_MESSAGES.keyaftertouch<<4)+(this.number-1),i.getOffsetNumber(s),t],{time:l.toTimestamp(n.time)})}),this}sendControlChange(e,t,n={}){if(typeof e=="string"&&(e=l.getCcNumberByName(e)),Array.isArray(t)||(t=[t]),d.validation){if(e===void 0)throw new TypeError("Control change must be identified with a valid name or an integer between 0 and 127.");if(!Number.isInteger(e)||!(e>=0&&e<=127))throw new TypeError("Control change number must be an integer between 0 and 127.");if(t=t.map(s=>{const i=Math.min(Math.max(parseInt(s),0),127);if(isNaN(i))throw new TypeError("Values must be integers between 0 and 127");return i}),t.length===2&&e>=32)throw new TypeError("To use a value array, the controller must be between 0 and 31")}return t.forEach((s,i)=>{this.send([(o.CHANNEL_MESSAGES.controlchange<<4)+(this.number-1),e+i*32,t[i]],{time:l.toTimestamp(n.time)})}),this}_selectNonRegisteredParameter(e,t={}){return this.sendControlChange(99,e[0],t),this.sendControlChange(98,e[1],t),this}_deselectRegisteredParameter(e={}){return this.sendControlChange(101,127,e),this.sendControlChange(100,127,e),this}_deselectNonRegisteredParameter(e={}){return this.sendControlChange(101,127,e),this.sendControlChange(100,127,e),this}_selectRegisteredParameter(e,t={}){return this.sendControlChange(101,e[0],t),this.sendControlChange(100,e[1],t),this}_setCurrentParameter(e,t={}){return e=[].concat(e),this.sendControlChange(6,e[0],t),e.length<2?this:(this.sendControlChange(38,e[1],t),this)}sendRpnDecrement(e,t={}){if(Array.isArray(e)||(e=o.REGISTERED_PARAMETERS[e]),d.validation){if(e===void 0)throw new TypeError("The specified registered parameter is invalid.");let n=!1;if(Object.getOwnPropertyNames(o.REGISTERED_PARAMETERS).forEach(s=>{o.REGISTERED_PARAMETERS[s][0]===e[0]&&o.REGISTERED_PARAMETERS[s][1]===e[1]&&(n=!0)}),!n)throw new TypeError("The specified registered parameter is invalid.")}return this._selectRegisteredParameter(e,t),this.sendControlChange(97,0,t),this._deselectRegisteredParameter(t),this}sendRpnIncrement(e,t={}){if(Array.isArray(e)||(e=o.REGISTERED_PARAMETERS[e]),d.validation){if(e===void 0)throw new TypeError("The specified registered parameter is invalid.");let n=!1;if(Object.getOwnPropertyNames(o.REGISTERED_PARAMETERS).forEach(s=>{o.REGISTERED_PARAMETERS[s][0]===e[0]&&o.REGISTERED_PARAMETERS[s][1]===e[1]&&(n=!0)}),!n)throw new TypeError("The specified registered parameter is invalid.")}return this._selectRegisteredParameter(e,t),this.sendControlChange(96,0,t),this._deselectRegisteredParameter(t),this}playNote(e,t={}){this.sendNoteOn(e,t);const n=Array.isArray(e)?e:[e];for(let s of n)if(parseInt(s.duration)>0){const i={time:(l.toTimestamp(t.time)||d.time)+parseInt(s.duration),release:s.release,rawRelease:s.rawRelease};this.sendNoteOff(s,i)}else if(parseInt(t.duration)>0){const i={time:(l.toTimestamp(t.time)||d.time)+parseInt(t.duration),release:t.release,rawRelease:t.rawRelease};this.sendNoteOff(s,i)}return this}sendNoteOff(e,t={}){if(d.validation){if(t.rawRelease!=null&&!(t.rawRelease>=0&&t.rawRelease<=127))throw new RangeError("The 'rawRelease' option must be an integer between 0 and 127");if(t.release!=null&&!(t.release>=0&&t.release<=1))throw new RangeError("The 'release' option must be an number between 0 and 1");t.rawVelocity&&(t.rawRelease=t.velocity,console.warn("The 'rawVelocity' option is deprecated. Use 'rawRelease' instead.")),t.velocity&&(t.release=t.velocity,console.warn("The 'velocity' option is deprecated. Use 'attack' instead."))}let n=64;t.rawRelease!=null?n=t.rawRelease:isNaN(t.release)||(n=Math.round(t.release*127));const s=d.octaveOffset+this.output.octaveOffset+this.octaveOffset;return l.buildNoteArray(e,{rawRelease:parseInt(n)}).forEach(i=>{this.send([(o.CHANNEL_MESSAGES.noteoff<<4)+(this.number-1),i.getOffsetNumber(s),i.rawRelease],{time:l.toTimestamp(t.time)})}),this}stopNote(e,t={}){return this.sendNoteOff(e,t)}sendNoteOn(e,t={}){if(d.validation){if(t.rawAttack!=null&&!(t.rawAttack>=0&&t.rawAttack<=127))throw new RangeError("The 'rawAttack' option must be an integer between 0 and 127");if(t.attack!=null&&!(t.attack>=0&&t.attack<=1))throw new RangeError("The 'attack' option must be an number between 0 and 1");t.rawVelocity&&(t.rawAttack=t.velocity,t.rawRelease=t.release,console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' or 'rawRelease'.")),t.velocity&&(t.attack=t.velocity,console.warn("The 'velocity' option is deprecated. Use 'attack' instead."))}let n=64;t.rawAttack!=null?n=t.rawAttack:isNaN(t.attack)||(n=Math.round(t.attack*127));const s=d.octaveOffset+this.output.octaveOffset+this.octaveOffset;return l.buildNoteArray(e,{rawAttack:n}).forEach(i=>{this.send([(o.CHANNEL_MESSAGES.noteon<<4)+(this.number-1),i.getOffsetNumber(s),i.rawAttack],{time:l.toTimestamp(t.time)})}),this}sendChannelMode(e,t=0,n={}){if(typeof e=="string"&&(e=o.CHANNEL_MODE_MESSAGES[e]),d.validation){if(e===void 0)throw new TypeError("Invalid channel mode message name or number.");if(isNaN(e)||!(e>=120&&e<=127))throw new TypeError("Invalid channel mode message number.");if(isNaN(parseInt(t))||t<0||t>127)throw new RangeError("Value must be an integer between 0 and 127.")}return this.send([(o.CHANNEL_MESSAGES.controlchange<<4)+(this.number-1),e,t],{time:l.toTimestamp(n.time)}),this}sendOmniMode(e,t={}){return e===void 0||e?this.sendChannelMode("omnimodeon",0,t):this.sendChannelMode("omnimodeoff",0,t),this}sendChannelAftertouch(e,t={}){if(d.validation){if(isNaN(parseFloat(e)))throw new RangeError("Invalid channel aftertouch value.");if(t.rawValue){if(!(e>=0&&e<=127&&Number.isInteger(e)))throw new RangeError("Channel aftertouch raw value must be an integer between 0 and 127.")}else if(!(e>=0&&e<=1))throw new RangeError("Channel aftertouch value must be a float between 0 and 1.")}return t.rawValue||(e=l.fromFloatTo7Bit(e)),this.send([(o.CHANNEL_MESSAGES.channelaftertouch<<4)+(this.number-1),Math.round(e)],{time:l.toTimestamp(t.time)}),this}sendMasterTuning(e,t={}){if(e=parseFloat(e)||0,d.validation&&!(e>-65&&e<64))throw new RangeError("The value must be a decimal number larger than -65 and smaller than 64.");let n=Math.floor(e)+64,s=e-Math.floor(e);s=Math.round((s+1)/2*16383);let i=s>>7&127,a=s&127;return this.sendRpnValue("channelcoarsetuning",n,t),this.sendRpnValue("channelfinetuning",[i,a],t),this}sendModulationRange(e,t,n={}){if(d.validation){if(!Number.isInteger(e)||!(e>=0&&e<=127))throw new RangeError("The semitones value must be an integer between 0 and 127.");if(t!=null&&(!Number.isInteger(t)||!(t>=0&&t<=127)))throw new RangeError("If specified, the cents value must be an integer between 0 and 127.")}return t>=0&&t<=127||(t=0),this.sendRpnValue("modulationrange",[e,t],n),this}sendNrpnValue(e,t,n={}){if(t=[].concat(t),d.validation){if(!Array.isArray(e)||!Number.isInteger(e[0])||!Number.isInteger(e[1]))throw new TypeError("The specified NRPN is invalid.");if(!(e[0]>=0&&e[0]<=127))throw new RangeError("The first byte of the NRPN must be between 0 and 127.");if(!(e[1]>=0&&e[1]<=127))throw new RangeError("The second byte of the NRPN must be between 0 and 127.");t.forEach(s=>{if(!(s>=0&&s<=127))throw new RangeError("The data bytes of the NRPN must be between 0 and 127.")})}return this._selectNonRegisteredParameter(e,n),this._setCurrentParameter(t,n),this._deselectNonRegisteredParameter(n),this}sendPitchBend(e,t={}){if(d.validation)if(t.rawValue&&Array.isArray(e)){if(!(e[0]>=0&&e[0]<=127))throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");if(!(e[1]>=0&&e[1]<=127))throw new RangeError("The pitch bend LSB must be an integer between 0 and 127.")}else if(t.rawValue&&!Array.isArray(e)){if(!(e>=0&&e<=127))throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.")}else{if(isNaN(e)||e===null)throw new RangeError("Invalid pitch bend value.");if(!(e>=-1&&e<=1))throw new RangeError("The pitch bend value must be a float between -1 and 1.")}let n=0,s=0;if(t.rawValue&&Array.isArray(e))n=e[0],s=e[1];else if(t.rawValue&&!Array.isArray(e))n=e;else{const i=l.fromFloatToMsbLsb((e+1)/2);n=i.msb,s=i.lsb}return this.send([(o.CHANNEL_MESSAGES.pitchbend<<4)+(this.number-1),s,n],{time:l.toTimestamp(t.time)}),this}sendPitchBendRange(e,t,n={}){if(d.validation){if(!Number.isInteger(e)||!(e>=0&&e<=127))throw new RangeError("The semitones value must be an integer between 0 and 127.");if(!Number.isInteger(t)||!(t>=0&&t<=127))throw new RangeError("The cents value must be an integer between 0 and 127.")}return this.sendRpnValue("pitchbendrange",[e,t],n),this}sendProgramChange(e,t={}){if(e=parseInt(e)||0,d.validation&&!(e>=0&&e<=127))throw new RangeError("The program number must be between 0 and 127.");return this.send([(o.CHANNEL_MESSAGES.programchange<<4)+(this.number-1),e],{time:l.toTimestamp(t.time)}),this}sendRpnValue(e,t,n={}){if(Array.isArray(e)||(e=o.REGISTERED_PARAMETERS[e]),d.validation){if(!Number.isInteger(e[0])||!Number.isInteger(e[1]))throw new TypeError("The specified NRPN is invalid.");if(!(e[0]>=0&&e[0]<=127))throw new RangeError("The first byte of the RPN must be between 0 and 127.");if(!(e[1]>=0&&e[1]<=127))throw new RangeError("The second byte of the RPN must be between 0 and 127.");[].concat(t).forEach(s=>{if(!(s>=0&&s<=127))throw new RangeError("The data bytes of the RPN must be between 0 and 127.")})}return this._selectRegisteredParameter(e,n),this._setCurrentParameter(t,n),this._deselectRegisteredParameter(n),this}sendTuningBank(e,t={}){if(d.validation&&(!Number.isInteger(e)||!(e>=0&&e<=127)))throw new RangeError("The tuning bank number must be between 0 and 127.");return this.sendRpnValue("tuningbank",e,t),this}sendTuningProgram(e,t={}){if(d.validation&&(!Number.isInteger(e)||!(e>=0&&e<=127)))throw new RangeError("The tuning program number must be between 0 and 127.");return this.sendRpnValue("tuningprogram",e,t),this}sendLocalControl(e,t={}){return e?this.sendChannelMode("localcontrol",127,t):this.sendChannelMode("localcontrol",0,t)}sendAllNotesOff(e={}){return this.sendChannelMode("allnotesoff",0,e)}sendAllSoundOff(e={}){return this.sendChannelMode("allsoundoff",0,e)}sendResetAllControllers(e={}){return this.sendChannelMode("resetallcontrollers",0,e)}sendPolyphonicMode(e,t={}){return e==="mono"?this.sendChannelMode("monomodeon",0,t):this.sendChannelMode("polymodeon",0,t)}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get output(){return this._output}get number(){return this._number}}/**
 * The `Output` class represents a single MIDI output port (not to be confused with a MIDI channel).
 * A port is made available by a MIDI device. A MIDI device can advertise several input and output
 * ports. Each port has 16 MIDI channels which can be accessed via the [`channels`](#channels)
 * property.
 *
 * The `Output` object is automatically instantiated by the library according to the host's MIDI
 * subsystem and should not be directly instantiated.
 *
 * You can access all available `Output` objects by referring to the
 * [`WebMidi.outputs`](WebMidi#outputs) array or by using methods such as
 * [`WebMidi.getOutputByName()`](WebMidi#getOutputByName) or
 * [`WebMidi.getOutputById()`](WebMidi#getOutputById).
 *
 * @fires Output#opened
 * @fires Output#disconnected
 * @fires Output#closed
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */class le extends y{constructor(e){super(),this._midiOutput=e,this._octaveOffset=0,this.channels=[];for(let t=1;t<=16;t++)this.channels[t]=new rt(this,t);this._midiOutput.onstatechange=this._onStateChange.bind(this)}async destroy(){this.removeListener(),this.channels.forEach(e=>e.destroy()),this.channels=[],this._midiOutput&&(this._midiOutput.onstatechange=null),await this.close(),this._midiOutput=null}_onStateChange(e){let t={timestamp:d.time};e.port.connection==="open"?(t.type="opened",t.target=this,t.port=t.target,this.emit("opened",t)):e.port.connection==="closed"&&e.port.state==="connected"?(t.type="closed",t.target=this,t.port=t.target,this.emit("closed",t)):e.port.connection==="closed"&&e.port.state==="disconnected"?(t.type="disconnected",t.port={connection:e.port.connection,id:e.port.id,manufacturer:e.port.manufacturer,name:e.port.name,state:e.port.state,type:e.port.type},this.emit("disconnected",t)):e.port.connection==="pending"&&e.port.state==="disconnected"||console.warn("This statechange event was not caught:",e.port.connection,e.port.state)}async open(){try{return await this._midiOutput.open(),Promise.resolve(this)}catch(e){return Promise.reject(e)}}async close(){this._midiOutput?await this._midiOutput.close():await Promise.resolve()}send(e,t={time:0},n=0){if(e instanceof $e&&(e=l.isNode?e.data:e.rawData),e instanceof Uint8Array&&l.isNode&&(e=Array.from(e)),d.validation){if(!Array.isArray(e)&&!(e instanceof Uint8Array)&&(e=[e],Array.isArray(t)&&(e=e.concat(t)),t=isNaN(n)?{time:0}:{time:n}),!(parseInt(e[0])>=128&&parseInt(e[0])<=255))throw new RangeError("The first byte (status) must be an integer between 128 and 255.");e.slice(1).forEach(s=>{if(s=parseInt(s),!(s>=0&&s<=255))throw new RangeError("Data bytes must be integers between 0 and 255.")}),t||(t={time:0})}return this._midiOutput.send(e,l.toTimestamp(t.time)),this}sendSysex(e,t=[],n={}){if(e=[].concat(e),t instanceof Uint8Array){const s=new Uint8Array(1+e.length+t.length+1);s[0]=o.SYSTEM_MESSAGES.sysex,s.set(Uint8Array.from(e),1),s.set(t,1+e.length),s[s.length-1]=o.SYSTEM_MESSAGES.sysexend,this.send(s,{time:n.time})}else{const s=e.concat(t,o.SYSTEM_MESSAGES.sysexend);this.send([o.SYSTEM_MESSAGES.sysex].concat(s),{time:n.time})}return this}clear(){return this._midiOutput.clear?this._midiOutput.clear():d.validation&&console.warn("The 'clear()' method has not yet been implemented in your environment."),this}sendTimecodeQuarterFrame(e,t={}){if(d.validation&&(e=parseInt(e),isNaN(e)||!(e>=0&&e<=127)))throw new RangeError("The value must be an integer between 0 and 127.");return this.send([o.SYSTEM_MESSAGES.timecode,e],{time:t.time}),this}sendSongPosition(e=0,t={}){e=Math.floor(e)||0;var n=e>>7&127,s=e&127;return this.send([o.SYSTEM_MESSAGES.songposition,n,s],{time:t.time}),this}sendSongSelect(e=0,t={}){if(d.validation&&(e=parseInt(e),isNaN(e)||!(e>=0&&e<=127)))throw new RangeError("The program value must be between 0 and 127");return this.send([o.SYSTEM_MESSAGES.songselect,e],{time:t.time}),this}sendTuneRequest(e={}){return this.send([o.SYSTEM_MESSAGES.tunerequest],{time:e.time}),this}sendClock(e={}){return this.send([o.SYSTEM_MESSAGES.clock],{time:e.time}),this}sendStart(e={}){return this.send([o.SYSTEM_MESSAGES.start],{time:e.time}),this}sendContinue(e={}){return this.send([o.SYSTEM_MESSAGES.continue],{time:e.time}),this}sendStop(e={}){return this.send([o.SYSTEM_MESSAGES.stop],{time:e.time}),this}sendActiveSensing(e={}){return this.send([o.SYSTEM_MESSAGES.activesensing],{time:e.time}),this}sendReset(e={}){return this.send([o.SYSTEM_MESSAGES.reset],{time:e.time}),this}sendTuningRequest(e={}){return d.validation&&console.warn("The sendTuningRequest() method has been deprecated. Use sendTuningRequest() instead."),this.sendTuneRequest(e)}sendKeyAftertouch(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendKeyAftertouch(e,t,n)}),this}sendControlChange(e,t,n={},s={}){if(d.validation&&(Array.isArray(n)||Number.isInteger(n)||n==="all")){const i=n;n=s,n.channels=i,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)}return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendControlChange(e,t,n)}),this}sendPitchBendRange(e=0,t=0,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendPitchBendRange(e,t,n)}),this}setPitchBendRange(e=0,t=0,n="all",s={}){return d.validation&&(console.warn("The setPitchBendRange() method is deprecated. Use sendPitchBendRange() instead."),s.channels=n,s.channels==="all"&&(s.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendPitchBendRange(e,t,s)}sendRpnValue(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendRpnValue(e,t,n)}),this}setRegisteredParameter(e,t=[],n="all",s={}){return d.validation&&(console.warn("The setRegisteredParameter() method is deprecated. Use sendRpnValue() instead."),s.channels=n,s.channels==="all"&&(s.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendRpnValue(e,t,s)}sendChannelAftertouch(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendChannelAftertouch(e,t)}),this}sendPitchBend(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendPitchBend(e,t)}),this}sendProgramChange(e=0,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendProgramChange(e,t)}),this}sendModulationRange(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendModulationRange(e,t,n)}),this}setModulationRange(e=0,t=0,n="all",s={}){return d.validation&&(console.warn("The setModulationRange() method is deprecated. Use sendModulationRange() instead."),s.channels=n,s.channels==="all"&&(s.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendModulationRange(e,t,s)}sendMasterTuning(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendMasterTuning(e,t)}),this}setMasterTuning(e,t={},n={}){return d.validation&&(console.warn("The setMasterTuning() method is deprecated. Use sendMasterTuning() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendMasterTuning(e,n)}sendTuningProgram(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendTuningProgram(e,t)}),this}setTuningProgram(e,t="all",n={}){return d.validation&&(console.warn("The setTuningProgram() method is deprecated. Use sendTuningProgram() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendTuningProgram(e,n)}sendTuningBank(e=0,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendTuningBank(e,t)}),this}setTuningBank(e,t="all",n={}){return d.validation&&(console.warn("The setTuningBank() method is deprecated. Use sendTuningBank() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendTuningBank(e,n)}sendChannelMode(e,t=0,n={},s={}){if(d.validation&&(Array.isArray(n)||Number.isInteger(n)||n==="all")){const i=n;n=s,n.channels=i,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)}return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendChannelMode(e,t,n)}),this}sendAllSoundOff(e={}){return e.channels==null&&(e.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(e.channels).forEach(t=>{this.channels[t].sendAllSoundOff(e)}),this}sendAllNotesOff(e={}){return e.channels==null&&(e.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(e.channels).forEach(t=>{this.channels[t].sendAllNotesOff(e)}),this}sendResetAllControllers(e={},t={}){if(d.validation&&(Array.isArray(e)||Number.isInteger(e)||e==="all")){const n=e;e=t,e.channels=n,e.channels==="all"&&(e.channels=o.MIDI_CHANNEL_NUMBERS)}return e.channels==null&&(e.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(e.channels).forEach(n=>{this.channels[n].sendResetAllControllers(e)}),this}sendPolyphonicMode(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendPolyphonicMode(e,t)}),this}sendLocalControl(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendLocalControl(e,t)}),this}sendOmniMode(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendOmniMode(e,t)}),this}sendNrpnValue(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendNrpnValue(e,t,n)}),this}setNonRegisteredParameter(e,t=[],n="all",s={}){return d.validation&&(console.warn("The setNonRegisteredParameter() method is deprecated. Use sendNrpnValue() instead."),s.channels=n,s.channels==="all"&&(s.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendNrpnValue(e,t,s)}sendRpnIncrement(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendRpnIncrement(e,t)}),this}incrementRegisteredParameter(e,t="all",n={}){return d.validation&&(console.warn("The incrementRegisteredParameter() method is deprecated. Use sendRpnIncrement() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendRpnIncrement(e,n)}sendRpnDecrement(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendRpnDecrement(e,t)}),this}decrementRegisteredParameter(e,t="all",n={}){return d.validation&&(console.warn("The decrementRegisteredParameter() method is deprecated. Use sendRpnDecrement() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendRpnDecrement(e,n)}sendNoteOff(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendNoteOff(e,t)}),this}stopNote(e,t){return this.sendNoteOff(e,t)}playNote(e,t={},n={}){if(d.validation&&(t.rawVelocity&&console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' instead."),t.velocity&&console.warn("The 'velocity' option is deprecated. Use 'velocity' instead."),Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].playNote(e,t)}),this}sendNoteOn(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const s=t;t=n,t.channels=s,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(s=>{this.channels[s].sendNoteOn(e,t)}),this}get name(){return this._midiOutput.name}get id(){return this._midiOutput.id}get connection(){return this._midiOutput.connection}get manufacturer(){return this._midiOutput.manufacturer}get state(){return this._midiOutput.state}get type(){return this._midiOutput.type}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}}/**
 * The `Forwarder` class allows the forwarding of MIDI messages to predetermined outputs. When you
 * call its [`forward()`](#forward) method, it will send the specified [`Message`](Message) object
 * to all the outputs listed in its [`destinations`](#destinations) property.
 *
 * If specific channels or message types have been defined in the [`channels`](#channels) or
 * [`types`](#types) properties, only messages matching the channels/types will be forwarded.
 *
 * While it can be manually instantiated, you are more likely to come across a `Forwarder` object as
 * the return value of the [`Input.addForwarder()`](Input#addForwarder) method.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class Me{constructor(e=[],t={}){this.destinations=[],this.types=[...Object.keys(o.SYSTEM_MESSAGES),...Object.keys(o.CHANNEL_MESSAGES)],this.channels=o.MIDI_CHANNEL_NUMBERS,this.suspended=!1,Array.isArray(e)||(e=[e]),t.types&&!Array.isArray(t.types)&&(t.types=[t.types]),t.channels&&!Array.isArray(t.channels)&&(t.channels=[t.channels]),d.validation&&(e.forEach(n=>{if(!(n instanceof le))throw new TypeError("Destinations must be of type 'Output'.")}),t.types!==void 0&&t.types.forEach(n=>{if(!o.SYSTEM_MESSAGES.hasOwnProperty(n)&&!o.CHANNEL_MESSAGES.hasOwnProperty(n))throw new TypeError("Type must be a valid message type.")}),t.channels!==void 0&&t.channels.forEach(n=>{if(!o.MIDI_CHANNEL_NUMBERS.includes(n))throw new TypeError("MIDI channel must be between 1 and 16.")})),this.destinations=e,t.types&&(this.types=t.types),t.channels&&(this.channels=t.channels)}forward(e){this.suspended||this.types.includes(e.type)&&(e.channel&&!this.channels.includes(e.channel)||this.destinations.forEach(t=>{d.validation&&!(t instanceof le)||t.send(e)}))}}/**
 * The `InputChannel` class represents a single MIDI input channel (1-16) from a single input
 * device. This object is derived from the host's MIDI subsystem and should not be instantiated
 * directly.
 *
 * All 16 `InputChannel` objects can be found inside the input's [`channels`](Input#channels)
 * property.
 *
 * @fires InputChannel#midimessage
 * @fires InputChannel#unknownmessage
 *
 * @fires InputChannel#noteoff
 * @fires InputChannel#noteon
 * @fires InputChannel#keyaftertouch
 * @fires InputChannel#programchange
 * @fires InputChannel#channelaftertouch
 * @fires InputChannel#pitchbend
 *
 * @fires InputChannel#allnotesoff
 * @fires InputChannel#allsoundoff
 * @fires InputChannel#localcontrol
 * @fires InputChannel#monomode
 * @fires InputChannel#omnimode
 * @fires InputChannel#resetallcontrollers
 *
 * @fires InputChannel#event:nrpn
 * @fires InputChannel#event:nrpn-dataentrycoarse
 * @fires InputChannel#event:nrpn-dataentryfine
 * @fires InputChannel#event:nrpn-dataincrement
 * @fires InputChannel#event:nrpn-datadecrement
 * @fires InputChannel#event:rpn
 * @fires InputChannel#event:rpn-dataentrycoarse
 * @fires InputChannel#event:rpn-dataentryfine
 * @fires InputChannel#event:rpn-dataincrement
 * @fires InputChannel#event:rpn-datadecrement
 *
 * @fires InputChannel#controlchange
 * @fires InputChannel#event:controlchange-controllerxxx
 * @fires InputChannel#event:controlchange-bankselectcoarse
 * @fires InputChannel#event:controlchange-modulationwheelcoarse
 * @fires InputChannel#event:controlchange-breathcontrollercoarse
 * @fires InputChannel#event:controlchange-footcontrollercoarse
 * @fires InputChannel#event:controlchange-portamentotimecoarse
 * @fires InputChannel#event:controlchange-dataentrycoarse
 * @fires InputChannel#event:controlchange-volumecoarse
 * @fires InputChannel#event:controlchange-balancecoarse
 * @fires InputChannel#event:controlchange-pancoarse
 * @fires InputChannel#event:controlchange-expressioncoarse
 * @fires InputChannel#event:controlchange-effectcontrol1coarse
 * @fires InputChannel#event:controlchange-effectcontrol2coarse
 * @fires InputChannel#event:controlchange-generalpurposecontroller1
 * @fires InputChannel#event:controlchange-generalpurposecontroller2
 * @fires InputChannel#event:controlchange-generalpurposecontroller3
 * @fires InputChannel#event:controlchange-generalpurposecontroller4
 * @fires InputChannel#event:controlchange-bankselectfine
 * @fires InputChannel#event:controlchange-modulationwheelfine
 * @fires InputChannel#event:controlchange-breathcontrollerfine
 * @fires InputChannel#event:controlchange-footcontrollerfine
 * @fires InputChannel#event:controlchange-portamentotimefine
 * @fires InputChannel#event:controlchange-dataentryfine
 * @fires InputChannel#event:controlchange-channelvolumefine
 * @fires InputChannel#event:controlchange-balancefine
 * @fires InputChannel#event:controlchange-panfine
 * @fires InputChannel#event:controlchange-expressionfine
 * @fires InputChannel#event:controlchange-effectcontrol1fine
 * @fires InputChannel#event:controlchange-effectcontrol2fine
 * @fires InputChannel#event:controlchange-damperpedal
 * @fires InputChannel#event:controlchange-portamento
 * @fires InputChannel#event:controlchange-sostenuto
 * @fires InputChannel#event:controlchange-softpedal
 * @fires InputChannel#event:controlchange-legatopedal
 * @fires InputChannel#event:controlchange-hold2
 * @fires InputChannel#event:controlchange-soundvariation
 * @fires InputChannel#event:controlchange-resonance
 * @fires InputChannel#event:controlchange-releasetime
 * @fires InputChannel#event:controlchange-attacktime
 * @fires InputChannel#event:controlchange-brightness
 * @fires InputChannel#event:controlchange-decaytime
 * @fires InputChannel#event:controlchange-vibratorate
 * @fires InputChannel#event:controlchange-vibratodepth
 * @fires InputChannel#event:controlchange-vibratodelay
 * @fires InputChannel#event:controlchange-generalpurposecontroller5
 * @fires InputChannel#event:controlchange-generalpurposecontroller6
 * @fires InputChannel#event:controlchange-generalpurposecontroller7
 * @fires InputChannel#event:controlchange-generalpurposecontroller8
 * @fires InputChannel#event:controlchange-portamentocontrol
 * @fires InputChannel#event:controlchange-highresolutionvelocityprefix
 * @fires InputChannel#event:controlchange-effect1depth
 * @fires InputChannel#event:controlchange-effect2depth
 * @fires InputChannel#event:controlchange-effect3depth
 * @fires InputChannel#event:controlchange-effect4depth
 * @fires InputChannel#event:controlchange-effect5depth
 * @fires InputChannel#event:controlchange-dataincrement
 * @fires InputChannel#event:controlchange-datadecrement
 * @fires InputChannel#event:controlchange-nonregisteredparameterfine
 * @fires InputChannel#event:controlchange-nonregisteredparametercoarse
 * @fires InputChannel#event:controlchange-registeredparameterfine
 * @fires InputChannel#event:controlchange-registeredparametercoarse
 * @fires InputChannel#event:controlchange-allsoundoff
 * @fires InputChannel#event:controlchange-resetallcontrollers
 * @fires InputChannel#event:controlchange-localcontrol
 * @fires InputChannel#event:controlchange-allnotesoff
 * @fires InputChannel#event:controlchange-omnimodeoff
 * @fires InputChannel#event:controlchange-omnimodeon
 * @fires InputChannel#event:controlchange-monomodeon
 * @fires InputChannel#event:controlchange-polymodeon
 * @fires InputChannel#event:
 *
 * @extends EventEmitter
 * @license Apache-2.0
 * @since 3.0.0
 */class it extends y{constructor(e,t){super(),this._input=e,this._number=t,this._octaveOffset=0,this._nrpnBuffer=[],this._rpnBuffer=[],this.parameterNumberEventsEnabled=!0,this.notesState=new Array(128).fill(!1)}destroy(){this._input=null,this._number=null,this._octaveOffset=0,this._nrpnBuffer=[],this.notesState=new Array(128).fill(!1),this.parameterNumberEventsEnabled=!1,this.removeListener()}_processMidiMessageEvent(e){const t=Object.assign({},e);t.port=this.input,t.target=this,t.type="midimessage",this.emit(t.type,t),this._parseEventForStandardMessages(t)}_parseEventForStandardMessages(e){const t=Object.assign({},e);t.type=t.message.type||"unknownmessage";const n=e.message.dataBytes[0],s=e.message.dataBytes[1];if(t.type==="noteoff"||t.type==="noteon"&&s===0)this.notesState[n]=!1,t.type="noteoff",t.note=new O(l.offsetNumber(n,this.octaveOffset+this.input.octaveOffset+d.octaveOffset),{rawAttack:0,rawRelease:s}),t.value=l.from7bitToFloat(s),t.rawValue=s,t.velocity=t.note.release,t.rawVelocity=t.note.rawRelease;else if(t.type==="noteon")this.notesState[n]=!0,t.note=new O(l.offsetNumber(n,this.octaveOffset+this.input.octaveOffset+d.octaveOffset),{rawAttack:s}),t.value=l.from7bitToFloat(s),t.rawValue=s,t.velocity=t.note.attack,t.rawVelocity=t.note.rawAttack;else if(t.type==="keyaftertouch")t.note=new O(l.offsetNumber(n,this.octaveOffset+this.input.octaveOffset+d.octaveOffset)),t.value=l.from7bitToFloat(s),t.rawValue=s,t.identifier=t.note.identifier,t.key=t.note.number,t.rawKey=n;else if(t.type==="controlchange"){t.controller={number:n,name:o.CONTROL_CHANGE_MESSAGES[n].name,description:o.CONTROL_CHANGE_MESSAGES[n].description,position:o.CONTROL_CHANGE_MESSAGES[n].position},t.subtype=t.controller.name||"controller"+n,t.value=l.from7bitToFloat(s),t.rawValue=s;const i=Object.assign({},t);i.type=`${t.type}-controller${n}`,delete i.subtype,this.emit(i.type,i);const a=Object.assign({},t);a.type=`${t.type}-`+o.CONTROL_CHANGE_MESSAGES[n].name,delete a.subtype,a.type.indexOf("controller")!==0&&this.emit(a.type,a),t.message.dataBytes[0]>=120&&this._parseChannelModeMessage(t),this.parameterNumberEventsEnabled&&this._isRpnOrNrpnController(t.message.dataBytes[0])&&this._parseEventForParameterNumber(t)}else t.type==="programchange"?(t.value=n,t.rawValue=t.value):t.type==="channelaftertouch"?(t.value=l.from7bitToFloat(n),t.rawValue=n):t.type==="pitchbend"?(t.value=((s<<7)+n-8192)/8192,t.rawValue=(s<<7)+n):t.type="unknownmessage";this.emit(t.type,t)}_parseChannelModeMessage(e){const t=Object.assign({},e);t.type=t.controller.name,t.type==="localcontrol"&&(t.value=t.message.data[2]===127,t.rawValue=t.message.data[2]),t.type==="omnimodeon"?(t.type="omnimode",t.value=!0,t.rawValue=t.message.data[2]):t.type==="omnimodeoff"&&(t.type="omnimode",t.value=!1,t.rawValue=t.message.data[2]),t.type==="monomodeon"?(t.type="monomode",t.value=!0,t.rawValue=t.message.data[2]):t.type==="polymodeon"&&(t.type="monomode",t.value=!1,t.rawValue=t.message.data[2]),this.emit(t.type,t)}_parseEventForParameterNumber(e){const t=e.message.dataBytes[0],n=e.message.dataBytes[1];t===99||t===101?(this._nrpnBuffer=[],this._rpnBuffer=[],t===99?this._nrpnBuffer=[e.message]:n!==127&&(this._rpnBuffer=[e.message])):t===98||t===100?t===98?(this._rpnBuffer=[],this._nrpnBuffer.length===1?this._nrpnBuffer.push(e.message):this._nrpnBuffer=[]):(this._nrpnBuffer=[],this._rpnBuffer.length===1&&n!==127?this._rpnBuffer.push(e.message):this._rpnBuffer=[]):(t===6||t===38||t===96||t===97)&&(this._rpnBuffer.length===2?this._dispatchParameterNumberEvent("rpn",this._rpnBuffer[0].dataBytes[1],this._rpnBuffer[1].dataBytes[1],e):this._nrpnBuffer.length===2?this._dispatchParameterNumberEvent("nrpn",this._nrpnBuffer[0].dataBytes[1],this._nrpnBuffer[1].dataBytes[1],e):(this._nrpnBuffer=[],this._rpnBuffer=[]))}_isRpnOrNrpnController(e){return e===6||e===38||e===96||e===97||e===98||e===99||e===100||e===101}_dispatchParameterNumberEvent(e,t,n,s){e=e==="nrpn"?"nrpn":"rpn";const i={target:s.target,timestamp:s.timestamp,message:s.message,parameterMsb:t,parameterLsb:n,value:l.from7bitToFloat(s.message.dataBytes[1]),rawValue:s.message.dataBytes[1]};e==="rpn"?i.parameter=Object.keys(o.REGISTERED_PARAMETERS).find(h=>o.REGISTERED_PARAMETERS[h][0]===t&&o.REGISTERED_PARAMETERS[h][1]===n):i.parameter=(t<<7)+n;const a=o.CONTROL_CHANGE_MESSAGES[s.message.dataBytes[0]].name;i.type=`${e}-${a}`,this.emit(i.type,i);const c=Object.assign({},i);c.type==="nrpn-dataincrement"?c.type="nrpn-databuttonincrement":c.type==="nrpn-datadecrement"?c.type="nrpn-databuttondecrement":c.type==="rpn-dataincrement"?c.type="rpn-databuttonincrement":c.type==="rpn-datadecrement"&&(c.type="rpn-databuttondecrement"),this.emit(c.type,c),i.type=e,i.subtype=a,this.emit(i.type,i)}getChannelModeByNumber(e){return d.validation&&(console.warn("The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class."),e=Math.floor(e)),l.getChannelModeByNumber(e)}getCcNameByNumber(e){if(d.validation&&(console.warn("The 'getCcNameByNumber()' method has been moved to the 'Utilities' class."),e=parseInt(e),!(e>=0&&e<=127)))throw new RangeError("Invalid control change number.");return l.getCcNameByNumber(e)}getNoteState(e){e instanceof O&&(e=e.identifier);const t=l.guessNoteNumber(e,d.octaveOffset+this.input.octaveOffset+this.octaveOffset);return this.notesState[t]}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get input(){return this._input}get number(){return this._number}get nrpnEventsEnabled(){return this.parameterNumberEventsEnabled}set nrpnEventsEnabled(e){this.validation&&(e=!!e),this.parameterNumberEventsEnabled=e}}/**
 * The `Message` class represents a single MIDI message. It has several properties that make it
 * easy to make sense of the binary data it contains.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class $e{constructor(e){this.rawData=e,this.data=Array.from(this.rawData),this.statusByte=this.rawData[0],this.rawDataBytes=this.rawData.slice(1),this.dataBytes=this.data.slice(1),this.isChannelMessage=!1,this.isSystemMessage=!1,this.command=void 0,this.channel=void 0,this.manufacturerId=void 0,this.type=void 0,this.statusByte<240?(this.isChannelMessage=!0,this.command=this.statusByte>>4,this.channel=(this.statusByte&15)+1):(this.isSystemMessage=!0,this.command=this.statusByte),this.isChannelMessage?this.type=l.getPropertyByValue(o.CHANNEL_MESSAGES,this.command):this.isSystemMessage&&(this.type=l.getPropertyByValue(o.SYSTEM_MESSAGES,this.command)),this.statusByte===o.SYSTEM_MESSAGES.sysex&&(this.dataBytes[0]===0?(this.manufacturerId=this.dataBytes.slice(0,3),this.dataBytes=this.dataBytes.slice(3,this.rawDataBytes.length-1),this.rawDataBytes=this.rawDataBytes.slice(3,this.rawDataBytes.length-1)):(this.manufacturerId=[this.dataBytes[0]],this.dataBytes=this.dataBytes.slice(1,this.dataBytes.length-1),this.rawDataBytes=this.rawDataBytes.slice(1,this.rawDataBytes.length-1)))}}/**
 * The `Input` class represents a single MIDI input port. This object is automatically instantiated
 * by the library according to the host's MIDI subsystem and does not need to be directly
 * instantiated. Instead, you can access all `Input` objects by referring to the
 * [`WebMidi.inputs`](WebMidi#inputs) array. You can also retrieve inputs by using methods such as
 * [`WebMidi.getInputByName()`](WebMidi#getInputByName) and
 * [`WebMidi.getInputById()`](WebMidi#getInputById).
 *
 * Note that a single MIDI device may expose several inputs and/or outputs.
 *
 * **Important**: the `Input` class does not directly fire channel-specific MIDI messages
 * (such as [`noteon`](InputChannel#event:noteon) or
 * [`controlchange`](InputChannel#event:controlchange), etc.). The [`InputChannel`](InputChannel)
 * object does that. However, you can still use the
 * [`Input.addListener()`](#addListener) method to listen to channel-specific events on multiple
 * [`InputChannel`](InputChannel) objects at once.
 *
 * @fires Input#opened
 * @fires Input#disconnected
 * @fires Input#closed
 * @fires Input#midimessage
 *
 * @fires Input#sysex
 * @fires Input#timecode
 * @fires Input#songposition
 * @fires Input#songselect
 * @fires Input#tunerequest
 * @fires Input#clock
 * @fires Input#start
 * @fires Input#continue
 * @fires Input#stop
 * @fires Input#activesensing
 * @fires Input#reset
 *
 * @fires Input#unknownmidimessage
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */class at extends y{constructor(e){super(),this._midiInput=e,this._octaveOffset=0,this.channels=[];for(let t=1;t<=16;t++)this.channels[t]=new it(this,t);this._forwarders=[],this._midiInput.onstatechange=this._onStateChange.bind(this),this._midiInput.onmidimessage=this._onMidiMessage.bind(this)}async destroy(){this.removeListener(),this.channels.forEach(e=>e.destroy()),this.channels=[],this._forwarders=[],this._midiInput&&(this._midiInput.onstatechange=null,this._midiInput.onmidimessage=null),await this.close(),this._midiInput=null}_onStateChange(e){let t={timestamp:d.time,target:this,port:this};e.port.connection==="open"?(t.type="opened",this.emit("opened",t)):e.port.connection==="closed"&&e.port.state==="connected"?(t.type="closed",this.emit("closed",t)):e.port.connection==="closed"&&e.port.state==="disconnected"?(t.type="disconnected",t.port={connection:e.port.connection,id:e.port.id,manufacturer:e.port.manufacturer,name:e.port.name,state:e.port.state,type:e.port.type},this.emit("disconnected",t)):e.port.connection==="pending"&&e.port.state==="disconnected"||console.warn("This statechange event was not caught: ",e.port.connection,e.port.state)}_onMidiMessage(e){const t=new $e(e.data),n={port:this,target:this,message:t,timestamp:e.timeStamp,type:"midimessage",data:t.data,rawData:t.data,statusByte:t.data[0],dataBytes:t.dataBytes};this.emit("midimessage",n),t.isSystemMessage?this._parseEvent(n):t.isChannelMessage&&this.channels[t.channel]._processMidiMessageEvent(n),this._forwarders.forEach(s=>s.forward(t))}_parseEvent(e){const t=Object.assign({},e);t.type=t.message.type||"unknownmidimessage",t.type==="songselect"&&(t.song=e.data[1]+1,t.value=e.data[1],t.rawValue=t.value),this.emit(t.type,t)}async open(){try{await this._midiInput.open()}catch(e){return Promise.reject(e)}return Promise.resolve(this)}async close(){if(!this._midiInput)return Promise.resolve(this);try{await this._midiInput.close()}catch(e){return Promise.reject(e)}return Promise.resolve(this)}getChannelModeByNumber(){d.validation&&console.warn("The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class.")}addListener(e,t,n={}){if(d.validation&&typeof n=="function"){let s=t!=null?[].concat(t):void 0;t=n,n={channels:s}}if(o.CHANNEL_EVENTS.includes(e)){n.channels===void 0&&(n.channels=o.MIDI_CHANNEL_NUMBERS);let s=[];return l.sanitizeChannels(n.channels).forEach(i=>{s.push(this.channels[i].addListener(e,t,n))}),s}else return super.addListener(e,t,n)}addOneTimeListener(e,t,n={}){return n.remaining=1,this.addListener(e,t,n)}on(e,t,n,s){return this.addListener(e,t,n,s)}hasListener(e,t,n={}){if(d.validation&&typeof n=="function"){let s=[].concat(t);t=n,n={channels:s}}return o.CHANNEL_EVENTS.includes(e)?(n.channels===void 0&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).every(s=>this.channels[s].hasListener(e,t))):super.hasListener(e,t)}removeListener(e,t,n={}){if(d.validation&&typeof n=="function"){let s=[].concat(t);t=n,n={channels:s}}if(n.channels===void 0&&(n.channels=o.MIDI_CHANNEL_NUMBERS),e==null)return l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s]&&this.channels[s].removeListener()}),super.removeListener();o.CHANNEL_EVENTS.includes(e)?l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].removeListener(e,t,n)}):super.removeListener(e,t,n)}addForwarder(e,t={}){let n;return e instanceof Me?n=e:n=new Me(e,t),this._forwarders.push(n),n}removeForwarder(e){this._forwarders=this._forwarders.filter(t=>t!==e)}hasForwarder(e){return this._forwarders.includes(e)}get name(){return this._midiInput.name}get id(){return this._midiInput.id}get connection(){return this._midiInput.connection}get manufacturer(){return this._midiInput.manufacturer}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get state(){return this._midiInput.state}get type(){return this._midiInput.type}get nrpnEventsEnabled(){return d.validation&&console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class."),!1}}/**
 * The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
 * simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.
 *
 * When using the WebMidi.js library, you should know that the `WebMidi` class has already been
 * instantiated. You cannot instantiate it yourself. If you use the **IIFE** version, you should
 * simply use the global object called `WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6
 * module) version, you get an already-instantiated object when you import the module.
 *
 * @fires WebMidi#connected
 * @fires WebMidi#disabled
 * @fires WebMidi#disconnected
 * @fires WebMidi#enabled
 * @fires WebMidi#error
 * @fires WebMidi#midiaccessgranted
 * @fires WebMidi#portschanged
 *
 * @extends EventEmitter
 * @license Apache-2.0
 */class ot extends y{constructor(){super(),this.defaults={note:{attack:l.from7bitToFloat(64),release:l.from7bitToFloat(64),duration:1/0}},this.interface=null,this.validation=!0,this._inputs=[],this._disconnectedInputs=[],this._outputs=[],this._disconnectedOutputs=[],this._stateChangeQueue=[],this._octaveOffset=0}async enable(e={},t=!1){if(l.isNode)try{window.navigator}catch{let c=await Object.getPrototypeOf(async function(){}).constructor(`
        let jzz = await import("jzz");
        return jzz.default;
        `)();global.navigator||(global.navigator={}),Object.assign(global.navigator,c)}if(this.validation=e.validation!==!1,this.validation&&(typeof e=="function"&&(e={callback:e,sysex:t}),t&&(e.sysex=!0)),this.enabled)return typeof e.callback=="function"&&e.callback(),Promise.resolve();const n={timestamp:this.time,target:this,type:"error",error:void 0},s={timestamp:this.time,target:this,type:"midiaccessgranted"},i={timestamp:this.time,target:this,type:"enabled"};try{typeof e.requestMIDIAccessFunction=="function"?this.interface=await e.requestMIDIAccessFunction({sysex:e.sysex,software:e.software}):this.interface=await navigator.requestMIDIAccess({sysex:e.sysex,software:e.software})}catch(a){return n.error=a,this.emit("error",n),typeof e.callback=="function"&&e.callback(a),Promise.reject(a)}this.emit("midiaccessgranted",s),this.interface.onstatechange=this._onInterfaceStateChange.bind(this);try{await this._updateInputsAndOutputs()}catch(a){return n.error=a,this.emit("error",n),typeof e.callback=="function"&&e.callback(a),Promise.reject(a)}return this.emit("enabled",i),typeof e.callback=="function"&&e.callback(),Promise.resolve(this)}async disable(){return this.interface&&(this.interface.onstatechange=void 0),this._destroyInputsAndOutputs().then(()=>{navigator&&typeof navigator.close=="function"&&navigator.close(),this.interface=null;let e={timestamp:this.time,target:this,type:"disabled"};this.emit("disabled",e),this.removeListener()})}getInputById(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return}if(t.disconnected){for(let n=0;n<this._disconnectedInputs.length;n++)if(this._disconnectedInputs[n]._midiInput&&this._disconnectedInputs[n].id===e.toString())return this._disconnectedInputs[n]}else for(let n=0;n<this.inputs.length;n++)if(this.inputs[n]._midiInput&&this.inputs[n].id===e.toString())return this.inputs[n]}getInputByName(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return;e=e.toString()}if(t.disconnected){for(let n=0;n<this._disconnectedInputs.length;n++)if(~this._disconnectedInputs[n].name.indexOf(e))return this._disconnectedInputs[n]}else for(let n=0;n<this.inputs.length;n++)if(~this.inputs[n].name.indexOf(e))return this.inputs[n]}getOutputByName(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return;e=e.toString()}if(t.disconnected){for(let n=0;n<this._disconnectedOutputs.length;n++)if(~this._disconnectedOutputs[n].name.indexOf(e))return this._disconnectedOutputs[n]}else for(let n=0;n<this.outputs.length;n++)if(~this.outputs[n].name.indexOf(e))return this.outputs[n]}getOutputById(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return}if(t.disconnected){for(let n=0;n<this._disconnectedOutputs.length;n++)if(this._disconnectedOutputs[n]._midiOutput&&this._disconnectedOutputs[n].id===e.toString())return this._disconnectedOutputs[n]}else for(let n=0;n<this.outputs.length;n++)if(this.outputs[n]._midiOutput&&this.outputs[n].id===e.toString())return this.outputs[n]}noteNameToNumber(e){return this.validation&&console.warn("The noteNameToNumber() method is deprecated. Use Utilities.toNoteNumber() instead."),l.toNoteNumber(e,this.octaveOffset)}getOctave(e){return this.validation&&(console.warn("The getOctave()is deprecated. Use Utilities.getNoteDetails() instead"),e=parseInt(e)),!isNaN(e)&&e>=0&&e<=127?l.getNoteDetails(l.offsetNumber(e,this.octaveOffset)).octave:!1}sanitizeChannels(e){return this.validation&&console.warn("The sanitizeChannels() method has been moved to the utilities class."),l.sanitizeChannels(e)}toMIDIChannels(e){return this.validation&&console.warn("The toMIDIChannels() method has been deprecated. Use Utilities.sanitizeChannels() instead."),l.sanitizeChannels(e)}guessNoteNumber(e){return this.validation&&console.warn("The guessNoteNumber() method has been deprecated. Use Utilities.guessNoteNumber() instead."),l.guessNoteNumber(e,this.octaveOffset)}getValidNoteArray(e,t={}){return this.validation&&console.warn("The getValidNoteArray() method has been moved to the Utilities.buildNoteArray()"),l.buildNoteArray(e,t)}convertToTimestamp(e){return this.validation&&console.warn("The convertToTimestamp() method has been moved to Utilities.toTimestamp()."),l.toTimestamp(e)}async _destroyInputsAndOutputs(){let e=[];return this.inputs.forEach(t=>e.push(t.destroy())),this.outputs.forEach(t=>e.push(t.destroy())),Promise.all(e).then(()=>{this._inputs=[],this._outputs=[]})}_onInterfaceStateChange(e){this._updateInputsAndOutputs();let t={timestamp:e.timeStamp,type:e.port.state,target:this};if(e.port.state==="connected"&&e.port.connection==="open"){e.port.type==="output"?t.port=this.getOutputById(e.port.id):e.port.type==="input"&&(t.port=this.getInputById(e.port.id)),this.emit(e.port.state,t);const n=Object.assign({},t);n.type="portschanged",this.emit(n.type,n)}else if(e.port.state==="disconnected"&&e.port.connection==="pending"){e.port.type==="input"?t.port=this.getInputById(e.port.id,{disconnected:!0}):e.port.type==="output"&&(t.port=this.getOutputById(e.port.id,{disconnected:!0})),this.emit(e.port.state,t);const n=Object.assign({},t);n.type="portschanged",this.emit(n.type,n)}}async _updateInputsAndOutputs(){return Promise.all([this._updateInputs(),this._updateOutputs()])}async _updateInputs(){if(!this.interface)return;for(let t=this._inputs.length-1;t>=0;t--){const n=this._inputs[t];Array.from(this.interface.inputs.values()).find(i=>i===n._midiInput)||(this._disconnectedInputs.push(n),this._inputs.splice(t,1))}let e=[];return this.interface.inputs.forEach(t=>{if(!this._inputs.find(n=>n._midiInput===t)){let n=this._disconnectedInputs.find(s=>s._midiInput===t);n||(n=new at(t)),this._inputs.push(n),e.push(n.open())}}),Promise.all(e)}async _updateOutputs(){if(!this.interface)return;for(let t=this._outputs.length-1;t>=0;t--){const n=this._outputs[t];Array.from(this.interface.outputs.values()).find(i=>i===n._midiOutput)||(this._disconnectedOutputs.push(n),this._outputs.splice(t,1))}let e=[];return this.interface.outputs.forEach(t=>{if(!this._outputs.find(n=>n._midiOutput===t)){let n=this._disconnectedOutputs.find(s=>s._midiOutput===t);n||(n=new le(t)),this._outputs.push(n),e.push(n.open())}}),Promise.all(e)}get enabled(){return this.interface!==null}get inputs(){return this._inputs}get isNode(){return this.validation&&console.warn("WebMidi.isNode has been deprecated. Use Utilities.isNode instead."),l.isNode}get isBrowser(){return this.validation&&console.warn("WebMidi.isBrowser has been deprecated. Use Utilities.isBrowser instead."),l.isBrowser}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get outputs(){return this._outputs}get supported(){return typeof navigator<"u"&&!!navigator.requestMIDIAccess}get sysexEnabled(){return!!(this.interface&&this.interface.sysexEnabled)}get time(){return performance.now()}get version(){return"3.1.14"}get flavour(){return"esm"}get CHANNEL_EVENTS(){return this.validation&&console.warn("The CHANNEL_EVENTS enum has been moved to Enumerations.CHANNEL_EVENTS."),o.CHANNEL_EVENTS}get MIDI_SYSTEM_MESSAGES(){return this.validation&&console.warn("The MIDI_SYSTEM_MESSAGES enum has been moved to Enumerations.SYSTEM_MESSAGES."),o.SYSTEM_MESSAGES}get MIDI_CHANNEL_MODE_MESSAGES(){return this.validation&&console.warn("The MIDI_CHANNEL_MODE_MESSAGES enum has been moved to Enumerations.CHANNEL_MODE_MESSAGES."),o.CHANNEL_MODE_MESSAGES}get MIDI_CONTROL_CHANGE_MESSAGES(){return this.validation&&console.warn("The MIDI_CONTROL_CHANGE_MESSAGES enum has been replaced by the Enumerations.CONTROL_CHANGE_MESSAGES array."),o.MIDI_CONTROL_CHANGE_MESSAGES}get MIDI_REGISTERED_PARAMETER(){return this.validation&&console.warn("The MIDI_REGISTERED_PARAMETER enum has been moved to Enumerations.REGISTERED_PARAMETERS."),o.REGISTERED_PARAMETERS}get NOTES(){return this.validation&&console.warn("The NOTES enum has been deprecated."),["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]}}const d=new ot;d.constructor=null;const lt=[{name:"Laser2",url:"/samples/Laser2.wav",padIndex:0},{name:"collect1",url:"/samples/collect1.wav",padIndex:1},{name:"bounce",url:"/samples/bounce.wav",padIndex:2},{name:"bwah",url:"/samples/bwah.wav",padIndex:3},{name:"slap",url:"/samples/slap.wav",padIndex:15}];var dt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,W=(r,e,t,n)=>{for(var s=n>1?void 0:n?ct(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(n?a(e,t,s):a(s))||s);return n&&s&&dt(e,t,s),s};let T=class extends w{constructor(){super(...arguments),this.index=0,this.active=!1,this.keyBinding="",this.sampleName=""}render(){return E`
      <sp-button
        class="pad ${this.active?"active":""}"
        @click=${this._handleClick}
      >
        <span class="key-binding">${this.keyBinding}</span>
        ${this.sampleName?E`<span class="sample-name">${this.sampleName}</span>`:""}
      </sp-button>
    `}_handleClick(){this.dispatchEvent(new CustomEvent("pad-click",{bubbles:!0,composed:!0}))}};T.styles=U`
    :host {
      display: block;
    }

    .pad {
      width: 100%;
      aspect-ratio: 1;
      background: #3a3a3a;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.1s;
      position: relative;
      color: #fff;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .pad:hover {
      background: #4a4a4a;
    }

    .pad.active {
      background: #5a5a5a;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      transform: scale(0.95);
    }

    .key-binding {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 0.8em;
      opacity: 0.7;
    }

    .sample-name {
      font-size: 0.7em;
      opacity: 0.8;
      text-align: center;
      margin-top: 0.5em;
    }
  `;W([f({type:Number})],T.prototype,"index",2);W([f({type:Boolean})],T.prototype,"active",2);W([f({type:String})],T.prototype,"keyBinding",2);W([f({type:String})],T.prototype,"sampleName",2);T=W([L("drum-pad")],T);var ht=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,re=(r,e,t,n)=>{for(var s=n>1?void 0:n?ut(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(n?a(e,t,s):a(s))||s);return n&&s&&ht(e,t,s),s};let D=class extends w{constructor(){super(...arguments),this.mode="performance",this.currentStep=0,this.sampleNames=new Map}_getPadButton(r){const e=this.shadowRoot?.querySelectorAll("drum-pad");return!e||!e[r]?null:e[r].shadowRoot?.querySelector("sp-button")||null}triggerPadDown(r){const e=this._getPadButton(r);e&&(e.active=!0)}triggerPadUp(r){const e=this._getPadButton(r);e&&(e.active=!1)}render(){const r=["1","2","3","4","q","w","e","r","a","s","d","f","z","x","c","v"];return E`
      ${Array(16).fill(0).map((e,t)=>E`
            <drum-pad
              .index=${t}
              .keyBinding=${r[t]} 
              .sampleName=${this.sampleNames.get(t)||""}
              .active=${this.mode==="sequencer"&&t===this.currentStep}
              @pad-click=${()=>this._handlePadClick(t)}
            ></drum-pad>
          `)}
    `}_handlePadClick(r){this.dispatchEvent(new CustomEvent("pad-triggered",{detail:{index:r},bubbles:!0,composed:!0}))}};D.styles=U`
    :host {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      padding: 1rem;
      background: #1a1a1a;
      border-radius: 8px;
      max-width: 800px;
      max-height: 800px;
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
    }
  `;re([f({type:String})],D.prototype,"mode",2);re([f({type:Number})],D.prototype,"currentStep",2);re([f({type:Object})],D.prototype,"sampleNames",2);D=re([L("pad-grid")],D);var ft=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,H=(r,e,t,n)=>{for(var s=n>1?void 0:n?pt(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(n?a(e,t,s):a(s))||s);return n&&s&&ft(e,t,s),s};let A=class extends w{constructor(){super(...arguments),this.label="",this.active=!1,this.variant="square",this.size="medium",this.highlight=""}render(){return E`
      <button
        class="${[this.variant,this.size,this.active?"active":""].filter(Boolean).join(" ")}"
        aria-pressed="${this.active}"
        style="${this.highlight?`--sp-button-highlight: ${this.highlight};`:""}"
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `}_handleClick(r){this.dispatchEvent(new CustomEvent("sp-click",{detail:{originalEvent:r},bubbles:!0,composed:!0}))}};A.styles=[U`
    :host {
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    button {
      background: var(--sp-button-color, hsl(214.29deg 5.53% 53.08%));
      color: var(--sp-button-text, #333333);
      border: none;
      cursor: pointer;
      font-weight: 900;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    transition:
        background 80ms ease,
        box-shadow 80ms ease,
        transform 80ms ease;
      box-shadow: 
        0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2)),
        inset 0 1px 3px rgba(255, 255, 255, 0.8),
        inset 0 -2px 1px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
      width: 100%;
      height: 100%;
    }

    button.square {
      border-radius: 4px;
      padding: 4px 4px;
    }

    button.round {
      border-radius: 50%;
      aspect-ratio: 1;
      padding: 0;
    }

    button.small {
      font-size: 0.8rem;
      min-width: 32px;
      min-height: 32px;
    }

    button.medium {
      font-size: 1rem;
      min-width: 48px;
      min-height: 48px;
    }

    button.large {
      font-size: 1.2rem;
      min-width: 64px;
      min-height: 64px;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 
        0 4px 8px var(--sp-button-shadow, rgba(0, 0, 0, 0.2)),
        inset 0 1px 3px rgba(255, 255, 255, 0.8),
        inset 0 -2px 3px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
    }
button:active,
    button.active {
      transform: translateY(1px);
      background: linear-gradient(to bottom, 
        var(--sp-button-color, #e0e0e0) 0%, 
        #d0d0d0 100%);
      box-shadow: 
        inset 0 0 200px -5px var(--sp-button-active-glow, rgba(255, 107, 107, 0.7)),
        inset 0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
    }

    button:focus-visible {
      outline: 2px solid var(--sp-button-focus-color, #4a90e2);
      outline-offset: 2px;
      box-shadow: 
        0 0 0 4px var(--sp-button-focus-ring, rgba(74, 144, 226, 0.25)),
        0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
    }

    button.active {
      --sp-button-active-glow: var(--sp-button-highlight, rgba(255, 107, 107, 0.7));
    }
  `];H([f({type:String})],A.prototype,"label",2);H([f({type:Boolean})],A.prototype,"active",2);H([f({type:String})],A.prototype,"variant",2);H([f({type:String})],A.prototype,"size",2);H([f({type:String})],A.prototype,"highlight",2);A=H([L("sp-button")],A);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=r=>r.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt={CHILD:2},gt=r=>(...e)=>({_$litDirective$:r,values:e});class Et{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=(r,e)=>{const t=r._$AN;if(t===void 0)return!1;for(const n of t)n._$AO?.(e,!1),V(n,e);return!0},te=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},Pe=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),wt(e)}};function yt(r){this._$AN!==void 0?(te(this),this._$AM=r,Pe(this)):this._$AM=r}function _t(r,e=!1,t=0){const n=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(n))for(let i=t;i<n.length;i++)V(n[i],!1),te(n[i]);else n!=null&&(V(n,!1),te(n));else V(this,r)}const wt=r=>{r.type==bt.CHILD&&(r._$AP??=_t,r._$AQ??=yt)};class vt extends Et{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Pe(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(V(this,e),te(this))}setValue(e){if(mt(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=()=>new St;class St{}const ae=new WeakMap,At=gt(class extends vt{render(r){return m}update(r,[e]){const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=r.options?.host,this.rt(this.ct=r.element)),m}rt(r){if(this.isConnected||(r=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=ae.get(e);t===void 0&&(t=new WeakMap,ae.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,r),r!==void 0&&this.G.call(this.ht,r)}else this.G.value=r}get lt(){return typeof this.G=="function"?ae.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Mt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,K=(r,e,t,n)=>{for(var s=n>1?void 0:n?Ct(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(n?a(e,t,s):a(s))||s);return n&&s&&Mt(e,t,s),s};let R=class extends w{constructor(){super(),this.sampleUrl="",this.waveColor="#4d98b3ff",this.height=100,this.playheadPosition=0,this.canvasRef=Nt(),this.peaks=[],this.resizeObserver=null,this.isLoading=!1}render(){return E`
      <canvas height="${this.height}" ${At(this.canvasRef)}></canvas>
      ${this.isLoading?E`<div class="message">Loading audio...</div>`:""}
    `}firstUpdated(){this._fetchAudio(),this.resizeObserver=new ResizeObserver(()=>this._drawWaveform()),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(r){r.has("sampleUrl")&&this.sampleUrl&&this._fetchAudio()}async _fetchAudio(){if(this.sampleUrl){this.isLoading=!0,this.requestUpdate();try{const e=await(await fetch(this.sampleUrl)).arrayBuffer(),n=await new AudioContext().decodeAudioData(e);this.peaks=this._getPeaks(n.getChannelData(0),1e3)}catch(r){console.error("Error loading audio:",r)}finally{this.isLoading=!1,requestAnimationFrame(()=>this._drawWaveform()),this.requestUpdate()}}}_getPeaks(r,e){const t=Math.floor(r.length/e),n=new Array(e);for(let s=0;s<e;s++){let i=0;for(let a=s*t;a<(s+1)*t;a++){const c=Math.abs(r[a]);c>i&&(i=c)}n[s]=i}return n}_drawWaveform(){const r=this.canvasRef.value;if(!r||this.peaks.length===0)return;const e=r.getContext("2d");if(!e)return;const t=this.offsetWidth||r.clientWidth,n=this.height;r.width=t,r.height=n;const s=n/2,i=t/this.peaks.length;if(this.playheadPosition>0&&this.playheadPosition<1){const a=this.playheadPosition*t;e.fillStyle="red",e.fillRect(a,0,2,n)}e.clearRect(0,0,t,n),e.fillStyle=this.waveColor;for(let a=0;a<this.peaks.length;a++){const c=this.peaks[a]*n;e.fillRect(a*i,s-c/2,1,c)}}};R.styles=U`
    :host {
      display: block;
      width: 100%;
      height: 80px;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: transparent;
        border-radius: 50%;

    }
    canvas {
      width: 100%;
      display: block;
    }
    .message {
      text-align: center;
      color: #9ca3af;
      padding: 1.5rem;
    }
  `;K([f({type:String})],R.prototype,"sampleUrl",2);K([f({type:String})],R.prototype,"waveColor",2);K([f({type:Number})],R.prototype,"height",2);K([f({type:Number})],R.prototype,"playheadPosition",2);R=K([L("sample-waveform")],R);var xt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,X=(r,e,t,n)=>{for(var s=n>1?void 0:n?It(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(n?a(e,t,s):a(s))||s);return n&&s&&xt(e,t,s),s};let $=class extends w{constructor(){super(...arguments),this.currentPadIndex=-1,this.currentSampleName="",this.bpm=120,this.mode="performance",this._sampleEditState="off",this._timeBpmState="off"}render(){return E`
    <div class="panel-container">
      <div class="knobs">
        <button class="knob volume" title="CTRL 0"></button>
        <button class="knob" title="CTRL 1"></button>
        <button class="knob" title="CTRL 2"></button>
        <button class="knob" title="CTRL 3"></button>
      </div>

      <div class="button-screen-group fxr">
        <div class="fx-buttons --left">
          <sp-button class="fx-button fx1" title="FX1">FX1</sp-button>
          <sp-button class="fx-button fx2" title="FX2">FX2</sp-button>
          <sp-button class="fx-button fx3" title="FX3">FX3</sp-button>
        </div>

        <div class="screen">
  <span class="sample-label">Current Sample</span>
  ${this.currentSampleName?E`
      <span class="sample-name">${this.currentSampleName}</span>
      <sample-waveform
        .sampleUrl=${`/samples/${this.currentSampleName}.wav`}
        .sampleName=${this.currentSampleName}
        data-sample-index=${this.currentPadIndex}
      ></sample-waveform>
    `:E`<span class="no-sample">No sample selected</span>`}
</div>

        <div class="fx-buttons">
          <sp-button class="fx-button fx4" title="FX4">FX4</sp-button>
          <sp-button class="fx-button fx5" title="FX5">FX5</sp-button>
          <sp-button class="fx-button fx6" title="FX6">FX6</sp-button>
        </div>
      </div>
    </div>

    <section class="lower-button-group">
      <div class="button-row fxr">
        <div class="pattern-sequencer button-group fxr">
          <sp-button class=" pattern-select-button" title="Pattern Select">PATTERN SELECT</sp-button>
          <sp-button class="length-button" title="Length">LENGTH</sp-button>
          <sp-button class="quantize-button" title="Quantize">QUANTIZE</sp-button>
        </div>

        <div class="sample-edit-controls fxc">
          <label class="sample-edit-label" for="sample-edit-buttons">Sample Edit</label>
          <div class="sample-edit button-group fxr">
            <sp-button @click=${this._handleTimeBpmClick} class="time-bpm" title="time/bpm">${this._timeBpmState}</sp-button>
            <sp-button @click=${this._handleSampleEditClick} class="start-end-toggle" title="Set Start">${this._sampleEditState}</sp-button>
          </div>
          </div>
          <sp-button class="tap-tempo" variant="round" title="Tap Tempo">TAP TEMPO</sp-button>
          </div>
          
      <div class="button-row fxr">
        <div class="sampling button-group fxr">
          <sp-button class="delete-button" title="Delete">DEL</sp-button>
          <sp-button class="record-button" title="Record">REC</sp-button>
          <sp-button class="resample-button" title="Resample">RESAMPLE</sp-button>
        </div>

        <div class="sample-mode control-group fxc">
          <label class="sample-mode-label" for="sample-mode">Sample Mode</label>
          <div class="sample-mode button-group fxr">
            <sp-button class="lofi-mode" title="">LOFI</sp-button>
            <sp-button class="stereo-mode" title="">STEREO</sp-button>
            <sp-button class="gate-mode" title="">GATE</sp-button>
            <sp-button class="loop-mode" title="">LOOP</sp-button>
            <sp-button class="reverse-mode" title="">REVERSE</sp-button>
          </div>
        </div>
      </div>

      <div class="button-row fxr">
        <div class="sampling button-group fxr">
          <sp-button class="cancel-button" title="Cancel">CANCEL</sp-button>
          <sp-button class="remain-button" title="Remain">REMAIN</sp-button>
          <sp-button class="mark-button" title="Mark">MARK</sp-button>
        </div>

        <div class="bank fxc">
          <label class="bank-label" for="bank-buttons">BANK</label>
          <div class="bank button-group fxr">
            <sp-button class="bank-button" title="bank A/F">A/F</sp-button>
            <sp-button class="bank-button" title="bank B/G">B/G</sp-button>
            <sp-button class="bank-button" title="bank C/H">C/H</sp-button>
            <sp-button class="bank-button" title="bank D/I">D/I</sp-button>
            <sp-button class="bank-button" title="bank E/J">E/J</sp-button>
          </div>
        </div>


      </div>
    </section>
  `}_handleSampleEditClick(r){console.log("switching sample edit screen",r)}_handleTimeBpmClick(r){const e=r.target,t=Number(e.value);this.dispatchEvent(new CustomEvent("bpm-change",{detail:{bpm:t},bubbles:!0,composed:!0}))}};$.styles=U`
    :host {
      display: block;
      background: #2a2a2a;
      padding: 2rem;
      margin-bottom: 1rem;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      
    }

    .panel-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      justify-content: center;
    }

    .knobs {
    width: fit-content;
      display: flex;
      justify-content: space-between;
      background: #1b1b1bff;
      padding: 2rem;
      border-radius: 48px;
      margin-bottom: 1rem;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

        @media (min-width: 1024px) { /* big screens */
        :host
    .knobs {
      flex-direction: column;
    }

  }

    .knob {
      width: 60px;
      height: 60px;
      background: #1a1a1a;
      border-radius: 50%;
      border: none;
      position: relative;
      cursor: pointer;
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.4),
        inset 0 2px 4px rgba(255,255,255,0.1);
    }

    .sample-edit-controls {
      align-self: flex-end;
    }

    .knob::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      background: #fff;
      transform-origin: bottom;
      transform: translate(-50%, -100%) rotate(0deg);
    }

    .fx-buttons {
      display:flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      width: 140px;
      flex:1;
    }
      .--left {
      align-items: flex-end;
      }


      .tap-tempo {
        border-radius: 100%;
        width: 70px;
        height: 70px;
        text-wrap-mode: wrap;
      }
    .fxr {
      display: flex;
      flex-wrap: nowrap;
    }

    .button-screen-group {
      padding: 0 2rem;
    }
    .fxc {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lower-button-group {
    }

    .fx-button {
      width: 100%;
      max-width: 80px;
      height: 40px;
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8em;
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.4),
        inset 0 2px 4px rgba(255,255,255,0.1);
      transition: all 0.1s;
    }

    .fx2 {
      margin-right: 1.5rem;
    }

    .fx5 {
      margin-left: 1.5rem;
    }

    .fx-button:active {
      transform: translateY(1px);
      box-shadow: 
        0 1px 2px rgba(0,0,0,0.4),
        inset 0 1px 2px rgba(255,255,255,0.1);
    }

    .sample-edit-label {
      flex-grow: 1;
      text-decoration: 
    }

    .screen {
      font-family: monospace;
      background: #1a1a1a;
      flex: 1;
      border-radius: 50%;
      padding: 0rem;
      aspect-ratio: 1;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      border-radius: 50%;
    }

    .bank .button-group {
      border: transparent;
      padding: 1.2rem;
      background-color: #1a1a1a;
    }

    .sample-mode {
    margin: 0.5rem;
      border: transparent;
      background-color: #3c4a4eff;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      padding: 0.4rem;
      height: 100%;
    }
      .sampling .button-group {
      padding: 1rem;}

    .pattern-sequencer-controls {
      font-size: 0.7em;}

    .sample-label {
      font-size: 0.8em;
      color: #888;
    }

    .button-row {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap:1rem;}

    .sample-name {
      font-size: 1.2em;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
      label {
            text-transform: uppercase;
}

    .record-button, .resample-button {
      border: 1px double red;
    }

    .no-sample {
      color: #666;
    }

    @media (min-width: 600px) {
      .button-row {
        flex-direction: row;
      }
    }

     @media (min-width: 1024px) {
    .panel-container {
      flex-direction: row;
      align-items: center;
    }
      .pattern-select-button  {
        width: 50%;
        text-wrap-mode: wrap;
      }

    control-panel {
      flex: 1; /* take left side */
    }

    pad-grid {
      flex: 1; /* take right side */
      margin-left: 1rem; /* optional spacing */
    }
  }
  `;X([f({type:Number})],$.prototype,"currentPadIndex",2);X([f({type:String})],$.prototype,"currentSampleName",2);X([f({type:Number})],$.prototype,"bpm",2);X([f({type:String})],$.prototype,"mode",2);$=X([L("control-panel")],$);class Tt extends EventTarget{constructor(){super(),this.activePlaybacks=new Map,this.animationFrameId=null,this.bpm=120,this.isBpmSyncEnabled=!0,this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.startProgressLoop()}setPlaybackSettings(e,t){this.bpm=e,this.isBpmSyncEnabled=t}play(e,t,n=1){if(!this.audioContext)return console.error("AudioContext is not available."),"";const s=`${Date.now()}-${Math.random().toString(36).substr(2,9)}`,i=this.audioContext.createBufferSource();i.buffer=e,i.playbackRate.value=n,i.connect(this.audioContext.destination);const a=e.duration;let c=0,h=a;this.isBpmSyncEnabled?(h=a/n,c=this.audioContext.currentTime):(c=this.audioContext.currentTime,h=a/n),i.start(c);const p={id:s,source:i,buffer:e,padIndex:t,startTime:c,duration:h,bufferDuration:a,playbackRate:n,progress:0};return this.activePlaybacks.set(s,p),i.onended=()=>{this.dispatchEvent(new CustomEvent("playback-ended",{detail:{id:s,padIndex:t}})),this.activePlaybacks.delete(s),this.checkProgressLoop()},this.dispatchEvent(new CustomEvent("playback-started",{detail:{id:s,padIndex:t,startTime:c}})),s}stop(e){const t=this.activePlaybacks.get(e);t&&(t.source.stop(),this.activePlaybacks.delete(e),this.dispatchEvent(new CustomEvent("playback-stopped",{detail:{id:e,padIndex:t.padIndex}})))}stopAll(){this.activePlaybacks.forEach((e,t)=>{e.source.stop(),this.dispatchEvent(new CustomEvent("playback-stopped",{detail:{id:t,padIndex:e.padIndex}}))}),this.activePlaybacks.clear(),this.checkProgressLoop()}updateSettings(e,t){this.bpm=e,this.isBpmSyncEnabled=t}startProgressLoop(){this.animationFrameId===null&&(this.animationFrameId=requestAnimationFrame(()=>this.updateProgress()))}stopProgressLoop(){this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}updateProgress(){const e=this.audioContext.currentTime;let t=!1;this.activePlaybacks.forEach((n,s)=>{t=!0;const i=e-n.startTime;n.progress=Math.min(i/n.duration,1),this.dispatchEvent(new CustomEvent("playback-progress",{detail:{id:s,padIndex:n.padIndex,progress:n.progress,currentTime:i,duration:n.duration,bufferDuration:n.bufferDuration,playbackRate:n.playbackRate,startTime:n.startTime}}))}),t?this.animationFrameId=requestAnimationFrame(()=>this.updateProgress()):this.stopProgressLoop()}checkProgressLoop(){this.activePlaybacks.size===0?this.stopProgressLoop():this.startProgressLoop()}getCurrentTime(){return this.audioContext.currentTime}getBpm(){return this.bpm}getAudioContext(){return this.audioContext}getIsBpmSyncEnabled(){return this.isBpmSyncEnabled}getActivePlaybacks(){return Array.from(this.activePlaybacks.values())}}let oe=null;function Rt(){return oe||(oe=new Tt),oe}var $t=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,_=(r,e,t,n)=>{for(var s=n>1?void 0:n?Pt(e,t):e,i=r.length-1,a;i>=0;i--)(a=r[i])&&(s=(n?a(e,t,s):a(s))||s);return n&&s&&$t(e,t,s),s};let g=class extends w{constructor(){super(...arguments),this.samples=new Map,this.sampleNames=new Map,this.midiEnabled=!1,this.midiInputs=[],this.isLoading=!0,this.currentPadIndex=-1,this.bpm=120,this.currentMode="performance",this.currentStep=0,this.keyMap={1:0,2:1,3:2,4:3,q:4,w:5,e:6,r:7,a:8,s:9,d:10,f:11,z:12,x:13,c:14,v:15},this._backPanelVisible=!1,this._handlePlaybackStarted=r=>{const{id:e,padIndex:t,startTime:n}=r.detail;console.log(`Playback started: ID=${e}, Pad=${t}, Time=${n}`)},this._handlePlaybackProgress=r=>{const{id:e,padIndex:t,progress:n,currentTime:s}=r.detail;console.log(`Playback progress: ID=${e}, Pad=${t}, Progress=${n.toFixed(2)}, current time: ${s}`);const i=this.shadowRoot?.querySelector("control-panel");if(i){const c=i.shadowRoot?.querySelector("sample-waveform");c&&c.dataset.sampleIndex===t.toString()&&(c.playheadPosition=n,c.requestUpdate())}},this._handlePlaybackEnded=r=>{const{id:e,padIndex:t}=r.detail;console.log(`Playback ended: ID=${e}, Pad=${t}`)}}connectedCallback(){super.connectedCallback(),this.initAudioPlaybackManager(),this.initMidi(),this.initKeyboardEvents()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeyDown),window.removeEventListener("keyup",this._handleKeyUp)}_getPadGrid(){return this.shadowRoot?.querySelector("pad-grid")??null}initKeyboardEvents(){this._handleKeyDown=this._handleKeyDown.bind(this),this._handleKeyUp=this._handleKeyUp.bind(this),window.addEventListener("keydown",this._handleKeyDown),window.addEventListener("keyup",this._handleKeyUp)}_handleKeyDown(r){if(r.repeat)return;const e=r.key.toLowerCase();if(e in this.keyMap){r.preventDefault();const t=this.keyMap[e];this._handlePadTrigger(new CustomEvent("pad-triggered",{detail:{index:t}})),this._getPadGrid()?.triggerPadDown(t)}}_handleKeyUp(r){const e=r.key.toLowerCase();if(e in this.keyMap){r.preventDefault();const t=this.keyMap[e];this._getPadGrid()?.triggerPadUp(t)}}initAudioPlaybackManager(){this.audioPlaybackManager=Rt(),this.audioPlaybackManager.addEventListener("playback-progress",this._handlePlaybackProgress),this.audioPlaybackManager.addEventListener("playback-started",this._handlePlaybackStarted),this.audioPlaybackManager.addEventListener("playback-ended",this._handlePlaybackEnded),this.audioPlaybackManager.setPlaybackSettings(this.bpm,this.currentMode==="sequencer"),console.log("AudioPlaybackManager initialized"),this.loadDefaultSamples()}async loadDefaultSamples(){this.isLoading=!0;try{await Promise.all(lt.map(async r=>{try{const t=await(await fetch(r.url)).arrayBuffer();if(!this.audioPlaybackManager)throw new Error("AudioPlaybackManager not initialized");const n=await this.audioPlaybackManager.getAudioContext().decodeAudioData(t);this.samples.set(r.padIndex,n),this.sampleNames.set(r.padIndex,r.name)}catch(e){console.error(`Failed to load sample ${r.name}:`,e)}}))}catch(r){console.error("Failed to load samples:",r)}this.isLoading=!1}async initMidi(){try{await d.enable(),this.midiEnabled=!0,this.midiInputs=d.inputs,console.log("MIDI enabled, available inputs:",this.midiInputs),this.midiInputs.forEach(r=>{r.addListener("noteon",e=>{const t=e.note.number%16;this._handlePadTrigger(new CustomEvent("pad-triggered",{detail:{index:t}}))})})}catch(r){console.error("Failed to initialize MIDI:",r)}}updated(r){if((r.has("bpm")||r.has("currentMode"))&&this.audioPlaybackManager){const e=this.currentMode==="sequencer";this.audioPlaybackManager.updateSettings(this.bpm,e)}}render(){return E`
    <div class="app-body">
    
      <div class="sp-unit ${this._backPanelVisible?"sp-unit-active":""}">

        <div class="back-panel ${this._backPanelVisible?" back-panel-active":""}">
          <div class="controls">
            <div class="control-row">
              <label>
                BPM:
                <input type="number" min="60" max="200" .value=${this.bpm} @change=${this._handleBpmChange} />
              </label>
              <select .value=${this.currentMode} @change=${this._handleModeChange}>
                <option value="performance">Performance</option>
                <option value="sequencer">Sequencer</option>
              </select>
            </div>
            <div class="midi-status">
              MIDI: ${this.midiEnabled?"Enabled":"Disabled"}
              ${this.midiEnabled?E` (${this.midiInputs.length} device${this.midiInputs.length!==1?"s":""} connected)`:""}
            </div>
          </div>
        </div>

        <div class="header-controls-wrapper"> 
          <button class="back-panel-button" @click=${()=>this.toggleBackVisible()}>${this._backPanelVisible?"hide back":"show back"}</button>
          <h2 class="title">FL-404</h2>

          <control-panel .currentPadIndex=${this.currentPadIndex} .isLoading=${this.isLoading}
            .currentSampleName=${this.sampleNames.get(this.currentPadIndex)||""} .bpm=${this.bpm}
            .mode=${this.currentMode} @bpm-change=${this._handleBpmChange} @mode-change=${this._handleModeChange}>
          </control-panel>
        </div>

      </div> 
      
      <pad-grid .mode=${this.currentMode} .currentStep=${this.currentStep} .sampleNames=${this.sampleNames}
        @pad-triggered=${this._handlePadTrigger}></pad-grid>
    </div>
    `}toggleBackVisible(){this._backPanelVisible=!this._backPanelVisible}_handleBpmChange(r){const e=r.target;this.bpm=Number(e.value)}_handleModeChange(r){const e=r.target;this.currentMode=e.value}_handlePadTrigger(r){const{index:e}=r.detail;this.currentPadIndex=e;const t=this.samples.get(e);t&&this.audioPlaybackManager&&this.audioPlaybackManager.play(t,e,1)}};g.styles=U`
    * {
      box-sizing: border-box;
    }
  
    :host {
      /* --- MODIFIED --- */
      /* Remove chassis styling from here */
      /* The host is just a layout block now */
      display: block;
      color: var(--sp-foreground);
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      /* Removed background, border-radius, box-shadow, padding-top */
    }

    .header-controls-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      position: relative; 
      transform-origin: top;
      backface-visibility: hidden; 
      z-index: 2; 
      padding-top: 0.8rem;
      background: var(--sp-background);
      border-radius: 24px;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

    @media (min-width: 1024px) {
      pad-grid {
        border:2px solid green; 
      }
    }

    .back-panel {
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      bottom: 100%; 
      
      transform: rotateX(90deg); /* Start folded flat "back" */
      transform-origin: bottom;   /* Hinge at its bottom edge (the seam) */
      transition: transform 0.2s ease;
      
      pointer-events: none;
      backface-visibility: hidden; 
      z-index: 1; 
      background: var(--sp-background-darker, #222); 
      padding: 1rem; 
      
      border-radius: 24px;
      border-radius: 24px;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

    .back-panel-active {
      transform: rotateX(0deg); /* Unfold into view */
      pointer-events: all;
    }


    .app-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      perspective: 1000px; 
    }

    .sp-unit {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.2s ease;
      transform: rotateX(0deg);
      transform-origin: bottom;
    }

    .sp-unit-active {
      transform: rotateX(-6deg) translateY(206px);
    }

    .back-panel-button {
      align-self: flex-end;
    }


    .title {
      font-size: 2rem;
    margin: 0;
      font-family: 'Times New Roman', Times, serif;
    }


    .controls {
      margin-bottom: 1rem;
    }

    .control-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .midi-status {
      font-size: 0.9rem;
      color: #aaa;
    }

    input[type="number"], select {
      background: #3a3a3a;
      color: #fff;
      border: 1px solid #4a4a4a;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
    }

  @media (min-width: 1024px) {
    .app-body {
      flex-direction: row; 
      align-items: center;
    }

    .title {
      font-size: var(--xtra-big-ass-heading);
    }

    control-panel {
      flex: 1;
    }

    pad-grid {
      flex: 1;
    }
  }
  `;_([M()],g.prototype,"samples",2);_([M()],g.prototype,"sampleNames",2);_([M()],g.prototype,"midiEnabled",2);_([M()],g.prototype,"midiInputs",2);_([M()],g.prototype,"isLoading",2);_([M()],g.prototype,"currentPadIndex",2);_([f({type:Number})],g.prototype,"bpm",2);_([f({type:String})],g.prototype,"currentMode",2);_([M()],g.prototype,"currentStep",2);_([M()],g.prototype,"_backPanelVisible",2);g=_([L("sp-app")],g);
