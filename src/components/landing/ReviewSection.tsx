import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

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

export default function ReviewSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={18}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section id="review" className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-600 text-sm uppercase tracking-wider">Testimoni</span>
          <h2 className="text-4xl text-gray-900 mt-2 mb-4">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas kami. Simak cerita mereka tentang pengalaman dengan Mealjun
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                testimonial.is_featured ? 'border-2 border-orange-400 lg:scale-105' : 'border border-gray-100'
              }`}
            >
              {/* Featured Badge */}
              {testimonial.is_featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
                    ⭐ Pilihan Terbaik
                  </span>
                </div>
              )}

              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-orange-100">
                <Quote size={48} />
              </div>

              {/* Customer Info */}
              <div className="flex items-center space-x-4 mb-6 relative z-10">
                <ImageWithFallback
                  src={testimonial.customer_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + testimonial.customer_name}
                  alt={testimonial.customer_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                />
                <div>
                  <h4 className="text-gray-900">{testimonial.customer_name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed mb-4">
                "{testimonial.review}"
              </p>

              {/* Date */}
              <p className="text-sm text-gray-400">
                {new Date(testimonial.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {testimonials.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-gray-600">Testimoni pelanggan akan segera hadir</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl text-orange-600 mb-2">1000+</div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-orange-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Rating Rata-rata</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Repeat Order</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-orange-600 mb-2">50+</div>
            <div className="text-gray-600">Review Positif</div>
          </div>
        </div>
      </div>
    </section>
  );
}