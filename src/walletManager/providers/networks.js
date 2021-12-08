// Type Network ={
//   blockchain:string,
//   chainId?:number,
//   urls?:Array<string>
// }
// Type ConnectedNetwork extends Network { providers}



export default {
  Ethereum:{
    blockchain:"Ethereum",
    chainId:1,
    chainHex:"0x1",
    urls:["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
  },
  Avalanche:{
    blockchain:"Avalanche",
    chainId:43114,
    chainHex:"0xa86a",
    urls:["https://api.avax.network/ext/bc/C/rpc"]
  },
  BSC:{
    blockchain:"BSC",
    chainId:56,
    chainHex:"0x38",
    urls:["https://bsc-dataseed.binance.org"]
  },

}