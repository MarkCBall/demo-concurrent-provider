import {getProviderForNetwork} from "./getProviderForNetwork";


window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [
    // {
    //   chainId:`0x${getProviderForNetwork("Ethereum").chainId.toString(16)}`,
    //   rpcUrls:["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
    //   // rpcUrls:getProviderForNetwork("Ethereum").provider.rpcUrls
    // },
    {
    chainId:`0x${getProviderForNetwork("BSC").chainId.toString(16)}`,
    chainName:"BSC",
    rpcUrls:["https://bsc-dataseed.binance.org"]
    // rpcUrls:getProviderForNetwork("BSC").provider.rpcUrls
  },
    {
    chainId:`0x${getProviderForNetwork("Avalanche").chainId.toString(16)}`,
    rpcUrls:["https://api.avax.network/ext/bc/C/rpc"]
    // rpcUrls:getProviderForNetwork("Avalanche").provider.rpcUrls
  },
  ]
});


export const changeToNetworkAndMakeTx = async (network, amount) => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: `0x${getProviderForNetwork(network).chainId.toString(16)}` }],
  });
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];


  const params = [
    {
      from: account,
      to: account,
      gas: '0x76c0', // 30400
      gasPrice: '0x9184e72a000', // 10000000000000
      value: `0x${amount.toString(16)}`, // 2441406250
    }
  ]
  window.ethereum.request({
    method: 'eth_sendTransaction',
    params
  })

}