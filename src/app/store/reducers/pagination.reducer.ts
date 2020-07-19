import { createReducer, on, Action } from "@ngrx/store";
import { PaginationActions } from "../actions";

export interface PaginationState {
  page: number | string;
  totalPage?: number | string;
}

const initialState: PaginationState = {
  page: 1,
};

export const paginationReducer = createReducer<PaginationState>(
  initialState,
  on(PaginationActions.nextPage, (state, { page }) => ({ ...state, page })),
  on(PaginationActions.previousPage, (state, { page }) => ({ ...state, page }))
);

export function reducer(state: PaginationState, action: Action) {
  return paginationReducer(state, action);
}
