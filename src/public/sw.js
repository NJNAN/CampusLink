const CACHE_NAME = 'fuzhou-tech-alumni-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// 静态资源列表
const STATIC_ASSETS = [
  '/',
  '/h5/personal-home',
  '/h5/class-circle', 
  '/h5/my-profile',
  '/offline.html'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 请求拦截 - 缓存策略
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) return;

  // 对于导航请求使用网络优先策略
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // 成功获取网络响应，更新缓存
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // 网络失败，尝试从缓存获取
          return caches.match(request)
            .then(response => {
              if (response) {
                return response;
              }
              // 如果缓存中也没有，返回离线页面
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // 对于API请求使用缓存优先策略
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            // 后台更新缓存
            fetch(request).then(fetchResponse => {
              if (fetchResponse.ok) {
                caches.open(DYNAMIC_CACHE).then(cache => {
                  cache.put(request, fetchResponse.clone());
                });
              }
            }).catch(() => {
              // 网络请求失败，忽略
            });
            return response;
          }
          
          // 缓存中没有，尝试网络请求
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.ok) {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return fetchResponse;
          });
        })
    );
    return;
  }

  // 对于静态资源使用缓存优先策略
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request).then(fetchResponse => {
            if (fetchResponse.ok) {
              const responseClone = fetchResponse.clone();
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return fetchResponse;
          });
        })
    );
    return;
  }

  // 其他请求使用网络优先策略
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// 后台同步
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

// 推送通知
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'explore',
          title: '查看详情',
          icon: '/icons/checkmark.png'
        },
        {
          action: 'close',
          title: '关闭',
          icon: '/icons/xmark.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// 数据同步函数
async function syncData() {
  try {
    // 同步离线时产生的数据
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      for (const item of offlineData) {
        await syncSingleItem(item);
      }
      await clearOfflineData();
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// 获取离线数据
async function getOfflineData() {
  // 从 IndexedDB 或其他存储中获取离线数据
  return [];
}

// 同步单个数据项
async function syncSingleItem(item) {
  // 将数据发送到服务器
  return fetch('/api/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });
}

// 清理离线数据
async function clearOfflineData() {
  // 清理已同步的离线数据
}