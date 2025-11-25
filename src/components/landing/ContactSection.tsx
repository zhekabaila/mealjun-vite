import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah diterima. (UI Only - Fungsi kirim belum tersedia)');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = {
    whatsapp: '628123456789',
    email: 'info@mealjun.com',
    address: 'Jl. Contoh No. 123, Jakarta Selatan'
  };

  return (
    <section id="kontak" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm mb-4">
            Kontak
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan? Kami siap membantu Anda!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">WhatsApp</div>
                    <a 
                      href={`https://wa.me/${contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-orange-600 transition-colors"
                    >
                      +{contactInfo.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-900 hover:text-orange-600 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Alamat</div>
                    <div className="text-gray-900">{contactInfo.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-200">
              <h4 className="text-xl text-gray-900 mb-3">Jam Operasional</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>08:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl text-gray-900 mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nama Anda *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Pesan *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={5}
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Send size={20} />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
