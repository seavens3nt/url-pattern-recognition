import { useEffect, useState } from 'react';
import ValidatorPage from './features/validator/ValidatorPage.jsx';
import AboutPage from './ui/AboutPage.jsx';
import Layout from './ui/HeaderFooter.jsx';
import HomePage from './ui/HomePage.jsx';
import HowItWorksPage from './ui/HowItWorksPage.jsx';

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
        <AboutPage />
      </Layout>
    );
  }

  return (
    <Layout current="home" plain>
      <HomePage onStart={() => navigate('recognizer')} />
    </Layout>
  );
}
