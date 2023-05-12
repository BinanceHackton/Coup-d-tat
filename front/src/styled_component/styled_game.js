import styled, { css } from "styled-components";

export const GameSelectViewDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 60px;
`

export const GameSelectViewTitle = styled.div`
    font-size: 38px;
`
export const GameSelectButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const GameSelectButton = styled.button`
    width: 272px;
    height: 73px;
    border: none;
    outline: none;
    font-size: 32px;
    border-radius: 10px;
    transition: all 0.3s;
    font-weight: bold;
    cursor: pointer;
    :hover{
        transition: all 0.3s;
        background-color: #FF6868;
        color: white;
    }
`
export const GameViewDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 100vh;
    min-height: 100vh;
    gap: 13px;
`

export const CardImageDiv = styled.div`
    display: flex;
    gap: 30px;
    min-height: 275px;
`
export const CardImage = styled.img`
    height: 216px;
    width: 173px;
    cursor: pointer;
    transition: all 0.3s;
    ${props =>
        props.active &&
        css`
            :hover {
                height: 236px;
                width: 193px;
                transition: all 0.3s;
                filter: drop-shadow(13px 12px 2px rgba(0, 0, 0, 0.4));
            }
        `}
`
export const RoundDiv = styled.div`
    font-size: 24px;
`
export const TimeBoxDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`
export const TimeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    width: 52px;
    background: linear-gradient(180deg, #FFA800 0%, rgba(235, 0, 255, 0.3) 100%);
    border-radius: 15px;
`
export const CountDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`
export const PointerCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const PointerCardText = styled.div`

`
export const CountText = styled.div`
    font-size: 20px;
`
export const ResultDiv = styled.div`

`
export const ResultCardImg = styled.img`

`
export const VersusDiv = styled.div`

`
export const SelectModal = styled.div` 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 100px;
    background-color: white;
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2));
    padding: 20px;
    border-radius: 10px;
`

export const SelectText = styled.div`
    font-size: 20px;
`
export const SelectButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
`
export const SelectButton = styled.button`
    cursor: pointer;
    width: 80px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 5px;
`