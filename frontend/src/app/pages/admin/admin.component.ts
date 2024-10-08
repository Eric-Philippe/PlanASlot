import { Component, OnInit } from "@angular/core";
import { ImportsModule } from "../../imports";
import { MenuItem } from "primeng/api";
import { CreateEventComponent } from "../create-event/create-event.component";

@Component({
  standalone: true,
  templateUrl: "admin.component.html",
  imports: [ImportsModule, CreateEventComponent],
})
export class AdminComponent implements OnInit {
  headerItems: MenuItem[] | undefined;
  createEvent: boolean = false;

  endDate: Date = new Date();

  ngOnInit(): void {
    this.headerItems = [
      {
        label: "Consulter mes events",
        icon: "pi pi-fw pi-calendar",
        command: () => (this.createEvent = false),
      },
      {
        label: "Créer un event",
        icon: "pi pi-fw pi-plus",
        command: () => (this.createEvent = true),
      },
    ];
  }
}
