// import { ethers } from "ethers";

// import Web3 from "web3";

// let provider;

// if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//   // users have metamask
//   provider = new ethers.providers.Web3Provider(window.ethereum);
// } else {
//   // users dont have metamask, so we make default provider
//   const p = new ethers.getDefaultProvider(
//     "https://goerli.infura.io/v3/d51ebd4541194ceea7d18cc15fbe9b62"
//   );
//   provider = new ethers.providers.Web3Provider(p);
// }
// export default provider;
import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/d51ebd4541194ceea7d18cc15fbe9b62"
  );
  web3 = new Web3(provider);
}

export default web3;
