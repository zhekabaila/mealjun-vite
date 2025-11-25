# Mealjun Website - Setup Instructions

## 🎉 Welcome to Your Mealjun Website!

This is a complete website and admin dashboard for your UMKM "Mealjun" spring roll chips business. The website includes:

### 🌐 Landing Page Features
- **Hero Section**: Eye-catching introduction with product showcase
- **About Section**: Your business story, vision, and mission
- **Gallery**: Photo gallery of products and business activities
- **Products**: Product catalog with marketplace integrations (Shopee, TikTok Shop, WhatsApp)
- **Reviews**: Customer testimonials and ratings
- **Contact**: Contact information and location details

### 🎛️ Admin Dashboard Features
- **Product Management**: Add, edit, delete products with marketplace links
- **About Management**: Update business profile, vision, and mission
- **Gallery Management**: Upload and manage photos
- **Testimonial Management**: Manage customer reviews
- **Visitor Analytics**: Track visitor origins and behavior
- **Store Locator**: Manage store and reseller locations
- **Caption Generator**: AI-powered social media caption creator

---

## 🚀 First Time Setup

### Step 1: Create Your Admin Account

Since this is your first time, you need to create an admin account. Follow these steps:

1. **Test the signup endpoint** using this curl command in your terminal:

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-513f45b4/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "admin@mealjun.com",
    "password": "YourSecurePassword123!",
    "name": "Admin Mealjun"
  }'
```

**Replace:**
- `YOUR_PROJECT_ID` with your Supabase project ID
- `YOUR_ANON_KEY` with your Supabase anon key
- Change the email, password, and name to your preferred credentials

**OR use this JavaScript in browser console:**

```javascript
// Open your website, then run this in browser console (F12)
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-513f45b4/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  },
  body: JSON.stringify({
    email: 'admin@mealjun.com',
    password: 'YourSecurePassword123!',
    name: 'Admin Mealjun'
  })
}).then(res => res.json()).then(data => console.log(data));
```

2. **After successful signup**, go to `/admin/login` and login with your credentials

---

## 📋 Getting Started Checklist

After logging in to the admin dashboard, follow this checklist:

### 1. ✅ Update Business Profile
- Go to **Tentang** (About) section
- Fill in:
  - Business title/tagline
  - Business description
  - Vision (optional)
  - Mission (optional)

### 2. ✅ Add Your Products
- Go to **Produk** (Products) section
- Click "Tambah Produk" (Add Product)
- For each product, enter:
  - Product name (e.g., "Keripik Lumpia Original")
  - Flavor variant (e.g., "Original", "Pedas", "Keju")
  - Description
  - Price (e.g., "Rp 25.000")
  - Product image URL
  - Shopee link (optional)
  - TikTok Shop link (optional)
  - WhatsApp link (optional)
  - Stock status (Available/Low/Out)

### 3. ✅ Upload Gallery Photos
- Go to **Galeri** (Gallery) section
- Click "Tambah Foto" (Add Photo)
- Add photos with:
  - Image URL
  - Caption/description
  - Category (produk/proses/event/testimoni/lainnya)

### 4. ✅ Add Customer Testimonials
- Go to **Testimoni** (Testimonials) section
- Click "Tambah Testimoni" (Add Testimonial)
- Enter:
  - Customer name
  - Location
  - Rating (1-5 stars)
  - Review text
  - Date
  - Mark as featured (optional)

### 5. ✅ Add Store Locations (Optional)
- Go to **Store Locator** section
- Add your store or reseller locations
- Include:
  - Store name
  - Type (Official/Reseller/Marketplace)
  - Full address
  - City
  - Phone number
  - GPS coordinates (optional, for Google Maps integration)

---

## 🎨 Using the Caption Generator

The Smart Caption Generator helps you create engaging social media posts:

1. Go to **Caption Generator** in admin dashboard
2. Fill in:
   - Product name
   - Flavor variant
   - Target audience (General/Young/Family/Reseller)
   - Tone (Friendly/Professional/Playful/Emotional)
   - Platform (Instagram/Facebook/TikTok/WhatsApp)
   - Toggle hashtags and emojis
3. Click "Generate Caption"
4. Copy your favorite caption variant
5. Paste and customize for your social media

---

## 📊 Viewing Analytics

The **Analytics** page shows:
- Total visitors and daily visitors
- Top visitor locations (cities)
- Visit trends over the last 7 days
- Use this data to:
  - Target marketing campaigns
  - Plan distribution strategies
  - Optimize content posting times

---

## 🔗 Important URLs

- **Landing Page**: `/` (homepage)
- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin/dashboard` (after login)

---

## 💡 Tips for Success

### Content Tips
- **Product Photos**: Use high-quality, well-lit photos of your products
- **Authentic Stories**: Share your UMKM journey in the About section
- **Real Reviews**: Add genuine customer testimonials with real names
- **Regular Updates**: Keep gallery fresh with new photos

### Marketing Tips
- Update your social media caption regularly using the generator
- Monitor analytics to understand your customer base
- Add store locations as your business grows
- Keep product information accurate and up-to-date

### Technical Tips
- Always keep your marketplace links updated
- Check that WhatsApp numbers are active
- Test all product links before publishing
- Regularly backup your content

---

## 🆘 Need Help?

If you encounter any issues:

1. Check that you're logged in (admin routes require authentication)
2. Verify all required fields are filled when adding content
3. Make sure image URLs are valid and accessible
4. Clear browser cache if you see old data

---

## 🎯 Next Steps

1. ✅ Create admin account
2. ✅ Login to admin dashboard
3. ✅ Fill in business profile
4. ✅ Add at least 3-5 products
5. ✅ Upload 6-10 gallery photos
6. ✅ Add 3-5 customer testimonials
7. ✅ Test the landing page
8. ✅ Share your website!

---

## 📱 Social Media Integration

Your products link to three platforms:
- **Shopee**: Direct product page link
- **TikTok Shop**: Product link from TikTok
- **WhatsApp**: Direct message link (use format: `https://wa.me/628XXXXXXXXX`)

**WhatsApp Link Format:**
```
https://wa.me/628123456789?text=Halo%20Mealjun,%20saya%20tertarik%20dengan%20produk%20Anda
```

---

## 🎨 Customization Ideas

Future enhancements you might want:
- Add promo/discount badges on products
- Create a blog section for recipes
- Add order tracking feature
- Integrate with payment gateways
- Create customer loyalty program
- Add product comparison feature

---

**Built with ❤️ for Mealjun UMKM**

Good luck with your business! 🚀🥟
