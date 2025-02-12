type DockerType = {
  Command: string;
  Created: number;
  HostConfig: {
    NetworkMode: string;
  };
  Id: string;
  Image: string;
  ImageID: string;
  Labels: Record<string, string>;
  Mounts: {
    Destination: string;
    Mode: string;
    Propagation: string;
    Source: string;
    Type: string;
  }[];
  Names: string[];
  NetworkSettings: {
    Networks: {
      bridge: {
        Aliases: null;
        DriverOpts: null;
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAMConfig: null;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        Links: null;
        MacAddress: string;
        NetworkID: string;
      };
    };
  };
  Ports: {
    IP: string;
    PrivatePort: number;
    PublicPort: number;
    Type: string;
  }[];
  State: string;
  Status: string;
};

export type { DockerType };
