import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import InteractiveDashboard from '../components/landing/InteractiveDashboard';
import FinancialInsights from '../components/landing/FinancialInsights';
import AnalyticsShowcase from '../components/landing/AnalyticsShowcase';
import Benefits from '../components/landing/Benefits';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <InteractiveDashboard />
        <FinancialInsights />
        <AnalyticsShowcase />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}