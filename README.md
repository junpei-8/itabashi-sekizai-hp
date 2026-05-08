# 有限会社板橋石材 公式サイト

宮城県大崎市鹿島台の墓石店「有限会社板橋石材」の公式サイトリメイクです。Astro + Tailwind CSS v4 で構築した静的サイトです。

## 技術構成

- Astro
- TypeScript strict
- Tailwind CSS v4（Vite plugin）
- Google Fonts: Noto Serif JP / Noto Sans JP
- GA4 + Partytown（測定ID設定時のみ有効）
- `@astrojs/sitemap` による sitemap 自動生成

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

## 環境変数

必要な値がある場合だけ `.env` に設定してください。未設定なら該当機能は出力されません。

| 変数名 | 用途 | 例 |
| --- | --- | --- |
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 を Partytown 経由で読み込む | `G-XXXXXXXXXX` |
| `PUBLIC_CONTACT_FORM_URL` | Googleフォームを `#contact` 下に埋め込む | `https://docs.google.com/forms/d/e/.../viewform?embedded=true` |
| `PUBLIC_GBP_URL` | 構造化データの `sameAs` に Google ビジネスプロフィールURLを追加 | `https://www.google.com/search?...` |

## ページ構成

- `/` 公式サイト本体
  - `#greeting` ごあいさつ
  - `#consult` お墓のご相談
  - `#services` 業務案内
  - `#gravestones` 墓石の種類・取扱品
  - `#faq` よくある質問
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
  og-image.svg OGP画像の元データ
  og-image.png SNS向けOGP画像
  robots.txt   robots設定
```

`sitemap-index.xml` と `sitemap-0.xml` はビルド時に `dist/` へ自動生成されます。

## デプロイ候補

Cloudflare Pages、Netlify、Vercel などの静的ホスティングに対応しています。

## 公開後にやること

1. GA4 プロパティを作成し、測定IDを `PUBLIC_GA_MEASUREMENT_ID` に設定
2. Googleフォームを作成し、埋め込みURLを `PUBLIC_CONTACT_FORM_URL` に設定
3. Google ビジネスプロフィールを登録・オーナー確認し、URLを `PUBLIC_GBP_URL` に設定
4. Google Search Console に登録し、`https://www.itabashisekizai.com/sitemap-index.xml` を送信
5. Bing Webmaster Tools にも登録
6. 実際の施工写真・店舗写真が揃ったら差し替え
