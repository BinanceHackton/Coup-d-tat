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
import { buyButtonState, registerState } from '../atom/atom'
import { NftRegisterMessage, NftRegisterModal, NftRegisterModalDiv } from '../styled_component/styled_modal'
import { RegisterMessage } from '../buy/RegisterMessage'
import { CloseButton } from '../styled_component/styled_buy'
import CloseIcon from '../img/Close.svg'
function BuyBox() {
    const [buyTogle, setBuyTogle] = useRecoilState(buyButtonState)
    const [register, setRegister] = useRecoilState(registerState)
    const onClick = (data, setData) => {
        data ? setData(false) : setData(true)
    }
    const message = RegisterMessage()
    return (
        <>
            <BoxDiv active='FEFF86' onClick={() => onClick(buyTogle, setBuyTogle)}>
                <Image src={BuyIcon} />
                <SelctText>Buy Tickets</SelctText>
            </BoxDiv>
            {buyTogle ? (<BuyTicketPage></BuyTicketPage>) : (
                null
            )}
            {register ? (
                <NftRegisterModal>

                    <NftRegisterModalDiv>
                        <CloseButton src={CloseIcon} onClick={() => onClick(register, setRegister)} />
                    </NftRegisterModalDiv>
                    {message.map((e, index) => {
                        return <NftRegisterMessage key={index}>{e}</NftRegisterMessage>
                    })}
                </NftRegisterModal>
            ) : (null)}
        </>
    )
}

export default BuyBox