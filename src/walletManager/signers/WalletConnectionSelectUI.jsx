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
  if(walletSigner.pendingUserInput) {
    return <>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px",
        width: "200px",
        height: "100px",
        backgroundColor:"rgba(150, 150, 150, 0.5)"
      }}>
        Loading...
        <br/>
        <br/>
        Interact with wallet to continue

      </div>
      <div style={{opacity:"0.2"}}>
        {props.children}
      </div>
    </>
  }else if (walletSigner.injectedConnector){
    return props.children
  } else{
    return <>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px",
        width: "200px",
        height: "100px",
        backgroundColor:"rgba(150, 150, 150, 0.5)"
      }}>
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

      </div>
      <div style={{opacity:"0.2"}}>
        {props.children}
      </div>
    </>

  }

}

export default WalletConnectionSelectUI