import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, X, Save } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface Testimonial {
  id: string;
  customer_name: string;
  customer_avatar: string;
  rating: number;
  review: string;
  location: string;
  date: string;
  is_featured: boolean;
}

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_avatar: '',
    rating: 5,
    review: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    is_featured: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/testimonials`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const url = editingTestimonial
        ? `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/testimonials/${editingTestimonial.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/testimonials`;

      const response = await fetch(url, {
        method: editingTestimonial ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchTestimonials();
        handleCloseModal();
      } else {
        alert('Error saving testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimoni ini?')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/testimonials/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        }
      );

      if (response.ok) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_avatar: testimonial.customer_avatar,
      rating: testimonial.rating,
      review: testimonial.review,
      location: testimonial.location,
      date: testimonial.date.split('T')[0],
      is_featured: testimonial.is_featured
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      customer_name: '',
      customer_avatar: '',
      rating: 5,
      review: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      is_featured: false
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Manajemen Testimoni</h1>
          <p className="text-gray-600 mt-2">Kelola review dan testimoni pelanggan</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
        >
          <Plus size={20} />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`bg-white rounded-2xl p-6 shadow-lg border ${
              testimonial.is_featured ? 'border-orange-400 ring-2 ring-orange-200' : 'border-gray-100'
            }`}
          >
            {testimonial.is_featured && (
              <div className="mb-3">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs">
                  ⭐ Featured
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-4">
              <ImageWithFallback
                src={testimonial.customer_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.customer_name}`}
                alt={testimonial.customer_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-gray-900">{testimonial.customer_name}</h3>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 mb-3">
              {renderStars(testimonial.rating)}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">"{testimonial.review}"</p>

            <div className="text-xs text-gray-400 mb-4">
              {new Date(testimonial.date).toLocaleDateString('id-ID')}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <Edit size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="flex-1 flex items-center justify-center space-x-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
              >
                <Trash2 size={14} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-gray-600 mb-4">Belum ada testimoni</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
          >
            <Plus size={20} />
            <span>Tambah Testimoni Pertama</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl text-gray-900">
                {editingTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nama Pelanggan *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Budi Santoso"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Lokasi *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Jakarta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">URL Avatar (opsional)</label>
                <input
                  type="url"
                  value={formData.customer_avatar}
                  onChange={(e) => setFormData({ ...formData, customer_avatar: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://... (kosongkan untuk avatar default)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Rating *</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value={5}>5 Bintang</option>
                    <option value={4}>4 Bintang</option>
                    <option value={3}>3 Bintang</option>
                    <option value={2}>2 Bintang</option>
                    <option value={1}>1 Bintang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tanggal *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Review *</label>
                <textarea
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ceritakan pengalaman pelanggan..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="is_featured" className="text-sm text-gray-700">
                  Tampilkan sebagai testimoni unggulan
                </label>
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
