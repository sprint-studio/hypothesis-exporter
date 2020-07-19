import { AnnotationActions } from "../actions";
import { Annotation } from "src/app/core/models/annotation";
import { createReducer, on, Action } from "@ngrx/store";
import { Status } from "src/@types";

export interface AnnotationState {
  data: Annotation;
  status: Status;
  error?: any;
}

export interface AnnotationsState {
  data: Annotation[];
  loading: boolean;
  loaded: boolean;
}

export const annotationsInitialState: AnnotationsState = {
  data: [],
  loading: false,
  loaded: false,
};

const annotationsReducer = createReducer(
  annotationsInitialState,
  on(AnnotationActions.setAnnotationsLoading, (state) => ({
    ...state,
    loading: true,
  })),
  on(AnnotationActions.setAnnotationsLoaded, (state) => ({
    ...state,
    loaded: true,
    loading: false,
  })),
  on(AnnotationActions.setAnnotations, (state, { annotations }) => ({
    ...state,
    data: annotations,
  })),
  // TODO L'update dell'annotation dovrebbe essere messo nei reducers dedicati alla gestione dello stato specifico di ogni annotazione
  on(AnnotationActions.updateAnnotationSuccess, (state, { data }) => ({
    ...state,
    data: state.data.map((annotation) => {
      if (annotation.id === data.id) {
        return {
          ...annotation,
          ...data,
        };
      }

      return { ...annotation };
    }),
  }))
);

export function reducer(state: AnnotationsState, action: Action) {
  return annotationsReducer(state, action);
}
