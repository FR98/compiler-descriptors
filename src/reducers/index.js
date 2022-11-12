import { combineReducers } from 'redux';

import registerDescriptors, * as registerDescriptorsSelectors from './registerDescriptors';

export default combineReducers({
    registerDescriptors,
});
