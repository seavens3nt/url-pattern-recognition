import { lazy, Suspense, useEffect, useState } from 'react';
import ValidatorPage from './features/validator/ValidatorPage.jsx';
import Layout from './ui/HeaderFooter.jsx';
import HomePage from './ui/HomePage.jsx';
import HowItWorksPage from './ui/HowItWorksPage.jsx';

// Team portraits are only needed on About. Keep them out of the initial page load.
const AboutPage = lazy(() => import('./ui/AboutPage.jsx'));

const ROUTES = new Set(['home', 'recognizer', 'how-it-works', 'about']);

function routeFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '');
  return ROUTES.has(route) ? route : 'home';
}

function navigate(route) {
  window.location.hash = `/${route}`;
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash);

  useEffect(() => {
    const updateRoute = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  if (route === 'recognizer') {
    return (
      <Layout current="recognizer">
        <ValidatorPage />
      </Layout>
    );
  }

  if (route === 'how-it-works') {
    return (
      <Layout current="how-it-works">
        <HowItWorksPage />
      </Layout>
    );
  }

  if (route === 'about') {
    return (
      <Layout current="about">
        <Suspense fallback={<main className="about-main" role="status">Loading team page…</main>}>
          <AboutPage />
        </Suspense>
      </Layout>
    );
  }

  return (
    <Layout current="home" plain>
      <HomePage onStart={() => navigate('recognizer')} />
    </Layout>
  );
}
