import React from "react";
import { assets } from "../assets/assets";

function AboutHeader() {
  return (
    <div
      className="relative overflow-hidden min-h-[500px] md:min-h-[600px]"
      style={{
        backgroundImage: `url(${assets.aboutUsHeader_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability (optional) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* ----left side - top left corner---- */}
      <div className="absolute top-0 left-0 z-10 max-w-5xl flex flex-col items-start justify-start gap-4 p-6 md:p-10 lg:p-12 mt-12">
        <p className="dolce text-5xl md:text-6xl lg:text-8xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight pt-12">
          About Us
        </p>
        <p className="soligant text-white text-sm md:text-base">
          Stayzia is a modern hotel booking platform built with the vision of making travel simpler, smarter, and more enjoyable for everyone. We believe that finding the perfect place to stay should be a seamless and stress-free experience, whether you're planning a family vacation, a romantic getaway, a business trip, or a spontaneous weekend escape. Our platform brings together a carefully curated selection of hotels, resorts, and unique stays from trusted partners across Sri Lanka and beyond, allowing travelers to easily compare options, explore detailed property information, and book their ideal stay with confidence. At Stayzia, we focus on transparency, comfort, and convenience—ensuring every listing provides accurate details, real photographs, and honest reviews so customers know exactly what to expect. Powered by a passionate team, smart technology, and a commitment to quality service, Stayzia continues to redefine the way people discover and book accommodations. Our goal is not just to help travelers find a room, but to help them experience comfort, trust, and memorable journeys with every booking. Whether you’re searching for luxury, affordability, or adventure, Stayzia is here to guide you to the perfect stay, every time.
        </p>
      </div>
    </div>
  );
}

export default AboutHeader;
