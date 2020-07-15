import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { mergeMap, map, catchError } from "rxjs/operators";

import { HypothesisService } from 'src/app/core/services/hypothesis/hypothesis.service';
import { setAPIToken, setAPITokenSuccess, getAPIToken } from '../actions';

@Injectable()
export class TokenEffects {

    constructor(private actions$: Actions, private hypothesisService: HypothesisService) { }

    getAPIToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAPIToken),
            mergeMap(action => this.hypothesisService.getApiToken()
                .pipe(
                    map(token => setAPIToken({ token })),
                    catchError(err => throwError(err))
                )
            )
        )
    );

    setAPIToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setAPIToken),
            mergeMap(action => this.hypothesisService.addApiToken(action.token)
                .pipe(
                    map(token => setAPITokenSuccess()),
                    catchError(() => EMPTY)
                )
            )
        )
    );

}