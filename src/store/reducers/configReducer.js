import {
    SET_APP_NOTIFICATIONS,
    SET_EMAIL_NOTIFICATIONS,
    SET_DARK_MODE,
    SET_CURRENCY,
    SET_LANGUAGE,
} from '../actions'
  
const initialState = {
    notifications: true,
    email: true,
    darkMode: false,
    currency: 'cUSD',
    language: 'Português'
};
  
export const configReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_APP_NOTIFICATIONS:
        return {
            ...state,
            notifications: action.payload
        };
    case SET_EMAIL_NOTIFICATIONS:
        return {
            ...state,
            email: action.payload
        };
    case SET_DARK_MODE:
        return {
            ...state,
            darkMode: action.payload
        };
    case SET_CURRENCY:
        return {
            ...state,
            currency: action.payload,
        };
    case SET_LANGUAGE:
        return {
            ...state,
            language: action.payload,
        };
    default:
        return state;
}
};