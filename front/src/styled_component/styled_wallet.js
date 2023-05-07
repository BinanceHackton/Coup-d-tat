import styled from "styled-components";
export const NotClikc = styled.div`
    position: absolute;
    background: rgba(215, 215, 215, 0.42);
    width: 100vw;
    height: 100vh;
    z-index: 1;
`
export const WalletDiv = styled.div`
    display: grid;
    grid-template-rows: 0.1fr 0.1fr 0.6fr;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 35vw;
    height: 50vh;
    background-color: white;
    border-radius: 13px;
    z-index: 1;
`
export const TitleText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

`

export const WalletListdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 10px;
    cursor: pointer;
`
export const WalletImage = styled.img`
`
export const WalletText = styled.div`
`