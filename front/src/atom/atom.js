import { atom } from 'recoil'
export const buyButtonState = atom({
    key: 'buyButtonState',
    default: false
})
export const GameButtonState = atom({
    key: 'GameButtonState',
    default: false
})
export const NavButtonState = atom({
    key: 'NavButtonState',
    default: {
        rank: false,
        exchange: false,
        wallet: false
    }
})