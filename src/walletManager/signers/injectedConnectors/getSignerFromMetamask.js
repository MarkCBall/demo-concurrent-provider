import * as ethers from "ethers";
import networks from "../../providers/networks";

const getSigner = async () =>{
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return signer

}


export const getSignerFromMetamask = async (expectedNetwork,currentNetwork) =>{
  if (currentNetwork !== expectedNetwork){
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networks[expectedNetwork].chainHex }],//todo error handling
    });
  }
  return getSigner()


}