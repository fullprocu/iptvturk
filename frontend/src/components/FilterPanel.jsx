import React from 'react';

const FilterPanel = ({ filters, setFilters, onScan, loading }) => {
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const categories = ['SPORTS', 'MOVIES', 'SERIES', 'ADULT', 'KIDS', 'MUSIC', 'NEWS', 'DOCUMENTARY'];
  const countries = ['TR', 'DE', 'US'];
  const platforms = ['Exxen', 'Tabii', 'Netflix', 'BeIN', 'D-Smart', 'Tivibu', 'BluTV', 'Gain TV', 'TV+', 'Puhu'];

  return (
    <div className="filter-panel">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filtreler</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={filters.country || ''}
          onChange={(e) => handleFilterChange('country', e.target.value)}
        >
          <option value="">Tüm Ülkeler</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={filters.platform || ''}
          onChange={(e) => handleFilterChange('platform', e.target.value)}
        >
          <option value="">Tüm Platformlar</option>
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={filters.max_connections || ''}
          onChange={(e) => handleFilterChange('max_connections', e.target.value)}
        >
          <option value="">Tüm Bağlantılar</option>
          <option value="1">1 Bağlantı</option>
          <option value="2">2+ Bağlantı</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.turkish_content || false}
            onChange={(e) => handleFilterChange('turkish_content', e.target.checked)}
            className="mr-2"
          />
          Türkçe İçerik
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.fast_only || false}
            onChange={(e) => handleFilterChange('fast_only', e.target.checked)}
            className="mr-2"
          />
          Sadece Hızlı Akışlar
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onScan('panel')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          Panel Tara
        </button>
        <button
          onClick={() => onScan('m3u')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          M3U Tara
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;