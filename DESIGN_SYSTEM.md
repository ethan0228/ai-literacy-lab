# 設計系統

設計代幣定義於 `src/app/globals.css` 的 `@theme`；共用 class 組合在 `src/components/ui/styles.ts`。

## 設計原則

1. **明亮、專業**：白色與淺灰為底，內容優先。
2. **藍色是功能**：連結、主要按鈕、導覽。
3. **橘色是提醒**：互動、探索、重要資訊、教師專屬內容。
4. **動畫要有教學意義**：只用在狀態改變（例如回饋出現），不做裝飾性動畫。
5. **不只靠顏色傳達**：對錯回饋一定有文字。

## 色彩

| 代幣                     | 色碼                          | 用途                               |
| ------------------------ | ----------------------------- | ---------------------------------- |
| `canvas`                 | `#f8fafc`                     | 頁面背景                           |
| `surface`                | `#ffffff`                     | 卡片、頁首                         |
| `line`                   | `#e2e8f0`                     | 邊框                               |
| `ink`                    | `#0f172a`                     | 主要文字                           |
| `ink-muted`              | `#475569`                     | 次要文字                           |
| `brand-700`              | `#1d4ed8`                     | 主要按鈕、圖示                     |
| `brand-800`              | `#1e40af`                     | 連結文字、hover                    |
| `brand-50`               | `#eff6ff`                     | 藍色淺底                           |
| `accent-700`             | `#c2410c`                     | 橘色文字、教師模式選取狀態         |
| `accent-800`             | `#9a3412`                     | 橘色淺底上的文字                   |
| `accent-600`             | `#ea580c`                     | 焦點外框、邊框（不可用於文字）     |
| `accent-50`              | `#fff7ed`                     | 橘色淺底（教學模型說明、提示回饋） |
| `success-700 / 800 / 50` | `#15803d / #166534 / #f0fdf4` | 正確回饋、已完成                   |

對比規則（WCAG 2.1 AA）：一般文字至少 4.5:1。橘色文字在白底上最淺只能用 `accent-700`；`accent-500/600` 僅限邊框與裝飾。

## 字體與字級

- 字體：`Noto Sans TC`、`PingFang TC`、`Microsoft JhengHei`、系統字體。使用系統字型，不從外部載入字型檔。
- 內文行高 1.7，適合中文閱讀。

| 層級        | class                                                        | 用途               |
| ----------- | ------------------------------------------------------------ | ------------------ |
| 頁面標題 h1 | `text-3xl sm:text-4xl font-bold`（首頁 `sm:text-5xl`）       | 每頁一個           |
| 區塊標題 h2 | `text-2xl sm:text-3xl font-bold`；卡片內 `text-xl font-bold` |                    |
| 小標 h3     | `text-lg font-bold`                                          |                    |
| 引言        | `text-lg text-ink-muted`                                     | 標題下的說明       |
| 內文        | `text-base`                                                  |                    |
| 輔助        | `text-sm`                                                    | 標籤、進度、麵包屑 |

## 間距與版面

- 內容最大寬度 `max-w-6xl`，左右留白 `px-4 sm:px-6`（`container`）。
- 卡片：`rounded-2xl border border-line bg-surface p-6 shadow-sm`（`card`）。
- 格線：手機 1 欄、`sm` 2 欄、`lg` 3–4 欄。
- 斷點沿用 Tailwind 預設：`sm` 640、`md` 768、`lg` 1024。

## 元件

| 元件             | 位置                     | 說明                                                                       |
| ---------------- | ------------------------ | -------------------------------------------------------------------------- |
| 按鈕             | `ui/styles.ts`           | `buttonPrimary`（藍底白字）、`buttonSecondary`（白底描邊）；最小高度 44px  |
| `Badge`          | `ui/Badge.tsx`           | `brand`、`accent`、`neutral`、`success` 四種色調                           |
| `ModeSwitch`     | `layout/ModeSwitch.tsx`  | 分段按鈕；學生為藍、教師為橘                                               |
| `ModuleCard`     | `modules/ModuleCard.tsx` | 整張卡片可點，連結文字為模組名稱；首頁用 `compact`（提問為主、不顯示描述） |
| `HeroTryIt`      | `home/HeroTryIt.tsx`     | 首頁主視覺的迷你實驗：直接作答第一張分類卡，作答後連到完整實驗             |
| `ModelNotice`    | `lab/ModelNotice.tsx`    | 橘色淺底，每個實驗必備                                                     |
| `ChallengePanel` | `lab/ChallengePanel.tsx` | 單選題與即時回饋                                                           |
| `TeacherPanel`   | `lab/TeacherPanel.tsx`   | 橘色虛線框代表教師專屬內容                                                 |
| `LabShell`       | `lab/LabShell.tsx`       | 實驗頁模板                                                                 |

教師專屬內容統一使用「橘色虛線外框 + 橘色標題」，讓教師一眼分辨。

## 回饋樣式

| 狀態       | 樣式                             | 文字開頭     |
| ---------- | -------------------------------- | ------------ |
| 正確       | `bg-success-50 text-success-800` | 「答對了！」 |
| 需要再想想 | `bg-accent-50 text-accent-800`   | 「再想想：」 |

不使用紅色與「錯誤」字眼：回饋的目的是引導思考，不是評分。

沒有標準答案的內容（倫理情境）不使用綠色／橘色的對錯樣式：好處用藍色淺底、風險用橘色淺底，兩者並列呈現。

## 動態效果

- 僅有 `animate-reveal`（200ms 淡入上移）與顏色轉場。
- `prefers-reduced-motion: reduce` 時，全站動畫與轉場時間降為近 0。

## 無障礙

- 焦點外框：3px `accent-600`，全站一致。
- 提供「跳到主要內容」連結。
- 即時回饋使用 `aria-live="polite"`。
- 切換類按鈕使用 `aria-pressed`；作答後鎖定的按鈕使用 `aria-disabled`，避免鍵盤焦點遺失。
- 裝飾性圖示加上 `aria-hidden="true"`。
- 觸控目標至少 44×44px（模式切換為 36px 高，屬次要控制項）。

## 投影模式

`<html data-projection="true">`：

- 根字級放大為 125%。
- 以 `projection:hidden` 隱藏頁首、頁尾、麵包屑、標籤與教師備課內容。
- 頁面頂端改為深藍色的投影控制列（`ProjectionBar`）：段落跳轉、全螢幕、結束投影。深藍底白字，與一般頁首明顯區分，讓教師知道目前在投影狀態。

## 列印

教師資源頁可列印：以 `print:hidden` 隱藏頁首、頁尾與操作按鈕，模組卡片使用 `break-inside-avoid` 避免跨頁切斷。

## 用語

- 使用臺灣用語：提示詞、資料、程式、網路、影片、螢幕。
- 對學生用「你」，句子簡短，避免未解釋的術語。
- 避免擬人化描述 AI（不寫「AI 想」「AI 知道」「AI 理解」），改用「預測」「產生」「從資料中學到規律」。
