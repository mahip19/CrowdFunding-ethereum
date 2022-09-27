const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
const { compile } = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

// console.log(output.size);
fs.ensureDirSync(buildPath);

for (let contract in output) {
  const file = contract.substring(1) + ".json";
  fs.outputJsonSync(path.resolve(buildPath, file), output[contract]);
}

// const file = path.resolve(buildPath, "cmt.json");
// fs.outputJsonSync(file, { name: "3" });

// const file1 = path.resolve(buildPath, "Campaign.json");
// const file2 = path.resolve(buildPath, "CampaignFactory.json");

// console.log(file);
// console.log(file1);
// console.log(file2);

// fs.outputJsonSync(file1, { name: "1" });
// fs.outputJsonSync(file2, { name: "2" });

// // fs.outputJsonSync(path.resolve(buildPath, ":Campaign.json"), { name: "1" });
// // fs.outputJsonSync(path.resolve(buildPath, ":CampaignFactory.json"), {
// //   name: "2",
// // });
