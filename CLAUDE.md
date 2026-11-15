# AI Literacy Lab（AI 素養互動實驗室）

給國小高年級、國中學生與教師的 AI 素養互動教學網站。介面一律使用繁體中文（臺灣用語）。

相關文件：`PRD.md`（需求與階段）、`ARCHITECTURE.md`（路由、資料模型、新增實驗步驟）、`DESIGN_SYSTEM.md`（色彩、字級、元件、用語）。

## 指令

Node.js 22 以 Homebrew 安裝（keg-only）。若找不到 `node`，先執行：
`export PATH=/opt/homebrew/opt/node@22/bin:$PATH`

| 指令                              | 用途                                                                  |
| --------------------------------- | --------------------------------------------------------------------- |
| `npm run dev`                     | 開發伺服器                                                            |
| `npm run lint`                    | ESLint                                                                |
| `npm run typecheck`               | TypeScript 型別檢查                                                   |
| `npm run format` / `format:check` | Prettier                                                              |
| `npm test`                        | Vitest 單元測試                                                       |
| `npm run build`                   | 正式建置                                                              |
| `npm run test:e2e`                | Playwright（測試正式建置結果，需先 `npm run build`，使用連接埠 3100） |
| `npm run check`                   | 依序執行以上全部檢查                                                  |

## 必須遵守的規則

- **階段門檻**：每個階段完成前 `npm run check` 必須全部通過，才能進入下一階段。
- **不要一次開發多個模組**：依 `PRD.md` 的階段進行。
- **教學模型標示**：每個實驗的 `LabContent.modelNotice` 必填，說明簡化了什麼。不得把簡化模型描述為真實 LLM 的完整運作方式。
- **不擬人化**：不寫「AI 想」「AI 知道」「AI 理解」，見 `DESIGN_SYSTEM.md` 的用語。
- **隱私**：不蒐集個人資料；不加入分析、追蹤或第三方腳本；不從外部載入字型或資源；狀態只存 localStorage。
- **金鑰**：前端不得出現 API 金鑰，不使用 `NEXT_PUBLIC_` 存放任何機密。目前所有互動都是瀏覽器本機模擬。
- **內容與互動分離**：文字放 `src/content`，邏輯放 `src/labs/<id>/model.ts`（純函式並附測試），介面放 `src/labs/<id>/*.tsx`。
- **無障礙**：新頁面要加入 `e2e/platform.spec.ts` 的 axe 檢查清單；橘色文字最淺只能用 `accent-700`。

## 容易踩到的地方

- Server Component 不能匯入 `src/lib/mode.ts`、`src/lib/progress-store.ts`、`src/lib/storage/local-store.ts`（含 React hook）。需要 `labKey` 等純函式時從 `src/lib/progress.ts` 匯入。
- Next.js 16 的 `params` 是 Promise，需 `await`。
- 不要宣告 `const module = …`（ESLint `@next/next/no-assign-module-variable`），頁面中使用 `learningModule`。
- 依模式顯示的內容用 `ModeOnly`；投影時要隱藏的內容加 `projection:hidden`。
- TypeScript 鎖在 6.0、ESLint 鎖在 9：等 `typescript-eslint` 與相關外掛支援後再升級。
- Playwright 不會重用既有伺服器；若 3100 埠被占用會直接報錯，先關掉殘留的 `next start`。
- 模擬資料用固定種子產生；改動 `src/labs/shared/pet-data.ts` 的分布或種子會改變測試中寫死的答對數（單元與 e2e 都要一起更新）。
- 卡片分類類型的實驗直接用 `CategorySorter`；需要散布圖的實驗用 `ClassifierPlot`，不要另寫一套。
- 範例句子（`src/labs/shared/story-corpus.ts`）改動後，接龍的次數、機率與測試中寫死的句子都會變，需一併更新。
- 任何「AI 回應」若是事先寫好的文字，必須標示為示範回應，不可呈現成即時生成。
- 刻意寫錯或虛構的教學內容（模組 5、6）必須在畫面上標示，並附上正確說明；不得使用真實的機構、網站或族群名稱。原則見 `ARCHITECTURE.md`。
- 多回合的實驗用 `RoundNav`，不要各自寫切換按鈕。
- Prettier 會自動重排 Tailwind class 的順序；用腳本做字串取代前先看檔案現況，並用測試確認樣式真的生效。
- 新增 localStorage 鍵時要同步更新 `/about` 的說明，`e2e/pages.spec.ts` 會比對實際使用的鍵。
- 新增外部資源會被 CSP 擋下（`next.config.ts`）；這是刻意的，本站不對外連線。
- WebKit 測試的兩個差異：Tab 鍵預設不會聚焦連結（測試用 Option+Tab）；換頁時被取消的預先載入會回報 `access control checks` 錯誤（測試已排除）。
- 新增實驗請照 `ARCHITECTURE.md`「新增一個實驗的步驟」；`content.test.ts` 會檢查是否漏登錄。
