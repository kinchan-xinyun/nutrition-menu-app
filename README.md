# 栄養メニュー選択アプリ

Firebase と React を使用した栄養メニュー選択・管理アプリケーションです。

## 🌐 デモ

GitHub Pagesでデプロイ：
```
https://<あなたのGitHubユーザー名>.github.io/nutrition-menu-app/
```

デプロイ方法は [`QUICKSTART_DEPLOY.md`](./QUICKSTART_DEPLOY.md) を参照してください。

## ✨ 主な機能

- 📊 リアルタイム栄養計算（カロリー、タンパク質、脂質、炭水化物）
- 🎨 PFCバランスの視覚的表示
- 🍽️ カテゴリー別メニュー表示
- ✅ 選択したメニューの管理
- 🔥 Firebase Firestore によるデータ管理
- 💾 LocalStorage による選択状態の保存

## ディレクトリ構造

```
nutrition-menu-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # ヘッダーコンポーネント
│   │   ├── CategoryNavigation.jsx     # カテゴリーナビゲーション
│   │   ├── NutritionInfo.jsx          # 栄養情報表示
│   │   ├── DishCard.jsx               # 料理カードコンポーネント
│   │   ├── CategorySection.jsx        # カテゴリーセクション
│   │   ├── AddDishModal.jsx           # 料理追加モーダル
│   │   └── MenuOverlay.jsx            # メニューオーバーレイ
│   │
│   ├── hooks/
│   │   ├── useFirestore.js            # Firestore操作フック
│   │   ├── useNutritionCalculation.js # 栄養計算フック
│   │   └── useLocalStorage.js         # LocalStorage管理フック
│   │
│   ├── firebase/
│   │   ├── config.js                  # Firebase初期化設定
│   │   └── firebaseService.js         # Firestore操作関数
│   │
│   ├── constants/
│   │   ├── categoryNames.js           # カテゴリー名マッピング
│   │   └── categoryOrder.js           # カテゴリー表示順序
│   │
│   ├── utils/
│   │   └── sanitizeFilename.js        # ファイル名サニタイズ関数
│   │
│   ├── App.jsx                        # メインアプリケーション
│   └── index.js                       # エントリーポイント
│
├── .env.example                       # 環境変数テンプレート
├── package.json
└── README.md
```

## 各ファイルの役割

### Components (src/components/)

- **Header.jsx**: アプリのヘッダー部分
- **CategoryNavigation.jsx**: カテゴリー別ナビゲーション
- **NutritionInfo.jsx**: 栄養情報の表示（PFCバランス含む）
- **DishCard.jsx**: 個別の料理カード
- **CategorySection.jsx**: カテゴリーごとのセクション
- **AddDishModal.jsx**: 料理追加用モーダルダイアログ
- **MenuOverlay.jsx**: サイドメニュー

### Hooks (src/hooks/)

- **useFirestore.js**: Firestoreデータの読み込み・追加・更新
- **useNutritionCalculation.js**: 栄養情報の計算（PFC、カロリー）
- **useLocalStorage.js**: LocalStorageでの選択状態の永続化

### Firebase (src/firebase/)

- **config.js**: Firebase初期化（環境変数から設定）
- **firebaseService.js**: Firestoreのデータベース操作

### Constants (src/constants/)

- **categoryNames.js**: カテゴリー名の日本語↔英語マッピング
- **categoryOrder.js**: カテゴリーの表示順序

### Utils (src/utils/)

- **sanitizeFilename.js**: ファイル名のサニタイズ関数

## 環境変数の設定

`.env`ファイルに以下を設定してください：

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Firestoreの構造

```
foods (collection)
├── doc1
│   ├── category: string (例: "主食")
│   ├── dish: string (料理名)
│   ├── protein: number (g)
│   ├── fat: number (g)
│   ├── carbs: number (g)
│   ├── calories: number (kcal)
│   ├── image: string (Base64またはURL)
│   └── status: string ("販売中" | "販売中止")
```

## インストールと実行

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm start

# ビルド
npm run build
```

## 主な機能

- ✅ Firestoreからのデータ読み込み
- ✅ 料理の選択・解除
- ✅ 栄養情報（PFC）の自動計算
- ✅ PFCバランスの可視化
- ✅ 新しい料理の追加
- ✅ 販売中止の管理
- ✅ LocalStorageに選択状態を保存
- ✅ レスポンシブデザイン