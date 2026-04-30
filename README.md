# 有限会社板橋石材 公式サイト

宮城県大崎市鹿島台の墓石店「有限会社板橋石材」の公式サイトリメイクです。Astro + Tailwind CSS v4 で構築した静的サイトです。

## 技術構成

- Astro
- TypeScript strict
- Tailwind CSS v4（Vite plugin）
- Google Fonts: Noto Serif JP / Noto Sans JP

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## ページ構成

- `/` 公式サイト本体
  - `#greeting` ごあいさつ
  - `#consult` お墓のご相談
  - `#services` 業務案内
  - `#gravestones` 墓石の種類・取扱品
  - `#company` 会社案内
  - `#contact` お問い合わせ

お知らせ・ブログを追加する場合のみ、別ページまたはContent Collectionsで分離する想定です。

## ディレクトリ

```text
src/
  components/  共通コンポーネント
  layouts/     共通レイアウト
  pages/       ページ
  styles/      グローバルCSS
public/
  images/      元サイト由来の画像
  favicon.svg  favicon
  og-image.svg OGP画像
  robots.txt   robots設定
  sitemap.xml  sitemap
```

## デプロイ候補

Cloudflare Pages、Netlify、Vercel などの静的ホスティングに対応しています。

## 今後の差し替え候補

- 実際の施工写真・店舗写真への差し替え
- お問い合わせフォームの追加
- お知らせ・ブログ機能の追加
