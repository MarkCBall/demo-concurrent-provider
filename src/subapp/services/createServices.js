
import { TYPE_BLOCK_NUM } from "../reducers/blockchainReducer"
import { changeToNetworkAndMakeTx } from "./changeToNetworkAndMakeTx";

import walletProviders from "../../walletManager/providers/walletProviders";
import defaultNetworks from "../../walletManager/providers/networks";

const createServices = (network="Ethereum") => {
  return {
    getBlockNum: () => {
      return dispatch => {
        const provider = walletProviders.getFirstProvider(defaultNetworks[network])
        return provider.getBlockNumber().then(response => {
          dispatch({
            type: TYPE_BLOCK_NUM,
            payload: response,
          })
        })
      }
    },
    makeTx: (amount) =>{
      return dispatch => {
        console.log("makeTx called with amount:", amount, " on network:",network)
        changeToNetworkAndMakeTx(network, amount*1e18)

      }
    }
  }
}

  export default createServices