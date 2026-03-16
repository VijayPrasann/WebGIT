import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { FeatureSections } from './FeatureSections';
import { CtaSection } from './CtaSection';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <FeatureSections />
                <CtaSection />
            </main>
            <Footer />
        </>
    );
};
