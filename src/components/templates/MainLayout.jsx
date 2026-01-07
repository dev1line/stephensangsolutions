import { useLocation } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import AnimatedBackground from "../organisms/AnimatedBackground";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground showLogo={isHomePage} />
      <Header />
      <main className="flex-grow pt-16 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
