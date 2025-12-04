import React from "react";
import { useNavigate } from "react-router-dom";

function SubFooter() {

  const navigate = useNavigate()

  return (
    <div className="bg-gray-500 text-center p-10 mt-20 flex flex-col gap-5">
      <h1 className="text-white text-2xl font-semibold">Come As You Are And You Will <br/>Take Care of The Rest.</h1>
      <button onClick={()=>{navigate('/stays'); scrollTo(0,0)}} className="flex items-center gap-2 bg-primary px-8 py-3 rounded-lg text-white text-sm hover:scale-105 hover:gap-3 transition-all duration-300 w-fit mx-auto">
        Stay Here
      </button>
      
    </div>
  );
}

export default SubFooter;
