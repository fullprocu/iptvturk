import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [stats, setStats] = useState({ panels: 0, sources: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/login`, credentials);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      alert('Giriş başarısız');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const [panelsRes, sourcesRes] = await Promise.all([
        axios.get(`${config.API_BASE_URL}/api/panels`),
        axios.get(`${config.API_BASE_URL}/api/public-sources`)
      ]);
      setStats({
        panels: panelsRes.data.length,
        sources: sourcesRes.data.length
      });
    } catch (error) {
      console.error('İstatistik getirme hatası:', error);
    }
  };

  const handleCleanOld = async () => {
    try {
      await axios.post(`${config.API_BASE_URL}/api/panels/clean`, { days: 30 });
      fetchStats();
      alert('Eski paneller temizlendi');
    } catch (error) {
      alert('Temizleme hatası');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Admin Girişi
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Kullanıcı adı"
                className="w-full p-3 border rounded-lg"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Şifre"
                className="w-full p-3 border rounded-lg"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            Varsayılan: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Admin Paneli
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">İstatistikler</h3>
          <p>Toplam Panel: {stats.panels}</p>
          <p>Yasal Kaynak: {stats.sources}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">İşlemler</h3>
          <button
            onClick={handleCleanOld}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eski Panelleri Temizle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;