(this["webpackJsonpxmas-carousel"]=this["webpackJsonpxmas-carousel"]||[]).push([[0],[,,,,,function(e,t,a){e.exports=a(12)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(3),o=a.n(r),s=(a(10),a(1));var l=function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])},i=a(4),u=function(){for(var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=Object(i.a)(a),c=n.length;0!==c;)t=Math.floor(Math.random()*c),e=n[c-=1],n[c]=n[t],n[t]=e;return n},m=function(e){return 0===e?0:e<=10?1:e<=25?2.5:e<=50?4:e<=75?5.5:e<=100?7:8},f={50:"#cc3300",100:"#cc66cc",200:"#669933",500:"#ffcc33",1e3:"#6699ff"};var b=function(e){var t=e.setPlayer,a=Object(n.useState)(""),r=Object(s.a)(a,2),o=r[0],l=r[1],i=Object(n.useRef)(null);return c.a.createElement("form",{action:"#",onSubmit:function(e){e.preventDefault(),o.trim()?t(o):i.current.focus()}},c.a.createElement("div",{className:"field has-addons"},c.a.createElement("div",{className:"control"},c.a.createElement("input",{className:"input",ref:i,type:"text",placeholder:"Enter name",value:o,onChange:function(e){l(e.target.value)}})),c.a.createElement("div",{className:"control"},c.a.createElement("button",{type:"submit",className:"button is-success"},"Add Player"))))};var v=function(e){var t=e.setPlayer,a=e.name;return c.a.createElement("div",{className:"current-player"},c.a.createElement("span",{className:"greeting"},"Hi"),c.a.createElement("div",{className:"tags has-addons are-medium"},c.a.createElement("span",{className:"tag is-warning is-capitalized"},a),c.a.createElement("button",{className:"tag is-delete is-danger",onClick:function(e){t("")}})))},d=(a(11),0),g=u({0:[1e3,1e3,500,500,500,500,200,200,200,200,200,200]}[d]),h=localStorage.getItem("__PLAYER__");var E=function(){var e=Object(n.useState)(0),t=Object(s.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(d),i=Object(s.a)(o,2),u=(i[0],i[1]),E=Object(n.useState)(1),j=Object(s.a)(E,2),O=j[0],p=j[1],N=Object(n.useState)(g),S=Object(s.a)(N,2),y=S[0],w=(S[1],Object(n.useState)(0)),M=Object(s.a)(w,2),_=M[0],k=M[1],P=Object(n.useState)(0),x=Object(s.a)(P,2),X=x[0],I=x[1],C=Object(n.useState)(0),R=Object(s.a)(C,2),T=R[0],Y=R[1],A=Object(n.useState)(""),D=Object(s.a)(A,2),B=D[0],J=D[1],L=Object(n.useState)(0),W=Object(s.a)(L,2),z=W[0],F=W[1],H=Object(n.useState)(0),U=Object(s.a)(H,2),Z=U[0],$=U[1],q=Object(n.useState)(h||""),G=Object(s.a)(q,2),K=G[0],Q=G[1],V=360/y.length,ee=function(e){Z||(k(e.pageX),F(e.pageX),I(e.pageX),p(0))},te=function(e){Z||(r(e.pageX-_),Y(X),I(e.pageX))},ae=function(){if(!Z){var e=Math.abs(X-z),t=Math.round(e/100)+m(e);p(t),k(0),F(0),I(0);var n="left"===B?a-e*t:a+e*t,c=n%V,o="left"===B?n-c:n+(V-c);0===e&&(o=a);var s=Math.round(o/V%y.length),l=0;l=s<=0?y[Math.abs(s)]:y[y.length-s],r(o),e>=100&&$(l||0)}};return Object(n.useEffect)((function(){var e=X>T?"right":"left";X&&B!==e&&(J(e),F(X))}),[X]),Object(n.useEffect)((function(){localStorage.setItem("__PLAYER__",K)}),[K]),l((function(){F(X)}),z?500:null),c.a.createElement(n.Fragment,null,c.a.createElement("nav",{className:"navbar is-info",role:"navigation","aria-label":"main navigation"},c.a.createElement("div",{className:"is-pulled-left"},c.a.createElement("div",{className:"navbar-brand"},c.a.createElement("span",{className:"navbar-item image has-text-weight-bold"},"X-mas Carousel"))),c.a.createElement("div",{className:"container is-fluid"},c.a.createElement("div",{className:"navbar-item"},!K&&c.a.createElement(b,{setPlayer:Q}),!!K&&c.a.createElement(v,{name:K,setPlayer:Q})))),c.a.createElement("div",{className:"app",onTouchStart:function(e){1===e.touches.length&&ee(e.touches[0])},onTouchMove:function(e){1===e.touches.length&&te(e.touches[0])},onTouchEnd:function(e){0===e.touches.length&&ae()},onMouseDown:function(e){ee(e)},onMouseMove:function(e){_&&te(e)},onMouseUp:function(){_&&ae()}},c.a.createElement("div",{className:"carousel-container"},c.a.createElement("div",{className:"carousel",style:{transform:"rotateY("+a+"deg)",transitionDuration:"".concat(O,"s")},onTransitionEnd:function(e){"transform"===e.propertyName&&Z&&(u(Z),$(0))}},y.map((function(e,t){return c.a.createElement("div",{className:"item",key:"item-".concat(e,"-").concat(t),style:{backgroundColor:"".concat(f[e]),transform:"rotateY(".concat(t*V,"deg) translateZ(").concat(20*y.length,"px)")}},e)}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[5,1,2]]]);
//# sourceMappingURL=main.50b38bc9.chunk.js.map