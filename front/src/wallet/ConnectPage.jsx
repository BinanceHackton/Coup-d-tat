import React from 'react'
import {
    NotClikc,
    WalletDiv,
    TitleText,
    WalletImage,
    WalletListdiv,
    WalletText,
    WalletInfoAccount,
    WalletInfoBalance,
    WalletInfoDiv,
    WalletInfoNetworkName,
    WalletInfoTicket
} from '../styled_component/styled_wallet'
import MetamaskIcon from '../img/Metamask.svg'
import CloseIcon from '../img/Close.svg'
import { CloseButton, CloseButtonDiv } from '../styled_component/styled_buy'
import { useRecoilState } from 'recoil'
import { NavButtonState } from '../atom/atom'
import { meta } from './Metamask'
import useMetamask from './useMetamask'
function ConnectPage() {
    const [select, setSelect] = useRecoilState(NavButtonState)
    const { account, balance, networkId, networkName } = useMetamask();
    const handleButton = (handler) => {
        setSelect({ ...select, [handler]: false })
    }
    const connect = () => {
        meta()
    }
    return (
        <>
            <NotClikc></NotClikc>
            <WalletDiv>
                <CloseButtonDiv>
                    <CloseButton src={CloseIcon} onClick={() => handleButton('wallet')} />
                </CloseButtonDiv>
                <TitleText>Wallet Connect!</TitleText>
                <WalletListdiv onClick={connect}>
                    <WalletImage src={MetamaskIcon} />
                    <WalletText>Metamask</WalletText>
                </WalletListdiv>
                <WalletInfoDiv>
                    <WalletInfoNetworkName>networkName: {networkName}</WalletInfoNetworkName>
                    <WalletInfoAccount>account: {account?.slice(0, 6) + ' ... ' + account?.slice(38, 42)}</WalletInfoAccount>
                    <WalletInfoBalance>balance: {balance}</WalletInfoBalance>
                    <WalletInfoTicket>Ticket: {0}</WalletInfoTicket>
                </WalletInfoDiv>
            </WalletDiv>
        </>
    )
}

export default ConnectPage