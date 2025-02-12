import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-800">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
