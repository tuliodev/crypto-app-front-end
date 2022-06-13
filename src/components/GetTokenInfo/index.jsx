import React, { useEffect, useState } from "react";

import "./styles.css";

import config from "../../config/config.json";

import abi from "../../utils/TokenSample.json";
const ethers = require("ethers");

const GetTokenInfo = () => {
  const [currentData, setCurrentData] = useState({});

  let data = {};

  const contractAddress = config.contractAddress;
  const contractABI = abi.abi;

  const getTokenInfo = async () => {
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

        let totalSupply = await tokenSampleContract.totalSupply();
        const name  = await tokenSampleContract.getTokenName();
        const symbol = await tokenSampleContract.getTokenSymbol();
        totalSupply = ethers.utils.formatUnits(totalSupply, "gwei");

        setCurrentData ( {
            totalSupply,
            name,
            symbol
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenInfo();
  }, []);

  console.log("data =>", data)

  return (
    <div className="main-get-token-info-container">
      <p className="main-get-token-info-p">Name: {currentData.name}</p>
      <p className="main-get-token-info-p">Symbol: {currentData.symbol}</p>
      <p className="main-get-token-info-p">Total supply: {currentData.totalSupply}</p>
    </div>
  );
};

export default GetTokenInfo;
