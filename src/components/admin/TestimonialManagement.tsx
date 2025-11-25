import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string;
  rating: number;
  review_text: string;
  customer_avatar: string;
  is_featured: boolean;
}

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      customer_name: 'Bu Siti Rahma',
      customer_location: 'Jakarta',
      rating: 5,
      review_text: 'Keripik lumpianya enak banget! Anak-anak saya suka sekali. Renyah dan tidak berminyak.',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
      is_featured: true
    },
    {
      id: '2',
      customer_name: 'Pak Budi Santoso',
      customer_location: 'Bandung',
      rating: 5,
      review_text: 'Cocok buat cemilan keluarga. Harganya terjangkau dan rasanya mantap!',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
      is_featured: true
    },
    {
      id: '3',
      customer_name: 'Ibu Dewi',
      customer_location: 'Surabaya',
      rating: 5,
      review_text: 'Saya sudah langganan Mealjun. Varian rasanya banyak dan semuanya enak!',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi',
      is_featured: false
    },
    {
      id: '4',
      customer_name: 'Mas Andi',
      customer_location: 'Yogyakarta',
      rating: 4,
      review_text: 'Keripiknya crispy banget. Packaging juga rapi. Recommended!',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi',
      is_featured: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_location: '',
    rating: 5,
    review_text: '',
    customer_avatar: '',
    is_featured: false
  });

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({
      customer_name: '',
      customer_location: '',
      rating: 5,
      review_text: '',
      customer_avatar: '',
      is_featured: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_location: testimonial.customer_location,
      rating: testimonial.rating,
      review_text: testimonial.review_text,
      customer_avatar: testimonial.customer_avatar,
      is_featured: testimonial.is_featured
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => 
        t.id === editingTestimonial.id 
          ? { ...editingTestimonial, ...formData }
          : t
      ));
      alert('Testimoni berhasil diupdate! (UI Only)');
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...formData
      };
      setTestimonials([...testimonials, newTestimonial]);
      alert('Testimoni berhasil ditambahkan! (UI Only)');
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
      alert('Testimoni berhasil dihapus! (UI Only)');
    }
  };

  const toggleFeatured = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, is_featured: !t.is_featured } : t
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
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
            {testimonial.is_featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                <Star size={12} />
                <span>Featured</span>
              </div>
            )}

            <div className="flex items-start space-x-4 mb-4">
              <img
                src={testimonial.customer_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.customer_name}`}
                alt={testimonial.customer_name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg text-gray-900">{testimonial.customer_name}</h3>
                <p className="text-sm text-gray-500">{testimonial.customer_location}</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{testimonial.review_text}</p>

            <div className="flex space-x-2">
              <button
                onClick={() => toggleFeatured(testimonial.id)}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm ${
                  testimonial.is_featured
                    ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {testimonial.is_featured ? 'Unfeatured' : 'Feature'}
              </button>
              <button
                onClick={() => openEditModal(testimonial)}
                className="flex items-center justify-center bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <div className="text-gray-400 mb-2">Belum ada testimoni</div>
          <button
            onClick={openAddModal}
            className="text-yellow-600 hover:text-yellow-700"
          >
            Tambah testimoni pertama Anda
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">
                {editingTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nama Pelanggan *</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Bu Siti Rahma"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Lokasi *</label>
                <input
                  type="text"
                  value={formData.customer_location}
                  onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Jakarta"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Rating *</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={rating <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Review *</label>
                <textarea
                  value={formData.review_text}
                  onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows={4}
                  placeholder="Testimoni pelanggan..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">URL Avatar (opsional)</label>
                <input
                  type="url"
                  value={formData.customer_avatar}
                  onChange={(e) => setFormData({ ...formData, customer_avatar: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                />
                <label htmlFor="is_featured" className="text-sm text-gray-700">
                  Tampilkan sebagai testimoni unggulan
                </label>
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
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-colors"
                >
                  <Save size={20} />
                  <span>{editingTestimonial ? 'Update' : 'Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
