import CustomerFeedback from '../CustomerFeedback';
import HeroSection from '../HeroSection';
import StatsSection from '../StatsSection';
import HowItWorks from '../HowItWorks';
import WhyChooseUs from '../WhyChooseUs';
import CTASection from '../CTASection';
import LatestProduct from '../LatestProduct';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Garments Tracker System</title>
      </Helmet>
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
