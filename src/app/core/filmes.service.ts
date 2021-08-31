import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigParams } from "../shared/models/config-params";
import { Filme } from "../shared/models/filme";
import { ConfigParamsService } from "./config-params.service";

const url = "http://localhost:3000/filmes";

@Injectable({
  providedIn: "root",
})
export class FilmesService {
  constructor(
    private http: HttpClient,
    private configService: ConfigParamsService
  ) {}

  salvar(filme: Filme): Observable<any> {
    return this.http.post<any>(url, filme);
  }

  listMovies(config: ConfigParams): Observable<Filme[]> {
    const configParams = this.configService.confiParams(config);
    return this.http.get<Filme[]>(url, { params: configParams });
  }
}
