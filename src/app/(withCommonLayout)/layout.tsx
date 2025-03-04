import Footer from "@/components/pages/home/Footer";
import Navbar from "@/components/pages/home/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-7xl mx-auto p-4">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
