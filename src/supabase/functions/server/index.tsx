import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to verify auth
async function verifyAuth(authHeader: string | null) {
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

// ============== AUTH ROUTES ==============

// Signup endpoint
app.post('/make-server-513f45b4/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user }, 201);
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// ============== PRODUCTS ROUTES ==============

app.get('/make-server-513f45b4/products', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    return c.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

app.post('/make-server-513f45b4/products', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const productData = await c.req.json();
    const id = crypto.randomUUID();
    const product = { id, ...productData, created_at: new Date().toISOString() };

    await kv.set(`product:${id}`, product);
    return c.json(product, 201);
  } catch (error) {
    console.error('Error creating product:', error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

app.put('/make-server-513f45b4/products/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const productData = await c.req.json();
    const product = { id, ...productData, updated_at: new Date().toISOString() };

    await kv.set(`product:${id}`, product);
    return c.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return c.json({ error: 'Failed to update product' }, 500);
  }
});

app.delete('/make-server-513f45b4/products/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    await kv.del(`product:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return c.json({ error: 'Failed to delete product' }, 500);
  }
});

// ============== PROFILE ROUTES ==============

app.get('/make-server-513f45b4/profile', async (c) => {
  try {
    const profile = await kv.get('profile:main');
    if (!profile) {
      return c.json({
        title: 'Keripik Lumpia Berkualitas dari Tangan Terampil',
        description: 'Mealjun adalah UMKM yang berdedikasi menghadirkan keripik lumpia berkualitas tinggi dengan berbagai pilihan rasa.',
        vision: 'Menjadi brand keripik lumpia terkemuka di Indonesia',
        mission: 'Menghadirkan camilan sehat dan lezat untuk keluarga Indonesia'
      });
    }
    return c.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

app.put('/make-server-513f45b4/profile', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const profileData = await c.req.json();
    await kv.set('profile:main', { ...profileData, updated_at: new Date().toISOString() });
    return c.json(profileData);
  } catch (error) {
    console.error('Error updating profile:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// ============== GALLERY ROUTES ==============

app.get('/make-server-513f45b4/gallery', async (c) => {
  try {
    const gallery = await kv.getByPrefix('gallery:');
    return c.json(gallery || []);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return c.json({ error: 'Failed to fetch gallery' }, 500);
  }
});

app.post('/make-server-513f45b4/gallery', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const galleryData = await c.req.json();
    const id = crypto.randomUUID();
    const galleryItem = { id, ...galleryData, created_at: new Date().toISOString() };

    await kv.set(`gallery:${id}`, galleryItem);
    return c.json(galleryItem, 201);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return c.json({ error: 'Failed to create gallery item' }, 500);
  }
});

app.delete('/make-server-513f45b4/gallery/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    await kv.del(`gallery:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return c.json({ error: 'Failed to delete gallery item' }, 500);
  }
});

// ============== TESTIMONIALS ROUTES ==============

app.get('/make-server-513f45b4/testimonials', async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonial:');
    return c.json(testimonials || []);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return c.json({ error: 'Failed to fetch testimonials' }, 500);
  }
});

app.post('/make-server-513f45b4/testimonials', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const testimonialData = await c.req.json();
    const id = crypto.randomUUID();
    const testimonial = { id, ...testimonialData, created_at: new Date().toISOString() };

    await kv.set(`testimonial:${id}`, testimonial);
    return c.json(testimonial, 201);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return c.json({ error: 'Failed to create testimonial' }, 500);
  }
});

app.put('/make-server-513f45b4/testimonials/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const testimonialData = await c.req.json();
    const testimonial = { id, ...testimonialData, updated_at: new Date().toISOString() };

    await kv.set(`testimonial:${id}`, testimonial);
    return c.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return c.json({ error: 'Failed to update testimonial' }, 500);
  }
});

app.delete('/make-server-513f45b4/testimonials/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    await kv.del(`testimonial:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return c.json({ error: 'Failed to delete testimonial' }, 500);
  }
});

// ============== STORE LOCATIONS ROUTES ==============

app.get('/make-server-513f45b4/store-locations', async (c) => {
  try {
    const locations = await kv.getByPrefix('store_location:');
    return c.json(locations || []);
  } catch (error) {
    console.error('Error fetching store locations:', error);
    return c.json({ error: 'Failed to fetch store locations' }, 500);
  }
});

app.post('/make-server-513f45b4/store-locations', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const locationData = await c.req.json();
    const id = crypto.randomUUID();
    const location = { id, ...locationData, created_at: new Date().toISOString() };

    await kv.set(`store_location:${id}`, location);
    return c.json(location, 201);
  } catch (error) {
    console.error('Error creating store location:', error);
    return c.json({ error: 'Failed to create store location' }, 500);
  }
});

app.put('/make-server-513f45b4/store-locations/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const locationData = await c.req.json();
    const location = { id, ...locationData, updated_at: new Date().toISOString() };

    await kv.set(`store_location:${id}`, location);
    return c.json(location);
  } catch (error) {
    console.error('Error updating store location:', error);
    return c.json({ error: 'Failed to update store location' }, 500);
  }
});

app.delete('/make-server-513f45b4/store-locations/:id', async (c) => {
  try {
    const user = await verifyAuth(c.req.header('Authorization'));
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    await kv.del(`store_location:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting store location:', error);
    return c.json({ error: 'Failed to delete store location' }, 500);
  }
});

// ============== ANALYTICS ROUTES ==============

app.post('/make-server-513f45b4/analytics/track', async (c) => {
  try {
    const visitorData = await c.req.json();
    const id = crypto.randomUUID();
    const visit = {
      id,
      ...visitorData,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    };

    await kv.set(`visitor:${id}`, visit);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return c.json({ error: 'Failed to track visitor' }, 500);
  }
});

app.get('/make-server-513f45b4/analytics', async (c) => {
  try {
    const visitors = await kv.getByPrefix('visitor:');
    const today = new Date().toISOString().split('T')[0];
    
    const todayVisitors = visitors.filter((v: any) => v.date === today).length;
    
    // Count by location
    const locationCounts: Record<string, number> = {};
    visitors.forEach((v: any) => {
      if (v.city) {
        locationCounts[v.city] = (locationCounts[v.city] || 0) + 1;
      }
    });
    
    const topLocations = Object.entries(locationCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Daily visits for last 7 days
    const dailyVisits: any[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = visitors.filter((v: any) => v.date === dateStr).length;
      dailyVisits.push({ date: dateStr, count });
    }
    
    return c.json({
      totalVisitors: visitors.length,
      todayVisitors,
      topLocations,
      dailyVisits
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// ============== DASHBOARD STATS ==============

app.get('/make-server-513f45b4/dashboard-stats', async (c) => {
  try {
    const [products, gallery, testimonials, visitors] = await Promise.all([
      kv.getByPrefix('product:'),
      kv.getByPrefix('gallery:'),
      kv.getByPrefix('testimonial:'),
      kv.getByPrefix('visitor:')
    ]);

    const today = new Date().toISOString().split('T')[0];
    const todayVisitors = visitors.filter((v: any) => v.date === today).length;

    // Top location
    const locationCounts: Record<string, number> = {};
    visitors.forEach((v: any) => {
      if (v.city) {
        locationCounts[v.city] = (locationCounts[v.city] || 0) + 1;
      }
    });
    const topLocation = Object.entries(locationCounts)
      .sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'Belum ada data';

    return c.json({
      products: products.length,
      gallery: gallery.length,
      testimonials: testimonials.length,
      visitors: todayVisitors,
      topProduct: products[0]?.name || 'Belum ada produk',
      topLocation
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

// Health check
app.get('/make-server-513f45b4/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
