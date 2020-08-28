import { 
    SET_CURRENCY_TYPE,
    SET_CRYPTO_WALLET,
    SET_FIAT_WALLET,
    SET_CRYPTO_TRANSFERENCE,
    SET_FIAT_TRANSFERENCE,
    CLEAR_WALLET,
  } from '../actions';
  
  const initialState = {
    cryptoWallet: {
        id: null,
        hash: null,
    },
    fiatWallet: {
        id: null,
        agency: null,
        account: null
        },
    fiatTransference: {
        CPF: null,
        agency: null,
        account: null,
        ammount: null,
        },
    cryptoTransference: {
        id: null,
        address: null,
        ammount: null,
    },
  };
  
  export const withdrawReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CRYPTO_WALLET:
            return {
                ...state,
                cryptoWallet: action.payload,
            };
        case SET_FIAT_WALLET:
            return {
                ...state,
                fiatWallet: action.payload,
            };
        case SET_FIAT_TRANSFERENCE:
            return {
                ...state,
                fiatTransference: action.payload,
            };
        case SET_CRYPTO_TRANSFERENCE:
            return {
                ...state,
                cryptoTransference: action.payload
            };
        case CLEAR_WALLET:
            return {
                ...state,
                cryptoWallet: {
                    id: null,
                    hash: null,
                },
                fiatWallet: {
                    id: null,
                    agency: null,
                    account: null
                    },
                fiatTransference: {
                    id: null,
                    hash: null,
                    },
                cryptoTransference: null,
                };
        default:
            return state;
    }
  };