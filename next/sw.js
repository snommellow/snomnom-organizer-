/* Keeps the tool working offline. The page itself is fetched fresh when online
   (so updates show right away) and falls back to the saved copy when offline.
   Fonts and libraries from other sites are served from the saved copy and
   refreshed in the background. */
const CACHE = "snomnom-4";
const CORE = ["./", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Sign-in and Drive calls always go to the network
  if (/(^|\.)googleapis\.com$|accounts\.google\.com$/.test(url.hostname) && !/fonts\.googleapis\.com$/.test(url.hostname)) return;

  if (req.mode === "navigate" || (url.origin === location.origin && url.pathname.endsWith("/"))) {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./", copy)); return res; })
        .catch(() => caches.match("./"))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
