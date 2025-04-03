import FeaturesSection from "../../components/feature/FeatureSection";
import Footer from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import Hero from "../../components/hero/Hero";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <Hero />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
