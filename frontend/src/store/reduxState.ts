import produce, { Draft } from 'immer';

// As you can see, the redux store can get very populated with lots of types.
// Generally, it's good to try to segment it by pieces that a component may need
// This allows your break apart this stuff and avoid one large file.

// These can all go in 'types'
export interface IEmote {
  ownerUsername: string;
  command: string;
}

export interface IUser {
  avatarUrl?: string;
  channelId: number;
  creationDate: string;
  numFollowers: number;
  partnered: boolean;
  username: string;
  emotes: IEmote[];
}

export interface IAppState {
  user?: IUser;
  error?: Error;
  authenticated: boolean;
}

const AUTHENTICATED = 'AUTHENTICATED';
const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
const USER_EMOTES = 'USER_EMOTES';

export interface IAuthenticatedAction {
  user: IUser;
  type: typeof AUTHENTICATED;
}

export interface INotAuthenticatedAction {
  error: Error;
  type: typeof NOT_AUTHENTICATED;
}

export interface IUserEmotesAction {
  emotes: IEmote[];
  type: typeof USER_EMOTES;
}

export type ActionTypes =
  IAuthenticatedAction |
  INotAuthenticatedAction |
  IUserEmotesAction;

// These can all go in 'reducers'.
const initialState: IAppState = {
  user: undefined,
  error: undefined,
  authenticated: false,
};

function reducer(state: IAppState = initialState, action: ActionTypes): IAppState {
  return produce(state, (draft: Draft<IAppState>) => {
    switch (action.type) {
      case AUTHENTICATED:
        draft.error = undefined;
        draft.authenticated = true;
        draft.user = action.user;
        break;
      case NOT_AUTHENTICATED:
        draft.authenticated = false;
        draft.user = undefined;
        draft.error = action.error;
        break;
      case USER_EMOTES:
        if (draft.user) {
          draft.user.emotes = action.emotes;
        }
        break;
    }
  });
}

// These can all go in 'actions'
export function createAuthenticatedAction(user: IUser): IAuthenticatedAction {
  return {
    user,
    type: AUTHENTICATED,
  };
}

export function createNotAuthenticatedAction(error: Error): INotAuthenticatedAction {
  return {
    error,
    type: NOT_AUTHENTICATED,
  };
}

export function createUserEmotesAction(emotes: IEmote[]): IUserEmotesAction {
  return {
    emotes,
    type: USER_EMOTES,
  };
}

export default reducer;
