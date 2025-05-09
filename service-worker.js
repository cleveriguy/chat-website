const CACHE_NAME = "adamschat-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/home.html",
  "/chat.html",
  "/about.html",
  "/stories.html",
  "/write.html",
  "/manifest.json",
  "/E9430230-5E25-4575-87B4-E15999C8F5C3.png"
];

// On install: cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// On fetch: try cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// (Optional) On activate: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});