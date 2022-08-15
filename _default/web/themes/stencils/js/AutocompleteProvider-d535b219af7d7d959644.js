/*! For license information please see AutocompleteProvider-d535b219af7d7d959644.js.LICENSE.txt */
(self.webpackChunkPlug_and_Play_Template=self.webpackChunkPlug_and_Play_Template||[]).push([[701],{64945:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});r(33948);var n=r(67294),o=r(45697),a=r.n(o),c=r(27354),s=r(98069);class l{constructor(e){if(!e||0===e.length)throw new Error("At least one adapter is required for AutocompleteService");this.autocompleteAdapters=[],Array.from(e).forEach((e=>{if(!e||!e.hasOwnProperty("autocomplete"))throw new Error("".concat(e.constructor.name," is not implemented yet"));this.registerAdapter(e)}))}registerAdapter(e){this.autocompleteAdapters.push(e)}getResults(e,t){return Promise.all(this.autocompleteAdapters.map((r=>r.getResults(e,t)))).then((e=>{const t=[];let r=0,n=0;return e.map(((e,o)=>{let{data:a}=e;return r+=a.length,t[o]=[],a.length&&a.forEach((e=>{t[o][n++]=e})),t})),{results:t,count:r}})).catch((e=>(console.error(e),{results:[],count:0,error:e})))}}var i=r(48131),u=r(6838),m=r(66004);function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},d.apply(this,arguments)}const p=e=>{let{fetching:t,onSubmit:r,componentId:o}=e;return t?n.createElement("div",{className:"autocomplete-concierge__loader","aria-hidden":"true"},n.createElement("svg",{className:"svg-icon",role:"img",focusable:!1},n.createElement("use",{href:"#spinner"}))):n.createElement("button",{type:"submit",className:"autocomplete-concierge__submit",onClick:r,"aria-labelledby":"".concat(o,"-submit-label")},n.createElement("svg",{className:"svg-icon",role:"img",focusable:!1},n.createElement("title",{id:"".concat(o,"-submit-label")},"Submit search"),n.createElement("use",{href:"#search"})))};function f(e){const{id:t,templates:o,placeholder:a,debounce:l,action:u,method:f,hiddenFields:h,inputAttributes:v,showSubmit:g,onClose:E,showClear:b,showLoader:y}=e,{setSelectedIndex:C,selectedIndex:_,count:w,fetchResults:S,fetching:k}=(0,i.o)(),[x,P]=(0,n.useState)(null),[T,O]=(0,n.useState)(null),[N,j]=(0,n.useState)(null),[A,I]=(0,n.useState)(""),[L,R]=(0,n.useState)(""),[U,D]=(0,n.useState)(!1),[q,M]=(0,n.useState)("autocomplete-concierge__results"),F=(0,n.useRef)(),W=(0,n.useRef)(),K=(0,n.useRef)(null),G=(0,m.uY)(),[Y,B]=(0,m.S5)(),{keyboardProps:Q}=(0,c.v5)({onKeyUp:e=>{let t=-1;if(27===e.keyCode)return D(!1),C(-1),N||E(),void(K.current&&K.current.focus());if(40===e.keyCode&&(t=_+1>=w?0:_+1,Y[t]&&Y[t].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})),38===e.keyCode&&(t=_-1<0?w-1:_-1,Y[t]&&Y[t].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})),13===e.keyCode){if(-1===_)return void O(!0);Y[_].click()}C(t),P(t),D(!0)},onKeyDown:e=>(40===e.keyCode||38===e.keyCode||13===e.keyCode||27===e.keyCode?e.preventDefault():K.current.focus(),!1)}),{focusWithinProps:V}=(0,c.L_)({onFocusWithin:()=>{D(!0)},onBlurWithin:()=>{D(!1)}});(0,n.useEffect)((()=>{j((()=>U&&w>0))}),[w,U]),(0,n.useEffect)((()=>{const e=["autocomplete-concierge__results"];k&&N&&(e.push("autocomplete-concierge__results--expanding"),M(e.join(" "))),!k&&N&&(e.push("autocomplete-concierge__results--open"),M(e.join(" "))),k||N||(e.push("autocomplete-concierge__results--collapsing"),M(e.join(" ")))}),[N]),(0,n.useEffect)((()=>{const e=(0,m.jS)(document.location.href,"query");I(e||"")}),[]),(0,n.useEffect)((()=>{if(!A)return;const e=w>0?"".concat(w," results for ").concat(A):"No results found for ".concat(A);R(e)}),[w,A]),(0,n.useEffect)((()=>{const e=setTimeout((async()=>{""===A&&K.current.focus(),await S(A,o)}),l);return()=>clearTimeout(e)}),[A]),(0,n.useEffect)((()=>{if(T&&F.current&&K.current){if(K.current.value=A,G){const e={TYPE:"SUBMIT",title:"NEEDS_REFRESH",url:window.location.href,time:Date.now()};return void G.trackedEventWithCb(e,F.current.submit())}F.current.submit()}}),[T]);const z=(e,t,r)=>{if(G){const n={TYPE:"CLICK",url:e,query:A,title:t};G.trackedEventWithCb(n,r)}r&&!G&&r()},H=(0,n.useCallback)(((e,t)=>{e.preventDefault();const{action:r,action_t:n,title:o}=t;if("Q"===n||void 0===n)return I(r||t),void O(!0);z(r,o,(()=>document.location.href=r))}),[]);return n.createElement("div",d({className:"autocomplete-concierge no-wysiwyg",role:"search"},V),n.createElement("form",{ref:F,action:u,method:f,className:"autocomplete-concierge__form"},n.createElement("label",{className:"sr-only","aria-live":"polite",id:"".concat(t,"-label")},L),y&&n.createElement(p,{fetching:k,onSubmit:()=>O(!0),componentId:t}),n.createElement("input",d({id:"".concat(t,"-inputField"),ref:K,type:"text",autoComplete:"off",role:"combobox","aria-expanded":N,"aria-haspopup":"grid","aria-labelledby":"".concat(t,"-label"),"aria-autocomplete":"list","aria-controls":"".concat(t,"-grid"),"aria-activedescendant":-1===x?void 0:x,onChange:e=>{let{currentTarget:{value:t}}=e;I(t)},value:A,placeholder:a,className:"autocomplete-concierge__input",name:"query"},Q,v)),h&&h.map((e=>n.createElement("input",{key:e.id,type:"hidden",name:e.name,value:e.value}))),n.createElement("button",{type:"button",className:["autocomplete-concierge__submit",!b||b&&0===A.length?"hidden":""].join(" "),onClick:()=>I(""),onKeyUp:e=>{e.preventDefault(),13===e.keyCode&&I("")}},n.createElement("svg",{className:"svg-icon",role:"img",focusable:!1},n.createElement("title",null,"Clear search"),n.createElement("use",{href:"#close"})),"Clear"),g&&!y&&n.createElement("button",{type:"submit",className:"autocomplete-concierge__submit",onClick:()=>O(!0),"aria-labelledby":"".concat(t,"-submit-label")},n.createElement("svg",{className:"svg-icon",role:"img",focusable:!1},n.createElement("title",{id:"".concat(t,"-submit-label")},"Submit search"),n.createElement("use",{href:"#search"})))),n.createElement("div",d({ref:W,role:"grid","aria-labelledby":"".concat(t,"-label"),"aria-hidden":!N,id:"".concat(t,"-grid"),className:q,tabIndex:-1},Q,{style:{display:N?"":"none"}}),o&&o.map(((e,t)=>(e=>{const{template:t}=e,o=t.toLowerCase(),a=(0,n.useMemo)((()=>(0,n.lazy)((()=>r(42276)("./".concat(o))))),[]);return n.createElement(n.Suspense,{key:"component-".concat(o),fallback:n.createElement("span",{className:"sr-only"},"Loading template...")},n.createElement(a,e))})({...e,templateId:t,handleClick:H,trackedClick:z,childRefs:B})))),n.createElement(s.U4,{onDismiss:()=>j(!1)}))}function h(e){const{adapters:t}=e,r=new l(t);return n.createElement(i.g,{initialState:u.E3,reducer:u.fG,autocompleteService:r},n.createElement(f,e))}const{string:v,arrayOf:g,shape:E,number:b,bool:y,func:C}=a();f.propTypes={id:v,templates:g(E({id:v,label:v,template:v,serviceUrl:v,params:v})).isRequired,placeholder:v,debounce:b,action:v,method:v,showSubmit:y,isOpen:y,onClose:C,showClear:y,showLoader:y},f.defaultProps={id:"autocomplete-search",placeholder:"Start your search here...",debounce:500,action:"search.html",method:"GET",showSubmit:!0,isOpen:!1,onClose:()=>{},showClear:!1,showLoader:!1}},6838:function(e,t,r){"use strict";r.d(t,{E3:function(){return l},Ix:function(){return u},fG:function(){return i}});const n="PNP/AUTOCOMPLETE/UPDATE_RESULTS",o="PNP/AUTOCOMPLETE/SET_SELECTED",a="PNP/AUTOCOMPLETE/LOAD_REQUEST",c="PNP/AUTOCOMPLETE/LOAD_FAILED",s="PNP/AUTOCOMPLETE/LOAD_SUCCESS",l={results:[],count:0,query:"",selectedIndex:-1,fetching:!1,error:""},i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case a:return{...e,fetching:!0};case c:return{...e,error:t.error,fetching:!1};case s:return{...e,fetching:!1};case n:return{...e,results:t.results,count:t.count,query:t.query,selectedIndex:-1};case o:return{...e,selectedIndex:t.selectedIndex};default:return{...e}}},u=(e,t)=>({updateResults:(t,r)=>{e({type:n,results:t,count:r})},setSelectedIndex:t=>{e({type:o,selectedIndex:t})},fetchResults:async r=>{if(!r)return void e({type:n,results:[],count:0});e({type:a});const{results:o,count:l,error:i}=await t.getResults(r);if(i)return console.error("There was an error fetching results from the service."),console.info(i.message),e({type:n,results:[],count:0}),void e({type:c,error:i.message});e({type:n,results:o,count:l,query:r}),e({type:s})}})},48131:function(e,t,r){"use strict";r.d(t,{g:function(){return s},o:function(){return c}});r(33948);var n=r(67294),o=r(6838);const a=(0,n.createContext)();a.displayName="PNP-STORE";const c=()=>(0,n.useContext)(a),s=e=>{let{children:t,initialState:r,reducer:c,autocompleteService:s}=e;const[l,i]=(0,n.useReducer)(c,r),u=(0,n.useMemo)((()=>(0,o.Ix)(i,s)),[]);return n.createElement(a.Provider,{value:{...u,dispatch:i,...l}},t)}},42276:function(e,t,r){var n={"./cemetery--v15":[98938,938],"./cemetery--v15.jsx":[98938,938],"./cemetery--v16":[97841,841],"./cemetery--v16.jsx":[97841,841],"./faqs--v15":[81524,524],"./faqs--v15.jsx":[81524,524],"./faqs--v16":[20080,80],"./faqs--v16.jsx":[20080,80],"./organic":[44113,113],"./organic.jsx":[44113,113],"./people--v15":[62140,140],"./people--v15.jsx":[62140,140],"./people--v16":[12507,507],"./people--v16.jsx":[12507,507],"./planning_applications--v15":[53298,298],"./planning_applications--v15.jsx":[53298,298],"./planning_applications--v16":[38504,504],"./planning_applications--v16.jsx":[38504,504],"./programs--v15":[86588,588],"./programs--v15.jsx":[86588,588],"./programs--v16":[32723,723],"./programs--v16.jsx":[32723,723],"./roadworks--v15":[75554,554],"./roadworks--v15.jsx":[75554,554],"./roadworks--v16":[54563,563],"./roadworks--v16.jsx":[54563,563],"./services--v15":[91362,362],"./services--v15.jsx":[91362,362],"./services--v16 ":[45542,542],"./services--v16 .jsx":[45542,542]};function o(e){if(!r.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],o=t[0];return r.e(t[1]).then((function(){return r(o)}))}o.keys=function(){return Object.keys(n)},o.id=42276,e.exports=o}}]);
//# sourceMappingURL=AutocompleteProvider-d535b219af7d7d959644.js.map