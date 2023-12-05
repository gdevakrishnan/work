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
    const [transactions,setTransactions]=useState([]);

    // const handleChange=(e)=>{
    //     setFormData((prevState)=>({...prevState,[e.target.name]:e.target.value}));
    // }

    const getAllTransactions =async()=>{
        try{
            if(!ethereum) return alert("Install Metamask");
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                //timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                amount:parseInt(transaction.amount._hex)*(10**18)
            }))
            //console.log(availableTransactions);
            setTransactions(structuredTransactions);
        }catch(error){
            console.log(error);
        }
    }


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
                getAllTransactions();
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

    const checkIfTransactionExist=async()=>{
        try{
            const transactionContract=getEthereumContract();
            const transactionCount=await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount",transactionCount);
            console.log(checkIfTransactionExist);
        }catch(error){
            //throw new Error("No object");

        }
    }

    const connectWallet = async()=>{
        try{
            if(!ethereum) return alert("Install Metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch(error){
            console.log(error);
            //throw new Error("No ethereum object");
        }
    }

    // const sendTransaction=async()=>{
    //     try{
    //         if(!ethereum)return alert("Install Metamask");
    //         console.log("step2");  
    //         const {addressTo,amount}=formData;
    //         console.log(addressTo,amount);
    //         const transactionContract=getEthereumContract();
    //         console.log("step3");  
    //         const parsedAmount = ethers.utils.parseEther(amount);
    //         console.log("paying");  
    //         await ethereum.request({
    //             method:'eth_sendTransaction',
    //             params:[{
    //                 from:currentAccount,
    //                 to:addressTo,
    //                 gas:'0X5208',//2100wei
    //                 value:parsedAmount._hex
    //             }]
    //         });
    //         console.log("xy")
    //         const transactionHash=await transactionContract.addToBlockchain(currentAccount,addressTo,parseInt(amount));
    //         setIsLoading(true);
    //         console.log(`Loading - ${transactionHash.hash}`);
    //         await transactionHash.wait();
    //         setIsLoading(false);
    //         console.log(`Success - ${transactionHash.hash}`);
    //         const transactionCount = await transactionContract.getTransactionCount();
    //         console.log(transactionCount);
    //         setTransactionCount(transactionCount.toNumber());
    //         console.log("history")
    //         getAllTransactions()
    //         console.log("got");
    //     }catch(error){
    //         //console.log(error);
    //         //throw new Error("No Ethereum");
    //     }
    // }
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Install Metamask");
            console.log("step2");
    
            const { addressTo, amount } = formData;
            console.log(addressTo, amount);
    
            const transactionContract = getEthereumContract();
            console.log("step3");
    
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log("paying");
    
            // Sending the transaction using the signer's send method
            const transaction = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208', // 21000 wei
                        value: parsedAmount.toHexString(),
                    },
                ],
            });
    
            console.log("xy");
    
            // Waiting for the transaction to be mined
            const provider = new ethers.providers.Web3Provider(ethereum);
            const transactionReceipt = await provider.waitForTransaction(transaction);
    
            if (transactionReceipt.status === 1) {
                setIsLoading(true);
                console.log(`Loading - ${transactionReceipt.transactionHash}`);
                setIsLoading(false);
                console.log(`Success - ${transactionReceipt.transactionHash}`);
                const newTransactionCount = await transactionContract.getTransactionCount();
                console.log(newTransactionCount);
                setTransactionCount(newTransactionCount.toNumber());
                console.log("history");
                getAllTransactions();
                console.log("got");
                const response = "Transaction Completed";
                return response;
            } else {
                console.log(`Transaction failed - ${transactionReceipt.transactionHash}`);
                const response = "Transaction Failed";
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    },[]);
    return(
        <TransactionContext.Provider value={{connectWallet,setFormData,currentAccount,formData,setFormData,handleChange,sendTransaction,transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}