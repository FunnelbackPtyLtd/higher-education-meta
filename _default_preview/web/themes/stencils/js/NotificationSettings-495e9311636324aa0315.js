/*! For license information please see NotificationSettings-495e9311636324aa0315.js.LICENSE.txt */
(self.webpackChunkPlug_and_Play_Template=self.webpackChunkPlug_and_Play_Template||[]).push([[672],{58614:function(e,t,n){"use strict";n.d(t,{K:function(){return i}});var s=n(65525);class i{constructor(e){if(!e)throw new Error("dto is required when instantiating a new UserService");["userAdapter"].forEach((t=>{if(!e[t])throw new Error("".concat(t," property is required when instantiating a new UserService"))})),this.promiseDebouncer=new s.D,this.userAdapter=e.userAdapter}get(e){return this.promiseDebouncer.debounce({method:"get",userId:e},(()=>this.userAdapter.get(e)))}setAll(e,t){return this.promiseDebouncer.debounce({method:"get",documentId:t},(()=>this.userAdapter.setAll(e,t)))}updateNotifications(e,t){return this.promiseDebouncer.debounce({method:"get",notificationKey:e},(()=>this.userAdapter.updateNotifications(e,t)))}toggleNotifications(e,t){return this.promiseDebouncer.debounce({method:"get",documentId:t},(()=>this.userAdapter.toggleNotifications(e)))}}},65525:function(e,t,n){"use strict";n.d(t,{D:function(){return s}});n(33948),n(17727);class s{constructor(){this.requests=new Map}debounce(e,t){const n=JSON.stringify(e);if(!this.requests.has(n)){const e=t();e.finally((()=>{this.requests.delete(n)})),this.requests.set(n,e)}return this.requests.get(n)}get(e){return this.requests.get(JSON.stringify(e))}}},14162:function(e,t,n){"use strict";n.d(t,{d:function(){return i},S:function(){return a}});n(33948);var s=n(67294);const i=e=>{let{children:t,userService:n,userId:i}=e;const[o,c]=(0,s.useState)(!1),[r,l]=(0,s.useState)(!1),[u,d]=(0,s.useState)([]);(0,s.useEffect)((()=>{c(!0),n.get(i).then((e=>{d(e),c(!1),l(!0)}))}),[u]);const m=(0,s.useCallback)(((e,t)=>(c(!0),n.setAll(t,e).then((e=>{d(e),c(!1),l(!0)})))),[u]),f=(0,s.useCallback)((e=>(c(!0),n.toggleNotifications(e).then((e=>{d(e),c(!1),l(!0)})))),[u]),p=(0,s.useCallback)((e=>(c(!0),n.updateNotifications(e,u).then((e=>{d(e),c(!1),l(!0)})))),[u]);return s.createElement(a.Provider,{value:{user:u,userService:n,isLoading:o,isReady:r,updateUser:m,updateNotifications:p,toggleNotifications:f}},t)},a=(0,s.createContext)({user:{},userId:null,userService:null,isLoading:!1,isReady:!1,updateUser:()=>{},updateNotifications:()=>{},toggleNotifications:()=>{}})},331:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});n(15306),n(82472),n(3462),n(33824);function s(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))}},11321:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var s=n(67294),i=n(12988),a=n(34708),o=n(49641);function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},c.apply(this,arguments)}function r(e){let{titleId:t,title:n,onClose:a,children:c,className:r}=e;return s.createElement(i.Xj,null,s.createElement("div",{className:"no-wysiwyg modal-wrapper ".concat(r?"".concat(r,"-wrapper"):"")},s.createElement(o.MT,{contain:!0,restoreFocus:!0,autoFocus:!0},s.createElement(l,{titleId:t,title:n,onClose:a,className:r},c))))}function l(e){let{titleId:t,title:n,onClose:r,children:l,className:u}=e;const d={"aria-describedby":t,title:n,onClose:r,isDismissable:!0,isOpen:!0},m=s.useRef(),f=s.useRef(),p=(0,o.bO)(),{overlayProps:h,underlayProps:g}=(0,i.Ir)(d,f);(0,i.tk)();const{modalProps:b}=(0,i.dd)(),{dialogProps:y,titleProps:_}=(0,a.R)(d,f);return(0,s.useEffect)((()=>{m.current.removeAttribute("hidden"),p.focusFirst()}),[m]),s.createElement("div",c({ref:m},g,{hidden:!0,className:"modal ".concat(u||"")}),s.createElement("div",c({ref:f},h,y,b,{"aria-modal":"true",tabIndex:"-1",className:"modal__content ".concat(u?"".concat(u,"__content"):"")}),t?"":s.createElement("h2",c({},_,{className:"".concat(u?"".concat(u,"__title"):"")}),n),l))}},47613:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});n(33948);var s=n(67294),i=n(12988),a=n(45697),o=n.n(a),c=n(331),r=n(58614),l=n(14162),u=n(11321);function d(e){const{title:t,pushNotificationsLabel:n,fieldsSpec:i}=e,{user:a,isReady:o,isLoading:r,updateUser:d,updateNotifications:m,toggleNotifications:f}=(0,s.useContext)(l.S),[p,h]=(0,s.useState)(!1),[g,b]=(0,s.useState)(null),[y,_]=(0,s.useState)(!1),[N,E]=(0,s.useState)(!1),w=(0,s.useCallback)((()=>{E(!N)}),[N]),v=(0,c.Z)();(0,s.useEffect)((()=>{b(a)}),[o]),(0,s.useEffect)((()=>{const e=window.navigator.userAgent,t=!!e.match(/iphone/i),n=!!e.match(/crios/i);h(!(t||n))}),[o]);const C=(0,s.useCallback)((async e=>{await m(e),b(a)}),[a]),k=(0,s.useCallback)((async e=>{_(await f(e))}),[a]),S=(0,s.useCallback)((async()=>{await d(g),E(!1)}),[g,y,p]),I=(0,c.Z)();return s.createElement(s.Fragment,null,s.createElement("button",{type:"button",className:"notifications-settings__action",onClick:w},"Notification settings"),N&&s.createElement(u.Z,{onClose:w,titleId:I,className:"notifications-settings-modal"},s.createElement("header",{className:"notifications-settings-modal__header"},s.createElement("h1",{id:I,className:"notifications-settings-modal__title"},t),s.createElement("button",{type:"button",onClick:w,className:"notifications-settings-modal__header-close"},s.createElement("svg",{className:"svg-icon"},s.createElement("title",null,"Close modal"),s.createElement("use",{href:"#close"})))),s.createElement("div",{className:"custom-form notifications-settings notifications-settings__container"},s.createElement("div",{className:"sq-form-question-answer"},s.createElement("ul",null,p&&s.createElement("li",{className:"notifications-settings__switch-item"},s.createElement("div",{className:"notifications-settings__notifications-switch"},s.createElement("svg",{className:"svg-icon notifications-settings__notifications-icon"},s.createElement("use",{href:"#notification"})),s.createElement("h2",{className:"notifications-settings__label"},"Push notifications"),s.createElement("div",{className:"switch"},s.createElement("input",{className:"switch__input",type:"checkbox",id:"switch-input-".concat(v),onChange:k,value:y,disabled:!o,"aria-describedby":"switch-status-".concat(v),"aria-labelledby":"switch-description-".concat(v)}),s.createElement("label",{id:"switch-description-".concat(v),className:"switch__label",htmlFor:"switch-input-".concat(v)},"Toggle push notifications"),s.createElement("div",{className:"switch__marker","aria-hidden":"true"}))),s.createElement("small",{id:"switch-status-".concat(v),className:"notifications-settings__description"}," ",n)),o&&i.map((e=>{let{id:t,label:n,description:i,key:a}=e;const r=(0,c.Z)();return s.createElement("li",{key:t,className:"notifications-settings__switch-item"},s.createElement("input",{type:"checkbox",name:t,id:"".concat(t,"-").concat(r),value:g.excludeNotificationTypes&&g.excludeNotificationTypes.includes(a),disabled:!o,onChange:()=>C(a),className:"sq-form-field","aria-describedby":"".concat(t,"-").concat(r,"-description"),"aria-labelledby":"".concat(t,"-").concat(r,"-label")}),s.createElement("label",{id:"".concat(t,"-").concat(r,"-label"),htmlFor:"".concat(t,"-").concat(r),className:"notifications-settings__label"},n),s.createElement("small",{id:"".concat(t,"-").concat(r,"-description"),className:"notifications-settings__description"},i))})))),s.createElement("footer",{className:"notifications-settings-modal__footer"},s.createElement("button",{className:"notifications-settings-modal__footer-button",type:"button",onClick:S,disabled:r},"Update notifications",s.createElement("span",{className:"sr-only"}," "," Modal will be closed after pressing update"," "))))))}function m(e){const{userAdapter:t,documentId:n}=e,a=new r.K({userAdapter:t});return s.createElement(i.N3,null,s.createElement(l.d,{userService:a,userId:n,key:n},s.createElement(d,e)))}const{string:f,number:p,func:h,oneOfType:g,arrayOf:b,shape:y}=o();m.propTypes={title:f,documentId:g([f,p]),onDialogClose:h,pushNotificationsLabel:f,fieldsSpec:b(y({id:f,label:f,description:f,key:f}))},m.defaultProps={title:"Notifications settings",documentId:"666",onDialogClose:()=>{},pushNotificationsLabel:"Most students enable push notifications to stay on top of their studies. This will allow\n    you to receive notifications directly to this device.",fieldsSpec:[{id:"assignment_reminder",label:"Assignment reminder",description:"Remind me about assignments 1 day before their due date.",key:"assignment_reminder"},{id:"canvas_announcement",label:"Course announcements",description:"Announcements related to one of my courses.",key:"canvas_announcement"}]}},92703:function(e,t,n){"use strict";var s=n(50414);function i(){}function a(){}a.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,a,o){if(o!==s){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:i};return n.PropTypes=n,n}},45697:function(e,t,n){e.exports=n(92703)()},50414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=NotificationSettings-495e9311636324aa0315.js.map