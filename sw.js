const SHELL = 'hq-20261116041935-shell';
const DATA = 'hq-20261116041935-data';
const PRECACHE = ["./","./apple-touch-icon.png","./assets/index-BBzj7JuD.js","./assets/index-DcE2Vfg6.css","./assets/inter-latin-400-normal-C38fXH4l.woff2","./assets/inter-latin-500-normal-Cerq10X2.woff2","./assets/inter-latin-600-normal-LgqL8muc.woff2","./assets/silkscreen-latin-400-normal-CtPo2yA5.woff2","./assets/silkscreen-latin-700-normal-CSE2nhgM.woff2","./icon-192.png","./icon-512-maskable.png","./icon-512.png","./index.html","./manifest.webmanifest"];
const DATA_FILES = ["relay.json"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('hq-') && k !== SHELL && k !== DATA).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const name = url.pathname.split('/').pop();
  if (DATA_FILES.includes(name)) {
    const key = new URL('./' + name, self.registration.scope).href;
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(DATA).then(c => c.put(key, copy)); }
      return res;
    }).catch(() => caches.match(key).then(r => r || Response.error())));
    return;
  }
  if (req.mode === 'navigate') {
    // network-first so a new deploy's index.html (and its new hashed JS) is picked up right away; cached shell offline
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(SHELL).then(c => c.put('./', copy)); }
      return res;
    }).catch(() => caches.match('./', { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(SHELL).then(c => c.put(req, copy)); }
    return res;
  })));
});
