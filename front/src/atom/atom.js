import { atom } from 'recoil'
export const buyButtonState = atom({
    key: 'buyButtonState',
    default: false
})
export const gameButtonState = atom({
    key: 'GameButtonState',
    default: false
})
export const navButtonState = atom({
    key: 'NavButtonState',
    default: {
        rank: false,
        exchange: false,
        wallet: false
    }
})
export const walletInfoState = atom({
    key: 'WalletInfo',
    default: {
        account: null,
        balance: null,
        networkId: null,
        networkName: null,
        ticketToken: []
    }
})
export const registerState = atom({
    key: 'Register',
    default: false
})
export const tokenIdState = atom({
    key: 'tokenId',
    default: 'unKnown'
})
export const lodingState = atom({
    key: 'lodingState',
    default: false
})
export const ticketCollectionState = atom({
    key: 'ticketCollectionState',
    default: []
})