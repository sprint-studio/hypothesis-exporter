import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, TokenState } from 'src/app/store';
import { setAPIToken, AnnotationActions, getAPIToken } from 'src/app/store/actions';
import { selectToken, selectAnnotations } from 'src/app/store/selectors';
import { Annotation } from 'src/app/core/models/annotation';


@Component({
  selector: 'home',
  template: `
    <form #tokenForm="ngForm" (ngSubmit)="addToken(tokenForm.value)">
      <input name="token" placeholder="Paste token here" ngModel required="">
      <button type="submit">Add token</button>
    </form>
    <label>{{ currentToken$ | async | json }} </label>
    <ul>
      <li *ngFor="let annotation of annotations$ | async">
        <annotation [annotation]="annotation"></annotation>
      </li>
    </ul>
    `,
  styles: []
})
export class HomeComponent implements OnInit {
  private currentToken$: Observable<TokenState>;
  private annotations$: Observable<Annotation[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // TODO Togliere questi dispatch da qui
    this.store.dispatch(AnnotationActions.getAnnotations());
    this.store.dispatch(getAPIToken());

    this.currentToken$ = this.store.pipe(select(selectToken));
    this.annotations$ = this.store.pipe(select(selectAnnotations));

  }

  addToken({ token }: { token: string }) {
    this.store.dispatch(setAPIToken({ token }));
  }

}
