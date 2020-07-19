import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

import { environment } from "src/environments/environment";
import * as fromToken from "./token.reducer";
import * as fromAnnotations from "./annotation.reducer";
import * as fromPagination from "./pagination.reducer";

export interface AppState {
  token: fromToken.TokenState;
  annotations: fromAnnotations.AnnotationsState;
  pagination: fromPagination.PaginationState;
}

export const reducers: ActionReducerMap<AppState> = {
  token: fromToken.reducer,
  annotations: fromAnnotations.reducer,
  pagination: fromPagination.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

// export * from "./token.reducer";
