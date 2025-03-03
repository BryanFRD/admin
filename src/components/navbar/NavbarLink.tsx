import { NavLink } from "react-router-dom";

import { ReactNode } from "react";

interface NavbarLinkProps {
  to: string;
  children: ReactNode;
  isAlive?: number;
}

const getBackgroundColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-red-500";
    case 1:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const NavbarLink = ({ to, isAlive, children }: NavbarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center justify-between px-10 py-4 font-semibold hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
      }
    >
      <span>{children}</span>
      {isAlive !== undefined && (
        <div
          className={`absolute right-0 me-4 h-2 w-2 rounded-full ${getBackgroundColor(isAlive)}`}
        ></div>
      )}
    </NavLink>
  );
};

export default NavbarLink;
