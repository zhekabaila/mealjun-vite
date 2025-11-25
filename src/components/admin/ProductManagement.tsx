import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Save, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

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
  const [products, setProducts] = useState<Product[]>([]);
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/products`,
        {
          headers: {
            'Authorization': `Bearer ${session?.access_token || publicAnonKey}`
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const url = editingProduct
        ? `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/products/${editingProduct.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/products`;

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchProducts();
        handleCloseModal();
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        }
      );

      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600 mt-2">Kelola produk keripik lumpia Anda</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <ImageWithFallback
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm">
                {product.flavor}
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </div>
              
              <div className="text-orange-600">{product.price}</div>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  product.stock_status === 'available' ? 'bg-green-100 text-green-700' :
                  product.stock_status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.stock_status === 'available' ? 'Tersedia' :
                   product.stock_status === 'low' ? 'Stok Terbatas' : 'Habis'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl text-gray-900">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nama Produk *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Keripik Lumpia Original"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Varian Rasa *</label>
                  <input
                    type="text"
                    required
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Original"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Deskripsi *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Deskripsi produk..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Harga *</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Rp 25.000"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Status Stok *</label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="available">Tersedia</option>
                    <option value="low">Stok Terbatas</option>
                    <option value="out">Habis</option>
                  </select>
                </div>
              </div>

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
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Link Shopee</label>
                <input
                  type="url"
                  value={formData.shopee_link}
                  onChange={(e) => setFormData({ ...formData, shopee_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://shopee.co.id/..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Link TikTok Shop</label>
                <input
                  type="url"
                  value={formData.tiktok_link}
                  onChange={(e) => setFormData({ ...formData, tiktok_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://vt.tiktok.com/..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Link WhatsApp</label>
                <input
                  type="url"
                  value={formData.whatsapp_link}
                  onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://wa.me/..."
                />
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
