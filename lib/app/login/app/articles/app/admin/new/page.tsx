'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Vous devez être connecté. Allez sur /login d’abord.');
      setLoading(false);
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9à-ÿ]+/gi, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-5);

    const { error } = await supabase.from('articles').insert({
      title,
      slug,
      excerpt,
      content,
      author_id: user.id,
      status: 'draft',
    });

    if (error) {
      setMessage('Erreur : ' + error.message);
    } else {
      setMessage('✅ Article créé en BROUILLON. Il n’est pas encore publié. Un Super Admin / Éditeur doit le valider.');
      setTitle(''); setExcerpt(''); setContent('');
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: 16 }}>
      <h1 style={{ color: '#0A1F3D' }}>Nouvel article — Brouillon</h1>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>Workflow : Brouillon → En relecture → Validé → Publié. Seul un rôle autorisé peut publier.</p>

      <form onSubmit={handleCreate} style={{ background: 'white', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontWeight: 600, fontSize: 13 }}>Titre</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de l’article" style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />

        <label style={{ fontWeight: 600, fontSize: 13 }}>Chapeau / Résumé</label>
        <textarea required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Résumé en 2-3 lignes" rows={3} style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />

        <label style={{ fontWeight: 600, fontSize: 13 }}>Contenu</label>
        <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Votre article complet ici..." rows={10} style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />

        <button type="submit" disabled={loading} style={{ background: '#0A1F3D', color: 'white', padding: 12, borderRadius: 8, fontWeight: 700, border: 'none' }}>
          {loading ? 'Enregistrement...' : 'Enregistrer en brouillon'}
        </button>

        {message && <p style={{ fontSize: 13, background: '#F4F5F7', padding: 10, borderRadius: 8 }}>{message}</p>}
      </form>
    </main>
  );
          }
