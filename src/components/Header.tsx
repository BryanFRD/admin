import { Link } from "react-router-dom";
import NavbarLink from "./navbar/NavbarLink";
import Docker from "../services/docker";
import { useEffect, useState } from "react";

const Header = () => {
  const [aliveServices, setAliveServices] = useState({
    docker: false,
  });

  useEffect(() => {
    Docker.alive()
      .then((res) => {
        setAliveServices((prevState) => ({
          ...prevState,
          docker: res,
        }));
      })
      .catch(() => {
        setAliveServices((prevState) => ({
          ...prevState,
          docker: false,
        }));
      });
  }, []);

  return (
    <header className="flex min-h-screen flex-col items-center gap-4 text-white shadow-2xl">
      <h1>
        <Link
          to={"/"}
          className="block h-full w-full self-center px-8 py-4 font-semibold"
        >
          ADMIN
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-col">
          <li>
            <NavbarLink to={"/"}>Dashboard</NavbarLink>
          </li>
          <li>
            <NavbarLink to={"/system"}>System</NavbarLink>
          </li>
          <li>
            <NavbarLink to={"/docker"} isAlive={aliveServices.docker}>
              Docker
            </NavbarLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
