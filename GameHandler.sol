pragma solidity ^0.8.9;

import "./userinfo.sol";

contract GameHandler is GameInfo {
    

    constructor(address _tokenAddress) GameInfo(_tokenAddress){} // ??

    function _getReward() external {
        require(winnerAddress == msg.sender);        // 해당 함수를 불러오는 주소가 승자의 주소와 맞는지 검증
        token.transfer(winnerAddress, totalToken);       // 승자의 주소에 총 토큰을 전송

    }
}