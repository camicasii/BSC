// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.8;
import "./SafeMath.sol";
import "./IBEP20.sol";

contract DiceClassicHawk{

    using SafeMath for uint;
    IBEP20 token;
    uint constant private RANGE = 100;
    uint constant private MAX_RANGE = 98;
    uint constant private MIN_RANGE = 2;
    uint constant private DECIMALS = 10 ** 3;
    uint constant private PERCENTS_DIVIDER = 1000;
    uint constant private WIN_FEE = 100;

    uint lastPseudoRandom;
    uint public gameCounter;
    bool public paused;
    address owner;

    event Pause();
    event Unpause();
    event LastBet(
        address indexed player,
        uint profit,
        uint bet,
        uint guess,
        uint roll,
        bool lowOrHigher,
        bool  win
    );

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier whenNotPaused() {
        require(!paused);
        _;
    }
    modifier whenPaused() {
        require(paused);
        _;
    }

    constructor(address token_) public{
        token = IBEP20(token_);
        owner = msg.sender;
        pseudoRandomFunction();
    }
    function pause() onlyOwner whenNotPaused public {
        paused = true;
        emit Pause();
    }
    function unpause() onlyOwner whenPaused public {
        paused = false;
        emit Unpause();
    }

    function pseudoRandomFunction() internal{
        lastPseudoRandom = uint256(keccak256(abi.encodePacked(block.timestamp,msg.sender,lastPseudoRandom)));
    }

    function getRandomNumber(uint seed) internal view returns(uint256){
        return  uint256(keccak256(abi.encodePacked(block.timestamp,lastPseudoRandom,seed))) % RANGE;
    }

    function game(uint guess, uint bet, bool lowOrHigher ) external whenNotPaused returns(bool){
        require(guess >= MIN_RANGE && guess <= MAX_RANGE,"guess off size");
        require(bet <= (10000 * ( 10**18 ) ),"max bet");
        token.transferFrom(msg.sender,address(this),bet);
        (bool win,uint roll)=rollDice(guess, lowOrHigher);
        uint profit;
        if(win){
            profit= getProfit(guess,bet,lowOrHigher);
            profit  = burnToken(profit,WIN_FEE);
            token.transfer(msg.sender,profit);
        }
        else{
            profit = bet;
        }
        pseudoRandomFunction();
        gameCounter++;

        emit LastBet(msg.sender,profit, bet,guess,roll,lowOrHigher,win);
        return win;
    }

    function rollDice(uint value, bool lowOrHigher ) internal view returns(bool,uint){
        uint num = getRandomNumber(value);
        bool win = lowOrHigher?lower(value,num):higher(value,num);
        return (win,num);
    }

    function lower(uint value, uint num) internal pure returns(bool){
        return value >num;
    }
    function higher(uint value, uint num) internal pure returns(bool){
        return value <=num;
    }

    function burnToken(uint value, uint percent) internal returns(uint){
        uint amount =value.mul(percent).div(PERCENTS_DIVIDER);
        token.burn(amount);
        return value.sub(amount);
    }

    function getProfit(uint value, uint bet, bool lowOrHigher) internal view returns(uint){
        uint n =lowOrHigher?value: MAX_RANGE - value;
        uint profit = bet.mul(MAX_RANGE.mul(DECIMALS)).div(n).div(DECIMALS);
        uint balance = getBalance();
        if(profit > balance)
            profit = balance;
        return  profit;
    }

    function getBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }
}