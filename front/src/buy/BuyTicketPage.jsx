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
import { useState } from 'react'
function BuyTicketPage() {
    const [buyTogle, setBuyTogle] = useRecoilState(buyButtonState)
    const [ticket, setTicket] = useState(0)
    const onClick = () => {
        buyTogle ? setBuyTogle(false) : setBuyTogle(true)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(ticket)
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
                <TicketCountInput name='ticket' placeholder='input' type='number' onChange={(e) => setTicket(e.target.value)} />
            </TicketCountDiv>
            <TicketDetailDiv>
                <TicketDetailText>Ticket x 50 = Silver Ticket x 1</TicketDetailText>
                <TicketDetailText>Ticket x 100 = Gold Ticket x 1</TicketDetailText>
            </TicketDetailDiv>
            <TicketBuyButton type='submit'>Purchase</TicketBuyButton>
        </BuyTicketDiv>
    )
}

export default BuyTicketPage