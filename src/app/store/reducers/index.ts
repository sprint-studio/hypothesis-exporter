import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import * as fromToken from './token.reducer';
import * as fromAnnotations from './annotation.reducer';

export interface AppState {
  token: fromToken.TokenState;
  annotations: fromAnnotations.AnnotationsState;
}

export const reducers: ActionReducerMap<AppState> = {
  token: fromToken.reducer,
  annotations: fromAnnotations.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export * from './token.reducer';