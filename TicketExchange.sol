pragma solidity ^0.6.0;

import "./IBEP20.sol";
import "@pancakeswap/pancake-swap-lib/contracts/interfaces/IPancakeRouter02.sol";

contract TicketExchange {
    IBEP20 public ticketToken;
    IPancakeRouter02 public pancakeRouter;
    address public owner;

    // 이벤트: 티켓을 구매한 경우 트리거됩니다.
    event TicketPurchased(address indexed buyer, uint256 amount);

    // TicketExchange 컨트랙트를 초기화합니다.
    constructor(IBEP20 _ticketToken, IPancakeRouter02 _pancakeRouter) {
        ticketToken = _ticketToken;
        pancakeRouter = _pancakeRouter;
        owner = msg.sender;
    }

    // BNB를 사용하여 IBEP20 티켓을 구매합니다.
    function buyTicketToken() external payable {
        // 컨트랙트에 BNB를 전송합니다.
        uint256 bnbAmount = msg.value;

        // PancakeSwap 라우터 경로를 설정합니다.
        address[] memory path = new address[](2);
        path[0] = pancakeRouter.WETH(); // WBNB
        path[1] = address(ticketToken); // Ticket Token

        // PancakeSwap에서 BNB를 사용하여 IBEP20 티켓을 구매합니다.
        try pancakeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{value: bnbAmount}(
            0, // 슬리피지를 허용하기 위해 최소 토큰 수량을 0으로 설정합니다.
            	path,
            	msg.sender, // 토큰을 호출한 주소로 전송합니다.
            	block.timestamp + 15 minutes // 15분 동안의 유효기간을 설정합니다.
        ) {
            	// IBEP20 토큰 전송이 성공하면 TicketPurchased 이벤트를 트리거합니다.
            	emit TicketPurchased(msg.sender, ticketToken.balanceOf(address(this)));
        } catch {
            	// IBEP20 토큰 전송이 실패하면 BNB를 환불합니다.
            	payable(msg.sender).transfer(bnbAmount);
            	revert("token exchange failure.");
        }
    }

    // TicketExchange 컨트랙트의 잔액을 소유자에게 인출합니다.
    function withdraw() external {
        require(msg.sender == owner, "only owner can exchange!");
        payable(msg.sender).transfer(address(this).balance);
    }
}
