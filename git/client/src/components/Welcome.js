import React,{useContext} from "react";
import {SiEthereum} from "react-icons/si";
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";
import { shortAddress } from "../utils/shortenAddress";
// const Input=({placeholder,name,type,value,handleChange})=>(
//     <input placeholder={placeholder}
//     type={type}
//     step="0.0001"
//     value={value}
//     onChange={(e)=> handleChange(e,name)}
//     className="my-2 w-full rounded-sm p-2 oulline-none bg-transparent white-glassmorphism"
//     />
// );
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)} // Pass both event and name
      className="my-2 w-full rounded-sm p-2 oulline-none bg-transparent white-glassmorphism"
    />
  );
  
const Welcome=()=>{
    const {connectWallet,currentAccount,formData,sendTransaction,handleChange}=useContext(TransactionContext);

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("working")
        const {addressTo,amount}=formData;
        if(!addressTo || !amount) return alert("done");
        sendTransaction();
        console.log("done");
    }
    return(
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl text-white ">Send Crypto
                    </h1>
                    <p className="text-left text-white font-light">Lend and Borrow Cryptocurrencies by using Dapp</p>
                    <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"><p className="text-white">Connect Wallet</p>
                    </button>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum fontSize={21} color="#fff" />
                                    </div>
                            </div>
                            <div className="text-white">
                                 {shortAddress(currentAccount)}
                            </div>
                        </div>
                    </div>
                    <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism text-white">
                        <Input placeholder="Borrower Address" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount of ETH" name="amount" type="number" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2">
                            {false ?(
                                <Loader />
                            ):(
                                <button type="button"
                                onClick={handleSubmit}
                                className="text-white mt-2 w-full border-[1px] cursor-pointer">
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;