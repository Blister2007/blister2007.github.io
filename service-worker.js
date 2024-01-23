
self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(resourcesToPrecache))
      .catch((err) => console.log("Faled to precache", err))
  );
});

self.addEventListener("activate", (event) => console.log("Activate event"));
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request)) //returning cache or if not available fetching from event
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

// Pre Caching resources

const cacheName = "cache-v1";
const resourcesToPrecache = [
  "/",
  "index.html",
  "style.css",
  "index.js",
  "package-lock.json",
  "title.png",
  "manifest.json",
  "f1.gif"
];
