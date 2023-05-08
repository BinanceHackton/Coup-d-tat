pragma solidity ^0.8.9;

import "./userinfo.sol";

contract GameInfo is UserInfo {


    IBEP20 public token; // token 인스턴트 생성?

    address winnerAddress;      // 승자의 주소 
    address loserAddress;       // 패자의 주소
    uint8 scoreDiff;            // 총 득실차 

    constructor(address _token) {
        token = IBEP20(_token);
    }

    function getGameInfo(address _winnerAddress, address _loserAddress, uint8 _scoreDiff) external {    // 승자,패자,득실차 정보를 받아옴

        require(super.playerAddress[0] == _winnerAddress || super.playerAddress[0] == _loserAddress);   // 받아온 사용자의 정보가 1대1 바인딩된 정보와 같은지 확인하는 구문
        require(super.playerAddress[1] == _winnerAddress || super.playerAddress[1] == _loserAddress);   // 0과 1 어디의 주소가 승자인지 패자인지 몰라서 or 구문을 2번 반복해서 검증

        require(_winnerAddress != address(0));
        require(_loserAddress != address(0));       // 주소의 표기법이 맞는지 아닌지를 확인하는 구문

        winnerAddress = _winnerAddress;     // 받아온 값을 컨트랙트에 저장
        loserAddress = _loserAddress;
        scoreDiff = _scoreDiff;
    }

    
}