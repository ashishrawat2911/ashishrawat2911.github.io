'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "9b818ca9511483c901bed1545384376c",
"index.html": "fe7cb53c91e92f16d566d94db9d50e3d",
"/": "fe7cb53c91e92f16d566d94db9d50e3d",
"main.dart.js": "2ff0fa5f9ef27d4cb43e250b1b1bfa9e",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "686a3881bf9de2ef83c9edf8cd915e8c",
"assets/web/profile-pic.jpg": "3abf1b5bafc95de9dbad3f6d5d382ffa",
"assets/AssetManifest.json": "f496af7f0af70b1bbe335b8ee06ce478",
"assets/NOTICES": "f3f01bd3722f881683a8afdc3073ef61",
"assets/FontManifest.json": "00fcf73fef658266d02dce925be872ed",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "930c4f19359ac45c6d20662ee28cbdcb",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/assets/images/social/delete_sign_50px.png": "ab1779999d4d5e42c1783960549ed86e",
"assets/assets/images/social/instagram.png": "0b6b3c8d2c74fc2e0be8f5d940ec1e14",
"assets/assets/images/social/github.png": "b6ec19ceacb23390aa66d2f101d0ddf6",
"assets/assets/images/social/medium.png": "ad1ca0daa2a82eb76c8425ee36faf21c",
"assets/assets/images/social/twitter.png": "8f35a40403a84631c4125c4f1859c7a6",
"assets/assets/images/social/linkedin.png": "d604727cedcd27fcc981ffdb1f318a66",
"assets/assets/images/social/menu_50px.png": "2a38db3a7e3fbe6660676f41d162e8af",
"assets/assets/images/social/right_50px.png": "1bcdc4da6b20a837f18760c0c99a265d",
"assets/assets/images/social/left_50px.png": "bed810b7ff3a293d985d3ce4a37f7361",
"assets/assets/images/profile/profile-pic.jpg": "3abf1b5bafc95de9dbad3f6d5d382ffa",
"assets/assets/images/portfolio/khatri.png": "7c006b791cf9dfa28937dd9abf433690",
"assets/assets/images/portfolio/chinta_money.png": "32872bc0b7172a369499ce51ca435d19",
"assets/assets/images/portfolio/wio.png": "360b9a720c0043ed23bca19fc39d64b8",
"assets/assets/images/portfolio/numen.png": "1effcd8a9d4ba4b0a11fbfad8127543e",
"assets/assets/images/portfolio/rhs.png": "d6e4070c056972dc00c93af68b4e0aa1",
"assets/assets/images/skills/git.png": "a54b586f055a923fc263c2ff05f25922",
"assets/assets/images/skills/flutter.png": "2ee0151bf4151bf629a6eb041f855ea9",
"assets/assets/images/skills/firebase.png": "7e966d92b6107d99db47f7f0a87c0d37",
"assets/assets/images/skills/java.png": "c1dce9f154589a9865f6769ef66ba957",
"assets/assets/images/skills/android.png": "0fb1e77bbfe50f7a527d66acdc4321eb",
"assets/assets/images/skills/cplusplus.png": "7f087de96e04a2edd9ab25fc9a0b1376",
"assets/assets/images/skills/html.png": "9fb0fa8df44788ec73be473713486e89",
"assets/assets/images/skills/c.png": "bbba79469eeb8411b27683375b06c776",
"assets/assets/images/skills/dart.png": "18a946b757870cf607fbc272178fa1bb",
"assets/assets/images/skills/kotlin.png": "1335c9ba97686b53ce77266db38afc00",
"assets/assets/images/skills/nodejs.png": "1bb559cddde0f4b5bfecd14e9b388a87",
"assets/assets/fonts/poppins/Poppins-Medium.otf": "f88c443f02135a3ba091560e76ed767f",
"assets/assets/fonts/poppins/Poppins-SemiBold.otf": "b0b3d360d13a9649222edd1d844dfc9c",
"assets/assets/fonts/poppins/Poppins-Bold.otf": "e47421f9b8cec2661620743c53475c8d",
"assets/assets/fonts/poppins/Poppins-Regular.otf": "de2dd9339ae7636475fcd91b3ed0e24f",
"profile-pic.jpg": "3abf1b5bafc95de9dbad3f6d5d382ffa",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
