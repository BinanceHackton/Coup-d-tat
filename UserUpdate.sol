pragma solidity ^0.8.9;

import "./gameinfo.sol";

contract UserUpdate is GameInfo {

    function _updateUserInfo() { // 유저의 정보를 gameinfo.sol에서 받아와 업데이트함.

        User memory winner = addressToUser[super._winnerAddress];        // 승자의 매핑된 주소에 접근하는 구문
        User memory loser = addressToUser[super._loserAddress];       // 패자의 매핑된 주소에 접근하는 구문

        winner.winCount = winner.winCount.add(1);       // 승자의 카운트에 ++
        winner.totalScore = winner.totalScore.add(_scoreDiff);      // 승자의 총점수에 득실차를 더함

        loser.loseCount = loser.loseCount.add(1);       // 패자의 카운트에 --
        loser.totalScore = loser.totalScore.sub(_scoreDiff);        // 패자의 총점수에 득실차를 뺌

    } 

}