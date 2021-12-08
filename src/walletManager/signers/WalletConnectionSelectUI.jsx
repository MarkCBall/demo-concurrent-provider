import React from "react";
import {useWalletSigner} from "./WalletConnectionContext";

export const INJECTED_CONNECTORS = {
  metamask:{
    Ethereum:{key:"METAMASK_ETH", implementation:"metamask",network:"Ethereum"},
    Avalanche:{key:"METAMASK_AVAX", implementation:"metamask",network:"Avalanche"},
    BSC:{key:"METAMASK_BSC", implementation:"metamask",network:"BSC"},
  }
}

const WalletConnectionSelectUI = (props) =>{
  const walletSigner = useWalletSigner()
  if (walletSigner.injectedConnector){
    return props.children
  }else{
    return <>
      You must select a network

      <br/>
      <button onClick={()=>walletSigner.selectInjectedConnector(INJECTED_CONNECTORS.metamask.Ethereum)}>
        Metamask - Eth
      </button>
      <button onClick={()=>walletSigner.selectInjectedConnector(INJECTED_CONNECTORS.metamask.Avalanche)}>
        Metamask - Avax
      </button>
      <button onClick={()=>walletSigner.selectInjectedConnector(INJECTED_CONNECTORS.metamask.BSC)}>
        Metamask - BSC
      </button>
      <br/>
      Coin thing
    </>
  }

}

export default WalletConnectionSelectUI