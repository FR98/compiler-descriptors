import { connect } from 'react-redux'
import * as registerDescriptor from './reducers/registerDescriptors'

function App({
    exec_sub
}) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Compiladores - Generacion de Codigo</h1>
                <p>
                    Uso de Descriptor de registros y Descriptor de direcciones
                </p>
                <ul>
                    <li><button onClick={ exec_sub }>t = a - b</button></li>
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
        exec_sub() {
            dispatch(registerDescriptor.actions.LD('R1', 'a'))
            dispatch(registerDescriptor.actions.LD('R2', 'b'))
            dispatch(registerDescriptor.actions.SUB('R2', 'R1', 'R2'))
        }
    })
)(App);
