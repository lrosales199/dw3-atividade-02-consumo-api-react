import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head><title>Página não encontrada · Catálogo Shinobi</title></Head>
      <main className="container center">
        <h1 className="title">Página não encontrada</h1>
        <p>O personagem ou a página que você procura não existe.</p>
        <Link href="/" className="btn">← Voltar ao catálogo</Link>
      </main>
    </>
  );
}
