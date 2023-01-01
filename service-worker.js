const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/service-worker.js',
    '/logo.png'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            console.log('Caching shell assets.');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {

});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});

