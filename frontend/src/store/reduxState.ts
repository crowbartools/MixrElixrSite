export interface IUser {
  avatarUrl?: string;
  channelId: number;
  creationDate: string;
  numFollowers: number;
  partnered: boolean;
  username: string;
  emotes: any;
}

export interface ISystem {
  editingEmote: boolean;
}

export interface IAppState {
  user?: IUser;
  system: ISystem;
  error?: Error;
  authenticated: boolean;
}

const initialState: IAppState = {
  user: undefined,
  system: {
    editingEmote: false,
  },
  error: undefined,
  authenticated: false,
};

function reducer(state: IAppState = initialState, action: any) {
  switch (action.type) {
    case 'AUTHENTICATED':
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
      };
    case 'NOT_AUTHENTICATED':
      return {
        ...state,
        authenticated: false,
      };
    case 'USER_EMOTES':
      const user = state.user;
      if (user) {
        user.emotes = action.payload.emotes;
      }
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
}

export default reducer;
