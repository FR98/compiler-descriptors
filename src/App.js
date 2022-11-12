import { connect } from 'react-redux'
import * as descriptors from './reducers/descriptors'

function App({
    start
}) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Compiladores - Generacion de Codigo</h1>
                <p>
                    Uso de Descriptor de registros y Descriptor de direcciones
                </p>
                <button onClick={ start }>Iniciar simulacion</button>
                <ul>
                    <li>t = a - b</li>
                        <ul>
                            <li>LD R1, a</li>
                            <li>LD R2, b</li>
                            <li>SUB R2, R1, R2</li>
                        </ul>
                    <li>u = a - c</li>
                        <ul>
                            <li>LD R3, c</li>
                            <li>SUB R1, R1, R3</li>
                        </ul>
                    <li>v = t + u</li>
                        <ul>
                            <li>ADD R3, R2, R1</li>
                        </ul>
                    <li>a = d</li>
                        <ul>
                            <li>LD R2, d</li>
                        </ul>
                    <li>d = v + U</li>
                        <ul>
                            <li>ADD R1, R3, R1</li>
                            <li>ST a, R2</li>
                            <li>ST d, R1</li>
                        </ul>
                </ul>
            </header>
        </div>
    );
}

export default connect(
    state => ({}),
    dispatch => ({
        start() {
            const init_registers = {
                R1: null,
                R2: null,
                R3: null,
            }

            const init_addresses = {
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                t: null,
                u: null,
                v: null,
            }

            dispatch(descriptors.actions.INIT(init_registers, init_addresses))

            // t = a - b
            dispatch(descriptors.actions.LD('R1', 'a'))
            dispatch(descriptors.actions.LD('R2', 'b'))
            dispatch(descriptors.actions.SUB('R2', 'R1', 'R2', 't'))
            // u = a - c
            dispatch(descriptors.actions.LD('R3', 'c'))
            dispatch(descriptors.actions.SUB('R1', 'R1', 'R3', 'u'))
            // v = t + u
            dispatch(descriptors.actions.ADD('R3', 'R2', 'R1', 'v'))
            // a = d
            dispatch(descriptors.actions.LD('R2', 'd', 'a'))
            // d = v + U
            dispatch(descriptors.actions.ADD('R1', 'R3', 'R1', 'd'))
            // Salida
            dispatch(descriptors.actions.ST('a', 'R2'))
            dispatch(descriptors.actions.ST('d', 'R1'))
        },
    })
)(App);
