import { useEffect, useState } from "react";
import HeaderFooter from "./ui/HeaderFooter.jsx";
import HomePage from "./ui/HomePage.jsx";
import URLForm from "./ui/URLForm.jsx";
import HowItWorksPage from "./ui/HowItWorksPage.jsx";
import AboutPage from './ui/AboutPage.jsx';
import ValidatorPage from "./features/validator/ValidatorPage.jsx";

const VALID_ROUTES = ["home", "recognizer", "how-it-works", "about"];

function readRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  return VALID_ROUTES.includes(raw) ? raw : "home";
}

function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const handleChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleChange);
    return () => window.removeEventListener("hashchange", handleChange);
  }, []);

  return route;
}

export function navigate(key) {
  window.location.hash = `#/${key}`;
}

export default function App() {
  const route = useHashRoute();

  return (
    <HeaderFooter current={route} plain={route === "home"}>
      {route === "home" && <HomePage onStart={() => navigate("recognizer")} />}

      {route === "recognizer" && (
        <>
          {/* <ValidatorPage /> */}
          <URLForm />
        </>
      )}

      {route === "how-it-works" && <HowItWorksPage/>}

      {route === "about" && <AboutPage/>}

    </HeaderFooter>
  );
}
