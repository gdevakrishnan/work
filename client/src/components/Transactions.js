import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { getAllTransactions } from "../services/serviceWorker";

const Transactions = () => {
    const { currentAccount } = useContext(TransactionContext);
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        getAllTransactions()
            .then((response) => {
                setTransactions(response.transactionDetails);
            })
            .catch((e) => console.log(e.message));
    });

    // const Transactioncard=({addressTo,addressFrom,amount,timestamp})=>{
    //     return (
    //         <div className="bg-[#181918] m-4 flex flex-1 
    //         2xl:min-w-[450px]
    //         2xl:max-w-[500px]
    //         sm:min-w-[270px]
    //         sm:max-w-[300px]
    //         flex-col p-3 rounded-md hover:shadow-2xl">
    //             <div className="flex flex-col items-center w-full mt-3">
    //                 <div className="w-full mb-6 p-2">
    //                     <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreference">
    //                         <p className="text-white text-base">From:{shortAddress(addressFrom)}</p>
    //                     </a>
    //                     <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreference">
    //                         <p className="text-white text-base">To:{shortAddress(addressTo)}</p>
    //                     </a>
    //                     <p className="text-white text-base">Amount:{amount} ETH</p>
    //                     <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
    //                         <p className="text-[#37c7da] font-bold">{timestamp}</p>
    //                     </div>
    //                 </div>

    //             </div>

    //         </div>
    //     )
    // }

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12py px-4">
                {(currentAccount) ? (
                    <>
                        <h3 className="text-white text-3xl text-center my-2">Transaction History</h3>
                        {
                            (transactions) ? (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-auto mt-6">
                                    <thead className="text-xs uppercase bg-gray-700 text-gray-200">
                                        <tr>
                                            <th className="px-6 py-3">From</th>
                                            <th className="px-6 py-3">To</th>
                                            <th className="px-6 py-3">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            transactions.map((aTransaction, index) => {
                                                return (
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="px-6 py-3">{aTransaction.from}</td>
                                                        <td className="px-6 py-3">{aTransaction.to}</td>
                                                        <td className="px-6 py-3">{aTransaction.amount}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            ) : <h1>No Transactions Found</h1>
                        }
                    </>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">Account not Connected</h3>
                )}
                <div className="flexflex-wrap justify-center items-center mt-10">

                </div>

            </div>
        </div>
    );
}

export default Transactions;