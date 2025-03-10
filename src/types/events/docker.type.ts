import { ContainerSummary, ContainerInspect } from "../docker/docker.type";

type DockerEvent =
  | "DockerStatus"
  | "DockerContainerList"
  | "DockerContainerInspect"
  | "DockerContainerStart"
  | "DockerContainerRestart"
  | "DockerContainerStop";

type DockerEventPayload = {
  DockerStatus: undefined;
  DockerContainerList: undefined;
  DockerContainerInspect: { containerId: string };
  DockerContainerStart: { containerId: string };
  DockerContainerRestart: { containerId: string };
  DockerContainerStop: { containerId: string };
};

type DockerEventData = {
  DockerStatus: { status: number };
  DockerContainerList: { containers: ContainerSummary[] };
  DockerContainerInspect: {
    containerId: string;
    container?: ContainerInspect;
  };
  DockerContainerStart: { containerId: string };
  DockerContainerRestart: { containerId: string };
  DockerContainerStop: { containerId: string };
};

export type { DockerEvent, DockerEventPayload, DockerEventData };
