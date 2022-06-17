import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { PlayerReducer } from './features/players/presentation/players.reducer';

export const reducers: ActionReducerMap<any> = {
    PlayerState: PlayerReducer,
  };

  export const metaReducers: MetaReducer<any>[] = [];
