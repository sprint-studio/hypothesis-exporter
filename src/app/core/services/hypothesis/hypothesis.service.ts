import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Annotation } from "../../models/annotation";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HypothesisService {
  constructor(private http: HttpClient) {}

  getApiToken(): Observable<string> {
    return of(window.localStorage.getItem(environment.hypothesis.token_name));
  }

  addApiToken(token: string): Observable<string> {
    window.localStorage.setItem(environment.hypothesis.token_name, token);
    return of(token);
  }

  searchAnnotations(data?: { user?: string }): Observable<Annotation[]> {
    let params = new HttpParams();
    params = params.set("user", `acct:${data.user}@hypothes.is`);
    return this.http
      .get<Annotation[]>(environment.hypothesis.searchAnnotations, { params })
      .pipe(map((data) => data["rows"]));
  }

  updatedAnnotation(
    id: string,
    data: { text?: string; tags?: string[] }
  ): Observable<Annotation> {
    return this.http.patch<Annotation>(
      environment.hypothesis.updateAnnotation.replace(":id", id),
      data
    );
  }
}
