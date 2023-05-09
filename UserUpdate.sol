pragma solidity ^0.6.0;

import "./gameinfo.sol";

contract UserUpdate is GameInfo {

    function _updateUserInfo() public { // 유저의 정보를 gameinfo.sol에서 받아와 업데이트함.

        User memory winner = addressToUser[winnerAddress];        // 승자의 매핑된 주소에 접근하는 구문
        User memory loser = addressToUser[loserAddress];       // 패자의 매핑된 주소에 접근하는 구문

        winner.winCount++;       // 승자의 카운트에 ++
        winner.totalScore += scoreDiff;      // 승자의 총점수에 득실차를 더함

        loser.loseCount++;       // 패자의 카운트에 --
        loser.totalScore -= scoreDiff;        // 패자의 총점수에 득실차를 뺌

    } 

}