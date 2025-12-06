import React, { useState } from "react";
import { assets } from "../assets/assets";

function AllStaysHeader({ onFiltersChange }) {
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

  React.useEffect(() => {
    if (typeof onFiltersChange === 'function') onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <div
      className="relative overflow-hidden min-h-[650px] sm:min-h-[700px] md:min-h-[650px] lg:min-h-[600px]"
      style={{
        backgroundImage: `url(${assets.allstaysHeader_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability (optional) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* ----left side - top left corner---- */}
      <div className="absolute top-0 left-0 z-10 w-full flex flex-col items-start justify-start gap-4 p-4 sm:p-6 md:p-8 lg:p-12 mt-12 pb-8 sm:pb-6">
        <p className="dolce text-5xl sm:text-6xl md:text-8xl lg:text-6xl text-white font-semibold leading-tight pt-5">
          Hotel Rooms
        </p>
        <p className="soligant text-white text-xs sm:text-sm md:text-base max-w-xl">
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>

        {/* Requirements: Filters form with clear button and three columns */}
        <form onSubmit={(e) => e.preventDefault()} className="bg-white text-gray-700 rounded-lg px-3 py-3 sm:px-4 sm:py-4 w-full max-w-4xl self-center">
          {/* header: Filters on left, Clear button on right */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Filters</h3>
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Popular filters */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Popular filters</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.singleBed} onChange={() => toggle('singleBed')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Single bed</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.familySuite} onChange={() => toggle('familySuite')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Family suite</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.doubleBed} onChange={() => toggle('doubleBed')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Double bed</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.luxuryRoom} onChange={() => toggle('luxuryRoom')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Luxury Room</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Price</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.price2500_5000} onChange={() => toggle('price2500_5000')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Rs.2500 - 5000</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.price5000_8000} onChange={() => toggle('price5000_8000')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Rs.5000 - 8000</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox accent-primary w-4 h-4" checked={filters.price8000_15000} onChange={() => toggle('price8000_15000')} style={{accentColor: '#C49C74'}} />
                  <span className="text-xs sm:text-sm">Rs.8000 - 15000</span>
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Sort By</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    className="form-radio accent-primary w-5 h-4"
                    checked={filters.sortLowHigh}
                    onChange={() => setFilters(prev => ({ ...prev, sortLowHigh: true, sortHighLow: false, newestFirst: false }))}
                    style={{accentColor: '#C49C74'}}
                  />
                  <span className="text-xs sm:text-sm">Price: Low to High</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    className="form-radio accent-primary w-5 h-4"
                    checked={filters.sortHighLow}
                    onChange={() => setFilters(prev => ({ ...prev, sortLowHigh: false, sortHighLow: true, newestFirst: false }))}
                    style={{accentColor: '#C49C74'}}
                  />
                  <span className="text-xs sm:text-sm">Price: High to Low</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    className="form-radio accent-primary w-5 h-4"
                    checked={filters.newestFirst}
                    onChange={() => setFilters(prev => ({ ...prev, sortLowHigh: false, sortHighLow: false, newestFirst: true }))}
                    style={{accentColor: '#C49C74'}}
                  />
                  <span className="text-xs sm:text-sm">Newest First</span>
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
