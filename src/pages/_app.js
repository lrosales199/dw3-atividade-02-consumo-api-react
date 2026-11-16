import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bangers, Inter } from "next/font/google";
import "@/styles/globals.css";

const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-title" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const done = () => setLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  return (
    <div className={`app ${bangers.variable} ${inter.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="site-header">
        <Link href="/" className="logo">🍥 Catálogo Shinobi</Link>
      </header>

      <Component {...pageProps} />

      <footer className="site-footer">
        Dados:{" "}
        <a href="https://dattebayo-api.onrender.com" target="_blank" rel="noreferrer">
          Dattebayo API
        </a>
        {" · "}Fatec Registro · DSM · Desenvolvimento Web III
      </footer>

      {loading && (
        <div className="overlay" role="status" aria-live="polite">
          <div className="spinner" />
          <p>Invocando os dados... a API pode demorar até 1 minuto na primeira vez 🍥</p>
        </div>
      )}
    </div>
  );
}
