import React, { Component, useState } from 'react'
import king from '../gameImage/King.svg'
import knight from '../gameImage/Knight.svg'
import noble from '../gameImage/Noble.svg'
import peasant from '../gameImage/Peasant.svg'
import CardBack from '../gameImage/CardBack.svg'
import {
    CardImage,
    CountDiv,
    GameViewDiv,
    ResultCardImg,
    ResultDiv,
    RoundDiv,
    VersusDiv,
    GameSelectButton,
    GameSelectViewDiv,
    GameSelectViewTitle,
    GameSelectButtonDiv,
    CardImageDiv,
    TimeBox,
    TimeBoxDiv,
    CountText,
    SelectButtonDiv,
    SelectModal,
    SelectButton,
    SelectText,
    PointerCardDiv,
    PointerCardText
} from '../styled_component/styled_game'
class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userScore: 0,
            opponentScore: 0,
            userKingWins: 0,
            opponentKingWins: 0,
            round: 1,
            userDeck: [],
            opponentDeck: [],
            isGameStarted: false,
            userTimeRemaining: 10,
            opponentTimeRemaining: 10,
            userCard: '',
            opponentCard: '',
            deckCount: {
                peasant: 3,
                knight: 2,
                noble: 2,
                king: 2,
            },
            isTogle: false,
            chose: '',
            isCardTogle: false,
        };
    }

    createCard(name) {
        return {
            name,
            doesBeat: (opponent) => {
                // 게임 규칙에 따라 카드 간 승패를 계산하여 true/false를 반환
                switch (name) {
                    case 'king':
                        return opponent.name === 'noble' || opponent.name === 'knight';
                    case 'noble':
                        return opponent.name === 'knight' || opponent.name === 'peasant';
                    case 'knight':
                        return opponent.name === 'peasant';
                    case 'peasant':
                        return opponent.name === 'king';
                }
            },
        };
    }

    distributeCards(cardCounts) {
        const deck = []; //덱 생성
        // 각 카드 이름과 개수에 대해 반복
        for (const [cardName, count] of Object.entries(cardCounts)) {
            // 카드 개수만큼 반복
            for (let i = 1; i <= count; i++) {
                // 카드 객체 생성
                const card = this.createCard(cardName);
                // 덱에 카드 추가
                deck.push(card);
            }
        }
        // 완성된 덱 반환
        return deck;
    }
    //리셋
    reSet() {
        this.setState({
            userScore: 0,
            opponentScore: 0,
            userKingWins: 0,
            opponentKingWins: 0,
            round: 1,
            userDeck: [],
            opponentDeck: [],
            isGameStarted: true,
            userTimeRemaining: 10,
            opponentTimeRemaining: 10,
            userCard: '...',
            opponentCard: '...',
            deckCount: {
                peasant: 3,
                knight: 2,
                noble: 2,
                king: 2,
            },
            isTogle: false,
            chose: '',
            isCardTogle: false,
        })
    }
    selectCard(number) {
        this.setState({
            chose: number
        })
    }
    selectCardTogle(isCardTogle) {
        this.setState({
            isCardTogle: !isCardTogle,
            userTimeRemaining: 1
        })
    }
    selectModal(isTogle) {
        this.setState({
            isTogle: !isTogle
        })
    }
    async getUserInput(timeout, availableChoices, typeTime) {
        // Promise를 사용하여 비동기적으로 입력 처리
        return new Promise((resolve, reject) => {
            // 사용자에게 질문 출력 및 입력 받기
            this.setState({ [typeTime]: timeout / 1000 });

            // 초마다 남은 시간 업데이트
            const timer = setInterval(() => {
                this.setState((prevState) => ({ [typeTime]: prevState?.[typeTime] - 1 }));

                // 사용자가 선택한 경우 인터벌 클리어 및 resolve
                if (this.state.isCardTogle) {
                    clearInterval(timer);
                    let v = 0
                    console.log(this.state.chose)
                    for (let i = 0; i < availableChoices.length; i++) {
                        if (availableChoices[i].name === this.state.chose) {
                            v = i
                            break
                        }
                    }
                    resolve(v);
                }
            }, 1000);
            // 타임아웃 후 무작위 선택 및 인터벌 클리어
            setTimeout(() => {
                if (!this.state.isCardTogle) {
                    clearInterval(timer);
                    const randomChoice = Math.floor(Math.random() * availableChoices.length);
                    console.log(`시간 초과! 무작위로 선택된 카드 : ${randomChoice}`);
                    resolve(randomChoice);
                }
            }, timeout);
        });
    };

    gameStart = async () => {
        this.reSet()
        const updateScores = (winner) => {
            const scoreChange = 30; // 승리/패배 시 점수 차이

            if (winner === 'user') {
                userScore += scoreChange;
                opponentScore -= scoreChange;
            } else if (winner === 'opponent') {
                opponentScore += scoreChange;
                userScore -= scoreChange;
            }
        }
        const totalRounds = 9; //게임 총 라운드
        const cardCounts = { king: 2, noble: 2, knight: 2, peasant: 3 }; // 각 카드 종류별 장수

        //플레이어가 가지는 카드 덱 생성
        const userDeck = this.distributeCards(cardCounts);
        const opponentDeck = this.distributeCards(cardCounts);
        let userScore = 0; // 플레이어 1의 점수
        let opponentScore = 0; //플레이어 2의 점수
        let userKingWins = 0;
        let opponentKingWins = 0;
        //사용자 입력 받기 함수
        // 총 라운드 수 만큼 게임 실행
        for (let round = 1; round <= totalRounds; round++) {

            this.setState({ round }); //라운드 업데이트
            console.log(`라운드 ${round}`);

            //사용자가 선택한 카드 
            const userCardIndex = await this.getUserInput(10000, userDeck, 'userTimeRemaining');
            console.log(userCardIndex)
            const userCard = userDeck.splice(userCardIndex, 1)[0]; //선택한 카드를 덱에서 제거하고 저장
            let count = this.state.deckCount
            count = { ...count, [userCard.name]: count[userCard.name] - 1 }
            this.setState({
                deckCount: count,
                chose: '',
                isCardTogle: false
            });
            //상대방이 선택한 카드
            const opponentCardIndex = await this.getUserInput(10000, opponentDeck, 'opponentTimeRemaining');
            const opponentCard = opponentDeck.splice(opponentCardIndex, 1)[0]; // 선택한 카드를 덱에서 제거하고 저장
            console.log(userDeck, userCard, userCardIndex)
            console.log(opponentDeck, opponentCard, opponentCardIndex)
            console.log(`플레이어 1의 카드: ${userCard.name}`);
            console.log(`플레이어 2의 카드: ${opponentCard.name}`);
            this.setState({
                userCard: userCard.name,
                opponentCard: opponentCard.name,
                userTimeRemaining: 10,
                opponentTimeRemaining: 10,
            })
            // 승패 결과 계산
            if (userCard.doesBeat(opponentCard)) {
                console.log('플레이어 1 승리!');
                userScore += userCard.name === 'peasant' && opponentCard.name === 'king' ? 2 : 1; //특정 상황에서 추가 점수 부여
            } else if (opponentCard.doesBeat(userCard)) {
                console.log('플레이어 2 승리 !');
                opponentScore += opponentCard.name === 'peasant' && userCard.name === 'king' ? 2 : 1; // 특정 상황에서 추가 점수 부여
            } else {
                console.log('무승부!');
                // 무승부인 경우 각 플레이어의 점수에서 1점씩 차감하되, 0점 이하로는 안 떨어지게함
            }
            this.setState({ userScore, opponentScore }); // 점수 업데이트
            console.log(`현재 스코어 - 플레이어 1: ${userScore}, 플레이어 2: ${opponentScore}\n`);

            if (userCard.name === 'peasant' && opponentCard.name === 'king') {
                userKingWins++;
            } else if (opponentCard.name === 'peasant' && userCard.name === 'king') {
                opponentKingWins++;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));

        }

        if (userScore === opponentScore) {
            if (userKingWins > opponentKingWins) {
                console.log('평민이 왕을 더 많이 이겼으므로 플레이어 1이 승리했습니다.');
            } else if (opponentKingWins > userKingWins) {
                console.log('평민이 왕을 더 많이 이겼으므로 플레이어 2가 승리했습니다.');
            }
        }

        // 최종 결과 출력 
        alert('게임이 종료되었습니다.');
        if (userScore > opponentScore) {
            alert('플레이어가 이겼습니다!');
            updateScores('user');
        } else if (userScore < opponentScore) {
            alert('컴퓨터가 이겼습니다!');
            updateScores('opponent');
        }
        this.setState({ isGameStarted: false });
    }
    render() {
        const { userScore, opponentScore, round, isGameStarted, userTimeRemaining, opponentTimeRemaining, userCard, opponentCard, deckCount, isTogle, isCardTogle, chose } = this.state;
        const cardImages = [CardBack, CardBack, CardBack, CardBack]
        const characterIcons = [[peasant, 'peasant'], [knight, 'knight'], [noble, 'noble'], [king, 'king']]
        return (
            isGameStarted ? (
                <GameViewDiv>
                    <CardImageDiv>
                        {cardImages.map((e, index) =>
                            <CardImage active={false} key={index} src={e}></CardImage>
                        )}
                    </CardImageDiv>
                    <RoundDiv>Round: {round}</RoundDiv>
                    <TimeBoxDiv>
                        <PointerCardDiv>
                            <PointerCardText>Computer: {opponentScore}</PointerCardText>
                            <PointerCardText>Card: {opponentCard}</PointerCardText>
                        </PointerCardDiv>
                        <TimeBox>{userTimeRemaining}</TimeBox>
                        <TimeBox>{opponentTimeRemaining}</TimeBox>
                        <PointerCardDiv>
                            <PointerCardText>User: {userScore}</PointerCardText>
                            <PointerCardText>Card: {userCard}</PointerCardText>
                        </PointerCardDiv>
                    </TimeBoxDiv>
                    <CardImageDiv>
                        {characterIcons.map((e, index) =>
                            <CountDiv>
                                {isTogle ? (
                                    <SelectModal>
                                        <SelectText>{`${chose} Chose?`}</SelectText>
                                        <SelectButtonDiv>
                                            <SelectButton onClick={() => { this.selectCardTogle(isCardTogle); this.selectModal(isTogle) }}>Yes</SelectButton>
                                            <SelectButton onClick={() => this.selectModal(isTogle)}>No</SelectButton>
                                        </SelectButtonDiv>
                                    </SelectModal>
                                ) : (null)}
                                <CardImage onClick={() => { this.selectModal(isTogle); this.selectCard(e[1]) }} active={true} CardImage key={index} src={e[0]} ></CardImage>
                                <CountText>{deckCount[e[1]]}</CountText>
                            </CountDiv>
                        )}
                    </CardImageDiv>
                </GameViewDiv >
            ) : (
                <GameSelectViewDiv>
                    <GameSelectViewTitle>Game Select</GameSelectViewTitle>
                    <GameSelectButtonDiv>
                        <GameSelectButton value='Computer' onClick={this.gameStart}>Computer</GameSelectButton>
                        <GameSelectButton value='Online' onClick={() => alert('아직 구현')} >Online</GameSelectButton>
                    </GameSelectButtonDiv>
                </GameSelectViewDiv>
            )
        );
    }
}

export default GameView