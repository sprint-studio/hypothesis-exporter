import { Injectable } from "@angular/core";
import { EMPTY, throwError, pipe } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { Annotation } from "src/app/core/models/annotation";
import { AnnotationActions } from "../actions";
import { HypothesisService } from "src/app/core/services/hypothesis/hypothesis.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class AnnotationEffects {
  constructor(
    private actions$: Actions,
    private hypothesisService: HypothesisService
  ) {}

  // map(() => AnnotationActions.setAnnotationsLoading()),
  loadAnnotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationActions.getAnnotations),
      mergeMap(() =>
        this.hypothesisService.searchAnnotations({ user: "00taffe" }).pipe(
          map((data: Annotation[]) => {
            return AnnotationActions.setAnnotations({ annotations: data });
          }),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  updateAnnoation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationActions.updateAnnotation),
      mergeMap(({ data }) =>
        this.hypothesisService.updatedAnnotation(data.id, data).pipe(
          map((response: any) =>
            AnnotationActions.updateAnnotationSuccess({ data })
          ),
          catchError((err) => EMPTY)
        )
      )
    )
  );
}
