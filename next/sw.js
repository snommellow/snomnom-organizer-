/* Keeps the tool working offline. The page itself is fetched fresh when online
   (so updates show right away) and falls back to the saved copy when offline.
   Fonts and libraries from other sites are served from the saved copy and
   refreshed in the background. Relay answers are never saved here. */
const CACHE = "snomnom-6";
const CORE = ["./", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== "snomnom-share").map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  // Shared from the phone's Share menu: keep what was shared, then open the page to pick it up
  if (req.method === "POST" && url.origin === location.origin && url.pathname.endsWith("/share")) {
    e.respondWith((async () => {
      try {
        const fd = await req.formData(), c = await caches.open("snomnom-share");
        const meta = { title: fd.get("title") || "", text: fd.get("text") || "", url: fd.get("url") || "", files: [] };
        const files = fd.getAll("files").filter(f => f && typeof f !== "string");
        for (let i = 0; i < files.length; i++) {
          const f = files[i], k = "./shared-file-" + Date.now() + "-" + i;
          await c.put(k, new Response(f, { headers: { "content-type": f.type || "application/octet-stream", "x-name": encodeURIComponent(f.name || "shared") } }));
          meta.files.push(k);
        }
        await c.put("./shared-meta", new Response(JSON.stringify(meta), { headers: { "content-type": "application/json" } }));
      } catch (err) {}
      return Response.redirect("./?shared=1", 303);
    })());
    return;
  }
  if (req.method !== "GET") return;
  // Only web requests (a browser extension's own requests can't be saved)
  if (url.protocol !== "https:" && url.protocol !== "http:") return;
  // Fetch's relay always goes to the network: a saved answer would hide new stage info
  if (/\.workers\.dev$/.test(url.hostname)) return;
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
