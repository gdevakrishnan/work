require("@nomicfoundation/hardhat-toolbox");
/**@type import('hardhat/config').HardhatUserCon */
module.exports={
  solidity:'0.8.19',
  defaultNetwork: "sepolia",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/3Q9SY1dvlnVXei-8M08s-NClcrdYdFco',
      accounts:['0x46cf7aa943a25da23656fad9615d0d5cbf62dbe985498bb95232e0c69b7dd5b4']
    }
  }
}