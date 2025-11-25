import { Target, Award, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function AboutSection() {
  // Dummy about data
  const aboutData = {
    title: 'Tentang Mealjun',
    description: 'Mealjun adalah brand UMKM yang menghadirkan keripik lumpia berkualitas tinggi dengan berbagai varian rasa. Kami berkomitmen untuk memberikan camilan sehat, higienis, dan lezat untuk keluarga Indonesia.\n\nDibuat dengan bahan-bahan pilihan dan tanpa pengawet, setiap produk Mealjun diproduksi fresh setiap hari untuk menjaga kualitas dan kerenyahan yang sempurna.',
    vision: 'Menjadi brand keripik lumpia terpercaya dan terfavorit di Indonesia',
    mission: 'Menghadirkan camilan sehat dan berkualitas tinggi dengan harga terjangkau untuk seluruh keluarga Indonesia',
    image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800'
  };

  const features = [
    {
      icon: Target,
      title: 'Visi Kami',
      description: aboutData.vision,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      title: 'Misi Kami',
      description: aboutData.mission,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Heart,
      title: 'Komitmen Kami',
      description: 'Memberikan produk berkualitas dengan harga terjangkau dan pelayanan terbaik',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm mb-4">
            Tentang Kami
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            {aboutData.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="order-2 lg:order-1">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-8">
              {aboutData.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <div className="text-gray-900 mb-1">100% Bahan Berkualitas</div>
                  <p className="text-sm text-gray-600">Dibuat dari bahan pilihan tanpa pengawet</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Proses Higienis</div>
                  <p className="text-sm text-gray-600">Diproduksi dengan standar kebersihan tinggi</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Produksi Fresh</div>
                  <p className="text-sm text-gray-600">Dibuat fresh setiap hari untuk kerenyahan maksimal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={aboutData.image_url}
                alt="Tentang Mealjun"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
