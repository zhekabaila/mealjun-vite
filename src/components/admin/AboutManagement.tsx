import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AboutManagement() {
  const [formData, setFormData] = useState({
    title: 'Tentang Mealjun',
    description: 'Mealjun adalah brand UMKM yang menghadirkan keripik lumpia berkualitas tinggi dengan berbagai varian rasa. Kami berkomitmen untuk memberikan camilan sehat, higienis, dan lezat untuk keluarga Indonesia.\n\nDibuat dengan bahan-bahan pilihan dan tanpa pengawet, setiap produk Mealjun diproduksi fresh setiap hari untuk menjaga kualitas dan kerenyahan yang sempurna.',
    vision: 'Menjadi brand keripik lumpia terpercaya dan terfavorit di Indonesia',
    mission: 'Menghadirkan camilan sehat dan berkualitas tinggi dengan harga terjangkau untuk seluruh keluarga Indonesia',
    image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800',
    whatsapp_number: '628123456789',
    email: 'info@mealjun.com',
    address: 'Jl. Contoh No. 123, Jakarta Selatan'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Informasi Tentang berhasil diupdate! (UI Only)');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Manajemen Halaman Tentang</h1>
        <p className="text-gray-600 mt-2">Edit informasi tentang Mealjun</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Judul *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Tentang Mealjun"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Deskripsi *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={6}
            placeholder="Deskripsi tentang Mealjun..."
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Visi *</label>
            <textarea
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
              placeholder="Visi perusahaan..."
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Misi *</label>
            <textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
              placeholder="Misi perusahaan..."
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">URL Gambar *</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-xl text-gray-900 mb-4">Informasi Kontak</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Nomor WhatsApp *</label>
              <input
                type="text"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="628123456789"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="info@mealjun.com"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-700 mb-2">Alamat *</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
              placeholder="Alamat lengkap..."
              required
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-colors shadow-lg w-full md:w-auto"
          >
            <Save size={20} />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
}
