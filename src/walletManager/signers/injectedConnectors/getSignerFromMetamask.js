import * as ethers from "ethers";

export const getSignerFromMetamask = async (expectedNetwork,currentNetwork) =>{
  if(!window.ethereum.isConnected()){
    console.log("metamask not connected")
    //todo
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return signer


}