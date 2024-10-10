import { Component } from "@angular/core";
import { ImportsModule } from "../../imports";
import { DaySlots, DaySlotsLight, Slot, SlotLight } from "../../types/Slot";
import { EventService } from "../../services/Event.service";
import { MessageService } from "primeng/api";

const DEFAULT_SLOT: SlotLight = {
  startDatetime: undefined,
  endDatetime: undefined,
};

@Component({
  selector: "app-create-event",
  standalone: true,
  templateUrl: "create-event.component.html",
  styleUrls: ["create-event.component.scss"],
  imports: [ImportsModule],
  providers: [EventService, MessageService],
})
export class CreateEventComponent {
  public name: string = "";
  public endDatetime: Date = this.getEndDate();
  private startDatetime: Date = new Date();

  // Initialise avec 1 slot par défaut pour chaque DaySlot
  public daysSlots: DaySlotsLight[] = [
    { date: undefined, slots: [{ ...DEFAULT_SLOT }] },
  ];

  constructor(
    private eventService: EventService,
    private msgService: MessageService
  ) {}

  getEndDate() {
    let date = new Date();
    date.setDate(date.getDate() + 10);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  canCreateSlots(): boolean {
    return this.name.length > 0 && this.startDatetime < this.endDatetime;
  }

  // Ajouter un créneau à un DaySlot spécifique
  addSlot(daySlot: DaySlotsLight) {
    daySlot.slots?.push({
      ...DEFAULT_SLOT,
    });
  }

  // Supprimer un créneau à un DaySlot (min 1 créneau doit rester)
  removeSlot(daySlot: DaySlotsLight, slotIndex: number) {
    if (daySlot.slots && daySlot.slots.length > 1) {
      daySlot.slots.splice(slotIndex, 1);
    }
  }

  // Ajouter un nouveau DaySlot
  addDaySlot() {
    this.daysSlots.push({ date: undefined, slots: [{ ...DEFAULT_SLOT }] });
  }

  // Supprimer un DaySlot (min 1 DaySlot doit rester)
  removeDaySlot(index: number) {
    if (this.daysSlots.length > 1) {
      this.daysSlots.splice(index, 1);
    }
  }

  // Validation pour s'assurer que l'endDatetime ne soit pas avant le startDatetime
  isEndTimeValid(start: Date | undefined, end: Date | undefined): boolean {
    return start && end ? end >= start : true;
  }

  createEvent() {
    // Convert the daySlots to slots
    let slots: Slot[] = [];
    this.daysSlots.forEach((daySlot) => {
      daySlot.slots?.forEach((slot) => {
        if (slot.startDatetime && slot.endDatetime) {
          // Set the date of the daySlot to the slot
          slot.startDatetime.setFullYear(daySlot.date?.getFullYear() as number);
          slot.startDatetime.setMonth(daySlot.date?.getMonth() as number);
          slot.startDatetime.setDate(daySlot.date?.getDate() as number);
          slot.endDatetime.setFullYear(daySlot.date?.getFullYear() as number);
          slot.endDatetime.setMonth(daySlot.date?.getMonth() as number);
          slot.endDatetime.setDate(daySlot.date?.getDate() as number);
          slots.push(slot as Slot);
        }
      });
    });

    this.eventService
      .createEvent(this.name, this.startDatetime, this.endDatetime, slots)
      .then(() => {
        // Reset the form
        this.name = "";
        this.startDatetime = new Date();
        this.endDatetime = new Date();
        this.daysSlots = [{ date: undefined, slots: [{ ...DEFAULT_SLOT }] }];

        this.msgService.add({
          severity: "success",
          summary: "Succès",
          detail: `L'événement a été créé avec succès`,
        });
      })
      .catch((err) => {
        this.msgService.add({
          severity: "error",
          summary: "Erreur",
          detail: `Erreur lors de la création de l'événement`,
        });
      });
  }
}
