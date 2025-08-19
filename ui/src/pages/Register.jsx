import { useState } from "react";
import api from "../lib/api";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [displayName, setDisplay] = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [err, setErr]             = useState("");
  const [busy, setBusy]           = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const registerPath = import.meta.env.VITE_AUTH_REGISTER_PATH || "/api/v1/auth/register";
      const mePath       = import.meta.env.VITE_AUTH_ME_PATH      || "/api/v1/auth/me";

      // shape matches your users table / likely RegisterRequest
      const payload = { firstName, lastName, displayName, email, password };
      const { data } = await api.post(registerPath, payload);

      // If your backend returns a token on register, log in right away:
      const token = data.token || data.accessToken || data.jwt;
      if (token) {
        localStorage.setItem("token", token);
        try {
          const me = await api.get(mePath);
          if (me?.data?.displayName) localStorage.setItem("displayName", me.data.displayName);
        } catch { /* ignore */ }
        window.location.href = "/library";
      } else {
        // if no token is returned, send them to login
        window.location.href = "/login";
      }
    } catch (e) {
      const status = e?.response?.status;
      if (status === 409) setErr("An account with that email already exists.");
      else setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Join <strong>Personal Library</strong>.</p>

        <form onSubmit={submit} className="auth-form">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input className="input" placeholder="first name" value={firstName} onChange={e=>setFirstName(e.target.value)} />
            <input className="input" placeholder="last name"  value={lastName}  onChange={e=>setLastName(e.target.value)} />
          </div>
          <input className="input" placeholder="display name" value={displayName} onChange={e=>setDisplay(e.target.value)} />
          <input className="input" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

          <div className="auth-actions">
            <button className="btn" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
            <span style={{ marginLeft: "auto", fontSize: 14 }}>
              Have an account? <a className="link" href="/login">Sign in</a>
            </span>
          </div>
        </form>

        {err && <div style={{ color: "crimson", marginTop: 10 }}>{err}</div>}
      </div>
    </div>
  );
}
