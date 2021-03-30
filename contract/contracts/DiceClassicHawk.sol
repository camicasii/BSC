// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.8;


contract DiceClassicHawk{

    using SafeMath for uint;
    IBEP20 token;
    uint constant private RANGE = 100;
    uint constant private MAX_RANGE = 98;
    uint constant private MIN_RANGE = 2;    
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
        require(Address.isContract(token_),"Invalid token BEP20");
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
            uint burn =profit.mul(WIN_FEE).div(PERCENTS_DIVIDER);
            token.burn(burn);
            profit=profit.sub(burn);
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

    function getProfit(uint value, uint bet, bool lowOrHigher) internal view returns(uint){
        uint n =lowOrHigher?value: RANGE.sub(value);
        uint profit = bet.mul(RANGE).div(n);
        uint balance = getBalance();
        if(profit > balance)
            profit = balance;
        return  profit;
    }

    function getBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }
}

contract IBEP20{
    function totalSupply() public view returns (uint);
    function balanceOf(address account) public view returns (uint256);
    function allowance(address src, address guy) public view returns (uint256);
    function burn(uint256 amount) public ;
    function approve(address guy, uint wad) public returns (bool);
    function transfer(address dst, uint wad) public returns (bool);
    function transferFrom(address src, address dst, uint wad ) public returns (bool);
}

library Address {
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}