import { CGTicket } from '../CGTicket'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';

export const Issuance = async (props) => {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider);
    const abi = CGTicket.abi;
    const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACTADDRESS);
    const accounts = await web3.eth.getAccounts();

    if (props.ticket > 0 && props.ticket <= 5) {
        try {
            props.setLoding(true)
            const issuance = await contract.methods.mintNFTs(props.ticket).send({
                from: accounts[0]
            });
            // 발행된 NFT를 MetaMask 지갑에 추가하기
            const tokenId = issuance.events.Transfer.returnValues.tokenId;
            props.setTokenId(tokenId)
            props.setRegister(true)
            props.setBuyTogle(false)
            props.setLoding(false)
        } catch (error) {
            alert('계약을 거부했습니다.');
        }
    } else {
        alert('갯수를 확인해주세요');
    }
};
