'use client';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState('');

  const correctPassword = 'lordumsifre123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
      setError('');
      // Verileri çek
      try {
        const res = await fetch('/api/log/get-logs');
        const data = await res.json();
        setLogs(data);
      } catch {
        setError('Veriler alınamadı.');
      }
    } else {
      setError('Şifre yanlış!');
    }
  };

  if (!isAuthorized) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Giriş için şifreyi gir</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Şifre"
          />
          <button type="submit">Giriş</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Ziyaretçi Kayıtları</h2>
      <pre>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
}
