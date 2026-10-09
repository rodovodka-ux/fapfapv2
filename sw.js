// Fap Fap — service worker: lets the installed game open instantly and play against the AI without network.
// Bump CACHE whenever index.html changes, so every phone picks up the new version.
const CACHE = 'fapfap-v42';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './art/livre/lieu-yaounde.webp'];

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

// a friend's challenge, even with the game closed: show it…
self.addEventListener('push', (event)=>{
  let d = {};
  try{ d = event.data ? event.data.json() : {}; }catch(e){ d = {body: event.data ? event.data.text() : ''}; }
  event.waitUntil(self.registration.showNotification(d.title || 'Fap Fap', {
    body: d.body || 'Une partie t’attend.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || 'fapfap',
    renotify: true,
    vibrate: [80, 60, 80],
    data: { url: d.url || './', code: d.code || '', name: d.name || '' }
  }));
});
// …and a touch on it opens the game on the invitation (the open game if there is one, a new window otherwise)
self.addEventListener('notificationclick', (event)=>{
  event.notification.close();
  const d = event.notification.data || {};
  const url = new URL(d.url || './', self.registration.scope).href;
  event.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list=>{
    const open = list.find(c=> c.url && c.url.startsWith(self.registration.scope));
    if(open){
      open.postMessage({type:'defi', code: d.code, name: d.name});
      return open.focus();
    }
    return self.clients.openWindow(url);
  }));
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
