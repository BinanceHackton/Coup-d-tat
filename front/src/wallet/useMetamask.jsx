import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

function useMetamask() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const [networkName, setNetworkName] = useState(null);
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
                    setAccount(accounts[0]);

                    // 잔액 가져오기
                    const userBalance = await web3.eth.getBalance(accounts[0]);
                    setBalance(web3.utils.fromWei(userBalance, 'ether'));
                }
                const networkId = await web3.eth.net.getId();
                setNetworkId(networkId);
                const networkName = getNetworkName(networkId);
                setNetworkName(networkName);
            } else {
                alert('메타마스크를 설치해 주세요.');
            }
        };

        connect();
    }, []);

    return { account, balance, networkId, networkName };
};

export default useMetamask;