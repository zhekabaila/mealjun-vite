import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, MapPin, X, Save, ExternalLink } from 'lucide-react'
import { projectId, publicAnonKey } from '../../utils/supabase/info'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey)

interface StoreLocation {
  id: string
  store_name: string
  store_type: string
  address: string
  city: string
  phone: string
  latitude: number
  longitude: number
  is_active: boolean
}

export default function StoreLocator() {
  const [locations, setLocations] = useState<StoreLocation[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<StoreLocation | null>(
    null
  )
  const [formData, setFormData] = useState({
    store_name: '',
    store_type: 'reseller',
    address: '',
    city: '',
    phone: '',
    latitude: 0,
    longitude: 0,
    is_active: true,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
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
        setLocations(data)
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const url = editingLocation
        ? `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/store-locations/${editingLocation.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/store-locations`

      const response = await fetch(url, {
        method: editingLocation ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchLocations()
        handleCloseModal()
      } else {
        alert('Error saving location')
      }
    } catch (error) {
      console.error('Error saving location:', error)
      alert('Error saving location')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus lokasi ini?')) return

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/store-locations/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      )

      if (response.ok) {
        await fetchLocations()
      }
    } catch (error) {
      console.error('Error deleting location:', error)
    }
  }

  const handleEdit = (location: StoreLocation) => {
    setEditingLocation(location)
    setFormData({
      store_name: location.store_name,
      store_type: location.store_type,
      address: location.address,
      city: location.city,
      phone: location.phone,
      latitude: location.latitude,
      longitude: location.longitude,
      is_active: location.is_active,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingLocation(null)
    setFormData({
      store_name: '',
      store_type: 'reseller',
      address: '',
      city: '',
      phone: '',
      latitude: 0,
      longitude: 0,
      is_active: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Digital Shelf Locator</h1>
          <p className="text-gray-600 mt-2">
            Kelola lokasi toko dan mitra reseller Anda
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Lokasi</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl text-orange-600 mb-1">
            {locations.length}
          </div>
          <div className="text-sm text-gray-600">Total Lokasi</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl text-green-600 mb-1">
            {locations.filter((l) => l.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Aktif</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl text-blue-600 mb-1">
            {locations.filter((l) => l.store_type === 'reseller').length}
          </div>
          <div className="text-sm text-gray-600">Reseller</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-2xl text-purple-600 mb-1">
            {new Set(locations.map((l) => l.city)).size}
          </div>
          <div className="text-sm text-gray-600">Kota</div>
        </div>
      </div>

      {/* Locations List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-700">
                  Nama Toko
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">
                  Tipe
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">
                  Kota
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">
                  Alamat
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <MapPin size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <div className="text-gray-900">
                          {location.store_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {location.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        location.store_type === 'official'
                          ? 'bg-purple-100 text-purple-700'
                          : location.store_type === 'reseller'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {location.store_type === 'official'
                        ? 'Toko Resmi'
                        : location.store_type === 'reseller'
                          ? 'Reseller'
                          : 'Marketplace'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{location.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {location.address}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        location.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {location.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(location)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit size={18} />
                      </button>
                      <a
                        href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {locations.length === 0 && (
          <div className="text-center py-16">
            <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Belum ada lokasi terdaftar</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
            >
              <Plus size={20} />
              <span>Tambah Lokasi Pertama</span>
            </button>
          </div>
        )}
      </div>

      {/* Info Box */}
      {/* <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
        <h3 className="text-xl text-gray-900 mb-4">🗺️ Tips Menggunakan Store Locator</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• Tambahkan koordinat GPS untuk integrasi Google Maps</div>
          <div>• Update status aktif jika toko/reseller sedang tutup</div>
          <div>• Kategorikan tipe toko untuk memudahkan pelanggan</div>
          <div>• Pastikan nomor telepon dapat dihubungi</div>
        </div>
      </div> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl text-gray-900">
                {editingLocation ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nama Toko *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.store_name}
                    onChange={(e) =>
                      setFormData({ ...formData, store_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Toko Berkah"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Tipe *
                  </label>
                  <select
                    value={formData.store_type}
                    onChange={(e) =>
                      setFormData({ ...formData, store_type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="official">Toko Resmi</option>
                    <option value="reseller">Reseller</option>
                    <option value="marketplace">Marketplace</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Alamat Lengkap *
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Jl. Contoh No. 123"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Kota *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Jakarta"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Telepon *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latitude: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="-6.200000"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longitude: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="106.816666"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  Lokasi aktif dan dapat dihubungi
                </label>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  <span>{loading ? 'Menyimpan...' : 'Simpan'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
