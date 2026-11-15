# 架構說明

## 技術堆疊

| 項目       | 選擇                                                               |
| ---------- | ------------------------------------------------------------------ |
| 框架       | Next.js 16（App Router，全站靜態產生 SSG）                         |
| 語言       | TypeScript 6（`strict`、`noUncheckedIndexedAccess`）               |
| 樣式       | Tailwind CSS 4（設計代幣定義於 `src/app/globals.css` 的 `@theme`） |
| 視覺化     | SVG／Canvas（不引入圖表函式庫）                                    |
| 單元測試   | Vitest 5 + Testing Library（jsdom）                                |
| 端對端測試 | Playwright（桌面 Chrome 與 Pixel 7）+ axe-core                     |
| 程式品質   | ESLint 9（`eslint-config-next`）、Prettier                         |

TypeScript 目前鎖在 6.0：`typescript-eslint` 尚未支援 7.x。

## 路由

| 路徑                               | 說明                                         | 狀態   |
| ---------------------------------- | -------------------------------------------- | ------ |
| `/`                                | 首頁：依模式變化的主視覺、六大模組、學習方式 | 完成   |
| `/modules`                         | 模組目錄                                     | 完成   |
| `/modules/[moduleId]`              | 模組頁：核心提問、目標、實驗清單、教師重點   | 完成   |
| `/modules/[moduleId]/labs/[labId]` | 實驗頁（共用模板 `LabShell`）                | 完成   |
| `/progress`                        | 我的學習進度總覽                             | 規劃中 |
| `/teachers`                        | 教師資源彙整（課程對應、列印用學習單）       | 規劃中 |
| `/about`                           | 關於本站、隱私說明、教學模型聲明             | 規劃中 |

動態路由皆設 `dynamicParams = false`：未登錄的模組或尚未開放的實驗一律回傳 404。

## 目錄結構

```
src/
  app/                  路由（Server Component 為主）
  content/              教學內容（純資料，不含 React）
    types.ts            資料模型
    modules.ts          六大模組
    labs/<lab-id>.ts    各實驗的教學內容
    index.ts            登錄與查詢函式
  labs/                 互動程式
    registry.tsx        labKey → 互動元件（動態載入）
    <lab-id>/model.ts   教學模型或卡片資料（純函式，可單元測試）
    <lab-id>/*.tsx      互動介面（Client Component）
    shared/pet-data.ts  機器學習實驗共用的貓狗模擬資料與評估
    shared/story-corpus.ts  生成式 AI 實驗共用的 14 個範例句子與接龍模型
  components/
    layout/             頁首、頁尾、模式切換、麵包屑
    modules/            模組卡片、圖示、進度
    lab/                實驗模板與其組成元件（含共用的 CategorySorter、RoundNav）
    viz/                視覺化元件（ClassifierPlot、AccuracyBar、ProbabilityBars、UnitChart）
    home/               首頁專用元件
    ui/                 通用元件與共用樣式
  lib/
    storage/local-store.ts   localStorage 外部狀態庫
    mode.ts                  學生／教師模式、投影模式
    progress.ts              進度資料模型（純函式）
    progress-store.ts        進度的本機儲存（僅 Client）
    sorting.ts               卡片分類遊戲的純邏輯
    ml/knn.ts、ml/random.ts  k 最近鄰分類、可重現亂數
    ml/bigram.ts             二元語言模型（文字接龍）與隨機程度
    viz/scale.ts             線性比例尺
e2e/                    Playwright 測試
```

## 核心設計

### 內容與互動分離

- `src/content`：只有文字與資料，教師或內容編輯者可修改而不需碰互動程式。
- `src/labs/<id>/model.ts`：教學模型的純邏輯，無 UI、可測試。
- `src/labs/<id>/*.tsx`：只負責呈現與操作。
- `LabShell` 把三者組合：內容來自 `content`，互動元件以 `children` 傳入。

### 資料模型（`src/content/types.ts`）

```
LearningModule { id, order, title, tagline, description, bigQuestion,
                 objectives[], teacherFocus[], plannedLabs[] }
LabContent     { moduleId, id, title, summary, durationMinutes, gradeBands[],
                 objectives[], modelNotice（必填）, challenge?, reflections[], teacherGuide }
Challenge      { id, prompt, options[{ id, label, isCorrect, feedback }] }
TeacherGuide   { flow[], discussion[], misconceptions[{ myth, fact }] }
Progress       { version: 1, completedLabs: Record<labKey, ISO 時間> }
```

`labKey` 的格式為 `moduleId/labId`。`modelNotice` 為必填欄位，從型別層級確保每個實驗都標示教學模型。

### 本機狀態

`createLocalStore` 搭配 `useSyncExternalStore`：

- 伺服器端與 hydration 時回傳預設值，之後才讀取 localStorage，不會有 hydration 不一致。
- 讀出的資料一律經 `parse` 驗證；格式錯誤或損毀時退回預設值。
- localStorage 無法使用時退回記憶體，功能照常。
- 鍵名含版本（`ail:mode:v1`、`ail:projection:v1`、`ail:progress:v1`），日後可遷移。

注意：`progress.ts` 是純函式，Server Component 可以匯入；`progress-store.ts`、`mode.ts` 含 React hook，只能由 Client Component 匯入。

### 模式與投影

- `PreferencesSync` 把狀態寫到 `<html data-mode data-projection>`。
- `ModeOnly` 依模式顯示或隱藏內容。
- 投影模式只在教師模式生效；Tailwind 自訂變體 `projection:` 用來放大字級並隱藏備課內容與次要資訊。
- 投影時頁首隱藏，由 `ProjectionBar` 取代：提供實驗段落跳轉、全螢幕（`lib/fullscreen.ts`）與結束投影。

### 共用的互動積木

| 積木                                | 用途                                                    | 使用的實驗                          |
| ----------------------------------- | ------------------------------------------------------- | ----------------------------------- |
| `CategorySorter` + `lib/sorting.ts` | 一次一張卡片，分到 2–3 個類別並即時回饋                 | `ai-or-not`、`ai-family-map`        |
| `ClassifierPlot`                    | Canvas 畫分類區域、SVG 畫座標軸與資料點，可點擊新增資料 | `train-a-classifier`、`biased-data` |
| `AccuracyBar`                       | 「答對幾個／共幾個」長條                                | 同上                                |
| `lib/ml/knn.ts`                     | k 最近鄰分類與評估                                      | 同上                                |

視覺化的約定：

- Canvas 只負責畫「面」（分類區域），以低解析度格點繪製再用 `image-rendering: pixelated` 放大，並設 `aria-hidden`。
- SVG 負責座標軸、資料點與互動，並以 `role="img"` 加上文字摘要。
- 圖表傳達的資訊一定要有對應的文字（例如答對數），且提供鍵盤可用的替代操作（例如滑桿加按鈕）。
- 類別同時用形狀與顏色區分。
- 模擬資料一律使用固定種子的亂數（`lib/ml/random.ts`），結果可重現、可測試。

### 安全標頭

`next.config.ts` 對所有路徑送出：

- `Content-Security-Policy`：`default-src 'self'`、`connect-src 'self'`、`frame-ancestors 'self'` 等，瀏覽器層級禁止載入或連線到其他網站。靜態頁面含 Next.js 的行內指令碼，因此 `script-src` 保留 `'unsafe-inline'`；本站沒有把使用者輸入輸出成 HTML 的地方。開發模式另外允許 `'unsafe-eval'` 與 WebSocket。
- `X-Content-Type-Options`、`X-Frame-Options: SAMEORIGIN`、`Referrer-Policy`、`Permissions-Policy`（停用相機、麥克風、定位）。

若要讓網站嵌入學習平台的 iframe，需同時調整 `frame-ancestors` 與 `X-Frame-Options`。以純靜態檔案部署時這些標頭不會送出，見下一節。

### 兩種建置目標

同一份程式碼可以建置成兩種版本，由環境變數 `DEPLOY_TARGET` 決定（`next.config.ts`）：

|                                                | 伺服器版（預設）                           | GitHub Pages 靜態版                                   |
| ---------------------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| 建置                                           | `npm run build`                            | `npm run build:pages`                                 |
| 輸出                                           | `.next/`，以 `next start` 執行             | `out/`，純 HTML／CSS／JS                              |
| 網址                                           | `/modules`                                 | `/modules/`（`trailingSlash`）                        |
| 子路徑                                         | 無                                         | `PAGES_BASE_PATH`（例如 `/ai-lab`），部署流程自動帶入 |
| 內容安全政策                                   | HTTP 標頭                                  | `<meta>` 標籤（`src/app/layout.tsx`）                 |
| 禁止被嵌入 iframe                              | 有（`frame-ancestors`、`X-Frame-Options`） | **無**：這兩項只能用 HTTP 標頭設定                    |
| `X-Content-Type-Options`、`Permissions-Policy` | 有                                         | 無（由 GitHub Pages 決定）                            |
| 完整檢查                                       | `npm run check`                            | `npm run check:pages`                                 |

靜態版的相關檔案：

- `src/lib/csp.ts`：兩種版本共用的 CSP 內容與 `IS_STATIC_EXPORT` 旗標。
- `scripts/serve-static.mjs`：本機預覽與測試用的靜態伺服器，比照 GitHub Pages 的行為（資料夾回傳 `index.html`、找不到時回傳 `404.html`），可用 `--base` 模擬子路徑。
- `public/.nojekyll`：讓 GitHub Pages 不要忽略 `_next` 資料夾。
- `.github/workflows/deploy-pages.yml`：推送到 `github-pages` 分支時，檢查、建置並發布。

注意：`帳號.github.io` 底下所有專案網站共用同一個來源（origin），因此也共用 localStorage。本站的鍵都以 `ail:` 開頭以避免衝突，但同帳號下的其他網站在技術上讀得到這些資料（內容只有模式與實驗完成紀錄）。使用自訂網域可避免這個情況。

## 新增一個實驗的步驟

1. `src/content/labs/<lab-id>.ts`：撰寫 `LabContent`（含 `modelNotice`）。
2. `src/content/index.ts`：加入 `LABS`；並從該模組的 `plannedLabs` 移除。
3. `src/labs/<lab-id>/model.ts` 與 `model.test.ts`：教學模型與測試。
4. `src/labs/<lab-id>/<Name>Lab.tsx`：互動介面（`'use client'`，預設匯出）。
5. `src/labs/registry.tsx`：登錄元件。
6. `e2e/`：補上該實驗的操作測試。

`src/content/content.test.ts` 會檢查內容與互動元件是否一一對應，漏掉任何一步測試就會失敗。

### 不串接 LLM 時如何呈現「AI 的回應」

模組 4 的實驗不呼叫任何 AI 服務：

- `prompt-builder` 只用檢查清單檢視提示詞的組成，不產生回應。
- `prompt-makeover` 使用事先寫好的固定文字，每一則都標示「示範回應（事先寫好的，不是 AI 即時產生）」。

新增類似實驗時必須沿用同樣的標示（`RESPONSE_LABEL`），不得讓學生誤以為是即時生成的結果。

### 刻意包含錯誤或虛構內容的實驗

模組 5、6 的內容有些是「故意寫錯」或「虛構」的，處理原則：

- `spot-the-error`：示範回答刻意放入錯誤與編造的來源。回答上方固定標示「事先寫好，並刻意放入錯誤」，查看結果時每一句都附上正確說明與查證方法，不讓錯誤內容單獨留在畫面上。
- `source-check`：所有來源皆為虛構，畫面上明確說明，且不使用真實的網站、機構或帳號名稱。
- `dilemma-cards`：沒有標準答案；資料測試強制每個選擇都同時列出好處與風險。
- `fairness-check`：數字為假想資料，群體以「訓練資料中常見／少見的口音」描述，不指涉任何真實族群。

## 未來串接真實 AI 服務的原則

若後續階段需要呼叫 LLM：一律經由伺服器端 Route Handler 代理，金鑰只放伺服器環境變數；不得使用 `NEXT_PUBLIC_` 前綴；不傳送可識別學生身分的資料；介面上明確區分「真實模型回應」與「教學模型」。
