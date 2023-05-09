pragma solidity ^0.8.9;

import "@openzeppelin-contracts/contracts/access/Ownable.sol";



contract UserInfo is Ownable {

    uint256 private totalToken = 0;     // 총 토큰 초기화
    uint8 private playerCount = 0;      // 플레이어 숫자 초기화


    struct User {   // 사용자에 대한 구조체 
        
        uint8 winCount;     // 이긴 횟수
        uint8 lossCount;    // 진 횟수
        int16 totalScore;  // 총 점수차이 (음수값이 나올 수도 있므로 int를 사용)
        bool isRegistered; // 사용자의 등록 여부 확인 변수 
    }

    mapping (address => User) public addressToUser; // 사용자의 주소와 사용자의 정보가 매핑되어 있음.

    
    address[] playerAddress = new address[](2);      // 1대1이므로 서로의 주소를 바인딩 해놓는 배열
    


    function _makeTotalToken(address _player, uint256 _betToken) external payable {    // 토큰을 취합하는 함수 

        require(playerCount >= 0 && playerCount < 2); // 플레이어가 2명 이하인지 확인하는 구문
        require(msg.sender == _player); // 해당 플레이어인지 검증하는 구문
        require(uint256(msg.value) == _betToken);    // msg.value와 해당 배팅 금액이 동일한지 확인하는 구문

        require(addressToUser[msg.sender].isRegistered, "User not rigistered"); // 사용자가 이미 등록되어 있는지 확인 

        playerAddress[playerCount] = msg.sender;       // 배열에 플레이어 주소 저장
        totalToken += msg.value;     // 토큰을 totalToken에 저장하는 구문
        playerCount++;       // 플레이어의 수를 확인하기 위해 ++ 시키는 구문

    }

    function registerUser() external {
        require(!addressToUser[msg.sender].isRegistered, "User already registered");

        addressToUser[msg.sender].isRegistered = true;
    }


    
}