import { useRecoilValue } from "recoil"
import { tokenIdState } from "../atom/atom"

export const RegisterMessage = () => {
    const tokenId = useRecoilValue(tokenIdState)
    const messageBox = [
        `축하합니다! NFT를 구매했습니다. 메타마스크 지갑에서 이 NFT를 볼 수 있도록 추가하려면 다음 단계를 따르십시오.`,
        `1. 메타마스크를 엽니다.`,
        `2. 'Assets' 탭을 클릭합니다.`,
        `3. 'Add Token'을 클릭합니다.`,
        `4. 'Custom Token' 탭을 선택합니다.`,
        `5. 'Token Contract Address'에 다음 컨트랙트 주소를 입력하십시오: ${process.env.REACT_APP_CONTRACTADDRESS}`,
        `6. 'Token Symbol' 및 'Decimals of Precision'이 자동으로 채워지는지 확인하십시오. 그렇지 않은 경우 수동으로 입력하십시오.`,
        `7. 'Next'를 클릭한 다음 'Add Tokens'를 클릭하여 토큰을 지갑에 추가합니다.`,
        `8. 이제 메타마스크 지갑에서 NFT를 볼 수 있습니다. NFT를 찾으려면 토큰 ID ${tokenId}를 참조하십시오.`
    ]
    return (
        messageBox
    )
}