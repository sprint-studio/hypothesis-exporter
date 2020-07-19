import { createAction, props } from "@ngrx/store";
import { Annotation } from "src/app/core/models/annotation";

export const AnnotationActions = {
  setAnnotationsLoading: createAction(
    "[Annotation Effects] Set Annotations Loading"
  ),

  setAnnotationsLoaded: createAction(
    "[Annotation Effects] Set Annotations Loaded"
  ),

  setAnnotations: createAction(
    "[Annotation Effects] Load Annotations",
    props<{ annotations: Annotation[] }>()
  ),

  getAnnotations: createAction("[Home Component] Get Annotations"),

  annotationsLoadingError: createAction(
    "[Annotation Effect] Error loading annotations",
    props<{ err: any }>()
  ),

  // TODO Valutare se aggiornare ad Annotation la props di questa action
  updateAnnotation: createAction(
    "[Home Component] Update annotation",
    props<{ data: { id: string; text: string } }>()
  ),

  updateAnnotationSuccess: createAction(
    "[Annotation Effects] Update Annotation Success",
    props<{ data: { id: string; text: string } }>()
  ),
};
