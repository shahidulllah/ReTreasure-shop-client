import CategoryNavbar from "@/components/pages/home/CategoryNav";
import Footer from "@/components/pages/home/Footer";
import Navbar from "@/components/pages/home/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <CategoryNavbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
