import { GET_ALL_USERS_ACTION } from './players.actions';

import { createReducer, on, Action } from '@ngrx/store';
import { INIT_PLAYER_STATE, IPlayerState } from './player.states';

export const reducer = createReducer(
  INIT_PLAYER_STATE,
  on(GET_ALL_USERS_ACTION, (state) => ({
    ...state,
  }))
);


export function PlayerReducer(state: IPlayerState, action: Action): IPlayerState {
    return reducer(state as IPlayerState, action as Action);
  }
// export function playerReducer(state: number = 10, action: Action) {
//   switch (action.type) {
//     case GET_ALL_USERS_ACTION.type:
//       return state + 1;
//     default:
//       return state;
//   }
// }
