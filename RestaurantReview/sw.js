var cacheId = "restaurant-01";

self.addEventListener('install', event => {
    event.waitUntil (
        caches.open(cacheId).then( cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/register.js',
                '/js/dbhelper.js',
                '/data/restaurants.json'
            ]);
        })
        .catch(error => {
            console.log("Opening caches failed: " + error);
        })
    );
});

self.addEventListener('fetch', event => {
    let request = event.request;
    let requestUrl = new URL(event.request.url);
    if (event.request.url.indexOf("restaurant.html") > -1) {
        const url = "restaurant.html";
        request = new Request(url);
    }
    if (requestUrl.hostname !== 'localhost') {
        event.request.mode = 'no-cors';
    }
    event.respondWith(
        caches.match(request).then(response => {
            return response ||
                fetch(request).then( newResponse => {
                    return caches.open(cacheId).then( cache => {
                        cache.put(event.request, newResponse.clone());
                        return newResponse;
                    });
                })
                .catch(error => {
                    return new Response('Not connected to the internet: ' + error, {
                        status: 404,
                        statusText: 'No internet connection'
                    });
                });
        })
    );
});