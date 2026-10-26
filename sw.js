// La versione arriva da version.js: cambiandola lì cambia anche il nome della cache.
importScripts("version.js");

const CACHE_NAME = "soccorritore118-cache-v" + self.APP_VERSION;
const ASSETS = [
  "./index.html",
  "./content.js",
  "./version.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Installazione: precarica i file principali in cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Attivazione: elimina eventuali cache di versioni precedenti
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategia: cache-first con aggiornamento in background (stale-while-revalidate)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.ok || networkResponse.type === "opaque")) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
