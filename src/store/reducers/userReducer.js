import { 
    SET_CURRENT_USER, 
    REMOVE_CURRENT_USER,
    UPDATE_USER_CPF,
    UPDATE_USER_PHONE,
    ADD_USER_BALANCE,
    ADD_USER_POINTS,
    UPDATE_USER_ADDRESS,
    SET_USER_PHOTO,
  } from '../actions/';
  
  const initialState = {
    name: null,
    email: null,
    balance: 0,
    points: 0,
    cpf: null,
    address: {},
    recommendation_code: null,
    id: 0,
    photoUrl: null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
          return {
            ...state,
            cpf: action.payload.cpf,
            name: action.payload.name,
            email: action.payload.email,
            balance: action.payload.balance,
            points: action.payload.points,
            address: action.payload.address,
            recommendation_code: action.payload.recommendation_code,
            id: action.payload.id
          };
        case REMOVE_CURRENT_USER:
          return {
            ...state,
            name: null,
            email: null,
            balance: 0,
            points: 0,
            cpf: null,
            address: {},
            recommendation_code: null,
            id: 0,
            photoUrl: null,
          };
        case SET_USER_PHOTO:
          return {
            ...state,
            photoUrl: action.payload
          };
        case UPDATE_USER_CPF:
          return {
            ...state,
            cpf: action.payload
          };
        case UPDATE_USER_PHONE:
          return {
            ...state,
            phone: action.payload
          };
        case UPDATE_USER_ADDRESS:
          return {
            ...state,
            address: action.payload
          };
        case ADD_USER_BALANCE:
          return {
            ...state,
            balance: action.payload
          };
        case ADD_USER_POINTS:
          return {
            ...state,
            points: action.payload
          };
      default:
        return state;
    }
  };