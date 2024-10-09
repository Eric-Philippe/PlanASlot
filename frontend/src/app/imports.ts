import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    TabViewModule,
    TableModule,
    TagModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
  ],
  exports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    TabViewModule,
    TableModule,
    TagModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [Router],
})
export class ImportsModule {}
