import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FilmesService } from "src/app/core/filmes.service";
import { ConfigParams } from "src/app/shared/models/config-params";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
  movies: Filme[] = [];
  filtroListagem: FormGroup;
  genres: Array<string>;
  readonly semFoto =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEemlgFtRl2mVB_7J_ypS-JHchAMWKXNkANw&usqp=CAU";

  config: ConfigParams = {
    limit: 4,
    page: 0,
  };

  constructor(
    private moviesServices: FilmesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filtroListagem = this.fb.group({
      text: [""],
      genres: [""],
    });

    this.filtroListagem.get("text").valueChanges.subscribe((val: string) => {
      this.config.search = val;
      this.resetQuery();
    });

    this.filtroListagem.get("genres").valueChanges.subscribe((val: string) => {
      this.config.field = { type: "genre", value: val };
      this.resetQuery();
    });

    this.genres = [
      "Ação",
      "Aventura",
      "Comédia",
      "Drama",
      "Ficção Científica",
      "Romance",
      "Terror",
    ];
    this.listMovies();
  }

  onScroll(): void {
    this.listMovies();
  }

  abrir(id: number): void {
    this.router.navigateByUrl(`/filmes/${id}`);
  }

  private listMovies(): void {
    this.config.page++;
    this.moviesServices
      .listMovies(this.config)
      .subscribe((movies: Filme[]) => this.movies.push(...movies));
  }

  private resetQuery(): void {
    this.config.page = 0;
    this.movies = [];
    this.listMovies();
  }
}
