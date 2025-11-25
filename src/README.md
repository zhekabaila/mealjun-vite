# Mealjun - Website Landing Page & Admin Dashboard (UI Only)

Website untuk brand UMKM "Mealjun" yang menjual keripik lumpia dengan berbagai varian rasa.

## 🎨 Fitur

### Landing Page
- **Hero Section** - Banner utama dengan call-to-action
- **Tentang** - Informasi tentang Mealjun, visi, dan misi
- **Galeri** - Foto-foto produk dan aktivitas
- **Produk** - Katalog produk dengan link ke Shopee, TikTok Shop, dan WhatsApp
- **Review** - Testimoni pelanggan
- **Kontak** - Formulir kontak dan informasi kontak

### Admin Dashboard
- **Dashboard Overview** - Statistik dan ringkasan
  - Total produk, galeri, testimoni, pengunjung
  - Analytics pengunjung berdasarkan lokasi
  - Smart Caption Generator untuk media sosial
  - Overview Digital Shelf Locator
- **Manajemen Produk** - CRUD produk dengan marketplace links
- **Manajemen Tentang** - Edit informasi halaman tentang
- **Manajemen Galeri** - CRUD foto galeri
- **Manajemen Testimoni** - CRUD testimoni pelanggan
- **Digital Shelf Locator** - Kelola lokasi toko dan reseller

## 🚀 Cara Menggunakan

### Akses Website
1. Buka aplikasi
2. Landing page akan ditampilkan secara default
3. Navigasi menggunakan menu navbar

### Akses Admin Dashboard
1. Klik tombol "Admin Login" di navbar atau akses `/admin/login`
2. Isi form login (sembarang email dan password - UI only)
3. Klik "Masuk ke Dashboard"
4. Kelola konten website melalui sidebar menu

### Fitur Admin
- **Dashboard** - Lihat statistik, analytics, caption generator, dan store locator overview
- **Produk** - Tambah, edit, hapus produk
- **Tentang** - Update informasi tentang perusahaan
- **Galeri** - Upload dan kelola foto
- **Testimoni** - Kelola review pelanggan
- **Store Locator** - Kelola lokasi toko dan reseller

## 📝 Catatan Penting

**Ini adalah UI ONLY website!**

- Semua data menggunakan **dummy data** yang tersimpan di state React
- Tidak ada koneksi ke backend/database
- Tidak ada persistensi data - data akan hilang saat refresh
- Fungsi CRUD hanya simulasi dengan `alert()`
- Admin login tidak memerlukan kredensial yang benar

## 🛠️ Implementasi Backend (Opsional)

Untuk mengimplementasikan backend, Anda perlu:

1. **Setup Database**
   - Buat tabel: products, gallery, testimonials, store_locations, about
   
2. **Buat API Endpoints**
   - GET/POST/PUT/DELETE untuk setiap tabel
   - Authentication untuk admin
   
3. **Update Komponen**
   - Ganti dummy data dengan `fetch()` ke API
   - Implementasikan error handling
   - Tambahkan loading states
   
4. **Admin Authentication**
   - Implementasi login yang sesungguhnya
   - Session management
   - Protected routes

## 🎯 Struktur Folder

```
/
├── components/
│   ├── admin/           # Komponen admin dashboard
│   ├── landing/         # Komponen landing page
│   └── figma/          # Komponen shared
├── pages/              # Halaman utama
├── styles/             # Global styles
└── README.md           # Dokumentasi ini
```

## 💡 Tips

- Semua komponen sudah responsive
- Gunakan dummy data untuk testing UI
- Modifikasi warna dan styling di `globals.css`
- Tambahkan gambar produk melalui URL
- Caption Generator memberikan 3 pilihan tone: Ramah, Profesional, Main-main

## 🎨 Desain

Website menggunakan:
- **Warna utama**: Orange & Amber (brand color)
- **Tipografi**: Clean dan modern
- **UI Components**: Rounded corners, shadows, gradients
- **Responsif**: Mobile-first design

---

**Dibuat untuk UMKM Mealjun - Keripik Lumpia Berkualitas** 🥟✨
