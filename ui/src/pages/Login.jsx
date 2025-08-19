import { useState } from "react";
import api from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const loginPath = import.meta.env.VITE_AUTH_LOGIN_PATH || "/api/v1/auth/login";
      const mePath = import.meta.env.VITE_AUTH_ME_PATH || "/api/v1/auth/me";
      const { data } = await api.post(loginPath, { email, password });

      const token = data.token || data.accessToken || data.jwt;
      if (!token) throw new Error("No token in login response");
      localStorage.setItem("token", token);

      try {
        const me = await api.get(mePath);
        if (me?.data?.displayName) localStorage.setItem("displayName", me.data.displayName);
      } catch { /* non-fatal */ }

      window.location.href = "/library";
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401 || status === 403) {
        // bad credentials
        setErr("Incorrect email or password. Please try again.");
      } else if (e?.request && !e?.response) {
        // network error / CORS / server down
        setErr("Unable to reach the server. Please try again.");
      } else {
        setErr(e?.response?.data?.message || "Login failed");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-sub">Welcome back to <strong>Personal Library</strong>.</p>

        <form onSubmit={submit} className="auth-form">
          <input
            className="input"
            placeholder="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-actions">
            <button className="btn" disabled={busy}w>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <span style={{ marginLeft: "auto", fontSize: 14 }}>
              No account?{" "}
              <a className="link" href="/register">Create one</a>
            </span>
          </div>
        </form>

        {err && <div style={{ color: "crimson", marginTop: 10 }}>{err}</div>}
      </div>
    </div>
  );
}
