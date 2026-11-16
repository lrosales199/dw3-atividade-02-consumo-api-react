import Head from "next/head";
import Link from "next/link";
import { getCharacterById } from "@/pages/api/api";
import { toText } from "@/pages/api/format";

export async function getServerSideProps({ params }) {
  try {
    const character = await getCharacterById(params.id);
    if (!character) return { notFound: true };
    // JSON round-trip: garante props serializáveis (sem `undefined`)
    return { props: { character: JSON.parse(JSON.stringify(character)), error: null } };
  } catch (err) {
    return {
      props: { character: null, error: err.message || "Não foi possível carregar os dados." },
    };
  }
}

export default function CharacterDetail({ character: c, error }) {
  if (error || !c) {
    return (
      <main className="container center">
        <h1 className="title">Algo deu errado</h1>
        <p>{error}</p>
        <Link href="/" className="btn">← Voltar ao catálogo</Link>
      </main>
    );
  }

  const p = c.personal ?? {};
  const jutsu = Array.isArray(c.jutsu) ? c.jutsu : [];
  const nature = Array.isArray(c.natureType) ? c.natureType : [];
  const family =
    c.family && typeof c.family === "object" ? Object.entries(c.family).slice(0, 8) : [];
  const image = c.images?.[0];

  return (
    <>
      <Head>
        <title>{`${c.name} · Catálogo Shinobi`}</title>
      </Head>

      <main className="container">
        <Link href="/" className="back">← Voltar ao catálogo</Link>

        <section className="detail">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={c.name} className="detail-img" />
          ) : (
            <div className="no-img detail-img">?</div>
          )}

          <div className="detail-info">
            <h1 className="title">{c.name}</h1>

            <dl className="facts">
              <dt>Clã</dt><dd>{toText(p.clan)}</dd>
              <dt>Status</dt><dd>{toText(p.status)}</dd>
              <dt>Aniversário</dt><dd>{toText(p.birthdate)}</dd>
              <dt>Sexo</dt><dd>{toText(p.sex)}</dd>
              <dt>Ocupação</dt><dd>{toText(p.occupation)}</dd>
              <dt>Afiliação</dt><dd>{toText(p.affiliation)}</dd>
            </dl>

            {nature.length > 0 && (
              <>
                <h2>Tipos de natureza</h2>
                <div className="tags">
                  {nature.map((n, i) => (
                    <span key={`${n}-${i}`} className="tag alt">{toText(n)}</span>
                  ))}
                </div>
              </>
            )}

            {family.length > 0 && (
              <>
                <h2>Família</h2>
                <dl className="facts">
                  {family.map(([relation, who]) => (
                    <FamilyRow key={relation} relation={relation} who={who} />
                  ))}
                </dl>
              </>
            )}

            {jutsu.length > 0 && (
              <>
                <h2>Jutsus</h2>
                <div className="tags">
                  {jutsu.slice(0, 20).map((j, i) => (
                    <span key={`${j}-${i}`} className="tag">{toText(j)}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function FamilyRow({ relation, who }) {
  return (
    <>
      <dt style={{ textTransform: "capitalize" }}>{relation}</dt>
      <dd>{toText(who)}</dd>
    </>
  );
}
