import * as ethers from "ethers"
import React from "react";
const ethProvider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
const avaxProvider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc")
const bscProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org")

export const getProviderForNetwork = (network) =>{
  switch (network){
    case "Ethereum":
      return {provider:ethProvider, chainId:1}
    case "Avalanche":
      return {provider:avaxProvider, chainId:43114}
    case "BSC":
      return {provider:bscProvider, chainId:56}
    default:
      throw new Error("Invalid network")
  }
}