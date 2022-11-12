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
            // Carga del estado inicial de los registros
            return action.payload.init_registers
        case types.LD:
            // Carga de un registro
            newState[action.payload.register] = action.payload.address

            // Si se igualan dos direcciones el valor almacenado en el registro es equivalente al valor de las dos direcciones
            if (action.payload.final_address) {
                newState[action.payload.register] = `${action.payload.final_address},${action.payload.address}`
            }

            return newState
        case types.SUB:
            // Como cambia el valor de la direccion al operar, el registro ya no tiene el valor de direccion y se elimina
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.address)) {
                    newState[item[0]] = item[1].replace(`,${action.payload.address}`, '')
                }
            })

            // Operacion de dos registros, el registro almacena el valor de la direccion temporal
            newState[action.payload.register1] = action.payload.address
            return newState
        case types.ADD:
            // Como cambia el valor de la direccion al operar, el registro ya no tiene el valor de direccion y se elimina
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.address)) {
                    newState[item[0]] = item[1].replace(`,${action.payload.address}`, '')
                }
            })

            // Operacion de dos registros, el registro almacena el valor de la direccion temporal
            newState[action.payload.register1] = action.payload.address
            return newState
        default: return state
    }
};

const addresses = (state = {}, action) => {
    const newState = { ...state };
    switch(action.type) {
        case types.INIT:
            // Carga del estado inicial de las direcciones a utilizar
            return action.payload.init_addresses
        case types.LD:
            // En la carga de valor la direccion almacena su mismo valor reseteandose
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.register)) {
                    newState[item[0]] = item[0]
                }
            })

            // En la carga de un valor el valor de la direccion se puede encontrar en la misma direccion y en el registro donde se cargo
            newState[action.payload.address] = `${action.payload.address},${action.payload.register}`

            // Si la carga es para igualar dos direcciones, el valor la direccion en donde se almacena tambien se puede consultar en el registro
            if (action.payload.final_address) {
                newState[action.payload.final_address] = action.payload.register
            }

            return newState
        case types.SUB:
            // Como cambia el valor de la direccion al operar, el registro ya no tiene el valor de direccion y se resetea en donde estuviera asignado
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.register1)) {
                    newState[item[0]] = item[0]
                }
            })

            // El resultado de la operacion se almacena en el registro y el registro se asocia a la direccion
            newState[action.payload.address] = action.payload.register1
            return newState
        case types.ADD:
            // Como cambia el valor de la direccion al operar, el registro ya no tiene el valor de direccion y se resetea en donde estuviera asignado
            Object.entries(newState).map(item => {
                if (item[1] && item[1].includes(action.payload.register1)) {
                    newState[item[0]] = item[0]
                }
            })

            // El resultado de la operacion se almacena en el registro y el registro se asocia a la direccion
            newState[action.payload.address] = action.payload.register1
            return newState
        case types.ST:
            // Almacenamiento de un registro en una direccion para que la almacene la variable tambien
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
