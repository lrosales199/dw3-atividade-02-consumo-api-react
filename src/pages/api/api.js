const BASE_URL = "https://dattebayo-api.onrender.com";

export async function getCharacters(page = 1, limit = 20, name = "") {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (name) params.set("name", name);

  const res = await fetch(`${BASE_URL}/characters?${params}`);
  if (!res.ok) throw new Error("Falha ao buscar personagens");
  return res.json();
}

export async function getCharacterById(id) {
  const res = await fetch(`${BASE_URL}/characters/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Falha ao buscar personagem");
  return res.json();
}
