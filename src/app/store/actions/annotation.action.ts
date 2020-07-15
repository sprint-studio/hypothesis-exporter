import { createAction, props } from '@ngrx/store';
import { Annotation } from 'src/app/core/models/annotation';

export const AnnotationActions = {

    setAnnotationsLoading: createAction(
        '[Annotation Effects] Set Annotations Loading'
    ),

    setAnnotationsLoaded: createAction(
        '[Annotation Effects] Set Annotations Loaded'
    ),

    setAnnotations: createAction(
        '[Annotation Effects] Set Annotations',
        props<{ annotations: Annotation[] }>()
    ),

    getAnnotations: createAction(
        '[Home Component] Get Annotations'
    ),

    annotationsLoadingError: createAction(
        '[Annotation Effect] Error loading annotations',
        props<{ err: any }>()
    )
};