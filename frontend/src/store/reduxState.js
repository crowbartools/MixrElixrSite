const initialState = {
    user: {
        avatarUrl: false,
        channelId: false,
        creationDate: false,
        numFollowers: false,
        partnered: false,
        username: false,
        emotes: []
    },
    error: null,
    authenticated: false
  }

function reducer(state = initialState, action){
    switch (action.type) {
        case "AUTHENTICATED":
            let newUser = action.payload.user;
            state.authenticated = true;
            state.user.avatarUrl = newUser.avatarUrl;
            state.user.channelId = newUser.channelId;
            state.user.creationDate = newUser.creationDate;
            state.user.numFollowers = newUser.numFollowers;
            state.user.partnered = newUser.partnered;
            state.user.username = newUser.username;
            return {
                ...state,
                authenticated: true,
                user: action.payload.user
            };
        case "NOT_AUTHENTICATED":
            return { 
                ...state, 
                authenticated: false 
            };
        case "USER_EMOTES":
            let user = state.user;
            user.emotes = action.payload.emotes;
            return {
                ...state,
                user: user
            }
        default:
            return state;
    }
}

export default reducer;
