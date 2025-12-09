import HeroSection from "../../components/UserComponents/HomeComponents/HeroSection";
import ContactCard from "../../components/UserComponents/CommonComponents/ContactCard";
import Categories from "../../components/UserComponents/HomeComponents/Categories";
import WhyChooseUs from "../../components/UserComponents/HomeComponents/WhyChooseUs";
import Products from "../../components/UserComponents/HomeComponents/Products";
import Review from "../../components/UserComponents/HomeComponents/Review";
import Testimonials from "../../components/UserComponents/HomeComponents/Testimonials";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <Categories/>
     <Products/>
      <Review/>
      <WhyChooseUs/>
      <Testimonials/>
      {/* <AboutUs />
      <Provide />
      <Pillar />
      <Business /> */}
      <ContactCard />
    </div>
  );
};

export default Home;
