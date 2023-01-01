const staticCacheName = 'site-static-v5';
const assets = [
    '/',
    '/index.html',
    '/service-worker.js',
    '/logo.png',
    '/crying_cat.webp',
    '/manifest.json'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
                );
        })
    );
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});

