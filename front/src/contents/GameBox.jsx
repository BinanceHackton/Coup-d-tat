import React from 'react'
import {
    BoxDiv,
    SelctText
} from '../styled_component/styled_content'
import {
    Image
} from '../styled_component/styled_nav'
import GameIcon from '../img/Game.svg'
import { useRecoilState } from 'recoil'
import { gameButtonState } from '../atom/atom'
import GameSelectPage from '../GameSelect/GameSelectPage'
function GameBox() {
    const [gameTogle, setGameTogle] = useRecoilState(gameButtonState)
    const onClick = () => {
        gameTogle ? setGameTogle(false) : setGameTogle(true)
    }
    return (
        <>
            <BoxDiv active='F1F6F9' onClick={onClick}>
                <Image src={GameIcon} />
                <SelctText>Play Game</SelctText>
            </BoxDiv>
            {gameTogle ? (<GameSelectPage />) : (null)}
        </>
    )
}

export default GameBox