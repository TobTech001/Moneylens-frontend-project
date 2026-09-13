import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import FinancialInsights from '../components/landing/FinancialInsights';
import BudgetPreview from '../components/landing/BudgetPreview';
import ProductPreview from '../components/landing/ProductPreview';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <FinancialInsights />
        <BudgetPreview />
        <ProductPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}