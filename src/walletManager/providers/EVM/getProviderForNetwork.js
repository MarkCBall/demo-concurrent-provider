import * as ethers from "ethers";

export const getProviderForNetwork = (blockchain, endPoint) =>{
  if (EVMNetworks.includes(blockchain)){
    if (endPoint.startsWith("ws")) {
      return new ethers.providers.WebSocketProvider(endPoint)
    } else if (endPoint.startsWith("http")) {
      return new ethers.providers.JsonRpcProvider(endPoint)
    } else if (endPoint.endsWith(".ipc")) {
      return new ethers.providers.IpcProvider(endPoint)
    } else {
      return new ethers.providers.InfuraProvider(endPoint)
    }
  }else{
    //todo non EVM support
    throw new Error("Invalid network")
  }
}

export const EVMNetworks = [
  "BSC",
  "Avalanche",
  "Ethereum"
]