import { Component, OnInit } from "@angular/core";
import { ImportsModule } from "../../imports";
import { MenuItem, MessageService } from "primeng/api";
import { CreateEventComponent } from "../create-event/create-event.component";
import { ConsultEventComponent } from "../consult-events/consult-event.component";
import { LoginService } from "../../services/Login.service";

@Component({
  standalone: true,
  templateUrl: "admin.component.html",
  imports: [ImportsModule, CreateEventComponent, ConsultEventComponent],
  providers: [LoginService, MessageService],
})
export class AdminComponent implements OnInit {
  headerItems: MenuItem[] | undefined;
  createEvent: boolean = false;
  password: string = "";

  endDate: Date = new Date();

  isLogged: boolean = true;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
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

  login() {
    this.loginService.login(this.password).then((success) => {
      this.isLogged = success;

      if (this.isLogged) {
        this.messageService.add({
          severity: "success",
          summary: "Login",
          detail: "Vous êtes connecté",
        });
      } else {
        this.messageService.add({
          severity: "error",
          summary: "Login",
          detail: "Mot de passe incorrect",
        });
      }
    });

    this.password = "";
  }
}
