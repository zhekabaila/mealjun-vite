import { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Users, Calendar } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  topLocations: Array<{ city: string; count: number }>;
  dailyVisits: Array<{ date: string; count: number }>;
}

export default function VisitorAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    todayVisitors: 0,
    topLocations: [],
    dailyVisits: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Insight Konsumen Lokal</h1>
        <p className="text-gray-600 mt-2">Analisis pengunjung website berdasarkan lokasi geografis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <div className="text-3xl text-gray-900 mb-1">{analytics.totalVisitors}</div>
          <div className="text-sm text-gray-600">Total Pengunjung</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
              <Calendar className="text-green-600" size={24} />
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <div className="text-3xl text-gray-900 mb-1">{analytics.todayVisitors}</div>
          <div className="text-sm text-gray-600">Pengunjung Hari Ini</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center">
              <MapPin className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="text-3xl text-gray-900 mb-1">{analytics.topLocations.length}</div>
          <div className="text-sm text-gray-600">Lokasi Unik</div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <MapPin className="text-orange-600" size={20} />
            </div>
            <h3 className="text-xl text-gray-900">Top Lokasi Pengunjung</h3>
          </div>

          <div className="space-y-4">
            {analytics.topLocations.slice(0, 10).map((location, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm text-orange-600">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900">{location.city}</div>
                  <div className="text-sm text-gray-500">{location.count} pengunjung</div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                    style={{
                      width: `${(location.count / analytics.topLocations[0].count) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {analytics.topLocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada data pengunjung
            </div>
          )}
        </div>

        {/* Daily Visits Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <h3 className="text-xl text-gray-900">Kunjungan 7 Hari Terakhir</h3>
          </div>

          <div className="space-y-4">
            {analytics.dailyVisits.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full flex items-center justify-end pr-3"
                    style={{
                      width: `${Math.max((day.count / Math.max(...analytics.dailyVisits.map(d => d.count))) * 100, 10)}%`
                    }}
                  >
                    <span className="text-white text-sm">{day.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {analytics.dailyVisits.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada data kunjungan
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-xl text-gray-900 mb-4">💡 Cara Memanfaatkan Data Ini</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="mb-2">🎯 Targeting Marketing</h4>
            <p className="text-sm">Fokuskan iklan dan promosi ke kota dengan pengunjung terbanyak untuk ROI maksimal</p>
          </div>
          <div>
            <h4 className="mb-2">📦 Distribusi Produk</h4>
            <p className="text-sm">Pertimbangkan membuka toko atau reseller di lokasi dengan permintaan tinggi</p>
          </div>
          <div>
            <h4 className="mb-2">🚚 Optimasi Pengiriman</h4>
            <p className="text-sm">Siapkan stok lebih banyak untuk area dengan jumlah pengunjung konsisten</p>
          </div>
          <div>
            <h4 className="mb-2">📊 Analisis Trend</h4>
            <p className="text-sm">Monitor pola kunjungan harian untuk menentukan waktu terbaik posting konten</p>
          </div>
        </div>
      </div>
    </div>
  );
}
