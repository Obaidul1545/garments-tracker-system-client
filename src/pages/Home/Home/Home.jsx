import CustomerFeedback from '../CustomerFeedback';
import HeroSection from '../HeroSection';
import StatsSection from '../StatsSection';
import HowItWorks from '../HowItWorks';
import WhyChooseUs from '../WhyChooseUs';
import CTASection from '../CTASection';
import LatestProduct from '../LatestProduct';

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StatsSection></StatsSection>
      <LatestProduct></LatestProduct>
      <HowItWorks></HowItWorks>
      <CustomerFeedback></CustomerFeedback>
      <WhyChooseUs></WhyChooseUs>
      <CTASection></CTASection>
    </div>
  );
};

export default Home;
