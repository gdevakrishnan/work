// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// const main= async()=>{
//   const Transactions = await hre.ethers.getContractFactory("Transactions");
//   const transactions = await Transactions.deploy();
//   await transactions.deployed();
//   console.log("Transaction deployed to:",transactions.address);
// }

// const runMain=async()=>{
//   try{
//     await main();
//     process.exit(0);
//   }catch(error){
//     console.error(error);
//     process.exit(1);
//   }
// }


// const hre = require("hardhat");

// const main = async () => {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);

//   const Transactions = await hre.ethers.getContractFactory("Transactions");
//   const transactions = await Transactions.deploy();
//   await transactions.deployed();

//   console.log("Transaction deployed to:", transactions.address);
// };

// const runMain = async () => {
//   try {
//     await hre.run("compile");
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// runMain();


const hre = require("hardhat");

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy({
    gasPrice: hre.ethers.utils.parseUnits("10", "gwei"),
    gasLimit: 3000000, // Adjust the gas limit as needed
  });

  // await transactions.deployed();

  // console.log("Transaction deployed to:", transactions.address);
};

// const runMain = async () => {
//   try {
//     await hre.run("compile");
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// runMain();


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




