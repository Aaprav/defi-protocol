// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract ERC20 {

  string  _name;
  string _symbol;

  uint256 _totalSupply;


  constructor() {
      _name = "Onion";
      _symbol = "ONN";
  }

  function name() public view  returns(string memory){
    return _name;
  }

  function symbol() public view  returns(string memory){
    return _symbol;
  }

  function totalSupply() public view returns (uint256) {
      return _totalSupply;
  }

}
