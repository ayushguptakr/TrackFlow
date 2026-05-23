import DashboardPreviewSection from '../components/landing/DashboardPreviewSection';
import FeatureSection from '../components/landing/FeatureSection';
import FinalCtaSection from '../components/landing/FinalCtaSection';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import LandingFooter from '../components/landing/LandingFooter';
import LandingNavbar from '../components/landing/LandingNavbar';
import StatsSection from '../components/landing/StatsSection';
import TestimonialSection from '../components/landing/TestimonialSection';

const HomePage = () => (
  <div className="min-h-screen bg-white text-zinc-900">
    <LandingNavbar />
    <main>
      <HeroSection />
      <FeatureSection />
      <DashboardPreviewSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialSection />
      <FinalCtaSection />
    </main>
    <LandingFooter />
  </div>
);

export default HomePage;
