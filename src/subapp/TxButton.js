import React from "react";
import {useWalletSigner} from "../walletManager/signers/WalletConnectionContext";
import ButtonSwitch from "../walletManager/signers/ButtonSwitch";

const TxButton = (props) =>{
  const { network } = props
  const walletSigner = useWalletSigner()
  return (

    <ButtonSwitch
      expectedNetwork={network}
      customSwitchButton={<button>Switch to {network}</button>}
    >
      <button onClick={()=> {
        walletSigner.getWithSigner(network)(signer=>{
          signer.sendTransaction({
            from:signer.getAddress(),
            to: signer.getAddress(),
            value: 1,
          })
        })
        // walletSigner.getSigner(network).then((signer)=>{
        //   signer.sendTransaction({
        //     from:signer.getAddress(),
        //     to: signer.getAddress(),
        //     value: 1,
        //   })
        // })
      }}>
        {walletSigner.isConnectedToNetwork(network) ? "Make Tx" : "Switch network"}

      </button>
    </ButtonSwitch>

  )
}

export default TxButton