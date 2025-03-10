import { useEffect, useState } from "react";
import DockerCard from "../../components/dockers/DockerCard";
import { ContainerSummary } from "../../types/docker/docker.type";
import { useWebTransport } from "../../hooks/webtransport";

const DockerDashboardView = () => {
  const { sendMessage, addEventListener } = useWebTransport();
  const [dockers, setDockers] = useState([] as ContainerSummary[]);

  useEffect(() => {
    const removeDockerContainerListListener = addEventListener(
      "DockerContainerList",
      (data) => {
        setDockers(data.containers);
      },
    );

    const removeDockerContainerInspectListener = addEventListener(
      "DockerContainerInspect",
      (data) => {
        console.log("data:", JSON.stringify(data.container));
      },
    );

    const removeDockerContainerStartListener = addEventListener(
      "DockerContainerStart",
      (data) => {
        sendMessage("DockerContainerInspect", {
          containerId: data.containerId,
        });
      },
    );

    const removeDockerContainerStopListener = addEventListener(
      "DockerContainerStop",
      (data) => {
        sendMessage("DockerContainerInspect", {
          containerId: data.containerId,
        });
      },
    );

    sendMessage("DockerContainerList");

    return () => {
      removeDockerContainerListListener();
      removeDockerContainerInspectListener();
      removeDockerContainerStartListener();
      removeDockerContainerStopListener();
    };
  }, [addEventListener, sendMessage]);

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
