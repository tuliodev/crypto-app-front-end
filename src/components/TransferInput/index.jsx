import React, { useState } from "react";

import config from "../../config/config.json";

import abi from "../../utils/TokenSample.json";
const ethers = require("ethers");

const TransferInput = () => {
  const contractAddress = config.contractAddress;
  const contractABI = abi.abi;
  const [currentTokenValue, setCurrentTokenValue] = useState();
  const [currentAddressValue, setCurrentAddressValue] = useState();

  const handleTransferButton = async () => {
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

        await tokenSampleContract.transfer(
          currentAddressValue,
          currentTokenValue
        );

        alert(
          `Transfer success to ${currentAddressValue} the value ${currentTokenValue}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTokenValueInputChange = (event) => {
    setCurrentTokenValue(event.target.value);
  };

  const handleAddressValueInputChange = (event) => {
    setCurrentAddressValue(event.target.value);
  };

  return (
    <div className="main-transfer-input-container">
      <input
        type="text"
        name="address_value"
        id="address_value"
        placeholder="address"
        onChange={handleAddressValueInputChange}
      />
      <input
        type="number"
        step="0.25"
        name="token_value"
        id="token_value"
        placeholder="value"
        onChange={handleTokenValueInputChange}
      />
      <input
        type="button"
        value="Transfer token"
        onClick={handleTransferButton}
      />
    </div>
  );
};

export default TransferInput;
