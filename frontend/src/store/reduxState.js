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
    system: {
        editingEmote: false,
    },
    error: null,
    authenticated: false
  }

function reducer(state = initialState, action){
    switch (action.type) {
        case "AUTHENTICATED":
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
            };
        case "USER_EMOTES_UPDATE_EDITED":
            let system = state.system;
            system.editingEmote = action.payload.editingEmote;
            return {
                ...state,
                system: system
            }
        default:
            return state;
    }
}

export default reducer;
