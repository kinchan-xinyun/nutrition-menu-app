# 🚀 クイックデプロイガイド

## 最短3ステップでWebページ公開！

### ステップ1: package.jsonを編集

`package.json`の6行目を変更：

```json
"homepage": "https://<あなたのGitHubユーザー名>.github.io/nutrition-menu-app",
```

↓

例：ユーザー名が`tanaka123`の場合
```json
"homepage": "https://tanaka123.github.io/nutrition-menu-app",
```

### ステップ2: ターミナルで実行

```bash
# プロジェクトフォルダに移動
cd /Users/xinyun/Documents/GitHub/nutrition-menu-app

# パッケージをインストール
npm install
npm install --save-dev gh-pages

# GitHubにプッシュ
git add .
git commit -m "Add deployment config"
git push origin main

# デプロイ実行！
npm run deploy
```

### ステップ3: GitHub Pagesを有効化

1. https://github.com/<あなたのユーザー名>/nutrition-menu-app にアクセス
2. **Settings** タブをクリック
3. 左メニューから **Pages** を選択
4. **Source** で `gh-pages` ブランチを選択
5. **Save** ボタンをクリック

### 完了！🎉

1〜2分後、以下のURLでアクセス可能：

```
https://<あなたのGitHubユーザー名>.github.io/nutrition-menu-app/
```

---

## 更新する場合

コードを変更したら：

```bash
git add .
git commit -m "Update"
git push origin main
npm run deploy
```

---

## ⚠️ npmが見つからない場合

Node.jsをインストールしてください：

1. https://nodejs.org/ にアクセス
2. LTS版をダウンロード＆インストール
3. ターミナルを再起動
4. `node --version` で確認

---

詳細は `DEPLOY.md` を参照してください。

