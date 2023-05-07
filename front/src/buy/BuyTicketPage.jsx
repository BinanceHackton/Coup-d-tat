import React from 'react'
import {
    BuyTicketDiv,
    CloseButton,
    TicketBuyButton,
    TicketCountDiv,
    TicketCountInput,
    TicketDetailDiv,
    TicketDetailText,
    TicketImage,
    TicketInfoDiv,
    TicketText,
    TicketTextDiv,
    CloseButtonDiv,
    TicketCountImage
} from '../styled_component/styled_buy'
import CloseIcon from '../img/Close.svg'
import TicketIcon from '../img/Ticket.svg'
import { useRecoilState } from 'recoil'
import { buyButtonState } from '../atom/atom'
function BuyTicketPage() {
    const [buyTogle, setBuyTogle] = useRecoilState(buyButtonState)

    const onClick = () => {
        buyTogle ? setBuyTogle(false) : setBuyTogle(true)
    }
    const onSubmit = (e) => {
    }
    return (
        <BuyTicketDiv onSubmit={onSubmit}>
            <CloseButtonDiv>
                <CloseButton src={CloseIcon} onClick={onClick} />
            </CloseButtonDiv>
            <TicketInfoDiv>
                <TicketImage src={TicketIcon} />
                <TicketTextDiv>
                    <TicketText>Game Ticket</TicketText>
                    <TicketText>#1234</TicketText>
                    <TicketText>0.xxxx BNB</TicketText>
                </TicketTextDiv>
            </TicketInfoDiv>
            <TicketCountDiv>
                <TicketCountInput placeholder='input' type='number' />
            </TicketCountDiv>
            <TicketDetailDiv>
                <TicketDetailText>Ticket x 50 = Silver Ticket x 1</TicketDetailText>
                <TicketDetailText>Ticket x 100 = Gold Ticket x 1</TicketDetailText>
            </TicketDetailDiv>
            <TicketBuyButton type='submit' disabled>Purchase</TicketBuyButton>
        </BuyTicketDiv>
    )
}

export default BuyTicketPage