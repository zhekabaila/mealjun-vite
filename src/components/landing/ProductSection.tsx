import { ShoppingBag, ExternalLink, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  flavor: string;
  description: string;
  price: string;
  image_url: string;
  shopee_link: string;
  tiktok_link: string;
  whatsapp_link: string;
  stock_status: string;
}

export default function ProductSection() {
  // Dummy products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Keripik Lumpia Original',
      flavor: 'Original',
      description: 'Keripik lumpia renyah dengan rasa original yang klasik. Cocok untuk segala suasana!',
      price: 'Rp 15.000',
      image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
      shopee_link: 'https://shopee.co.id',
      tiktok_link: 'https://tiktok.com',
      whatsapp_link: 'https://wa.me/628123456789',
      stock_status: 'available'
    },
    {
      id: '2',
      name: 'Keripik Lumpia Balado',
      flavor: 'Balado',
      description: 'Keripik lumpia dengan sensasi pedas balado yang menggigit. Untuk pecinta pedas!',
      price: 'Rp 18.000',
      image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
      shopee_link: 'https://shopee.co.id',
      tiktok_link: 'https://tiktok.com',
      whatsapp_link: 'https://wa.me/628123456789',
      stock_status: 'available'
    },
    {
      id: '3',
      name: 'Keripik Lumpia Keju',
      flavor: 'Keju',
      description: 'Perpaduan sempurna antara gurih keripik dan creamy keju. Favorit keluarga!',
      price: 'Rp 20.000',
      image_url: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400',
      shopee_link: 'https://shopee.co.id',
      tiktok_link: 'https://tiktok.com',
      whatsapp_link: 'https://wa.me/628123456789',
      stock_status: 'available'
    },
    {
      id: '4',
      name: 'Keripik Lumpia BBQ',
      flavor: 'BBQ',
      description: 'Rasa BBQ smokey yang bikin nagih. Perfect untuk ngemil santai!',
      price: 'Rp 18.000',
      image_url: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?w=400',
      shopee_link: 'https://shopee.co.id',
      tiktok_link: 'https://tiktok.com',
      whatsapp_link: 'https://wa.me/628123456789',
      stock_status: 'limited'
    }
  ];

  const handleRedirect = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="produk" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm mb-4">
            Produk Kami
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Varian Rasa Keripik Lumpia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai pilihan rasa yang menggugah selera untuk menemani hari Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs ${
                  product.stock_status === 'available' 
                    ? 'bg-green-500 text-white'
                    : product.stock_status === 'limited'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {product.stock_status === 'available' ? '✓ Tersedia' : 
                   product.stock_status === 'limited' ? '⚡ Terbatas' : '✗ Habis'}
                </div>
              </div>

              <div className="p-6">
                <div className="inline-block bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-3">
                  {product.flavor}
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="text-2xl text-orange-600 mb-5">{product.price}</div>

                <div className="space-y-2">
                  {product.shopee_link && (
                    <button
                      onClick={() => handleRedirect(product.shopee_link)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      <ShoppingBag size={18} />
                      <span>Beli di Shopee</span>
                    </button>
                  )}

                  <div className="flex space-x-2">
                    {product.tiktok_link && (
                      <button
                        onClick={() => handleRedirect(product.tiktok_link)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <ExternalLink size={14} />
                        <span>TikTok</span>
                      </button>
                    )}
                    {product.whatsapp_link && (
                      <button
                        onClick={() => handleRedirect(product.whatsapp_link)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <MessageCircle size={14} />
                        <span>WA</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Produk akan segera hadir
          </div>
        )}
      </div>
    </section>
  );
}
