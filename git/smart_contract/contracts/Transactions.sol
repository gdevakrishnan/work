// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Transactions{
    uint transactionCount;
    event Transfer(address from,address receiver,uint amount);
    struct TrasferStruct{
        address sender;
        address receiver;
        uint amount;
    }

    TrasferStruct[] transactions;

    function addToBlockchain(address payable receiver,uint amount)public {
        transactionCount+=1;
        transactions.push(TrasferStruct(msg.sender,receiver,amount));
        emit Transfer(msg.sender,receiver,amount);
    }

    function getAllTransactions()public view returns(TrasferStruct[] memory){
        return transactions;
    }

    function getTransactionCount()public view returns(uint){
        return transactionCount;
    }

    // function sendMoney(uint _amount) external payable{
    //     payable(msg.sender).transfer(_amount);
    // }
}