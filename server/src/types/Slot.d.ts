import { Registration } from "./Registration";

export type Slot = {
  Id_Booking?: string;
  startDatetime: Date;
  endDatetime: Date;
  Id_Event: string;
  Id_Registration?: string;
};

// SlotResolved is a Slot with an additional property Id_Registration and Id_Event
export type SlotResolved = Slot & {
  registration: Registration | null;
};
