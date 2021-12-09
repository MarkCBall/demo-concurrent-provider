import React, { useEffect, useState, useContext } from "react"
import * as ethers from "ethers"
import networks from "../providers/networks"
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
        console.log("get signer",expectedNetwork,INJECTED_CONNECTORS.metamask[expectedNetwork], currentNetwork)
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



    return <WrappedComponent {...props} value={{
      getSigner,
      //todo withSigner
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
