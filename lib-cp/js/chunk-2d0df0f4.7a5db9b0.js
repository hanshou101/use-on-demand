(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0df0f4"],{"87fe":function(e,t,n){"use strict";n.r(t),n.d(t,"xX_DomEvt_Helper",(function(){return a})),n.d(t,"xX_BrowserEventMap",(function(){return i}));var r=n("9ab4"),o=function(){function e(){}return e.getIndex_fromRule=function(e,t){if(!e||0==e.length||!t||"function"!=typeof t)return-1;if(e.findIndex)return e.findIndex(t);for(var n=e.length,r=0,o=-1;r<n;r++){var a=e[r];if(!0===t(a,o,e)){o=r;break}}return o},e.prototype.getNewArray_NoRepeat=function(e,t){if(!e||0===e.length)return e;var n="undefined"!==typeof t&&!!t,r=e.length,o=[];if(!n){for(var a={},i=0;i<r;i++)a[e[i]]=1;for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&o.push(s);return o}o.push(e[0]);for(i=1;i<r;i++){for(var l=e[i],u=!1,d=0;d<o.length;d++)if(l===e[d]){u=!0;break}u||o.push(l)}return o},e.prototype.convertObjectKey_InOriginArr=function(e,t,n){e&&0!=e.length&&e.forEach((function(e){for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&o in e&&(e[t[o]]=e[o],n&&delete e[o])}))},e.prototype.get_NewArray_Accumulate_SigmaSummary=function(e){if("[object Array]"!={}.toString.call(e))return JSON.parse(JSON.stringify(e));if(1==e.length)return JSON.parse(JSON.stringify(e));var t=[],n=[];return e.forEach((function(r,o){if(t)if(0==o)n.push(r),t[o]=r;else{var a=0;if(o-1+""in t)a=t[o-1]+r;else for(var i=0;i<=o;i++)a+=e[i];n.push(a),t[o]=a}})),t=null,n},e.prototype.shuffle_rtnNew=function(e){var t,n,o,a=Object(r["h"])(e);for(o=a.length-1;o>0;o--)t=Math.floor(Math.random()*(o+1)),n=a[o],a[o]=a[t],a[t]=n;return a},e.prototype.noRepeat_rtnNew=function(e){return Object(r["h"])(new Set(e))},e}(),a=function(){function e(){}return e.prototype.bindEvt=function(e,t,n){if(e)if(t&&"string"===typeof t)if(n&&"function"===typeof n)if(e._events||(e._events={}),t in e._events){var r=o.getIndex_fromRule(e._events[t],(function(e){return e===n}));(r<0||"undefined"===typeof r)&&e._events[t].push(n)}else e._events[t]=[n],document.addEventListener?e.addEventListener(t,(function(n){if(e._events){var r=e._events[t];if(r&&r.length>0)for(var o=0,a=r.length;o<a;o++)r[o]&&r[o].call(e,n)}}),!1):window.attachEvent&&e.attachEvent&&e.attachEvent("on"+t,(function(){if(e._events){var n=e._events[t],r=window.event;r&&(r.preventDefault=function(){r.returnValue=!1},r.stopPropagation=function(){r.cancelBubble=!0});for(var o=0,a=n.length;o<a;o++)n[o].call(e,r)}}));else console.error("on(ele, eventName, fn)函数第三个参数必须是一个函数!");else console.error("on(ele, eventName, fn)函数第二个参数必须是一个字符串!");else console.error("on(ele, eventName, fn)函数第一个参数必须是一个dom元素!")},e.prototype.unbindEvt=function(e,t,n){var r;if(e)if(t&&"string"===typeof t){if(e._events&&t){var a=e._events[t];if(t&&!n){if(document.removeEventListener)for(var i=0,s=a.length;i<s;i++)e.removeEventListener(t,a[i],!1);else if(window.detachEvent&&e.detachEvent)for(i=0,s=a.length;i<s;i++)e.detachEvent("on"+t,a[i]);delete e._events[t]}else if(t&&n){if(!a)return;if(document.removeEventListener)1===a.length?(e.removeEventListener(t,n,!1),delete e._events[t]):(r=o.getIndex_fromRule(a,(function(e){return e===n})),r>-1&&a.splice(r,1));else if(window.detachEvent&&e.detachEvent){if(!a)return;1===a.length?(e.detachEvent("on"+t,n),delete e._events[t]):(r=o.getIndex_fromRule(a,(function(e){return e===n})),r>-1&&a.splice(r,1))}}a=null}}else console.error("off(ele, eventName, fn)函数第二个参数必须是一个字符串!");else console.error("off(ele, eventName, fn)函数第一个参数必须是一个dom元素!")},e.prototype.onDragDom_handleDataTransferItems=function(e,t){for(var n=0;n<e.length;n+=1){var r=e[n].kind,o=e[n].type;if("string"==r)-1!=o.indexOf("text/plain")?e[n].getAsString((function(e){t.plainString_CB&&t.plainString_CB(e)})):-1!=o.indexOf("text/html")?e[n].getAsString((function(e){t.htmlMultiString_CB&&t.htmlMultiString_CB(e)})):-1!=o.indexOf("text/uri-list")&&e[n].getAsString((function(e){t.uriOrLink_pathString_CB&&t.uriOrLink_pathString_CB(e)}));else if("file"==r&&-1!=o.indexOf("image/")){var a=e[n].getAsFile();t.file_CB&&t.file_CB(a)}}},e}(),i=function(){function e(){}return e.MOUSE={click:"click",dblclick:"dblclick",contextmenu:"contextmenu",mousedown:"mousedown",mousemove:"mousemove",mouseup:"mouseup",mouseenter:"mouseenter",mouseover:"mouseover",mouseout:"mouseout",BUTTON_TYPE:{LeftButton:0,RightButton:2}},e.KEYBOARD={keypress:"keypress",keydown:"keydown",keyup:"keyup",KeyCode_MAP:{0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,BackSpace:8,Tab:9,Enter:13,Caps_Lock:20,Control:17,Shift:16,Alt:18,Left_Arrow:37,Up_Arrow:38,Right_Arrow:39,Down_Arrow:40,Insert:45,Delete:46,Num_Lock:144},getKeyCode:function(e){var t=e||window.event;return t.keyCode||t.which||t.charCode}},e.ClipBoard={copy:"copy",paste:"paste",cut:"cut"},e.DragDom={fromSelf:{drag:"drag",dragstart:"dragstart",dragend:"dragend"},fromOthers:{dragenter:"dragenter",dragleave:"dragleave",dragover:"dragover",drop:"drop"},__dataTransfer__dropEffect_Enum:{move:"move",copy:"copy",link:"link",none:"none"},__dataTransfer__effectAllowed_Enum:{none:"none",copy:"copy",copyLink:"copyLink",copyMove:"copyMove",link:"link",linkMove:"linkMove",move:"move",all:"all",uninitialized:"uninitialized"}},e.Touch={touchstart:"touchstart",touchmove:"touchmove",touchend:"touchend",touchcancel:"touchcancel"},e.Window={abort:"abort",afterprint:"afterprint",beforeprint:"beforeprint",beforeunload:"beforeunload",blur:"blur",canplay:"canplay",canplaythrough:"canplaythrough",change:"change",click:"click",compassneedscalibration:"compassneedscalibration",contextmenu:"contextmenu",dblclick:"dblclick",devicelight:"devicelight",devicemotion:"devicemotion",deviceorientation:"deviceorientation",drag:"drag",dragend:"dragend",dragenter:"dragenter",dragleave:"dragleave",dragover:"dragover",dragstart:"dragstart",drop:"drop",durationchange:"durationchange",emptied:"emptied",ended:"ended",error:"error",focus:"focus",hashchange:"hashchange",input:"input",invalid:"invalid",keydown:"keydown",keypress:"keypress",keyup:"keyup",load:"load",loadeddata:"loadeddata",loadedmetadata:"loadedmetadata",loadstart:"loadstart",message:"message",mousedown:"mousedown",mouseenter:"mouseenter",mouseleave:"mouseleave",mousemove:"mousemove",mouseout:"mouseout",mouseover:"mouseover",mouseup:"mouseup",mousewheel:"mousewheel",MSGestureChange:"MSGestureChange",MSGestureDoubleTap:"MSGestureDoubleTap",MSGestureEnd:"MSGestureEnd",MSGestureHold:"MSGestureHold",MSGestureStart:"MSGestureStart",MSGestureTap:"MSGestureTap",MSInertiaStart:"MSInertiaStart",MSPointerCancel:"MSPointerCancel",MSPointerDown:"MSPointerDown",MSPointerEnter:"MSPointerEnter",MSPointerLeave:"MSPointerLeave",MSPointerMove:"MSPointerMove",MSPointerOut:"MSPointerOut",MSPointerOver:"MSPointerOver",MSPointerUp:"MSPointerUp",offline:"offline",online:"online",orientationchange:"orientationchange",pagehide:"pagehide",pageshow:"pageshow",pause:"pause",play:"play",playing:"playing",popstate:"popstate",progress:"progress",ratechange:"ratechange",readystatechange:"readystatechange",reset:"reset",resize:"resize",scroll:"scroll",seeked:"seeked",seeking:"seeking",select:"select",stalled:"stalled",storage:"storage",submit:"submit",suspend:"suspend",timeupdate:"timeupdate",unload:"unload",volumechange:"volumechange",vrdisplayactivate:"vrdisplayactivate",vrdisplayblur:"vrdisplayblur",vrdisplayconnect:"vrdisplayconnect",vrdisplaydeactivate:"vrdisplaydeactivate",vrdisplaydisconnect:"vrdisplaydisconnect",vrdisplayfocus:"vrdisplayfocus",vrdisplaypointerrestricted:"vrdisplaypointerrestricted",vrdisplaypointerunrestricted:"vrdisplaypointerunrestricted",vrdisplaypresentchange:"vrdisplaypresentchange",waiting:"waiting"},e}()}}]);