import { useEffect, useState } from "react";
import DockerCard from "../../components/dockers/DockerCard";
import { DockerType } from "../../types/docker.type";
import { socket } from "../../sockets/socket";

const DockerDashboardView = () => {
  const [dockers, setDockers] = useState([] as DockerType[]);

  useEffect(() => {
    socket.on("docker:containers", (data: DockerType[]) => {
      console.log("data:", data);
      setDockers(data);
    });

    socket.emit("docker:containers");

    return () => {
      socket.off("docker:containers");
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-8">
      <div></div>
      <div className="flex flex-wrap gap-4">
        {dockers.map((docker) => (
          <DockerCard key={docker.Id} docker={docker} />
        ))}
      </div>
    </div>
  );
};

export default DockerDashboardView;
