import { combineReducers } from 'redux';

export const types = {
    AUTHENTICATION_STARTED: 'AUTHENTICATION_STARTED',
    AUTHENTICATION_COMPLETED: 'AUTHENTICATION_COMPLETED',
    AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
}

export const actions = {
    startLogin: payload => ({
        type: types.AUTHENTICATION_STARTED,
        payload,
    }),
    completeLogin: token => ({
        type: types.AUTHENTICATION_COMPLETED,
        payload: { token },
    }),
    failLogin: error => ({
        type: types.AUTHENTICATION_FAILED,
        payload: { error },
    }),
}

// Reducers

const token = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: return null;
        case types.AUTHENTICATION_COMPLETED: return action.payload.token;
        case types.AUTHENTICATION_FAILED: return null;
        default: return state;
    }
};


export default combineReducers({
    token,
});


export const selectors = {
    getAuthToken: state => state.token,
}