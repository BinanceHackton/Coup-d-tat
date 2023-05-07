pragma solidity ^0.8.9;

import "./userinfo.sol";

contract GameHandler is GameInfo {

    function _getReward() {
        require(super._winnerAddress == msg.sender);        // 해당 함수를 불러오는 주소가 승자의 주소와 맞는지 검증
        transfer(super._winnerAddress, super.totalToken);       // 승자의 주소에 총 토큰을 전송

    }
}