import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600',
      caption: 'Keripik lumpia fresh dari oven'
    },
    {
      id: '2',
      image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
      caption: 'Varian rasa yang beragam'
    },
    {
      id: '3',
      image_url: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=600',
      caption: 'Kemasan praktis dan higienis'
    },
    {
      id: '4',
      image_url: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?w=600',
      caption: 'Cocok untuk segala acara'
    },
    {
      id: '5',
      image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600',
      caption: 'Renyah dan gurih'
    },
    {
      id: '6',
      image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
      caption: 'Dibuat dengan bahan berkualitas'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image_url: '',
    caption: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      ...formData
    };
    
    setImages([newImage, ...images]);
    setIsModalOpen(false);
    setFormData({ image_url: '', caption: '' });
    alert('Foto berhasil ditambahkan! (UI Only)');
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      setImages(images.filter(img => img.id !== id));
      alert('Foto berhasil dihapus! (UI Only)');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Manajemen Galeri</h1>
          <p className="text-gray-600 mt-2">Kelola foto-foto produk dan aktivitas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Tambah Foto</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="aspect-square w-full bg-gray-100">
              <ImageWithFallback
                src={image.image_url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-3">
              <p className="text-sm text-gray-700 line-clamp-2">{image.caption}</p>
            </div>

            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <div className="text-gray-400 mb-2">Belum ada foto</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            Tambah foto pertama Anda
          </button>
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Tambah Foto</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">URL Gambar *</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Caption *</label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Caption untuk foto..."
                  required
                />
              </div>

              {formData.image_url && (
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

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
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
