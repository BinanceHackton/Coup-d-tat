import React, { useState } from 'react';
import {
    GameSelectDiv,
    GameSelectExit,
    GameSelectSort,
    GameSelectText,
    GameSlectImage,
    GameSlectImageDiv,
} from '../styled_component/styled_gameSelect';
import ClosedIcon from '../img/DoorClosed.svg';
import OpenIcon from '../img/DoorOpen.svg';
import { gameButtonState } from '../atom/atom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const GameLevel = (props) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const onClick = () => {
        open ? setOpen(false) : setOpen(true)
        navigate(`/game/${props.text}`)
    }
    return (
        <GameSelectSort>
            <GameSlectImage src={open ? OpenIcon : props.image} onClick={onClick} />
            <GameSelectText>{props.text}</GameSelectText>
        </GameSelectSort>
    )
};

function GameSelectPage() {
    const levels = [
        { image: ClosedIcon, text: 'Bronze' },
        { image: ClosedIcon, text: 'Silver' },
        { image: ClosedIcon, text: 'Gold' },
    ];
    const [gameTogle, setGameTogle] = useRecoilState(gameButtonState)

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
            <GameSelectExit onClick={() => onClick()}>
                Exit
            </GameSelectExit>
        </GameSelectDiv>
    );
}

export default GameSelectPage;
