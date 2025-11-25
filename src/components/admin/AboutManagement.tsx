import { useState, useEffect } from 'react'
import { Save, Info } from 'lucide-react'
import { projectId, publicAnonKey } from '../../utils/supabase/info'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey)

export default function AboutManagement() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vision: '',
    mission: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/profile`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        alert('Error saving profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Manajemen Tentang</h1>
        <p className="text-gray-600 mt-2">
          Kelola informasi profil bisnis Mealjun
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
          ✓ Profil berhasil diperbarui!
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Info className="text-orange-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl text-gray-900">Informasi Bisnis</h2>
            <p className="text-sm text-gray-600">
              Data ini akan ditampilkan di bagian Tentang website
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Judul / Tagline *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Keripik Lumpia Berkualitas dari Tangan Terampil"
            />
            <p className="text-sm text-gray-500 mt-1">
              Judul utama yang akan muncul di bagian About
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Deskripsi Bisnis *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ceritakan tentang Mealjun, sejarah, nilai-nilai, dan komitmen bisnis Anda..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Deskripsi lengkap tentang bisnis Anda (maksimal 500 karakter)
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Visi</label>
            <textarea
              value={formData.vision}
              onChange={(e) =>
                setFormData({ ...formData, vision: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Visi jangka panjang bisnis Anda..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Visi akan ditampilkan dalam box khusus (opsional)
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Misi</label>
            <textarea
              value={formData.mission}
              onChange={(e) =>
                setFormData({ ...formData, mission: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Misi bisnis Anda..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Misi akan ditampilkan dalam box khusus (opsional)
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 w-full md:w-auto"
            >
              <Save size={20} />
              <span>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      {/* <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
        <h3 className="text-xl text-gray-900 mb-4">Preview</h3>
        <div className="bg-white rounded-xl p-6 space-y-4">
          <h4 className="text-2xl text-gray-900">{formData.title || '(Judul belum diisi)'}</h4>
          <p className="text-gray-600">{formData.description || '(Deskripsi belum diisi)'}</p>
          
          {formData.vision && (
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
              <div className="text-orange-600 mb-1">Visi Kami</div>
              <p className="text-gray-700">{formData.vision}</p>
            </div>
          )}
          
          {formData.mission && (
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
              <div className="text-amber-600 mb-1">Misi Kami</div>
              <p className="text-gray-700">{formData.mission}</p>
            </div>
          )}
        </div>
      </div> */}
    </div>
  )
}
