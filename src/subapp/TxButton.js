import React from "react";
import {useWalletSigner} from "../walletManager/signers/WalletConnectionContext";
import ButtonSwitch from "../walletManager/signers/ButtonSwitch";


// const CustomSwitchButton = () =>{
//   return()
//
// }

const TxButton = ({network}) =>{
  const walletSigner = useWalletSigner()
  return (

    <ButtonSwitch
      expectedNetwork={network}
      customSwitchButton={<button>Switch to {network}</button>}
    >
      <button onClick={()=>walletSigner.getSigner(network).then((signer)=>{
        signer.sendTransaction({
          from:signer.getAddress(),
          to: signer.getAddress(),
          value: 1,
        })
      }
      )}>
        {walletSigner.injectedConnector.network === network ? "Make Tx" : "Switch network"}

      </button>
    </ButtonSwitch>




      // withButtonSwitch(network,<button onClick={()=>walletSigner.getSigner(network).then((signer)=>{
      //     console.log("got signer to make TX",signer)
      //     signer.sendTransaction({
      //       from:signer.getAddress(),
      //       to: signer.getAddress(),
      //       value: 1,
      //     })
      //   }
      // )}>
      //     {walletSigner.injectedConnector.network === network ? "Make Tx" : "Switch network"}
      //
      //   </button>
      //
      //   )



  )
}

export default TxButton