(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"0mN4":function(e,t,r){"use strict";r("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"1z1J":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return s})),r.d(t,"d",(function(){return o})),r.d(t,"c",(function(){return d}));r("f3/d"),r("a1Th"),r("Btvt"),r("XfO3"),r("HEwt"),r("rGqo"),r("rE2o"),r("ioFf"),r("0mN4");function i(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}var n=function(e,t){return e.filter((function(e){return e.node.relativePath===t}))[0].node.childImageSharp.fluid},s=function(e,t){return e.filter((function(e){return e.node.relativePath===t}))[0].node.childImageSharp.fixed},o=function(e){return[e[e.length-1]].concat(i(e.slice(0,e.length-1)))},d=function(e){return[].concat(i(e.slice(1)),[e[0]])}},"9eSz":function(e,t,r){"use strict";r("rGqo"),r("yt8O"),r("Btvt"),r("XfO3"),r("EK0E"),r("INYr"),r("0mN4");var i=r("TqRt");t.__esModule=!0,t.default=void 0;var a,n=i(r("PJYZ")),s=i(r("VbXa")),o=i(r("8OQS")),d=i(r("pVnL")),l=i(r("q1tI")),u=i(r("17x9")),c=function(e){var t=(0,d.default)({},e),r=t.resolutions,i=t.sizes,a=t.critical;return r&&(t.fixed=r,delete t.resolutions),i&&(t.fluid=i,delete t.sizes),a&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(y&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,r=e.fixed;return h(t||r).src},h=function(e){if(y&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var r=e.findIndex((function(e){return void 0===e.media}));if(-1!==r)return e[r]}return e[0]},p=Object.create({}),m=function(e){var t=c(e),r=g(t);return p[r]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,y="undefined"!=typeof window,v=y&&window.IntersectionObserver,S=new WeakMap;function w(e){return e.map((function(e){var t=e.src,r=e.srcSet,i=e.srcSetWebp,a=e.media,n=e.sizes;return l.default.createElement(l.default.Fragment,{key:t},i&&l.default.createElement("source",{type:"image/webp",media:a,srcSet:i,sizes:n}),l.default.createElement("source",{media:a,srcSet:r,sizes:n}))}))}function E(e){var t=[],r=[];return e.forEach((function(e){return(e.media?t:r).push(e)})),[].concat(t,r)}function I(e){return e.map((function(e){var t=e.src,r=e.media,i=e.tracedSVG;return l.default.createElement("source",{key:t,media:r,srcSet:i})}))}function L(e){return e.map((function(e){var t=e.src,r=e.media,i=e.base64;return l.default.createElement("source",{key:t,media:r,srcSet:i})}))}function O(e,t){var r=e.srcSet,i=e.srcSetWebp,a=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(a?'media="'+a+'" ':"")+'srcset="'+(t?i:r)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var R=function(e,t){var r=(void 0===a&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=new window.IntersectionObserver((function(e){e.forEach((function(e){if(S.has(e.target)){var t=S.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),S.delete(e.target),t())}}))}),{rootMargin:"200px"})),a);return r&&(r.observe(e),S.set(e,t)),function(){r.unobserve(e),S.delete(e)}},x=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',r=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",a=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",d=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",l=e.loading?'loading="'+e.loading+'" ':"",u=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?O(e,!0):"")+O(e)})).join("")+"<img "+l+s+o+r+i+t+n+a+d+u+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},k=l.default.forwardRef((function(e,t){var r=e.src,i=e.imageVariants,a=e.generateSources,n=e.spreadProps,s=e.ariaHidden,o=l.default.createElement(V,(0,d.default)({ref:t,src:r},n,{ariaHidden:s}));return i.length>1?l.default.createElement("picture",null,a(i),o):o})),V=l.default.forwardRef((function(e,t){var r=e.sizes,i=e.srcSet,a=e.src,n=e.style,s=e.onLoad,u=e.onError,c=e.loading,f=e.draggable,g=e.ariaHidden,h=(0,o.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return l.default.createElement("img",(0,d.default)({"aria-hidden":g,sizes:r,srcSet:i,src:a},h,{onLoad:s,onError:u,ref:t,loading:c,draggable:f,style:(0,d.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));V.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var z=function(e){function t(t){var r;(r=e.call(this,t)||this).seenBefore=y&&m(t),r.isCritical="eager"===t.loading||t.critical,r.addNoScript=!(r.isCritical&&!t.fadeIn),r.useIOSupport=!b&&v&&!r.isCritical&&!r.seenBefore;var i=r.isCritical||y&&(b||!r.useIOSupport);return r.state={isVisible:i,imgLoaded:!1,imgCached:!1,fadeIn:!r.seenBefore&&t.fadeIn},r.imageRef=l.default.createRef(),r.placeholderRef=t.placeholderRef||l.default.createRef(),r.handleImageLoaded=r.handleImageLoaded.bind((0,n.default)(r)),r.handleRef=r.handleRef.bind((0,n.default)(r)),r}(0,s.default)(t,e);var r=t.prototype;return r.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:m(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},r.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},r.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=R(e,(function(){var e=m(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},r.handleImageLoaded=function(){var e,t,r;e=this.props,t=c(e),r=g(t),p[r]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},r.render=function(){var e=c(this.props),t=e.title,r=e.alt,i=e.className,a=e.style,n=void 0===a?{}:a,s=e.imgStyle,o=void 0===s?{}:s,u=e.placeholderStyle,f=void 0===u?{}:u,g=e.placeholderClassName,p=e.fluid,m=e.fixed,b=e.backgroundColor,y=e.durationFadeIn,v=e.Tag,S=e.itemProp,E=e.loading,O=e.draggable,R=!1===this.state.fadeIn||this.state.imgLoaded,z=!0===this.state.fadeIn&&!this.state.imgCached,C=(0,d.default)({opacity:R?1:0,transition:z?"opacity "+y+"ms":"none"},o),T="boolean"==typeof b?"lightgray":b,_={transitionDelay:y+"ms"},j=(0,d.default)({opacity:this.state.imgLoaded?0:1},z&&_,o,f),N={title:t,alt:this.state.isVisible?"":r,style:j,className:g,itemProp:S};if(p){var W=p,P=h(p);return l.default.createElement(v,{className:(i||"")+" gatsby-image-wrapper",style:(0,d.default)({position:"relative",overflow:"hidden",maxWidth:P.maxWidth?P.maxWidth+"px":null,maxHeight:P.maxHeight?P.maxHeight+"px":null},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(P.srcSet)},l.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/P.aspectRatio+"%"}}),T&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,d.default)({backgroundColor:T,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},z&&_)}),P.base64&&l.default.createElement(k,{ariaHidden:!0,ref:this.placeholderRef,src:P.base64,spreadProps:N,imageVariants:W,generateSources:L}),P.tracedSVG&&l.default.createElement(k,{ariaHidden:!0,ref:this.placeholderRef,src:P.tracedSVG,spreadProps:N,imageVariants:W,generateSources:I}),this.state.isVisible&&l.default.createElement("picture",null,w(W),l.default.createElement(V,{alt:r,title:t,sizes:P.sizes,src:P.src,crossOrigin:this.props.crossOrigin,srcSet:P.srcSet,style:C,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:E,draggable:O})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:x((0,d.default)({alt:r,title:t,loading:E},P,{imageVariants:W}))}}))}if(m){var q=m,H=h(m),M=(0,d.default)({position:"relative",overflow:"hidden",display:"inline-block",width:H.width,height:H.height},n);return"inherit"===n.display&&delete M.display,l.default.createElement(v,{className:(i||"")+" gatsby-image-wrapper",style:M,ref:this.handleRef,key:"fixed-"+JSON.stringify(H.srcSet)},T&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,d.default)({backgroundColor:T,width:H.width,opacity:this.state.imgLoaded?0:1,height:H.height},z&&_)}),H.base64&&l.default.createElement(k,{ariaHidden:!0,ref:this.placeholderRef,src:H.base64,spreadProps:N,imageVariants:q,generateSources:L}),H.tracedSVG&&l.default.createElement(k,{ariaHidden:!0,ref:this.placeholderRef,src:H.tracedSVG,spreadProps:N,imageVariants:q,generateSources:I}),this.state.isVisible&&l.default.createElement("picture",null,w(q),l.default.createElement(V,{alt:r,title:t,width:H.width,height:H.height,sizes:H.sizes,src:H.src,crossOrigin:this.props.crossOrigin,srcSet:H.srcSet,style:C,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:E,draggable:O})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:x((0,d.default)({alt:r,title:t,loading:E},H,{imageVariants:q}))}}))}return null},t}(l.default.Component);z.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var C=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string}),T=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string,maxWidth:u.default.number,maxHeight:u.default.number});z.propTypes={resolutions:C,sizes:T,fixed:u.default.oneOfType([C,u.default.arrayOf(C)]),fluid:u.default.oneOfType([T,u.default.arrayOf(T)]),fadeIn:u.default.bool,durationFadeIn:u.default.number,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,crossOrigin:u.default.oneOfType([u.default.string,u.default.bool]),style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string,itemProp:u.default.string,loading:u.default.oneOf(["auto","lazy","eager"]),draggable:u.default.bool};var _=z;t.default=_},EK0E:function(e,t,r){"use strict";var i,a=r("dyZX"),n=r("CkkT")(0),s=r("KroJ"),o=r("Z6vF"),d=r("czNK"),l=r("ZD67"),u=r("0/R4"),c=r("s5qY"),f=r("s5qY"),g=!a.ActiveXObject&&"ActiveXObject"in a,h=o.getWeak,p=Object.isExtensible,m=l.ufstore,b=function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},y={get:function(e){if(u(e)){var t=h(e);return!0===t?m(c(this,"WeakMap")).get(e):t?t[this._i]:void 0}},set:function(e,t){return l.def(c(this,"WeakMap"),e,t)}},v=e.exports=r("4LiD")("WeakMap",b,y,l,!0,!0);f&&g&&(d((i=l.getConstructor(b,"WeakMap")).prototype,y),o.NEED=!0,n(["delete","has","get","set"],(function(e){var t=v.prototype,r=t[e];s(t,e,(function(t,a){if(u(t)&&!p(t)){this._f||(this._f=new i);var n=this._f[e](t,a);return"set"==e?this:n}return r.call(this,t,a)}))})))},INYr:function(e,t,r){"use strict";var i=r("XKFU"),a=r("CkkT")(6),n="findIndex",s=!0;n in[]&&Array(1)[n]((function(){s=!1})),i(i.P+i.F*s,"Array",{findIndex:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),r("nGyu")(n)},OGtf:function(e,t,r){var i=r("XKFU"),a=r("eeVq"),n=r("vhPU"),s=/"/g,o=function(e,t,r,i){var a=String(n(e)),o="<"+t;return""!==r&&(o+=" "+r+'="'+String(i).replace(s,"&quot;")+'"'),o+">"+a+"</"+t+">"};e.exports=function(e,t){var r={};r[e]=t(o),i(i.P+i.F*a((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",r)}},ZD67:function(e,t,r){"use strict";var i=r("3Lyj"),a=r("Z6vF").getWeak,n=r("y3w9"),s=r("0/R4"),o=r("9gX7"),d=r("SlkY"),l=r("CkkT"),u=r("aagx"),c=r("s5qY"),f=l(5),g=l(6),h=0,p=function(e){return e._l||(e._l=new m)},m=function(){this.a=[]},b=function(e,t){return f(e.a,(function(e){return e[0]===t}))};m.prototype={get:function(e){var t=b(this,e);if(t)return t[1]},has:function(e){return!!b(this,e)},set:function(e,t){var r=b(this,e);r?r[1]=t:this.a.push([e,t])},delete:function(e){var t=g(this.a,(function(t){return t[0]===e}));return~t&&this.a.splice(t,1),!!~t}},e.exports={getConstructor:function(e,t,r,n){var l=e((function(e,i){o(e,l,t,"_i"),e._t=t,e._i=h++,e._l=void 0,null!=i&&d(i,r,e[n],e)}));return i(l.prototype,{delete:function(e){if(!s(e))return!1;var r=a(e);return!0===r?p(c(this,t)).delete(e):r&&u(r,this._i)&&delete r[this._i]},has:function(e){if(!s(e))return!1;var r=a(e);return!0===r?p(c(this,t)).has(e):r&&u(r,this._i)}}),l},def:function(e,t,r){var i=a(n(t),!0);return!0===i?p(e).set(t,r):i[e._i]=r,e},ufstore:p}}}]);
//# sourceMappingURL=ef25b196ab656bd5d7b4922819cc84c1abfb369f-ffef8ae43a9e780bb5e5.js.map