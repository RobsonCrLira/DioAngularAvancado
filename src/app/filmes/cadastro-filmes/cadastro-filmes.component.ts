import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FilmesService } from "src/app/core/filmes.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos.service";
import { Alert } from "src/app/shared/models/alerta";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;
  genres: Array<string>;

  constructor(
    public validation: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmesServices: FilmesService,
    private router: Router
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.cadastro = this.fb.group({
      titulo: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: ["", [Validators.minLength(10)]],
      dataLancamento: ["", [Validators.required]],
      descricao: [""],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ["", [Validators.required, Validators.minLength(10)]],
      genero: ["", [Validators.required]],
    });

    this.genres = [
      "Ação",
      "Aventura",
      "Comedia",
      "Drama",
      "Ficção Cientifica",
      "Romance",
      "Terror",
    ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched;
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
    // alert(`Sucesso!\n\n ${JSON.stringify(this.cadastro.value, null, 4)}`);
  }

  reinicarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesServices.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSuccess: "ir para a Listagem",
            btnCancel: "Cadastrar um novo filme",
            colorBtnCancel: "primary",
            closeBtnEnable: true,
          } as Alert,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((option: boolean) => {
          if (option) {
            this.router.navigateByUrl("filmes");
          } else {
            this.reinicarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            title: "Erro ao Salvar o registo!",
            description:
              "Não foi possivel salvar o seu registro. Tente mais tarde!",
            colorBtnSuccess: "warn",
            btnSuccess: "Fechar",
          } as Alert,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
