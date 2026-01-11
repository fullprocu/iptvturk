import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const PublicSources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/public-sources`);
      setSources(response.data);
    } catch (error) {
      console.error('Kaynak getirme hatası:', error);
    }
    setLoading(false);
  };

  const handleScanPublic = async () => {
    setLoading(true);
    try {
      await axios.post(`${config.API_BASE_URL}/api/scan`, { type: 'm3u' });
      fetchSources();
    } catch (error) {
      console.error('Tarama hatası:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Yasal M3U Kaynakları
      </h1>

      <div className="mb-6 text-center">
        <button
          onClick={handleScanPublic}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Taranıyor...' : 'Yasal Kaynakları Tara'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => (
          <div key={source.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {source.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Kategori: {source.category}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Ülke: {source.country}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kanal Sayısı: {source.channel_count}
            </p>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              M3U Bağlantısı
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicSources;