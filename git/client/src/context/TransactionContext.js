import React, {useEffect,useState} from "react";
import {ethers} from "ethers";
import { contractABI,contractAddress } from "../utils/constants";

export const TransactionContext=React.createContext();
const {ethereum}=window;

const getEthereumContract=()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);
    return transactionContract;
    // console.log({
    //     provider,signer,transactionContract
    // });
}

export const TransactionProvier=({children})=>{

    const [currentAccount,setCurrentAccount]=useState('');
    const [formData,setFormData]=useState({address:'',amount:''});
    const [isLoading,setIsLoading]=useState(false);
    const [transactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'));

    // const handleChange=(e)=>{
    //     setFormData((prevState)=>({...prevState,[e.target.name]:e.target.value}));
    // }
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: e.target.value,
        }));
      };
      
    const checkIfWalletIsConnected =async()=>{
        try{

            if(!ethereum) return alert("Install Metamask");
            const accounts =await ethereum.request({method:'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No Accounts");
            }
            console.log(accounts);
        }
        catch(error){
            console.log(error);
            throw new Error("No Ethereum");

        }
    }

    const connectWallet = async()=>{
        try{
            if(!ethereum) return alert("Install Metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch(error){
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const sendTransaction=async()=>{
        try{
            if(!ethereum)return alert("Install Metamask");
            console.log("step2");  
            const {addressTo,amount}=formData;
            console.log(addressTo,amount);
            const transactionContract=getEthereumContract();
            console.log("step3");  
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log("paying");  
            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:'0X5208',//2100wei
                    value:parsedAmount._hex
                }]
            });

            const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        }catch(error){
            //console.log(error);
            //throw new Error("No Ethereum");
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);
    return(
        <TransactionContext.Provider value={{connectWallet,setFormData,currentAccount,formData,setFormData,handleChange,sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}