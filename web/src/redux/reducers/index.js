import { combineReducers } from 'redux';
import deviceReducer from './deviceReducer';

const rootReducer = combineReducers({
    devices: deviceReducer,
});

export default rootReducer;