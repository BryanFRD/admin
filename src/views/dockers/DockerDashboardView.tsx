import { useEffect, useState } from "react";
import DockerCard from "../../components/dockers/DockerCard";
import { DockerType } from "../../types/docker.type";

const DockerDashboardView = () => {
  const [dockers, setDockers] = useState([] as DockerType[]);
  

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
