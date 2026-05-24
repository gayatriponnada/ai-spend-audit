import React from "react";
import DetailsOfAudit from "../components/home/DetailsOfAudit";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col gap-4 py-2 sm:py-2">
        <div className="text-2xl sm:text-3xl lg:text-4xl w-full sm:w-[70%] lg:w-[50%] font-semibold leading-snug">
          Stop overspending on{" "}
          <span className="text-primary font-bold">AI Tools.</span>
        </div>

        <div className="text-sm sm:text-base text-gray-600 w-full sm:w-[60%]">
          Get a free audit of your AI subscriptions and discover hidden savings
          in seconds.
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => navigate("/audit")}
            className="bg-primary cursor-pointer px-5 py-2.5 rounded-lg text-white text-sm tracking-wide hover:opacity-90 transition whitespace-nowrap"
          >
            Start Free Audit →
          </button>
          <div className="flex justify-center items-center gap-2 text-zinc-400 text-sm tracking-wide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 -960 960 960"
              width="1rem"
              fill="currentColor"
            >
              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            No credits required
          </div>
        </div>
      </div>

      {/* How it works */}
      <DetailsOfAudit />
    </div>
  );
};

export default Home;
