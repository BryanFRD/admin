import { api } from "../axios/api";

class Docker {
  static async alive() {
    return await api
      .get("/docker/alive")
      .then((res) => res.data.status ?? 0)
      .catch(() => 0);
  }

  async getContainers() {
    return await api.get("/docker/containers");
  }

  async getContainerById(id: string) {
    return await api.get(`/docker/containers/${id}`);
  }

  async startContainer(id: string) {
    return await api.post(`/docker/containers/${id}/start`);
  }

  async stopContainer(id: string) {
    return await api.post(`/docker/containers/${id}/stop`);
  }

  async restartContainer(id: string) {
    return await api.post(`/docker/containers/${id}/restart`);
  }
}

export default Docker;
