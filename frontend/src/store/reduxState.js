const initialState = {
    user: {},
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
        default:
            return state;
    }
}

export default reducer;
