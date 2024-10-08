import { Registration } from "./Registration";

export type Slot = {
  startDatetime?: Date;
  endDatetime?: Date;
};

export type DaySlots = {
  date?: Date;
  slots: Slot[];
};
