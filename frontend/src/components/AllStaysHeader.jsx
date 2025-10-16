import React, { useState } from "react";
import { assets } from "../assets/assets";

function AllStaysHeader() {
  const initialFilters = {
    singleBed: false,
    familySuite: false,
    doubleBed: false,
    luxuryRoom: false,
    price2500_5000: false,
    price5000_8000: false,
    price8000_15000: false,
    sortLowHigh: false,
    sortHighLow: false,
    newestFirst: false,
  };

  const [filters, setFilters] = useState(initialFilters);

  function toggle(key) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }

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
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>

        {/* Requirements: Filters form with clear button and three columns */}
        <form onSubmit={(e) => e.preventDefault()} className="bg-white text-gray-700 rounded-lg px-4 py-4 max-w-3xl md:max-w-full mx-0 md:mx-0">
          {/* header: Filters on left, Clear button on right */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Filters</h3>
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Popular filters */}
            <div>
              <h4 className="font-medium mb-2">Popular filters</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.singleBed} onChange={() => toggle('singleBed')} />
                  <span className="text-sm">Single bed</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.familySuite} onChange={() => toggle('familySuite')} />
                  <span className="text-sm">Family suite</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.doubleBed} onChange={() => toggle('doubleBed')} />
                  <span className="text-sm">Double bed</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.doubleBed} onChange={() => toggle('doubleBed')} />
                  <span className="text-sm">Double bed</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.luxuryRoom} onChange={() => toggle('luxuryRoom')} />
                  <span className="text-sm">Luxury Room</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="font-medium mb-2">Price</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.price2500_5000} onChange={() => toggle('price2500_5000')} />
                  <span className="text-sm">Rs.2500 - 5000</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.price5000_8000} onChange={() => toggle('price5000_8000')} />
                  <span className="text-sm">Rs.5000 - 8000</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.price8000_15000} onChange={() => toggle('price8000_15000')} />
                  <span className="text-sm">Rs.8000 - 15000</span>
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-medium mb-2">Sort By</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.sortLowHigh} onChange={() => toggle('sortLowHigh')} />
                  <span className="text-sm">Price: Low to High</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.sortHighLow} onChange={() => toggle('sortHighLow')} />
                  <span className="text-sm">Price: High to Low</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" checked={filters.sortHighLow} onChange={() => toggle('sortHighLow')} />
                  <span className="text-sm">Newest First</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AllStaysHeader;
