import { createReducer, on, Action, State } from '@ngrx/store';

import * as TokenActions from "../actions";

export interface TokenState {
    token: string;
};

export const initialState: TokenState = {
    token: ''
};

const tokenReducer = createReducer<TokenState>(
    initialState,
    on(TokenActions.setAPIToken, (state, { token }) => ({ token }))
);

export function reducer(state: TokenState, action: Action) {
    return tokenReducer(state, action);
};
