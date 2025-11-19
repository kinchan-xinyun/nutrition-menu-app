# GitHub Pages デプロイ手順

このドキュメントは、nutrition-menu-appをGitHub Pagesにデプロイする方法を説明します。

## 前提条件

- Node.js と npm がインストールされていること
- GitHubアカウントがあること
- リポジトリがGitHubにプッシュされていること

## デプロイ手順

### 1. Node.js と npm のインストール（まだの場合）

#### macOSの場合：

**方法A: 公式インストーラー**
1. https://nodejs.org/ にアクセス
2. LTS版（推奨版）をダウンロード
3. インストーラーを実行
4. ターミナルを再起動

**方法B: Homebrew**
```bash
brew install node
```

インストール確認：
```bash
node --version
npm --version
```

### 2. package.jsonのhomepageを更新

`package.json`の6行目を編集：

```json
"homepage": "https://<あなたのGitHubユーザー名>.github.io/nutrition-menu-app",
```

**例：** GitHubユーザー名が`tanaka123`の場合
```json
"homepage": "https://tanaka123.github.io/nutrition-menu-app",
```

### 3. 依存パッケージをインストール

プロジェクトフォルダで以下を実行：

```bash
cd /Users/xinyun/Documents/GitHub/nutrition-menu-app
npm install
npm install --save-dev gh-pages
```

### 4. GitHubにコミット&プッシュ

変更をGitHubにプッシュ：

```bash
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

### 5. デプロイ実行

```bash
npm run deploy
```

このコマンドは以下を自動で実行します：
1. `npm run build` - プロダクション用にビルド
2. `gh-pages -d dist` - `dist`フォルダをgh-pagesブランチにデプロイ

### 6. GitHub Pagesを有効化

1. GitHubのリポジトリページを開く
2. **Settings** → **Pages** に移動
3. **Source** で `gh-pages` ブランチを選択
4. **Save** をクリック

### 7. 公開URLを確認

約1〜2分後、以下のURLでアクセス可能になります：

```
https://<あなたのGitHubユーザー名>.github.io/nutrition-menu-app/
```

## トラブルシューティング

### 404エラーが出る場合

1. GitHub Settings → Pages で正しいブランチ（gh-pages）が選択されているか確認
2. `vite.config.js`の`base`がリポジトリ名と一致しているか確認
3. 数分待ってから再度アクセス

### スタイルが崩れる場合

- `vite.config.js`の`base: '/nutrition-menu-app/'`が正しく設定されているか確認
- 画像パスが相対パスになっているか確認

### Firebase接続エラーが出る場合

- Firebase Security Rulesが設定されているか確認
- Firebaseの設定が正しいか確認

## 更新する場合

コードを変更した後、再度デプロイするには：

```bash
git add .
git commit -m "Update app"
git push origin main
npm run deploy
```

## 注意事項

- Firebase設定ファイル（APIキー含む）は公開されますが、Firebase Security Rulesで保護してください
- 本番環境では、適切なセキュリティ設定を行ってください
- サービスアカウントキー（`*-firebase-adminsdk-*.json`）は`.gitignore`で除外されているため、プッシュされません

## 参考リンク

- [GitHub Pages 公式ドキュメント](https://docs.github.com/ja/pages)
- [Vite デプロイガイド](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Firebase セキュリティルール](https://firebase.google.com/docs/rules)

