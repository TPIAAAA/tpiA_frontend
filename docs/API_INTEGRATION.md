# 與獨立後端 Repository 整合

- 後端 repository：`plan2sim-backend`。使用 OpenAPI 的 `/openapi.json` 與 `/docs` 確認端點及資料格式；不要在前端複製 Python 內部類別。
- 本地 API 來源：`NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`。瀏覽器實際發送請求，所以不能填 `http://api:8000` 或 `http://mysql:3306` 這類 Docker 內部名稱。
- 後端預設 CORS 允許 `http://localhost:3000`。若前端有其他網域，要同步更新後端 `CORS_ORIGINS`。
- digiRunner：Gateway 必須先註冊/驗證 API Proxy Path。完成授權、CORS、路徑檢查前，前端使用直連 FastAPI 的開發 URL。

## 示例端點

`GET /api/v1/health`：後端連線測試。
`GET /api/v1/models/demo`：獲取示例 EventSim-IR。
`POST /api/v1/simulations/demo/run`：同步教學模擬，body `{ "seed": 42 }`。
`POST /api/v1/projects`：新增專案，body `{ "name": "..." }`。
`POST /api/v1/experiments` + `GET /api/v1/experiments/{id}`：非同步模擬任務。

## 跨 repo 修改契約的方法

1. 後端 PR 修改 Pydantic schema／API route，說明 breaking change 與樣本 JSON。
2. 後端 CI 驗證，並以 `/openapi.json` 比對新版規格。
3. 前端 PR 同步修改 `lib/api.ts` 與畫面，通過 `npm run build`。
4. 兩個 repo 使用同一個 API 版本；若已有外部使用者，先維持舊版相容或新增 v2 路徑。
