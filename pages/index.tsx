import { ConnectWallet, useAddress, useContract, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import ClaimNFT from "../components/claim-nft";
import { KEY_PASS_CONTRACT, TOKEN_CONTRACT } from "../const/addresses";
import { ethers } from "ethers";
import TokenClaim from "../components/token-claim";
import PassClaim from "../components/pass-claim";
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {PrivyProvider} from '@privy-io/react-auth';


// This method will be passed to the PrivyProvider as a callback
// that runs after successful login.
 
const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract: tokenContract
  } = useContract(TOKEN_CONTRACT);

  const {
    contract: keyPassContract
  } = useContract(KEY_PASS_CONTRACT);

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading
  } = useTokenBalance(tokenContract, address);

  const {
    data: keyPassBalance,
    isLoading: isKayPassBalanceLoading
  } = useOwnedNFTs(keyPassContract, address);
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <h1>College Credit Issuing</h1>
            <ConnectWallet />
          </div>
          {!address ? (
            <p>Please connect wallet.</p>
          ) : (
            !isTokenBalanceLoading ? (
              tokenBalance && parseInt(ethers.utils.formatUnits(tokenBalance.value, 18)) >= 10 ? (
                !isKayPassBalanceLoading ? (
                  keyPassBalance && keyPassBalance[0] && parseInt(keyPassBalance[0].quantityOwned!) >= 1 ? (
                    <>
                      <ClaimNFT />
                    </>
                  ) : (
                    <>
                      <PassClaim />
                    </>
                  )
                ) : (
                  <p>Checking key pass...</p>
                )
              ) : (
                <>
                  <TokenClaim />
                </>
              )
            ) : (
              <p>Loading...</p>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;



