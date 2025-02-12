import { api } from "../axios/api";
import { DockerType } from "../types/docker.type";

class Docker {
  static async alive() {
    return await api
      .get("/docker/alive")
      .then((res) => res.data.status ?? 0)
      .catch(() => 0);
  }

  static async getContainers(): Promise<DockerType[]> {
    return await api
      .get("/docker/containers")
      .then((res) => res.data.containers);
  }

  static async getContainerById(id: string): Promise<DockerType> {
    return await api
      .get(`/docker/containers/${id}`)
      .then((res) => res.data.container);
  }

  static async startContainer(id: string) {
    return await api.post(`/docker/containers/${id}/start`);
  }

  static async stopContainer(id: string) {
    return await api.post(`/docker/containers/${id}/stop`);
  }

  static async restartContainer(id: string) {
    return await api.post(`/docker/containers/${id}/restart`);
  }
}

export default Docker;
