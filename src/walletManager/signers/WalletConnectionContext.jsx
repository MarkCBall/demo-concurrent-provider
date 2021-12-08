import React, { useEffect, useState, useContext } from "react"



const getSignerFromInjectedConnector = () =>{
  //todo
}

const WalletSigner = React.createContext(null)

function withWalletSigner(WrappedComponent) {
  return function(props) {
    const [walletPromptNetwork, setWalletPromptNetwork] = useState(null)
    const [currentWallet, setCurrentWallet] = useState(null)//todo check if something already selected

    const promptWalletFromNetwork = (network) =>{
      setWalletPromptNetwork(network)

    }

    const setWallet = async (selectedWallet) =>{
      setCurrentWallet(selectedWallet)
      setWalletPromptNetwork(null)
      //todo done awaiting UI selection
    }
    const getSigner = async (network) =>{
      if (currentWallet/** supports network **/){
        //todo tell the wallet to change to current network
      }else{
        await setWalletPromptNetwork(network)

        //todo await UI selection
        return getSignerFromInjectedConnector()
      }
    }



    return <WrappedComponent {...props} value={{
      getSigner,
      currentWallet,
      setWalletPromptNetwork,
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
