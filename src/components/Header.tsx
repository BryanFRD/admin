import { Link } from "react-router-dom";
import NavbarLink from "./navbar/NavbarLink";
import { useEffect, useState } from "react";
import { useWebTransport } from "../hooks/webtransport";

const Header = () => {
  const [aliveServices, setAliveServices] = useState({
    docker: 0,
  });
  const { messages, sendMessage } = useWebTransport();

  useEffect(() => {
    sendMessage("DockerStatus");
    sendMessage("SystemStatus");
    sendMessage("DockerContainersRestart", { containerId: "xxx" });
  }, [sendMessage]);

  useEffect(() => {
    if (messages.length > 0) {
      const message = messages[messages.length - 1];
      console.log("message:", message);
      if (message.startsWith("docker:status")) {
        const [, status] = message.split(":");
        setAliveServices((prevValue) => ({
          ...prevValue,
          docker: parseInt(status),
        }));
      }
    }
  }, [messages]);

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
