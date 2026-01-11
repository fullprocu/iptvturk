import React from 'react';
import PanelCard from './PanelCard';

const ResultsTable = ({ panels, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Taranıyor...</p>
      </div>
    );
  }

  if (panels.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        Henüz sonuç bulunamadı. Tarama başlatın.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Sonuçlar ({panels.length})
      </h2>
      {panels.map((panel) => (
        <PanelCard key={panel.id} panel={panel} />
      ))}
    </div>
  );
};

export default ResultsTable;