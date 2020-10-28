 
import {
    SET_CURRENCY_TYPE,
    SET_CRYPTO_WALLET,
    SET_FIAT_WALLET,
    SET_CRYPTO_TRANSFERENCE,
    SET_FIAT_TRANSFERENCE,
    CLEAR_WALLET,
} from './'

export const setActiveCurrency = currency => ({
    type: SET_CURRENCY_TYPE,
    payload: currency,
});

export const setCryptoWallet = (id, address) => ({
    type: SET_CRYPTO_WALLET,
    payload: {
        id: id,
        address: address,
        },
});

export const setFiatWallet = (phone) => ({
    type: SET_FIAT_WALLET,
    payload: phone
});
 
export const setFiatTransference = (CPF, phone, amount) => ({
    type: SET_FIAT_TRANSFERENCE,
    payload: {
        CPF: CPF,
        phone: phone,
        ammount: amount,
        }
});

export const setCryptoTransference = (id, address, amount) => ({
    type: SET_CRYPTO_TRANSFERENCE,
    payload: {
        id: id,
        address: address,
        ammount: amount,
        }
});

export const clearWallet = () => ({
    type: CLEAR_WALLET
});