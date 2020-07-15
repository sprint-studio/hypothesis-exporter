import { AnnotationsState } from '../reducers/annotation.reducer';
import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectAnnotationState = (state: AppState) => state.annotations;

export const selectAnnotations = createSelector(
    selectAnnotationState,
    (state: AnnotationsState) => state.data
);