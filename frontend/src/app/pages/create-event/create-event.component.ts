import { Component } from "@angular/core";
import { ImportsModule } from "../../imports";
import { DaySlots, Slot } from "../../types/Slot";
import { EventService } from "../../services/Event.service";

const DEFAULT_SLOT: Slot = { startDatetime: undefined, endDatetime: undefined };

@Component({
  selector: "app-create-event",
  standalone: true,
  templateUrl: "create-event.component.html",
  styleUrls: ["create-event.component.scss"],
  imports: [ImportsModule],
  providers: [EventService],
})
export class CreateEventComponent {
  public name: string = "";
  public endDatetime: Date = new Date();
  private startDatetime: Date = new Date();

  // Initialise avec 1 slot par défaut pour chaque DaySlot
  public daysSlots: DaySlots[] = [
    { date: undefined, slots: [{ ...DEFAULT_SLOT }] },
  ];

  constructor(private eventService: EventService) {}

  canCreateSlots(): boolean {
    return this.name.length > 0 && this.startDatetime < this.endDatetime;
  }

  // Ajouter un créneau à un DaySlot spécifique
  addSlot(daySlot: DaySlots) {
    daySlot.slots?.push({ ...DEFAULT_SLOT });
  }

  // Supprimer un créneau à un DaySlot (min 1 créneau doit rester)
  removeSlot(daySlot: DaySlots, slotIndex: number) {
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
          slots.push(slot);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
