// documented by Neeraj Gupta - https://neerajgupta.codes
const cacheName = "cache-v1";
const resourcesToPrecache = [
    "/",
    "index.html",
    "styles.css",
    "script.js",
    "service-worker.js",
    "title.png",
    "manifest.json",
    "f1.gif"
];

self.addEventListener("install", (event) => {
    console.log("Service worker install event!");
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => cache.addAll(resourcesToPrecache))
            .catch((err) => console.log("Failed to precache", err))
    );
});

self.addEventListener("activate", (event) => {
    console.log("Activate event");
    // Clear out old caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => cachedResponse || fetch(event.request))
    );
});

self.addEventListener("push", (event) => {
    const title = "Yes, a message!";
    const body = "We have received a push message!";
    const tag = "simple-push-example-tag";
    const options = {
        body: body,
        tag: tag,
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Load information for the default user and cache it on the first visit
self.addEventListener("fetch", (event) => {
    const defaultUser = "blister2007";
    const apiUrl = `https://api.github.com/users/${defaultUser}`;

    if (event.request.url.includes(apiUrl)) {
        event.respondWith(
            caches.open(cacheName).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // Clone the response to use it in the cache and to serve it
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        // If fetching fails, serve the cached response
                        return cache.match(event.request);
                    });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
