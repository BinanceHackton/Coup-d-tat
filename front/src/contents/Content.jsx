import React from 'react'
import BuyBox from './BuyBox'
import GameBox from './GameBox'
import {
    ContentDiv
} from '../styled_component/styled_content'
import { BuyTicketDiv } from '../styled_component/styled_buy'
function Content() {
    return (
        <ContentDiv>
            <BuyBox />
            <GameBox />
        </ContentDiv >
    )
}

export default Content