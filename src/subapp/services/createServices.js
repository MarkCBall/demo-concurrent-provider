
import { TYPE_BLOCK_NUM } from "../reducers/blockchainReducer"
import {getProviderForNetwork} from "./getProviderForNetwork";
import { changeToNetworkAndMakeTx } from "./changeToNetworkAndMakeTx";

const createServices = (network="Ethereum") => {
  return {
    getBlockNum: () => {
      return dispatch => {
        const {provider} = getProviderForNetwork(network)
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