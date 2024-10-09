import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/notfound/notfound.component";
import { AdminComponent } from "./pages/admin/admin.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "nothere",
    pathMatch: "full",
  },
  {
    path: "home/:id",
    component: HomeComponent,
  },
  {
    path: "home",
    redirectTo: "nothere",
  },
  {
    path: "admin",
    component: AdminComponent,
  },
  {
    path: "nothere",
    component: NotFoundComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
