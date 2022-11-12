import { connect } from 'react-redux'
import * as registerDescriptor from './reducers/registerDescriptors'

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
                    <li>u = a - c</li>
                    <li>v = t + u</li>
                    <li>a = d</li>
                    <li>d = v + U</li>
                </ul>
            </header>
        </div>
    );
}

export default connect(
    state => ({}),
    dispatch => ({
        start() {
            // t = a - b
            dispatch(registerDescriptor.actions.LD('R1', 'a'))
            dispatch(registerDescriptor.actions.LD('R2', 'b'))
            dispatch(registerDescriptor.actions.SUB('R2', 'R1', 'R2', 't'))
            // u = a - c
            dispatch(registerDescriptor.actions.LD('R3', 'c'))
            dispatch(registerDescriptor.actions.SUB('R1', 'R1', 'R3', 'u'))
            // v = t + u
            dispatch(registerDescriptor.actions.ADD('R3', 'R2', 'R1', 'v'))
            // a = d
            dispatch(registerDescriptor.actions.LD('R2', 'd'))
            // d = v + U
            dispatch(registerDescriptor.actions.ADD('R1', 'R3', 'R1', 'd'))
            // Salida
        },
    })
)(App);
