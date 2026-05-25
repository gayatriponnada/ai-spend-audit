import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="flex justify-between items-center  p-3 px-6
                    border-b border-gray-200 sticky top-0  bg-white z-10 shadow-md rounded-xl"
    >
      <div className="flex w-[20%] items-center gap-4">
        <img className="w-10 h-10 rounded-xl" src={logo} alt="Logo" />
        <div className="text-xl text-zinc-800 font-semibold">
          AI Spend Audit
        </div>
      </div>
      {location.pathname === "/" && (
        <button
          className="bg-primary cursor-pointer p-2 rounded-lg text-white text-sm tracking-wide"
          onClick={() => navigate("/audit")}
        >
          Start Free Audit
        </button>
      )}
    </div>
  );
};

export default Navbar;
