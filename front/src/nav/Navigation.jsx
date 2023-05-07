import React, { useEffect, useMemo } from 'react'
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
import { meta } from '../wallet/Metamask'
import { rank } from '../rank/Rank'
import { exchange } from '../exchange/Exchange'
import { useRecoilState } from 'recoil'
import { NavButtonState } from '../atom/atom'
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
    const [select, setSelect] = useRecoilState(NavButtonState)
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
                <LogoText>coup d'État</LogoText>
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