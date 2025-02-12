import { NavLink } from "react-router-dom";

import { ReactNode } from "react";

interface NavbarLinkProps {
  to: string;
  children: ReactNode;
  isAlive?: boolean;
}

const NavbarLink = ({ to, isAlive, children }: NavbarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center justify-between px-10 py-4 font-semibold ${isActive ? "bg-gray-700" : ""}`
      }
    >
      <span>{children}</span>
      {isAlive && (
        <div
          className={`absolute right-0 me-4 h-2 w-2 rounded-full ${
            isAlive ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      )}
    </NavLink>
  );
};

export default NavbarLink;
