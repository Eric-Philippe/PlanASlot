import { Component, OnInit } from "@angular/core";
import { ImportsModule } from "../../imports";
import { EventService } from "../../services/Event.service";
import { EventResolved } from "../../types/Event";
import { DaySlots, Slot } from "../../types/Slot";
import { MessageService } from "primeng/api";
import { URL } from "../../env";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

@Component({
  selector: "app-consult-event",
  standalone: true,
  templateUrl: "consult-event.component.html",
  styleUrls: ["consult-event.component.scss"],
  imports: [ImportsModule],
  providers: [EventService, MessageService],
})
export class ConsultEventComponent implements OnInit {
  resolvedEvents: EventResolved[] = [];
  tabs: { title: string; event: EventResolved; daySlots: DaySlots[] }[] = [];

  constructor(
    private eventService: EventService,
    private msgService: MessageService
  ) {}

  async ngOnInit() {
    this.resolvedEvents = await this.eventService.getEvents();

    this.tabs = this.resolvedEvents.map((event) => ({
      title: event.name,
      event: event,
      daySlots: this.buildDaySlots(event),
    }));
  }

  buildDaySlots(event: EventResolved) {
    const daySlots: DaySlots[] = [];
    const startDateTime = new Date(event.startDateTime);
    const endDateTime = new Date(event.endDateTime);
    const currentDate = new Date(startDateTime);

    while (currentDate <= endDateTime) {
      daySlots.push({
        date: new Date(currentDate),
        slots: event.slots.filter((slot) => {
          const slotStartDateTime = new Date(slot.startDatetime);
          return (
            slotStartDateTime.getDate() === currentDate.getDate() &&
            slotStartDateTime.getMonth() === currentDate.getMonth() &&
            slotStartDateTime.getFullYear() === currentDate.getFullYear()
          );
        }),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daySlots;
  }

  getEventUrl(event: EventResolved) {
    return URL + "/home/" + event.Id_Event;
  }

  copyEventLink(event: EventResolved) {
    const url = this.getEventUrl(event);
    navigator.clipboard.writeText(url);
    this.msgService.add({
      severity: "success",
      summary: "Copy link",
      detail: "Link copied to clipboard",
    });
  }

  getHumanReadableDateTime(date: Date | string) {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  }

  getDay(date: Date | string) {
    const dateObj = new Date(date);
    return (
      dateObj.getDate() +
      " " +
      MONTHS[dateObj.getMonth()] +
      " " +
      dateObj.getFullYear()
    );
  }

  getTime(date: Date | string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString().slice(0, 5);
  }

  getTagSeverity(slot: Slot) {
    if (slot.registration.Id_Registration != null) {
      return "info";
    } else {
      return "success";
    }
  }

  getTagText(slot: Slot) {
    if (slot.registration.Id_Registration != null) {
      return "Unavailable";
    } else {
      return "Available";
    }
  }

  getFirstname(slot: Slot) {
    if (slot.registration.Id_Registration == null) {
      return "";
    } else {
      return slot.registration.firstname;
    }
  }

  getLastname(slot: Slot) {
    if (slot.registration.Id_Registration == null) {
      return "";
    } else {
      return slot.registration.lastname;
    }
  }

  getEmail(slot: Slot) {
    if (slot.registration.Id_Registration == null) {
      return "";
    } else {
      return slot.registration.email;
    }
  }

  getRegistrationDate(slot: Slot) {
    if (slot.registration.Id_Registration == null) {
      return "";
    } else {
      return this.getHumanReadableDateTime(
        slot.registration.registerDatetime as Date
      );
    }
  }

  deleteRegistration(slot: Slot) {
    try {
      this.eventService.deleteRegistration(slot.Id_Booking);
      slot.registration = {};
      slot.Id_Registration = null;
      this.msgService.add({
        severity: "success",
        summary: "Delete registration",
        detail: "Registration deleted successfully",
      });
    } catch (e) {
      this.msgService.add({
        severity: "error",
        summary: "Delete registration",
        detail: "An error occurred while deleting the registration",
      });
    }
  }

  deleteEvent(event: EventResolved) {
    try {
      this.eventService.deleteEvent(event.Id_Event);
      this.tabs = this.tabs.filter(
        (tab) => tab.event.Id_Event !== event.Id_Event
      );
      this.msgService.add({
        severity: "success",
        summary: "Delete event",
        detail: "Event deleted successfully",
      });
    } catch (e) {
      this.msgService.add({
        severity: "error",
        summary: "Delete event",
        detail: "An error occurred while deleting the event",
      });
    }
  }
}
