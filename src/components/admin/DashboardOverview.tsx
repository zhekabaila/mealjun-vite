import { useState, useEffect } from 'react'
import {
  ShoppingBag,
  Image,
  Star,
  TrendingUp,
  Users,
  Package,
  MapPin,
  Sparkles,
  Copy,
  Check,
  Wand2,
  Calendar,
  BarChart3,
} from 'lucide-react'
import { projectId, publicAnonKey } from '../../utils/supabase/info'

interface AnalyticsData {
  totalVisitors: number
  todayVisitors: number
  topLocations: Array<{ city: string; count: number }>
  dailyVisits: Array<{ date: string; count: number }>
}

interface StoreLocation {
  id: string
  city: string
  store_name: string
  store_type: string
  is_active: boolean
}

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    products: 0,
    gallery: 0,
    testimonials: 0,
    visitors: 0,
    topProduct: '',
    topLocation: '',
  })

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    todayVisitors: 0,
    topLocations: [],
    dailyVisits: [],
  })

  const [storeLocations, setStoreLocations] = useState<StoreLocation[]>([])

  // Caption Generator State
  const [captionForm, setCaptionForm] = useState({
    productName: '',
    flavor: '',
    tone: 'friendly',
    includeEmoji: true,
  })
  const [generatedCaption, setGeneratedCaption] = useState('')
  const [copiedCaption, setCopiedCaption] = useState(false)

  useEffect(() => {
    fetchStats()
    fetchAnalytics()
    fetchStoreLocations()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/dashboard-stats`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/analytics`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  const fetchStoreLocations = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/store-locations`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setStoreLocations(data)
      }
    } catch (error) {
      console.error('Error fetching store locations:', error)
    }
  }

  const generateCaption = () => {
    const { productName, flavor, tone, includeEmoji } = captionForm
    const emoji = includeEmoji ? '🥟✨' : ''

    let caption = ''
    if (tone === 'friendly') {
      caption = `${emoji} Siapa yang suka cemilan renyah?\n\nKenalan yuk sama ${productName} varian ${flavor}! Keripik lumpia yang bikin nagih, cocok banget buat temen nonton atau ngemil sore. Kriuk di luar, gurih di dalam! 😋\n\n📦 Order sekarang, stok terbatas!\n💬 DM untuk info lebih lanjut\n\n#mealjun #keripiklumpia #camilansehat #snacktime`
    } else if (tone === 'professional') {
      caption = `${emoji} ${productName} - ${flavor}\n\nDibuat dengan bahan pilihan berkualitas tinggi, tanpa pengawet, dan higienis. Setiap gigitan memberikan sensasi renyah yang sempurna.\n\n✅ BPOM & Halal\n✅ Produksi Fresh\n✅ Kemasan Praktis\n\nPesan sekarang dan rasakan kenikmatannya!\n\n#mealjun #keripiklumpia #produkindonesia`
    } else {
      caption = `🔥 KRIUUUK!\n\nItu suara ${productName} ${flavor} yang lagi nunggu kamu cobain! Enak, murah, dan bikin ketagihan. Udah coba belum?\n\nYang belum, rugi banget deh! 💯\nYang udah, pasti mau lagi kan? 😎\n\nYuk order sekarang!\n\n#mealjun #keripiklumpia #snacktime`
    }

    setGeneratedCaption(caption)
  }

  const copyCaption = () => {
    navigator.clipboard.writeText(generatedCaption)
    setCopiedCaption(true)
    setTimeout(() => setCopiedCaption(false), 2000)
  }

  const statCards = [
    {
      icon: ShoppingBag,
      label: 'Total Produk',
      value: stats.products,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Image,
      label: 'Foto Galeri',
      value: stats.gallery,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Star,
      label: 'Testimoni',
      value: stats.testimonials,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Users,
      label: 'Pengunjung Hari Ini',
      value: stats.visitors,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
  ]

  // Group store locations by city
  const locationsByCity = storeLocations.reduce(
    (acc: Record<string, number>, loc) => {
      acc[loc.city] = (acc[loc.city] || 0) + 1
      return acc
    },
    {}
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Ringkasan aktivitas dan statistik website Mealjun
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${stat.bgColor} w-12 h-12 rounded-xl flex items-center justify-center`}
              >
                <stat.icon
                  className={`${stat.color.replace('bg-', 'text-')}`}
                  size={24}
                />
              </div>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <Package className="text-orange-600" size={20} />
            </div>
            <h3 className="text-lg text-gray-900">Produk Terpopuler</h3>
          </div>
          <div className="text-2xl text-orange-600 mb-2">
            {stats.topProduct || 'Belum ada data'}
          </div>
          <p className="text-sm text-gray-600">
            Paling banyak diklik minggu ini
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg text-gray-900">Lokasi Pengunjung Teratas</h3>
          </div>
          <div className="text-2xl text-blue-600 mb-2">
            {stats.topLocation || 'Belum ada data'}
          </div>
          <p className="text-sm text-gray-600">
            Kota dengan pengunjung terbanyak
          </p>
        </div>
      </div>

      {/* VISITOR ANALYTICS SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl text-gray-900">Insight Konsumen Lokal</h2>
              <p className="text-sm text-gray-600">
                Analisis pengunjung berdasarkan lokasi geografis
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <Users className="text-blue-600" size={32} />
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">
              {analytics.totalVisitors}
            </div>
            <div className="text-sm text-gray-700">Total Pengunjung</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="text-green-600" size={32} />
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">
              {analytics.todayVisitors}
            </div>
            <div className="text-sm text-gray-700">Pengunjung Hari Ini</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <MapPin className="text-orange-600" size={32} />
            </div>
            <div className="text-3xl text-gray-900 mb-1">
              {analytics.topLocations.length}
            </div>
            <div className="text-sm text-gray-700">Lokasi Unik</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Locations */}
          <div>
            <h3 className="text-lg text-gray-900 mb-4">
              🗺️ Top 5 Lokasi Pengunjung
            </h3>
            <div className="space-y-3">
              {analytics.topLocations.slice(0, 5).map((location, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm text-orange-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900">{location.city}</div>
                    <div className="text-sm text-gray-500">
                      {location.count} pengunjung
                    </div>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                      style={{
                        width: `${analytics.topLocations.length > 0 ? (location.count / analytics.topLocations[0].count) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              {analytics.topLocations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Belum ada data pengunjung
                </div>
              )}
            </div>
          </div>

          {/* Daily Visits */}
          <div>
            <h3 className="text-lg text-gray-900 mb-4">
              📊 Kunjungan 7 Hari Terakhir
            </h3>
            <div className="space-y-3">
              {analytics.dailyVisits.map((day, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-20 text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString('id-ID', {
                      weekday: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full flex items-center justify-end pr-3"
                      style={{
                        width: `${Math.max((day.count / Math.max(...analytics.dailyVisits.map((d) => d.count), 1)) * 100, 10)}%`,
                      }}
                    >
                      <span className="text-white text-sm">{day.count}</span>
                    </div>
                  </div>
                </div>
              ))}
              {analytics.dailyVisits.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Belum ada data kunjungan
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STORE LOCATOR OVERVIEW SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl text-gray-900">
                Digital Shelf Locator - Overview
              </h2>
              <p className="text-sm text-gray-600">
                Ringkasan lokasi toko dan mitra
              </p>
            </div>
          </div>
          <a
            href="/admin/store-locator"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Kelola Lokasi →
          </a>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="text-2xl text-purple-600 mb-1">
              {storeLocations.length}
            </div>
            <div className="text-sm text-gray-700">Total Lokasi</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="text-2xl text-green-600 mb-1">
              {storeLocations.filter((l) => l.is_active).length}
            </div>
            <div className="text-sm text-gray-700">Aktif</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
            <div className="text-2xl text-blue-600 mb-1">
              {storeLocations.filter((l) => l.store_type === 'reseller').length}
            </div>
            <div className="text-sm text-gray-700">Reseller</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <div className="text-2xl text-orange-600 mb-1">
              {Object.keys(locationsByCity).length}
            </div>
            <div className="text-sm text-gray-700">Kota</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg text-gray-900 mb-4">
            📍 Daerah Toko & Reseller
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(locationsByCity).map(([city, count]) => (
              <div
                key={city}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-purple-600" />
                  <div className="flex-1">
                    <div className="text-gray-900">{city}</div>
                    <div className="text-xs text-gray-500">{count} lokasi</div>
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(locationsByCity).length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Belum ada lokasi terdaftar
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CAPTION GENERATOR SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 rounded-xl flex items-center justify-center">
            <Sparkles className="text-purple-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl text-gray-900">Smart Caption Generator</h2>
            <p className="text-sm text-gray-600">
              Buat caption menarik untuk media sosial
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                value={captionForm.productName}
                onChange={(e) =>
                  setCaptionForm({
                    ...captionForm,
                    productName: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Keripik Lumpia Mealjun"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Varian Rasa
              </label>
              <input
                type="text"
                value={captionForm.flavor}
                onChange={(e) =>
                  setCaptionForm({ ...captionForm, flavor: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Original"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Tone Caption
              </label>
              <select
                value={captionForm.tone}
                onChange={(e) =>
                  setCaptionForm({ ...captionForm, tone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="friendly">Ramah</option>
                <option value="professional">Profesional</option>
                <option value="playful">Main-main</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeEmoji"
                checked={captionForm.includeEmoji}
                onChange={(e) =>
                  setCaptionForm({
                    ...captionForm,
                    includeEmoji: e.target.checked,
                  })
                }
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="includeEmoji" className="text-sm text-gray-700">
                Sertakan emoji
              </label>
            </div>

            <button
              onClick={generateCaption}
              disabled={!captionForm.productName}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              <Wand2 size={20} />
              <span>Generate Caption</span>
            </button>
          </div>

          {/* Result */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm text-gray-700">
                Caption yang Dihasilkan
              </label>
              {generatedCaption && (
                <button
                  onClick={copyCaption}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors text-sm ${
                    copiedCaption
                      ? 'bg-green-50 text-green-600'
                      : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  {copiedCaption ? (
                    <>
                      <Check size={16} />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl flex items-center justify-center p-4 border border-gray-200 min-h-[300px]">
              {generatedCaption ? (
                <div className="text-gray-700 whitespace-pre-wrap">
                  {generatedCaption}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Sparkles size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Isi form dan klik Generate Caption</p>
                  </div>
                </div>
              )}
            </div>
            {generatedCaption && (
              <div className="mt-3 text-sm text-gray-500">
                {generatedCaption.length} karakter •{' '}
                {generatedCaption.split(' ').length} kata
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
        <h3 className="text-xl text-gray-900 mb-4">Aksi Cepat</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow text-center"
          >
            <ShoppingBag className="text-orange-600 mx-auto mb-2" size={24} />
            <div className="text-gray-900">Tambah Produk</div>
          </a>
          <a
            href="/admin/gallery"
            className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow text-center"
          >
            <Image className="text-blue-600 mx-auto mb-2" size={24} />
            <div className="text-gray-900">Upload Foto</div>
          </a>
          <a
            href="/admin/testimonials"
            className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow text-center"
          >
            <Star className="text-yellow-600 mx-auto mb-2" size={24} />
            <div className="text-gray-900">Kelola Testimoni</div>
          </a>
        </div>
      </div>
    </div>
  )
}
