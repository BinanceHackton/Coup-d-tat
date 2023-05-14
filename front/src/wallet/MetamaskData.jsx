import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { useRecoilState } from 'recoil';
import { walletInfoState } from '../atom/atom';
import { TicketBox } from '../buy/TicketData';

export const MetamaskData = () => {
    const [data, setData] = useRecoilState(walletInfoState)
    const getNetworkName = (id) => {
        switch (id) {
            case 1:
                return 'Mainnet';
            case 3:
                return 'Ropsten';
            case 4:
                return 'Rinkeby';
            case 5:
                return 'Goerli';
            case 42:
                return 'Kovan';
            case 97:
                return 'BSC TestNet'
            default:
                return 'Unknown';
        }
    };
    useEffect(() => {
        const connect = async () => {
            const provider = await detectEthereumProvider();

            if (provider) {
                const web3 = new Web3(provider);

                // 계정 정보 가져오기
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    const account = accounts[0];
                    // 잔액 가져오기
                    const userBalance = await web3.eth.getBalance(account);
                    const balance = web3.utils.fromWei(userBalance, 'ether');
                    const networkId = await web3.eth.net.getId();
                    const networkName = getNetworkName(networkId);
                    const ticketToken = await TicketBox()
                    setData({
                        account: account,
                        balance: balance,
                        networkId: networkId,
                        networkName: networkName,
                        ticketToken: ticketToken
                    });
                }
            } else {
                alert('메타마스크를 설치해 주세요.');
            }
        };

        connect();
    }, []); // 의존성 배열이 빈 배열이므로 오류가 발생하지 않습니다.

    return data;
};
