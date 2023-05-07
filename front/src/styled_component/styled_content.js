import styled from "styled-components";

export const ContentDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 40px;
`

export const BoxDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 47vh;
    background-color: ${porps => `#${porps.active}`};
    border-radius:10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    gap:55px;
    cursor: pointer;
`
export const SelctText = styled.div`
    font-size: 1.3em;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`