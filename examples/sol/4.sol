// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract ERC20 {

  string private _name;
  string private _symbol;

  uint256 private _totalSupply;

  mapping(address => uint256) private _balances;

  constructor(string memory name_, string memory symbol_) {
      _name = name_;
      _symbol = symbol_;
  }

  /**
   * @dev Returns the name of the token.
   */
  function name() public view  returns(string memory){
    return _name;
  }

  /**
   * @dev Returns the symbol of the token, usually a shorter version of the
   * name.
   */
  function symbol() public view  returns(string memory){
    return _symbol;
  }


  /**
   * @dev Returns the number of decimals used to get its user representation.
   * For example, if `decimals` equals `2`, a balance of `505` tokens should
   * be displayed to a user as `5.05` (`505 / 10 ** 2`).
   *
   * Tokens usually opt for a value of 18, imitating the relationship between
   * Ether and Wei. This is the default value returned by this function, unless
   * it's overridden.
   *
   * NOTE: This information is only used for _display_ purposes: it in
   * no way affects any of the arithmetic of the contract, including
   * {IERC20-balanceOf} and {IERC20-transfer}.
   */

  function decimals() public pure returns (uint8) {
      return 18;
  }

  /**
   * @dev See {IERC20-totalSupply}.
   */
  function totalSupply() public view returns (uint256) {
      return _totalSupply;
  }


  /**
   * @dev See {IERC20-balanceOf}.
   */
  function balanceOf(address account) public view returns (uint256) {
      return _balances[account];
  }


  function mint(address account,uint256 amount) public {
    _balances[account] = amount;
  }

}
