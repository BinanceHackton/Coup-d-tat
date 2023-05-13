//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CGTicket is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    uint public constant MAX_SUPPLY = 100;  // 최대 발행량 
    uint public constant PRICE = 0.00001 ether; // nft 가격격

    uint public constant MAX_PER_MINT = 5; // 한번에 발행 할 수 있는 티켓 수 
    
    string public baseTokenURI;

    
    uint256 count = 0; // 플레이어 인덱스 
    address[] playAddress = new address[](2); // 주소 배열 
    uint256 playAToken = 0; // 플레이어 A 토큰
    uint256 playBToken = 0; // 플레이어 B 토큰

    
    constructor(string memory baseURI) ERC721("CGTicket", "CGT") { // 처음에 URI를 설정하는 생성자자
        setBaseURI(baseURI);
    }
    
    function reserveNFTs() public onlyOwner { // 컨트랙트 실행자에게 발행하는 기념 토큰 5개개
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(5) < MAX_SUPPLY, "Not enough NFTs left to reserve");
        _mintSingleNFT(); 
    }
    
    function _baseURI() internal view virtual override returns (string memory) { 
        return baseTokenURI;
    }
    
    function setBaseURI(string memory _baseTokenURI) public onlyOwner { //URI을 새로 세탕하는 함수 
        baseTokenURI = _baseTokenURI;
    }
    
    function mintNFTs(uint _count) public payable { // 원하는 NFT 갯수를 구매하는 메소드 
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs left!");
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }
    
    function _mintSingleNFT() private { // NFT를 실제로 발행하는 함수 
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }
    
    function tokensOfOwner(address _owner) public view returns (uint[] memory) { // 사용자가 가진 모든 토큰을 반환하는 함수 

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }
    
    function withdraw() public payable onlyOwner { // 이 컨트랙트가 가지고 있는 ether를 인출하는 함수 
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    function getFirstTokenId(address owner) public view returns (uint256) { // 유저의 토큰 ID를 하나 반환하는 함수 (필요한 티켓이 1장이기에)
        uint256 tokenCount = balanceOf(owner);
        require(tokenCount > 0, "Owner does not have any tokens");

        uint256 firstTokenId = tokenOfOwnerByIndex(owner, 0);
        return firstTokenId;
    }


   
    function setAddresses() public returns(uint256){ // 사용자 A,B가 한번씩 호출하며 사용자 주소를 저장하는 메소드드

        playAddress[count] = msg.sender;
        if (count == 1) {
            count = 0;
            return 1;
        }
        count++;
        return 2;
        

    }


    function ticketCheck() public returns(uint) { // 사용자 A,B가 한번씩 setAddresses를 실행했다면 또 한번씩 실행하며 approve와 토큰 값을 저장하는 함수
        
        if(playAddress[0] == msg.sender) {

            playAToken = getFirstTokenId(msg.sender);
            approve(playAddress[1], playAToken);

        }
        if (playAddress[1] == msg.sender){
            playBToken = getFirstTokenId(msg.sender);
            approve(playAddress[0], playBToken);
        }



        return 1;
    }

    function addressCheck1() public view returns(address) { // remix에서 테스트 하기 위한 메소드
        return playAddress[0];
    }

    function addressCheck2() public view returns(address) {
        return playAddress[1];
    }

    function tokenCheck1() public view returns(uint) {
        return playAToken;
    }

    function tokenIdCheck2() public view returns(uint) {
        return playBToken;
    }


    function ticketToWinner() public returns(uint) { // 승자가 이 메소드를 실행한다면 패자의 티켓을 승자에게 전송함.

        if(playAddress[0] == msg.sender) {
            transferFrom(playAddress[1], msg.sender, playBToken);
        }
        else if (playAddress[1] == msg.sender) {
            transferFrom(playAddress[0], msg.sender, playAToken);
           
        }
        else {
            return 0;
        }



        return 1;
    }


    


    
}