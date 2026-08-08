import { Navbar } from '@/components/landing/Navbar';
import { HeroCarousel } from '@/components/landing/HeroCarousel';
import { MarqueeBanner } from '@/components/landing/MarqueeBanner';
import { ProductLineup } from '@/components/landing/ProductLineup';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Pricing } from '@/components/landing/Pricing';
import { ApoyoSocial } from '@/components/landing/ApoyoSocial';
import { Faq } from '@/components/landing/Faq';
import { Contact } from '@/components/landing/Contact';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppFloatingButton } from '@/components/landing/WhatsAppFloatingButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <MarqueeBanner />
      <ProductLineup />
      <HowItWorks />
      <Pricing />
      <ApoyoSocial />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppFloatingButton />
    </main>
  );
}
