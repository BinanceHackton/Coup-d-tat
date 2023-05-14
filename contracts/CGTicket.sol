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

    uint public constant MAX_SUPPLY = 100;  // 총 발행 할 수 있는 NFT 티켓 최대 수량량 
    uint public constant PRICE = 0.00001 ether; // NFT 티켓 한장의 가격
    uint public constant MAX_PER_MINT = 5; // 한번에 발행 할 수 있는 NFT 티켓 수 
    
    string public baseTokenURI;

    
    uint256 count = 0; // 플레이어 주소에 접근하기 위한 인덱스 
    uint256 playAToken = 0; // 플레이어 A 토큰
    uint256 playBToken = 0; // 플레이어 B 토큰
    address[] playAddress = new address[](2); // 주소 배열 

    
    constructor(string memory baseURI) ERC721("CGTicket", "CGT") { // 처음 URI를 설정하는 생성자
        setBaseURI(baseURI);
    }
     
    function _baseURI() internal view virtual override returns (string memory) { 
        return baseTokenURI;
    }
    
    function setBaseURI(string memory _baseTokenURI) public onlyOwner { // 관리자가 URI를 새로 설정하는 메소드
        baseTokenURI = _baseTokenURI;
    }
    
    function mintNFTs(uint _count) public payable { // 원하는 수량만큼 NFT 티켓을 구매하는 메소드

        uint totalMinted = _tokenIds.current(); // 현재의 토큰 ID를 설정
        require(totalMinted.add(_count) < MAX_SUPPLY, "Not enough NFTs left!"); // 현재 토큰의 ID가 0부터 증가하므로 최대 수량까지 제한하는 구문
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs."); // 설정한 수량이 0이상 MAX_PER_MINT 이하이여야함

        for (uint i = 0; i < _count; i++) { // 카운트 수 만큼 NFT 티켓 생성
            _mintSingleNFT();
        }
    }
    
    function _mintSingleNFT() private { // NFT 티켓을 민팅 하는 메소드 
        uint newTokenID = _tokenIds.current(); // 현재 토큰의 ID를 할당
        _safeMint(msg.sender, newTokenID); // 민팅하는 구문, 호출자의 주소 + 토큰 ID
        _tokenIds.increment(); // 토큰 ID를 하나 증가시킴
    }
    
    function tokensOfOwner(address _owner) public view returns (uint[] memory) { // 호출자가 가진 모든 토큰을 반환하는 메소드

        uint tokenCount = balanceOf(_owner); // 호출자의 총 토큰 수 반환
        uint[] memory tokensId = new uint256[](tokenCount); // 토큰 수 만큼 배열 생성

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i); // 사용자 소유 토큰 ID 저장
        }
        return tokensId; // 총 토큰 ID 목록 반환
    }
    
    function withdraw() public payable onlyOwner { // 컨트랙트 상의 ether를 인출하는 메소드
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    function getFirstTokenId(address owner) public view returns (uint256) { // 현재 필요티켓이 1장이기에 소유자 목록의 NFT 티켓 하나를 불러오는 메소드 
        uint256 tokenCount = balanceOf(owner);
        require(tokenCount > 0, "Owner does not have any tokens");

        uint256 firstTokenId = tokenOfOwnerByIndex(owner, 0); // tokensOfOwner 위와 동일하지만 index = 0을 기입하여 첫번째 NFT를 불러옴
        return firstTokenId;
    }


   
    function setAddresses() public returns(uint256){ // 시작 전, 사용자 A,B가 한번씩 호출하며 사용자 주소를 저장하는 메소드

        playAddress[count] = msg.sender; // 배열 중 0, 1에 사용자의 정보 저장 
        if (count == 1) { // 만일 2명이 전부 저장되었다면 0으로 초기화
            count = 0;
            return 2; // 함수 성공을 위해 값을 반환 
        }
        count++; // .add(1) 사용시 디버깅 발생하여 ++ 사용
        return 1; // 위와 동일

    }


    function ticketCheck() public returns(uint) { // 사용자 A,B가 한번씩 setAddresses를 실행했다면 또 한번씩 해당 메소드를 실행하며 
                                                  // approve, 즉 서로에게 관리자가 토큰을 보낼 수 있는 권한 설정 및 토큰 Id를 저장하는 메소드
        
        if(playAddress[0] == msg.sender) { // 호출자 주소가 playerAddress[0] 에 저장된 정보라면 (편의상 A로 부름)
            playAToken = getFirstTokenId(msg.sender); // 토큰 ID를 반환하고 
            approve(playAddress[1], playAToken); // 패배할 경우를 위해 B에게 NFT 티켓을 보내는 권한을 부여 

        }
        if (playAddress[1] == msg.sender){ // B의 주소 체크 
            playBToken = getFirstTokenId(msg.sender); // 위와 동일
            approve(playAddress[0], playBToken); // 패배 시 A에게 본인의 NFT 티켓을 보내는 권한 부여 
        }

        return 1;
    }

    // function addressCheck1() public view returns(address) { // remix에서 테스트 하기 위한 메소드
    //     return playAddress[0];
    // }

    // function addressCheck2() public view returns(address) {
    //     return playAddress[1];
    // }

    // function tokenCheck1() public view returns(uint) {
    //     return playAToken;
    // }

    // function tokenIdCheck2() public view returns(uint) {
    //     return playBToken;
    // }


    function ticketToWinner() public returns(uint) { // 승자가 해당 메소드를 실행하면 관리자가 패자의 티켓을 승자에게 전송함.

        if(playAddress[0] == msg.sender) { // A가 이길경우
            transferFrom(playAddress[1], msg.sender, playBToken); // B의 토큰을 받음
        }
        else if (playAddress[1] == msg.sender) { // B가 이길경우
            transferFrom(playAddress[0], msg.sender, playAToken); // A의 토큰을 받음
           
        }
        else {
            return 0;
        }
        return 1;
    }

}