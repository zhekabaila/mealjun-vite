import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: string;
}

export default function GalleryManagement() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image_url: '',
    caption: '',
    category: 'produk'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/gallery`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/gallery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        await fetchGallery();
        handleCloseModal();
      } else {
        alert('Error adding image');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Error adding image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/gallery/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        }
      );

      if (response.ok) {
        await fetchGallery();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      image_url: '',
      caption: '',
      category: 'produk'
    });
  };

  const categories = ['produk', 'proses', 'event', 'testimoni', 'lainnya'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Manajemen Galeri</h1>
          <p className="text-gray-600 mt-2">Kelola foto produk dan aktivitas bisnis</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Foto</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="aspect-square overflow-hidden">
              <ImageWithFallback
                src={item.image_url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4">
              <div className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full mb-2">
                {item.category}
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">{item.caption}</p>
            </div>

            {/* Delete button */}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-gray-600 mb-4">Belum ada foto di galeri</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
          >
            <Plus size={20} />
            <span>Tambah Foto Pertama</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Tambah Foto Baru</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">URL Gambar *</label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://..."
                />
                {formData.image_url && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Caption *</label>
                <textarea
                  required
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Deskripsi foto..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Kategori *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
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
  );
}
