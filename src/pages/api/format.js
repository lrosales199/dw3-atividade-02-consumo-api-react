export function toText(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) {
    const parts = value.map(toText).filter((v) => v !== "—");
    return parts.length ? parts.join(", ") : "—";
  }
  if (typeof value === "object") {
    const parts = Object.values(value).map(toText).filter((v) => v !== "—");
    return parts.length ? parts.join(", ") : "—";
  }
  return String(value);
}
