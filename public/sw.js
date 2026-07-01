const CACHE_NAME = "time-wasted-v1";
const CORE_ASSETS = ["/", "/manifest.webmanifest", "/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== location.origin
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();

        if (response.ok) {
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)),
          );
        }

        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match("/")),
      ),
  );
});
