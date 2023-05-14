import Web3 from "web3";
import { CGTicket } from "../CGTicket";
import detectEthereumProvider from "@metamask/detect-provider";

export const TicketBox = async () => {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider);
    const abi = CGTicket.abi;
    const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACTADDRESS);
    const accounts = await web3.eth.getAccounts();
    const balance = await contract.methods.balanceOf(accounts[0]).call();
    const tokenIds = [];
    for (let i = 0; i < balance; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call();
        tokenIds.push(tokenId);
    }
    return tokenIds
}

