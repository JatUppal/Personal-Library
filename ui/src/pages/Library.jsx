import { useEffect, useState } from "react";
import api from "../lib/api";
import SearchAndAdd from "./SearchAndAdd";
import BookModal from "../components/BookModal";

const TABLE_MAX_W = 1200;           // was 1000 before
const THUMB_W = 64;                 // ~2x your old thumb
const THUMB_H = 96;                 // keep a book-ish 2:3 ratio
const THUMB_RADIUS = 8;
const PAGE_SIZE = 6;
const PAGER_WRAP = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 10px",            // was 10px 14px
    borderTop: "1px solid var(--border)",
};
  
const PAGER_BTN = {
    padding: "6px 10px",
    fontSize: 16,
    lineHeight: 1,
    borderRadius: 8,
};

export default function Library() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const displayName = localStorage.getItem("displayName") || "Your";
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  async function load(p = page) {
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.get("/me/library", {
        params: { page: p, size: PAGE_SIZE },
      });
      const content = Array.isArray(data) ? data : (data.content || []);
      const tp = data.totalPages ?? data.total_pages ?? 1;

      // If we asked for a page that no longer exists (e.g., after a delete),
      // jump to the last page that *does* exist and refetch.
      if (content.length === 0 && tp > 0 && p >= tp) {
        const newPage = Math.max(tp - 1, 0);
        const { data: d2 } = await api.get("/me/library", {
          params: { page: newPage, size: PAGE_SIZE },
        });
        setRows(d2.content || []);
        setTotalPages(tp);
        setPage(newPage);
      } else {
        setRows(content);
        setTotalPages(tp);
        setPage(p);
      }
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

  useEffect(() => { load(0); }, []);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    window.location.href = "/login";
  }

  async function remove(id) {
    if (!confirm("Delete this book from your library?")) return;
    try { await api.delete(`/me/library/${id}`); await load(page); }
    catch { alert("Delete failed"); }
  }

  function openView(id) { setModal({ id, edit: false }); }
  function openEdit(id) { setModal({ id, edit: true }); }
  function closeModal()  { setModal(null); }

  function Thumb({ url, title }) {
    const box = {
        width: THUMB_W,
        height: THUMB_H,
        borderRadius: THUMB_RADIUS,
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        background: "#fff",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        flex: "0 0 auto",
    };
    const valid = typeof url === "string" && /^https?:\/\//i.test(url);
    if (valid) {
      return (
        <div style={box}>
        <img
          src={url}
          alt=""
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
      );
    }
    // fallback: black with gold initial (or first letter of title)
    return (
        <div style={{ ...box, background: "#000", color: "#d4af37", textAlign: "center", padding: 6 }}>
        <div style={{ fontWeight: 700, lineHeight: 1.1, fontSize: 12, overflow: "hidden" }}>
        {title || "Untitled"}
        </div>
        </div>
    );
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
            width: `min(${TABLE_MAX_W}px, 100%)`,
            marginTop: 32,
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <colgroup>
            <col key="book" style={{ width: "52%" }} />
            <col key="authors" style={{ width: "18%" }} />
            <col key="year" style={{ width: "8%" }} />
            <col key="status" style={{ width: "10%" }} />
            <col key="rating" style={{ width: "6%" }} />
            <col key="action" style={{ width: "6%" }} />
          </colgroup>
            <thead style={{ background: "hsl(220 20% 98%)" }}>
              <tr>
                {["Book", "Authors", "Year", "Status", "Rating", "Action"].map((h, i) => (
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
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <Thumb url={r.coverUrl} title={r.title} />
                        <button
                        onClick={() => openView(r.id)}
                        className="link"
                        style={{
                            fontSize: 16,
                            background: "transparent",
                            border: 0,
                            padding: 0,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                        title="View details"
                        >
                        {r.title}
                        </button>
                    </div>
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
                      <button className="btn" onClick={() => openView(r.id)} style={{ padding: "8px 10px", fontSize: 14 }}>
                        View
                      </button>
                      <button className="btn" onClick={() => openEdit(r.id)} style={{ padding: "8px 10px", fontSize: 14, background: "hsl(210 10% 35%)" }}>
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
        {/* Pagination bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 14, opacity: 0.75 }}>
              Page {Math.min(page + 1, totalPages || 1)} of {totalPages || 1}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
                <button className="btn" style={PAGER_BTN} onClick={() => load(0)} disabled={page === 0}>« First</button>
                <button className="btn" style={PAGER_BTN} onClick={() => load(page - 1)} disabled={page === 0}>‹ Prev</button>
                <button className="btn" style={PAGER_BTN} onClick={() => load(page + 1)} disabled={page + 1 >= totalPages}>Next ›</button>
                <button className="btn" style={PAGER_BTN} onClick={() => load(totalPages - 1)} disabled={page + 1 >= totalPages}>Last »</button>
            </div>
          </div>
        </div>
        {modal && (
        <BookModal
          id={modal.id}
          startEdit={modal.edit}
          onClose={closeModal}
          onSaved={load}
        />
      )}
      </div>
    </>
  );
}  
