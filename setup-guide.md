# VEO3 視頻生成系統 - 完整部署指南

## 🎯 專案概述

VEO3 是一個功能強大的 AI 視頻生成系統，支援：
- 多種視頻生成模型（Veo, Kling, Runway）
- AI 智能配音系統（支援粵語、普通話、英文）
- 多角色管理與自動匹配
- 視覺風格選擇器
- 批量生成與視頻合併
- 完整的用戶認證系統

## 📋 系統要求

### 基本要求
- **Node.js**: 版本 18+ (推薦 v20)
- **pnpm**: 版本 8.0+
- **MySQL**: 版本 8.0+
- **系統記憶體**: 至少 8GB RAM
- **磁盤空間**: 至少 5GB

### API 服務需求
- OpenAI API Key (GPT-4/5)
- Claude API Key 
- VectorEngine API Key
- KreadoAI API Key
- AWS S3 存儲配置

## 🚀 快速部署步驟

### 1. 環境準備

#### 安裝 Node.js
```bash
# Windows - 使用 Chocolatey
choco install nodejs

# macOS - 使用 Homebrew
brew install node

# Linux - 使用 NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 安裝 pnpm
```bash
npm install -g pnpm
```

#### 安裝 MySQL
```bash
# Windows - 下載 MySQL Installer
# https://dev.mysql.com/downloads/mysql/

# macOS
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. 資料庫設置

```bash
# 連接到 MySQL
mysql -u root -p

# 創建資料庫
CREATE DATABASE veo3_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 創建用戶（可選）
CREATE USER 'veo3_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON veo3_db.* TO 'veo3_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. 專案配置

```bash
# 解壓專案
cd veo3-source

# 安裝依賴
pnpm install

# 創建環境配置
cp .env .env.local
```

#### 編輯 `.env.local` 配置
```env
# 基本配置
NODE_ENV=development
PORT=3000
VITE_APP_ID=veo3-web
JWT_SECRET=your-super-secure-jwt-secret-key

# 資料庫配置
DATABASE_URL=mysql://veo3_user:your_password@localhost:3306/veo3_db

# API URLs
VITE_API_URL=http://localhost:5173
VITE_API_BASE=http://localhost:3000

# 認證配置
OAUTH_SERVER_URL=http://localhost:3000
OWNER_OPEN_ID=your-admin-user-id

# AI 服務 API Keys
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-claude-key
VECTOR_ENGINE_API_KEY=your-vector-engine-key
KREADO_API_KEY=your-kreado-key

# AWS S3 配置 (用於文件存儲)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

### 4. 初始化資料庫

```bash
# 運行資料庫遷移
pnpm db:push
```

### 5. 啟動服務

```bash
# 開發模式 (同時啟動前端和後端)
pnpm dev

# 或分別啟動
pnpm dev:server  # 後端 (port 3000)
pnpm dev:client  # 前端 (port 5173)
```

### 6. 訪問應用

- **前端界面**: http://localhost:5173
- **後端API**: http://localhost:3000
- **API文檔**: http://localhost:3000/api/docs (如果有的話)

## 📱 手機版本部署

### 方案 1: PWA (漸進式網頁應用)
現有的 VEO3 已經是響應式設計，可以直接作為 PWA 使用：

1. **安裝 PWA 插件**
```bash
pnpm add vite-plugin-pwa workbox-window
```

2. **配置 PWA** (修改 `vite.config.ts`)
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'VEO3 視頻生成器',
        short_name: 'VEO3',
        description: 'AI 視頻生成應用',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

### 方案 2: React Native Expo 版本
將現有代碼移植到 React Native：

```bash
# 創建 Expo 專案
npx create-expo-app veo3-mobile --template

# 安裝相關依賴
cd veo3-mobile
npm install @expo/vector-icons react-native-video react-native-fs
```

### 方案 3: Capacitor 混合應用
將現有網頁封裝成原生應用：

```bash
# 安裝 Capacitor
pnpm add @capacitor/core @capacitor/cli

# 初始化 Capacitor
pnpm cap init

# 添加平台
pnpm cap add ios
pnpm cap add android

# 構建並同步
pnpm build
pnpm cap sync
```

## 🌐 生產環境部署

### Docker 部署
```dockerfile
# 使用提供的 Dockerfile
docker build -t veo3-app .
docker run -p 3000:3000 veo3-app
```

### 雲端部署選項
1. **Vercel** (前端) + **Railway** (後端)
2. **Heroku** (全端)
3. **AWS ECS** 或 **Google Cloud Run**
4. **VPS** 自建

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 常見問題解決

### 依賴安裝問題
```bash
# 清除快取重新安裝
pnpm store prune
rm -rf node_modules
pnpm install
```

### 資料庫連接問題
```bash
# 檢查 MySQL 服務狀態
sudo systemctl status mysql

# 測試連接
mysql -u veo3_user -p veo3_db
```

### 端口衝突
```bash
# 檢查端口使用情況
lsof -i :3000
lsof -i :5173

# 殺死占用進程
kill -9 PID
```

### API Key 問題
1. 確認所有 API Key 都已正確配置
2. 檢查 API 額度是否足夠
3. 驗證 API Key 權限

## 📊 系統監控

### 日誌查看
```bash
# 查看應用日誌
tail -f server.log

# 查看資料庫日誌
sudo tail -f /var/log/mysql/error.log
```

### 性能監控
建議安裝：
- **PM2** (進程管理)
- **New Relic** (APM)
- **Grafana + Prometheus** (監控)

## 🛡️ 安全配置

1. **更改預設密碼**
2. **使用 HTTPS**
3. **設置防火牆規則**
4. **定期更新依賴**
5. **API Key 輪換**

## 📚 額外資源

- [專案文檔](./docs/)
- [變更日誌](./CHANGELOG_v12.4.md)
- [故障排除](./analysis/issues_and_improvements.md)

---

🎉 **部署完成！** 現在您可以開始使用 VEO3 視頻生成系統了！