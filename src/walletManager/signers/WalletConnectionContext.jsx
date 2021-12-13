import React, { useState, useContext } from "react"
import {getSignerFromMetamask} from "./injectedConnectors/getSignerFromMetamask";
import {INJECTED_CONNECTORS} from "./WalletConnectionSelectUI";
import networks from "../providers/networks";
import {EVMNetworks} from "../providers/EVM/getProviderForNetwork";



const getSignerFromInjectedConnector = () =>{
  throw new Error("Not supported")
}

const WalletSigner = React.createContext(null)

//todo-----------
// BIG ISSUE - how does the provider know the user's account without the wallet connected?
// ----------------
// whats the UI look like in lieu of an account balance for example?
function withWalletSigner(WrappedComponent) {
  return function(props) {
    const [ injectedConnector, setInjectedConnector ] = useState("unset")//todo check if something already selected in window, default to that
    const [pendingUserInput,setPendingUserInput] = useState(false)

    const selectInjectedConnector = async (selectedInjector) =>{
      setInjectedConnector(selectedInjector)
      //todo set disconnect listener
    }
    /**
     * Prompt the user to change their network inside the current wallet if possible.
     * Otherwise, prompt the user to select a wallet that supports the network
     * Sets a listener to keep state in sync with the current wallet's network
     *  **/
    const changeNetwork = async (expectedNetwork) =>{
      const currentNetwork = injectedConnector.implementation
      if (currentNetwork === "metamask" && EVMNetworks.includes(expectedNetwork)){
        if (currentNetwork !== expectedNetwork){
          try{
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: networks[expectedNetwork].chainHex }],//todo error handling
            });
          }catch(e){
            if (e.code===-32002){
              //todo use events to track network changes?
              //---without events, impossible to manage user changing the network without using UI?
              setInjectedConnector("unset")//todo should this have better user feedback? -- ie you had an open TX
              //todo what triggers this to unset? maybe you can just click out of it?
            }else{
              throw e
            }
          }
          //todo set on chain change listener
        }
      }else{
        //todo
        console.log("Not supported change")
        setInjectedConnector()//this will prompt a new wallet
        // throw new Error("Not supported change")
      }
    }

    const getSigner = async (expectedNetwork) =>{
      try{
        const currentNetwork = injectedConnector.implementation
        if (currentNetwork === "metamask"){
          await changeNetwork(expectedNetwork)//todo remove this safety mechanism?
          const signer = await getSignerFromMetamask(expectedNetwork, currentNetwork)
          setInjectedConnector(INJECTED_CONNECTORS.metamask[expectedNetwork])//todo refactor needed?
          return signer
        }else{
          setInjectedConnector(null)
          return getSignerFromInjectedConnector()
        }
      }catch(e){
        console.error("getSigner unexpected error",e)//todo
      }
    }
    const getWithSigner = (network) =>{
      return async (cb) => cb(await getSigner(network))
    }


    const isConnectedToNetwork = (network) => injectedConnector?.network === network


    return <WrappedComponent {...props} value={{
      getSigner,
      getWithSigner,
      changeNetwork,
      isConnectedToNetwork,
      selectInjectedConnector,
      injectedConnector,
      setPendingUserInput,
      pendingUserInput
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
