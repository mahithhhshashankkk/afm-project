import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Benefits } from '@/components/Benefits';
import { Impact } from '@/components/Impact';
import { ROICalculator } from '@/components/ROICalculator';
import { CaseStudies } from '@/components/CaseStudies';
import { Pricing } from '@/components/Pricing';
import { ContactCTA } from '@/components/ContactCTA';
import { Footer } from '@/components/Footer';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Chatbot } from '@/components/Chatbot';

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function App() {
  const hash = useHashRoute();

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return;

    const listener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        void CapacitorApp.exitApp();
      }
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, []);

  if (hash === '#admin') {
    return <AdminDashboard />;
  }

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
        <ROICalculator />
        <CaseStudies />
        <Pricing />
        <ContactCTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
