const workbox =require("workbox-build");

workbox.generateSW({
    cacheId:"pwa_hive",
    globDirectory:"./",
    globPatterns:[
      "**/*.{css,js,html}"
    ],
    swDest:"./service-worker.js",
    runtimeCaching:[{
      urlPattern: /\.(?:html|htm)$/,
      handler:"StaleWhileRevalidate",
      options:{
        cacheName:"markup",
        expiration:{
          maxAgeSeconds:1800
        }
      }
    }]

  });
