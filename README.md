# Plan2Sim Frontend — Next.js

> 前端獨立 Repository，使用 Next.js 15 + React 19 + TypeScript。**不包含後端、MySQL、Redis、Agent Engine 或 digiRunner 容器**。

## 1. 開始前：先啟動後端

取得另一個 repository `plan2sim-backend`，在後端根目錄執行：

```bash
cp .env.example .env
docker compose up --build -d
```

後端文件 `http://localhost:8000/docs`，健康檢查 `http://localhost:8000/api/v1/health`。

## 2. 前端本機開發

```bash
cp .env.example .env.local
# Windows PowerShell: Copy-Item .env.example .env.local
npm install
npm run dev
```

前端開啟 `http://localhost:3000`。`NEXT_PUBLIC_API_BASE_URL` 預設 `http://localhost:8000`，瀏覽器直接呼叫 FastAPI。若更改 API URL，重新啟動 Next.js dev server。

## 3. 前端獨立 Docker Compose

```bash
cp .env.example .env
docker compose up --build -d
```

前端與後端使用**不同的 Compose 專案與 Docker Network**，透過瀏覽器可存取的 `localhost:8000` 通訊；不必共用 Docker network。

注意：`NEXT_PUBLIC_*` 值會被 Next.js **編譯進瀏覽器程式碼**。修改 `.env` 後須重新 build 映像，不能只重啟容器。正式部署請改為 API Gateway 的公開 HTTPS URL，並驗證 CORS、授權與代理路徑。

## 4. 目前提供的 Demo

- FastAPI Health Check 按鈕。
- 基本活動模擬 Demo（API `POST /api/v1/simulations/demo/run`）。
- 前端 UI 只負責呼叫公開 API，不直接存取 MySQL。
- 核心人類行為與 Agent 模擬仍由後端學生實作。

## 5. API 契約與跨 Repo 協作

詳見 [`docs/API_INTEGRATION.md`](docs/API_INTEGRATION.md)。後端 `/openapi.json` 是跨 Repo API 的單一事實來源。

流程：後端提出 API 變更 PR（含測試及 JSON 範例）→ 前端建立對應 PR → 兩個 CI 通過 → 整合測試。若修改具破壞性，先評估維持 `/api/v1` 向下相容。

## 6. CI

```bash
npm install
npm run build
```

GitHub Actions 工作流程位於 `.github/workflows/ci.yml`。正式部署前請另外評估 API 授權、CSRF／CORS、安全性及實際環境變數。

## 7. 建立獨立 GitHub Repository

此 ZIP 是前端獨立 Git repository 的初始工作目錄，未自動建立 GitHub 遠端倉庫。

```bash
git init -b main
git add .
git commit -m "Initialize Plan2Sim frontend"
# 然後在 GitHub 建立 plan2sim-frontend，設定 origin 並 push
```

首次完成 `npm install` 後，請把產生的 `package-lock.json` 一併提交 Git，並將 CI 改用 `npm ci` 以鎖定依賴。
