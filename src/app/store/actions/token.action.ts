import { createAction, props, createSelector } from "@ngrx/store";

export const setAPIToken = createAction(
    '[Home Component] Set Hypothesis API Token',
    props<{ token: string }>()
);

export const setAPITokenSuccess = createAction(
    '[Token Effects] Token saved success'
);

export const getAPIToken = createAction(
    '[Home Component] Get Hypothesis API Token'
);


export const getAPITokenSuccess = createAction(
    '[Token Effects] Get Hypothesis API Token success'
);