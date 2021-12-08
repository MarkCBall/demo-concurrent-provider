import React from "react";
import {useWalletSigner} from "./WalletConnectionContext";

const ButtonSwitch = (props) =>{
  const { expectedNetwork, customSwitchButton } = props
  const walletSigner = useWalletSigner()
  const onClick = ()=>{
    walletSigner.getSigner(expectedNetwork)
  }
    if (walletSigner.injectedConnector.network === expectedNetwork){
      return props.children
    }else if(customSwitchButton){
      return React.cloneElement(customSwitchButton,{onClick})
    }else{
      return <button onClick={onClick}>
              Switch network
            </button>
    }
}

export default ButtonSwitch
