# VEO3 手機版本 - 開發指南

## 🎯 手機版本解決方案

基於現有的 VEO3 系統，我們提供三種手機版本方案：

### 1. PWA (漸進式網頁應用) - 推薦 ⭐⭐⭐⭐⭐

這是最快速、最經濟的方案，現有代碼已經是響應式設計。

#### 實施步驟：

```bash
# 安裝 PWA 相關依賴
pnpm add vite-plugin-pwa workbox-window
pnpm add -D @types/serviceworker
```

#### 修改 `vite.config.ts`：
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: null,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'VEO3 視頻生成器',
        short_name: 'VEO3',
        description: '強大的 AI 視頻生成應用',
        theme_color: '#1a1a1a',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon'
          }
        ],
        shortcuts: [
          {
            name: '快速生成',
            short_name: '快速',
            description: '快速生成視頻',
            url: '/?mode=fast',
            icons: [{ src: '/shortcut-fast.png', sizes: '96x96' }]
          },
          {
            name: '高質量生成',
            short_name: '高質量',
            description: '高質量視頻生成',
            url: '/?mode=quality',
            icons: [{ src: '/shortcut-quality.png', sizes: '96x96' }]
          }
        ],
        categories: ['entertainment', 'productivity', 'multimedia']
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  // ... 其他配置
})
```

#### 創建 PWA 圖標：
```bash
# 創建圖標目錄
mkdir -p public/icons

# 您需要準備以下尺寸的圖標：
# - pwa-192x192.png
# - pwa-512x512.png  
# - apple-touch-icon.png (180x180)
# - favicon.ico
```

#### 添加 PWA 更新提示組件：
```typescript
// src/components/PWAUpdatePrompt.tsx
import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    }
  });

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true);
    }
  }, [needRefresh]);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">更新可用</h3>
          <p className="text-sm">發現新版本，點擊更新以獲得最新功能</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => updateServiceWorker(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium"
          >
            更新
          </button>
          <button
            onClick={close}
            className="text-white opacity-75 hover:opacity-100 px-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Capacitor 混合應用 - 原生體驗 ⭐⭐⭐⭐

將現有網頁包裝為原生 iOS/Android 應用。

#### 安裝和配置：
```bash
# 安裝 Capacitor
pnpm add @capacitor/core @capacitor/cli
pnpm add @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar

# 初始化 Capacitor
npx cap init veo3-mobile com.veo3.app --web-dir=dist

# 添加平台
npx cap add ios
npx cap add android

# 添加相機和文件系統插件（用於上傳功能）
pnpm add @capacitor/camera @capacitor/filesystem
```

#### 創建 Capacitor 配置 `capacitor.config.ts`：
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.veo3.app',
  appName: 'VEO3',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#000000'
    },
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
```

#### 構建和運行：
```bash
# 構建網頁版本
pnpm build

# 同步到原生平台
npx cap sync

# 在 iOS 上運行（需要 macOS 和 Xcode）
npx cap run ios

# 在 Android 上運行（需要 Android Studio）
npx cap run android
```

### 3. React Native Expo 版本 - 完全原生 ⭐⭐⭐

完全重寫為 React Native 應用，獲得最佳原生性能。

#### 創建新專案：
```bash
# 創建 Expo 專案
npx create-expo-app veo3-mobile --template blank-typescript

cd veo3-mobile

# 安裝核心依賴
npx expo install expo-av expo-image-picker expo-file-system
npx expo install react-native-svg react-native-reanimated
npx expo install @expo/vector-icons expo-linear-gradient
```

#### 主要組件移植示例：
```typescript
// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/screens/HomeScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#333',
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: '生成' }}
        />
        <Tab.Screen 
          name="History" 
          component={HistoryScreen}
          options={{ title: '歷史' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

## 🚀 自動化構建腳本

創建一個自動化腳本來構建所有版本：

```bash
#!/bin/bash
# build-mobile.sh

echo "🏗️  構建 VEO3 手機版本..."

# 構建 Web 版本（PWA）
echo "📱 構建 PWA 版本..."
pnpm build

# 如果安裝了 Capacitor
if command -v cap &> /dev/null; then
    echo "📦 構建 Capacitor 版本..."
    npx cap sync
    
    # 構建 Android
    if [ -d "android" ]; then
        echo "🤖 構建 Android 版本..."
        npx cap build android
    fi
    
    # 構建 iOS（僅在 macOS 上）
    if [[ "$OSTYPE" == "darwin"* ]] && [ -d "ios" ]; then
        echo "🍎 構建 iOS 版本..."
        npx cap build ios
    fi
fi

echo "✅ 所有版本構建完成！"
echo "📱 PWA: 可在任何現代瀏覽器中使用"
echo "🤖 Android: android/app/build/outputs/apk/"
echo "🍎 iOS: 需要在 Xcode 中打開並構建"
```

## 📱 手機優化功能

### 觸控優化
```css
/* 添加到全局 CSS */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

button, input, textarea {
  -webkit-user-select: text;
  user-select: text;
}

/* 改善觸控目標大小 */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

### 手機專用功能
1. **手勢支持**：添加滑動、捏合等手勢
2. **相機集成**：直接使用手機相機拍照上傳
3. **本地存儲**：離線使用和緩存
4. **推送通知**：生成完成通知
5. **分享功能**：直接分享到社交媒體

### 性能優化
1. **懶載入**：按需載入組件和資源
2. **圖片壓縮**：自動壓縮上傳的圖片
3. **離線支持**：緩存關鍵資源
4. **電池優化**：減少後台處理

## 🎯 推薦部署策略

### 階段 1：快速上線 (PWA)
- ✅ 成本低，開發快
- ✅ 跨平台兼容
- ✅ 自動更新
- ❌ 原生功能有限

### 階段 2：增強體驗 (Capacitor)
- ✅ 原生功能增強
- ✅ 應用商店發布
- ✅ 離線能力更強
- ❌ 需要原生開發知識

### 階段 3：完美體驗 (React Native)
- ✅ 最佳性能
- ✅ 完整原生功能
- ✅ 平台特定優化
- ❌ 開發成本高

---

選擇最適合您的方案開始手機版本開發吧！ 🚀