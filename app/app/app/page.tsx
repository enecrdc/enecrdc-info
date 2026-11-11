const RUBRIQUES = [
  'À la une', 'Politique', 'Économie', 'Sécurité', 'Société',
  'Sud-Kivu', 'Bukavu', 'Nord-Kivu', 'Kinshasa', 'Provinces',
  'Culture', 'Sport', 'Éducation', 'Santé', 'Environnement',
  'Développement', 'International', 'Diaspora', 'Opinions'
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="logo">ENEC<span>RDC</span>.INFO</div>
        <div style={{ fontSize: 12 }}>Bukavu • RDC</div>
      </header>

      <div className="flash">FLASH • Info en continu — RDC • Sud-Kivu • Bukavu</div>

      <nav className="nav">
        {RUBRIQUES.map((r, i) => (
          <a key={r} href="#" className={i === 0 ? 'active' : ''}>{r}</a>
        ))}
      </nav>

      <section className="hero">
        <h1>Info RDC, Bukavu et Sud-Kivu — Vérifiée, de terrain.</h1>
        <p>Actualité générale et développement. 19 rubriques. 26 provinces. Version française, anglais et kiswahili à venir.</p>
      </section>

      <section className="section">
        <h2>À la une</h2>
        <div className="grid">
          <article className="card"><div className="card-body"><span className="badge">Sud-Kivu</span><h3>Bukavu : l&apos;actualité de la province, au plus près du terrain</h3><p>Les articles réels seront affichés ici dès la connexion à Supabase (Lot 3).</p></div></article>
          <article className="card"><div className="card-body"><span className="badge">Développement</span><h3>Développement : les projets qui changent la vie au Sud-Kivu</h3><p>Économie, éducation, santé, environnement — notre ligne éditoriale.</p></div></article>
          <article className="card"><div className="card-body"><span className="badge">RDC</span><h3>RDC : les nouvelles des 26 provinces</h3><p>Kinshasa, Nord-Kivu, provinces et international, en un seul journal.</p></div></article>
        </div>
      </section>

      <footer className="footer">
        <strong>ENECRDC.INFO</strong><br />
        Presse numérique — RDC • Bukavu • Sud-Kivu<br />
        © 2026 ENECRDC.INFO — Tous droits réservés
      </footer>
    </main>
  );
}
