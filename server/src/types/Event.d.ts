import { SlotResolved } from "./Slot";

export type Event = {
  Id_Event: string;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
};

export type EventResolved = Event & {
  slots: SlotResolved[];
};
