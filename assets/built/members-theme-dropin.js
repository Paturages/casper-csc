!function i(s,a,u){function c(e,t){if(!a[e]){if(!s[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(h)return h(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[e]={exports:{}};s[e][0].call(o.exports,function(t){return c(s[e][1][t]||t)},o,o.exports,i,s,a,u)}return a[e].exports}for(var h="function"==typeof require&&require,t=0;t<u.length;t++)c(u[t]);return c}({1:[function(t,e,r){"use strict";var c=t("superagent");e.exports.create=function(t){var s=t.host,a=t.version,u=t.key;return["posts","authors","tags","pages"].reduce(function(t,o){return Object.assign(t,(n={read:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length?arguments[2]:void 0;if(!t)return Promise.reject(new Error("Missing data"));if(!t.id&&!t.slug)return Promise.reject(new Error("Must include either data.id or data.slug"));var n=Object.assign({},t,e);return i(o,n,t.id||"slug/".concat(t.slug),r)},browse:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;return i(o,t,null,e)}},(r=o)in(e={})?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e));var e,r,n},{});function i(e,t,r){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;delete t.id;var o=function(t){return 1!==t.body[e].length||t.body.meta?Object.assign(t.body[e],{meta:t.body.meta}):t.body[e][0]},i=c.get("".concat(s,"/api/").concat(a,"/content/").concat(e,"/").concat(r?r+"/":"")).query(Object.assign({key:u},t));return n?i.set("Authorization","GhostMembers ".concat(n)).then(o):i.then(o)}}},{superagent:9}],2:[function(t,e,r){"use strict";e.exports=function(i){var t,s=(t=1,function(){return t+=1}),a=new URL(i.getAttribute("src")).origin,u={},r=function(){};return window.addEventListener("message",function(t){if(t.origin===a){if(!t.data||!t.data.uid)return t.data.event?r(t.data):void 0;var e=u[t.data.uid];e&&(delete u[t.data.uid],e(t.data.error,t.data.data))}}),{call:function(t,e,r){var n=s(),o={uid:n,method:t,options:e};u[n]=r,i.contentWindow.postMessage(o,a)},listen:function(t){r=t}}}},{}],3:[function(t,e,r){"use strict";var o=t("@tryghost/members-layer0"),i=t("minivents");e.exports.create=function(r){var n=new i,t=new Promise(function(t){var e=document.createElement("iframe");e.style.display="none",e.src="".concat(r.blogUrl,"/members/gateway"),e.onload=function(){t(o(e))},document.body.appendChild(e)}).then(function(t){return t.listen(function(t){n.emit(t.event,t.payload)}),t}),e=new Promise(function(t){var e=document.createElement("iframe");e.style.position="fixed",e.style.display="none",e.style.width="100%",e.style.height="100%",e.style.background="transparent",e.style.top="0",e.style["z-index"]="9999",e.src="".concat(r.blogUrl,"/members/auth"),e.onload=function(){t(e)},document.body.appendChild(e)});return{getToken:function(){return t.then(function(t){return new Promise(function(r,n){t.call("getToken",{},function(t,e){t&&n(t),r(e)})})})},login:function(){return e.then(function(t){return t.style.display="block",new Promise(function(e){n.on("signedin",function t(){n.off("signedin",t),e(!0)})})})},logout:function(){return t.then(function(t){return new Promise(function(r,n){t.call("signout",{},function(t,e){t&&n(t),r(e)})})})}}}},{"@tryghost/members-layer0":2,minivents:7}],4:[function(t,e,r){"use strict";var u=t("@tryghost/members-layer1");function c(t){t.style.display="block"}function h(t){t.style.display="none"}e.exports={init:function(t){var e=u.create({blogUrl:t.blogUrl}),r=document.querySelector("[data-members-signin]"),n=document.querySelector("[data-members-signin-cta]"),o=document.querySelector("[data-members-signout]");function i(t){return t?(c(o),h(r)):(c(r),h(o)),t}function s(){t.reload&&window.location.reload()}function a(t){t.preventDefault(),e.login().then(e.getToken).then(i).then(s)}return r.addEventListener("click",a),n&&n.addEventListener("click",a),o.addEventListener("click",function(t){t.preventDefault(),e.logout().then(e.getToken).then(i).then(s)}),e.getToken().then(i).then(function(){return{getToken:e.getToken}})}}},{"@tryghost/members-layer1":3}],5:[function(t,e,r){"use strict";function n(t){if(t)return function(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}(t)}void 0!==e&&(e.exports=n),n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function r(){this.off(t,r),e.apply(this,arguments)}return r.fn=e,this.on(t,r),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r,n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o=0;o<n.length;o++)if((r=n[o])===e||r.fn===e){n.splice(o,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks["$"+t];if(r)for(var n=0,o=(r=r.slice(0)).length;n<o;++n)r[n].apply(this,e);return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],6:[function(t,r,e){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){void 0!==r?r.exports=e():"function"==typeof define&&"object"==n(define.amd)?define(e):this.domready=e()}(0,function(){var t,e=[],r=document,n=r.documentElement.doScroll,o="DOMContentLoaded",i=(n?/^loaded|^c/:/^loaded|^i|^c/).test(r.readyState);return i||r.addEventListener(o,t=function(){for(r.removeEventListener(o,t),i=1;t=e.shift();)t()}),function(t){i?setTimeout(t,0):e.push(t)}})},{}],7:[function(t,e,r){"use strict";e.exports=function(i){var s={},a=[];(i=i||this).on=function(t,e,r){return(s[t]=s[t]||[]).push([e,r]),i},i.off=function(t,e){t||(s={});for(var r=s[t]||a,n=r.length=e?r.length:0;n--;)e==r[n][0]&&r.splice(n,1);return i},i.emit=function(t){for(var e,r=s[t]||a,n=0<r.length?r.slice(0,r.length):r,o=0;e=n[o++];)e[0].apply(e[1],a.slice.call(arguments,1));return i}}},{}],8:[function(t,e,r){"use strict";function o(){this._defaults=[]}["use","on","once","set","query","type","accept","auth","withCredentials","sortQuery","retry","ok","redirects","timeout","buffer","serialize","parse","ca","key","pfx","cert"].forEach(function(n){o.prototype[n]=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return this._defaults.push({fn:n,args:e}),this}}),o.prototype._setDefaults=function(e){this._defaults.forEach(function(t){e[t.fn].apply(e,t.args)})},e.exports=o},{}],9:[function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o;"undefined"!=typeof window?o=window:"undefined"!=typeof self?o=self:(console.warn("Using browser-only version of superagent in non-browser environment"),o=void 0);var i=t("component-emitter"),s=t("./request-base"),a=t("./is-object"),u=t("./response-base"),c=t("./agent-base");function h(){}var l=r=e.exports=function(t,e){return"function"==typeof e?new r.Request("GET",t).end(e):1==arguments.length?new r.Request("GET",t):new r.Request(t,e)};r.Request=_,l.getXHR=function(){if(!(!o.XMLHttpRequest||o.location&&"file:"==o.location.protocol&&o.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}throw Error("Browser-only version of superagent could not find XHR")};var p="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};function f(t){if(!a(t))return t;var e=[];for(var r in t)d(e,r,t[r]);return e.join("&")}function d(e,r,t){if(null!=t)if(Array.isArray(t))t.forEach(function(t){d(e,r,t)});else if(a(t))for(var n in t)d(e,"".concat(r,"[").concat(n,"]"),t[n]);else e.push(encodeURIComponent(r)+"="+encodeURIComponent(t));else null===t&&e.push(encodeURIComponent(r))}function y(t){for(var e,r,n={},o=t.split("&"),i=0,s=o.length;i<s;++i)-1==(r=(e=o[i]).indexOf("="))?n[decodeURIComponent(e)]="":n[decodeURIComponent(e.slice(0,r))]=decodeURIComponent(e.slice(r+1));return n}function m(t){return/[\/+]json($|[^-\w])/.test(t)}function b(t){this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText;var e=this.xhr.status;1223===e&&(e=204),this._setStatusProperties(e),this.header=this.headers=function(t){for(var e,r,n,o,i=t.split(/\r?\n/),s={},a=0,u=i.length;a<u;++a)-1!==(e=(r=i[a]).indexOf(":"))&&(n=r.slice(0,e).toLowerCase(),o=p(r.slice(e+1)),s[n]=o);return s}(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),null===this.text&&t._responseType?this.body=this.xhr.response:this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null}function _(t,e){var n=this;this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var e,r=null,t=null;try{t=new b(n)}catch(t){return(r=new Error("Parser is unable to parse the response")).parse=!0,r.original=t,n.xhr?(r.rawResponse=void 0===n.xhr.responseType?n.xhr.responseText:n.xhr.response,r.status=n.xhr.status?n.xhr.status:null,r.statusCode=r.status):(r.rawResponse=null,r.status=null),n.callback(r)}n.emit("response",t);try{n._isResponseOK(t)||(e=new Error(t.statusText||"Unsuccessful HTTP response"))}catch(t){e=t}e?(e.original=r,e.response=t,e.status=t.status,n.callback(e,t)):n.callback(null,t)})}function v(t,e,r){var n=l("DELETE",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n}l.serializeObject=f,l.parseString=y,l.types={html:"text/html",json:"application/json",xml:"text/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},l.serialize={"application/x-www-form-urlencoded":f,"application/json":JSON.stringify},l.parse={"application/x-www-form-urlencoded":y,"application/json":JSON.parse},u(b.prototype),b.prototype._parseBody=function(t){var e=l.parse[this.type];return this.req._parser?this.req._parser(this,t):(!e&&m(this.type)&&(e=l.parse["application/json"]),e&&t&&(t.length||t instanceof Object)?e(t):null)},b.prototype.toError=function(){var t=this.req,e=t.method,r=t.url,n="cannot ".concat(e," ").concat(r," (").concat(this.status,")"),o=new Error(n);return o.status=this.status,o.method=e,o.url=r,o},l.Response=b,i(_.prototype),s(_.prototype),_.prototype.type=function(t){return this.set("Content-Type",l.types[t]||t),this},_.prototype.accept=function(t){return this.set("Accept",l.types[t]||t),this},_.prototype.auth=function(t,e,r){1===arguments.length&&(e=""),"object"===n(e)&&null!==e&&(r=e,e=""),r||(r={type:"function"==typeof btoa?"basic":"auto"});return this._auth(t,e,r,function(t){if("function"==typeof btoa)return btoa(t);throw new Error("Cannot use basic auth, btoa is not a function")})},_.prototype.query=function(t){return"string"!=typeof t&&(t=f(t)),t&&this._query.push(t),this},_.prototype.attach=function(t,e,r){if(e){if(this._data)throw Error("superagent can't mix .send() and .attach()");this._getFormData().append(t,e,r||e.name)}return this},_.prototype._getFormData=function(){return this._formData||(this._formData=new o.FormData),this._formData},_.prototype.callback=function(t,e){if(this._shouldRetry(t,e))return this._retry();var r=this._callback;this.clearTimeout(),t&&(this._maxRetries&&(t.retries=this._retries-1),this.emit("error",t)),r(t,e)},_.prototype.crossDomainError=function(){var t=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain=!0,t.status=this.status,t.method=this.method,t.url=this.url,this.callback(t)},_.prototype.buffer=_.prototype.ca=_.prototype.agent=function(){return console.warn("This is not supported in browser version of superagent"),this},_.prototype.pipe=_.prototype.write=function(){throw Error("Streaming is not supported in browser version of superagent")},_.prototype._isHost=function(t){return t&&"object"===n(t)&&!Array.isArray(t)&&"[object Object]"!==Object.prototype.toString.call(t)},_.prototype.end=function(t){this._endCalled&&console.warn("Warning: .end() was called twice. This is not supported in superagent"),this._endCalled=!0,this._callback=t||h,this._finalizeQueryString(),this._end()},_.prototype._end=function(){if(this._aborted)return this.callback(Error("The request has been aborted even before .end() was called"));var r=this,n=this.xhr=l.getXHR(),t=this._formData||this._data;this._setTimeouts(),n.onreadystatechange=function(){var t=n.readyState;if(2<=t&&r._responseTimeoutTimer&&clearTimeout(r._responseTimeoutTimer),4==t){var e;try{e=n.status}catch(t){e=0}if(!e){if(r.timedout||r._aborted)return;return r.crossDomainError()}r.emit("end")}};var e=function(t,e){0<e.total&&(e.percent=e.loaded/e.total*100),e.direction=t,r.emit("progress",e)};if(this.hasListeners("progress"))try{n.onprogress=e.bind(null,"download"),n.upload&&(n.upload.onprogress=e.bind(null,"upload"))}catch(t){}try{this.username&&this.password?n.open(this.method,this.url,!0,this.username,this.password):n.open(this.method,this.url,!0)}catch(t){return this.callback(t)}if(this._withCredentials&&(n.withCredentials=!0),!this._formData&&"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof t&&!this._isHost(t)){var o=this._header["content-type"],i=this._serializer||l.serialize[o?o.split(";")[0]:""];!i&&m(o)&&(i=l.serialize["application/json"]),i&&(t=i(t))}for(var s in this.header)null!=this.header[s]&&this.header.hasOwnProperty(s)&&n.setRequestHeader(s,this.header[s]);this._responseType&&(n.responseType=this._responseType),this.emit("request",this),n.send(void 0!==t?t:null)},l.agent=function(){return new c},["GET","POST","OPTIONS","PATCH","PUT","DELETE"].forEach(function(n){c.prototype[n.toLowerCase()]=function(t,e){var r=new l.Request(n,t);return this._setDefaults(r),e&&r.end(e),r}}),c.prototype.del=c.prototype.delete,l.get=function(t,e,r){var n=l("GET",t);return"function"==typeof e&&(r=e,e=null),e&&n.query(e),r&&n.end(r),n},l.head=function(t,e,r){var n=l("HEAD",t);return"function"==typeof e&&(r=e,e=null),e&&n.query(e),r&&n.end(r),n},l.options=function(t,e,r){var n=l("OPTIONS",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},l.del=v,l.delete=v,l.patch=function(t,e,r){var n=l("PATCH",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},l.post=function(t,e,r){var n=l("POST",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},l.put=function(t,e,r){var n=l("PUT",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n}},{"./agent-base":8,"./is-object":10,"./request-base":11,"./response-base":12,"component-emitter":5}],10:[function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}e.exports=function(t){return null!==t&&"object"===n(t)}},{}],11:[function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=t("./is-object");function i(t){if(t)return function(t){for(var e in i.prototype)t[e]=i.prototype[e];return t}(t)}(e.exports=i).prototype.clearTimeout=function(){return clearTimeout(this._timer),clearTimeout(this._responseTimeoutTimer),delete this._timer,delete this._responseTimeoutTimer,this},i.prototype.parse=function(t){return this._parser=t,this},i.prototype.responseType=function(t){return this._responseType=t,this},i.prototype.serialize=function(t){return this._serializer=t,this},i.prototype.timeout=function(t){if(!t||"object"!==n(t))return this._timeout=t,this._responseTimeout=0,this;for(var e in t)switch(e){case"deadline":this._timeout=t.deadline;break;case"response":this._responseTimeout=t.response;break;default:console.warn("Unknown timeout option",e)}return this},i.prototype.retry=function(t,e){return 0!==arguments.length&&!0!==t||(t=1),t<=0&&(t=0),this._maxRetries=t,this._retries=0,this._retryCallback=e,this};var s=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];i.prototype._shouldRetry=function(t,e){if(!this._maxRetries||this._retries++>=this._maxRetries)return!1;if(this._retryCallback)try{var r=this._retryCallback(t,e);if(!0===r)return!0;if(!1===r)return!1}catch(t){console.error(t)}if(e&&e.status&&500<=e.status&&501!=e.status)return!0;if(t){if(t.code&&~s.indexOf(t.code))return!0;if(t.timeout&&"ECONNABORTED"==t.code)return!0;if(t.crossDomain)return!0}return!1},i.prototype._retry=function(){return this.clearTimeout(),this.req&&(this.req=null,this.req=this.request()),this._aborted=!1,this.timedout=!1,this._end()},i.prototype.then=function(t,e){if(!this._fullfilledPromise){var o=this;this._endCalled&&console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),this._fullfilledPromise=new Promise(function(r,n){o.on("error",n),o.end(function(t,e){t?n(t):r(e)})})}return this._fullfilledPromise.then(t,e)},i.prototype.catch=function(t){return this.then(void 0,t)},i.prototype.use=function(t){return t(this),this},i.prototype.ok=function(t){if("function"!=typeof t)throw Error("Callback required");return this._okCallback=t,this},i.prototype._isResponseOK=function(t){return!!t&&(this._okCallback?this._okCallback(t):200<=t.status&&t.status<300)},i.prototype.getHeader=i.prototype.get=function(t){return this._header[t.toLowerCase()]},i.prototype.set=function(t,e){if(o(t)){for(var r in t)this.set(r,t[r]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},i.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},i.prototype.field=function(t,e){if(null==t)throw new Error(".field(name, val) name can not be empty");if(this._data)throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");if(o(t)){for(var r in t)this.field(r,t[r]);return this}if(Array.isArray(e)){for(var n in e)this.field(t,e[n]);return this}if(null==e)throw new Error(".field(name, val) val can not be empty");return"boolean"==typeof e&&(e=""+e),this._getFormData().append(t,e),this},i.prototype.abort=function(){return this._aborted||(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort")),this},i.prototype._auth=function(t,e,r,n){switch(r.type){case"basic":this.set("Authorization","Basic ".concat(n("".concat(t,":").concat(e))));break;case"auto":this.username=t,this.password=e;break;case"bearer":this.set("Authorization","Bearer ".concat(t))}return this},i.prototype.withCredentials=function(t){return null==t&&(t=!0),this._withCredentials=t,this},i.prototype.redirects=function(t){return this._maxRedirects=t,this},i.prototype.maxResponseSize=function(t){if("number"!=typeof t)throw TypeError("Invalid argument");return this._maxResponseSize=t,this},i.prototype.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},i.prototype.send=function(t){var e=o(t),r=this._header["content-type"];if(this._formData)throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");if(e&&!this._data)Array.isArray(t)?this._data=[]:this._isHost(t)||(this._data={});else if(t&&this._data&&this._isHost(this._data))throw Error("Can't merge these send calls");if(e&&o(this._data))for(var n in t)this._data[n]=t[n];else"string"==typeof t?(r||this.type("form"),r=this._header["content-type"],this._data="application/x-www-form-urlencoded"==r?this._data?"".concat(this._data,"&").concat(t):t:(this._data||"")+t):this._data=t;return!e||this._isHost(t)||r||this.type("json"),this},i.prototype.sortQuery=function(t){return this._sort=void 0===t||t,this},i.prototype._finalizeQueryString=function(){var t=this._query.join("&");if(t&&(this.url+=(0<=this.url.indexOf("?")?"&":"?")+t),this._query.length=0,this._sort){var e=this.url.indexOf("?");if(0<=e){var r=this.url.substring(e+1).split("&");"function"==typeof this._sort?r.sort(this._sort):r.sort(),this.url=this.url.substring(0,e)+"?"+r.join("&")}}},i.prototype._appendQueryString=function(){console.trace("Unsupported")},i.prototype._timeoutError=function(t,e,r){if(!this._aborted){var n=new Error("".concat(t+e,"ms exceeded"));n.timeout=e,n.code="ECONNABORTED",n.errno=r,this.timedout=!0,this.abort(),this.callback(n)}},i.prototype._setTimeouts=function(){var t=this;this._timeout&&!this._timer&&(this._timer=setTimeout(function(){t._timeoutError("Timeout of ",t._timeout,"ETIME")},this._timeout)),this._responseTimeout&&!this._responseTimeoutTimer&&(this._responseTimeoutTimer=setTimeout(function(){t._timeoutError("Response timeout of ",t._responseTimeout,"ETIMEDOUT")},this._responseTimeout))}},{"./is-object":10}],12:[function(t,e,r){"use strict";var o=t("./utils");function n(t){if(t)return function(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}(t)}(e.exports=n).prototype.get=function(t){return this.header[t.toLowerCase()]},n.prototype._setHeaderProperties=function(t){var e=t["content-type"]||"";this.type=o.type(e);var r=o.params(e);for(var n in r)this[n]=r[n];this.links={};try{t.link&&(this.links=o.parseLinks(t.link))}catch(t){}},n.prototype._setStatusProperties=function(t){var e=t/100|0;this.status=this.statusCode=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.redirect=3==e,this.clientError=4==e,this.serverError=5==e,this.error=(4==e||5==e)&&this.toError(),this.created=201==t,this.accepted=202==t,this.noContent=204==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.forbidden=403==t,this.notFound=404==t,this.unprocessableEntity=422==t}},{"./utils":13}],13:[function(t,e,r){"use strict";r.type=function(t){return t.split(/ *; */).shift()},r.params=function(t){return t.split(/ *; */).reduce(function(t,e){var r=e.split(/ *= */),n=r.shift(),o=r.shift();return n&&o&&(t[n]=o),t},{})},r.parseLinks=function(t){return t.split(/ *, */).reduce(function(t,e){var r=e.split(/ *; */),n=r[0].slice(1,-1);return t[r[1].split(/ *= */)[1].slice(1,-1)]=n,t},{})},r.cleanHeader=function(t,e){return delete t["content-type"],delete t["content-length"],delete t["transfer-encoding"],delete t.host,e&&(delete t.authorization,delete t.cookie),t}},{}],14:[function(t,e,r){"use strict";var n=t("domready"),a=t("@tryghost/content-api"),o=t("@tryghost/members-layer2"),i=function(t,i){var s="".concat(t,"/ghost");o.init({reload:!0,blogUrl:t}).then(function(t){(0,t.getToken)().then(function(t){var e,r,n,o;t&&(e=s,r=i,n=t,(o=document.querySelector("[data-members-resource-type='post']"))&&a.create({host:e,version:"v2",key:""}).posts.read({id:r},{},n).then(function(t){o.innerHTML=t.html,console.info("Inserted post data from content API",t)}).catch(function(t){console.error("Failed to fetch data from content API",t)}))})})};n(function(){var t=document.querySelector("[data-members-resource-type='post']"),e=t&&t.getAttribute("data-members-resource-id"),r=window.blogUrl;r&&e?i(r,e):o.init({reload:!0,blogUrl:r})}),console.info("Initialized members script..."),e.exports={init:i}},{"@tryghost/content-api":1,"@tryghost/members-layer2":4,domready:6}]},{},[14]);
//# sourceMappingURL=members-theme-dropin.js.map
