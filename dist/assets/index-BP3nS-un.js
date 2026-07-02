(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,fe=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,me=Symbol(),Ee=new WeakMap;let Oe=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(fe&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ee.set(t,e))}return e}toString(){return this.cssText}};const Fe=r=>new Oe(typeof r=="string"?r:r+"",void 0,me),C=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((n,i,s)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[s+1]),r[0]);return new Oe(t,r,me)},ze=(r,e)=>{if(fe)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const n=document.createElement("style"),i=ne.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,r.appendChild(n)}},we=fe?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Fe(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ve,defineProperty:je,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Ye,getOwnPropertySymbols:We,getPrototypeOf:Ke}=Object,ae=globalThis,Ne=ae.trustedTypes,Xe=Ne?Ne.emptyScript:"",Qe=ae.reactiveElementPolyfillSupport,j=(r,e)=>r,ie={toAttribute(r,e){switch(e){case Boolean:r=r?Xe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ge=(r,e)=>!Ve(r,e),Se={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:ge};Symbol.metadata??=Symbol("metadata"),ae.litPropertyMetadata??=new WeakMap;let D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&je(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:s}=qe(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:i,set(a){const c=i?.call(this);s?.call(this,a),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Se}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;const e=Ke(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){const t=this.properties,n=[...Ye(t),...We(t)];for(const i of n)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(we(i))}else e!==void 0&&t.push(we(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ze(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const s=(n.converter?.toAttribute!==void 0?n.converter:ie).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const s=n.getPropertyOptions(i),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ie;this._$Em=i;const c=a.fromAttribute(t,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){const i=this.constructor,s=this[e];if(n??=i.getPropertyOptions(e),!((n.hasChanged??ge)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),s!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,s]of n){const{wrapped:a}=s,c=this[i];a!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[j("elementProperties")]=new Map,D[j("finalized")]=new Map,Qe?.({ReactiveElement:D}),(ae.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be=globalThis,re=be.trustedTypes,Ae=re?re.createPolicy("lit-html",{createHTML:r=>r}):void 0,ke="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,De="?"+M,Je=`<${De}>`,$=document,Y=()=>$.createComment(""),W=r=>r===null||typeof r!="object"&&typeof r!="function",ye=Array.isArray,Ze=r=>ye(r)||typeof r?.[Symbol.iterator]=="function",ce=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Me=/-->/g,xe=/>/g,R=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ce=/'/g,Ie=/"/g,Be=/^(?:script|style|textarea|title)$/i,Le=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),g=Le(1),V=Le(2),L=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Re=new WeakMap,T=$.createTreeWalker($,129);function Ue(r,e){if(!ye(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(e):e}const et=(r,e)=>{const t=r.length-1,n=[];let i,s=e===2?"<svg>":e===3?"<math>":"",a=z;for(let c=0;c<t;c++){const h=r[c];let u,b,f=-1,w=0;for(;w<h.length&&(a.lastIndex=w,b=a.exec(h),b!==null);)w=a.lastIndex,a===z?b[1]==="!--"?a=Me:b[1]!==void 0?a=xe:b[2]!==void 0?(Be.test(b[2])&&(i=RegExp("</"+b[2],"g")),a=R):b[3]!==void 0&&(a=R):a===R?b[0]===">"?(a=i??z,f=-1):b[1]===void 0?f=-2:(f=a.lastIndex-b[2].length,u=b[1],a=b[3]===void 0?R:b[3]==='"'?Ie:Ce):a===Ie||a===Ce?a=R:a===Me||a===xe?a=z:(a=R,i=void 0);const A=a===R&&r[c+1].startsWith("/>")?" ":"";s+=a===z?h+Je:f>=0?(n.push(u),h.slice(0,f)+ke+h.slice(f)+M+A):h+M+(f===-2?c:A)}return[Ue(r,s+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class K{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,a=0;const c=e.length-1,h=this.parts,[u,b]=et(e,t);if(this.el=K.createElement(u,n),T.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=T.nextNode())!==null&&h.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const f of i.getAttributeNames())if(f.endsWith(ke)){const w=b[a++],A=i.getAttribute(f).split(M),te=/([.?@])?(.*)/.exec(w);h.push({type:1,index:s,name:te[2],strings:A,ctor:te[1]==="."?nt:te[1]==="?"?it:te[1]==="@"?rt:oe}),i.removeAttribute(f)}else f.startsWith(M)&&(h.push({type:6,index:s}),i.removeAttribute(f));if(Be.test(i.tagName)){const f=i.textContent.split(M),w=f.length-1;if(w>0){i.textContent=re?re.emptyScript:"";for(let A=0;A<w;A++)i.append(f[A],Y()),T.nextNode(),h.push({type:2,index:++s});i.append(f[w],Y())}}}else if(i.nodeType===8)if(i.data===De)h.push({type:2,index:s});else{let f=-1;for(;(f=i.data.indexOf(M,f+1))!==-1;)h.push({type:7,index:s}),f+=M.length-1}s++}}static createElement(e,t){const n=$.createElement("template");return n.innerHTML=e,n}}function U(r,e,t=r,n){if(e===L)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl;const s=W(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(r),i._$AT(r,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=U(r,i._$AS(r,e.values),i,n)),e}class tt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??$).importNode(t,!0);T.currentNode=i;let s=T.nextNode(),a=0,c=0,h=n[0];for(;h!==void 0;){if(a===h.index){let u;h.type===2?u=new X(s,s.nextSibling,this,e):h.type===1?u=new h.ctor(s,h.name,h.strings,this,e):h.type===6&&(u=new st(s,this,e)),this._$AV.push(u),h=n[++c]}a!==h?.index&&(s=T.nextNode(),a++)}return T.currentNode=$,i}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),W(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==L&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ze(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T($.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=K.createElement(Ue(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const s=new tt(i,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=Re.get(e.strings);return t===void 0&&Re.set(e.strings,t=new K(e)),t}k(e){ye(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new X(this.O(Y()),this.O(Y()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=m}_$AI(e,t=this,n,i){const s=this.strings;let a=!1;if(s===void 0)e=U(this,e,t,0),a=!W(e)||e!==this._$AH&&e!==L,a&&(this._$AH=e);else{const c=e;let h,u;for(e=s[0],h=0;h<s.length-1;h++)u=U(this,c[n+h],t,h),u===L&&(u=this._$AH[h]),a||=!W(u)||u!==this._$AH[h],u===m?e=m:e!==m&&(e+=(u??"")+s[h+1]),this._$AH[h]=u}a&&!i&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class nt extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class it extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class rt extends oe{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??m)===L)return;const n=this._$AH,i=e===m&&n!==m||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==m&&(n===m||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class st{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const at=be.litHtmlPolyfillSupport;at?.(K,X),(be.litHtmlVersions??=[]).push("3.3.1");const ot=(r,e,t)=>{const n=t?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const s=t?.renderBefore??null;n._$litPart$=i=new X(e.insertBefore(Y(),s),s,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=globalThis;let y=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ot(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};y._$litElement$=!0,y.finalized=!0,ve.litElementHydrateSupport?.({LitElement:y});const lt=ve.litElementPolyfillSupport;lt?.({LitElement:y});(ve.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:ge},ct=(r=dt,e,t)=>{const{kind:n,metadata:i}=t;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),n==="setter"&&((r=Object.create(r)).wrapped=!0),s.set(t.name,r),n==="accessor"){const{name:a}=t;return{set(c){const h=e.get.call(this);e.set.call(this,c),this.requestUpdate(a,h,r)},init(c){return c!==void 0&&this.C(a,void 0,r,c),c}}}if(n==="setter"){const{name:a}=t;return function(c){const h=this[a];e.call(this,c),this.requestUpdate(a,h,r)}}throw Error("Unsupported decorator location: "+n)};function p(r){return(e,t)=>typeof t=="object"?ct(r,e,t):((n,i,s)=>{const a=i.hasOwnProperty(s);return i.constructor.createProperty(s,n),a?Object.getOwnPropertyDescriptor(i,s):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(r){return p({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=(r,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _e(r,e){return(t,n,i)=>{const s=a=>a.renderRoot?.querySelector(r)??null;return ht(t,n,{get(){return s(this)}})}}class _{constructor(e=!1){this.eventMap={},this.eventsSuspended=e==!0}addListener(e,t,n={}){if(typeof e=="string"&&e.length<1||e instanceof String&&e.length<1||typeof e!="string"&&!(e instanceof String)&&e!==_.ANY_EVENT)throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");if(typeof t!="function")throw new TypeError("The callback must be a function.");const i=new Te(e,this,t,n);return this.eventMap[e]||(this.eventMap[e]=[]),n.prepend?this.eventMap[e].unshift(i):this.eventMap[e].push(i),i}addOneTimeListener(e,t,n={}){n.remaining=1,this.addListener(e,t,n)}static get ANY_EVENT(){return Symbol.for("Any event")}hasListener(e,t){return e===void 0?this.eventMap[_.ANY_EVENT]&&this.eventMap[_.ANY_EVENT].length>0?!0:Object.entries(this.eventMap).some(([,n])=>n.length>0):this.eventMap[e]&&this.eventMap[e].length>0?t instanceof Te?this.eventMap[e].filter(i=>i===t).length>0:typeof t=="function"?this.eventMap[e].filter(i=>i.callback===t).length>0:t==null:!1}get eventNames(){return Object.keys(this.eventMap)}getListeners(e){return this.eventMap[e]||[]}suspendEvent(e){this.getListeners(e).forEach(t=>{t.suspended=!0})}unsuspendEvent(e){this.getListeners(e).forEach(t=>{t.suspended=!1})}getListenerCount(e){return this.getListeners(e).length}emit(e,...t){if(typeof e!="string"&&!(e instanceof String))throw new TypeError("The 'event' parameter must be a string.");if(this.eventsSuspended)return;let n=[],i=this.eventMap[_.ANY_EVENT]||[];return this.eventMap[e]&&(i=i.concat(this.eventMap[e])),i.forEach(s=>{if(s.suspended)return;let a=[...t];Array.isArray(s.arguments)&&(a=a.concat(s.arguments)),s.remaining>0&&(n.push(s.callback.apply(s.context,a)),s.count++),--s.remaining<1&&s.remove()}),n}removeListener(e,t,n={}){if(e===void 0){this.eventMap={};return}else if(!this.eventMap[e])return;let i=this.eventMap[e].filter(s=>t&&s.callback!==t||n.remaining&&n.remaining!==s.remaining||n.context&&n.context!==s.context);i.length?this.eventMap[e]=i:delete this.eventMap[e]}async waitFor(e,t={}){return t.duration=parseInt(t.duration),(isNaN(t.duration)||t.duration<=0)&&(t.duration=1/0),new Promise((n,i)=>{let s,a=this.addListener(e,()=>{clearTimeout(s),n()},{remaining:1});t.duration!==1/0&&(s=setTimeout(()=>{a.remove(),i("The duration expired before the event was emitted.")},t.duration))})}get eventCount(){return Object.keys(this.eventMap).length}}class Te{constructor(e,t,n,i={}){if(typeof e!="string"&&!(e instanceof String)&&e!==_.ANY_EVENT)throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");if(!t)throw new ReferenceError("The 'target' parameter is mandatory.");if(typeof n!="function")throw new TypeError("The 'callback' must be a function.");i.arguments!==void 0&&!Array.isArray(i.arguments)&&(i.arguments=[i.arguments]),i=Object.assign({context:t,remaining:1/0,arguments:void 0,duration:1/0},i),i.duration!==1/0&&setTimeout(()=>this.remove(),i.duration),this.arguments=i.arguments,this.callback=n,this.context=i.context,this.count=0,this.event=e,this.remaining=parseInt(i.remaining)>=1?parseInt(i.remaining):1/0,this.suspended=!1,this.target=t}remove(){this.target.removeListener(this.event,this.callback,{context:this.context,remaining:this.remaining})}}/**
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
 */class B{constructor(e,t={}){this.duration=d.defaults.note.duration,this.attack=d.defaults.note.attack,this.release=d.defaults.note.release,t.duration!=null&&(this.duration=t.duration),t.attack!=null&&(this.attack=t.attack),t.rawAttack!=null&&(this.attack=l.from7bitToFloat(t.rawAttack)),t.release!=null&&(this.release=t.release),t.rawRelease!=null&&(this.release=l.from7bitToFloat(t.rawRelease)),Number.isInteger(e)?this.identifier=l.toNoteIdentifier(e):this.identifier=e}get identifier(){return this._name+(this._accidental||"")+this._octave}set identifier(e){const t=l.getNoteDetails(e);if(d.validation&&!e)throw new Error("Invalid note identifier");this._name=t.name,this._accidental=t.accidental,this._octave=t.octave}get name(){return this._name}set name(e){if(d.validation&&(e=e.toUpperCase(),!["C","D","E","F","G","A","B"].includes(e)))throw new Error("Invalid name value");this._name=e}get accidental(){return this._accidental}set accidental(e){if(d.validation&&(e=e.toLowerCase(),!["#","##","b","bb"].includes(e)))throw new Error("Invalid accidental value");this._accidental=e}get octave(){return this._octave}set octave(e){if(d.validation&&(e=parseInt(e),isNaN(e)))throw new Error("Invalid octave value");this._octave=e}get duration(){return this._duration}set duration(e){if(d.validation&&(e=parseFloat(e),isNaN(e)||e===null||e<0))throw new RangeError("Invalid duration value.");this._duration=e}get attack(){return this._attack}set attack(e){if(d.validation&&(e=parseFloat(e),isNaN(e)||!(e>=0&&e<=1)))throw new RangeError("Invalid attack value.");this._attack=e}get release(){return this._release}set release(e){if(d.validation&&(e=parseFloat(e),isNaN(e)||!(e>=0&&e<=1)))throw new RangeError("Invalid release value.");this._release=e}get rawAttack(){return l.fromFloatTo7Bit(this._attack)}set rawAttack(e){this._attack=l.from7bitToFloat(e)}get rawRelease(){return l.fromFloatTo7Bit(this._release)}set rawRelease(e){this._release=l.from7bitToFloat(e)}get number(){return l.toNoteNumber(this.identifier)}getOffsetNumber(e=0,t=0){return d.validation&&(e=parseInt(e)||0,t=parseInt(t)||0),Math.min(Math.max(this.number+e*12+t,0),127)}}/**
 * The `Utilities` class contains general-purpose utility methods. All methods are static and
 * should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class l{static toNoteNumber(e,t=0){if(t=t==null?0:parseInt(t),isNaN(t))throw new RangeError("Invalid 'octaveOffset' value");typeof e!="string"&&(e="");const n=this.getNoteDetails(e);if(!n)throw new TypeError("Invalid note identifier");const i={C:0,D:2,E:4,F:5,G:7,A:9,B:11};let s=(n.octave+1+t)*12;if(s+=i[n.name],n.accidental&&(n.accidental.startsWith("b")?s-=n.accidental.length:s+=n.accidental.length),s<0||s>127)throw new RangeError("Invalid octaveOffset value");return s}static getNoteDetails(e){Number.isInteger(e)&&(e=this.toNoteIdentifier(e));const t=e.match(/^([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)$/i);if(!t)throw new TypeError("Invalid note identifier");const n=t[1].toUpperCase(),i=parseInt(t[3]);let s=t[2].toLowerCase();return s=s===""?void 0:s,{accidental:s,identifier:n+(s||"")+i,name:n,octave:i}}static sanitizeChannels(e){let t;if(d.validation){if(e==="all")t=["all"];else if(e==="none")return[]}return Array.isArray(e)?t=e:t=[e],t.indexOf("all")>-1&&(t=o.MIDI_CHANNEL_NUMBERS),t.map(function(n){return parseInt(n)}).filter(function(n){return n>=1&&n<=16})}static toTimestamp(e){let t=!1;const n=parseFloat(e);return isNaN(n)?!1:(typeof e=="string"&&e.substring(0,1)==="+"?n>=0&&(t=d.time+n):n>=0&&(t=n),t)}static guessNoteNumber(e,t){t=parseInt(t)||0;let n=!1;if(Number.isInteger(e)&&e>=0&&e<=127)n=parseInt(e);else if(parseInt(e)>=0&&parseInt(e)<=127)n=parseInt(e);else if(typeof e=="string"||e instanceof String)try{n=this.toNoteNumber(e.trim(),t)}catch{return!1}return n}static toNoteIdentifier(e,t){if(e=parseInt(e),isNaN(e)||e<0||e>127)throw new RangeError("Invalid note number");if(t=t==null?0:parseInt(t),isNaN(t))throw new RangeError("Invalid octaveOffset value");const n=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],i=Math.floor(e/12-1)+t;return n[e%12]+i.toString()}static buildNote(e,t={}){if(t.octaveOffset=parseInt(t.octaveOffset)||0,e instanceof B)return e;let n=this.guessNoteNumber(e,t.octaveOffset);if(n===!1)throw new TypeError(`The input could not be parsed as a note (${e})`);return t.octaveOffset=void 0,new B(n,t)}static buildNoteArray(e,t={}){let n=[];return Array.isArray(e)||(e=[e]),e.forEach(i=>{n.push(this.buildNote(i,t))}),n}static from7bitToFloat(e){return e===1/0&&(e=127),e=parseInt(e)||0,Math.min(Math.max(e/127,0),1)}static fromFloatTo7Bit(e){return e===1/0&&(e=1),e=parseFloat(e)||0,Math.min(Math.max(Math.round(e*127),0),127)}static fromMsbLsbToFloat(e,t=0){d.validation&&(e=Math.min(Math.max(parseInt(e)||0,0),127),t=Math.min(Math.max(parseInt(t)||0,0),127));const n=((e<<7)+t)/16383;return Math.min(Math.max(n,0),1)}static fromFloatToMsbLsb(e){d.validation&&(e=Math.min(Math.max(parseFloat(e)||0,0),1));const t=Math.round(e*16383);return{msb:t>>7,lsb:t&127}}static offsetNumber(e,t=0,n=0){if(d.validation){if(e=parseInt(e),isNaN(e))throw new Error("Invalid note number");t=parseInt(t)||0,n=parseInt(n)||0}return Math.min(Math.max(e+t*12+n,0),127)}static getPropertyByValue(e,t){return Object.keys(e).find(n=>e[n]===t)}static getCcNameByNumber(e){if(!(d.validation&&(e=parseInt(e),!(e>=0&&e<=127))))return o.CONTROL_CHANGE_MESSAGES[e].name}static getCcNumberByName(e){let t=o.CONTROL_CHANGE_MESSAGES.find(n=>n.name===e);return t?t.number:o.MIDI_CONTROL_CHANGE_MESSAGES[e]}static getChannelModeByNumber(e){if(!(e>=120&&e<=127))return!1;for(let t in o.CHANNEL_MODE_MESSAGES)if(o.CHANNEL_MODE_MESSAGES.hasOwnProperty(t)&&e===o.CHANNEL_MODE_MESSAGES[t])return t;return!1}static get isNode(){return typeof process<"u"&&process.versions!=null&&process.versions.node!=null}static get isBrowser(){return typeof window<"u"&&typeof window.document<"u"}}/**
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
 */class ut extends _{constructor(e,t){super(),this._output=e,this._number=t,this._octaveOffset=0}destroy(){this._output=null,this._number=null,this._octaveOffset=0,this.removeListener()}send(e,t={time:0}){return this.output.send(e,t),this}sendKeyAftertouch(e,t,n={}){if(d.validation){if(n.useRawValue&&(n.rawValue=n.useRawValue),isNaN(parseFloat(t)))throw new RangeError("Invalid key aftertouch value.");if(n.rawValue){if(!(t>=0&&t<=127&&Number.isInteger(t)))throw new RangeError("Key aftertouch raw value must be an integer between 0 and 127.")}else if(!(t>=0&&t<=1))throw new RangeError("Key aftertouch value must be a float between 0 and 1.")}n.rawValue||(t=l.fromFloatTo7Bit(t));const i=d.octaveOffset+this.output.octaveOffset+this.octaveOffset;return Array.isArray(e)||(e=[e]),l.buildNoteArray(e).forEach(s=>{this.send([(o.CHANNEL_MESSAGES.keyaftertouch<<4)+(this.number-1),s.getOffsetNumber(i),t],{time:l.toTimestamp(n.time)})}),this}sendControlChange(e,t,n={}){if(typeof e=="string"&&(e=l.getCcNumberByName(e)),Array.isArray(t)||(t=[t]),d.validation){if(e===void 0)throw new TypeError("Control change must be identified with a valid name or an integer between 0 and 127.");if(!Number.isInteger(e)||!(e>=0&&e<=127))throw new TypeError("Control change number must be an integer between 0 and 127.");if(t=t.map(i=>{const s=Math.min(Math.max(parseInt(i),0),127);if(isNaN(s))throw new TypeError("Values must be integers between 0 and 127");return s}),t.length===2&&e>=32)throw new TypeError("To use a value array, the controller must be between 0 and 31")}return t.forEach((i,s)=>{this.send([(o.CHANNEL_MESSAGES.controlchange<<4)+(this.number-1),e+s*32,t[s]],{time:l.toTimestamp(n.time)})}),this}_selectNonRegisteredParameter(e,t={}){return this.sendControlChange(99,e[0],t),this.sendControlChange(98,e[1],t),this}_deselectRegisteredParameter(e={}){return this.sendControlChange(101,127,e),this.sendControlChange(100,127,e),this}_deselectNonRegisteredParameter(e={}){return this.sendControlChange(101,127,e),this.sendControlChange(100,127,e),this}_selectRegisteredParameter(e,t={}){return this.sendControlChange(101,e[0],t),this.sendControlChange(100,e[1],t),this}_setCurrentParameter(e,t={}){return e=[].concat(e),this.sendControlChange(6,e[0],t),e.length<2?this:(this.sendControlChange(38,e[1],t),this)}sendRpnDecrement(e,t={}){if(Array.isArray(e)||(e=o.REGISTERED_PARAMETERS[e]),d.validation){if(e===void 0)throw new TypeError("The specified registered parameter is invalid.");let n=!1;if(Object.getOwnPropertyNames(o.REGISTERED_PARAMETERS).forEach(i=>{o.REGISTERED_PARAMETERS[i][0]===e[0]&&o.REGISTERED_PARAMETERS[i][1]===e[1]&&(n=!0)}),!n)throw new TypeError("The specified registered parameter is invalid.")}return this._selectRegisteredParameter(e,t),this.sendControlChange(97,0,t),this._deselectRegisteredParameter(t),this}sendRpnIncrement(e,t={}){if(Array.isArray(e)||(e=o.REGISTERED_PARAMETERS[e]),d.validation){if(e===void 0)throw new TypeError("The specified registered parameter is invalid.");let n=!1;if(Object.getOwnPropertyNames(o.REGISTERED_PARAMETERS).forEach(i=>{o.REGISTERED_PARAMETERS[i][0]===e[0]&&o.REGISTERED_PARAMETERS[i][1]===e[1]&&(n=!0)}),!n)throw new TypeError("The specified registered parameter is invalid.")}return this._selectRegisteredParameter(e,t),this.sendControlChange(96,0,t),this._deselectRegisteredParameter(t),this}playNote(e,t={}){this.sendNoteOn(e,t);const n=Array.isArray(e)?e:[e];for(let i of n)if(parseInt(i.duration)>0){const s={time:(l.toTimestamp(t.time)||d.time)+parseInt(i.duration),release:i.release,rawRelease:i.rawRelease};this.sendNoteOff(i,s)}else if(parseInt(t.duration)>0){const s={time:(l.toTimestamp(t.time)||d.time)+parseInt(t.duration),release:t.release,rawRelease:t.rawRelease};this.sendNoteOff(i,s)}return this}sendNoteOff(e,t={}){if(d.validation){if(t.rawRelease!=null&&!(t.rawRelease>=0&&t.rawRelease<=127))throw new RangeError("The 'rawRelease' option must be an integer between 0 and 127");if(t.release!=null&&!(t.release>=0&&t.release<=1))throw new RangeError("The 'release' option must be an number between 0 and 1");t.rawVelocity&&(t.rawRelease=t.velocity,console.warn("The 'rawVelocity' option is deprecated. Use 'rawRelease' instead.")),t.velocity&&(t.release=t.velocity,console.warn("The 'velocity' option is deprecated. Use 'attack' instead."))}let n=64;t.rawRelease!=null?n=t.rawRelease:isNaN(t.release)||(n=Math.round(t.release*127));const i=d.octaveOffset+this.output.octaveOffset+this.octaveOffset;return l.buildNoteArray(e,{rawRelease:parseInt(n)}).forEach(s=>{this.send([(o.CHANNEL_MESSAGES.noteoff<<4)+(this.number-1),s.getOffsetNumber(i),s.rawRelease],{time:l.toTimestamp(t.time)})}),this}stopNote(e,t={}){return this.sendNoteOff(e,t)}sendNoteOn(e,t={}){if(d.validation){if(t.rawAttack!=null&&!(t.rawAttack>=0&&t.rawAttack<=127))throw new RangeError("The 'rawAttack' option must be an integer between 0 and 127");if(t.attack!=null&&!(t.attack>=0&&t.attack<=1))throw new RangeError("The 'attack' option must be an number between 0 and 1");t.rawVelocity&&(t.rawAttack=t.velocity,t.rawRelease=t.release,console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' or 'rawRelease'.")),t.velocity&&(t.attack=t.velocity,console.warn("The 'velocity' option is deprecated. Use 'attack' instead."))}let n=64;t.rawAttack!=null?n=t.rawAttack:isNaN(t.attack)||(n=Math.round(t.attack*127));const i=d.octaveOffset+this.output.octaveOffset+this.octaveOffset;return l.buildNoteArray(e,{rawAttack:n}).forEach(s=>{this.send([(o.CHANNEL_MESSAGES.noteon<<4)+(this.number-1),s.getOffsetNumber(i),s.rawAttack],{time:l.toTimestamp(t.time)})}),this}sendChannelMode(e,t=0,n={}){if(typeof e=="string"&&(e=o.CHANNEL_MODE_MESSAGES[e]),d.validation){if(e===void 0)throw new TypeError("Invalid channel mode message name or number.");if(isNaN(e)||!(e>=120&&e<=127))throw new TypeError("Invalid channel mode message number.");if(isNaN(parseInt(t))||t<0||t>127)throw new RangeError("Value must be an integer between 0 and 127.")}return this.send([(o.CHANNEL_MESSAGES.controlchange<<4)+(this.number-1),e,t],{time:l.toTimestamp(n.time)}),this}sendOmniMode(e,t={}){return e===void 0||e?this.sendChannelMode("omnimodeon",0,t):this.sendChannelMode("omnimodeoff",0,t),this}sendChannelAftertouch(e,t={}){if(d.validation){if(isNaN(parseFloat(e)))throw new RangeError("Invalid channel aftertouch value.");if(t.rawValue){if(!(e>=0&&e<=127&&Number.isInteger(e)))throw new RangeError("Channel aftertouch raw value must be an integer between 0 and 127.")}else if(!(e>=0&&e<=1))throw new RangeError("Channel aftertouch value must be a float between 0 and 1.")}return t.rawValue||(e=l.fromFloatTo7Bit(e)),this.send([(o.CHANNEL_MESSAGES.channelaftertouch<<4)+(this.number-1),Math.round(e)],{time:l.toTimestamp(t.time)}),this}sendMasterTuning(e,t={}){if(e=parseFloat(e)||0,d.validation&&!(e>-65&&e<64))throw new RangeError("The value must be a decimal number larger than -65 and smaller than 64.");let n=Math.floor(e)+64,i=e-Math.floor(e);i=Math.round((i+1)/2*16383);let s=i>>7&127,a=i&127;return this.sendRpnValue("channelcoarsetuning",n,t),this.sendRpnValue("channelfinetuning",[s,a],t),this}sendModulationRange(e,t,n={}){if(d.validation){if(!Number.isInteger(e)||!(e>=0&&e<=127))throw new RangeError("The semitones value must be an integer between 0 and 127.");if(t!=null&&(!Number.isInteger(t)||!(t>=0&&t<=127)))throw new RangeError("If specified, the cents value must be an integer between 0 and 127.")}return t>=0&&t<=127||(t=0),this.sendRpnValue("modulationrange",[e,t],n),this}sendNrpnValue(e,t,n={}){if(t=[].concat(t),d.validation){if(!Array.isArray(e)||!Number.isInteger(e[0])||!Number.isInteger(e[1]))throw new TypeError("The specified NRPN is invalid.");if(!(e[0]>=0&&e[0]<=127))throw new RangeError("The first byte of the NRPN must be between 0 and 127.");if(!(e[1]>=0&&e[1]<=127))throw new RangeError("The second byte of the NRPN must be between 0 and 127.");t.forEach(i=>{if(!(i>=0&&i<=127))throw new RangeError("The data bytes of the NRPN must be between 0 and 127.")})}return this._selectNonRegisteredParameter(e,n),this._setCurrentParameter(t,n),this._deselectNonRegisteredParameter(n),this}sendPitchBend(e,t={}){if(d.validation)if(t.rawValue&&Array.isArray(e)){if(!(e[0]>=0&&e[0]<=127))throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");if(!(e[1]>=0&&e[1]<=127))throw new RangeError("The pitch bend LSB must be an integer between 0 and 127.")}else if(t.rawValue&&!Array.isArray(e)){if(!(e>=0&&e<=127))throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.")}else{if(isNaN(e)||e===null)throw new RangeError("Invalid pitch bend value.");if(!(e>=-1&&e<=1))throw new RangeError("The pitch bend value must be a float between -1 and 1.")}let n=0,i=0;if(t.rawValue&&Array.isArray(e))n=e[0],i=e[1];else if(t.rawValue&&!Array.isArray(e))n=e;else{const s=l.fromFloatToMsbLsb((e+1)/2);n=s.msb,i=s.lsb}return this.send([(o.CHANNEL_MESSAGES.pitchbend<<4)+(this.number-1),i,n],{time:l.toTimestamp(t.time)}),this}sendPitchBendRange(e,t,n={}){if(d.validation){if(!Number.isInteger(e)||!(e>=0&&e<=127))throw new RangeError("The semitones value must be an integer between 0 and 127.");if(!Number.isInteger(t)||!(t>=0&&t<=127))throw new RangeError("The cents value must be an integer between 0 and 127.")}return this.sendRpnValue("pitchbendrange",[e,t],n),this}sendProgramChange(e,t={}){if(e=parseInt(e)||0,d.validation&&!(e>=0&&e<=127))throw new RangeError("The program number must be between 0 and 127.");return this.send([(o.CHANNEL_MESSAGES.programchange<<4)+(this.number-1),e],{time:l.toTimestamp(t.time)}),this}sendRpnValue(e,t,n={}){if(Array.isArray(e)||(e=o.REGISTERED_PARAMETERS[e]),d.validation){if(!Number.isInteger(e[0])||!Number.isInteger(e[1]))throw new TypeError("The specified NRPN is invalid.");if(!(e[0]>=0&&e[0]<=127))throw new RangeError("The first byte of the RPN must be between 0 and 127.");if(!(e[1]>=0&&e[1]<=127))throw new RangeError("The second byte of the RPN must be between 0 and 127.");[].concat(t).forEach(i=>{if(!(i>=0&&i<=127))throw new RangeError("The data bytes of the RPN must be between 0 and 127.")})}return this._selectRegisteredParameter(e,n),this._setCurrentParameter(t,n),this._deselectRegisteredParameter(n),this}sendTuningBank(e,t={}){if(d.validation&&(!Number.isInteger(e)||!(e>=0&&e<=127)))throw new RangeError("The tuning bank number must be between 0 and 127.");return this.sendRpnValue("tuningbank",e,t),this}sendTuningProgram(e,t={}){if(d.validation&&(!Number.isInteger(e)||!(e>=0&&e<=127)))throw new RangeError("The tuning program number must be between 0 and 127.");return this.sendRpnValue("tuningprogram",e,t),this}sendLocalControl(e,t={}){return e?this.sendChannelMode("localcontrol",127,t):this.sendChannelMode("localcontrol",0,t)}sendAllNotesOff(e={}){return this.sendChannelMode("allnotesoff",0,e)}sendAllSoundOff(e={}){return this.sendChannelMode("allsoundoff",0,e)}sendResetAllControllers(e={}){return this.sendChannelMode("resetallcontrollers",0,e)}sendPolyphonicMode(e,t={}){return e==="mono"?this.sendChannelMode("monomodeon",0,t):this.sendChannelMode("polymodeon",0,t)}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get output(){return this._output}get number(){return this._number}}/**
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
 */class pe extends _{constructor(e){super(),this._midiOutput=e,this._octaveOffset=0,this.channels=[];for(let t=1;t<=16;t++)this.channels[t]=new ut(this,t);this._midiOutput.onstatechange=this._onStateChange.bind(this)}async destroy(){this.removeListener(),this.channels.forEach(e=>e.destroy()),this.channels=[],this._midiOutput&&(this._midiOutput.onstatechange=null),await this.close(),this._midiOutput=null}_onStateChange(e){let t={timestamp:d.time};e.port.connection==="open"?(t.type="opened",t.target=this,t.port=t.target,this.emit("opened",t)):e.port.connection==="closed"&&e.port.state==="connected"?(t.type="closed",t.target=this,t.port=t.target,this.emit("closed",t)):e.port.connection==="closed"&&e.port.state==="disconnected"?(t.type="disconnected",t.port={connection:e.port.connection,id:e.port.id,manufacturer:e.port.manufacturer,name:e.port.name,state:e.port.state,type:e.port.type},this.emit("disconnected",t)):e.port.connection==="pending"&&e.port.state==="disconnected"||console.warn("This statechange event was not caught:",e.port.connection,e.port.state)}async open(){try{return await this._midiOutput.open(),Promise.resolve(this)}catch(e){return Promise.reject(e)}}async close(){this._midiOutput?await this._midiOutput.close():await Promise.resolve()}send(e,t={time:0},n=0){if(e instanceof He&&(e=l.isNode?e.data:e.rawData),e instanceof Uint8Array&&l.isNode&&(e=Array.from(e)),d.validation){if(!Array.isArray(e)&&!(e instanceof Uint8Array)&&(e=[e],Array.isArray(t)&&(e=e.concat(t)),t=isNaN(n)?{time:0}:{time:n}),!(parseInt(e[0])>=128&&parseInt(e[0])<=255))throw new RangeError("The first byte (status) must be an integer between 128 and 255.");e.slice(1).forEach(i=>{if(i=parseInt(i),!(i>=0&&i<=255))throw new RangeError("Data bytes must be integers between 0 and 255.")}),t||(t={time:0})}return this._midiOutput.send(e,l.toTimestamp(t.time)),this}sendSysex(e,t=[],n={}){if(e=[].concat(e),t instanceof Uint8Array){const i=new Uint8Array(1+e.length+t.length+1);i[0]=o.SYSTEM_MESSAGES.sysex,i.set(Uint8Array.from(e),1),i.set(t,1+e.length),i[i.length-1]=o.SYSTEM_MESSAGES.sysexend,this.send(i,{time:n.time})}else{const i=e.concat(t,o.SYSTEM_MESSAGES.sysexend);this.send([o.SYSTEM_MESSAGES.sysex].concat(i),{time:n.time})}return this}clear(){return this._midiOutput.clear?this._midiOutput.clear():d.validation&&console.warn("The 'clear()' method has not yet been implemented in your environment."),this}sendTimecodeQuarterFrame(e,t={}){if(d.validation&&(e=parseInt(e),isNaN(e)||!(e>=0&&e<=127)))throw new RangeError("The value must be an integer between 0 and 127.");return this.send([o.SYSTEM_MESSAGES.timecode,e],{time:t.time}),this}sendSongPosition(e=0,t={}){e=Math.floor(e)||0;var n=e>>7&127,i=e&127;return this.send([o.SYSTEM_MESSAGES.songposition,n,i],{time:t.time}),this}sendSongSelect(e=0,t={}){if(d.validation&&(e=parseInt(e),isNaN(e)||!(e>=0&&e<=127)))throw new RangeError("The program value must be between 0 and 127");return this.send([o.SYSTEM_MESSAGES.songselect,e],{time:t.time}),this}sendTuneRequest(e={}){return this.send([o.SYSTEM_MESSAGES.tunerequest],{time:e.time}),this}sendClock(e={}){return this.send([o.SYSTEM_MESSAGES.clock],{time:e.time}),this}sendStart(e={}){return this.send([o.SYSTEM_MESSAGES.start],{time:e.time}),this}sendContinue(e={}){return this.send([o.SYSTEM_MESSAGES.continue],{time:e.time}),this}sendStop(e={}){return this.send([o.SYSTEM_MESSAGES.stop],{time:e.time}),this}sendActiveSensing(e={}){return this.send([o.SYSTEM_MESSAGES.activesensing],{time:e.time}),this}sendReset(e={}){return this.send([o.SYSTEM_MESSAGES.reset],{time:e.time}),this}sendTuningRequest(e={}){return d.validation&&console.warn("The sendTuningRequest() method has been deprecated. Use sendTuningRequest() instead."),this.sendTuneRequest(e)}sendKeyAftertouch(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendKeyAftertouch(e,t,n)}),this}sendControlChange(e,t,n={},i={}){if(d.validation&&(Array.isArray(n)||Number.isInteger(n)||n==="all")){const s=n;n=i,n.channels=s,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)}return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendControlChange(e,t,n)}),this}sendPitchBendRange(e=0,t=0,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendPitchBendRange(e,t,n)}),this}setPitchBendRange(e=0,t=0,n="all",i={}){return d.validation&&(console.warn("The setPitchBendRange() method is deprecated. Use sendPitchBendRange() instead."),i.channels=n,i.channels==="all"&&(i.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendPitchBendRange(e,t,i)}sendRpnValue(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendRpnValue(e,t,n)}),this}setRegisteredParameter(e,t=[],n="all",i={}){return d.validation&&(console.warn("The setRegisteredParameter() method is deprecated. Use sendRpnValue() instead."),i.channels=n,i.channels==="all"&&(i.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendRpnValue(e,t,i)}sendChannelAftertouch(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendChannelAftertouch(e,t)}),this}sendPitchBend(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendPitchBend(e,t)}),this}sendProgramChange(e=0,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendProgramChange(e,t)}),this}sendModulationRange(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendModulationRange(e,t,n)}),this}setModulationRange(e=0,t=0,n="all",i={}){return d.validation&&(console.warn("The setModulationRange() method is deprecated. Use sendModulationRange() instead."),i.channels=n,i.channels==="all"&&(i.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendModulationRange(e,t,i)}sendMasterTuning(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendMasterTuning(e,t)}),this}setMasterTuning(e,t={},n={}){return d.validation&&(console.warn("The setMasterTuning() method is deprecated. Use sendMasterTuning() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendMasterTuning(e,n)}sendTuningProgram(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendTuningProgram(e,t)}),this}setTuningProgram(e,t="all",n={}){return d.validation&&(console.warn("The setTuningProgram() method is deprecated. Use sendTuningProgram() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendTuningProgram(e,n)}sendTuningBank(e=0,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendTuningBank(e,t)}),this}setTuningBank(e,t="all",n={}){return d.validation&&(console.warn("The setTuningBank() method is deprecated. Use sendTuningBank() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendTuningBank(e,n)}sendChannelMode(e,t=0,n={},i={}){if(d.validation&&(Array.isArray(n)||Number.isInteger(n)||n==="all")){const s=n;n=i,n.channels=s,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)}return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(s=>{this.channels[s].sendChannelMode(e,t,n)}),this}sendAllSoundOff(e={}){return e.channels==null&&(e.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(e.channels).forEach(t=>{this.channels[t].sendAllSoundOff(e)}),this}sendAllNotesOff(e={}){return e.channels==null&&(e.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(e.channels).forEach(t=>{this.channels[t].sendAllNotesOff(e)}),this}sendResetAllControllers(e={},t={}){if(d.validation&&(Array.isArray(e)||Number.isInteger(e)||e==="all")){const n=e;e=t,e.channels=n,e.channels==="all"&&(e.channels=o.MIDI_CHANNEL_NUMBERS)}return e.channels==null&&(e.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(e.channels).forEach(n=>{this.channels[n].sendResetAllControllers(e)}),this}sendPolyphonicMode(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendPolyphonicMode(e,t)}),this}sendLocalControl(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendLocalControl(e,t)}),this}sendOmniMode(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendOmniMode(e,t)}),this}sendNrpnValue(e,t,n={}){return n.channels==null&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].sendNrpnValue(e,t,n)}),this}setNonRegisteredParameter(e,t=[],n="all",i={}){return d.validation&&(console.warn("The setNonRegisteredParameter() method is deprecated. Use sendNrpnValue() instead."),i.channels=n,i.channels==="all"&&(i.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendNrpnValue(e,t,i)}sendRpnIncrement(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendRpnIncrement(e,t)}),this}incrementRegisteredParameter(e,t="all",n={}){return d.validation&&(console.warn("The incrementRegisteredParameter() method is deprecated. Use sendRpnIncrement() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendRpnIncrement(e,n)}sendRpnDecrement(e,t={}){return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(n=>{this.channels[n].sendRpnDecrement(e,t)}),this}decrementRegisteredParameter(e,t="all",n={}){return d.validation&&(console.warn("The decrementRegisteredParameter() method is deprecated. Use sendRpnDecrement() instead."),n.channels=t,n.channels==="all"&&(n.channels=o.MIDI_CHANNEL_NUMBERS)),this.sendRpnDecrement(e,n)}sendNoteOff(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendNoteOff(e,t)}),this}stopNote(e,t){return this.sendNoteOff(e,t)}playNote(e,t={},n={}){if(d.validation&&(t.rawVelocity&&console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' instead."),t.velocity&&console.warn("The 'velocity' option is deprecated. Use 'velocity' instead."),Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].playNote(e,t)}),this}sendNoteOn(e,t={},n={}){if(d.validation&&(Array.isArray(t)||Number.isInteger(t)||t==="all")){const i=t;t=n,t.channels=i,t.channels==="all"&&(t.channels=o.MIDI_CHANNEL_NUMBERS)}return t.channels==null&&(t.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(t.channels).forEach(i=>{this.channels[i].sendNoteOn(e,t)}),this}get name(){return this._midiOutput.name}get id(){return this._midiOutput.id}get connection(){return this._midiOutput.connection}get manufacturer(){return this._midiOutput.manufacturer}get state(){return this._midiOutput.state}get type(){return this._midiOutput.type}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}}/**
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
 */class $e{constructor(e=[],t={}){this.destinations=[],this.types=[...Object.keys(o.SYSTEM_MESSAGES),...Object.keys(o.CHANNEL_MESSAGES)],this.channels=o.MIDI_CHANNEL_NUMBERS,this.suspended=!1,Array.isArray(e)||(e=[e]),t.types&&!Array.isArray(t.types)&&(t.types=[t.types]),t.channels&&!Array.isArray(t.channels)&&(t.channels=[t.channels]),d.validation&&(e.forEach(n=>{if(!(n instanceof pe))throw new TypeError("Destinations must be of type 'Output'.")}),t.types!==void 0&&t.types.forEach(n=>{if(!o.SYSTEM_MESSAGES.hasOwnProperty(n)&&!o.CHANNEL_MESSAGES.hasOwnProperty(n))throw new TypeError("Type must be a valid message type.")}),t.channels!==void 0&&t.channels.forEach(n=>{if(!o.MIDI_CHANNEL_NUMBERS.includes(n))throw new TypeError("MIDI channel must be between 1 and 16.")})),this.destinations=e,t.types&&(this.types=t.types),t.channels&&(this.channels=t.channels)}forward(e){this.suspended||this.types.includes(e.type)&&(e.channel&&!this.channels.includes(e.channel)||this.destinations.forEach(t=>{d.validation&&!(t instanceof pe)||t.send(e)}))}}/**
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
 */class pt extends _{constructor(e,t){super(),this._input=e,this._number=t,this._octaveOffset=0,this._nrpnBuffer=[],this._rpnBuffer=[],this.parameterNumberEventsEnabled=!0,this.notesState=new Array(128).fill(!1)}destroy(){this._input=null,this._number=null,this._octaveOffset=0,this._nrpnBuffer=[],this.notesState=new Array(128).fill(!1),this.parameterNumberEventsEnabled=!1,this.removeListener()}_processMidiMessageEvent(e){const t=Object.assign({},e);t.port=this.input,t.target=this,t.type="midimessage",this.emit(t.type,t),this._parseEventForStandardMessages(t)}_parseEventForStandardMessages(e){const t=Object.assign({},e);t.type=t.message.type||"unknownmessage";const n=e.message.dataBytes[0],i=e.message.dataBytes[1];if(t.type==="noteoff"||t.type==="noteon"&&i===0)this.notesState[n]=!1,t.type="noteoff",t.note=new B(l.offsetNumber(n,this.octaveOffset+this.input.octaveOffset+d.octaveOffset),{rawAttack:0,rawRelease:i}),t.value=l.from7bitToFloat(i),t.rawValue=i,t.velocity=t.note.release,t.rawVelocity=t.note.rawRelease;else if(t.type==="noteon")this.notesState[n]=!0,t.note=new B(l.offsetNumber(n,this.octaveOffset+this.input.octaveOffset+d.octaveOffset),{rawAttack:i}),t.value=l.from7bitToFloat(i),t.rawValue=i,t.velocity=t.note.attack,t.rawVelocity=t.note.rawAttack;else if(t.type==="keyaftertouch")t.note=new B(l.offsetNumber(n,this.octaveOffset+this.input.octaveOffset+d.octaveOffset)),t.value=l.from7bitToFloat(i),t.rawValue=i,t.identifier=t.note.identifier,t.key=t.note.number,t.rawKey=n;else if(t.type==="controlchange"){t.controller={number:n,name:o.CONTROL_CHANGE_MESSAGES[n].name,description:o.CONTROL_CHANGE_MESSAGES[n].description,position:o.CONTROL_CHANGE_MESSAGES[n].position},t.subtype=t.controller.name||"controller"+n,t.value=l.from7bitToFloat(i),t.rawValue=i;const s=Object.assign({},t);s.type=`${t.type}-controller${n}`,delete s.subtype,this.emit(s.type,s);const a=Object.assign({},t);a.type=`${t.type}-`+o.CONTROL_CHANGE_MESSAGES[n].name,delete a.subtype,a.type.indexOf("controller")!==0&&this.emit(a.type,a),t.message.dataBytes[0]>=120&&this._parseChannelModeMessage(t),this.parameterNumberEventsEnabled&&this._isRpnOrNrpnController(t.message.dataBytes[0])&&this._parseEventForParameterNumber(t)}else t.type==="programchange"?(t.value=n,t.rawValue=t.value):t.type==="channelaftertouch"?(t.value=l.from7bitToFloat(n),t.rawValue=n):t.type==="pitchbend"?(t.value=((i<<7)+n-8192)/8192,t.rawValue=(i<<7)+n):t.type="unknownmessage";this.emit(t.type,t)}_parseChannelModeMessage(e){const t=Object.assign({},e);t.type=t.controller.name,t.type==="localcontrol"&&(t.value=t.message.data[2]===127,t.rawValue=t.message.data[2]),t.type==="omnimodeon"?(t.type="omnimode",t.value=!0,t.rawValue=t.message.data[2]):t.type==="omnimodeoff"&&(t.type="omnimode",t.value=!1,t.rawValue=t.message.data[2]),t.type==="monomodeon"?(t.type="monomode",t.value=!0,t.rawValue=t.message.data[2]):t.type==="polymodeon"&&(t.type="monomode",t.value=!1,t.rawValue=t.message.data[2]),this.emit(t.type,t)}_parseEventForParameterNumber(e){const t=e.message.dataBytes[0],n=e.message.dataBytes[1];t===99||t===101?(this._nrpnBuffer=[],this._rpnBuffer=[],t===99?this._nrpnBuffer=[e.message]:n!==127&&(this._rpnBuffer=[e.message])):t===98||t===100?t===98?(this._rpnBuffer=[],this._nrpnBuffer.length===1?this._nrpnBuffer.push(e.message):this._nrpnBuffer=[]):(this._nrpnBuffer=[],this._rpnBuffer.length===1&&n!==127?this._rpnBuffer.push(e.message):this._rpnBuffer=[]):(t===6||t===38||t===96||t===97)&&(this._rpnBuffer.length===2?this._dispatchParameterNumberEvent("rpn",this._rpnBuffer[0].dataBytes[1],this._rpnBuffer[1].dataBytes[1],e):this._nrpnBuffer.length===2?this._dispatchParameterNumberEvent("nrpn",this._nrpnBuffer[0].dataBytes[1],this._nrpnBuffer[1].dataBytes[1],e):(this._nrpnBuffer=[],this._rpnBuffer=[]))}_isRpnOrNrpnController(e){return e===6||e===38||e===96||e===97||e===98||e===99||e===100||e===101}_dispatchParameterNumberEvent(e,t,n,i){e=e==="nrpn"?"nrpn":"rpn";const s={target:i.target,timestamp:i.timestamp,message:i.message,parameterMsb:t,parameterLsb:n,value:l.from7bitToFloat(i.message.dataBytes[1]),rawValue:i.message.dataBytes[1]};e==="rpn"?s.parameter=Object.keys(o.REGISTERED_PARAMETERS).find(h=>o.REGISTERED_PARAMETERS[h][0]===t&&o.REGISTERED_PARAMETERS[h][1]===n):s.parameter=(t<<7)+n;const a=o.CONTROL_CHANGE_MESSAGES[i.message.dataBytes[0]].name;s.type=`${e}-${a}`,this.emit(s.type,s);const c=Object.assign({},s);c.type==="nrpn-dataincrement"?c.type="nrpn-databuttonincrement":c.type==="nrpn-datadecrement"?c.type="nrpn-databuttondecrement":c.type==="rpn-dataincrement"?c.type="rpn-databuttonincrement":c.type==="rpn-datadecrement"&&(c.type="rpn-databuttondecrement"),this.emit(c.type,c),s.type=e,s.subtype=a,this.emit(s.type,s)}getChannelModeByNumber(e){return d.validation&&(console.warn("The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class."),e=Math.floor(e)),l.getChannelModeByNumber(e)}getCcNameByNumber(e){if(d.validation&&(console.warn("The 'getCcNameByNumber()' method has been moved to the 'Utilities' class."),e=parseInt(e),!(e>=0&&e<=127)))throw new RangeError("Invalid control change number.");return l.getCcNameByNumber(e)}getNoteState(e){e instanceof B&&(e=e.identifier);const t=l.guessNoteNumber(e,d.octaveOffset+this.input.octaveOffset+this.octaveOffset);return this.notesState[t]}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get input(){return this._input}get number(){return this._number}get nrpnEventsEnabled(){return this.parameterNumberEventsEnabled}set nrpnEventsEnabled(e){this.validation&&(e=!!e),this.parameterNumberEventsEnabled=e}}/**
 * The `Message` class represents a single MIDI message. It has several properties that make it
 * easy to make sense of the binary data it contains.
 *
 * @license Apache-2.0
 * @since 3.0.0
 */class He{constructor(e){this.rawData=e,this.data=Array.from(this.rawData),this.statusByte=this.rawData[0],this.rawDataBytes=this.rawData.slice(1),this.dataBytes=this.data.slice(1),this.isChannelMessage=!1,this.isSystemMessage=!1,this.command=void 0,this.channel=void 0,this.manufacturerId=void 0,this.type=void 0,this.statusByte<240?(this.isChannelMessage=!0,this.command=this.statusByte>>4,this.channel=(this.statusByte&15)+1):(this.isSystemMessage=!0,this.command=this.statusByte),this.isChannelMessage?this.type=l.getPropertyByValue(o.CHANNEL_MESSAGES,this.command):this.isSystemMessage&&(this.type=l.getPropertyByValue(o.SYSTEM_MESSAGES,this.command)),this.statusByte===o.SYSTEM_MESSAGES.sysex&&(this.dataBytes[0]===0?(this.manufacturerId=this.dataBytes.slice(0,3),this.dataBytes=this.dataBytes.slice(3,this.rawDataBytes.length-1),this.rawDataBytes=this.rawDataBytes.slice(3,this.rawDataBytes.length-1)):(this.manufacturerId=[this.dataBytes[0]],this.dataBytes=this.dataBytes.slice(1,this.dataBytes.length-1),this.rawDataBytes=this.rawDataBytes.slice(1,this.rawDataBytes.length-1)))}}/**
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
 */class ft extends _{constructor(e){super(),this._midiInput=e,this._octaveOffset=0,this.channels=[];for(let t=1;t<=16;t++)this.channels[t]=new pt(this,t);this._forwarders=[],this._midiInput.onstatechange=this._onStateChange.bind(this),this._midiInput.onmidimessage=this._onMidiMessage.bind(this)}async destroy(){this.removeListener(),this.channels.forEach(e=>e.destroy()),this.channels=[],this._forwarders=[],this._midiInput&&(this._midiInput.onstatechange=null,this._midiInput.onmidimessage=null),await this.close(),this._midiInput=null}_onStateChange(e){let t={timestamp:d.time,target:this,port:this};e.port.connection==="open"?(t.type="opened",this.emit("opened",t)):e.port.connection==="closed"&&e.port.state==="connected"?(t.type="closed",this.emit("closed",t)):e.port.connection==="closed"&&e.port.state==="disconnected"?(t.type="disconnected",t.port={connection:e.port.connection,id:e.port.id,manufacturer:e.port.manufacturer,name:e.port.name,state:e.port.state,type:e.port.type},this.emit("disconnected",t)):e.port.connection==="pending"&&e.port.state==="disconnected"||console.warn("This statechange event was not caught: ",e.port.connection,e.port.state)}_onMidiMessage(e){const t=new He(e.data),n={port:this,target:this,message:t,timestamp:e.timeStamp,type:"midimessage",data:t.data,rawData:t.data,statusByte:t.data[0],dataBytes:t.dataBytes};this.emit("midimessage",n),t.isSystemMessage?this._parseEvent(n):t.isChannelMessage&&this.channels[t.channel]._processMidiMessageEvent(n),this._forwarders.forEach(i=>i.forward(t))}_parseEvent(e){const t=Object.assign({},e);t.type=t.message.type||"unknownmidimessage",t.type==="songselect"&&(t.song=e.data[1]+1,t.value=e.data[1],t.rawValue=t.value),this.emit(t.type,t)}async open(){try{await this._midiInput.open()}catch(e){return Promise.reject(e)}return Promise.resolve(this)}async close(){if(!this._midiInput)return Promise.resolve(this);try{await this._midiInput.close()}catch(e){return Promise.reject(e)}return Promise.resolve(this)}getChannelModeByNumber(){d.validation&&console.warn("The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class.")}addListener(e,t,n={}){if(d.validation&&typeof n=="function"){let i=t!=null?[].concat(t):void 0;t=n,n={channels:i}}if(o.CHANNEL_EVENTS.includes(e)){n.channels===void 0&&(n.channels=o.MIDI_CHANNEL_NUMBERS);let i=[];return l.sanitizeChannels(n.channels).forEach(s=>{i.push(this.channels[s].addListener(e,t,n))}),i}else return super.addListener(e,t,n)}addOneTimeListener(e,t,n={}){return n.remaining=1,this.addListener(e,t,n)}on(e,t,n,i){return this.addListener(e,t,n,i)}hasListener(e,t,n={}){if(d.validation&&typeof n=="function"){let i=[].concat(t);t=n,n={channels:i}}return o.CHANNEL_EVENTS.includes(e)?(n.channels===void 0&&(n.channels=o.MIDI_CHANNEL_NUMBERS),l.sanitizeChannels(n.channels).every(i=>this.channels[i].hasListener(e,t))):super.hasListener(e,t)}removeListener(e,t,n={}){if(d.validation&&typeof n=="function"){let i=[].concat(t);t=n,n={channels:i}}if(n.channels===void 0&&(n.channels=o.MIDI_CHANNEL_NUMBERS),e==null)return l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i]&&this.channels[i].removeListener()}),super.removeListener();o.CHANNEL_EVENTS.includes(e)?l.sanitizeChannels(n.channels).forEach(i=>{this.channels[i].removeListener(e,t,n)}):super.removeListener(e,t,n)}addForwarder(e,t={}){let n;return e instanceof $e?n=e:n=new $e(e,t),this._forwarders.push(n),n}removeForwarder(e){this._forwarders=this._forwarders.filter(t=>t!==e)}hasForwarder(e){return this._forwarders.includes(e)}get name(){return this._midiInput.name}get id(){return this._midiInput.id}get connection(){return this._midiInput.connection}get manufacturer(){return this._midiInput.manufacturer}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get state(){return this._midiInput.state}get type(){return this._midiInput.type}get nrpnEventsEnabled(){return d.validation&&console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class."),!1}}/**
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
 */class mt extends _{constructor(){super(),this.defaults={note:{attack:l.from7bitToFloat(64),release:l.from7bitToFloat(64),duration:1/0}},this.interface=null,this.validation=!0,this._inputs=[],this._disconnectedInputs=[],this._outputs=[],this._disconnectedOutputs=[],this._stateChangeQueue=[],this._octaveOffset=0}async enable(e={},t=!1){if(l.isNode)try{window.navigator}catch{let c=await Object.getPrototypeOf(async function(){}).constructor(`
        let jzz = await import("jzz");
        return jzz.default;
        `)();global.navigator||(global.navigator={}),Object.assign(global.navigator,c)}if(this.validation=e.validation!==!1,this.validation&&(typeof e=="function"&&(e={callback:e,sysex:t}),t&&(e.sysex=!0)),this.enabled)return typeof e.callback=="function"&&e.callback(),Promise.resolve();const n={timestamp:this.time,target:this,type:"error",error:void 0},i={timestamp:this.time,target:this,type:"midiaccessgranted"},s={timestamp:this.time,target:this,type:"enabled"};try{typeof e.requestMIDIAccessFunction=="function"?this.interface=await e.requestMIDIAccessFunction({sysex:e.sysex,software:e.software}):this.interface=await navigator.requestMIDIAccess({sysex:e.sysex,software:e.software})}catch(a){return n.error=a,this.emit("error",n),typeof e.callback=="function"&&e.callback(a),Promise.reject(a)}this.emit("midiaccessgranted",i),this.interface.onstatechange=this._onInterfaceStateChange.bind(this);try{await this._updateInputsAndOutputs()}catch(a){return n.error=a,this.emit("error",n),typeof e.callback=="function"&&e.callback(a),Promise.reject(a)}return this.emit("enabled",s),typeof e.callback=="function"&&e.callback(),Promise.resolve(this)}async disable(){return this.interface&&(this.interface.onstatechange=void 0),this._destroyInputsAndOutputs().then(()=>{navigator&&typeof navigator.close=="function"&&navigator.close(),this.interface=null;let e={timestamp:this.time,target:this,type:"disabled"};this.emit("disabled",e),this.removeListener()})}getInputById(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return}if(t.disconnected){for(let n=0;n<this._disconnectedInputs.length;n++)if(this._disconnectedInputs[n]._midiInput&&this._disconnectedInputs[n].id===e.toString())return this._disconnectedInputs[n]}else for(let n=0;n<this.inputs.length;n++)if(this.inputs[n]._midiInput&&this.inputs[n].id===e.toString())return this.inputs[n]}getInputByName(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return;e=e.toString()}if(t.disconnected){for(let n=0;n<this._disconnectedInputs.length;n++)if(~this._disconnectedInputs[n].name.indexOf(e))return this._disconnectedInputs[n]}else for(let n=0;n<this.inputs.length;n++)if(~this.inputs[n].name.indexOf(e))return this.inputs[n]}getOutputByName(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return;e=e.toString()}if(t.disconnected){for(let n=0;n<this._disconnectedOutputs.length;n++)if(~this._disconnectedOutputs[n].name.indexOf(e))return this._disconnectedOutputs[n]}else for(let n=0;n<this.outputs.length;n++)if(~this.outputs[n].name.indexOf(e))return this.outputs[n]}getOutputById(e,t={disconnected:!1}){if(this.validation){if(!this.enabled)throw new Error("WebMidi is not enabled.");if(!e)return}if(t.disconnected){for(let n=0;n<this._disconnectedOutputs.length;n++)if(this._disconnectedOutputs[n]._midiOutput&&this._disconnectedOutputs[n].id===e.toString())return this._disconnectedOutputs[n]}else for(let n=0;n<this.outputs.length;n++)if(this.outputs[n]._midiOutput&&this.outputs[n].id===e.toString())return this.outputs[n]}noteNameToNumber(e){return this.validation&&console.warn("The noteNameToNumber() method is deprecated. Use Utilities.toNoteNumber() instead."),l.toNoteNumber(e,this.octaveOffset)}getOctave(e){return this.validation&&(console.warn("The getOctave()is deprecated. Use Utilities.getNoteDetails() instead"),e=parseInt(e)),!isNaN(e)&&e>=0&&e<=127?l.getNoteDetails(l.offsetNumber(e,this.octaveOffset)).octave:!1}sanitizeChannels(e){return this.validation&&console.warn("The sanitizeChannels() method has been moved to the utilities class."),l.sanitizeChannels(e)}toMIDIChannels(e){return this.validation&&console.warn("The toMIDIChannels() method has been deprecated. Use Utilities.sanitizeChannels() instead."),l.sanitizeChannels(e)}guessNoteNumber(e){return this.validation&&console.warn("The guessNoteNumber() method has been deprecated. Use Utilities.guessNoteNumber() instead."),l.guessNoteNumber(e,this.octaveOffset)}getValidNoteArray(e,t={}){return this.validation&&console.warn("The getValidNoteArray() method has been moved to the Utilities.buildNoteArray()"),l.buildNoteArray(e,t)}convertToTimestamp(e){return this.validation&&console.warn("The convertToTimestamp() method has been moved to Utilities.toTimestamp()."),l.toTimestamp(e)}async _destroyInputsAndOutputs(){let e=[];return this.inputs.forEach(t=>e.push(t.destroy())),this.outputs.forEach(t=>e.push(t.destroy())),Promise.all(e).then(()=>{this._inputs=[],this._outputs=[]})}_onInterfaceStateChange(e){this._updateInputsAndOutputs();let t={timestamp:e.timeStamp,type:e.port.state,target:this};if(e.port.state==="connected"&&e.port.connection==="open"){e.port.type==="output"?t.port=this.getOutputById(e.port.id):e.port.type==="input"&&(t.port=this.getInputById(e.port.id)),this.emit(e.port.state,t);const n=Object.assign({},t);n.type="portschanged",this.emit(n.type,n)}else if(e.port.state==="disconnected"&&e.port.connection==="pending"){e.port.type==="input"?t.port=this.getInputById(e.port.id,{disconnected:!0}):e.port.type==="output"&&(t.port=this.getOutputById(e.port.id,{disconnected:!0})),this.emit(e.port.state,t);const n=Object.assign({},t);n.type="portschanged",this.emit(n.type,n)}}async _updateInputsAndOutputs(){return Promise.all([this._updateInputs(),this._updateOutputs()])}async _updateInputs(){if(!this.interface)return;for(let t=this._inputs.length-1;t>=0;t--){const n=this._inputs[t];Array.from(this.interface.inputs.values()).find(s=>s===n._midiInput)||(this._disconnectedInputs.push(n),this._inputs.splice(t,1))}let e=[];return this.interface.inputs.forEach(t=>{if(!this._inputs.find(n=>n._midiInput===t)){let n=this._disconnectedInputs.find(i=>i._midiInput===t);n||(n=new ft(t)),this._inputs.push(n),e.push(n.open())}}),Promise.all(e)}async _updateOutputs(){if(!this.interface)return;for(let t=this._outputs.length-1;t>=0;t--){const n=this._outputs[t];Array.from(this.interface.outputs.values()).find(s=>s===n._midiOutput)||(this._disconnectedOutputs.push(n),this._outputs.splice(t,1))}let e=[];return this.interface.outputs.forEach(t=>{if(!this._outputs.find(n=>n._midiOutput===t)){let n=this._disconnectedOutputs.find(i=>i._midiOutput===t);n||(n=new pe(t)),this._outputs.push(n),e.push(n.open())}}),Promise.all(e)}get enabled(){return this.interface!==null}get inputs(){return this._inputs}get isNode(){return this.validation&&console.warn("WebMidi.isNode has been deprecated. Use Utilities.isNode instead."),l.isNode}get isBrowser(){return this.validation&&console.warn("WebMidi.isBrowser has been deprecated. Use Utilities.isBrowser instead."),l.isBrowser}get octaveOffset(){return this._octaveOffset}set octaveOffset(e){if(this.validation&&(e=parseInt(e),isNaN(e)))throw new TypeError("The 'octaveOffset' property must be an integer.");this._octaveOffset=e}get outputs(){return this._outputs}get supported(){return typeof navigator<"u"&&!!navigator.requestMIDIAccess}get sysexEnabled(){return!!(this.interface&&this.interface.sysexEnabled)}get time(){return performance.now()}get version(){return"3.1.14"}get flavour(){return"esm"}get CHANNEL_EVENTS(){return this.validation&&console.warn("The CHANNEL_EVENTS enum has been moved to Enumerations.CHANNEL_EVENTS."),o.CHANNEL_EVENTS}get MIDI_SYSTEM_MESSAGES(){return this.validation&&console.warn("The MIDI_SYSTEM_MESSAGES enum has been moved to Enumerations.SYSTEM_MESSAGES."),o.SYSTEM_MESSAGES}get MIDI_CHANNEL_MODE_MESSAGES(){return this.validation&&console.warn("The MIDI_CHANNEL_MODE_MESSAGES enum has been moved to Enumerations.CHANNEL_MODE_MESSAGES."),o.CHANNEL_MODE_MESSAGES}get MIDI_CONTROL_CHANGE_MESSAGES(){return this.validation&&console.warn("The MIDI_CONTROL_CHANGE_MESSAGES enum has been replaced by the Enumerations.CONTROL_CHANGE_MESSAGES array."),o.MIDI_CONTROL_CHANGE_MESSAGES}get MIDI_REGISTERED_PARAMETER(){return this.validation&&console.warn("The MIDI_REGISTERED_PARAMETER enum has been moved to Enumerations.REGISTERED_PARAMETERS."),o.REGISTERED_PARAMETERS}get NOTES(){return this.validation&&console.warn("The NOTES enum has been deprecated."),["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]}}const d=new mt;d.constructor=null;const gt=[{name:"Crash",url:"/samples/drum_kit/zildjian-16-inch-crash-001.wav",padIndex:0},{name:"Crash Alt",url:"/samples/drum_kit/sabian-15-inch-custom-crash-3.wav",padIndex:1},{name:"Ride",url:"/samples/drum_kit/paiste-22-inch-custom-ride-001.wav",padIndex:2},{name:"FX Cymbal",url:"/samples/drum_kit/cymbal-grab-stop-mute-001.wav",padIndex:3},{name:"Closed HH",url:"/samples/drum_kit/vintage-custom-14-inch-hi-hat-001.wav",padIndex:4},{name:"Closed HH Alt",url:"/samples/drum_kit/vintage-custom-14-inch-hi-hat-003.wav",padIndex:5},{name:"Open HH",url:"/samples/drum_kit/vintage-custom-14-inch-hi-hat-010.wav",padIndex:6},{name:"HH Variation",url:"/samples/drum_kit/vintage-custom-14-inch-hi-hat-015.wav",padIndex:7},{name:"Low Tom",url:"/samples/drum_kit/low-floor-tom-sonor-force-3007-001.wav",padIndex:8},{name:"Mid Tom",url:"/samples/drum_kit/mid-low-tom-sonor-force-3007-002.wav",padIndex:9},{name:"High Tom",url:"/samples/drum_kit/high-tom-sonor-force-3007-002.wav",padIndex:10},{name:"Alt Tom",url:"/samples/drum_kit/mid-high-tom-sonor-force-3007-002.wav",padIndex:11},{name:"Kick",url:"/samples/drum_kit/kick-sonor-force-3007-001.wav",padIndex:12},{name:"Snare Rim",url:"/samples/drum_kit/rim-hit-perc-oneshot-001.wav",padIndex:13},{name:"Snare Alt",url:"/samples/drum_kit/rim-hit-perc-oneshot-003.wav",padIndex:14},{name:"Clap/Alt Rim",url:"/samples/drum_kit/rim-hit-perc-oneshot-005.wav",padIndex:15}],Pe=gt;var bt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,Q=(r,e,t,n)=>{for(var i=n>1?void 0:n?yt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&bt(e,t,i),i};let P=class extends y{constructor(){super(...arguments),this.index=0,this.active=!1,this.keyBinding="",this.sampleName=""}render(){return g`
      <sp-button
        class="pad ${this.active?"active":""}"
        @click=${this._handleClick}
      >
        <span class="key-binding">${this.keyBinding}</span>
        ${this.sampleName?g`<span class="sample-name">${this.sampleName}</span>`:""}
      </sp-button>
    `}_handleClick(){this.dispatchEvent(new CustomEvent("pad-click",{bubbles:!0,composed:!0}))}};P.styles=C`
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
  `;Q([p({type:Number})],P.prototype,"index",2);Q([p({type:Boolean})],P.prototype,"active",2);Q([p({type:String})],P.prototype,"keyBinding",2);Q([p({type:String})],P.prototype,"sampleName",2);P=Q([I("drum-pad")],P);var vt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,le=(r,e,t,n)=>{for(var i=n>1?void 0:n?_t(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&vt(e,t,i),i};let H=class extends y{constructor(){super(...arguments),this.mode="performance",this.currentStep=0,this.sampleNames=new Map}_getPadButton(r){const e=this.shadowRoot?.querySelectorAll("drum-pad");return!e||!e[r]?null:e[r].shadowRoot?.querySelector("sp-button")||null}triggerPadDown(r){const e=this._getPadButton(r);e&&(e.active=!0)}triggerPadUp(r){const e=this._getPadButton(r);e&&(e.active=!1)}render(){const r=["1","2","3","4","q","w","e","r","a","s","d","f","z","x","c","v"];return g`
      ${Array(16).fill(0).map((e,t)=>g`
            <drum-pad
              .index=${t}
              .keyBinding=${r[t]} 
              .sampleName=${this.sampleNames.get(t)||""}
              .active=${this.mode==="sequencer"&&t===this.currentStep}
              @pad-click=${()=>this._handlePadClick(t)}
            ></drum-pad>
          `)}
    `}_handlePadClick(r){this.dispatchEvent(new CustomEvent("pad-triggered",{detail:{index:r},bubbles:!0,composed:!0}))}};H.styles=C`
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
  `;le([p({type:String})],H.prototype,"mode",2);le([p({type:Number})],H.prototype,"currentStep",2);le([p({type:Object})],H.prototype,"sampleNames",2);H=le([I("pad-grid")],H);var Et=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,F=(r,e,t,n)=>{for(var i=n>1?void 0:n?wt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&Et(e,t,i),i};let x=class extends y{constructor(){super(...arguments),this.label="",this.active=!1,this.variant="square",this.size="medium",this.highlight=""}render(){return g`
      <button
        class="${[this.variant,this.size,this.active?"active":""].filter(Boolean).join(" ")}"
        aria-pressed="${this.active}"
        style="${this.highlight?`--sp-button-highlight: ${this.highlight};`:""}"
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `}_handleClick(r){this.dispatchEvent(new CustomEvent("sp-click",{detail:{originalEvent:r},bubbles:!0,composed:!0}))}};x.styles=[C`
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
  `];F([p({type:String})],x.prototype,"label",2);F([p({type:Boolean})],x.prototype,"active",2);F([p({type:String})],x.prototype,"variant",2);F([p({type:String})],x.prototype,"size",2);F([p({type:String})],x.prototype,"highlight",2);x=F([I("sp-button")],x);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=r=>r.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St={CHILD:2},At=r=>(...e)=>({_$litDirective$:r,values:e});class Mt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=(r,e)=>{const t=r._$AN;if(t===void 0)return!1;for(const n of t)n._$AO?.(e,!1),q(n,e);return!0},se=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},Ge=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),It(e)}};function xt(r){this._$AN!==void 0?(se(this),this._$AM=r,Ge(this)):this._$AM=r}function Ct(r,e=!1,t=0){const n=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(e)if(Array.isArray(n))for(let s=t;s<n.length;s++)q(n[s],!1),se(n[s]);else n!=null&&(q(n,!1),se(n));else q(this,r)}const It=r=>{r.type==St.CHILD&&(r._$AP??=Ct,r._$AQ??=xt)};class Rt extends Mt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Ge(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(q(this,e),se(this))}setValue(e){if(Nt(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=()=>new $t;class $t{}const he=new WeakMap,Pt=At(class extends Rt{render(r){return m}update(r,[e]){const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=r.options?.host,this.rt(this.ct=r.element)),m}rt(r){if(this.isConnected||(r=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=he.get(e);t===void 0&&(t=new WeakMap,he.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,r),r!==void 0&&this.G.call(this.ht,r)}else this.G.value=r}get lt(){return typeof this.G=="function"?he.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Ot=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,J=(r,e,t,n)=>{for(var i=n>1?void 0:n?kt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&Ot(e,t,i),i};let N=class extends y{constructor(){super(...arguments),this.sampleUrl="",this.waveColor="#4d98b3ff",this.height=100,this.playheadPosition=0,this.canvasRef=Tt(),this.peaks=[],this.resizeObserver=null,this.isLoading=!1,this.loadId=0}render(){return g`
      <canvas height="${this.height}" ${Pt(this.canvasRef)}></canvas>
      ${this.isLoading?g`<div class="message">Loading audio...</div>`:""}
    `}firstUpdated(){this._fetchAudio(),this.resizeObserver=new ResizeObserver(()=>this._drawWaveform()),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(r){r.has("sampleUrl")&&this.sampleUrl&&this._fetchAudio(),r.has("playheadPosition")&&this._drawWaveform()}async _fetchAudio(){if(!this.sampleUrl)return;const r=++this.loadId;this.isLoading=!0,this.requestUpdate();try{const e=await fetch(this.sampleUrl);if(!e.ok)throw new Error(`Fetch failed: ${e.status} ${e.statusText}`);const t=e.headers.get("content-type");t?.includes("audio")||console.warn("Unexpected content-type:",t,"for",this.sampleUrl);const n=await e.arrayBuffer();if(!n||n.byteLength===0)throw new Error("Empty audio file");const i=await new Promise((s,a)=>{N.audioContext.decodeAudioData(n.slice(0),s,a)});if(r!==this.loadId)return;this.peaks=this._getPeaks(i.getChannelData(0),1e3)}catch(e){console.error("Error loading audio:",this.sampleUrl,e),this.peaks=[]}finally{r===this.loadId&&(this.isLoading=!1,this.requestUpdate(),requestAnimationFrame(()=>this._drawWaveform()))}}_getPeaks(r,e){const t=Math.max(1,Math.floor(r.length/e)),n=new Array(e);for(let i=0;i<e;i++){let s=0;const a=i*t,c=Math.min(a+t,r.length);for(let h=a;h<c;h++){const u=Math.abs(r[h]);u>s&&(s=u)}n[i]=s}return n}_drawWaveform(){const r=this.canvasRef.value;if(!r||this.peaks.length===0)return;const e=r.getContext("2d");if(!e)return;const t=this.offsetWidth||r.clientWidth,n=this.height;if(t===0||n===0)return;r.width=t,r.height=n;const i=n/2,s=t/this.peaks.length;e.clearRect(0,0,t,n),e.fillStyle=this.waveColor;for(let a=0;a<this.peaks.length;a++){const c=this.peaks[a]*n;e.fillRect(a*s,i-c/2,1,c)}if(this.playheadPosition>0&&this.playheadPosition<1){const a=this.playheadPosition*t;e.fillStyle="red",e.fillRect(a,0,2,n)}}};N.styles=C`
    :host {
      display: block;
      width: 100%;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: transparent;
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
  `;N.audioContext=new AudioContext;J([p({type:String})],N.prototype,"sampleUrl",2);J([p({type:String})],N.prototype,"waveColor",2);J([p({type:Number})],N.prototype,"height",2);J([p({type:Number})],N.prototype,"playheadPosition",2);N=J([I("sample-waveform")],N);var Dt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,Z=(r,e,t,n)=>{for(var i=n>1?void 0:n?Bt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&Dt(e,t,i),i};let O=class extends y{constructor(){super(...arguments),this.currentPadIndex=-1,this.currentSampleName="",this.bpm=120,this.mode="performance"}render(){return g`
      <div class="panel">
        <!-- TOP STRIP -->
        <div class="top-bar">
          <div class="bpm">
            BPM
            <input
              type="number"
              .value=${String(this.bpm)}
              @change=${this._handleBpmChange}
            />
          </div>
          <div>${this.mode}</div>
        </div>

        <!-- MAIN CORE -->
        <div class="main">
          <div class="fx-col">
            <sp-button class="fx-button">FX1</sp-button>
            <sp-button class="fx-button">FX2</sp-button>
            <sp-button class="fx-button">FX3</sp-button>
          </div>

          <div class="screen">
            ${this.currentSampleName?g`
                  <div class="sample-name">${this.currentSampleName}</div>
                  <sample-waveform
                    .sampleUrl=${`/samples/${this.currentSampleName}.wav`}
                    data-sample-index=${this.currentPadIndex}
                  ></sample-waveform>
                `:g`<div>No sample</div>`}
          </div>

          <div class="fx-col">
            <sp-button class="fx-button">FX4</sp-button>
            <sp-button class="fx-button">FX5</sp-button>
            <sp-button class="fx-button">FX6</sp-button>
          </div>
        </div>

        <!-- KNOBS -->
        <div class="knobs">
          <div class="knob"></div>
          <div class="knob"></div>
          <div class="knob"></div>
          <div class="knob"></div>
        </div>

        <!-- PERFORMANCE -->
        <div class="section">
          <sp-button>PATTERN</sp-button>
          <sp-button>LENGTH</sp-button>
          <sp-button>QUANT</sp-button>
          <sp-button class="tap-tempo">TAP</sp-button>
        </div>

        <!-- SAMPLING -->
        <div class="section">
          <sp-button>DEL</sp-button>
          <sp-button>REC</sp-button>
          <sp-button>RES</sp-button>
        </div>
      </div>
    `}_handleBpmChange(r){const e=r.target,t=Number(e.value);this.dispatchEvent(new CustomEvent("bpm-change",{detail:{bpm:t},bubbles:!0,composed:!0}))}};O.styles=C`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
      color: #fff;
    }

    /* --- CORE LAYOUT --- */
    .panel {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* --- TOP COMPACT STRIP --- */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      background: #2a2a2a;
      padding: 0.5rem 0.75rem;
      border-radius: 16px;
      font-size: 0.8rem;
    }

    .bpm {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    input {
      width: 60px;
      background: #1a1a1a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      padding: 0.2rem;
    }

    /* --- MAIN SECTION --- */
    .main {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0.75rem;
      align-items: center;
      background: #2a2a2a;
      padding: 0.75rem;
      border-radius: 20px;
    }

    /* FX columns */
    .fx-col {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .fx-button {
      width: 64px;
      height: 36px;
      font-size: 0.75rem;
    }

    /* CENTER SCREEN */
    .screen {
      background: #111;
      border-radius: 16px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
      gap: 0.25rem;
    }

    .sample-name {
      font-size: 0.8rem;
      text-align: center;
      word-break: break-word;
    }

    sample-waveform {
      width: 100%;
      height: 40px;
    }

    /* --- KNOBS --- */
    .knobs {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      background: #1a1a1a;
      padding: 0.5rem;
      border-radius: 16px;
    }

    .knob {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #222;
    }

    /* --- LOWER BUTTON GROUPS --- */
    .section {
      background: #2a2a2a;
      border-radius: 16px;
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      justify-content: center;
    }

    sp-button {
      font-size: 0.7rem;
      min-width: 52px;
    }

    .tap-tempo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    /* --- DESKTOP --- */
    @media (min-width: 1024px) {
      .panel {
        gap: 1rem;
      }

      .main {
        grid-template-columns: 80px 1fr 80px;
        padding: 1rem;
      }

      .fx-button {
        width: 80px;
        height: 40px;
      }

      .knobs {
        justify-content: center;
        gap: 1rem;
      }

      .knob {
        width: 60px;
        height: 60px;
      }

      .section {
        justify-content: space-between;
      }
    }
  `;Z([p({type:Number})],O.prototype,"currentPadIndex",2);Z([p({type:String})],O.prototype,"currentSampleName",2);Z([p({type:Number})],O.prototype,"bpm",2);Z([p({type:String})],O.prototype,"mode",2);O=Z([I("control-panel")],O);class Lt extends EventTarget{constructor(){super(),this.activePlaybacks=new Map,this.animationFrameId=null,this.bpm=120,this.isBpmSyncEnabled=!0,this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.startProgressLoop()}setPlaybackSettings(e,t){this.bpm=e,this.isBpmSyncEnabled=t}play(e,t,n=1){if(!this.audioContext)return console.error("AudioContext is not available."),"";const i=`${Date.now()}-${Math.random().toString(36).substr(2,9)}`,s=this.audioContext.createBufferSource();s.buffer=e,s.playbackRate.value=n,s.connect(this.audioContext.destination);const a=e.duration;let c=0,h=a;this.isBpmSyncEnabled?(h=a/n,c=this.audioContext.currentTime):(c=this.audioContext.currentTime,h=a/n),s.start(c);const u={id:i,source:s,buffer:e,padIndex:t,startTime:c,duration:h,bufferDuration:a,playbackRate:n,progress:0};return this.activePlaybacks.set(i,u),s.onended=()=>{this.dispatchEvent(new CustomEvent("playback-ended",{detail:{id:i,padIndex:t}})),this.activePlaybacks.delete(i),this.checkProgressLoop()},this.dispatchEvent(new CustomEvent("playback-started",{detail:{id:i,padIndex:t,startTime:c}})),i}stop(e){const t=this.activePlaybacks.get(e);t&&(t.source.stop(),this.activePlaybacks.delete(e),this.dispatchEvent(new CustomEvent("playback-stopped",{detail:{id:e,padIndex:t.padIndex}})))}stopAll(){this.activePlaybacks.forEach((e,t)=>{e.source.stop(),this.dispatchEvent(new CustomEvent("playback-stopped",{detail:{id:t,padIndex:e.padIndex}}))}),this.activePlaybacks.clear(),this.checkProgressLoop()}updateSettings(e,t){this.bpm=e,this.isBpmSyncEnabled=t}startProgressLoop(){this.animationFrameId===null&&(this.animationFrameId=requestAnimationFrame(()=>this.updateProgress()))}stopProgressLoop(){this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}updateProgress(){const e=this.audioContext.currentTime;let t=!1;this.activePlaybacks.forEach((n,i)=>{t=!0;const s=e-n.startTime;n.progress=Math.min(s/n.duration,1),this.dispatchEvent(new CustomEvent("playback-progress",{detail:{id:i,padIndex:n.padIndex,progress:n.progress,currentTime:s,duration:n.duration,bufferDuration:n.bufferDuration,playbackRate:n.playbackRate,startTime:n.startTime}}))}),t?this.animationFrameId=requestAnimationFrame(()=>this.updateProgress()):this.stopProgressLoop()}checkProgressLoop(){this.activePlaybacks.size===0?this.stopProgressLoop():this.startProgressLoop()}getCurrentTime(){return this.audioContext.currentTime}getBpm(){return this.bpm}getAudioContext(){return this.audioContext}getIsBpmSyncEnabled(){return this.isBpmSyncEnabled}getActivePlaybacks(){return Array.from(this.activePlaybacks.values())}}let ue=null;function Ut(){return ue||(ue=new Lt),ue}var Ht=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,E=(r,e,t,n)=>{for(var i=n>1?void 0:n?Gt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&Ht(e,t,i),i};let v=class extends y{constructor(){super(...arguments),this.samples=new Map,this.sampleNames=new Map,this.midiEnabled=!1,this.midiInputs=[],this.isLoading=!0,this.currentPadIndex=-1,this.bpm=120,this.currentMode="performance",this.currentStep=0,this.keyMap={1:0,2:1,3:2,4:3,q:4,w:5,e:6,r:7,a:8,s:9,d:10,f:11,z:12,x:13,c:14,v:15},this._handleBpmChange=r=>{const e=r.target;this.bpm=Number(e.value)},this._handleModeChange=r=>{const e=r.target;this.currentMode=e.value},this._handlePadTrigger=r=>{const{index:e}=r.detail;this.currentPadIndex=e;const t=this.samples.get(e);t&&this.audioPlaybackManager&&this.audioPlaybackManager.play(t,e,1)},this._handlePlaybackStarted=r=>{const{id:e,padIndex:t,startTime:n}=r.detail;console.log(`Playback started: ID=${e}, Pad=${t}, Time=${n}`)},this._handlePlaybackProgress=r=>{const{padIndex:e,progress:t}=r.detail,n=this.shadowRoot?.querySelector("control-panel");if(n){const s=n.shadowRoot?.querySelector("sample-waveform");s&&s.dataset.sampleIndex===e.toString()&&(s.playheadPosition=t,s.requestUpdate())}},this._handlePlaybackEnded=r=>{const{id:e,padIndex:t}=r.detail;console.log(`Playback ended: ID=${e}, Pad=${t}`)}}connectedCallback(){super.connectedCallback(),this.initAudioPlaybackManager(),this.initMidi(),this.initKeyboardEvents()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeyDown),window.removeEventListener("keyup",this._handleKeyUp)}_getPadGrid(){return this.shadowRoot?.querySelector("pad-grid")??null}initKeyboardEvents(){this._handleKeyDown=this._handleKeyDown.bind(this),this._handleKeyUp=this._handleKeyUp.bind(this),window.addEventListener("keydown",this._handleKeyDown),window.addEventListener("keyup",this._handleKeyUp)}_handleKeyDown(r){if(r.repeat)return;const e=r.key.toLowerCase();if(e in this.keyMap){r.preventDefault();const t=this.keyMap[e];this._handlePadTrigger(new CustomEvent("pad-triggered",{detail:{index:t}})),this._getPadGrid()?.triggerPadDown(t)}}_handleKeyUp(r){const e=r.key.toLowerCase();if(e in this.keyMap){r.preventDefault();const t=this.keyMap[e];this._getPadGrid()?.triggerPadUp(t)}}initAudioPlaybackManager(){this.audioPlaybackManager=Ut(),this.audioPlaybackManager.addEventListener("playback-progress",this._handlePlaybackProgress),this.audioPlaybackManager.addEventListener("playback-started",this._handlePlaybackStarted),this.audioPlaybackManager.addEventListener("playback-ended",this._handlePlaybackEnded),this.audioPlaybackManager.setPlaybackSettings(this.bpm,this.currentMode==="sequencer"),this.loadDefaultSamples()}async loadDefaultSamples(){this.isLoading=!0;try{await Promise.all(Pe.map(async r=>{try{const t=await(await fetch(r.url)).arrayBuffer();if(!this.audioPlaybackManager)throw new Error("AudioPlaybackManager not initialized");const n=await this.audioPlaybackManager.getAudioContext().decodeAudioData(t);this.samples.set(r.padIndex,n),this.sampleNames.set(r.padIndex,r.name)}catch(e){console.error(`Failed to load sample ${r.name}:`,e)}}))}catch(r){console.error("Failed to load samples:",r)}this.isLoading=!1}async initMidi(){try{await d.enable(),this.midiEnabled=!0,this.midiInputs=d.inputs,this.midiInputs.forEach(r=>{r.addListener("noteon",e=>{const t=e.note.number%16;this._handlePadTrigger(new CustomEvent("pad-triggered",{detail:{index:t}}))})})}catch(r){console.error("Failed to initialize MIDI:",r)}}updated(r){if((r.has("bpm")||r.has("currentMode"))&&this.audioPlaybackManager){const e=this.currentMode==="sequencer";this.audioPlaybackManager.updateSettings(this.bpm,e)}}render(){const r=this.currentPadIndex>=0&&this.sampleNames.get(this.currentPadIndex)||"",e=this.midiInputs.length>0?this.midiInputs.map(t=>t.name||"Unnamed device").join(", "):"No MIDI devices connected.";return g`
      <div class="app-body">
        <pad-grid
          .mode=${this.currentMode}
          .currentStep=${this.currentStep}
          .sampleNames=${this.sampleNames}
          @pad-triggered=${this._handlePadTrigger}
        ></pad-grid>

        <div class="controls-shell">
          <div class="control-stack">
            <section class="control-page">
              <div class="title-row">
                <h2 class="title">FL-404</h2>
                <div class="small-label">${this.currentMode}</div>
              </div>

              <div class="compact-grid">
                <label class="field">
                  <span>BPM</span>
                  <input
                    type="number"
                    min="60"
                    max="200"
                    .value=${String(this.bpm)}
                    @change=${this._handleBpmChange}
                  />
                </label>

                <label class="field">
                  <span>Mode</span>
                  <select
                    .value=${this.currentMode}
                    @change=${this._handleModeChange}
                  >
                    <option value="performance">Performance</option>
                    <option value="sequencer">Sequencer</option>
                  </select>
                </label>
              </div>

              <div class="sample-line">
                ${this.currentPadIndex>=0?g`Pad ${this.currentPadIndex+1}:
                      ${r||"Unnamed sample"}`:g`Tap a pad to show the loaded sample name.`}
              </div>
            </section>

            <section class="control-page">
              <div class="midi-status">
                MIDI: ${this.midiEnabled?"Enabled":"Disabled"}
                ${this.midiEnabled?g` (${this.midiInputs.length}
                      device${this.midiInputs.length!==1?"s":""}
                      connected)`:""}
              </div>

              <div class="devices">${e}</div>

              <div class="sample-count">
                Samples loaded: ${this.samples.size}/${Pe.length}
              </div>

              <div class="control-panel-wrap">
              <div class="control-stack">
              .currentPadIndex=${this.currentPadIndex}
              .isLoading=${this.isLoading}
              .currentSampleName=${r}
              .bpm=${this.bpm}
              .mode=${this.currentMode}
              @bpm-change=${this._handleBpmChange}
              @mode-change=${this._handleModeChange}
              <div class="control-page"><control-panel ...></control-panel></div>
              <div class="control-page">…sampling controls…</div>
              <div class="control-page">…fx routing…</div>
            </div>
                ></control-panel>
              </div>
            </section>

            <section class="control-page">
              <div class="title-row">
                <h2 class="title">Swipe</h2>
              </div>

              <div class="stack-note">
                The control area is split into separate pages on narrow screens,
                so the pad stays fully visible.
              </div>

              <div class="sample-count">
                Current step: ${this.currentStep+1}
              </div>

              <div class="sample-count">
                Last selected pad:
                ${this.currentPadIndex>=0?this.currentPadIndex+1:"none"}
              </div>
            </section>
          </div>
        </div>
      </div>
    `}};v.styles=C`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      color: var(--sp-foreground);
      font-family:
        system-ui,
        -apple-system,
        sans-serif;
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100dvh;
      height: 100dvh;
      overflow: hidden;
    }

    .app-body {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      gap: 0.75rem;
      padding: 0.75rem;
    }

    pad-grid {
      order: 1;
      flex: 1 1 0;
      min-height: 0;
      width: 100%;
    }

    .controls-shell {
      order: 2;
      width: 100%;
      min-width: 0;
      min-height: 0;
    }

    .control-stack {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }

    .control-page {
      background: var(--sp-background);
      border-radius: 24px;
      padding: 0.75rem;
      box-shadow:
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.2);
      min-width: 0;
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .title {
      margin: 0;
      font-size: 1.35rem;
      line-height: 1;
      font-family: "Times New Roman", Times, serif;
      letter-spacing: 0.02em;
    }

    .compact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      align-items: end;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.82rem;
      color: var(--sp-foreground);
      min-width: 0;
    }

    input[type="number"],
    select {
      width: 100%;
      background: #3a3a3a;
      color: #fff;
      border: 1px solid #4a4a4a;
      border-radius: 10px;
      padding: 0.45rem 0.55rem;
      font: inherit;
      min-width: 0;
    }

    .small-label {
      font-size: 0.82rem;
      color: #aaa;
      line-height: 1.35;
    }

    .sample-line {
      margin-top: 0.75rem;
      font-size: 0.9rem;
      color: #ddd;
      line-height: 1.35;
      word-break: break-word;
    }

    .midi-status {
      font-size: 0.92rem;
      color: #aaa;
      line-height: 1.35;
    }

    .devices {
      margin-top: 0.5rem;
      font-size: 0.86rem;
      color: #bbb;
      line-height: 1.35;
      word-break: break-word;
    }

    .control-panel-wrap {
      margin-top: 0.75rem;
      min-width: 0;
    }

    .control-panel-wrap control-panel {
      display: block;
      width: 100%;
    }

    .stack-note {
      margin-top: 0.5rem;
      font-size: 0.86rem;
      color: #bbb;
      line-height: 1.35;
    }

    .sample-count {
      margin-top: 0.5rem;
      font-size: 0.86rem;
      color: #bbb;
      line-height: 1.35;
    }

    @media (max-width: 1023px) {
      .controls-shell {
        height: clamp(190px, 28dvh, 280px);
      }

      .control-stack {
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        scroll-snap-type: y mandatory;
        padding-right: 0.15rem;
      }

      .control-page {
        min-height: 100%;
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }

      .control-panel-wrap control-panel {
        max-height: calc(28dvh - 6.5rem);
        overflow: hidden;
      }
    }

    @media (min-width: 1024px) {
      .app-body {
        flex-direction: row;
        align-items: stretch;
        gap: 1rem;
        padding: 1rem;
      }

      .controls-shell {
        order: 1;
        width: min(34vw, 420px);
        height: 100%;
        overflow: auto;
      }

      pad-grid {
        order: 2;
        min-width: 0;
      }

      .control-stack {
        height: auto;
        overflow: visible;
      }

      .control-page {
        padding: 1rem;
      }

      .title {
        font-size: var(--xtra-big-ass-heading);
      }

      .compact-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `;E([S()],v.prototype,"samples",2);E([S()],v.prototype,"sampleNames",2);E([S()],v.prototype,"midiEnabled",2);E([S()],v.prototype,"midiInputs",2);E([S()],v.prototype,"isLoading",2);E([S()],v.prototype,"currentPadIndex",2);E([p({type:Number})],v.prototype,"bpm",2);E([p({type:String})],v.prototype,"currentMode",2);E([S()],v.prototype,"currentStep",2);v=E([I("sp-app")],v);var Ft=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,ee=(r,e,t,n)=>{for(var i=n>1?void 0:n?zt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&Ft(e,t,i),i};let k=class extends y{constructor(){super(...arguments),this.activeName="",this.regions=[]}firstUpdated(){requestAnimationFrame(()=>this._scrollToActive("instant"));const r=new ResizeObserver(()=>this._scrollToActive("smooth"));r.observe(this.navContainer),this._resizeObserver=r}updated(r){(r.has("activeName")||r.has("regions"))&&this._scrollToActive("smooth")}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}render(){return g`
      <div class="nav-bar">
        <div class="logo">
          <img src="/favicon.svg" alt="Logo" />
          <div>
            FINITE <br />
            LOOPS
          </div>
        </div>

        <div class="nav-container">
          <nav class="nav-links">
            ${this.regions.map((r,e)=>g`
                <button
                  class=${this.activeName===r.name?"active":""}
                  @click=${()=>this._dispatchNavigate(e)}
                >
                  ${r.name}
                </button>
              `)}
          </nav>
        </div>
      </div>
    `}_scrollToActive(r){if(!this.navContainer)return;const e=this.regions.findIndex(u=>u.name===this.activeName);if(e<0)return;const n=Array.from(this.navLinks.querySelectorAll("button"))[e];if(!n)return;const i=this.navContainer.getBoundingClientRect(),s=n.getBoundingClientRect(),a=this.navContainer.scrollLeft,h=s.left-i.left+s.width/2+a-i.width/2;this.navContainer.scrollTo({left:h,behavior:r})}_dispatchNavigate(r){this.dispatchEvent(new CustomEvent("navigate-to",{detail:{index:r},bubbles:!0,composed:!0}))}};k.styles=C`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--lums-top-nav-height);
      z-index: 100;
      container-type: inline-size;
      container-name: nav-wrapper;
    }

    .nav-bar {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      background: rgba(231, 231, 231, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .nav-container {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      overflow-x: auto;
      overflow-y: hidden;
      mask-image: linear-gradient(
        to right,
        transparent,
        black 15%,
        black 85%,
        transparent
      );
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .nav-container::-webkit-scrollbar {
      display: none;
    }

    .nav-links {
      display: flex;
      gap: 1.2rem;
      padding: 0 1rem;
    }

    button {
      background: none;
      border: none;
      font-size: 0.8rem;
      font-weight: 600;
      color: #999;
      cursor: pointer;
      white-space: nowrap;
      transition:
        color var(--lums-transition-md) ease,
        opacity var(--lums-transition-md) ease;
      flex-shrink: 0;
    }

    button.active {
      color: #000;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: --lums-gap-sm;
      font-weight: 800;
      font-size: 0.8rem;
      flex-shrink: 0;
      line-height: 1.1;
      cursor: pointer;
    }

    .logo img {
      width: 32px;
      height: 32px;
      display: block;
    }

    @container nav-wrapper (max-width: 600px) {
      .nav-container {
        justify-content: flex-start;
        mask-image: linear-gradient(
          to right,
          transparent,
          black 6%,
          black 94%,
          transparent
        );
      }

      button:not(.active) {
        opacity: 0.3;
        transform: scale(0.9);
      }
    }
  `;ee([p({type:String})],k.prototype,"activeName",2);ee([p({type:Array})],k.prototype,"regions",2);ee([_e(".nav-container")],k.prototype,"navContainer",2);ee([_e(".nav-links")],k.prototype,"navLinks",2);k=ee([I("top-nav")],k);var Vt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,de=(r,e,t,n)=>{for(var i=n>1?void 0:n?jt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&Vt(e,t,i),i};const qt=new Set(["Space","ArrowLeft","ArrowRight","KeyA","KeyD"]);let G=class extends y{constructor(){super(...arguments),this.activeRegionIndex=0,this.isDetailOpen=!1,this._isNavigating=!1,this.regions=[{id:"city",name:"The Overpass",desc:"Where the high-rises meet the highway bridge."},{id:"record-shop",name:"Record Shop",desc:"A small corner alley placeholder."},{id:"ancient-relic",name:"Artifacts",desc:"Various relics and tools from the past."},{id:"board",name:"The Board",desc:"Artist blog posts, newspaper stands, and community news."},{id:"soundsystem",name:"The Soundwall",desc:"Live audio events. Collective voting on the bass boost active."}],this._preventSelection=r=>{r.preventDefault()},this._handleKeyDown=r=>{switch(qt.has(r.code)&&r.preventDefault(),r.code){case"Space":this._toggleDetail();break;case"ArrowLeft":case"KeyA":this._goToRegion(this.activeRegionIndex-1);break;case"ArrowRight":case"KeyD":this._goToRegion(this.activeRegionIndex+1);break}},this._cancelNavigating=()=>{this._isNavigating=!1},this._handleWheel=r=>{this._viewport&&(r.preventDefault(),this._isNavigating=!1,this._viewport.scrollBy({left:r.deltaY,behavior:"auto"}))},this._handleScroll=()=>{if(!this._viewport)return;const r=this._viewport.offsetWidth,e=this._clampRegionIndex(Math.round(this._viewport.scrollLeft/r));if(this._isNavigating){e===this.activeRegionIndex&&(this._isNavigating=!1);return}e!==this.activeRegionIndex&&(this.activeRegionIndex=e,this.isDetailOpen=!1,this._syncHash(e,"replace"))},this._handleNavRequest=r=>{this._scrollToRegion(r.detail.index)},this._toggleDetail=()=>{this.isDetailOpen=!this.isDetailOpen},this._hydrateFromHash=()=>{const r=window.location.hash.replace("#","");if(!r)return;const e=this.regions.findIndex(t=>t.id===r);e!==-1&&(this.activeRegionIndex=e,requestAnimationFrame(()=>{this._scrollToRegion(e)}))},this._nextRegion=()=>{this._scrollToRegion(this.activeRegionIndex+1)},this._prevRegion=()=>{this._scrollToRegion(this.activeRegionIndex-1)}}get _activeRegion(){return this.regions[this.activeRegionIndex]}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._handleKeyDown),document.addEventListener("selectstart",this._preventSelection),document.addEventListener("dragstart",this._preventSelection)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeyDown),document.removeEventListener("selectstart",this._preventSelection),document.removeEventListener("dragstart",this._preventSelection),window.removeEventListener("popstate",this._hydrateFromHash),this.removeEventListener("wheel",this._handleWheel),this._viewport?.removeEventListener("pointerdown",this._cancelNavigating)}firstUpdated(){this.addEventListener("wheel",this._handleWheel,{passive:!1}),this._viewport.addEventListener("pointerdown",this._cancelNavigating),this._hydrateFromHash(),window.addEventListener("popstate",this._hydrateFromHash)}_clampRegionIndex(r){return Math.max(0,Math.min(this.regions.length-1,r))}_setActiveRegion(r){const e=this._clampRegionIndex(r);return this.activeRegionIndex=e,this.isDetailOpen=!1,e}_syncHash(r,e="push"){const n=`#${this.regions[r].id}`;if(window.location.hash!==n){if(e==="push"){window.history.pushState(null,"",n);return}window.history.replaceState(null,"",n)}}_scrollViewportToRegion(r,e="smooth"){if(!this._viewport)return;this._isNavigating=!0;const t=this._viewport.offsetWidth;this._viewport.scrollTo({left:r*t,behavior:e})}_goToRegion(r,e="smooth"){const t=this._setActiveRegion(r);this._syncHash(t,"push"),this._scrollViewportToRegion(t,e)}_scrollToRegion(r,e="smooth"){const t=this._setActiveRegion(r);this._scrollViewportToRegion(t,e)}_renderRegionScene(r){switch(r){case"city":return V`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- left pillar -->
						<rect x="250" y="220" width="30" height="100"
							fill="#666" />
						<!-- right pillar -->
						<rect x="520" y="220" width="30" height="100"
							fill="#666" />
						<!-- beam -->
						<rect x="240" y="200" width="320" height="30"
							fill="#888" />
					</g>
				`;case"record-shop":return V`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- outer ring -->
						<circle cx="400" cy="200" r="80"
							fill="#222" />
						<!-- groove lines -->
						<circle cx="400" cy="200" r="60"
							fill="none" stroke="#333" stroke-width="1" />
						<circle cx="400" cy="200" r="40"
							fill="none" stroke="#333" stroke-width="1" />
						<!-- label -->
						<circle cx="400" cy="200" r="20"
							fill="#c44" />
						<!-- spindle hole -->
						<circle cx="400" cy="200" r="4"
							fill="#222" />
					</g>
				`;case"ancient-relic":return V`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- obelisk / monolith -->
						<polygon points="380,80 420,80 425,320 375,320"
							fill="#777" />
						<!-- top cap -->
						<polygon points="375,80 425,80 410,50 390,50"
							fill="#999" />
					</g>
				`;case"board":return V`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- pole -->
						<rect x="395" y="200" width="10" height="120"
							fill="#8B7355" />
						<!-- sign board -->
						<rect x="340" y="130" width="120" height="80"
							rx="4" fill="#C4A35A" />
						<!-- text lines -->
						<line x1="360" y1="155" x2="440" y2="155"
							stroke="#6B5B3A" stroke-width="3" />
						<line x1="360" y1="175" x2="430" y2="175"
							stroke="#6B5B3A" stroke-width="3" />
						<line x1="360" y1="195" x2="415" y2="195"
							stroke="#6B5B3A" stroke-width="3" />
					</g>
				`;case"soundsystem":return V`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- bottom speaker -->
						<rect x="350" y="240" width="100" height="80"
							fill="#333" rx="4" />
						<circle cx="400" cy="280" r="25"
							fill="#222" stroke="#444" stroke-width="2" />
						<!-- middle speaker -->
						<rect x="350" y="155" width="100" height="80"
							fill="#333" rx="4" />
						<circle cx="400" cy="195" r="25"
							fill="#222" stroke="#444" stroke-width="2" />
						<!-- top speaker -->
						<rect x="360" y="80" width="80" height="70"
							fill="#333" rx="4" />
						<circle cx="400" cy="115" r="20"
							fill="#222" stroke="#444" stroke-width="2" />
					</g>
				`;default:return m}}render(){const r=this._activeRegion;return g`
			<div class="app-container">
				<top-nav
					.activeName=${r.name}
					.regions=${this.regions}
					@navigate-to=${this._handleNavRequest}
				></top-nav>

				<div class="detail-region">
					<div class="detail-card ${this.isDetailOpen?"active":""}">
						<h2>${r.name}</h2>
						<p>${r.desc}</p>
					</div>
				</div>

				<div class="world-viewport" @scroll=${this._handleScroll}>
					${this.regions.map(e=>g`
							<div class="region-section">
								<div class="region-scene">
									<svg
										viewBox="0 0 800 400"
										preserveAspectRatio="xMidYMax meet"
										xmlns="http://www.w3.org/2000/svg"
									>
										${this._renderRegionScene(e.id)}
									</svg>
								</div>
							</div>
						`)}
				</div>

				<div class="nav-left" @click=${this._prevRegion}>
					${this._caretSvg(!1)}
				</div>
				<div class="nav-right" @click=${this._nextRegion}>
					${this._caretSvg(!0)}
				</div>
			</div>
		`}_caretSvg(r=!1){return g`
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M15 18l-6-6 6-6"
					stroke="black"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					transform=${r?"rotate(180 12 12)":""}
				/>
			</svg>
		`}};G.styles=C`
		:host {
			display: block;
			width: 100vw;
			height: 100dvh;
			background: #e7e7e7;
			overflow: hidden;

			/* interaction UX */
			user-select: none;
			-webkit-user-select: none;
			-webkit-touch-callout: none;
			-webkit-tap-highlight-color: transparent;

			touch-action: pan-x;
		}

		.world-viewport,
		.region-section,
		.nav-left,
		.nav-right {
			touch-action: manipulation;
		}

		*,
		*::before,
		*::after {
			box-sizing: border-box;
			user-select: none;
			-webkit-user-select: none;
		}

		img,
		svg {
			-webkit-user-drag: none;
			user-drag: none;
		}

		.world-viewport {
			touch-action: pan-x;
		}

		/* END interaction UX */

		.app-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			position: relative;
		}

		.detail-region {
			position: absolute;
			top: var(--lums-top-nav-height);
			padding: 1rem;
			width: 100%;
			z-index: 10;
			pointer-events: none;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.detail-card {
			background: white;
			padding: 2rem;
			border-radius: 2px;
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
			width: 60vw;
			max-width: 400px;
			height: 40vh;
			transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
			transform: translateY(30px) scale(0.95);
			opacity: 0;
			pointer-events: none;
		}

		.detail-card.active {
			transform: translateY(0) scale(1);
			opacity: 1;
			pointer-events: auto;
		}

		.world-viewport {
			flex: 2;
			width: 100%;
			overflow-x: scroll;
			overflow-y: hidden;
			display: flex;
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
			-ms-overflow-style: none;
			scroll-behavior: smooth;
			overscroll-behavior-x: contain;
			z-index: 1;
		}

		.world-viewport::-webkit-scrollbar {
			display: none;
		}

		.region-section {
			width: 100vw;
			height: 100%;
			flex-shrink: 0;
			scroll-snap-align: start;
			scroll-snap-stop: always;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}

		.region-scene {
			width: 100%;
			height: 100%;
		}

		.region-scene svg {
			pointer-events: none;
		}

		.scene-object {
			cursor: pointer;
			pointer-events: auto;
			transition: filter 0.2s ease;
		}

		.scene-object:hover {
			filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.3));
		}

		.nav-left,
		.nav-right {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			z-index: 20;
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			background: transparent;
			user-select: none;
			filter: drop-shadow(0px 10px 18px rgba(0, 0, 0, 0.12))
				drop-shadow(0px -6px 4px rgba(255, 255, 255, 0.18))
				drop-shadow(3px 0px 2px rgba(0, 0, 0, 0.06))
				drop-shadow(-3px 0px 2px rgba(255, 255, 255, 0.1));
		}

		.nav-left {
			left: 0;
		}

		.nav-right {
			right: 0;
		}

		.nav-left.disabled,
		.nav-right.disabled {
			pointer-events: none;
			opacity: 0.25;
		}

		.nav-left svg,
		.nav-right svg {
			width: 48px;
			height: 48px;
			stroke: #111;
		}
	`;de([S()],G.prototype,"activeRegionIndex",2);de([S()],G.prototype,"isDetailOpen",2);de([_e(".world-viewport")],G.prototype,"_viewport",2);G=de([I("finite-loops")],G);
