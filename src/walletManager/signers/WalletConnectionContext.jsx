import React, { useState, useContext } from "react"
import {getSignerFromMetamask} from "./injectedConnectors/getSignerFromMetamask";
import {INJECTED_CONNECTORS} from "./WalletConnectionSelectUI";



const getSignerFromInjectedConnector = () =>{
  //todo
}

const WalletSigner = React.createContext(null)

function withWalletSigner(WrappedComponent) {
  return function(props) {
    const [ injectedConnector, setInjectedConnector ] = useState("unset")//todo check if something already selected in window, default to that


    const selectInjectedConnector = async (selectedInjector) =>{
      setInjectedConnector(selectedInjector)
    }
    const getSigner = async (expectedNetwork) =>{
      try{
        const currentNetwork = injectedConnector.implementation
        if (currentNetwork === "metamask"){
          const signer = await getSignerFromMetamask(expectedNetwork, currentNetwork)
          setInjectedConnector(INJECTED_CONNECTORS.metamask[expectedNetwork])//todo refactor needed?
          return signer
        }else{
          setInjectedConnector(null)
          return getSignerFromInjectedConnector()
        }
      }catch(e){
        console.error("getSigner unexpected error",e)
      }
    }
    const getWithSigner = (network) =>{
      return async (cb) => cb(await getSigner(network))
    }


    const isConnectedToNetwork = (network) => injectedConnector?.network === network


    return <WrappedComponent {...props} value={{
      getSigner,
      getWithSigner,
      isConnectedToNetwork,
      selectInjectedConnector,
      injectedConnector
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
