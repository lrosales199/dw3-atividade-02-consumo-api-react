import Head from "next/head";
import Link from "next/link";
import { getCharacters } from "@/pages/api/api";
import CharacterCard from "@/components/CharacterCard";

const LIMIT = 20;

export async function getServerSideProps({ query }) {
  const page = Math.max(1, Number(query.page) || 1);
  const name = typeof query.name === "string" ? query.name.trim() : "";

  try {
    const data = await getCharacters(page, LIMIT, name);
    const characters = (data.characters ?? []).map((c) => ({
      id: c.id,
      name: c.name ?? "Sem nome",
      image: c.images?.[0] ?? null,
    }));
    return {
      props: { characters, total: data.total ?? 0, page, name, error: null },
    };
  } catch (err) {
    return {
      props: {
        characters: [],
        total: 0,
        page,
        name,
        error: err.message || "Não foi possível carregar os dados.",
      },
    };
  }
}

export default function Home({ characters, total, page, name, error }) {
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pageHref = (p) => ({
    pathname: "/",
    query: name ? { page: p, name } : { page: p },
  });

  return (
    <>
      <Head>
        <title>Catálogo Shinobi</title>
        <meta name="description" content="Catálogo de personagens de Naruto usando a Dattebayo API" />
      </Head>

      <main className="container">
        <h1 className="title">Catálogo Shinobi</h1>
        <p className="subtitle">Explore os personagens do universo de Naruto</p>

        <form action="/" method="get" className="search">
          <input
            type="search"
            name="name"
            defaultValue={name}
            placeholder="Buscar personagem pelo nome..."
            aria-label="Buscar personagem pelo nome"
          />
          <button type="submit">Buscar</button>
        </form>

        {error ? (
          <div className="center">
            <p>{error}</p>
            <Link href={pageHref(page)} className="btn">Tentar novamente</Link>
          </div>
        ) : characters.length === 0 ? (
          <p className="empty">Nenhum personagem encontrado.</p>
        ) : (
          <>
            <div className="grid">
              {characters.map((c) => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>

            <nav className="pagination" aria-label="Paginação">
              {page > 1 ? (
                <Link href={pageHref(page - 1)}>← Anterior</Link>
              ) : (
                <span className="disabled">← Anterior</span>
              )}
              <span>Página {page} de {totalPages}</span>
              {page < totalPages ? (
                <Link href={pageHref(page + 1)}>Próxima →</Link>
              ) : (
                <span className="disabled">Próxima →</span>
              )}
            </nav>
          </>
        )}
      </main>
    </>
  );
}
