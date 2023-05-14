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
import { useRecoilState, useRecoilValue } from 'recoil'
import { registerState, walletInfoState, buyButtonState, tokenIdState, lodingState } from '../atom/atom'
import { useState } from 'react'
import { Issuance } from './TicketIssuance'
import LodingIcon from '../img/Loding.svg'
import { LodingIconImg, LodingIconImgDiv } from '../styled_component/styled_modal'
function BuyTicketPage() {
    const [buyTogle, setBuyTogle] = useRecoilState(buyButtonState)
    const ACCOUNT = useRecoilValue(walletInfoState)
    const [ticket, setTicket] = useState(0)
    const [register, setRegister] = useRecoilState(registerState)
    const [tokenId, setTokenId] = useRecoilState(tokenIdState);
    const [loding, setLoding] = useRecoilState(lodingState)
    const onClick = () => {
        buyTogle ? setBuyTogle(false) : setBuyTogle(true)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await Issuance({ ticket, setBuyTogle, setRegister, setTokenId, setLoding })
    }
    return (
        <BuyTicketDiv onSubmit={onSubmit}>
            {loding ? (
                <LodingIconImgDiv>
                    <LodingIconImg src={LodingIcon} />
                </LodingIconImgDiv>

            ) : (null)}
            <CloseButtonDiv>
                <CloseButton src={CloseIcon} onClick={onClick} />
            </CloseButtonDiv>
            <TicketInfoDiv>
                <TicketImage src={TicketIcon} />
                <TicketTextDiv>
                    <TicketText>Game Ticket</TicketText>
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