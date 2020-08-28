import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { configReducer } from './configReducer';
import { withdrawReducer } from './withdrawReducer';

export default rootReducer = combineReducers({
    authState: authReducer,
    userState: userReducer,
    configState: configReducer,
    withdrawState: withdrawReducer,
});