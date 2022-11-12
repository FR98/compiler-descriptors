import { combineReducers } from 'redux';

export const types = {
    LD: 'LD',
    SUB: 'SUB',
    ADD: 'ADD',
    ST: 'ST',
};

export const actions = {
    LD: (register, address) => ({
        type: types.LD,
        payload: {
            register,
            address,
        },
    }),
    SUB: (register1, register2, register3, address=null) => ({
        type: types.SUB,
        payload: {
            register1,
            register2,
            register3,
            address,
        },
    }),
    ADD: (register1, register2, register3, address=null) => ({
        type: types.SUB,
        payload: {
            register1,
            register2,
            register3,
            address,
        },
    }),
    ST: (address, register) => ({
        type: types.ST,
        payload: {
            address,
            register,
        },
    }),
};

// Reducers

const registers = (state = {}, action) => {
    const newState = { ...state };
    switch(action.type) {
        case types.LD:
            newState[action.payload.register] = action.payload.address
            return newState
        case types.SUB:
            newState[action.payload.register1] = action.payload.address
            return newState
        case types.ADD:
            newState[action.payload.register1] = action.payload.address
            return newState
        default: return state
    }
};

export default combineReducers({
    registers,
});


export const selectors = {
    getR1: state => state.registers['R1'],
};
