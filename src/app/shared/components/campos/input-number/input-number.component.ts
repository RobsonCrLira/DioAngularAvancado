import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidarCamposService } from "../validar-campos.service";

@Component({
  selector: "dio-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./input-number.component.scss"],
})
export class InputNumberComponent {
  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  @Input() min = 0;
  @Input() max = 10;
  @Input() step = 0.1;
  constructor(public validation: ValidarCamposService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
