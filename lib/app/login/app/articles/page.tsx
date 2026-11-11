import { supabase } from '../../lib/supabase';

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, excerpt, slug, status, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <header style={{ background: '#0A1F3D', color: 'white', padding: 20, borderRadius: 12, marginBottom: 16 }}>
        <h1>ENEC<span style={{ color: '#C9A227' }}>RDC</span>.INFO — Articles</h1>
        <p style={{ fontSize: 13, opacity: 0.85 }}>Articles publiés — vérifiés par la rédaction</p>
      </header>

      {!articles || articles.length === 0 ? (
        <div style={{ background: 'white', padding: 20, borderRadius: 12 }}>
          <p>Aucun article publié pour le moment.</p>
          <p style={{ fontSize: 13, color: '#666' }}>Créez votre premier article dans l’espace Admin (Lot 4 — fichier 2), puis publiez-le après validation.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {articles.map((a: any) => (
            <article key={a.id} style={{ background: 'white', padding: 16, borderRadius: 12 }}>
              <h2 style={{ fontSize: 17, color: '#0A1F3D' }}>{a.title}</h2>
              <p style={{ fontSize: 13, color: '#555', marginTop: 6 }}>{a.excerpt || ''}</p>
              <p style={{ fontSize: 11, color: '#999', marginTop: 8 }}>{new Date(a.created_at).toLocaleDateString('fr-FR')}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
