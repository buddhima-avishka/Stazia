import React from "react";
import { assets } from "../assets/assets";

function AllStaysHeader() {
  return (
    <div
      className="relative rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px]"
      style={{
        backgroundImage: `url(${assets.header_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability (optional) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* ----left side - top left corner---- */}
      <div className="absolute top-0 left-0 z-10 max-w-xl flex flex-col items-start justify-start gap-4 p-6 md:p-10 lg:p-12">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Hotel Rooms
        </p>
        <p className="text-white text-sm md:text-base">
          Discover the finest hotels from all over the world.
        </p>
      </div>
    </div>
  );
}

export default AllStaysHeader;
