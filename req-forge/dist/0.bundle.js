(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return s})),n.d(t,"g",(function(){return u})),n.d(t,"d",(function(){return d})),n.d(t,"k",(function(){return f})),n.d(t,"i",(function(){return p})),n.d(t,"l",(function(){return m})),n.d(t,"j",(function(){return g})),n.d(t,"h",(function(){return x}));var r=n(29),a=n(18),o="ANALYZE_REQUEST_START",i="ANALYZE_SUCCESS",c="ANALYZE_ERROR",l="SELECT_ERROR",s="DISMISS_ERROR",u="USE_SUGGESTION",d="DISLIKE_ERROR_SUCCESS",f=function(e){return{type:l,payload:{errorId:e}}},p=function(e){return{type:s,payload:{errorId:e}}},m=function(e,t){return{type:u,payload:{errorId:e,suggestion:t}}},g=function(e){return function(t){return t({type:o}),fetch(r.b+"/analyze",{method:"POST",body:JSON.stringify({textData:e,userId:Object(a.d)()})}).then((function(e){if(!e.ok)throw t({type:c,error:"fetch failed"}),new Error("Something went wrong");e.json().then((function(e){console.log("data",e),t({type:i,payload:{items:e}})}))})).catch((function(e){console.log("error",e)}))}},x=function(e){return function(t){return t({type:"DISLIKE_ERROR_START",payload:{errorId:e.errorId}}),fetch(r.b+"/incorrect-error",{method:"POST",body:JSON.stringify({incorrectError:e,userId:Object(a.d)()})}).then((function(n){if(!n.ok)throw t(function(e){return{type:"DISLIKE_ERROR_FAIL",error:e}}("dislike error failed")),new Error("Something went wrong");n.json().then((function(n){t(function(e){return{type:d,payload:{errorId:e}}}(e.errorId))}))})).catch((function(e){console.log("error",e)}))}}},,,,,,,function(e,t,n){var r=n(13),a=n(98);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"f",(function(){return c})),n.d(t,"b",(function(){return s}));var r=function(e){e.focus(),document.execCommand("selectAll",!1,void 0)};function a(e){navigator.clipboard.writeText(e)}function o(){var e=localStorage.getItem("REG_FORGE_USER_ID");if(e)return e;var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}));return localStorage.setItem("REG_FORGE_USER_ID",t),t}var i=function(e){var t=e.reduce((function(e,t){var n=t.existingTokens,r=t.errorType,a=t.errorId;return n.map((function(t){t.id=a,t.type=r,e.push(t)})),e}),[]);return t.sort((function(e,t){return t.beginOffset-e.beginOffset})),t},c=function(e,t){if(t>=0){var n=window.getSelection(),r=l(e,{count:t});r&&null!==n&&(r.collapse(!1),n.removeAllRanges(),n.addRange(r))}},l=function(e,t,n){if(n||((n=document.createRange()).selectNode(e),n.setStart(e,0)),0===t.count)n.setEnd(e,t.count);else if(e&&t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(n.setEnd(e,t.count),t.count=0);else for(var r=0;r<e.childNodes.length&&(n=l(e.childNodes[r],t,n),0!==t.count);r++);return n},s=function(e){var t,n=0,r=e.ownerDocument||e.document,a=r.defaultView||r.parentWindow;if(void 0!==a.getSelection){if((t=a.getSelection()).rangeCount>0){var o=a.getSelection().getRangeAt(0),i=o.cloneRange();i.selectNodeContents(e),i.setEnd(o.endContainer,o.endOffset),n=i.toString().length}}else if((t=r.selection)&&"Control"!=t.type){var c=t.createRange(),l=r.body.createTextRange();l.moveToElementText(e),l.setEndPoint("EndToEnd",c),n=l.text.length}return n}},,,,,function(e,t,n){var r=n(13),a=n(101);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,function(e,t,n){var r=n(13),a=n(91);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,,function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var r,a="https://dev.api.reqforge.com";!function(e){e.EMPTY="Nothing to analyze yet.",e.NOT_FINISHED="Keep fixing!",e.ALMOST_FINISHED="You are almost there!",e.FINISHED="Ready to go!"}(r||(r={}))},function(e,t,n){var r=n(13),a=n(106);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,,,function(e,t,n){var r=n(13),a=n(104);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,,,,function(e,t,n){var r=n(13),a=n(95);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},function(e,t,n){var r=n(13),a=n(97);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,,function(e,t,n){var r=n(13),a=n(90);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,,function(e,t,n){var r=n(13),a=n(93);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},function(e,t,n){var r=n(13),a=n(94);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,,,,,function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return l}));var r=n(0),a=n.n(r),o=n(40),i=n(74),c=n(72),l=Object(c.hot)(e)((function(){return a.a.createElement(o.c,null,a.a.createElement(o.a,{path:"/",component:i.a}))}))}).call(this,n(55)(e))},,,,function(e,t,n){var r=n(13),a=n(96);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,function(e,t,n){var r=n(13),a=n(99);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},function(e,t,n){var r=n(13),a=n(100);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,function(e,t,n){var r=n(13),a=n(102);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},function(e,t,n){var r=n(13),a=n(103);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},function(e,t,n){var r=n(13),a=n(105);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},,,function(e,t,n){"use strict";n.d(t,"a",(function(){return Oe}));var r=n(0),a=n.n(r),o=n(137),i=n(46),c=n.n(i),l=n(5),s=n(25),u=n.n(s),d=n(44),f=n.n(d),p=n(133),m=n(131),g=n(10),x=n(18),h=function(e){var t=e.selected,n=e.id,r=e.onClick,o=e.type,i=e.text,c=o;return t&&(c=c.concat(" ","selected")),a.a.createElement("span",{onClick:r,"data-error-id":n,className:c},i)},_=function(e){var t,n=e.errors,r=e.onInput,o=e.onKeyDown,i=e.className,c=e.inputRef,s=e.originalVal,u=void 0===s?"":s,d=e.inputValue,f=Object(l.b)(),p=Object(l.c)((function(e){return e.analyzedData.selectedErrorId})),m=u;t=n.reduce((function(e,t,n,r){var o=t.beginOffset,i=o+t.text.length,c=m.slice(i),l=a.a.createElement(h,{key:t.id,id:t.id,selected:t.id===p,onClick:function(e){return function(e,t){var n=t.target.getAttribute("data-error-id");f(Object(g.k)(n))}(0,e)},text:m.slice(o,i),type:t.type});return m=m.slice(0,o),e.unshift(l,c),n===r.length-1&&e.unshift(m),e}),[]);var x="";return x=n&&n.length?t:d,a.a.createElement("div",{ref:c,contentEditable:!0,className:i,suppressContentEditableWarning:!0,onInput:r,onKeyDown:function(e){return function(e){o(e)}(e)},spellCheck:!1},x)},E=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.analyzedData.items})),n=Object(r.useState)(!0),o=n[0],i=n[1],c=Object(r.useState)(""),s=c[0],d=c[1],h=Object(r.useState)([]),E=h[0],b=h[1],v=Object(r.useRef)(null),y=Object(r.useRef)(""),k=function(){var e,t;return v&&v.current&&"<br>"!==(null===(t=null===(e=v)||void 0===e?void 0:e.current)||void 0===t?void 0:t.innerHTML)?v.current.innerText:""};return Object(r.useEffect)((function(){return b(Object(x.c)(t))}),[t]),a.a.createElement("div",{className:u.a.reqForm},a.a.createElement("div",{className:u.a.reqContainer},o&&a.a.createElement("div",{className:u.a.reqPlaceholder},"Type or paste your text here."),a.a.createElement(_,{inputRef:v,className:u.a.reqInput,onInput:function(e){var t=v.current,n=window.getSelection();if(null!==t&&null!==n&&n.rangeCount){var r=Object(x.b)(t);d(k()),b([]),setTimeout((function(){Object(x.f)(t,r)}),0)}i(!e.target.innerText)},onKeyDown:function(e){console.log("e",e)},errors:E,inputValue:s,originalVal:y.current})),a.a.createElement("footer",{className:u.a.reqBlockFooter},a.a.createElement("div",{className:u.a.reqInfo},"Keep one requirement or user story at a time"),a.a.createElement(m.a,{className:u.a.reqCopyBtn,onClick:function(){v&&v.current&&(Object(x.a)(v.current.innerText),Object(x.e)(v.current))}},a.a.createElement(f.a,null)),a.a.createElement(p.a,{onClick:function(){k()&&(y.current=k(),d(k()),e(Object(g.j)(k())))},className:u.a.reqAnalyzeBtn,variant:"outlined"},"Analyze")))},b=n(135),v=n(50),y=n.n(v),k=n(138),O=n(134),N=n(51),R=n.n(N),C=Object(O.a)((function(){return{arrow:{left:"30px !important",color:"#616368"},tooltip:{padding:"16px",fontWeight:400,fontSize:"14px",fontStyle:"italic",lineHeight:"21px",background:"#616368",margin:"10px 0"}}})),w=function(e){var t=e.category,n=e.tooltipText,r=C(),o=r.tooltip,i=r.arrow;return a.a.createElement("div",{className:R.a.category},a.a.createElement(k.a,{title:n,arrow:!0,classes:{tooltip:o,arrow:i},placement:"top-start"},a.a.createElement("span",null,t.name,a.a.createElement("span",{className:R.a.count},t.score))))},I=function(){var e=Object(l.c)((function(e){return e.analyzedData.categories})),t=e.map((function(e,t){return a.a.createElement(w,{key:t,category:e,tooltipText:"The requirement defines an essential capability, characteristic, constraint, or quality factor."})}));return a.a.createElement("div",{className:y.a.categoriesRoot},a.a.createElement(b.a,{className:y.a.heading},"Categories"),e&&e.length>0&&t)},T=n(136),K=n(61),j=n.n(K),S=n(41),F=n.n(S),L=n(29),X=function(){var e=Object(l.c)((function(e){return e.analyzedData.isLoading})),t=Object(l.c)((function(e){return e.analyzedData.analysisStatusMessage})),n=L.a.FINISHED===t,r=a.a.createElement(T.a,{className:F.a.iProgress}),o=a.a.createElement(b.a,{className:F.a.stepText},n&&a.a.createElement(j.a,{className:F.a.iStar}),t);return a.a.createElement("div",{className:F.a.progressRoot},e?r:o)},H=n(63),M=n.n(H),V=n(64),Y=n.n(V),q=n(62),J=n.n(q),P=function(e){return e.text?a.a.createElement("div",{className:J.a.crossedText},"  ",e.text,"  "):null},z=n(42),A=n.n(z),Q=function(e){var t=e.value+"%";return a.a.createElement("div",{className:A.a.predictionBar},a.a.createElement("div",{className:A.a.bar},a.a.createElement("div",{className:A.a.progress,style:{width:t}})),a.a.createElement("div",{className:A.a.label},t))},D=n(17),W=n.n(D),B=function(e){var t=Object(l.b)(),n=e.error,r=Math.round(100*n.prediction),o=n.existingTokens[0].text,i=W.a.status+" "+W.a[n.errorType],c=a.a.createElement("div",{className:i}),s=a.a.createElement("div",{className:W.a.mainPart},e.expanded?a.a.createElement("div",{className:W.a.errorTitle},n.error):a.a.createElement(P,{text:o})),u=W.a.dislikeButton+" "+(e.disliked?W.a.active:""),d=a.a.createElement("div",{className:u,onClick:function(){e.disliked||t(Object(g.h)(n))}},a.a.createElement(M.a,{className:W.a.dislikeIcon}),a.a.createElement("div",null,"Incorrect error")),f=W.a.header+" "+(e.expanded?"":W.a.collapsed);return a.a.createElement("div",{className:f,onClick:function(){e.expanded||t(Object(g.k)(n.errorId))}},c,s,a.a.createElement("div",{className:W.a.predictionBarWrapper},a.a.createElement(Q,{value:r})),a.a.createElement(Y.a,{className:W.a.expandIcon}),e.expanded?d:null)},G=n(67),Z=n.n(G),U=n(68),$=n.n(U),ee=n(65),te=n.n(ee),ne=function(e){return a.a.createElement("div",{className:te.a.suggestionItem,onClick:e.onClick},e.text)},re=n(66),ae=n.n(re),oe=function(e){return a.a.createElement("a",{className:ae.a.link,href:e.url,onClick:e.onClick},e.text)},ie=n(23),ce=n.n(ie),le=function(e){var t=Object(l.b)(),n=Object(r.useState)(!1),o=n[0],i=n[1],c=e.error,s=c.existingTokens[0].text,u=void 0!==c.newTokens?c.newTokens:[],d=a.a.createElement("div",{className:ce.a.suggestionsBlock},a.a.createElement(P,{text:s}),u.length>0?a.a.createElement(a.a.Fragment,null,a.a.createElement(Z.a,{className:ce.a.arrowIcon}),a.a.createElement("div",null,u.map((function(e,n){return a.a.createElement(ne,{text:e.text,key:n,onClick:function(){return n=e,void t(Object(g.l)(c.errorId,n));var n}})})))):null);return a.a.createElement("div",{className:ce.a.body},a.a.createElement("div",{className:ce.a.content},d,a.a.createElement("div",{className:ce.a.description},c.details),o?a.a.createElement(a.a.Fragment,null,a.a.createElement(oe,{text:"Hide details",onClick:function(){return i(!1)}}),a.a.createElement("div",{className:ce.a.details},c.longDescription)):a.a.createElement(oe,{text:"Show details",onClick:function(){return i(!0)}})),a.a.createElement("div",{className:ce.a.footer},a.a.createElement("div",{className:ce.a.dismissButton,onClick:function(){return t(Object(g.i)(c.errorId))}},a.a.createElement($.a,{className:ce.a.dismissIcon}),"Dismiss")))},se=n(69),ue=n.n(se),de=function(e){return a.a.createElement("div",{className:ue.a.errorCard},a.a.createElement(B,{error:e.error,expanded:e.expanded,disliked:e.disliked}),e.expanded&&a.a.createElement(le,{error:e.error}))},fe=n(70),pe=n.n(fe),me=function(){var e=Object(l.c)((function(e){return e.analyzedData.items})),t=Object(l.c)((function(e){return e.analyzedData.isLoading})),n=Object(l.c)((function(e){return e.analyzedData.selectedErrorId})),r=Object(l.c)((function(e){return e.analyzedData.dislikedErrorIds})),o=e.map((function(e){return a.a.createElement(de,{key:e.errorId,error:e,expanded:e.errorId===n,disliked:r.includes(e.errorId)})}));return a.a.createElement("div",{className:pe.a.errorsList},!t&&o)},ge=n(35),xe=n.n(ge),he=function(e){var t=e.title,n=["Coming soon..."];return a.a.createElement("div",{className:xe.a.card},a.a.createElement("div",{className:xe.a.title},t),a.a.createElement("div",{className:xe.a.content},n.map((function(e,t){return a.a.createElement("div",{key:t},e)}))),a.a.createElement("div",{className:xe.a.footer},a.a.createElement(m.a,{onClick:function(){return Object(x.a)(n.join("\n"))}},a.a.createElement(f.a,{className:xe.a.copyIcon}))))},_e=n(71),Ee=n.n(_e),be=function(){return a.a.createElement("div",{className:Ee.a.listWrapper},a.a.createElement(he,{title:"Functional"}),a.a.createElement(he,{title:"Non-Functional"}))},ve=n(30),ye=n.n(ve),ke=function(){var e=Object(r.useState)(0),t=e[0],n=e[1];return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:ye.a.tabBar},a.a.createElement("div",{className:ye.a.tab+" "+(0===t?ye.a.active:""),onClick:function(){return n(0)}},"Correctness"),a.a.createElement("div",{className:ye.a.tab+" "+(1===t?ye.a.active:""),onClick:function(){return n(1)}},"Acceptance criteria")),a.a.createElement("div",{className:ye.a.tabContent},0===t&&a.a.createElement(me,null),1===t&&a.a.createElement(be,null)))},Oe=function(){return a.a.createElement("div",{className:c.a.appRoot},a.a.createElement(o.a,{className:c.a.appContainer,container:!0,spacing:3},a.a.createElement(o.a,{item:!0,xs:6},a.a.createElement(E,null),a.a.createElement(o.a,{className:c.a.categoriesContainer,container:!0},a.a.createElement(o.a,{item:!0,xs:6},a.a.createElement(I,null)),a.a.createElement(o.a,{item:!0,xs:6},a.a.createElement(X,null)))),a.a.createElement(o.a,{item:!0,xs:6},a.a.createElement(ke,null))))}},,,,,,,,,,,,,,,,function(e,t,n){(t=n(14)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,300&display=swap);"]),t.push([e.i,'html,body{margin:0;padding:0;font-family:"Lato",sans-serif;font-weight:400}._3sugoClSRVYQbnTZMHRjOS{padding:0 56px;background:#fbfbfb;display:flex;justify-content:center}._1hIKy-8Zeho357vCuzfHWb{max-width:1280px}._27uSzp86dcR4i05s9Jaqa7{margin-top:32px}',""]),t.locals={appRoot:"_3sugoClSRVYQbnTZMHRjOS",appContainer:"_1hIKy-8Zeho357vCuzfHWb",categoriesContainer:"_27uSzp86dcR4i05s9Jaqa7"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,'._1XAtTgRT6i92maLuV0mG3U{display:none}._3kfo537JJ-z6RoL2tWMoJO{width:100%;border:1px solid #e2e2e2;border-radius:4px;background-color:#fefefe;display:flex;flex-direction:column;margin-top:48px}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q{position:relative;overflow:hidden;flex:1}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._1noI0vclFdJigRj1bm7PQ4{position:absolute;z-index:1;padding:16px 24px;color:#8b8d94;font:400 16px/32px "Lato",sans-serif}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._2FKHEZIONhdPg0-yRvYJdY{position:relative;width:100%;min-height:120px;box-sizing:border-box;z-index:2;font:400 16px/32px "Lato",sans-serif;padding:16px 24px}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._2FKHEZIONhdPg0-yRvYJdY:focus{outline:0}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._2FKHEZIONhdPg0-yRvYJdY span{font:400 16px/32px "Lato",sans-serif}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._2FKHEZIONhdPg0-yRvYJdY span[class*=selected]{background:#ffdbe3}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._2FKHEZIONhdPg0-yRvYJdY span[class*=critical]{border-bottom:2px solid #ff6e6e}._3kfo537JJ-z6RoL2tWMoJO ._2FCUCuPTnQqdlA9LqHjT_Q ._2FKHEZIONhdPg0-yRvYJdY span[class*=suggestion]{border-bottom:2px solid #ffc15b}._3kfo537JJ-z6RoL2tWMoJO ._3nXr7WIyFXNuTIjVy1uwuV{display:flex;align-items:center;justify-content:space-between;padding:8px;border-top:1px solid #e2e2e2}._3kfo537JJ-z6RoL2tWMoJO ._3nXr7WIyFXNuTIjVy1uwuV ._1nVpdfIt_mzHP2X7_Fjf4E{font-weight:300;font-style:italic;color:#73767f;flex:1}._3kfo537JJ-z6RoL2tWMoJO ._3nXr7WIyFXNuTIjVy1uwuV ._3lgXO0Mv40rBdfFg6Y7E7c{color:#8b8d94;margin-right:12px}._3kfo537JJ-z6RoL2tWMoJO ._3nXr7WIyFXNuTIjVy1uwuV ._2rmufz5AY7AXLvtR1xwQss{font:700 12px/15px "Lato",sans-serif;padding:8px 24px;border:0;color:#fff;background:#8b8d94}._3kfo537JJ-z6RoL2tWMoJO ._3nXr7WIyFXNuTIjVy1uwuV ._2rmufz5AY7AXLvtR1xwQss:hover{background:#212121}',""]),t.locals={dummyEl:"_1XAtTgRT6i92maLuV0mG3U",reqForm:"_3kfo537JJ-z6RoL2tWMoJO",reqContainer:"_2FCUCuPTnQqdlA9LqHjT_Q",reqPlaceholder:"_1noI0vclFdJigRj1bm7PQ4",reqInput:"_2FKHEZIONhdPg0-yRvYJdY",reqBlockFooter:"_3nXr7WIyFXNuTIjVy1uwuV",reqInfo:"_1nVpdfIt_mzHP2X7_Fjf4E",reqCopyBtn:"_3lgXO0Mv40rBdfFg6Y7E7c",reqAnalyzeBtn:"_2rmufz5AY7AXLvtR1xwQss"},e.exports=t},,function(e,t,n){(t=n(14)(!1)).push([e.i,'._367dfTH5rTdd41A1SlrXMr{position:relative;padding:0 24px;min-height:250px}._367dfTH5rTdd41A1SlrXMr:after{content:"";position:absolute;right:0;top:25%;height:50%;border-right:1px solid #e2e2e2}._367dfTH5rTdd41A1SlrXMr ._4KPkcc6wu8RIX-2lCqwBD{font:400 14px/26px "Lato",sans-serif;color:#8b8d94;margin-bottom:12px}',""]),t.locals={categoriesRoot:"_367dfTH5rTdd41A1SlrXMr",heading:"_4KPkcc6wu8RIX-2lCqwBD"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,'.qRCMn8w8hO6XE_6ef2paE{font:400 14px/26px "Lato";color:#161b29;margin:0}.qRCMn8w8hO6XE_6ef2paE:not(:last-child){margin-bottom:8px}.qRCMn8w8hO6XE_6ef2paE ._3aP8TCUHG_5LELVu45sFZL{color:#ff5b5b;margin-left:5px}',""]),t.locals={category:"qRCMn8w8hO6XE_6ef2paE",count:"_3aP8TCUHG_5LELVu45sFZL"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,'.uuseWYABxVEuGPYrmXHKD{height:100%;display:flex;justify-content:center;align-items:center}.uuseWYABxVEuGPYrmXHKD ._3VWugTh-sAR2LdJE1AHijP{color:#979797}.uuseWYABxVEuGPYrmXHKD ._1rE8hUubXciSadyEdTHAh-{font:400 14px/26px "Lato",sans serif;color:#8b8d94}.uuseWYABxVEuGPYrmXHKD ._1rE8hUubXciSadyEdTHAh- ._39OaOGl7j2kudXunFvPWHN{vertical-align:top;color:#ffc15b}',""]),t.locals={progressRoot:"uuseWYABxVEuGPYrmXHKD",iProgress:"_3VWugTh-sAR2LdJE1AHijP",stepText:"_1rE8hUubXciSadyEdTHAh-",iStar:"_39OaOGl7j2kudXunFvPWHN"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,"._2NNkuF9fZLsaffOSsge72s{display:inline-block;color:#161b29;font-size:16px;line-height:28px;text-decoration:line-through #ff5b5b}",""]),t.locals={crossedText:"_2NNkuF9fZLsaffOSsge72s"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,"._2P2OvubCyixEGGiLuDAzf{display:flex;align-items:center}._2P2OvubCyixEGGiLuDAzf .Yxl9w8qeYBV5JVO5t68lD{display:inline-block;height:8px;width:48px;margin-right:8px;border-radius:4px;background-color:#e0e0e0;overflow:hidden}._2P2OvubCyixEGGiLuDAzf .Yxl9w8qeYBV5JVO5t68lD ._2kjmv1_kDQrhKv1kFfj35n{height:8px;background-color:#8b8b8b}._2P2OvubCyixEGGiLuDAzf ._3GL-JPekP9rUNF5hY0FQ-l{color:#8b8d94;font-size:14px;line-height:26px}",""]),t.locals={predictionBar:"_2P2OvubCyixEGGiLuDAzf",bar:"Yxl9w8qeYBV5JVO5t68lD",progress:"_2kjmv1_kDQrhKv1kFfj35n",label:"_3GL-JPekP9rUNF5hY0FQ-l"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,".KCfFhgE6Nhf8gKobmwxcx{display:flex;align-items:center;box-sizing:border-box;height:72px;padding:24px;border-radius:4px}.KCfFhgE6Nhf8gKobmwxcx ._363MurgIsAWLOm08StmFPT{height:8px;width:8px;margin-right:8px;border-radius:50%}.KCfFhgE6Nhf8gKobmwxcx ._363MurgIsAWLOm08StmFPT.vYK6aaxZ8PDEhTyyddlgx{background-color:#ff5b5b}.KCfFhgE6Nhf8gKobmwxcx ._363MurgIsAWLOm08StmFPT._1zl0_bV994uRqBMcjsj1yF{background-color:#ffc15b}.KCfFhgE6Nhf8gKobmwxcx ._27uM-XJQvcJxmT-xGQa6QU{flex-grow:1}.KCfFhgE6Nhf8gKobmwxcx .qfPXCthPZz2QldDZWEukH{color:#8b8d94;font-size:14px;line-height:26px}.KCfFhgE6Nhf8gKobmwxcx ._1XqLK-zFb46Zsoe_MMgSVH{display:block}.KCfFhgE6Nhf8gKobmwxcx ._3P23-FsXcLrPpq65jVTCDk{fill:#0039ff;display:none}.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua{margin-left:16px;display:flex;align-items:center;font-size:14px;line-height:28px;color:#8b8d94;cursor:pointer}.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua ._1tsmDoe6R2LBjytnISamyx{width:20px;height:20px;margin-right:7px;fill:#8b8d94}.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua:hover,.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua._36JN045jGGN75w6_PDQ1w2{color:#0039ff}.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua:hover ._1tsmDoe6R2LBjytnISamyx,.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua._36JN045jGGN75w6_PDQ1w2 ._1tsmDoe6R2LBjytnISamyx{fill:#0039ff}.KCfFhgE6Nhf8gKobmwxcx ._3-09OeHqMXkKNh2KlytSua._36JN045jGGN75w6_PDQ1w2{cursor:default}.KCfFhgE6Nhf8gKobmwxcx._2X7b7OFmp3wDEH4KOwHVHf:hover{cursor:pointer}.KCfFhgE6Nhf8gKobmwxcx._2X7b7OFmp3wDEH4KOwHVHf:hover ._1XqLK-zFb46Zsoe_MMgSVH{display:none}.KCfFhgE6Nhf8gKobmwxcx._2X7b7OFmp3wDEH4KOwHVHf:hover ._3P23-FsXcLrPpq65jVTCDk{display:block}",""]),t.locals={header:"KCfFhgE6Nhf8gKobmwxcx",status:"_363MurgIsAWLOm08StmFPT",critical:"vYK6aaxZ8PDEhTyyddlgx",suggestion:"_1zl0_bV994uRqBMcjsj1yF",mainPart:"_27uM-XJQvcJxmT-xGQa6QU",errorTitle:"qfPXCthPZz2QldDZWEukH",predictionBarWrapper:"_1XqLK-zFb46Zsoe_MMgSVH",expandIcon:"_3P23-FsXcLrPpq65jVTCDk",dislikeButton:"_3-09OeHqMXkKNh2KlytSua",dislikeIcon:"_1tsmDoe6R2LBjytnISamyx",active:"_36JN045jGGN75w6_PDQ1w2",collapsed:"_2X7b7OFmp3wDEH4KOwHVHf"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,".IV1v_bpsrN6Pm-6OpynYx{display:inline-block;box-sizing:border-box;height:32px;padding:4px 12px;margin-right:8px;margin-bottom:8px;border-radius:2px;background-color:#bfe7c9;color:#161b29;font-size:16px;cursor:pointer}",""]),t.locals={suggestionItem:"IV1v_bpsrN6Pm-6OpynYx"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,".d8otlj9udn7Fi6DwQRsOh{color:#0039ff;font-size:14px;cursor:pointer}",""]),t.locals={link:"d8otlj9udn7Fi6DwQRsOh"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,".lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8{padding:0 24px 24px 24px}.lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8 ._3mTMYN1iMwhrI0B6qFYvk0{display:flex}.lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8 ._1RucynpgPvzofMwKDF78w1{height:30px;width:16px;margin:0 16px;fill:#8b8d94}.lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8 .rQL2obI-lcLdM_MVQawNR{margin:8px 0 16px 0}.lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8 .QiEvcS_itTQtA9qXFE1s4{margin-top:8px}.lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8 .rQL2obI-lcLdM_MVQawNR,.lvVHrktO7FIJV6um3S-XR ._3OkrKx5v9YOsegUicnkCQ8 .QiEvcS_itTQtA9qXFE1s4{color:#161b29;font-size:16px;line-height:28px}.lvVHrktO7FIJV6um3S-XR .YpYuECzyAB7X5KAtdTNLG{border-top:1px solid #d8d8d8;padding:20px}.lvVHrktO7FIJV6um3S-XR .YpYuECzyAB7X5KAtdTNLG ._3MHg1RRkt2RjWLaXrnQq34{display:flex;align-items:center;font-size:14px;color:#8b8d94;cursor:pointer}.lvVHrktO7FIJV6um3S-XR .YpYuECzyAB7X5KAtdTNLG ._3MHg1RRkt2RjWLaXrnQq34 ._1fa6E-ybtqQkQPWScDjVIB{height:16px;width:18px;margin-right:8px;fill:#8b8d94}.lvVHrktO7FIJV6um3S-XR .YpYuECzyAB7X5KAtdTNLG ._3MHg1RRkt2RjWLaXrnQq34:hover{color:#0039ff}.lvVHrktO7FIJV6um3S-XR .YpYuECzyAB7X5KAtdTNLG ._3MHg1RRkt2RjWLaXrnQq34:hover ._1fa6E-ybtqQkQPWScDjVIB{fill:#0039ff}",""]),t.locals={body:"lvVHrktO7FIJV6um3S-XR",content:"_3OkrKx5v9YOsegUicnkCQ8",suggestionsBlock:"_3mTMYN1iMwhrI0B6qFYvk0",arrowIcon:"_1RucynpgPvzofMwKDF78w1",description:"rQL2obI-lcLdM_MVQawNR",details:"QiEvcS_itTQtA9qXFE1s4",footer:"YpYuECzyAB7X5KAtdTNLG",dismissButton:"_3MHg1RRkt2RjWLaXrnQq34",dismissIcon:"_1fa6E-ybtqQkQPWScDjVIB"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,"._1Ww_K3_KfjKZ2-yyygGEwi{width:100%;margin-bottom:8px;background-color:#fff;box-shadow:0 1px 16px 0 rgba(218,219,225,.5)}",""]),t.locals={errorCard:"_1Ww_K3_KfjKZ2-yyygGEwi"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,".qacaXm0Vo0r6crRqz-rrW{padding:10px;max-height:calc(100vh - 84px);overflow:auto;display:flex;flex-direction:column;align-items:center}",""]),t.locals={errorsList:"qacaXm0Vo0r6crRqz-rrW"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,".ZH7Ejcdosy-ms77m4nxsV{margin-bottom:8px;border-radius:4px;background-color:#fff;box-shadow:0 1px 16px 0 rgba(218,219,225,.5)}.ZH7Ejcdosy-ms77m4nxsV ._33BYwTGTRouS7AZmVhOZbj{padding:24px 24px 16px 24px;color:#8b8d94;font-size:14px;line-height:26px}.ZH7Ejcdosy-ms77m4nxsV ._3HYnRDOn7w8L22YMCPk_M4{margin:0 24px 16px 24px;color:#161b29;font-size:16px;line-height:28px}.ZH7Ejcdosy-ms77m4nxsV ._2vAX2TncTtmBYgnmfcr_Mt{display:flex;justify-content:flex-end;height:50px;border-top:1px solid #e2e2e2}.ZH7Ejcdosy-ms77m4nxsV ._2vAX2TncTtmBYgnmfcr_Mt ._2gGCYGcKC11VBjEDyJQkaZ{fill:#8b8d94}.ZH7Ejcdosy-ms77m4nxsV ._2vAX2TncTtmBYgnmfcr_Mt ._2gGCYGcKC11VBjEDyJQkaZ:hover{fill:#0039ff}",""]),t.locals={card:"ZH7Ejcdosy-ms77m4nxsV",title:"_33BYwTGTRouS7AZmVhOZbj",content:"_3HYnRDOn7w8L22YMCPk_M4",footer:"_2vAX2TncTtmBYgnmfcr_Mt",copyIcon:"_2gGCYGcKC11VBjEDyJQkaZ"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,"._2ZZEtcMusZJxYYWYOOLskC{padding:10px}",""]),t.locals={listWrapper:"_2ZZEtcMusZJxYYWYOOLskC"},e.exports=t},function(e,t,n){(t=n(14)(!1)).push([e.i,'._1xefqYshek-NX7mhv3SmtH{display:flex;align-items:center;padding:8px 0}._1xefqYshek-NX7mhv3SmtH ._2XmKzLWlaCBiEqgqfqKnkQ{margin-right:24px;color:#7a7a7a;font-size:16px;cursor:pointer}._1xefqYshek-NX7mhv3SmtH ._2XmKzLWlaCBiEqgqfqKnkQ.JagCEOgVYgLGTP4epuT2W{color:#000;font-weight:bold}._1dFDtbPHJ2KRvU89Xqa5Ye:before{content:"";display:block;width:100%;height:1px;background-color:#d6d6d6;box-shadow:0 2px 4px 0 rgba(146,146,146,.5)}',""]),t.locals={tabBar:"_1xefqYshek-NX7mhv3SmtH",tab:"_2XmKzLWlaCBiEqgqfqKnkQ",active:"JagCEOgVYgLGTP4epuT2W",tabContent:"_1dFDtbPHJ2KRvU89Xqa5Ye"},e.exports=t},,,function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(11),i=n.n(o),c=n(5),l=n(22),s=n(27),u=(n(89),n(10)),d=n(29),f=function(){return(f=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},p=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],i=0,c=o.length;i<c;i++,a++)r[a]=o[i];return r},m={items:[],categories:[],selectedErrorId:"",dislikedErrorIds:[],suggestion:null,isLoading:!1,analysisStatusMessage:d.a.EMPTY,error:null},g=Object(s.combineReducers)({analyzedData:function(e,t){void 0===e&&(e=m);var n=t.type,r=t.payload,a=t.error;switch(n){case u.b:return f(f({},m),{isLoading:!0});case u.c:return f(f({},e),{isLoading:!1,items:r.items.errors,categories:r.items.scoring,analysisStatusMessage:r.items.analysisStatusMessage,error:null});case u.a:return f(f({},e),{isLoading:!1,error:a});case u.f:return f(f({},e),{selectedErrorId:r.errorId});case u.e:return f(f({},e),{items:e.items.filter((function(e){return e.errorId!==r.errorId}))});case u.g:return f(f({},e),{suggestion:r.suggestion});case u.d:return f(f({},e),{dislikedErrorIds:p(e.dislikedErrorIds,[r.errorId])});default:return e}}}),x=function(e){return function(e){return function(t){return e(t)}}},h=n(56);var _,E,b=n(40),v=n(58),y=Object(l.a)(),k=(E=Object(s.applyMiddleware)(h.a,x),Object(s.createStore)(g,_,E));i.a.render(a.a.createElement(c.a,{store:k},a.a.createElement(b.b,{history:y},a.a.createElement(v.a,null))),document.getElementById("analyzerRoot"))}],[[109,1,2]]]);