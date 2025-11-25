import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { X } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: string;
}

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

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

  const categories = ['all', ...Array.from(new Set(gallery.map(item => item.category)))];
  
  const filteredGallery = activeCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  return (
    <section id="galeri" className="py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-600 text-sm uppercase tracking-wider">Galeri</span>
          <h2 className="text-4xl text-gray-900 mt-2 mb-4">
            Lihat Produk & Kegiatan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dokumentasi proses produksi, produk, dan momen spesial bersama pelanggan setia Mealjun
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'Semua' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <ImageWithFallback
                src={item.image_url}
                alt={item.caption}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-3 py-1 bg-orange-600 text-white text-sm rounded-full mb-2">
                    {item.category}
                  </div>
                  <p className="text-white">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-600">Belum ada foto di kategori ini</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors"
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full">
            <ImageWithFallback
              src={selectedImage.image_url}
              alt={selectedImage.caption}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="bg-white p-6 rounded-b-lg">
              <div className="inline-block px-3 py-1 bg-orange-600 text-white text-sm rounded-full mb-2">
                {selectedImage.category}
              </div>
              <p className="text-gray-700">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}