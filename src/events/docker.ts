type DockerEvent = "DockerStatus" | "DockerContainersRestart";

type DockerEventPayload = {
  DockerStatus: undefined;
  DockerContainersRestart: { containerId: string };
};

type DockerEventData = {
  DockerStatus: { status: number };
  DockerContainersRestart: { containerId: string };
};

export type { DockerEvent, DockerEventPayload, DockerEventData };
