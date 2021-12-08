import defaultNetworks from "./networks";
import {getProviderForNetwork} from "./EVM/getProviderForNetwork";


class WalletProviders  {
  //todo types
  networks={}

  constructor(){
    this.addNetworkConnection(defaultNetworks.Ethereum)
    this.addNetworkConnection(defaultNetworks.Avalanche)
    this.addNetworkConnection(defaultNetworks.BSC)
  }

  //todo expand this so new providers can be added
  //todo handle for non EVM
  addNetworkConnection(network){
    const blockchain = network.blockchain
    this.networks[blockchain] = {
      ...network,
      providers:network.urls.map(url=>getProviderForNetwork(blockchain,url))
    }
  }

//this is the recommended way to use as it can expand to have failover ect
  //todo expand functionality here - maybe copy withFailover from nodePools in velox common
  getWithProvider(network){
    return (cb) => cb(this.getFirstProvider(network))
  }

  getFirstProvider(network){
    return this.networks[network.blockchain].providers[0]
  }

}

const walletProviders = new WalletProviders()
export default walletProviders

