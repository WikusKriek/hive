/* Import Workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

/* Workbox Config */
workbox.setConfig({
  debug: false
});

/* Cache HTML */
workbox.routing.registerRoute(
  /.*\.html/,
	workbox.strategies.networkFirst({
    cacheName: 'cache-html',
		networkTimeoutSeconds: 3
  })
);

/* Cache CSS */
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-css'
  })
);

/* Cache JS */
workbox.routing.registerRoute(
  /.*\.js/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-js'
  })
);

/* Cache Images */
workbox.routing.registerRoute(
  /.*\.(?:gif|jpeg|jpg|png|svg)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-img'
  })
);

/* Cache Fonts */
workbox.routing.registerRoute(
  /.*\.(?:eot|otf|ttf|woff|woff2)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-font'
  })
);

self.addEventListener('install', event => {
  self.skipWaiting();


});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {

          return caches.delete(key);

      })
    )).then(() => {
      console.log('V3 now ready to handle fetches!');
    })
  );
});
