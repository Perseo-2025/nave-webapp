import { Navbar } from '@/components/landing/Navbar';
import { HeroCarousel } from '@/components/landing/HeroCarousel';
import { MarqueeBanner } from '@/components/landing/MarqueeBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <MarqueeBanner />
    </main>
  );
}
