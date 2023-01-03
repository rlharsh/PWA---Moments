const staticCacheName = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/service-worker.js',
    '/logo.png',
    '/assets/css/style.css',
    '/assets/fonts/SF-UI-Display-Bold.ttf',
    '/assets/fonts/SF-UI-Display-Regular.ttf',
    '/assets/fonts//SF-UI-Display-Light.ttf',
    '/assets/images/ui/final_logo.png',
    '/assets/images/ui/avatar.jfif',
    '/assets/js/dots.js',
    '/assets/js/transitions.js',
    '/assets/images/ui/cta/memory.jpg',
    '/assets/images/ui/cta/person.jpg',
    '/assets/images/ui/cta/random.jpg',
    '/assets/images/ui/cta/relationship.jpg',
    '/assets/images/ui/cta/reminder.jpg',
    '/assets/images/ui/icons/alarm.svg',
    '/assets/images/ui/icons/chat.svg',
    '/assets/images/ui/icons/discord.svg',
    '/assets/images/ui/icons/facebook.svg',
    '/assets/images/ui/icons/help.svg',
    '/assets/images/ui/icons/instagram.svg',
    '/assets/images/ui/icons/memories.svg',
    '/assets/images/ui/icons/people.svg',
    '/assets/images/ui/icons/peoples.svg',
    '/assets/images/ui/peggy.JPG',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css',
    'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.js',
    'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.css'
];

self.addEventListener('install', evt => {
    evt.waitUntil(async function() {
        const cache = await caches.open(staticCacheName);
        await cache.addAll(assets);
    }())
});

self.addEventListener('activate', evt => {
    evt.waitUntil(async function() {
        const cacheNames = await caches.keys()

        await Promise.all(
            cacheNames.filter((cacheName) => {
                const deleteThisCache = cacheName !== staticCacheName

                return deleteThisCache
            }).map(cacheName => caches.delete(cacheName))
        )
    }())  
})

self.addEventListener('fetch', evt => {

    if (!(evt.request.url.indexOf('http') === 0)) return;

    const { request } = evt;

    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
        return;
    }

    evt.respondWith(async function() {
        const cache = await caches.open(staticCacheName);

        const cachedResponsePromise = await cache.match(request);
        const networkResponsePromise = fetch(request);

        if (request.url.startsWith(self.location.origin)) {
            evt.waitUntil(async function() {
                const networkResponse = await networkResponsePromise;

                await cache.put(request, networkResponse.clone());
            }())
        }

        return cachedResponsePromise || networkResponsePromise;
    }())
});

// Open the cache

/*
    evt.respondWith(caches.open(staticCacheName).then((cache) => {
        // Go to the network first
        return fetch(evt.request.url).then((fetchedResponse) => {
        cache.put(evt.request, fetchedResponse.clone());

        return fetchedResponse;
        }).catch(() => {
            console.log("Error 1 " + evt.request)
        // If the network is unavailable, get
        return cache.match(evt.request.url);
        });
    }));
*/
    


/*
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
})
*/