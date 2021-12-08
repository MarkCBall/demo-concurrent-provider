import React, { useEffect, useState, useContext } from "react"
import * as ethers from "ethers"
import networks from "../providers/networks"



const getSignerFromInjectedConnector = () =>{
  //todo
}

const WalletSigner = React.createContext(null)

function withWalletSigner(WrappedComponent) {
  return function(props) {
    const [walletPromptNetwork, setWalletPromptNetwork] = useState(null)
    const [currentWallet, setCurrentWallet] = useState(null)//todo check if something already selected in window, default to that
    const [ injectedConnector, setInjectedConnector ] = useState(null)

    const promptWalletFromNetwork = (network) =>{
      setWalletPromptNetwork(network)

    }

    const setWallet = async (selectedWallet) =>{
      setCurrentWallet(selectedWallet)
      setWalletPromptNetwork(null)
      //todo done awaiting UI selection
    }
    const getSigner = async (network) =>{
      // console.log("getSigner called", network,currentWallet,  networks[network])
      if (currentWallet === "metamask"){
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networks[network].chainHex }],//todo error handling
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("returning metamask signer",signer)
        return signer
      }else{
        console.log("getSigner else")
        await setWalletPromptNetwork(network)

        //todo await UI selection
        return getSignerFromInjectedConnector()
      }
    }



    return <WrappedComponent {...props} value={{
      getSigner,
      currentWallet,
      promptWalletFromNetwork,
      walletPromptNetwork,
      setWallet
    }
    }/>
  }
}

export const WalletSignerProvider = (props) => {
  return <WalletSigner.Provider value={props.value} {...props} />
}

//export it this way so it multiple providers don't conflict
// import WalletSignerProvider from "this file as default"
export default withWalletSigner(WalletSignerProvider)

export function useWalletSigner() {
  const context = useContext(WalletSigner)
  if (context === undefined) {
    throw new Error(`useWalletSigner must be used within a WalletSignerProvider`)
  }
  return context
}
