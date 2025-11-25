import { useState, useEffect } from 'react';
import { Heart, Award, Users, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Profile {
  title: string;
  description: string;
  vision: string;
  mission: string;
}

export default function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/profile`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'Bahan Berkualitas',
      description: 'Dipilih dengan teliti untuk cita rasa terbaik'
    },
    {
      icon: Award,
      title: 'Standar Tinggi',
      description: 'Sertifikasi BPOM dan Halal'
    },
    {
      icon: Users,
      title: 'UMKM Lokal',
      description: 'Memberdayakan ekonomi lokal'
    },
    {
      icon: TrendingUp,
      title: 'Inovasi Rasa',
      description: 'Terus berinovasi dengan varian baru'
    }
  ];

  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&h=300&fit=crop"
                alt="Proses Produksi"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop"
                alt="Keripik Lumpia"
                className="w-full h-64 object-cover rounded-2xl shadow-lg mt-8"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-orange-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="text-4xl">5+</div>
              <div className="text-sm mt-1">Tahun Pengalaman</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <span className="text-orange-600 text-sm uppercase tracking-wider">Tentang Kami</span>
              <h2 className="text-4xl text-gray-900 mt-2">
                {profile?.title || 'Keripik Lumpia Berkualitas dari Tangan Terampil'}
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {profile?.description || 'Mealjun adalah UMKM yang berdedikasi menghadirkan keripik lumpia berkualitas tinggi dengan berbagai pilihan rasa. Setiap produk dibuat dengan penuh perhatian menggunakan bahan-bahan pilihan dan resep tradisional yang telah disempurnakan.'}
            </p>

            {profile?.vision && (
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-600">
                <div className="text-orange-600 mb-2">Visi Kami</div>
                <p className="text-gray-700">{profile.vision}</p>
              </div>
            )}

            {profile?.mission && (
              <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
                <div className="text-amber-600 mb-2">Misi Kami</div>
                <p className="text-gray-700">{profile.mission}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-orange-600" size={24} />
                  </div>
                  <h3 className="text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}