import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import ResultsTable from '../components/ResultsTable';
import axios from 'axios';
import config from '../config';

const Dashboard = () => {
  const [panels, setPanels] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPanels();
  }, [filters]);

  const fetchPanels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/panels`, { params: filters });
      setPanels(response.data);
    } catch (error) {
      console.error('Panel getirme hatası:', error);
    }
    setLoading(false);
  };

  const handleScan = async (scanType) => {
    setLoading(true);
    try {
      await axios.post(`${config.API_BASE_URL}/api/scan`, { type: scanType, filters });
      fetchPanels(); // Yenile
    } catch (error) {
      console.error('Tarama hatası:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        IPTV Turk Scanner
      </h1>

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        onScan={handleScan}
        loading={loading}
      />

      <ResultsTable panels={panels} loading={loading} />
    </div>
  );
};

export default Dashboard;