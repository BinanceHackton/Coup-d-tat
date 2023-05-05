import styled from "styled-components";

export const GameSelectDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 0.2fr;
    position: absolute;
    width: 40vw;
    height: 30vh;
    z-index: 1;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: white;
`
export const GameSlectImageDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
`
export const GameSelectSort = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const GameSlectImage = styled.img`
    cursor: pointer;
`
export const GameSelectText = styled.div`
`
export const GameSelectExit = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    color: black;
    transition: .3s ease;
    background-color: #999999;
    color: white;
    cursor: pointer;
    :hover{
        transition: .3s ease;
        background-color: #1E78FF;
    }
    padding: 10px;
    border-radius: 0px 0px 10px 10px;
`