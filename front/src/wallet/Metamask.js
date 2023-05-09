import React from 'react'
import Web3 from 'web3'
class WalletConnector {
    async connectMetamask() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("사용자가 연결을 거부했습니다.");
            }
        } else {
            alert("메타마스크를 찾을 수 없습니다. 브라우저 확장 프로그램을 설치하세요.");
        }
    }
}
export const meta = () => {
    const connect = new WalletConnector()
    connect.connectMetamask()
}