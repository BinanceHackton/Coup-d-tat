import React from 'react'
import {
    BoxDiv,
    SelctText
} from '../styled_component/styled_content'
import {
    Image
} from '../styled_component/styled_nav'
import BuyIcon from '../img/Buy.svg'
import BuyTicketPage from '../buy/BuyTicketPage'
import { useRecoilState } from 'recoil'
import { buyButtonState } from '../atom/atom'
function BuyBox() {
    const [buyTogle, setBuyTogle] = useRecoilState(buyButtonState)
    const onClick = () => {
        buyTogle ? setBuyTogle(false) : setBuyTogle(true)
    }
    return (
        <>
            <BoxDiv active='FEFF86' onClick={onClick}>
                <Image src={BuyIcon} />
                <SelctText>Buy Tickets</SelctText>
            </BoxDiv>
            {buyTogle ? (<BuyTicketPage></BuyTicketPage>) : (null)}
        </>
    )
}

export default BuyBox