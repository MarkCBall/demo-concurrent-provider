import React from "react";
import {useWalletSigner} from "./WalletConnectionContext";


const WalletConnectionSelectUI = (props) =>{
  const walletSigner = useWalletSigner()
  if (!walletSigner.walletPromptNetwork){
    return props.children
  }else{
    return <>
      You must select a network

      <br/>
      <button onClick={()=>walletSigner.setWallet("metamask")}>Metamask</button>
      <br/>
      Coin thing
    </>
  }

}

export default WalletConnectionSelectUI