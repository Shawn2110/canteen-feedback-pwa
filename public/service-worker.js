self.importScripts('https://unpkg.com/idb/build/iife/index-min.js');

const CACHE_NAME = "canteen-cache-v1";
const urlsToCache = ['/', '/index.html', '/logo192.png'];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("sync", event => {
  if (event.tag === "sync-feedback") {
    event.waitUntil(syncFeedback());
  }
});

self.addEventListener("push", event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "logo192.png",
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

async function syncFeedback() {
  const db = await idb.openDB('canteen-db', 1);
  const feedbacks = await db.getAll('feedback');
  console.log("Syncing feedback:", feedbacks);
  await db.clear('feedback');
}