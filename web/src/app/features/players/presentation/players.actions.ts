import { createAction, props } from '@ngrx/store';

export const GET_ALL_USERS_ACTION = createAction(
  '[GetAllUsersAction] get all players Action',
  props<{ usernamae: string; password: string }>()
);
