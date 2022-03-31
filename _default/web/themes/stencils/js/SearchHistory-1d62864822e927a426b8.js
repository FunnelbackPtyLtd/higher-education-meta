/*! For license information please see SearchHistory-1d62864822e927a426b8.js.LICENSE.txt */
"use strict";(self.webpackChunkPlug_and_Play_Template=self.webpackChunkPlug_and_Play_Template||[]).push([[665],{68763:function(e,t,r){r.r(t),r.d(t,{default:function(){return u}});var a=r(67294),s=r(13122);class c{constructor(e){if(!e)throw new Error("dto is required when instantiating a new StorageService object");["storageAdapter"].forEach((t=>{if(!e[t])throw new Error("".concat(t," property is required when instantiating a new StorageService object"))})),this.storageAdapter=e.storageAdapter}delete(e){return this.storageAdapter.delete(e)}deleteAll(){return this.storageAdapter.deleteAll()}get(e){return this.storageAdapter.get(e)}getAll(){return this.storageAdapter.getAll()}set(e,t){return this.storageAdapter.set(e,t)}setAll(e){return this.storageAdapter.setAll(e)}}r(33948);const l=(0,a.createContext)({isReady:!1,clickHistory:[],searchHistory:[],clearHistory:()=>{},reloadHistory:()=>{}});const n=e=>{let{children:t,storageService:r}=e;const[s,c]=(0,a.useState)(!1),[n,i]=(0,a.useState)([]),[o,h]=(0,a.useState)([]);(0,a.useEffect)((()=>{const e=r.getAll(),t=e.clickHistory||[],a=e.searchHistory||[];i(t),h(a),c(!0)}),[]);const u=(0,a.useCallback)((e=>{const t=r.getAll(),a="click"===e?[]:t.clickHistory,s="search"===e?[]:t.searchHistory;r.setAll({clickHistory:a,searchHistory:s}),i(a),h(s),c(!0)}),[]);return a.createElement(l.Provider,{value:{clickHistory:n,clearHistory:u,searchHistory:o,isReady:s}},t)};function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},i.apply(this,arguments)}function o(e){let{isReady:t,data:r,type:c,clearHistory:l}=e;return r.length?a.createElement(a.Fragment,null,a.createElement("ul",{className:"search-history__list"},t&&r.map(((e,t)=>{const{title:r,url:l,time:n,query:i,count:o}=e,h=(0,s.Z)(new Date,new Date(n)),u="click"===c?r:"".concat(r," (").concat(o,")");return a.createElement("li",{className:"search-history__list-item",key:t},a.createElement("a",{href:l},u)," ",h,i&&a.createElement("span",null,' for "',i,'" '))}))),a.createElement("button",{type:"button",className:"search-history__button-clear",title:"Clear history",onClick:()=>{confirm("Your search history will be cleared")&&l(c)}},"Clear")):a.createElement("p",{className:"search-history__list-empty"},"Your ",c," history is empty.")}function h(e){const{isReady:t,searchHistory:r,clickHistory:s,clearHistory:c}=(0,a.useContext)(l);return a.createElement("div",{className:"search-history no-wysiwyg"},a.createElement("section",{className:"search-history__container"},a.createElement("h2",{className:"search-history__heading"},a.createElement("svg",{className:"svg-icon"},a.createElement("title",null,"Recently clicked results"),a.createElement("use",{href:"#favorite"})),"Recently clicked results"),a.createElement(o,i({type:"click",isReady:t,data:s,clearHistory:c},e))),a.createElement("section",{className:"search-history__container"},a.createElement("h2",{className:"search-history__heading"},a.createElement("svg",{className:"svg-icon"},a.createElement("title",null,"Recently searched results"),a.createElement("use",{href:"#search"})),"Recently searched results"),a.createElement(o,i({type:"search",isReady:t,data:r,clearHistory:c},e))))}function u(e){const{storageAdapter:t}=e,r=new c({storageAdapter:t});return a.createElement(n,{storageService:r},a.createElement(h,e))}}}]);
//# sourceMappingURL=SearchHistory-1d62864822e927a426b8.js.map