#!/bin/bash

# VEO3 視頻生成系統 - 自動安裝腳本
# 支援 Linux、macOS 和 Windows (WSL)

set -e

echo "🚀 VEO3 視頻生成系統 - 自動安裝腳本"
echo "=================================="

# 檢測操作系統
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
    echo "✅ 檢測到 Linux 系統"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
    echo "✅ 檢測到 macOS 系統"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    OS="windows"
    echo "✅ 檢測到 Windows 系統"
else
    echo "❌ 不支援的操作系統: $OSTYPE"
    exit 1
fi

# 檢查並安裝 Node.js
check_nodejs() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)
        if [ "$MAJOR_VERSION" -ge "18" ]; then
            echo "✅ Node.js 版本: v$NODE_VERSION (符合要求)"
            return 0
        else
            echo "⚠️  Node.js 版本過低: v$NODE_VERSION (需要 v18+)"
        fi
    else
        echo "❌ 未安裝 Node.js"
    fi
    
    echo "🔧 正在安裝 Node.js..."
    
    if [ "$OS" = "linux" ]; then
        # 使用 NodeSource 倉庫安裝最新 LTS
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [ "$OS" = "macos" ]; then
        # 使用 Homebrew
        if command -v brew &> /dev/null; then
            brew install node
        else
            echo "❌ 請先安裝 Homebrew: https://brew.sh/"
            exit 1
        fi
    elif [ "$OS" = "windows" ]; then
        echo "❌ Windows 用戶請手動下載安裝 Node.js: https://nodejs.org/"
        exit 1
    fi
    
    echo "✅ Node.js 安裝完成"
}

# 檢查並安裝 pnpm
check_pnpm() {
    if command -v pnpm &> /dev/null; then
        PNPM_VERSION=$(pnpm --version)
        echo "✅ pnpm 版本: v$PNPM_VERSION"
        return 0
    fi
    
    echo "🔧 正在安裝 pnpm..."
    npm install -g pnpm
    echo "✅ pnpm 安裝完成"
}

# 檢查並安裝 MySQL
check_mysql() {
    if command -v mysql &> /dev/null; then
        MYSQL_VERSION=$(mysql --version | awk '{print $5}' | cut -d',' -f1)
        echo "✅ MySQL 版本: $MYSQL_VERSION"
        return 0
    fi
    
    echo "🔧 正在安裝 MySQL..."
    
    if [ "$OS" = "linux" ]; then
        sudo apt update
        sudo apt install -y mysql-server
        sudo systemctl start mysql
        sudo systemctl enable mysql
    elif [ "$OS" = "macos" ]; then
        brew install mysql
        brew services start mysql
    fi
    
    echo "✅ MySQL 安裝完成"
    echo "⚠️  請記得設置 MySQL root 密碼: sudo mysql_secure_installation"
}

# 配置專案
setup_project() {
    echo "🔧 正在配置專案..."
    
    # 安裝依賴
    echo "📦 安裝專案依賴..."
    pnpm install
    
    # 創建環境配置
    if [ ! -f ".env.local" ]; then
        echo "📝 創建環境配置檔案..."
        cp .env .env.local
        
        # 生成隨機 JWT Secret
        JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || head /dev/urandom | tr -dc A-Za-z0-9 | head -c 64)
        
        # 更新配置檔案
        cat >> .env.local << EOF

# 本地開發配置
NODE_ENV=development
PORT=3000
VITE_APP_ID=veo3-web
JWT_SECRET=$JWT_SECRET

# 資料庫配置
DATABASE_URL=mysql://root@localhost:3306/veo3_db

# API URLs
VITE_API_URL=http://localhost:5173
VITE_API_BASE=http://localhost:3000

# 認證配置
OAUTH_SERVER_URL=http://localhost:3000
OWNER_OPEN_ID=admin

# ⚠️ 請在下方添加您的 API Keys
# OPENAI_API_KEY=sk-your-openai-key
# ANTHROPIC_API_KEY=sk-ant-your-claude-key
# VECTOR_ENGINE_API_KEY=your-vector-engine-key
# KREADO_API_KEY=your-kreado-key

# AWS S3 配置 (可選)
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_REGION=us-east-1
# AWS_S3_BUCKET=your-s3-bucket-name
EOF
        
        echo "✅ 環境配置檔案已創建: .env.local"
        echo "⚠️  請編輯 .env.local 添加您的 API Keys"
    else
        echo "✅ 環境配置檔案已存在"
    fi
}

# 設置資料庫
setup_database() {
    echo "🗄️  正在設置資料庫..."
    
    # 檢查 MySQL 是否運行
    if ! systemctl is-active --quiet mysql 2>/dev/null && ! brew services list | grep mysql | grep started &>/dev/null; then
        echo "❌ MySQL 服務未運行，請啟動 MySQL 服務"
        if [ "$OS" = "linux" ]; then
            sudo systemctl start mysql
        elif [ "$OS" = "macos" ]; then
            brew services start mysql
        fi
    fi
    
    echo "📊 創建資料庫 'veo3_db'..."
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS veo3_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || {
        echo "⚠️  資料庫創建失敗，請手動執行:"
        echo "   mysql -u root -p"
        echo "   CREATE DATABASE veo3_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    }
    
    # 運行資料庫遷移
    echo "🔄 運行資料庫遷移..."
    pnpm db:push || echo "⚠️  資料庫遷移可能失敗，請檢查配置"
    
    echo "✅ 資料庫設置完成"
}

# 創建啟動腳本
create_scripts() {
    echo "📝 創建便捷啟動腳本..."
    
    # 創建開發啟動腳本
    cat > start-dev.sh << 'EOF'
#!/bin/bash
echo "🚀 啟動 VEO3 開發環境..."
echo "前端: http://localhost:5173"
echo "後端: http://localhost:3000"
echo "按 Ctrl+C 停止服務"
echo ""
pnpm dev
EOF
    chmod +x start-dev.sh
    
    # 創建生產啟動腳本
    cat > start-prod.sh << 'EOF'
#!/bin/bash
echo "🏭 構建並啟動 VEO3 生產環境..."
pnpm build
echo "✅ 構建完成，啟動服務..."
echo "訪問: http://localhost:3000"
echo "按 Ctrl+C 停止服務"
pnpm start
EOF
    chmod +x start-prod.sh
    
    echo "✅ 啟動腳本已創建"
    echo "   開發模式: ./start-dev.sh"
    echo "   生產模式: ./start-prod.sh"
}

# 主安裝流程
main() {
    echo ""
    echo "開始檢查系統環境..."
    
    check_nodejs
    check_pnpm
    check_mysql
    
    echo ""
    echo "開始配置專案..."
    
    setup_project
    setup_database
    create_scripts
    
    echo ""
    echo "🎉 安裝完成！"
    echo "=================================="
    echo ""
    echo "📋 後續步驟:"
    echo "1. 編輯 .env.local 添加您的 API Keys"
    echo "2. 運行開發模式: ./start-dev.sh"
    echo "3. 在瀏覽器中訪問: http://localhost:5173"
    echo ""
    echo "📚 更多說明請參考: setup-guide.md"
    echo ""
    echo "⚠️  重要提醒:"
    echo "   - 請確保添加所需的 API Keys"
    echo "   - 首次啟動可能需要下載模型檔案"
    echo "   - 確保網絡連接正常"
    echo ""
    echo "🎯 快速啟動:"
    echo "   ./start-dev.sh"
}

# 執行主函式
main "$@"