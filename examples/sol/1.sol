// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Examples {

    uint balance;

    function setBalance(uint value) public{
        balance = value;
    }

    function getBalance() public view returns(uint){
        return balance;
    }

    function calculate(uint x,uint y) public pure returns(uint){
        return x*y;
    }


    function deposit(uint value) public{
        balance = balance + value;
    }

    function withdraw(uint value) public{
        if(balance >= value){
            balance = balance - value;
        }else{

        }
    }
}
