import React from "react";
import config from "../../config/config.json";

import abi from "../../utils/TokenSample.json";
const ethers = require('ethers');

const GetToken = ({account}) => {
    const contractAddress = config.contractAddress;
    const contractABI = abi.abi;

    const defaultTokenValue = 200;
    
    const getToken = async () => {
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
      
              await tokenSampleContract.getToken(defaultTokenValue);
      
              alert(`You won ${defaultTokenValue} tokens`)
            }
          } catch (error) {
            console.log(error);
          }
        
    }

    return (
        <button onClick={getToken}>
            Get token
        </button>
    )
}

export default GetToken;