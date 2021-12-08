import React from "react";
import {useWalletSigner} from "../walletManager/signers/WalletConnectionContext";


const TxButton = ({network}) =>{
  const random = Math.round(Math.random()*100)
  const x = useWalletSigner()
  console.log(x)
  return (
    <>
      <button onClick={()=>this.props.makeTx(random)}>Post TX for {random} value</button>
      <button onClick={()=>x.getSigner(network)}>New style post</button>
    </>

  )
}

export default TxButton