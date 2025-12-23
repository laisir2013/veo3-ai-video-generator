#!/bin/bash

# VEO3 PWA 手機版本 - 自動配置腳本

echo "📱 VEO3 PWA 手機版本配置"
echo "========================="

# 檢查是否在 VEO3 專案目錄中
if [ ! -f "package.json" ] || ! grep -q "veo3-web" package.json; then
    echo "❌ 請在 VEO3 專案根目錄中運行此腳本"
    exit 1
fi

echo "✅ 檢測到 VEO3 專案"

# 安裝 PWA 依賴
echo "📦 安裝 PWA 相關依賴..."
pnpm add vite-plugin-pwa workbox-window
pnpm add -D @types/serviceworker

# 創建 PWA 圖標目錄
echo "🎨 創建 PWA 資源目錄..."
mkdir -p public/icons

# 備份原始 vite.config.ts
if [ -f "vite.config.ts" ]; then
    cp vite.config.ts vite.config.ts.backup
    echo "✅ 已備份原始 vite.config.ts"
fi

# 更新 vite.config.ts
echo "⚙️  配置 PWA 設置..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'VEO3 視頻生成器',
        short_name: 'VEO3',
        description: '強大的 AI 視頻生成應用，支援多種模型和語言配音',
        theme_color: '#1a1a1a',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: 'veo3-pwa',
        lang: 'zh-TW',
        icons: [
          {
            src: '/icons/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ],
        shortcuts: [
          {
            name: '快速生成',
            short_name: '快速',
            description: '使用快速模式生成視頻',
            url: '/?mode=fast',
            icons: [{ src: '/icons/shortcut-fast.png', sizes: '96x96' }]
          },
          {
            name: '高質量生成',
            short_name: '高質量',
            description: '使用高質量模式生成視頻',
            url: '/?mode=quality',
            icons: [{ src: '/icons/shortcut-quality.png', sizes: '96x96' }]
          },
          {
            name: '歷史記錄',
            short_name: '歷史',
            description: '查看生成歷史',
            url: '/history',
            icons: [{ src: '/icons/shortcut-history.png', sizes: '96x96' }]
          }
        ],
        categories: ['entertainment', 'productivity', 'multimedia', 'lifestyle'],
        screenshots: [
          {
            src: '/screenshots/mobile-home.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/screenshots/desktop-home.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "./server"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
});
EOF

# 創建 PWA 更新提示組件
echo "🔄 創建 PWA 更新組件..."
mkdir -p client/src/components/pwa

cat > client/src/components/pwa/PWAUpdatePrompt.tsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, RefreshCw } from 'lucide-react';

export function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      console.log('🔧 Service Worker 已註冊:', r);
    },
    onRegisterError(error) {
      console.error('❌ Service Worker 註冊失敗:', error);
    }
  });

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleClose = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt && !offlineReady) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {needRefresh ? (
                <RefreshCw className="h-6 w-6 text-blue-200" />
              ) : (
                <Download className="h-6 w-6 text-green-200" />
              )}
              <div>
                <h3 className="font-semibold text-sm">
                  {needRefresh ? '發現新版本' : '已可離線使用'}
                </h3>
                <p className="text-xs opacity-90">
                  {needRefresh 
                    ? '點擊更新以獲得最新功能和修復' 
                    : 'VEO3 現在可以離線使用了'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {needRefresh && (
                <Button
                  onClick={handleUpdate}
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  更新
                </Button>
              )}
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
EOF

# 創建安裝提示組件
cat > client/src/components/pwa/InstallPrompt.tsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // 延遲顯示安裝提示，讓用戶先體驗應用
      setTimeout(() => {
        if (!window.matchMedia('(display-mode: standalone)').matches) {
          setShowPrompt(true);
        }
      }, 30000); // 30秒後顯示
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✅ 用戶接受安裝');
    } else {
      console.log('❌ 用戶拒絕安裝');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // 24小時後再次顯示
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <Card className="border-green-500/20 bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-6 w-6 text-green-200" />
              <div>
                <h3 className="font-semibold text-sm">安裝 VEO3 應用</h3>
                <p className="text-xs opacity-90">
                  添加到主畫面，享受原生應用體驗
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleInstall}
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30"
              >
                <Download className="h-3 w-3 mr-1" />
                安裝
              </Button>
              <button
                onClick={handleDismiss}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
EOF

# 創建手機優化樣式
echo "📱 創建手機優化樣式..."
cat > client/src/styles/mobile.css << 'EOF'
/* 手機 PWA 優化樣式 */

/* 觸控優化 */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

button, input, textarea, select {
  -webkit-touch-callout: default;
}

/* 改善觸控目標大小 */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* iOS Safari 優化 */
@supports (-webkit-touch-callout: none) {
  .ios-inset-area {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}

/* 防止縮放 */
@viewport {
  width: device-width;
  initial-scale: 1;
  maximum-scale: 1;
  user-scalable: no;
}

/* 手機專用隱藏元素 */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  
  /* 改善手機上的按鈕間距 */
  .mobile-button-group button {
    margin: 4px;
    min-height: 48px;
  }
  
  /* 手機上的表單元素 */
  .mobile-form input,
  .mobile-form textarea,
  .mobile-form select {
    font-size: 16px; /* 防止 iOS 縮放 */
    min-height: 48px;
  }
}

/* 桌面專用隱藏元素 */
@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}

/* PWA 狀態列適配 */
@media (display-mode: standalone) {
  body {
    padding-top: env(safe-area-inset-top);
  }
  
  .pwa-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: calc(60px + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 50;
  }
  
  .pwa-content {
    margin-top: calc(60px + env(safe-area-inset-top));
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
  }
}

/* 離線狀態樣式 */
.offline-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #f59e0b;
  color: white;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  z-index: 100;
}

/* 載入動畫優化 */
.mobile-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 20px;
}

.mobile-loading .spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 手機上的模態框優化 */
@media (max-width: 768px) {
  .mobile-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    border-radius: 0;
    max-width: 100%;
    max-height: 100%;
  }
  
  .mobile-modal-content {
    height: 100%;
    overflow-y: auto;
    padding: env(safe-area-inset-top) 16px env(safe-area-inset-bottom) 16px;
  }
}

/* 虛擬鍵盤適配 */
@media (max-width: 768px) {
  .keyboard-adaptive {
    transition: transform 0.3s ease;
  }
  
  .keyboard-adaptive.keyboard-open {
    transform: translateY(-50px);
  }
}
EOF

# 更新主入口文件
echo "🔄 更新主入口文件..."
if [ -f "client/src/main.tsx" ]; then
    # 在 main.tsx 中添加 PWA 組件和樣式
    sed -i.backup '1i\
import "./styles/mobile.css";
' client/src/main.tsx
fi

# 創建簡單的圖標生成腳本
echo "🎨 創建圖標生成提示..."
cat > generate-pwa-icons.md << 'EOF'
# PWA 圖標生成指南

## 需要的圖標尺寸

請準備一個 1024x1024 的高質量 VEO3 標誌圖片，然後使用以下工具生成所需尺寸：

### 在線工具（推薦）
- https://realfavicongenerator.net/ 
- https://www.pwabuilder.com/imageGenerator

### 本地工具
```bash
# 使用 ImageMagick 生成不同尺寸
convert logo-1024.png -resize 64x64 public/icons/pwa-64x64.png
convert logo-1024.png -resize 192x192 public/icons/pwa-192x192.png
convert logo-1024.png -resize 512x512 public/icons/pwa-512x512.png
convert logo-1024.png -resize 180x180 public/apple-touch-icon.png
convert logo-1024.png -resize 96x96 public/icons/shortcut-fast.png
convert logo-1024.png -resize 96x96 public/icons/shortcut-quality.png
convert logo-1024.png -resize 96x96 public/icons/shortcut-history.png

# 生成 maskable 圖標（添加安全區域）
convert logo-1024.png -background transparent -gravity center -extent 1280x1280 temp-padded.png
convert temp-padded.png -resize 512x512 public/icons/maskable-icon-512x512.png
rm temp-padded.png
```

### 需要的文件列表
```
public/
├── icons/
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── maskable-icon-512x512.png
│   ├── shortcut-fast.png
│   ├── shortcut-quality.png
│   └── shortcut-history.png
├── apple-touch-icon.png
├── favicon.ico
└── masked-icon.svg
```

## 測試圖標
生成圖標後，使用 Chrome DevTools 的 Application 標籤檢查 PWA manifest 是否正確載入。
EOF

echo ""
echo "🎉 PWA 配置完成！"
echo "==================="
echo ""
echo "📋 後續步驟："
echo "1. 根據 'generate-pwa-icons.md' 生成 PWA 圖標"
echo "2. 運行 'pnpm dev' 測試 PWA 功能"
echo "3. 運行 'pnpm build' 構建生產版本"
echo "4. 使用 Chrome DevTools 測試 PWA 安裝"
echo ""
echo "🔧 新增功能："
echo "✅ 自動更新提示"
echo "✅ 應用安裝提示"
echo "✅ 離線支持"
echo "✅ 手機優化樣式"
echo "✅ 原生應用快捷方式"
echo ""
echo "📱 測試方法："
echo "1. 在 Chrome 中開啟開發者工具"
echo "2. 進入 Application > Manifest 檢查配置"
echo "3. 測試 'Add to Home Screen' 功能"
echo "4. 測試離線功能（Network > Offline）"
echo ""
echo "🚀 部署到生產環境後，用戶可以："
echo "• 將應用添加到手機主畫面"
echo "• 像原生應用一樣使用"
echo "• 享受離線功能"
echo "• 獲得自動更新"

chmod +x generate-pwa-icons.md