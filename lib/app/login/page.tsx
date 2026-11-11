'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage('Erreur : ' + error.message);
      setLoading(false);
      return;
    }

    // Vérifier le rôle dans profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role, is_active')
      .eq('id', data.user.id)
      .single();

    if (!profile || !profile.is_active) {
      setMessage('Compte désactivé. Contactez le Super Admin.');
      setLoading(false);
      return;
    }

    setMessage(`Bienvenue ${profile.full_name} — Rôle : ${profile.role}. Connexion réussie.`);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <div style={{ background: '#0A1F3D', color: 'white', padding: 20, borderRadius: 12, textAlign: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22 }}>ENEC<span style={{ color: '#C9A227' }}>RDC</span>.INFO</h1>
        <p style={{ fontSize: 13, opacity: 0.85 }}>Espace Rédaction — Connexion</p>
      </div>

      <form onSubmit={handleLogin} style={{ background: 'white', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre-email@..." style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />

        <label style={{ fontSize: 13, fontWeight: 600 }}>Mot de passe</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />

        <button type="submit" disabled={loading} style={{ background: '#0A1F3D', color: 'white', padding: 12, borderRadius: 8, fontWeight: 700, border: 'none' }}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        {message && <p style={{ fontSize: 13, background: '#F4F5F7', padding: 10, borderRadius: 8 }}>{message}</p>}
      </form>

      <p style={{ fontSize: 12, textAlign: 'center', marginTop: 12, color: '#666' }}>
        Utilisez le compte Super Admin créé dans Supabase (Étape 5).<br />
        Ne partagez jamais votre mot de passe.
      </p>
    </main>
  );
}
