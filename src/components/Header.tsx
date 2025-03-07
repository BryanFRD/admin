import { Link } from "react-router-dom";
import NavbarLink from "./navbar/NavbarLink";
import { useEffect, useState } from "react";
import { useWebTransport } from "../hooks/webtransport";

const Header = () => {
  const [aliveServices, setAliveServices] = useState({
    docker: 0,
  });
  const { sendMessage, addEventListener } = useWebTransport();

  useEffect(() => {
    const removeDockerStatusListener = addEventListener(
      "DockerStatus",
      (status) => {
        setAliveServices((prevValue) => ({
          ...prevValue,
          docker: status,
        }));
      },
    );

    return () => {
      removeDockerStatusListener();
    };
  }, [addEventListener]);

  useEffect(() => {
    sendMessage("DockerStatus");
  }, [sendMessage]);

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
          <li>
            <NavbarLink to={"/shell"}>Terminal</NavbarLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
