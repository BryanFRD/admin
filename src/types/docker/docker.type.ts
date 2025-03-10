interface ContainerSummary {
  /** The ID of this container */
  Id?: string;

  /** The names that this container has been given */
  Names?: string[];

  /** The name of the image used when creating this container */
  Image?: string;

  /** The ID of the image that this container was created from */
  ImageID?: string;

  /** Command to run when starting the container */
  Command?: string;

  /** When the container was created */
  Created?: number;

  /** The ports exposed by this container */
  Ports?: Port[];

  /** The size of files that have been created or changed by this container */
  SizeRw?: number;

  /** The total size of all the files in this container */
  SizeRootFs?: number;

  /** User-defined key/value metadata */
  Labels?: Record<string, string>;

  /** The state of this container (e.g. `Exited`) */
  State?: string;

  /** Additional human-readable status of this container (e.g. `Exit 0`) */
  Status?: string;

  /** Host configuration for the container */
  HostConfig?: ContainerSummaryHostConfig;

  /** Network settings for the container */
  NetworkSettings?: ContainerSummaryNetworkSettings;

  /** Mounts used by the container */
  Mounts?: MountPoint[];
}

interface ContainerInspect {
  /** The ID of the container */
  Id?: string;

  /** The time the container was created */
  Created?: string;

  /** The path to the command being run */
  Path?: string;

  /** The arguments to the command being run */
  Args?: string[];

  /** The state of the container */
  State?: ContainerState;

  /** The container's image ID */
  Image?: string;

  /** Path to the resolv.conf file */
  ResolvConfPath?: string;

  /** Path to the hostname file */
  HostnamePath?: string;

  /** Path to the hosts file */
  HostsPath?: string;

  /** Path to the log file */
  LogPath?: string;

  /** The name of the container */
  Name?: string;

  /** The number of times the container has been restarted */
  RestartCount?: number;

  /** The storage driver used by the container */
  Driver?: string;

  /** The platform the container is running on */
  Platform?: string;

  /** The mount label of the container */
  MountLabel?: string;

  /** The process label of the container */
  ProcessLabel?: string;

  /** The AppArmor profile of the container */
  AppArmorProfile?: string;

  /** IDs of exec instances that are running in the container */
  ExecIDs?: string[];

  /** Host configuration for the container */
  HostConfig?: HostConfig;

  /** Graph driver data */
  GraphDriver?: DriverData;

  /** The size of files that have been created or changed by this container */
  SizeRw?: number;

  /** The total size of all the files in this container */
  SizeRootFs?: number;

  /** Mounts used by the container */
  Mounts?: MountPoint[];

  /** Configuration of the container */
  Config?: ContainerConfig;

  /** Network settings of the container */
  NetworkSettings?: NetworkSettings;
}

interface ContainerState {
  Status?: string;
  Running?: boolean;
  Paused?: boolean;
  Restarting?: boolean;
  OOMKilled?: boolean;
  Dead?: boolean;
  Pid?: number;
  ExitCode?: number;
  Error?: string;
  StartedAt?: string;
  FinishedAt?: string;
}

interface HostConfig {
  CpuShares?: number;
  Memory?: number;
  CgroupParent?: string;
  BlkioWeight?: number;
  CpuPeriod?: number;
  CpuQuota?: number;
  CpuRealtimePeriod?: number;
  CpuRealtimeRuntime?: number;
  CpusetCpus?: string;
  CpusetMems?: string;
  MemoryReservation?: number;
  MemorySwap?: number;
  NanoCpus?: number;
  OomKillDisable?: boolean;
  CpuCount?: number;
  CpuPercent?: number;
  IOMaximumIOps?: number;
  IOMaximumBandwidth?: number;
  ContainerIDFile?: string;
  LogConfig?: {
    Type?: string;
    Config?: Record<string, unknown>;
  };
  NetworkMode?: string;
  PortBindings?: {
    [key: string]: Array<{
      HostIp?: string;
      HostPort?: string;
    }>;
  };
  RestartPolicy?: {
    Name?: string;
    MaximumRetryCount?: number;
  };
  AutoRemove?: boolean;
  VolumeDriver?: string;
  ConsoleSize?: [number, number];
  CgroupnsMode?: string;
  Dns?: string[];
  DnsOptions?: string[];
  DnsSearch?: string[];
  ExtraHosts?: string[];
  IpcMode?: string;
  Cgroup?: string;
  OomScoreAdj?: number;
  PidMode?: string;
  Privileged?: boolean;
  PublishAllPorts?: boolean;
  ReadonlyRootfs?: boolean;
  UTSMode?: string;
  UsernsMode?: string;
  ShmSize?: number;
  Runtime?: string;
  Isolation?: string;
  MaskedPaths?: string[];
  ReadonlyPaths?: string[];
}

interface DriverData {
  Name?: string;
  Data?: Record<string, unknown>;
}

interface MountPoint {
  Destination?: string;
  Mode?: string;
  Propagation?: string;
  RW?: boolean;
  Source?: string;
  Type?: string;
}

interface ContainerConfig {
  Hostname?: string;
  Domainname?: string;
  User?: string;
  AttachStdin?: boolean;
  AttachStdout?: boolean;
  AttachStderr?: boolean;
  ExposedPorts?: Record<string, unknown>;
  Tty?: boolean;
  OpenStdin?: boolean;
  StdinOnce?: boolean;
  Env?: string[];
  Cmd?: string[];
  Image?: string;
  WorkingDir?: string;
  Entrypoint?: string[];
  Labels?: Record<string, string>;
  StopSignal?: string;
}

interface NetworkSettings {
  Bridge?: string;
  SandboxID?: string;
  HairpinMode?: boolean;
  LinkLocalIPv6Address?: string;
  LinkLocalIPv6PrefixLen?: number;
  Ports?: {
    [key: string]: Array<{
      HostIp?: string;
      HostPort?: string;
    }>;
  };
  SandboxKey?: string;
  EndpointID?: string;
  Gateway?: string;
  GlobalIPv6Address?: string;
  GlobalIPv6PrefixLen?: number;
  IPAddress?: string;
  IPPrefixLen?: number;
  IPv6Gateway?: string;
  MacAddress?: string;
  Networks?: {
    [key: string]: {
      MacAddress?: string;
      Aliases?: string[];
      NetworkID?: string;
      EndpointID?: string;
      Gateway?: string;
      IPAddress?: string;
      IPPrefixLen?: number;
      IPv6Gateway?: string;
      GlobalIPv6Address?: string;
      GlobalIPv6PrefixLen?: number;
      DNSNames?: string[];
    };
  };
}

interface Port {
  IP?: string;
  PrivatePort?: number;
  PublicPort?: number;
  Type?: string;
}

interface ContainerSummaryHostConfig {
  NetworkMode?: string;
}

interface ContainerSummaryNetworkSettings {
  Networks?: {
    [key: string]: {
      IPAddress?: string;
      Gateway?: string;
      MacAddress?: string;
      NetworkID?: string;
    };
  };
}


export type {
  ContainerSummary,
  ContainerInspect,
  ContainerState,
  HostConfig,
  DriverData,
  MountPoint,
  ContainerConfig,
  NetworkSettings,
  Port,
  ContainerSummaryHostConfig,
  ContainerSummaryNetworkSettings,
};
