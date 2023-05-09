import styled from "styled-components";
export const NotClikc = styled.div`
    position: absolute;
    background: rgba(215, 215, 215, 0.42);
    width: 100vw;
    height: 100vh;
    z-index: 1;
`
export const WalletDiv = styled.div`
    display: flex;
    flex-direction: column;
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
    justify-content: start;
    gap: 20px;
    cursor: pointer;
    padding: 10px;
    transition: all .3s;
    :hover{
        transition: all .3s;
        background: #1E78FF;
        color: white;
    }
`
export const WalletImage = styled.img`
`
export const WalletText = styled.div`
`
export const WalletInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    font-size: 17px;
`
export const WalletInfoAccount = styled.div`
`
export const WalletInfoBalance = styled.div`
    
`
export const WalletInfoNetworkName = styled.div`
    
`
export const WalletInfoTicket = styled.div`
    
`
