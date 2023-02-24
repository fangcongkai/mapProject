!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).draw={})}(this,function(t){"use strict";function s(t,i,e,n,a){!function t(i,e,n,a,o){for(;n<a;){var r,s,h,m,c;600<a-n&&(r=a-n+1,s=e-n+1,m=Math.log(r),h=.5*Math.exp(2*m/3),c=.5*Math.sqrt(m*h*(r-h)/r)*(s-r/2<0?-1:1),m=Math.max(n,Math.floor(e-s*h/r+c)),c=Math.min(a,Math.floor(e+(r-s)*h/r+c)),t(i,e,m,c,o));var l=i[e],_=n,u=a;for(d(i,n,e),0<o(i[a],l)&&d(i,n,a);_<u;){for(d(i,_,u),_++,u--;o(i[_],l)<0;)_++;for(;0<o(i[u],l);)u--}0===o(i[n],l)?d(i,n,u):d(i,++u,a),u<=e&&(n=u+1),e<=u&&(a=u-1)}}(t,i,e||0,n||t.length-1,a||o)}function d(t,i,e){var n=t[i];t[i]=t[e],t[e]=n}function o(t,i){return t<i?-1:i<t?1:0}class r{constructor(t=9){this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()}all(){return this._all(this.data,[])}search(i){let e=this.data;const n=[];if(!x(i,e))return n;const a=this.toBBox,o=[];for(;e;){for(let t=0;t<e.children.length;t++){var r=e.children[t],s=e.leaf?a(r):r;x(i,s)&&(e.leaf?n.push(r):u(i,s)?this._all(r,n):o.push(r))}e=o.pop()}return n}collides(i){let e=this.data;if(!x(i,e))return!1;const n=[];for(;e;){for(let t=0;t<e.children.length;t++){var a=e.children[t],o=e.leaf?this.toBBox(a):a;if(x(i,o)){if(e.leaf||u(i,o))return!0;n.push(a)}}e=n.pop()}return!1}load(i){if(!i||!i.length)return this;if(i.length<this._minEntries){for(let t=0;t<i.length;t++)this.insert(i[t]);return this}let t=this._build(i.slice(),0,i.length-1,0);var e;return this.data.children.length?this.data.height===t.height?this._splitRoot(this.data,t):(this.data.height<t.height&&(e=this.data,this.data=t,t=e),this._insert(t,this.data.height-t.height-1,!0)):this.data=t,this}insert(t){return t&&this._insert(t,this.data.height-1),this}clear(){return this.data=g([]),this}remove(t,i){if(!t)return this;let e=this.data;var n=this.toBBox(t);const a=[],o=[];let r,s,h;for(;e||a.length;){if(e||(e=a.pop(),s=a[a.length-1],r=o.pop(),h=!0),e.leaf){var m=function(i,e,n){if(!n)return e.(i);for(let t=0;t<e.length;t++)if(n(i,e[t]))return t;return-1}(t,e.children,i);if(-1!==m)return e.children.splice(m,1),a.push(e),this._condense(a),this}h||e.leaf||!u(e,n)?s?(r++,e=s.children[r],h=!1):e=null:(a.push(e),o.push(r),r=0,s=e,e=e.children[0])}return this}toBBox(t){return t}compareMinX(t,i){return t.minX-i.minX}compareMinY(t,i){return t.minY-i.minY}toJSON(){return this.data}fromJSON(t){return this.data=t,this}_all(t,i){const e=[];for(;t;)(t.leaf?i:e).push(...t.children),t=e.pop();return i}_build(e,t,n,a){var i=n-t+1;let o=this._maxEntries,r;if(i<=o)return r=g(e.slice(t,n+1)),l(r,this.toBBox),r;a||(a=Math.ceil(Math.log(i)/Math.log(o)),o=Math.ceil(i/Math.pow(o,a-1))),r=g([]),r.leaf=!1,r.height=a;var s=Math.ceil(i/o),h=s*Math.ceil(Math.sqrt(o));M(e,t,n,h,this.compareMinX);for(let i=t;i<=n;i+=h){var m=Math.min(i+h-1,n);M(e,i,m,s,this.compareMinY);for(let t=i;t<=m;t+=s){var c=Math.min(t+s-1,m);r.children.push(this._build(e,t,c,a-1))}}return l(r,this.toBBox),r}_chooseSubtree(a,o,t,r){for(;;){if(r.push(o),o.leaf||r.length-1===t)break;let i=1/0,e=1/0,n;for(let t=0;t<o.children.length;t++){var s=o.children[t],h=f(s),m=(m=a,c=s,(Math.max(c.maxX,m.maxX)-Math.min(c.minX,m.minX))*(Math.max(c.maxY,m.maxY)-Math.min(c.minY,m.minY))-h);m<e?(e=m,i=h<i?h:i,n=s):m===e&&h<i&&(i=h,n=s)}o=n||o.children[0]}var m,c;return o}_insert(t,i,e){var e=e?t:this.toBBox(t),n=[];const a=this._chooseSubtree(e,this.data,i,n);for(a.children.push(t),c(a,e);0<=i&&n[i].children.length>this._maxEntries;)this._split(n,i),i--;this._adjustParentBBoxes(e,n,i)}_split(t,i){const e=t[i];var n=e.children.length,a=this._minEntries;this._chooseSplitAxis(e,a,n);n=this._chooseSplitIndex(e,a,n);const o=g(e.children.splice(n,e.children.length-n));o.height=e.height,o.leaf=e.leaf,l(e,this.toBBox),l(o,this.toBBox),i?t[i-1].children.push(o):this._splitRoot(e,o)}_splitRoot(t,i){this.data=g([t,i]),this.data.height=t.height+1,this.data.leaf=!1,l(this.data,this.toBBox)}_chooseSplitIndex(i,e,n){let a,o=1/0,r=1/0;for(let t=e;t<=n-e;t++){var s=p(i,0,t,this.toBBox),h=p(i,t,n,this.toBBox),m=(c=s,l=h,u=m=_=void 0,_=Math.max(c.minX,l.minX),m=Math.max(c.minY,l.minY),u=Math.min(c.maxX,l.maxX),l=Math.min(c.maxY,l.maxY),Math.max(0,u-_)*Math.max(0,l-m)),h=f(s)+f(h);m<o?(o=m,a=t,r=h<r?h:r):m===o&&h<r&&(r=h,a=t)}var c,l,_,m,u;return a||n-e}_chooseSplitAxis(t,i,e){var n=t.leaf?this.compareMinX:h,a=t.leaf?this.compareMinY:m;this._allDistMargin(t,i,e,n)<this._allDistMargin(t,i,e,a)&&t.children.sort(n)}_allDistMargin(i,e,n,t){i.children.sort(t);const a=this.toBBox;var o=p(i,0,e,a),r=p(i,n-e,n,a);let s=_(o)+_(r);for(let t=e;t<n-e;t++){var h=i.children[t];c(o,i.leaf?a(h):h),s+=_(o)}for(let t=n-e-1;t>=e;t--){var m=i.children[t];c(r,i.leaf?a(m):m),s+=_(r)}return s}_adjustParentBBoxes(i,e,n){for(let t=n;0<=t;t--)c(e[t],i)}_condense(e){for(let t=e.length-1,i;0<=t;t--)0===e[t].children.length?0<t?(i=e[t-1].children,i.splice(i.(e[t]),1)):this.clear():l(e[t],this.toBBox)}}function l(t,i){p(t,0,t.children.length,i,t)}function p(i,e,n,a,o){(o=o||g(null)).minX=1/0,o.minY=1/0,o.maxX=-1/0,o.maxY=-1/0;for(let t=e;t<n;t++){var r=i.children[t];c(o,i.leaf?a(r):r)}return o}function c(t,i){return t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY),t}function h(t,i){return t.minX-i.minX}function m(t,i){return t.minY-i.minY}function f(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function _(t){return t.maxX-t.minX+(t.maxY-t.minY)}function u(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function x(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function g(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function M(t,i,e,n,a){const o=[i,e];for(;o.length;){var r;(e=o.pop())-(i=o.pop())<=n||(s(t,r=i+Math.ceil((e-i)/n/2)*n,i,e,a),o.push(i,r,r,e))}}var i=BM.CanvasMarkerLayer=BM.Layer.extend({options:{zIndex:null,collisionFlg:!1},initialize:function(t){BM.setOptions(this,t),this._layer_id=(new Date).getTime(),this._onClickListeners=[],this._onHoverListeners=[],this._onContextMenuListeners=[],this.drawTooltip=!0,this.minZoom=0,this.font="12px Helvetica Neue",this.fillStyle="#000",this._markers=new r,this._markers.dirty=0,this._markers.total=0,this._containMarkers=new r,this._showMarkers=new r,this._showMarkerBounds=new r},setOptions:function(t){return BM.setOptions(this,t),this.redraw()},redraw:function(){return this._redraw(!0)},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._reset,contextmenu:this._executeListeners,click:this._executeListeners,mousemove:this._executeListeners};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},addLayer:function(t,i=!0){if("markerPane"==t.options.pane&&t.options.icon){t._bigemap_id_=this._layer_id++,t._map=this._map;var e=t.getLatLng(),n=this._myProject(e),a=t.options.icon.options.iconSize,o=t.options.icon.options.iconAnchor;this._markers.insert({minX:n.x-o[0],minY:n.y-o[1],maxX:n.x+a[0]-o[0],maxY:n.y+a[1]-o[1],data:t}),this._markers.dirty++,this._markers.total++;e=this._map.getBounds().contains(e);return 1==i&&e&&this._redraw(!0),this}console.error("Layer isn't a marker")},addLayers:function(t,i=!0){return t.forEach(t=>{this.addLayer(t,!1)}),i&&this._redraw(!0),this},removeLayer:function(t,i=!0){var e=this,n=(t=t.minX?t.data:t).getLatLng(),a=e._map.getBounds().contains(n),n=this._myProject(n),t={minX:n.x,minY:n.y,maxX:n.x,maxY:n.y,data:t};return e._markers.remove(t,function(t,i){return t.data._bigemap_id_===i.data._bigemap_id_}),e._markers.total--,e._markers.dirty++,!0===a&&!0===i&&e._redraw(!0),this},removeLayers:function(t,e=!0){let n=t.length;return t.map((t,i)=>{i===n?this.removeLayer(t,e):this.removeLayer(t,!1)}),this},clearLayers:function(){this._markers=new r,this._markers.dirty=0,this._markers.total=0,this._containMarkers=new r,this._showMarkers=new r,this._showMarkerBounds=new r,this._redraw(!0)},onAdd:function(t){this._map=t,this.calcZoom=this._map.getZoom(),this._container||this._initCanvas(),(this.options.pane?this.getPane():t._panes.overlayPane).appendChild(this._container),this._update()},onRemove:function(t){(this.options.pane?this.getPane():t.getPanes().overlayPane).removeChild(this._container)},_drawMarker:function(t,i){var e=this;this._imageLookup||(this._imageLookup={});var n=t.options.icon.options,a=i.x-n.iconAnchor[0],o=a+n.iconSize[0],r=i.y-n.iconAnchor[1],n=r+n.iconSize[1];this._showMarkers.insert(Object.assign({},{minX:a,minY:r,maxX:o,maxY:n},{data:t}));var s=t.options.icon.options.iconUrl;t.canvas_img?e._drawImage(t,i):e._imageLookup[s]?(t.canvas_img=e._imageLookup[s][0],!1===e._imageLookup[s][1]?e._imageLookup[s][2].push([t,i]):e._drawImage(t,i)):((n=new Image).src=s,t.canvas_img=n,e._imageLookup[s]=[n,!1,[[t,i]]],n.onload=function(){e._imageLookup[s][1]=!0,e._imageLookup[s][2].forEach(function(t){e._drawImage(t[0],t[1])})})},_drawImage:function(t,i){var e=t.options.icon.options;this._ctx.drawImage(t.canvas_img,i.x-e.iconAnchor[0],i.y-e.iconAnchor[1],e.iconSize[0],e.iconSize[1])},_reset:function(){var t=this._map.containerPointToLayerPoint([0,0]);BM.DomUtil.setPosition(this._container,t);t=this._map.getSize();this._container.width=t.x,this._container.height=t.y,this._update()},_redraw:function(i){this._showMarkerBounds=new r,this._showMarkers=new r;var n=this;if(i&&this._ctx.clearRect(0,0,this._container.width,this._container.height),this._map&&this._markers&&!(this.options.minZoom&&this.options.minZoom>this._map.getZoom())){var e=[];.1<=n._markers.dirty/n._markers.total&&(n._markers.all().forEach(function(t){e.push(t)}),n._markers.clear(),n._markers.load(e),n._markers.dirty=0,e=[]);var a=n._map.getBounds(),i=this._myProject(a.getNorthWest()),a=this._myProject(a.getSouthEast()),a={minX:i.x,minY:i.y,maxX:a.x,maxY:a.y};let t=n._markers.search(a);return this._ctx.beginPath(),this._ctx.font=this.options.font||"12px Helvetica Neue",this._ctx.fillStyle=this.options.fillStyle||"#000",this._ctx.textAlign="center",t.forEach(function(t){var i=n._map.latLngToContainerPoint(t.data.getLatLng());n._drawMarker(t.data,i);let e=t.data.getTooltip();n.options.drawTooltip&&e&&(""!==(t=e.getContent())&&n._ctx.fillText(t,i.x,i.y+10))}),this._ctx.closePath(),this}},_initCanvas:function(){this._container=BM.DomUtil.create("canvas","bigemap-canvas-icon-layer bigemap-layer"),this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex);var t=this._map.getSize();this._container.width=t.x,this._container.height=t.y,this._ctx=this._container.getContext("2d");t=this._map.options.zoomAnimation&&BM.Browser.any3d;BM.DomUtil.addClass(this._container,"bigemap-zoom-"+(t?"animated":"hide"))},addOnClickListener:function(t){this._onClickListeners.push(t)},addOnContextMenuListener:function(t){this._onContextMenuListeners.push(t)},addOnHoverListener:function(t){this._onHoverListeners.push(t)},_myProject(t){let i=this._map.project(t,this.calcZoom);return{x:parseFloat(i.x.toFixed(7)),y:parseFloat(i.y.toFixed(7))}},_executeListeners:function(i){var t,e,n;this._showMarkers&&(n=(t=this)._map.latLngToContainerPoint(i.latlng),t._openToolTip&&(t._openToolTip.closeTooltip(),delete t._openToolTip),(e=this._showMarkers.search({minX:n.x,minY:n.y,maxX:n.x,maxY:n.y}))&&0<e.length?(i.layer=e[0].data,t._map._container.style.cursor="pointer","click"===i.type&&((n=e[0].data.getPopup())&&(n.options.offset=[0,-e[0].data.options.icon.options.iconSize[1]],e[0].data.openPopup()),t._onClickListeners.forEach(function(t){t(i,e)})),"contextmenu"===i.type&&t._onContextMenuListeners.forEach(function(t){t(i,e)}),"mousemove"===i.type&&(this.options.drawTooltip||e[0].data.getTooltip()&&(t._openToolTip=e[0].data,e[0].data.openTooltip()),t._onHoverListeners.forEach(function(t){t(i,e)}))):t._map._container.style.cursor="")},_onAnimZoom(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,i){var e=this._map.getZoomScale(i,this._zoom),n=BM.DomUtil.getPosition(this._container),a=this._map.getSize().multiplyBy(.5),o=this._map.project(this._center,i),o=this._map.project(t,i).subtract(o),o=a.multiplyBy(-e).add(n).add(a).subtract(o);BM.Browser.any3d?BM.DomUtil.setTransform(this._container,o,e):BM.DomUtil.setPosition(this._container,o)},_update:function(){var t=this._map.getSize(),i=this._map.containerPointToLayerPoint(t.multiplyBy(-0)).round();this._bounds=new BM.Bounds(i,i.add(t.multiplyBy(1)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom(),this._redraw(!0)}}),e=BM.canvasMarkerLayer=function(t){return new BM.CanvasMarkerLayer(t)};t.CanvasMarkerLayer=i,t.canvasMarkerLayer=e,Object.defineProperty(t,"__esModule",{value:!0})});