// Fap Fap — service worker: lets the installed game open instantly and play against the AI without network.
// Bump CACHE whenever index.html changes, so every phone picks up the new version.
const CACHE = 'fapfap-v18';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './art/home-bar.jpg', './art/logo.png'];

self.addEventListener('install', (event)=>{
  event.waitUntil(caches.open(CACHE).then(c=> c.addAll(CORE)).then(()=> self.skipWaiting()));
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys()
      .then(keys=> Promise.all(keys.filter(k=> k!==CACHE).map(k=> caches.delete(k))))
      .then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (event)=>{
  const req = event.request;
  if(req.method!=='GET') return;
  const url = new URL(req.url);
  // online play goes straight to Supabase, never through the cache
  if(url.hostname.endsWith('supabase.co')) return;

  // the game page itself: network first (always the latest version), cached copy when offline
  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req)
        .then(res=>{ const copy = res.clone(); caches.open(CACHE).then(c=> c.put('./index.html', copy)); return res; })
        .catch(()=> caches.match('./index.html'))
    );
    return;
  }

  // everything else (icons, fonts, the supabase library): cache first, refreshed in the background
  event.respondWith(
    caches.match(req).then(cached=>{
      const fresh = fetch(req).then(res=>{
        if(res && (res.ok || res.type==='opaque')){ const copy = res.clone(); caches.open(CACHE).then(c=> c.put(req, copy)); }
        return res;
      }).catch(()=> cached);
      return cached || fresh;
    })
  );
});
