parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"zUU9":[function(require,module,exports) {
"use strict";const e={openModal:document.querySelector(".footer__link"),body:document.querySelector("body")},t=document.createElement("div"),o=document.createElement("div"),l='<div class="member">\n<ul class="member__list">\n<li class="member__title">\n  Team GoIT: \n</li>\n<li class="member__name">In progress...</li>\n</ul>\n<a href="https://github.com/PaHomeAtHome/filmoteka-old/graphs/contributors" target="_blank"><span class="footer__text link-qr">Press me, plz...</span></a>\n</div>\n<button type="button" class="modal__close-btn" data-close-modal><span>&#9587;</span></button>\n';t.classList.add("overlay"),t.classList.add("container"),o.classList.add("footer__modal"),t.appendChild(o),e.body.prepend(t),o.insertAdjacentHTML("beforeend",l),e.closeModalBtn=document.querySelector(".modal__close-btn"),e.overlay=document.querySelector(".overlay");const n=()=>{e.overlay.classList.toggle("open")};e.openModal.addEventListener("click",n),e.closeModalBtn.addEventListener("click",n);
},{}]},{},["zUU9"], null)
//# sourceMappingURL=/filmoteka-project/footer-modal.b092797f.js.map