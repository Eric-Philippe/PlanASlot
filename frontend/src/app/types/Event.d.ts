import { Slot } from "./Slot";

export type Event = {
  Id_Event: string;
  name: string;
  startDateTime: Date | string;
  endDateTime: Date | string;
};

export type EventResolved = Event & {
  slots: Slot[];
};
