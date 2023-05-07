pragma solidity ^0.8.9;

import "@openzeppelin-contracts/contracts/access/Ownable.sol";
import "@openzeppelin-contracts/contracts/utils/math/SafeMath.sol";


contract UserInfo is Ownable, SafeMath {

    uint256 private totalToken = 0;     // 총 토큰 초기화
    uint8 private playerCount = 0;      // 플레이어 숫자 초기화

    using SafeMath for uint256;
    using SafeMath for uint16;
    using SafeMath for uint8;
    using SafeMath for int16;

    struct User {   // 사용자에 대한 구조체 
        
        uint8 winCount;     // 이긴 횟수
        uint8 lossCount;    // 진 횟수
        int16 totalScore;  // 총 점수차이 (음수값이 나올 수도 있므로 int를 사용)
    }

    mapping (address => User) public addressToUser; // 사용자의 주소와 사용자의 정보가 매핑되어 있음.

    constructor() {
        User memory user = User(0, 0, 0);
        addressToUser[msg.sender] = user;    // 컨트랙트를 호출 했을 때 생성자 초기화 
    }

    address[] playerAddress = new adress[](2);      // 1대1이므로 서로의 주소를 바인딩 해놓는 배열
    


    function _makeTotalToken(address _player, uint256 _betToken) public payable {    // 토큰을 취합하는 함수 

        require(playerCount >= 0 && playerCount < 2); // 플레이어가 2명 이하인지 확인하는 구문
        require(msg.sender == _player); // 해당 플레이어인지 검증하는 구문
        require(uint256(msg.value) == _betToken);    // msg.value와 해당 배팅 금액이 동일한지 확인하는 구문

        playerAddress[playerCount] = msg.sender;       // 배열에 플레이어 주소 저장
        totalToken = totalToken.add(msg.value);     // 토큰을 totalToken에 저장하는 구문
        playerCount = playerCount.add(1);       // 플레이어의 수를 확인하기 위해 ++ 시키는 구문

    }


    
}