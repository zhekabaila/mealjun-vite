import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, MapPin, Store } from 'lucide-react';

interface StoreLocation {
  id: string;
  store_name: string;
  store_type: string;
  address: string;
  city: string;
  phone: string;
  maps_url: string;
  is_active: boolean;
}

export default function StoreLocator() {
  const [locations, setLocations] = useState<StoreLocation[]>([
    {
      id: '1',
      store_name: 'Toko Berkah',
      store_type: 'retail',
      address: 'Jl. Sudirman No. 45',
      city: 'Jakarta Selatan',
      phone: '021-123456',
      maps_url: 'https://maps.google.com',
      is_active: true
    },
    {
      id: '2',
      store_name: 'Minimarket Sejahtera',
      store_type: 'retail',
      address: 'Jl. Thamrin No. 22',
      city: 'Jakarta Pusat',
      phone: '021-234567',
      maps_url: 'https://maps.google.com',
      is_active: true
    },
    {
      id: '3',
      store_name: 'Reseller Maju',
      store_type: 'reseller',
      address: 'Jl. Asia Afrika No. 100',
      city: 'Bandung',
      phone: '022-345678',
      maps_url: 'https://maps.google.com',
      is_active: true
    },
    {
      id: '4',
      store_name: 'Toko Sumber Rezeki',
      store_type: 'retail',
      address: 'Jl. Riau No. 88',
      city: 'Bandung',
      phone: '022-456789',
      maps_url: 'https://maps.google.com',
      is_active: true
    },
    {
      id: '5',
      store_name: 'Reseller Jaya',
      store_type: 'reseller',
      address: 'Jl. Darmo No. 50',
      city: 'Surabaya',
      phone: '031-567890',
      maps_url: 'https://maps.google.com',
      is_active: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<StoreLocation | null>(null);
  const [formData, setFormData] = useState({
    store_name: '',
    store_type: 'retail',
    address: '',
    city: '',
    phone: '',
    maps_url: '',
    is_active: true
  });

  const openAddModal = () => {
    setEditingLocation(null);
    setFormData({
      store_name: '',
      store_type: 'retail',
      address: '',
      city: '',
      phone: '',
      maps_url: '',
      is_active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (location: StoreLocation) => {
    setEditingLocation(location);
    setFormData({
      store_name: location.store_name,
      store_type: location.store_type,
      address: location.address,
      city: location.city,
      phone: location.phone,
      maps_url: location.maps_url,
      is_active: location.is_active
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLocation) {
      setLocations(locations.map(l => 
        l.id === editingLocation.id 
          ? { ...editingLocation, ...formData }
          : l
      ));
      alert('Lokasi berhasil diupdate! (UI Only)');
    } else {
      const newLocation: StoreLocation = {
        id: Date.now().toString(),
        ...formData
      };
      setLocations([...locations, newLocation]);
      alert('Lokasi berhasil ditambahkan! (UI Only)');
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
      setLocations(locations.filter(l => l.id !== id));
      alert('Lokasi berhasil dihapus! (UI Only)');
    }
  };

  const toggleActive = (id: string) => {
    setLocations(locations.map(l => 
      l.id === id ? { ...l, is_active: !l.is_active } : l
    ));
  };

  // Group by city
  const groupedLocations = locations.reduce((acc: Record<string, StoreLocation[]>, loc) => {
    if (!acc[loc.city]) {
      acc[loc.city] = [];
    }
    acc[loc.city].push(loc);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Digital Shelf Locator</h1>
          <p className="text-gray-600 mt-2">Kelola lokasi toko dan reseller Mealjun</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Tambah Lokasi</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-2xl text-purple-600 mb-1">{locations.length}</div>
          <div className="text-sm text-gray-600">Total Lokasi</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-2xl text-green-600 mb-1">
            {locations.filter(l => l.is_active).length}
          </div>
          <div className="text-sm text-gray-600">Aktif</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-2xl text-blue-600 mb-1">
            {locations.filter(l => l.store_type === 'reseller').length}
          </div>
          <div className="text-sm text-gray-600">Reseller</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-2xl text-orange-600 mb-1">
            {Object.keys(groupedLocations).length}
          </div>
          <div className="text-sm text-gray-600">Kota</div>
        </div>
      </div>

      {/* Locations by City */}
      <div className="space-y-6">
        {Object.entries(groupedLocations).map(([city, cityLocations]) => (
          <div key={city} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="text-purple-600" size={24} />
              <h2 className="text-2xl text-gray-900">{city}</h2>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                {cityLocations.length} lokasi
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {cityLocations.map((location) => (
                <div key={location.id} className="border border-gray-200 rounded-xl p-4 relative">
                  {!location.is_active && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                      Nonaktif
                    </div>
                  )}

                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      location.store_type === 'retail' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <Store size={20} className={
                        location.store_type === 'retail' ? 'text-blue-600' : 'text-green-600'
                      } />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900">{location.store_name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        location.store_type === 'retail' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-green-50 text-green-700'
                      }`}>
                        {location.store_type === 'retail' ? 'Toko' : 'Reseller'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>{location.address}</p>
                    <p>📞 {location.phone}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleActive(location.id)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                        location.is_active
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {location.is_active ? 'Aktif' : 'Nonaktif'}
                    </button>
                    <button
                      onClick={() => openEditModal(location)}
                      className="flex items-center justify-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="flex items-center justify-center bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {locations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <div className="text-gray-400 mb-2">Belum ada lokasi terdaftar</div>
          <button
            onClick={openAddModal}
            className="text-purple-600 hover:text-purple-700"
          >
            Tambah lokasi pertama Anda
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">
                {editingLocation ? 'Edit Lokasi' : 'Tambah Lokasi'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nama Toko/Reseller *</label>
                <input
                  type="text"
                  value={formData.store_name}
                  onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Toko Berkah"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Tipe *</label>
                <select
                  value={formData.store_type}
                  onChange={(e) => setFormData({ ...formData, store_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="retail">Toko Retail</option>
                  <option value="reseller">Reseller</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Kota *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Jakarta Selatan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Alamat *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Jl. Sudirman No. 45"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Nomor Telepon *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="021-123456"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Google Maps URL</label>
                <input
                  type="url"
                  value={formData.maps_url}
                  onChange={(e) => setFormData({ ...formData, maps_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  Lokasi aktif
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <Save size={20} />
                  <span>{editingLocation ? 'Update' : 'Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
