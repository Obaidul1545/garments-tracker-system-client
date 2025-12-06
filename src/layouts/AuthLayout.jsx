import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#E2E8F0]">
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <main className="grow">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
