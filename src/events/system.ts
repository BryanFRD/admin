type SystemEvent = "SystemStatus";

type SystemEventPayload = {
  SystemStatus: undefined;
};

type SystemEventData = {
  SystemStatus: { uptime: number };
};

export type { SystemEvent, SystemEventPayload, SystemEventData };
