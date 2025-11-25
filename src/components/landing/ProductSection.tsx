import { useState, useEffect } from 'react';
import { ShoppingBag, ExternalLink, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/products`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleRedirect = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="produk" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-600 text-sm uppercase tracking-wider">Produk Kami</span>
          <h2 className="text-4xl text-gray-900 mt-2 mb-4">
            Berbagai Pilihan Rasa Keripik Lumpia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nikmati kelezatan keripik lumpia dengan berbagai varian rasa yang menggugah selera
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-64">
                <ImageWithFallback
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.stock_status === 'low' && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                    Stok Terbatas
                  </div>
                )}
                {product.stock_status === 'out' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Habis
                  </div>
                )}
                {product.stock_status === 'available' && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Tersedia
                  </div>
                )}
                
                {/* Flavor Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-orange-600">{product.flavor}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl text-orange-600">{product.price}</span>
                  <span className="text-sm text-gray-500">/ pack</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  {product.shopee_link && (
                    <button
                      onClick={() => handleRedirect(product.shopee_link)}
                      className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors"
                    >
                      <ShoppingBag size={18} />
                      <span>Beli di Shopee</span>
                      <ExternalLink size={16} />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    {product.tiktok_link && (
                      <button
                        onClick={() => handleRedirect(product.tiktok_link)}
                        className="flex items-center justify-center space-x-1 bg-gray-900 text-white py-2 rounded-xl hover:bg-gray-800 transition-colors text-sm"
                      >
                        <span>TikTok Shop</span>
                        <ExternalLink size={14} />
                      </button>
                    )}
                    
                    {product.whatsapp_link && (
                      <button
                        onClick={() => handleRedirect(product.whatsapp_link)}
                        className="flex items-center justify-center space-x-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors text-sm"
                      >
                        <MessageCircle size={14} />
                        <span>WhatsApp</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🥟</div>
            <p className="text-gray-600">Produk sedang dalam persiapan</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-12">
          <h3 className="text-2xl text-gray-900 mb-4">
            Tertarik dengan Produk Kami?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk pemesanan dalam jumlah besar atau kerjasama reseller
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#kontak');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors shadow-lg"
          >
            <MessageCircle size={20} className="mr-2" />
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
}