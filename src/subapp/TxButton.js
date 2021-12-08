import React from "react";
import {useWalletSigner} from "../walletManager/signers/WalletConnectionContext";


const TxButton = ({network}) =>{
  const walletSigner = useWalletSigner()
  return (
    <>
      <button onClick={()=>walletSigner.getSigner(network).then((signer)=>{
        console.log("got signer to make TX",signer)
        signer.sendTransaction({
          from:signer.getAddress(),
          to: signer.getAddress(),
          value: 1,
        })
      }
      )}>
        {walletSigner.injectedConnector.network === network ? "Make Tx" : "Switch network"}

      </button>
    </>

  )
}

export default TxButton