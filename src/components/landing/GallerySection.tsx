import { ImageWithFallback } from '../figma/ImageWithFallback';

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
}

export default function GallerySection() {
  // Dummy gallery images
  const images: GalleryImage[] = [
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
  ];

  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm mb-4">
            Galeri
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Momen Keripik Lumpia Mealjun
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Lihat kelezatan dan kualitas produk kami dalam berbagai momen
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <ImageWithFallback
                src={image.image_url}
                alt={image.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
