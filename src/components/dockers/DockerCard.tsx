import {
  ArrowPathIcon,
  EyeIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/16/solid";
import { DockerType } from "../../types/docker.type";
import ActionButton from "../buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import Docker from "../../services/docker";

interface DockerCardProps {
  docker: DockerType;
}

const DockerCard = ({ docker }: DockerCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[400px] min-w-[250px] rounded-lg bg-gray-700 p-6 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{docker.Names}</h3>
        <span
          className={`text-sm font-medium ${docker.Status.includes("Up") ? "text-green-500" : "text-red-500"}`}
        >
          {docker.Status}
        </span>
      </div>
      <p className="mb-2 text-sm">
        <span className="font-semibold">Image:</span> {docker.Image}
      </p>
      <p className="mb-4 text-sm">
        <span className="font-semibold">Created:</span>{" "}
        {new Date(docker.Created * 1000).toLocaleDateString()}
      </p>

      <div className="mb-4 text-sm">
        <span className="font-semibold">Ports:</span>
        {docker.Ports && docker.Ports.length > 0 ? (
          docker.Ports.map((port) => (
            <span key={`${docker.Id}-${port.PublicPort}`} className="block">
              {port.PrivatePort} → {port.PublicPort}
            </span>
          ))
        ) : (
          <span className="text-gray-400 italic">No ports exposed</span>
        )}
      </div>

      <div className="mt-4 flex justify-between gap-3">
        <ActionButton onClick={() => navigate(`/docker/${docker.Id}`)}>
          <EyeIcon className="h-5 w-5 transition-all group-hover:scale-125" />
        </ActionButton>
        <div className="flex gap-3">
          <ActionButton onClick={() => Docker.restartContainer(docker.Id)}>
            <ArrowPathIcon className="h-5 w-5 transition-all group-hover:scale-125" />
          </ActionButton>
          {docker.Status.includes("Up") ? (
            <ActionButton onClick={() => Docker.stopContainer(docker.Id)}>
              <StopIcon className="h-5 w-5 transition-all group-hover:scale-125" />
            </ActionButton>
          ) : (
            <ActionButton onClick={() => Docker.startContainer(docker.Id)}>
              <PlayIcon className="h-5 w-5 transition-all group-hover:scale-125" />
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default DockerCard;
