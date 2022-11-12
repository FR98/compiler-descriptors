import { combineReducers } from 'redux';

export const types = {
    INIT: 'INIT',
    LD: 'LD',
    SUB: 'SUB',
    ADD: 'ADD',
    ST: 'ST',
};

export const actions = {
    INIT: (init_registers, init_addresses) => ({
        type: types.INIT,
        payload: {
            init_registers,
            init_addresses,
        },
    }),
    LD: (register, address, final_address=null) => ({
        type: types.LD,
        payload: {
            register,
            address,
            final_address,
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
        type: types.ADD,
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

const registers = (state = {
    R1: null,
    R2: null,
    R3: null,
}, action) => {
    const newState = { ...state };
    switch(action.type) {
        case types.INIT:
            return action.payload.init_registers
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

const addresses = (state = {}, action) => {
    const newState = { ...state };
    switch(action.type) {
        case types.INIT:
            return action.payload.init_addresses
        case types.LD:
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.register)) {
                    newState[item[0]] = item[0]
                }
            })

            newState[action.payload.address] = `${action.payload.address},${action.payload.register}`

            if (action.payload.final_address) {
                newState[action.payload.final_address] = action.payload.register
            }

            return newState
        case types.SUB:
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.register1)) {
                    newState[item[0]] = item[0]
                }
            })
            newState[action.payload.address] = action.payload.register1
            return newState
        case types.ADD:
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.register1)) {
                    newState[item[0]] = item[0]
                }
            })
            newState[action.payload.address] = action.payload.register1
            return newState
        case types.ST:
            newState[action.payload.address] = `${action.payload.address},${action.payload.register}`
            return newState
        default: return state
    }
};

export default combineReducers({
    registers,
    addresses
});


export const selectors = {
    getR1: state => state.registers['R1'],
};
