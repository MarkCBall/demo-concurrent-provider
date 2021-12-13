import React from "react";
import {useWalletSigner} from "./WalletConnectionContext";

const ButtonSwitch = (props) =>{
  const { expectedNetwork, customSwitchButton } = props
  const walletSigner = useWalletSigner()
  const onClick = async ()=>{
    walletSigner.setPendingUserInput(true)
    await walletSigner.changeNetwork(expectedNetwork)
    walletSigner.setPendingUserInput(false)
  }
    if (walletSigner.isConnectedToNetwork(expectedNetwork)){
      return props.children
    }else if(customSwitchButton){
      return React.cloneElement(customSwitchButton,{onClick})
    }else{
      return <button onClick={onClick}>
              Switch network default
            </button>
    }
}

export default ButtonSwitch
