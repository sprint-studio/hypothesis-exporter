import { createAction, props } from "@ngrx/store";

export const PaginationActions = {
  nextPage: createAction(
    "[Pagination Component] Next page",
    props<{ page: number | string }>()
  ),

  previousPage: createAction(
    "[Pagination Component] Previous Page",
    props<{ page: number | string }>()
  ),
};
