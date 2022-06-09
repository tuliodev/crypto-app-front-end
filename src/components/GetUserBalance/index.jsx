import React, { useState, useEffect } from "react";
import config from "../../config/config.json";

import abi from "../../utils/TokenSample.json";

const ethers = require("ethers");

const GetUserBalance = ({ account }) => {
  const contractAddress = config.contractAddress;
  const contractABI = abi.abi;

  const [currentBalance, setCurrentBalance] = useState();

  console.log("User address", account);

  
  const getBalance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const tokenSampleContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let balance = await tokenSampleContract.balanceOf(account);
        balance = ethers.utils.formatUnits(balance, "gwei");

       setCurrentBalance(balance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
  <p>Your balance: {currentBalance}</p>
  )
};

export default GetUserBalance;
