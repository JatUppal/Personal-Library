import { useEffect, useRef, useState, useCallback } from "react";
import api from "../lib/api";

export default function SearchAndAdd({ onImported }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [addingId, setAddingId] = useState(null);



  // modal state
  const [open, setOpen] = useState(false);
  const [readonly, setReadonly] = useState(false); // prefilled-from-Google mode
  const [saving, setSaving] = useState(false);
  // canonical book fields (manual or prefilled)
  const [form, setForm] = useState({
    googleVolumeId: "",
    title: "",
    authors: "",
    publishedYear: "",
    isbn13: "",
    pageCount: "",
    coverUrl: "",
    description: ""
  });

  
  const timerRef = useRef(null);

  const doSearch = useCallback((query) => {
    // clear any pending run
    if (timerRef.current) clearTimeout(timerRef.current);
  
    // schedule a new one
    timerRef.current = setTimeout(async () => {
      if (!query || query.trim().length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      try {
        setErr("");
        setLoading(true);
        // If the user didn't type an operator like "intitle:", "inauthor:", or "isbn:",
        // assume a simple title search.
        const hasOperator = /(^|\s)(intitle:|inauthor:|isbn:)/i.test(query);
        const qParam = hasOperator ? query : `intitle:${query} OR (inauthor:${query})`;
        const { data } = await api.get("/catalog/search", {
            params: { q: qParam, limit: 6 },
        });

        setResults(data?.items ?? data ?? []);
      } catch (e) {
        console.error("Search error:",e);
        setErr("Search failed");
      } finally {
        setLoading(false);
      }
    }, 350);
  }, []);

  useEffect(() => {
    doSearch(q);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [q, doSearch]);

  function openManual() {
    setForm({
      googleVolumeId: "",
      title: "",
      authors: "",
      publishedYear: "",
      isbn13: "",
      pageCount: "",
      coverUrl: "",
      description: "",
    });
    setReadonly(false);
    setOpen(true);
  }


  function closeModal() {
    setOpen(false);
    setSaving(false);
    setErr("");
  }

  function updateField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toIntOrNull(v) {
    const n = parseInt(String(v || "").trim(), 10);
    return Number.isNaN(n) ? null : n;
  }

  async function save() {
    setSaving(true);
    setErr("");
    try {
      // If it’s from Google and still read-only → import path
      if (readonly && form.googleVolumeId) {
        await api.post("/me/library/import", {
          googleVolumeId: form.googleVolumeId,
        });
      } else {
        // Manual add path
        const payload = {
          title: form.title.trim(),
          authors: form.authors.trim(),
          publishedYear: toIntOrNull(form.publishedYear),
          isbn13: form.isbn13.trim() || null,
          // backend ignores these if not mapped; safe to send if you later support them
          pageCount: toIntOrNull(form.pageCount),
          coverUrl: (form.coverUrl?.trim() || null),
          description: (form.description?.trim() || null),
        };
        if (!payload.title) {
          setSaving(false);
          setErr("Title is required.");
          return;
        }
        await api.post("/me/library", payload);
      }
      // success
      setOpen(false);
      setQ("");
      setResults([]);
      onImported?.();
    } catch (e) {
      const status = e?.response?.status;
      if (status === 409) {
        // already in library — treat as success
        setOpen(false);
        onImported?.();
      } else if (status === 400) {
        setErr(e?.response?.data?.message || "Invalid input.");
      } else {
        setErr("Save failed. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function addByVolume(googleVolumeId) {
    if (!googleVolumeId) return;
    setAddingId(googleVolumeId);
    setErr("");
  
    try {
      await api.post("/me/library/import", { googleVolumeId });
      // success: clear search + close dropdown + refresh table
      setQ("");
      setResults([]);
      onImported?.();
    } catch (e) {
      const status = e?.response?.status;
      if (status === 409) {
        // already in library — treat as success
        setQ("");
        setResults([]);
        onImported?.();
      } else if (status === 400) {
        setErr(e?.response?.data?.message || "Invalid request.");
      } else {
        setErr("Add failed. Please try again.");
      }
    } finally {
      setAddingId(null);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      addByVolume(results[0].googleVolumeId);
    }
  }
  
  

  return (
    <div style={{ position: "relative" }}>
      {/* Search bar */}
      <input
        className="input"
        placeholder="Search by title (e.g., Dune)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Searching…</div>
      )}
      {/* Dropdown */}
      {(q.length >= 1 || results.length > 0) && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
            zIndex: 20,
          }}
        >
          {/* Top row: Add new book (+) */}
          <button
            onClick={openManual}
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: 0,
              padding: "12px 14px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            + Add new book (manual)
          </button>

          {/* Results */}
          {results.map((r) => (
            <div
              key={r.googleVolumeId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderTop: "1px solid var(--border)",
              }}
            >
              {r.coverUrl && (
                <img
                  src={r.coverUrl}
                  alt=""
                  width={36}
                  height={54}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {(r.authors || []).join(", ")}{" "}
                  {r.publishedYear ? `• ${r.publishedYear}` : ""}
                </div>
              </div>
              <button
                className="btn"
                style={{ padding: "6px 10px", fontSize: 14, opacity: addingId === r.googleVolumeId ? 0.6 : 1 }}
                onClick={() => addByVolume(r.googleVolumeId)}
                disabled={addingId === r.googleVolumeId}
              >
                {addingId === r.googleVolumeId ? "Adding…" : "Add"}
              </button>
            </div>
          ))}

          {results.length === 0 && !loading && (
            <div style={{ padding: 12, color: "var(--muted)" }}>No results</div>
          )}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div
          aria-modal
          role="dialog"
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 40,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(92vw, 680px)",
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              boxShadow: "var(--shadow)",
              padding: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>
                {form.googleVolumeId && readonly ? "Import from Google" : "Add Book"}
              </h3>
              <div style={{ marginLeft: "auto", fontSize: 12, opacity: .75 }}>
                {form.googleVolumeId
                  ? readonly
                    ? "Prefilled • read-only"
                    : "Edited • manual save"
                  : "Manual entry"}
              </div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input
                  className="input"
                  placeholder="Title *"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  disabled={readonly}
                />
                <input
                  className="input"
                  placeholder="Authors (comma-separated)"
                  value={form.authors}
                  onChange={(e) => updateField("authors", e.target.value)}
                  disabled={readonly}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <input
                  className="input"
                  placeholder="Year"
                  value={form.publishedYear}
                  onChange={(e) => updateField("publishedYear", e.target.value)}
                  disabled={readonly}
                />
                <input
                  className="input"
                  placeholder="ISBN-13"
                  value={form.isbn13}
                  onChange={(e) => updateField("isbn13", e.target.value)}
                  disabled={readonly}
                />
                <input
                  className="input"
                  placeholder="Pages"
                  value={form.pageCount}
                  onChange={(e) => updateField("pageCount", e.target.value)}
                  disabled={readonly}
                />
              </div>

              <input
                className="input"
                placeholder="Cover URL"
                value={form.coverUrl}
                onChange={(e) => updateField("coverUrl", e.target.value)}
                disabled={readonly}
              />
              <textarea
                className="input"
                placeholder="Description"
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                disabled={readonly}
                style={{ resize: "vertical" }}
              />

              {err && <div style={{ color: "crimson" }}>{err}</div>}

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                {form.googleVolumeId && (
                  <button
                    type="button"
                    className="btn"
                    style={{ background: readonly ? "hsl(210 10% 35%)" : "var(--brand)" }}
                    onClick={() => setReadonly((r) => !r)}
                  >
                    {readonly ? "Edit fields" : "Use Google values"}
                  </button>
                )}
                <button type="button" className="btn" onClick={save} disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={closeModal}
                  style={{ background: "hsl(0 80% 55%)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
