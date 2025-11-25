import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import GallerySection from '../components/landing/GallerySection';
import ProductSection from '../components/landing/ProductSection';
import ReviewSection from '../components/landing/ReviewSection';
import ContactSection from '../components/landing/ContactSection';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <ProductSection />
        <ReviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
