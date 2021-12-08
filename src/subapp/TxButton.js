import React from "react";
import {useWalletSigner} from "../walletManager/signers/WalletConnectionContext";


const TxButton = ({network}) =>{
  const walletSigner = useWalletSigner()
  return (
    <>
      {/*<button onClick={()=>this.props.makeTx(random)}>Post TX for {random} value</button>*/}
      <button onClick={()=>walletSigner.getSigner(network).then((signer)=>console.log("got signer",signer))}>
        {walletSigner.currentWallet}
        New style post

      </button>
    </>

  )
}

export default TxButton