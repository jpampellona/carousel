(this["webpackJsonpxmas-carousel"]=this["webpackJsonpxmas-carousel"]||[]).push([[0],[,,,,,,function(e,t,a){e.exports=a(13)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(4),s=a.n(r),o=(a(11),a(2)),i=a(1);var l=function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])},u=a(5),m=function(){for(var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=Object(u.a)(a),c=n.length;0!==c;)t=Math.floor(Math.random()*c),e=n[c-=1],n[c]=n[t],n[t]=e;return n},f=function(e){return 0===e?0:e<=10?1:e<=25?2.5:e<=50?4:e<=75?5.5:e<=100?7:8},b={50:"#cc3300",100:"#cc66cc",200:"#669933",500:"#ffcc33",1e3:"#6699ff"};function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var d=function(e){var t=e.setPlayer,a=e.playersMap,r=e.setPlayersMap,s=Object(n.useState)(""),l=Object(i.a)(s,2),u=l[0],m=l[1],f=Object(n.useRef)(null);return c.a.createElement("form",{action:"#",onSubmit:function(e){if(e.preventDefault(),u.trim()){var n=u.toLowerCase();t(n),a[n]||r(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(a,!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a,Object(o.a)({},n,{money:0,finished:!1})))}else f.current.focus()}},c.a.createElement("div",{className:"field has-addons"},c.a.createElement("div",{className:"control"},c.a.createElement("input",{className:"input",ref:f,type:"text",placeholder:"Enter name",value:u,onChange:function(e){m(e.target.value)}})),c.a.createElement("div",{className:"control"},c.a.createElement("button",{type:"submit",className:"button is-success"},"Add Player"))))};var O=function(e){var t=e.setPlayer,a=e.name;return c.a.createElement("div",{className:"current-player"},c.a.createElement("div",{className:"tags has-addons are-medium"},c.a.createElement("span",{className:"tag"},"Hi!"),c.a.createElement("span",{className:"tag is-success is-capitalized"},a,c.a.createElement("button",{className:"delete is-medium",onClick:function(e){e.preventDefault(),t("")}}))))};a(12);function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(a,!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var j=0,h=m({0:[1e3,1e3,500,500,500,200,200,200,200,200,200,200]}[j]),y=localStorage.getItem("__PLAYER__"),E=JSON.parse(localStorage.getItem("__PLAYERS_MAP__"));var N=function(){var e=Object(n.useState)(0),t=Object(i.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(j),o=Object(i.a)(s,2),u=(o[0],o[1]),p=Object(n.useState)(1),v=Object(i.a)(p,2),N=v[0],P=v[1],S=Object(n.useState)(h),w=Object(i.a)(S,2),_=w[0],M=w[1],x=Object(n.useState)(0),k=Object(i.a)(x,2),D=k[0],C=k[1],I=Object(n.useState)(0),A=Object(i.a)(I,2),R=A[0],Y=A[1],L=Object(n.useState)(0),X=Object(i.a)(L,2),J=X[0],T=X[1],z=Object(n.useState)(""),B=Object(i.a)(z,2),F=B[0],W=B[1],G=Object(n.useState)(0),H=Object(i.a)(G,2),U=H[0],Z=H[1],$=Object(n.useState)(!1),q=Object(i.a)($,2),K=q[0],Q=q[1],V=Object(n.useState)(!1),ee=Object(i.a)(V,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(0),ce=Object(i.a)(ne,2),re=ce[0],se=ce[1],oe=Object(n.useState)(y||""),ie=Object(i.a)(oe,2),le=ie[0],ue=ie[1],me=Object(n.useState)(E||{}),fe=Object(i.a)(me,2),be=fe[0],pe=fe[1],de=be[le],Oe=360/_.length,ve=function(e){re||(C(e.pageX),Z(e.pageX),Y(e.pageX),P(0))},ge=function(e){re||(r(e.pageX-D),T(R),Y(e.pageX))},je=function(){if(!re){var e=Math.abs(R-U),t=Math.round(e/100)+f(e);P(t),C(0),Z(0),Y(0);var n="left"===F?a-e*t:a+e*t,c=n%Oe,s="left"===F?n-c:n+(Oe-c);0===e&&(s=a);var o=Math.round(s/Oe%_.length),i=0;i=o<=0?_[Math.abs(o)]:_[_.length-o],r(s),le&&te&&e>=100&&se(i||0)}};return Object(n.useEffect)((function(){var e=R>J?"right":"left";R&&F!==e&&(W(e),Z(R))}),[R]),Object(n.useEffect)((function(){localStorage.setItem("__PLAYERS_MAP__",JSON.stringify(be))}),[be]),Object(n.useEffect)((function(){localStorage.setItem("__PLAYER__",le),le?(P(0),r(0)):Q(!1)}),[le]),l((function(){Z(R)}),U?500:null),c.a.createElement(n.Fragment,null,c.a.createElement("nav",{className:"navbar is-info ".concat(te?"is-ready":""),role:"navigation","aria-label":"main navigation"},c.a.createElement("div",{className:"is-pulled-left"},c.a.createElement("div",{className:"navbar-brand"},c.a.createElement("span",{className:"navbar-item image has-text-weight-bold"},"Carousel"))),c.a.createElement("div",{className:"container is-fluid"},c.a.createElement("div",{className:"navbar-item"},!le&&c.a.createElement(d,{setPlayer:ue,playersMap:be,setPlayersMap:pe}),!!le&&c.a.createElement(O,{name:le,setPlayer:ue})))),c.a.createElement("div",{className:"app"},c.a.createElement("div",{className:"controls controls-upper"},!le&&c.a.createElement("h1",{className:"title is-3 has-text-grey"},"Enter your name to start"),!!de&&!te&&!de.finished&&c.a.createElement("div",{className:"container is-fluid mt-10"},c.a.createElement("div",{className:"has-text-grey is-flex align-items-center justify-content-center"},"Press"," ",c.a.createElement("button",{className:"button ml-5 mr-5",onClick:function(){K?M(m(_)):(r(0),P(0),Q(!0))}},"Swap Cards")," ","to randomly swap cards."),K&&c.a.createElement("div",{className:"has-text-grey is-flex align-items-center justify-content-center mt-5"},"Press"," ",c.a.createElement("button",{className:"button is-primary ml-5 mr-5",onClick:function(){Q(!1)}},"Finish")," ","when you're done swapping cards."),!K&&c.a.createElement("div",{className:"has-text-grey is-flex align-items-center justify-content-center mt-5"},"Press"," ",c.a.createElement("button",{className:"button is-info ml-5 mr-5",onClick:function(){r(0),P(0),ae(!0)}},"I'm Ready")," ","when you're ready to spin.")),c.a.createElement("div",{className:"goodluck is-flex align-items-center justify-content-center ".concat(te?"is-ready":"")},c.a.createElement("h1",{className:"title is-3 has-text-grey"},"Goodluck ",c.a.createElement("span",{className:"is-capitalized"},le,"!!!")),c.a.createElement("h3",{className:"subtitle is-4 has-text-grey"},"Spin it fast!"))),c.a.createElement("div",{className:"carousel-swipe-container ".concat(K?"swapping":""),onTouchStart:K?void 0:function(e){1===e.touches.length&&ve(e.touches[0])},onTouchMove:K?void 0:function(e){1===e.touches.length&&ge(e.touches[0])},onTouchEnd:K?void 0:function(e){0===e.touches.length&&je()},onMouseDown:K?void 0:function(e){ve(e)},onMouseMove:K?void 0:function(e){D&&ge(e)},onMouseUp:K?void 0:function(){D&&je()}},c.a.createElement("div",{className:"carousel-container"},c.a.createElement("div",{className:"carousel",style:{transform:"rotateY("+a+"deg)",transitionDuration:"".concat(N,"s")},onTransitionEnd:function(e){"transform"===e.propertyName&&re&&(u(re),se(0))}},_.map((function(e,t){var a=K?{}:{transform:"rotateY(".concat(t*Oe,"deg) translateZ(").concat(20*_.length,"px)")};return c.a.createElement("div",{className:"item",key:"item-".concat(e,"-").concat(t),style:g({backgroundColor:"".concat(b[e])},a)},e)})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[6,1,2]]]);
//# sourceMappingURL=main.273c01dd.chunk.js.map