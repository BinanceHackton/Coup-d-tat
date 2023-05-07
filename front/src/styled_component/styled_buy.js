import styled from "styled-components";

export const BuyTicketDiv = styled.form`
    display: grid;
    grid-template-rows: 0.1fr 0.2fr 0.2fr 1fr 0.22fr;
    position: absolute;
    width: 35vw;
    height: 70vh;
    z-index: 1;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: white;
`
export const CloseButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    border-radius: 10px 10px 0px 0px;
`
export const CloseButton = styled.img`
    cursor: pointer;
`

export const TicketInfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 5px;
`
export const TicketImage = styled.img`

`
export const TicketTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`
export const TicketText = styled.div`
    font-size: 19px;
`
export const TicketCountDiv = styled.div`
    display: flex;

`
export const TicketCountInput = styled.input`
    position: relative;
    outline: none;
    text-align: center;
    border: none;
    height: 30px;
    width: 60px;
    border-bottom: 2px solid gray;
    left: 22%;
    font-size: 17px;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }
    :hover{
        border-bottom: 2px solid black;
    }
`
export const TicketDetailDiv = styled.div`
    display: flex;
    flex-direction:column;
    gap: 18px;
    padding: 10px;
    background-color: #F6F6F6;
    overflow-y: scroll;
`
export const TicketDetailText = styled.div`
    font-size: 14px;
`
export const TicketBuyButton = styled.button`
    outline: none;
    border: none;
    background-color: #999999;
    color: white;
    font-size: 20px;
    transition: .3s ease;
    cursor: pointer;
    :hover{
        transition: .3s ease;
        background-color: #1E78FF;
    }

    border-radius: 0px 0px 10px 10px;
`