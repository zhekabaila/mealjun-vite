import { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Save, X } from 'lucide-react';
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

export default function ProductManagement() {
  // Dummy products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Keripik Lumpia Original',
      flavor: 'Original',
      description: 'Keripik lumpia renyah dengan rasa original yang klasik',
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
      description: 'Keripik lumpia dengan sensasi pedas balado yang menggigit',
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
      description: 'Perpaduan sempurna antara gurih keripik dan creamy keju',
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
      description: 'Rasa BBQ smokey yang bikin nagih',
      price: 'Rp 18.000',
      image_url: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?w=400',
      shopee_link: 'https://shopee.co.id',
      tiktok_link: 'https://tiktok.com',
      whatsapp_link: 'https://wa.me/628123456789',
      stock_status: 'limited'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    flavor: '',
    description: '',
    price: '',
    image_url: '',
    shopee_link: '',
    tiktok_link: '',
    whatsapp_link: '',
    stock_status: 'available'
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      flavor: '',
      description: '',
      price: '',
      image_url: '',
      shopee_link: '',
      tiktok_link: '',
      whatsapp_link: '',
      stock_status: 'available'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      flavor: product.flavor,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      shopee_link: product.shopee_link,
      tiktok_link: product.tiktok_link,
      whatsapp_link: product.whatsapp_link,
      stock_status: product.stock_status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...formData }
          : p
      ));
      alert('Produk berhasil diupdate! (UI Only)');
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData
      };
      setProducts([...products, newProduct]);
      alert('Produk berhasil ditambahkan! (UI Only)');
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(p => p.id !== id));
      alert('Produk berhasil dihapus! (UI Only)');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600 mt-2">Kelola produk keripik lumpia Mealjun</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
              <ImageWithFallback
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs ${
                product.stock_status === 'available' 
                  ? 'bg-green-500 text-white'
                  : product.stock_status === 'limited'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {product.stock_status === 'available' ? 'Tersedia' : 
                 product.stock_status === 'limited' ? 'Terbatas' : 'Habis'}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl text-gray-900 mb-2">{product.name}</h3>
              <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-3">
                {product.flavor}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="text-2xl text-orange-600 mb-4">{product.price}</div>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.shopee_link && (
                  <a
                    href={product.shopee_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-lg hover:bg-orange-100"
                  >
                    <ExternalLink size={12} />
                    <span>Shopee</span>
                  </a>
                )}
                {product.tiktok_link && (
                  <a
                    href={product.tiktok_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
                  >
                    <ExternalLink size={12} />
                    <span>TikTok</span>
                  </a>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <div className="text-gray-400 mb-2">Belum ada produk</div>
          <button
            onClick={openAddModal}
            className="text-orange-600 hover:text-orange-700"
          >
            Tambah produk pertama Anda
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nama Produk *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Keripik Lumpia Original"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Varian Rasa *</label>
                  <input
                    type="text"
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Original"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Deskripsi *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Deskripsi produk..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Harga *</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Rp 15.000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Status Stok *</label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="available">Tersedia</option>
                    <option value="limited">Terbatas</option>
                    <option value="out_of_stock">Habis</option>
                  </select>
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

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg text-gray-900 mb-4">Link Marketplace</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Shopee Link</label>
                    <input
                      type="url"
                      value={formData.shopee_link}
                      onChange={(e) => setFormData({ ...formData, shopee_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://shopee.co.id/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">TikTok Shop Link</label>
                    <input
                      type="url"
                      value={formData.tiktok_link}
                      onChange={(e) => setFormData({ ...formData, tiktok_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://tiktok.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">WhatsApp Link</label>
                    <input
                      type="url"
                      value={formData.whatsapp_link}
                      onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://wa.me/628123456789"
                    />
                  </div>
                </div>
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
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  <Save size={20} />
                  <span>{editingProduct ? 'Update' : 'Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
