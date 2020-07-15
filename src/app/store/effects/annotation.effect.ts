import { Injectable } from "@angular/core";
import { EMPTY, throwError, pipe } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Annotation } from 'src/app/core/models/annotation';
import { AnnotationActions } from '../actions';
import { HypothesisService } from 'src/app/core/services/hypothesis/hypothesis.service';

@Injectable()
export class AnnotationEffects {

    // map(() => AnnotationActions.setAnnotationsLoading()),
    loadAnnotations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnnotationActions.getAnnotations),
            mergeMap(
                () => this.hypothesisService.searchAnnotations({ user: '00taffe' })
                    .pipe(
                        map((data: Annotation[]) => {
                            return AnnotationActions.setAnnotations({ annotations: data });
                        }),
                        catchError((err) => EMPTY)
                    )
            )
        )
    );

    constructor(private actions$: Actions, private hypothesisService: HypothesisService) { }

}