import { Outlet } from "react-router-dom";
import Navbar from "../nav-bar/Navbar";

const Layout = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col bg-linear-to-br from-white via-purple-50 to-blue-100">
        <Outlet />
      </main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;