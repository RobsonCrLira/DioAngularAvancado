import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
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
  id: number;
  cadastro: FormGroup;
  genres: Array<string>;

  constructor(
    public validation: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmesServices: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.filmesServices
        .toView(this.id)
        .subscribe((filme: Filme) => this.createForm(filme));
    } else {
      // se não, então crie em branco
      this.createForm(this.createFromIsBlank());
    }
  }

  submit(): void {
    this.cadastro.markAllAsTouched;
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  reinicarForm(): void {
    this.cadastro.reset();
  }

  private editar(filme: Filme): void {
    this.filmesServices.edit(filme).subscribe(
      () => {
        const config = {
          data: {
            description: "Seu registro foi atualizado com sucesso!",
            btnSuccess: "Ir para a listagem",
          } as Alert,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef
          .afterClosed()
          .subscribe(() => this.router.navigateByUrl("filmes"));
      },
      () => {
        const config = {
          data: {
            title: "Erro ao editar o registro!",
            description:
              "Não conseguimos editar seu registro, favor tentar novamente mais tarde",
            colorBtnSuccess: "warn",
            btnSuccess: "Fechar",
          } as Alert,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private createFromIsBlank(): Filme {
    return {
      id: null,
      titulo: null,
      dataLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null,
    } as Filme;
  }

  private createForm(filme: Filme): void {
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
