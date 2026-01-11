import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';

const PanelCard = ({ panel }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Bilinmiyor';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  const calculateDaysLeft = (dateString) => {
    if (!dateString) return 'Bilinmiyor';
    const expDate = new Date(dateString);
    const now = new Date();
    const diffTime = expDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} gün` : 'Süresi dolmuş';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Kopyalandı!');
  };

  const m3uLink = `${panel.host}/get.php?username=${panel.username}&password=${panel.password}&type=m3u_plus`;

  return (
    <div className="panel-card">
      <div className="font-mono text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-blue-600">🗣 Panel: {panel.username}</span>
          <button
            onClick={() => copyToClipboard(m3uLink)}
            className="text-gray-500 hover:text-gray-700"
            title="M3U bağlantısını kopyala"
          >
            <Copy size={16} />
          </button>
        </div>

        <div className="ml-4 space-y-1">
          <div>📜 Host: {panel.host}</div>
          <div>📜 User: {panel.username}</div>
          <div>📜 Pass: {panel.password}</div>
          <div>📜 Expires: {formatDate(panel.expires_at)} ({calculateDaysLeft(panel.expires_at)})</div>
          <div>📜 Conn: Aktif:{panel.active_connections || 0} ⁃ Max:{panel.max_connections || 1}</div>
          <div>📜 Country: {panel.country || 'Bilinmiyor'}</div>
          <div>📜 Live: [{panel.live_count || 0}]</div>
          <div>📜 VOD: [{panel.vod_count || 0}]</div>
          <div>📜 Series: [{panel.series_count || 0}]</div>
        </div>

        <div className="mt-2 pt-2 border-t">
          <span className="text-green-600 font-semibold">M3U Link: </span>
          <a
            href={m3uLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 break-all"
          >
            {m3uLink}
          </a>
          <ExternalLink size={14} className="inline ml-1" />
        </div>
      </div>
    </div>
  );
};

export default PanelCard;