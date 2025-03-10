import { DockerEvent, DockerEventData, DockerEventPayload } from "./docker.type";
import { SystemEvent, SystemEventData, SystemEventPayload } from "./system.type";

type Event = DockerEvent | SystemEvent;

type EventPayload<T extends Event> = T extends DockerEvent
  ? DockerEventPayload[T]
  : T extends SystemEvent
    ? SystemEventPayload[T]
    : never;

type EventData<T extends Event> = T extends DockerEvent
  ? DockerEventData[T]
  : T extends SystemEvent
    ? SystemEventData[T]
    : never;

export type { Event, EventPayload, EventData };
