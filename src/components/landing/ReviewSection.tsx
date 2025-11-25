import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string;
  rating: number;
  review_text: string;
  customer_avatar: string;
}

export default function ReviewSection() {
  // Dummy testimonials
  const testimonials: Testimonial[] = [
    {
      id: '1',
      customer_name: 'Bu Siti Rahma',
      customer_location: 'Jakarta',
      rating: 5,
      review_text: 'Keripik lumpianya enak banget! Anak-anak saya suka sekali. Renyah dan tidak berminyak. Sudah langganan terus!',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti'
    },
    {
      id: '2',
      customer_name: 'Pak Budi Santoso',
      customer_location: 'Bandung',
      rating: 5,
      review_text: 'Cocok buat cemilan keluarga. Harganya terjangkau dan rasanya mantap! Recommended banget.',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi'
    },
    {
      id: '3',
      customer_name: 'Ibu Dewi',
      customer_location: 'Surabaya',
      rating: 5,
      review_text: 'Saya sudah langganan Mealjun. Varian rasanya banyak dan semuanya enak! Packaging juga rapi.',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi'
    },
    {
      id: '4',
      customer_name: 'Mas Andi',
      customer_location: 'Yogyakarta',
      rating: 5,
      review_text: 'Keripiknya crispy banget. Packaging juga rapi. Recommended untuk cemilan sehari-hari!',
      customer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi'
    }
  ];

  return (
    <section id="review" className="py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm mb-4">
            Testimoni
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Kata Pelanggan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ribuan pelanggan telah merasakan kelezatan keripik lumpia Mealjun
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.review_text}"
              </p>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.customer_avatar}
                  alt={testimonial.customer_name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="text-gray-900">{testimonial.customer_name}</div>
                  <div className="text-sm text-gray-500">{testimonial.customer_location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
