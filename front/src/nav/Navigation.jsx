import React from 'react'
import {
    NavDiv,
    LogoText,
    ImageDiv,
    Image,
    ImageTextDiv,
    ImageText
} from '../styled_component/styled_nav'
import RankIcon from '../img/Rank.svg'
import WalletIcon from '../img/Wallet.svg'
import WarehouseIcon from '../img/Warehouse.svg'
import { useRecoilState } from 'recoil'
import { navButtonState } from '../atom/atom'
import ConnectPage from '../wallet/ConnectPage'
const images = [{ img: RankIcon, text: 'Rank', handler: 'rank' }, { img: WarehouseIcon, text: 'Exchange', handler: 'exchange' }, { img: WalletIcon, text: 'Wallet', handler: 'wallet' }];

function NavImage(props) {
    return (
        <ImageTextDiv onClick={() => props.onClick(props.handler)}>
            <Image src={props.img} alt={props.text} />
            <ImageText>{props.text}</ImageText>
        </ImageTextDiv>
    );
}
function Navigation() {
    const [select, setSelect] = useRecoilState(navButtonState)
    const handleButton = (handler) => {
        setSelect({ ...select, [handler]: true })
    }
    const render = () => {
        console.log(select)
        if (select.wallet) {
            return <ConnectPage />
        }
    }
    return (
        <>
            <NavDiv>
                <LogoText>Resistance Girls</LogoText>
                <ImageDiv>
                    {images.map((image, index) => (
                        <NavImage key={index} img={image.img} text={image.text} onClick={handleButton} handler={image.handler} />
                    ))}
                </ImageDiv>
            </NavDiv>
            {render()}
        </>
    );
}

export default Navigation