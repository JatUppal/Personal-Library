import { useEffect, useState } from "react";
import api from "../lib/api";

function htmlToText(html) {
  if (!html) return "";
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent || el.innerText || "";
}

const STATUSES = ["PLANNED", "READING", "COMPLETED", "ABANDONED"];

function Cover({ url, title }) {
  const valid = typeof url === "string" && /^https?:\/\//i.test(url);
  if (valid) {
    return (
      <img
        src={url}
        alt=""
        width={120}
        height={180}
        style={{
          objectFit: "cover",
          borderRadius: 10,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
      />
    );
  }
  // fallback: black cover with gold title
  return (
    <div
      style={{
        width: 120,
        height: 180,
        borderRadius: 10,
        background: "#000",
        color: "#d4af37",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 10,
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        fontWeight: 700,
        lineHeight: 1.15,
      }}
      title={title}
    >
      <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {title || "Untitled"}
      </div>
    </div>
  );
}

export default function BookModal({ id, startEdit = false, onClose, onSaved }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [edit, setEdit] = useState(!!startEdit);

  // form model
  const [form, setForm] = useState({
    title: "",
    authors: "",
    publishedYear: "",
    description: "",
    status: "PLANNED",
    rating: null,
    coverUrl: "",
  });

  // snapshot to restore on Cancel
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setErr("");
      setLoading(true);
      try {
        const { data } = await api.get(`/me/library/${id}`);
        const plainDesc = htmlToText(data.description || data.notes || "");
        if (!alive) return;
        const f = {
          title: data.title || "",
          authors: data.authors || "",
          publishedYear: data.publishedYear ?? "",
          description: plainDesc,
          status: data.status || "PLANNED",
          rating: data.rating ?? null,
          coverUrl: data.coverUrl || "",
        };
        setForm(f);
        setSnapshot(null);
        setEdit(!!startEdit);
      } catch {
        setErr("Failed to load book");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id, startEdit]);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function beginEdit() {
    setSnapshot(form);    // remember current state
    setEdit(true);
  }

  function cancelEdit() {
    if (snapshot) setForm(snapshot); // restore
    setSnapshot(null);
    setEdit(false);
    setErr("");
  }

  async function saveAll() {
    setSaving(true);
    setErr("");
    try {
      await api.put(`/me/library/${id}`, {
        status: form.status,
        rating: form.rating,        // allow null to clear
        notes: form.description,    // UI "description" stored as backend "notes"
      });
      setEdit(false);
      setSnapshot(null);
      onSaved?.();                 // refresh table, keep modal open
    } catch {
      setErr("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="modal-wrap" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>Loading…</div>
      </div>
    );
  }

  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <h3 style={{ margin: 0 }}>{edit ? "Edit Book" : "Book Details"}</h3>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {!edit ? (
              <>
                <button
                  className="btn"
                  style={{ padding: "8px 12px", fontSize: 14, background: "hsl(210 10% 35%)" }}
                  onClick={beginEdit}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  style={{ padding: "8px 12px", fontSize: 14 }}
                  onClick={onClose}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  style={{ padding: "8px 12px", fontSize: 14, background: "hsl(210 10% 35%)" }}
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="btn"
                  style={{ padding: "8px 12px", fontSize: 14 }}
                  onClick={saveAll}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16 }}>
          {/* Cover */}
          <Cover url={form.coverUrl} title={form.title} />

          {/* Fields */}
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input className="input" placeholder="Book Title" value={form.title} readOnly disabled />
              <input className="input" placeholder="Authors" value={form.authors} readOnly disabled />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input className="input" placeholder="Year" value={form.publishedYear ?? ""} readOnly disabled />
              <select
                className="input"
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                disabled={!edit}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Rating pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 600, width: 70 }}>Rating:</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map((n) => {
                  const active = form.rating === n;
                  return (
                    <button
                      key={n}
                      className="pill"
                      aria-pressed={active}
                      disabled={!edit}
                      onClick={() => edit && update("rating", n)}
                      title={`Set rating ${n}`}
                    >
                      {n}
                    </button>
                  );
                })}
                <button
                  className="pill"
                  disabled={!edit}
                  onClick={() => edit && update("rating", null)}
                  title="Clear rating"
                >
                  —
                </button>
              </div>
            </div>

            {/* Description / Notes */}
            {!edit ? (
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 12,
                  minHeight: 100,
                  whiteSpace: "pre-wrap",
                  background: "#fff",
                  lineHeight: 1.4,
                }}
              >
                {form.description || "—"}
              </div>
            ) : (
              <textarea
                className="input"
                rows={5}
                style={{ resize: "vertical" }}
                placeholder="Notes / Description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            )}
          </div>
        </div>
        {err && <div style={{ color: "crimson", marginTop: 10 }}>{err}</div>}
      </div>
    </div>
  );
}
