import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Alert } from "../../models/alerta";

@Component({
  selector: "dio-alerta",
  templateUrl: "./alerta.component.html",
  styleUrls: ["./alerta.component.scss"],
})
export class AlertaComponent implements OnInit {
  alert = {
    title: "Sucesso",
    description: "Seu registo foi salvo com sucesso",
    btnSuccess: "OK",
    btnCancel: "Cancelar",
    colorBtnSuccess: "accent",
    colorBtnCancel: "warn",
    closeBtnEnable: false,
  } as Alert;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert
  ) {}

  ngOnInit() {
    if (this.data) {
      this.alert.title = this.data.title || this.alert.title;
      this.alert.description = this.data.description || this.alert.description;
      this.alert.btnSuccess = this.data.btnSuccess || this.alert.btnSuccess;
      this.alert.btnCancel = this.data.btnCancel || this.alert.btnCancel;
      this.alert.colorBtnSuccess =
        this.data.colorBtnSuccess || this.alert.colorBtnSuccess;
      this.alert.colorBtnCancel =
        this.data.colorBtnCancel || this.alert.colorBtnCancel;
      this.alert.closeBtnEnable =
        this.data.closeBtnEnable || this.alert.closeBtnEnable;
    }
  }
}
