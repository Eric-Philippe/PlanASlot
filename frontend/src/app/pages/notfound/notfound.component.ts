import { Component } from "@angular/core";
import { ImportsModule } from "../../imports";

@Component({
  standalone: true,
  templateUrl: "notfound.component.html",
  imports: [ImportsModule],
})
export class NotFoundComponent {
  title = "NotFound";
}
