var e,t;e=this,t=function(){"use strict";function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var t;!function(e){e[e.DeleteBlock=0]="DeleteBlock",e[e.AppendBlock=1]="AppendBlock",e[e.ChangeInput=2]="ChangeInput"}(t||(t={}));var n=function(e){return!(!e||0===e.length)&&/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e)},i=function(e,t){this.id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})),this.text=e,this.isValid=t},o=function(e,o){switch(o.type){case t.DeleteBlock:return e.blocks=e.blocks.filter((function(e){return e!==o.payload.block})),e.lastBlockIdRemoved=o.payload.block.id,e;case t.AppendBlock:var l=o.payload.text;if(l.indexOf(",")>=0){var a=l.split(",").map((function(e){return e.trim()})).filter((function(e){return e.length>0})).map((function(e){return new i(e,n(e))}));e.blocks=e.blocks.concat(a)}else{var r=new i(l,n(l));e.blocks.push(r)}return e;case t.ChangeInput:return e.currentText=o.payload.text,e;default:return e}},l=function(e){return{type:t.AppendBlock,payload:{text:e}}},a=function(e){return{type:t.ChangeInput,payload:{text:e}}};function r(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}return r(".DeleteButton-modules_emails-editor__delete-button__1NSXD {\n  display: inline-block;\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n  transform: scale(1);\n  transition: transform 250ms;\n  cursor: pointer;\n}\n\n.DeleteButton-modules_emails-editor__delete-button__1NSXD:focus {\n  outline-style: dotted;\n}\n.DeleteButton-modules_emails-editor__delete-button__1NSXD:hover {\n  transform: scale(1.025);\n  outline: 0.5px solid transparent;\n}\n"),r(".EmailBlock-modules_emails-editor__email-block__4PN-k {\n  display: inline-flex;\n  font-size: 14px;\n  line-height: 24px;\n  padding-left: 10px;\n  text-align: right;\n  color: #050038;\n}\n\n.EmailBlock-modules_emails-editor__email-block--valid__3jdwt {\n  border-radius: 100px;\n  background-color: rgba(102, 153, 255, 0.2);\n}\n\n.EmailBlock-modules_emails-editor__email-block--invalid__1uQN7 {\n  border-bottom: 1px dashed #d92929;\n  padding: 0;\n}\n"),r(".InputField-modules_emails-editor__input-field__21cCM {\n  padding: 0;\n  border: 0;\n  margin: 0;\n  outline: 0.5px solid transparent;\n  font-size: 14px;\n  line-height: 24px;\n  flex-basis: 5%;\n  flex-grow: 1;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.InputField-modules_emails-editor__input-field__21cCM::placeholder {\n  color: #c3c2cf;\n}\n\n.InputField-modules_emails-editor__input-field__21cCM::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0;\n}\n.InputField-modules_emails-editor__input-field__21cCM::-ms-reveal {\n  display: none;\n  width: 0;\n  height: 0;\n}\n"),r("@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');\n\n.EmailsEditor-modules_emails-editor__2P94A > * {\n  box-sizing: border-box;\n  font-family: 'Open Sans', sans-serif;\n  margin-left: 8px;\n  margin-top: 4px;\n}\n\n.EmailsEditor-modules_emails-editor__2P94A {\n  box-sizing: border-box;\n  background-color: #ffffff;\n  border: 1px solid #c3c2cf;\n  width: 100%;\n  overflow-y: auto;\n  display: flex;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-content: start;\n  min-height: 96px;\n  height: 96px;\n  border-radius: 4px;\n}\n"),function(n,i){var r=function(e){var n=e.id,i=e.placeholder,o=e.name,r=void 0===o?"emails-input":o,d=e.store,s=document.createElement("div");s.classList.add("EmailsEditor-modules_emails-editor__2P94A"),s.addEventListener("blur",(function(){var e=d.getState().currentText;e.length&&d.dispatch(l(e))}),!0),s.addEventListener("click",(function(){c.focus()}));var c=function(e){return function(e){var t=e.id,n=e.placeholder,i=void 0===n?"add more people...":n,o=e.shouldPreventEnterDefault,l=void 0!==o&&o,a=e.onTextChange,r=void 0===a?function(){}:a,d=e.onTextPasted,s=void 0===d?function(){}:d,c=document.createElement("input");return c.classList.add("InputField-modules_emails-editor__input-field__21cCM"),t&&c.setAttribute("id",t),c.setAttribute("placeholder",i),l&&c.addEventListener("keydown",(function(e){"Enter"===e.key&&e.preventDefault()})),c.addEventListener("keyup",(function(e){r(e.target.value,e.key,e)})),c.addEventListener("paste",(function(e){var t=(e.clipboardData||window.clipboardData).getData("text");s(t,e)})),c}({id:n,placeholder:i,shouldPreventEnterDefault:!0,onTextChange:function(n,i){var o=e.getState(),r=o.currentText,d=o.blocks;if(e.dispatch(a(n)),"Backspace"===i)0===r.length&&d.length>0&&e.dispatch({type:t.DeleteBlock,payload:{block:d[d.length-1]}});else if("Enter"===i){var s=n.trim();s.length>0&&e.dispatch(l(s))}else if(","===i){var c=n.trim();e.dispatch(l(c))}},onTextPasted:function(t,n){var i=t.trim();e.dispatch(l(i)),n.preventDefault()}})}(d);s.appendChild(c);var u=function(e){var t=e.name,n=void 0===t?"emails-input":t,i=e.initialValue,o=void 0===i?[]:i,l=document.createElement("input");return l.setBlocks=function(e){l.setAttribute("value",e.filter((function(e){return e.isValid})).map((function(e){return e.text})).join(","))},l.setAttribute("name",n),l.setAttribute("type","hidden"),l.setBlocks(o),l}({name:r});return s.appendChild(u),d.subscribe(t.AppendBlock,(function(e){for(var n=e.blocks,i=s.childElementCount-2;i<n.length;i++)s.insertBefore(function(e){var t=e.block,n=e.onDelete,i=void 0===n?function(){}:n,o=document.createElement("span");o.classList.add("EmailBlock-modules_emails-editor__email-block__4PN-k"),o.classList.add(t.isValid?"EmailBlock-modules_emails-editor__email-block--valid__3jdwt":"EmailBlock-modules_emails-editor__email-block--invalid__1uQN7"),o.dataset.tagId=t.id;var l=document.createElement("span");l.textContent=t.text,l.dataset.isValid=t.isValid?"valid":"invalid",o.appendChild(l);var a=function(e){var t=e.tagId,n=e.onClick,i=void 0===n?function(){}:n,o=function(){var e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","8"),e.setAttribute("height","8");var t=document.createElementNS("http://www.w3.org/2000/svg","path");return e.setAttribute("viewBox","0 0 8 8"),t.setAttribute("fill-rule","evenodd"),t.setAttribute("clip-rule","evenodd"),t.setAttribute("d","M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z"),t.setAttribute("fill","#050038"),e.appendChild(t),e}(),l=document.createElement("button");return l.dataset.tagId=t,l.appendChild(o),l.classList.add("DeleteButton-modules_emails-editor__delete-button__1NSXD"),l.addEventListener("click",i,{once:!0}),l.clean=function(){l.removeEventListener("click",i)},l}({tagId:t.id,onClick:function(){i(t)}});return o.appendChild(a),o.clean=function(){a.clean()},o}({block:n[i],onDelete:function(e){d.dispatch({type:t.DeleteBlock,payload:{block:e}})}}),c);s.scrollTop=s.scrollHeight,u.setBlocks(n),d.dispatch(a(""))})),d.subscribe(t.DeleteBlock,(function(e){var t=e.blocks,n=s.querySelector('[data-tag-id="'+e.lastBlockIdRemoved+'"]');n&&(s.removeChild(n),n.clean(),u.setBlocks(t)),c.focus()})),d.subscribe(t.ChangeInput,(function(e){c.value=e.currentText})),s.getBlocks=function(){return d.getState().blocks},s.getEmails=function(){return d.getState().blocks.filter((function(e){return e.isValid}))},s.addBlock=function(e){var t=e.trim();t.length>0&&d.dispatch(l(t))},s}(e({store:function(e){var t=e.reducer,n=e.initialState,i=new Map;return{dispatch:function(e){var o,l=t(n,e);i.has(e.type)&&(null===(o=i.get(e.type))||void 0===o||o.forEach((function(e){return e(l)})))},subscribe:function(e,t){var n;i.has(e)?null===(n=i.get(e))||void 0===n||n.push(t):i.set(e,[t])},getState:function(){return n}}}({reducer:o,initialState:{currentText:"",blocks:[]}})},i));return n.appendChild(r),r}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).EmailsInput=t();
//# sourceMappingURL=emails-input.js.map
