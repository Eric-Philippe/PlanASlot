import { Component, OnInit } from "@angular/core";
import { ImportsModule } from "../../imports";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../../services/Event.service";
import { EventResolved } from "../../types/Event";
import { DaySlots, Slot } from "../../types/Slot";
import { ConfirmationService, MessageService } from "primeng/api";

const NULL_ID_BOOKING = "#$#$#$#";

@Component({
  standalone: true,
  templateUrl: "home.component.html",
  imports: [ImportsModule],
  providers: [EventService, ConfirmationService, MessageService, Router],
})
export class HomeComponent implements OnInit {
  id: string | null = null;
  slotSelected: Slot = { Id_Booking: NULL_ID_BOOKING } as Slot;
  slotFreedId: string | null = null;
  event: EventResolved = { name: "" } as EventResolved;
  daySlots: DaySlots[] = [];
  user: { firstname: string; lastname: string; email: string } = {
    firstname: "",
    lastname: "",
    email: "",
  };
  isConfirmationDialogVisible = false;
  didChange = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    if (!this.route.snapshot.paramMap.has("id")) {
      this.router.navigate(["/nothere"]);
      return;
    }

    this.id = this.route.snapshot.paramMap.get("id") as string;

    try {
      this.event = await this.eventService.getEvent(this.id);
      this.buildDaySlots();
    } catch (err) {
      this.router.navigate(["/nothere"]);
    }
  }

  // Agregate the slots by day
  buildDaySlots() {
    this.daySlots = [];
    const slots = this.event.slots;

    slots.forEach((slot) => {
      const date = new Date(slot.startDatetime as unknown as string);
      const day = date.toDateString();

      const daySlot = this.daySlots.find(
        (ds) => ds.date?.toDateString() === day
      );

      if (daySlot) {
        daySlot.slots.push(slot);
      } else {
        this.daySlots.push({ date, slots: [slot] });
      }
    });

    this.daySlots.sort((a, b) => a.date!.getTime() - b.date!.getTime());

    this.daySlots.forEach((ds) => {
      ds.slots.sort(
        (a, b) =>
          new Date(a.startDatetime).getTime() -
          new Date(b.startDatetime).getTime()
      );
    });
  }

  isEventFinished() {
    return new Date() > new Date(this.event.endDateTime);
  }

  canShowSlots() {
    let isReady =
      this.user.firstname.length > 0 &&
      this.user.lastname.length > 0 &&
      this.user.email.length > 0 &&
      this.user.email.includes("@") &&
      this.user.email.includes(".") &&
      this.user.firstname.length < 50 &&
      this.user.lastname.length < 50;

    if (isReady) {
      // Find the index of a slot already booked by the user
      let slotIndex = this.event.slots.findIndex(
        (s) => s.Id_Registration && s.registration.email === this.user.email
      );

      if (slotIndex != -1) {
        // If the user has already a slot, we select it
        this.slotSelected = this.event.slots[slotIndex];
      }
    }

    return isReady;
  }

  doesDaySlotContainsAvailableSlots(daySlot: DaySlots) {
    return daySlot.slots.some(
      (slot) =>
        !slot.Id_Registration ||
        slot.Id_Booking === this.slotSelected.Id_Booking
    );
  }

  isSlotAvailable(slot: Slot) {
    return (
      !slot.Id_Registration || slot.Id_Booking === this.slotSelected.Id_Booking
    );
  }

  getSlotDuration(slot: Slot) {
    if (!slot.startDatetime || !slot.endDatetime) {
      return "";
    }

    const start = new Date(slot.startDatetime);
    const end = new Date(slot.endDatetime);
    const duration = Math.round((end.getTime() - start.getTime()) / 60000);

    return duration;
  }

  onSlotSelected(event: any, slot: Slot) {
    // If the user has already a slot, we need to free it virtually from the event
    let slotIndex = this.event.slots.findIndex(
      (s) => s.Id_Registration && s.registration.email === this.user.email
    );
    if (slotIndex != -1) {
      this.slotFreedId = this.event.slots[slotIndex].Id_Booking;

      this.event.slots[slotIndex].Id_Registration = null;
    }

    this.didChange = true;
    if (event.checked) {
      this.slotSelected = slot;
    } else {
      this.slotSelected = { Id_Booking: NULL_ID_BOOKING } as Slot;
    }
  }

  // 11 septembre 2024 - 14h30
  getHumanReadableDate(date: string | Date) {
    return new Date(date).toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  canSubmit() {
    return (
      (this.slotSelected.Id_Booking !== NULL_ID_BOOKING && this.didChange) ||
      this.didChange
    );
  }

  async confirm() {
    this.isConfirmationDialogVisible = true;
    this.confirmationService.confirm({
      header: "Confirmation",
      message:
        this.slotFreedId !== NULL_ID_BOOKING &&
        this.slotFreedId != null &&
        this.slotSelected.Id_Booking == NULL_ID_BOOKING
          ? "Voulez-vous vraiment libérer ce créneau ?"
          : "Voulez-vous vraiment réserver ce créneau ?",
      acceptIcon: "pi pi-check mr-2",
      rejectIcon: "pi pi-times mr-2",
      rejectButtonStyleClass: "p-button-sm",
      acceptButtonStyleClass: "p-button-outlined p-button-sm",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        this.submit();
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Annulé",
          detail: "Action annulée",
          life: 5000,
        });
        this.isConfirmationDialogVisible = false;
      },
    });
  }

  async submit() {
    try {
      if (this.slotFreedId !== NULL_ID_BOOKING && this.slotFreedId != null) {
        await this.eventService.deleteRegistration(this.slotFreedId!);
      }

      if (this.slotSelected.Id_Booking !== NULL_ID_BOOKING) {
        await this.eventService.createRegistration(
          this.user.firstname,
          this.user.lastname,
          this.user.email,
          this.slotSelected.Id_Booking
        );
      }

      // Reload whole component
      this.ngOnInit();

      this.messageService.add({
        severity: "info",
        summary: "Accepté",
        detail:
          this.slotFreedId !== NULL_ID_BOOKING &&
          this.slotFreedId != null &&
          this.slotSelected.Id_Booking == NULL_ID_BOOKING
            ? "Créneau libéré"
            : "Créneau réservé",
        life: 5000,
      });
    } catch (err) {
      console.error(err);
    }

    this.isConfirmationDialogVisible = false;
  }
}
