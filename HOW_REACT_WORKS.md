# Reactファイルの反映フロー

## 📊 全体の流れ

```
1. index.html (エントリーポイント)
   ↓
2. src/index.js (Reactのマウント)
   ↓
3. src/App.jsx (メインコンポーネント)
   ↓
4. 各種コンポーネント (Header, CategorySection, etc.)
```

## 🔄 詳細フロー

### 1️⃣ index.html
```html
<!DOCTYPE html>
<html lang="ja">
<body>
    <div id="root"></div>  <!-- ⭐ ここにReactアプリがマウントされる -->
    <script type="module" src="/src/index.js"></script>
</body>
</html>
```

### 2️⃣ src/index.js (Reactアプリの起動)
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';            // ⭐ App.jsxをインポート
import './styles/App.css';          // ⭐ すべてのCSSを読み込み

// ⭐ id="root"の要素を取得してReactをマウント
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  <!-- ⭐ Appコンポーネントをレンダリング -->
  </React.StrictMode>
);
```

### 3️⃣ src/App.jsx (メインアプリケーション)
```javascript
import { Header } from './components/Header';
import { CategoryNavigation } from './components/CategoryNavigation';
import { NutritionInfo } from './components/NutritionInfo';
// ... その他のコンポーネント

export default function App() {
  // ⭐ Hooksでデータ管理
  const { nutritionData, addDish } = useFirestore();
  const { selectedDishes, setSelectedDishes } = useLocalStorage();
  const { totals, pfcBreakdown } = useNutritionCalculation(...);

  return (
    <div>
      <Header />                    {/* ⭐ ヘッダーコンポーネント */}
      <CategoryNavigation />        {/* ⭐ ナビゲーション */}
      <NutritionInfo />            {/* ⭐ 栄養情報 */}
      <CategorySection />          {/* ⭐ 料理セクション */}
      <AddDishModal />             {/* ⭐ モーダル */}
    </div>
  );
}
```

### 4️⃣ コンポーネントツリー
```
App.jsx
├── MenuOverlay              (サイドメニュー)
├── Header                   (ヘッダー)
├── CategoryNavigation       (カテゴリーナビ)
├── NutritionInfo            (栄養情報表示)
│   └── PFC詳細
├── CategorySection          (カテゴリーごとの料理リスト)
│   └── DishCard × N        (個別の料理カード)
└── AddDishModal            (料理追加モーダル)
```

## 🎨 CSSの読み込みフロー

```
src/index.js
  ↓ import './styles/App.css'
  ↓
src/styles/App.css
  ↓ @import
  ├── global.css              (グローバル設定)
  ├── hamburger-menu.css      (ハンバーガーメニュー)
  ├── header.css              (ヘッダー)
  ├── category-navigation.css (ナビゲーション)
  ├── nutrition-info.css      (栄養情報)
  ├── selected-dishes.css     (選択料理)
  ├── category-section.css    (カテゴリーセクション)
  ├── dish-card.css           (料理カード)
  ├── buttons.css             (ボタン)
  ├── pfc-balance.css         (PFCバランス)
  ├── fixed-pfc-bar.css       (固定PFCバー)
  └── modal.css               (モーダル)
```

## 🔥 データフロー

### Firebaseからデータ取得
```
1. useFirestore() フック
   ↓
2. firebaseService.js の fetchFoodsFromFirestore()
   ↓
3. Firebase Firestore から取得
   ↓
4. nutritionData として状態管理
   ↓
5. App.jsx で各コンポーネントに props として渡す
```

### ユーザー操作のフロー
```
1. DishCard をクリック
   ↓
2. onSelectDish() 実行
   ↓
3. setSelectedDishes() で LocalStorage に保存
   ↓
4. useNutritionCalculation() で栄養計算
   ↓
5. NutritionInfo で表示更新
```

## 🚀 開発サーバーの起動方法

```bash
# 開発サーバー起動
npm run dev

# ブラウザで自動的に開く
# http://localhost:3000
```

### 開発中の挙動
1. ファイルを変更
2. Vite がホットリロード (HMR)
3. ブラウザが自動更新
4. 状態は可能な限り保持される

## 📝 ファイル変更時の反映

### Reactコンポーネント (.jsx)
- **変更すると**: 即座にブラウザに反映（HMR）
- **例**: `Header.jsx` を編集 → ヘッダーだけ再レンダリング

### CSSファイル (.css)
- **変更すると**: ページ全体をリロードせずに反映
- **例**: `header.css` を編集 → スタイルだけ更新

### Hooks (.js)
- **変更すると**: そのフックを使用しているコンポーネントが再レンダリング
- **例**: `useFirestore.js` を編集 → データ取得ロジックが再実行

### Firebase設定 (config.js)
- **変更すると**: ページリロードが必要
- **理由**: 初期化時のみ読み込まれるため

## 🎯 本番ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果
dist/
├── index.html           (最適化されたHTML)
├── assets/
│   ├── index-[hash].js  (バンドルされたJS)
│   └── index-[hash].css (バンドルされたCSS)
└── images/              (画像ファイル)
```

### 本番での動作
1. すべてのReactコンポーネントが1つのJSファイルにバンドル
2. すべてのCSSが1つのファイルにまとめられる
3. コードの最適化・圧縮
4. ファイル名にハッシュ追加（キャッシュ管理）

## 📦 依存関係

```
react                 (UI構築)
  ↓
react-dom            (ブラウザレンダリング)
  ↓
firebase             (データベース・ストレージ)
  ↓
lucide-react         (アイコン)
```

## 🔑 重要ポイント

1. **`<div id="root">`** がReactアプリのマウントポイント
2. **src/index.js** がすべての起点
3. **App.jsx** がメインコンポーネント
4. **Hooks** でデータとロジックを管理
5. **CSS** は `@import` で階層的に読み込み
6. **HMR** で開発中は即座に反映

## 🛠 トラブルシューティング

### 画面が真っ白
→ ブラウザのコンソールでエラー確認
→ `npm run dev` でサーバーが起動しているか確認

### スタイルが反映されない
→ `src/index.js` で `import './styles/App.css'` があるか確認
→ ブラウザをリロード (Ctrl + Shift + R)

### データが取得できない
→ Firebase設定が正しいか確認
→ Firestoreに `foods` コレクションが存在するか確認

### コンポーネントが表示されない
→ `import` パスが正しいか確認
→ エクスポート方法 (`export default` vs `export`) を確認

