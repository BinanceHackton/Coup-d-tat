import React, { useState } from 'react';
import {
    GameSelectDiv,
    GameSelectExit,
    GameSelectSort,
    GameSelectText,
    GameSlectImage,
    GameSlectImageDiv,
} from '../styled_component/styled_gameSelect';
import Closed from '../img/DoorClosed.svg';
import Open from '../img/DoorOpen.svg';
import { GameButtonState } from '../atom/atom';
import { useRecoilState } from 'recoil';
const GameLevel = (props) => {
    const [open, setOpen] = useState(false)
    const onClick = () => {
        open ? setOpen(false) : setOpen(true)
    }
    return (
        <GameSelectSort>
            <GameSlectImage src={open ? Open : props.image} onClick={onClick} />
            <GameSelectText>{props.text}</GameSelectText>
        </GameSelectSort>
    )
};

function GameSelectPage() {
    const levels = [
        { image: Closed, text: 'Bronze' },
        { image: Closed, text: 'Silver' },
        { image: Closed, text: 'Gold' },
    ];
    const [gameTogle, setGameTogle] = useRecoilState(GameButtonState)

    const onClick = () => {
        gameTogle ? setGameTogle(false) : setGameTogle(true)
    }
    return (
        <GameSelectDiv>
            <GameSlectImageDiv>
                {levels.map((level, index) => (
                    <GameLevel key={index} image={level.image} text={level.text} />
                ))}
            </GameSlectImageDiv>
            <GameSelectExit onClick={onClick}>
                Exit
            </GameSelectExit>
        </GameSelectDiv>
    );
}

export default GameSelectPage;
