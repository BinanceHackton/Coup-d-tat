import React from 'react'
import {
    NavDiv,
    LogoText,
    ImageDiv,
    Image,
    ImageTextDiv,
    ImageText
} from '../styled_component/styled_nav'
import Rank from '../img/Rank.svg'
import Wallet from '../img/Wallet.svg'
import Warehouse from '../img/Warehouse.svg'
function Navigation() {
    return (
        <NavDiv>
            <LogoText>coup d'État</LogoText>
            <ImageDiv>
                <ImageTextDiv>
                    <Image src={Rank} />
                    <ImageText>
                        Rank
                    </ImageText>
                </ImageTextDiv>
                <ImageTextDiv>
                    <Image src={Warehouse} />
                    <ImageText>
                        Exchange
                    </ImageText>
                </ImageTextDiv>
                <ImageTextDiv>
                    <Image src={Wallet} />
                    <ImageText>
                        Wallet
                    </ImageText>
                </ImageTextDiv>
            </ImageDiv>
        </NavDiv>
    )
}

export default Navigation