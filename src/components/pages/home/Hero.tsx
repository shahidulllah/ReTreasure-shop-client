"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <div className="bg-[#373a41] dark:bg-gradient-to-r dark:from-[#121316] dark:to-[#3a3a3a] overflow-hidden flex items-center justify-center h-[300px]">
      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="w-full"
      >
        {/* Slide 1 */}
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="https://i.ibb.co.com/M5kMxCB9/banner-3.png"
            height={400}
            width={900}
            alt="Special Offer 1"
            className="w-full h-full object-cover bg-black opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Welcome to ReTreasure Heaven
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Discover the best stationery products for your needs.
              </p>
              <Button className="bg-purple-600 text-white px-6 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="https://i.ibb.co.com/nxGYjTr/banner-1.jpg"
            height={400}
            width={900}
            alt="Special Offer 2"
            className="w-full h-full object-cover bg-black opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Exclusive Offers
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Get up to 50% off on selected items. Limited time only!
              </p>
              <Button className="bg-purple-600 text-white px-6 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300">
                Explore Offers
              </Button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="https://i.ibb.co.com/3mQc0Kcr/banner-2.jpg"
            height={400}
            width={900}
            alt="New Arrivals"
            className="w-full h-full object-cover bg-black opacity-50 "
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                New Arrivals
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Check out our latest collection of stationery products.
              </p>
              <Button className="bg-purple-600 text-white px-6  rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300">
                View Collection
              </Button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
