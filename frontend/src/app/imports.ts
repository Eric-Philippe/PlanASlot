import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CalendarModule } from "primeng/calendar";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
  ],
  exports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
  ],
  providers: [Router],
})
export class ImportsModule {}
