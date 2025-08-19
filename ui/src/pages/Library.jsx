import { useEffect, useState } from "react";
import api from "../lib/api";
import SearchAndAdd from "./SearchAndAdd";

export default function Library() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const displayName = localStorage.getItem("displayName") || "Your";

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.get("/me/library");
      setRows(Array.isArray(data) ? data : (data.content || []));
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
      setErr("Failed to load library");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    window.location.href = "/login";
  }

  async function remove(id) {
    if (!confirm("Delete this book from your library?")) return;
    try { await api.delete(`/me/library/${id}`); await load(); }
    catch { alert("Delete failed"); }
  }

  return (
    <>
      {/* Floating sign-out in the top-right */}
      <button
        onClick={signOut}
        className="btn"
        style={{
          position: "fixed",
          top: 18,
          right: 30,
          padding: "12px 16px",
          fontSize: 16,
          zIndex: 100,
        }}
      >
        Sign out
      </button>
  
      {/* Page: grid that horizontally centers every section */}
      <div style={{ display: "grid", justifyItems: "center", padding: "28px 16px 40px" }}>
        {/* Title row (centered) */}
        <div style={{ width: "min(1100px, 100%)" }}>
          <h1
            style={{
              margin: 0,
              fontSize: 35,
              letterSpacing: "-0.02em",
              textAlign: "center",
              lineHeight: 1.2
            }}
          >
            {displayName}’s{" "}
            <span style={{ color: "var(--brand-700)" }}>Personal Library</span>
          </h1>
        </div>
  
        {/* Search bar (centered, narrower) */}
        <div style={{ width: "min(720px, 100%)", marginTop: 25 }}>
          <SearchAndAdd onImported={load} />
        </div>
  
        {/* Messages (centered text) */}
        {err && (
          <div style={{ color: "crimson", marginTop: 10, textAlign: "center" }}>
            {err}
          </div>
        )}
        {loading && (
          <div style={{ opacity: 0.7, marginTop: 10, textAlign: "center" }}>
            Loading…
          </div>
        )}
  
        {/* Table card (centered, wider) */}
        <div
          style={{
            width: "min(1000px, 100%)",
            marginTop: 32,
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead style={{ background: "hsl(220 20% 98%)" }}>
              <tr>
                {["Title", "Authors", "Year", "Status", "Rating", "Action"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      textAlign: i < 2 ? "left" : "center",
                      padding: "12px 14px",
                      borderBottom: "1px solid var(--border)",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} style={{ padding: 16, textAlign: "center", color: "var(--muted)" }}>
                    Your library is empty. Try searching above to add a book.
                  </td>
                </tr>
              )}
  
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
                    <button
                      onClick={() => alert("Details modal coming next")}
                      className="link"
                      style={{ fontSize: 16, background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
                      title="View details"
                    >
                      {r.title}
                    </button>
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
                    {r.authors}
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
                    {r.publishedYear ?? ""}
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
                    {r.status ?? <span style={{ opacity: 0.7 }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
                    {r.rating ?? <span style={{ opacity: 0.7 }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", gap: 8 }}>
                      <button className="btn" onClick={() => alert("View modal coming next")} style={{ padding: "8px 10px", fontSize: 14 }}>
                        View
                      </button>
                      <button className="btn" onClick={() => alert("Edit modal coming next")} style={{ padding: "8px 10px", fontSize: 14, background: "hsl(210 10% 35%)" }}>
                        Edit
                      </button>
                      <button className="btn" onClick={() => remove(r.id)} style={{ padding: "8px 10px", fontSize: 14, background: "hsl(0 80% 55%)" }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}  
