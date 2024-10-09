import { Registration } from "./Registration";

export type SlotLight = {
  startDatetime?: Date;
  endDatetime?: Date;
};

export type DaySlotsLight = {
  date?: Date;
  slots: SlotLight[];
};

export type Slot = {
  Id_Booking: string;
  Id_Event: string;
  Id_Registration: string | null;
  registration: Registration;
  startDatetime: Date;
  endDatetime: Date;
};

export type DaySlots = {
  date?: Date;
  slots: Slot[];
};
