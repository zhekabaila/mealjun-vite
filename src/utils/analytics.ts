// Visitor tracking utility
import { projectId, publicAnonKey } from './supabase/info';

export async function trackVisitor() {
  try {
    // Get visitor info from IP geolocation (simplified version)
    const visitorData = {
      city: 'Jakarta', // In production, use IP geolocation API
      country: 'Indonesia',
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      path: window.location.pathname
    };

    await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/analytics/track`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(visitorData)
      }
    );
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

export async function trackProductClick(productId: string, productName: string) {
  try {
    await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-513f45b4/analytics/track`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          type: 'product_click',
          productId,
          productName,
          city: 'Jakarta'
        })
      }
    );
  } catch (error) {
    console.error('Error tracking product click:', error);
  }
}