"use client";
import { useState } from "react";
import { checkHealth, runDemo } from "../lib/api";

export default function Home() {
  const [result, setResult] = useState<unknown>(null);
  const [health, setHealth] = useState<string>("尚未檢查");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");
  async function execute() {
    setBusy(true); setError("");
    try { setResult(await runDemo()); } catch (err) { setError(String(err)); }
    finally { setBusy(false); }
  }
  return <main>
    <div className="header"><div><h1>Plan2Sim</h1><p>多代理活動模擬｜團隊起始框架</p></div><span className="pill">Starter v0.1 · 教學範例</span></div>
    <section className="card"><h2>框架連線測試</h2><p>目前示範只模擬活動時程、資源容量與前置依賴；Agent 智慧行為由學生實作。</p>
      <button onClick={async () => { try { const r = await checkHealth(); setHealth(r.status); } catch (err) { setHealth(String(err)); } }}>測試 FastAPI</button>　<small>目前：{health}</small>
    </section>
    <section className="card"><h2>最小世界引擎 Demo</h2>
      <p>報到 → 主題講座 → 兩場工作坊。此 Demo 沒有真的生成 200 位參加者的行為，僅驗證模組串接。</p>
      <button onClick={execute} disabled={busy}>{busy ? "執行中" : "執行範例模擬"}</button>
      {error && <p role="alert">錯誤：{error}</p>}
      {result !== null && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </section>
    <section className="card"><h2>學生開發入口</h2>
      <p>A：文件→IR　B：World Engine　C：Agent Behavior　D：Scenario/Risk　E：UI/Gateway</p>
      <small>下一步：閱讀 docs/CONTRACTS.md，確認 Observation、ActionProposal、EventSim-IR 的共用介面。</small>
    </section>
  </main>;
}
