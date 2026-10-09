import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { LeistungenSection } from '@/components/sections/leistungen-section';
import AboutSection from '@/components/sections/about-section';
import ContactSection from '@/components/sections/contact-section';
import { MarqueeBand } from '@/components/ui/marquee-band';

export function HomeIntro() {
  return (
    <>
      <HeroSection />
      <LeistungenSection />
      <AboutSection />
      <MarqueeBand
        items={[
          'Hero',
          'Sections',
          'Forms',
          'SEO',
          'Legal',
          'Deploy',
          'Rebrand',
        ]}
      />
      <ContactSection />
      <Footer />
    </>
  );
}
