import { Mail, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Telepon',
      value: '+62 812-3456-7890',
      link: 'tel:+6281234567890'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@mealjun.com',
      link: 'mailto:hello@mealjun.com'
    },
    {
      icon: MapPin,
      label: 'Alamat',
      value: 'Jl. Contoh No. 123, Jakarta Selatan',
      link: null
    },
    {
      icon: Clock,
      label: 'Jam Operasional',
      value: 'Senin - Sabtu: 08.00 - 17.00',
      link: null
    }
  ];

  const socialMedia = [
    {
      icon: Instagram,
      name: 'Instagram',
      link: 'https://instagram.com/mealjun',
      color: 'bg-gradient-to-br from-purple-600 to-pink-600'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      link: 'https://facebook.com/mealjun',
      color: 'bg-blue-600'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      link: 'https://wa.me/6281234567890',
      color: 'bg-green-600'
    }
  ];

  return (
    <section id="kontak" className="py-24 bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-600 text-sm uppercase tracking-wider">Hubungi Kami</span>
          <h2 className="text-4xl text-gray-900 mt-2 mb-4">
            Mari Terhubung dengan Mealjun
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl text-gray-900 mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <item.icon className="text-orange-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-900 hover:text-orange-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-gray-900">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl text-gray-900 mb-6">Media Sosial</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-6 rounded-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center space-y-2 shadow-lg`}
                  >
                    <social.icon size={32} />
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Order CTA */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl mb-4">Pesan Sekarang!</h3>
              <p className="mb-6 text-orange-100">
                Langsung hubungi kami via WhatsApp untuk pemesanan cepat dan mudah
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Mealjun%2C%20saya%20ingin%20memesan%20keripik%20lumpia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-orange-600 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
              >
                <MessageCircle size={20} className="mr-2" />
                Chat WhatsApp
              </a>
            </div>
          </div>

          {/* Map or Image */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
              <h3 className="text-2xl text-gray-900 mb-6">Lokasi Kami</h3>
              
              {/* Placeholder Map - In production, integrate with Google Maps */}
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-amber-400 rounded-full"></div>
                </div>
                <div className="relative text-center z-10">
                  <MapPin size={64} className="text-orange-600 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2">Jl. Contoh No. 123</p>
                  <p className="text-gray-700 mb-4">Jakarta Selatan, DKI Jakarta</p>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                    Buka di Maps
                  </button>
                </div>
              </div>

              {/* Working Hours Highlight */}
              <div className="mt-6 bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="text-orange-600" size={24} />
                  <h4 className="text-gray-900">Jam Buka</h4>
                </div>
                <div className="space-y-1 text-sm text-gray-700 ml-9">
                  <div className="flex justify-between">
                    <span>Senin - Jumat:</span>
                    <span>08.00 - 17.00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu:</span>
                    <span>08.00 - 14.00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu:</span>
                    <span className="text-red-600">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
