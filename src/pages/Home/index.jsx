import "./styles.css";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Please install metamask");
      } else {
        console.log("Ethereum object => ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <div className="main-container">
        <p>Welcome to crypto app</p>
        {!currentAccount && (
          <button onClick={connectWallet}>Connect your wallet</button>
        )}
      </div>
    </>
  );
};

export default Home;
