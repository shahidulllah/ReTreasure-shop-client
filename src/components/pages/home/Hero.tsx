"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-slate-700 to-lime-950 overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[600px]">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="w-full"
      >
        {/* Slide 1 */}
        <div className="h-[400px] md:h-[600px] flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Welcome to Stationery Haven
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl">
            Discover the best stationery products for your needs.
          </p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
            Shop Now
          </button>
        </div>

        {/* Slide 2 */}
        <div className="h-[400px] md:h-[600px] flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Exclusive Offers
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl">
            Get up to 50% off on selected items. Limited time only!
          </p>
          <button className="mt-6 bg-white text-purple-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
            Explore Offers
          </button>
        </div>

        {/* Slide 3 */}
        <div className="h-[400px] md:h-[600px] flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            New Arrivals
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl">
            Check out our latest collection of stationery products.
          </p>
          <button className="mt-6 bg-white text-pink-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
            View Collection
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
