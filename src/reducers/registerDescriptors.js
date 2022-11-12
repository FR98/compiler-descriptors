import { combineReducers } from 'redux';

export const types = {
    LOAD: 'LOAD',
}

export const actions = {
    LD: (R, address) => ({
        type: types.LOAD,
        payload: {
            R,
            address,
        },
    }),
}

// Reducers

const registers = (state = {}, action) => {
    switch(action.type) {
        case types.LOAD:
            state[action.payload.R] = action.payload.address
            return state
        default: return state;
    }
};

export default combineReducers({
    registers,
});


export const selectors = {
    getR1: state => state.registers['R1'],
}