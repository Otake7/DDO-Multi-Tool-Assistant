self.options = {
    "domain": "5gvci.com",
    "zoneId": 11774490
};
self.lary = "";
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw');

const CACHE_NAME = 'ddon-assistant-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
