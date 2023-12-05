
// pragma solidity ^0.8.19;

// contract Transactions{
//     uint transactionCount;
//     event Transfer(address from,address receiver,uint amount);
//     struct TrasferStruct{
//         address sender;
//         address receiver;
//         uint amount;
//     }

//     TrasferStruct[] transactions;

//     function addToBlockchain(address payable receiver,uint amount)public {
//         transactionCount+=1;
//         transactions.push(TrasferStruct(msg.sender,receiver,amount));
//         emit Transfer(msg.sender,receiver,amount);
//     }

//     function getAllTransactions()public view returns(TrasferStruct[] memory){
//         return transactions;
//     }

//     function getTransactionCount()public view returns(uint){
//         return transactionCount;
//     }

//     // function sendMoney(uint _amount) external payable{
//     //     payable(msg.sender).transfer(_amount);
//     // }
// }

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Transactions {
    uint transactionCount;
    event Transfer(address from, address receiver, uint amount);
    
    struct TrasferStruct {
        address sender;
        address receiver;
        uint amount;
    }

    TrasferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount) public {
        transactionCount += 1;
        transactions.push(TrasferStruct(msg.sender, receiver, amount));
        emit Transfer(msg.sender, receiver, amount);
    }

    function getAllTransactions() public view returns (address[] memory, address[] memory, uint[] memory) {
        address[] memory senders = new address[](transactions.length);
        address[] memory receivers = new address[](transactions.length);
        uint[] memory amounts = new uint[](transactions.length);
        
        for (uint i = 0; i < transactions.length; i++) {
            senders[i] = transactions[i].sender;
            receivers[i] = transactions[i].receiver;
            amounts[i] = transactions[i].amount;
        }
        
        return (senders, receivers, amounts);
    }

    function getTransactionCount() public view returns (uint) {
        return transactionCount;
    }
}
