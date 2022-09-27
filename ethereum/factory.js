import { ethers, Signer } from "ethers";

import CampaignFactory from "./build/CampaignFactory.json";

import web3 from "./web3";

// const singer = provider.getSigner();
// const instance = new ethers.Contract(
//   "0x933E5eDbC11aB158970dd8A1179ee793DE66c9d3",
//   JSON.parse(CampaignFactory.interface),
//   singer
// );

// const instance = new web3.eth.Contract(
//   JSON.parse(CampaignFactory.interface),
//   "0x9caa5a053c8E64Af2f027b02376943c0003D0a0A"
// );

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x398E0F8Df4D39Ea530a9E0cDe82e5931c40622a1"
);

export default instance;
