import web3 from "./web3";
import Campaign from "./build/Campaign.json";

// we're required to call this instance with an address because we cant GET a hardcoded address
const instance = (address) =>
  new web3.eth.Contract(JSON.parse(Campaign.interface), address);
export default instance;
