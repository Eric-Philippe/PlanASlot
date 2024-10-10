import { Component } from "@angular/core";
import { ImportsModule } from "../../imports";
import { URL } from "../../env";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  templateUrl: "notfound.component.html",
  imports: [ImportsModule],
  providers: [Router],
})
export class NotFoundComponent {
  title = "NotFound";

  endUrl: string = "";
  startUrl = "www.planaslot/home/";

  constructor(private router: Router) {}

  isButtonReady() {
    return this.endUrl.length > 0;
  }

  search() {
    this.router.navigate(["/home/", this.endUrl]);
  }
}
