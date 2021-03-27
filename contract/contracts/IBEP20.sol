// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.8;

    
contract IBEP20{
    function totalSupply() public view returns (uint);
    function balanceOf(address guy) public view returns (uint);
    function allowance(address src, address guy) public view returns (uint);
    function burn(uint256 amount) public  returns(bool);
    function approve(address guy, uint wad) public returns (bool);
    function transfer(address dst, uint wad) public returns (bool);
    function transferFrom(address src, address dst, uint wad
    ) public returns (bool);
}