import styled from "styled-components";
export const NftRegisterModalDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`
export const NftRegisterModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 40vw;
    height: 420px;
    background-color: white;
    z-index: 1;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`
export const NftRegisterMessage = styled.div`
    
`
export const LodingIconImgDiv = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(207, 207, 207, 0.3);
    z-index: 1;
`
export const LodingIconImg = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 20vw;
`