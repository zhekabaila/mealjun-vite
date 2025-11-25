import { useState } from 'react';
import { Sparkles, Copy, Check, Wand2 } from 'lucide-react';

export default function CaptionGenerator() {
  const [formData, setFormData] = useState({
    productName: '',
    flavor: '',
    targetAudience: 'general',
    tone: 'friendly',
    platform: 'instagram',
    includeHashtags: true,
    includeEmoji: true
  });
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const generateCaptions = () => {
    setLoading(true);

    // Simulate caption generation with templates
    setTimeout(() => {
      const captions: string[] = [];
      const { productName, flavor, targetAudience, tone, platform, includeHashtags, includeEmoji } = formData;

      const emoji = includeEmoji ? '🥟✨🔥💯😋' : '';
      const hashtags = includeHashtags
        ? '\n\n#mealjun #keripiklumpia #camilansehat #makananringan #jajananmurah #oleholeh #umkm #produkindonesia #snacktime #makananindonesia'
        : '';

      // Template 1: Friendly & Engaging
      if (tone === 'friendly' || tone === 'playful') {
        captions.push(
          `${emoji[0] || ''} Siapa yang suka cemilan renyah? ${emoji[1] || ''}\n\n` +
          `Kenalan yuk sama ${productName} varian ${flavor}! ` +
          `Keripik lumpia yang bikin nagih, cocok banget buat temen nonton, ngemil sore, atau oleh-oleh special. ` +
          `Kriuk di luar, gurih di dalam ${emoji[4] || ''}\n\n` +
          `📦 Order sekarang, stok terbatas!\n` +
          `💬 DM untuk info lebih lanjut${hashtags}`
        );
      }

      // Template 2: Professional & Informative
      if (tone === 'professional' || tone === 'friendly') {
        captions.push(
          `${emoji[1] || ''} ${productName} - ${flavor} ${emoji[1] || ''}\n\n` +
          `Dibuat dengan bahan pilihan berkualitas tinggi, tanpa pengawet, dan higienis. ` +
          `Setiap gigitan memberikan sensasi renyah yang sempurna. ` +
          `Cocok untuk segala acara: arisan, gathering, atau sekadar cemilan di rumah.\n\n` +
          `✅ BPOM & Halal\n` +
          `✅ Produksi Fresh\n` +
          `✅ Kemasan Praktis\n\n` +
          `Pesan sekarang dan rasakan kenikmatannya!${hashtags}`
        );
      }

      // Template 3: Playful & Fun
      if (tone === 'playful') {
        captions.push(
          `${emoji[2] || ''} KRIUUUK! ${emoji[2] || ''}\n\n` +
          `Itu suara ${productName} ${flavor} yang lagi nunggu kamu cobain! ` +
          `Enak, murah, dan bikin ketagihan. Udah coba belum?\n\n` +
          `Yang belum, rugi banget deh! ${emoji[4] || ''}\n` +
          `Yang udah, pasti mau lagi kan? ${emoji[3] || ''}\n\n` +
          `Yuk order sekarang! Stok menipis nih~\n` +
          `Klik link di bio atau chat langsung!${hashtags}`
        );
      }

      // Template 4: Story/Emotional
      captions.push(
        `${emoji[4] || ''} Kenapa ${productName} ${flavor} istimewa?\n\n` +
        `Karena setiap kemasan dibuat dengan cinta dan dedikasi UMKM lokal. ` +
        `Kami percaya, makanan enak tidak harus mahal. ` +
        `Yang penting: kualitas terjaga, rasa autentik, dan harga bersahabat.\n\n` +
        `Dengan membeli produk kami, kamu juga mendukung ekonomi lokal dan ` +
        `membantu UMKM terus berkembang ${emoji[3] || ''}\n\n` +
        `Terima kasih sudah jadi bagian dari perjalanan Mealjun!${hashtags}`
      );

      // Template 5: Promo/CTA Focused
      captions.push(
        `${emoji[2] || ''} PROMO SPESIAL! ${emoji[2] || ''}\n\n` +
        `${productName} ${flavor} sekarang tersedia dengan harga terbaik!\n\n` +
        `🎁 Beli 3 dapat bonus 1\n` +
        `🎁 Gratis ongkir area tertentu\n` +
        `🎁 Kemasan gift untuk kado\n\n` +
        `Jangan sampai kehabisan! Order sekarang:\n` +
        `📱 WhatsApp: (klik link di bio)\n` +
        `🛒 Shopee: Mealjun Official\n` +
        `🛍️ TikTok Shop: @mealjun${hashtags}`
      );

      setGeneratedCaptions(captions);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Smart Caption Generator</h1>
        <p className="text-gray-600 mt-2">Buat caption menarik untuk media sosial dengan AI</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Wand2 className="text-purple-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl text-gray-900">Pengaturan</h2>
                <p className="text-sm text-gray-500">Sesuaikan caption Anda</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nama Produk *</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Keripik Lumpia Mealjun"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Varian Rasa</label>
                <input
                  type="text"
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Original"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Target Audiens</label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="general">Umum</option>
                  <option value="young">Anak Muda</option>
                  <option value="family">Keluarga</option>
                  <option value="reseller">Reseller/Mitra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Tone Caption</label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="friendly">Ramah</option>
                  <option value="professional">Profesional</option>
                  <option value="playful">Main-main</option>
                  <option value="emotional">Emosional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                  <option value="whatsapp">WhatsApp Status</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeHashtags"
                    checked={formData.includeHashtags}
                    onChange={(e) => setFormData({ ...formData, includeHashtags: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="includeHashtags" className="text-sm text-gray-700">
                    Sertakan hashtag
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeEmoji"
                    checked={formData.includeEmoji}
                    onChange={(e) => setFormData({ ...formData, includeEmoji: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="includeEmoji" className="text-sm text-gray-700">
                    Sertakan emoji
                  </label>
                </div>
              </div>

              <button
                onClick={generateCaptions}
                disabled={!formData.productName || loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={20} />
                <span>{loading ? 'Membuat...' : 'Generate Caption'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Generated Captions */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {generatedCaptions.length === 0 && !loading && (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                <Sparkles size={64} className="text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">Siap Membuat Caption?</h3>
                <p className="text-gray-600">
                  Isi formulir di sebelah kiri dan klik "Generate Caption" untuk membuat caption otomatis
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Sedang membuat caption...</p>
              </div>
            )}

            {generatedCaptions.map((caption, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-sm text-purple-600">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-600">Varian {index + 1}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(caption, index)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      copiedIndex === index
                        ? 'bg-green-50 text-green-600'
                        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={16} />
                        <span className="text-sm">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span className="text-sm">Salin</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-gray-700 whitespace-pre-wrap">
                  {caption}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{caption.length} karakter</span>
                  <span>{caption.split(' ').length} kata</span>
                </div>
              </div>
            ))}
          </div>

          {generatedCaptions.length > 0 && (
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg text-gray-900 mb-3">💡 Tips Menggunakan Caption</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Edit dan sesuaikan caption sesuai gaya brand Anda</li>
                <li>• Tambahkan call-to-action yang jelas</li>
                <li>• Gunakan hashtag yang relevan dengan produk</li>
                <li>• Posting di waktu optimal (peak hours)</li>
                <li>• Sertakan visual/foto produk yang menarik</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
