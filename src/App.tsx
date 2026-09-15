import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Benefits } from '@/components/Benefits';
import { Impact } from '@/components/Impact';
import { Pricing } from '@/components/Pricing';
import { ContactCTA } from '@/components/ContactCTA';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-ink-900">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <Benefits />
        <Impact />
        <Pricing />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
