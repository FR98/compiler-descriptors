import { combineReducers } from 'redux';

export const types = {
    R1_SETTED: 'R1_SETTED',
}

export const actions = {
    setR1: value => ({
        type: types.R1_SETTED,
        payload: value,
    }),
}

// Reducers

const R1 = (state = null, action) => {
    switch(action.type) {
        case types.R1_SETTED: return action.payload;
        default: return state;
    }
};


export default combineReducers({
    R1,
});


export const selectors = {
    getR1: state => state.R1,
}