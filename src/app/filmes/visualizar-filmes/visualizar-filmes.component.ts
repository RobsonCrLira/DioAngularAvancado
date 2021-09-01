import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FilmesService } from "src/app/core/filmes.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { Alert } from "src/app/shared/models/alerta";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-visualizar-filmes",
  templateUrl: "./visualizar-filmes.component.html",
  styleUrls: ["./visualizar-filmes.component.scss"],
})
export class VisualizarFilmesComponent implements OnInit {
  movie: Filme;
  id: number;
  readonly semFoto =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEemlgFtRl2mVB_7J_ypS-JHchAMWKXNkANw&usqp=CAU";

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private filmeService: FilmesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.toView();
  }

  excluir(id: number): void {
    const config = {
      data: {
        title: "Você tem certeza que deseja excluir?",
        description:
          "Caso você tenha certeza que deseja excluir, clique no botão OK",
        colorBtnSuccess: "warn",
        colorBtnCancel: "primary",
        closeBtnEnable: true,
      } as Alert,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((option: boolean) => {
      if (option) {
        this.filmeService
          .delete(this.id)
          .subscribe(() => this.router.navigateByUrl("/filmes"));
      }
    });
  }
  editar(): void {
    this.router.navigateByUrl("/filmes/cadastro/" + this.id);
  }

  reiniciarForm() {
    throw new Error("Method not implemented.");
  }

  private toView(): void {
    this.filmeService
      .toView(this.id)
      .subscribe((movie: Filme) => (this.movie = movie));
  }
}
