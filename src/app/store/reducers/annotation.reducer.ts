import { AnnotationActions } from '../actions';
import { Annotation } from 'src/app/core/models/annotation';
import { createReducer, on, Action } from '@ngrx/store';

export interface AnnotationsState {
    data: Annotation[];
    loading: boolean;
    loaded: boolean;
};

export const annotationsInitialState: AnnotationsState = {
    data: [],
    loading: false,
    loaded: false
};

const annotationsReducer = createReducer(
    annotationsInitialState,
    on(AnnotationActions.setAnnotationsLoading, (state) => ({ ...state, loading: true })),
    on(AnnotationActions.setAnnotationsLoaded, (state) => ({ ...state, loaded: true, loading: false })),
    on(AnnotationActions.setAnnotations, (state, { annotations }) => ({ ...state, data: annotations }))
);

export function reducer(state: AnnotationsState, action: Action) {
    return annotationsReducer(state, action);
};
