// const HDWalletProvider = require("truffle-hdwallet-provider");
// const Web3 = require("web3");
// // const provider = require("./web3");
// // const { interface, bytecode } = require("./compile");
// const compiledFactory = require("./build/CampaignFactory.json");
// const compiledCampaign = require("./build/Campaign.json");
// const { ethers, Signer } = require("ethers");

// const mnemonicPhrase =
//   "tilt light fortune scatter head poet crack raw group soon title jeans";
// const provider = new HDWalletProvider({
//   mnemonic: {
//     phrase: mnemonicPhrase,
//   },
//   providerOrUrl: "https://goerli.infura.io/v3/d51ebd4541194ceea7d18cc15fbe9b62",
// });

// const web3 = new Web3(provider);

// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();
//   console.log("trying to deploy from account ", accounts[0]);
//   const result = await new web3.eth.Contract(
//     JSON.parse(compiledFactory.interface)
//   )
//     .deploy({ data: "0x" + compiledFactory.bytecode }) // add bytecode
//     .send({ from: accounts[0] }); // remove gas
//   console.log("contract deployed to ", result.options.address);
// };

// // const deploy = async () => {
// //   const account = await ethers.utils.getAddress();
// //   const contractFactory = new ethers.ContractFactory(compiledFactory.interface,compiledFactory.bytecode).deploy(account)

// // }
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
// require("dotenv").config({ path: ".env" });

const provider = new HDWalletProvider(
  "tilt light fortune scatter head poet crack raw group soon title jeans",
  "https://goerli.infura.io/v3/d51ebd4541194ceea7d18cc15fbe9b62"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({
      data: compiledFactory.bytecode,
      arguments: ["Hi there!"],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
