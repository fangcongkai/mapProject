//map.js
// 换成本地的服务器js文件即可
let script = [
    
    'http://localhost:9000/bigemap.js/v2.1.0/bigemap.js',
    // 'http://localhost:9005/bigemap.js/v2.1.0/bigemap.js',
    // 'http://www.bigemap.com:9000/bigemap.js/v2.1.0/bigemap.js',
    // 'http://www.bigemap.com/Public/js/bm.draw.min.js',
    '/bm.draw.min.js',
    // 'http://www.bigemap.com/mapoffline/canvas-layer/canvas-layer.js',
    '/canvas-layer.js',
    // 'http://www.bigemap.com/Public/offline/marker_cluster/bm.markercluster-src.js',
    '/bm.markercluster.min.js'
    
    //如果有更多的JS要引用 ，也一起放到这个数组中
];
let css = [
    'http://localhost:9000/bigemap.js/v2.1.0/bigemap.css',
    // 'http://localhost:9005/bigemap.js/v2.1.0/bigemap.css',
    // 'http://www.bigemap.com:9000/bigemap.js/v2.1.0/bigemap.css',
    '/Bigemap.draw.css',
    '/MarkerCluster.Default.css',
]
export default new Promise(resolve => {


css.map((v) => {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.async = false;
    // 换成本地的服务器css文件即可
    link.href = v;
    document.head.appendChild(link);
  });
    let loads = script.map(v => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = false;
        script.src = v;
        document.head.appendChild(script);
        return script;
    });
    let end = loads.pop();
    end.onload = resolve;
});
