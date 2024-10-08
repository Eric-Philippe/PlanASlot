import { Component } from "@angular/core";
import { ImportsModule } from "../../imports";

@Component({
  standalone: true,
  templateUrl: "home.component.html",
  imports: [ImportsModule],
})
export class HomeComponent {
  title = "Home";
}
