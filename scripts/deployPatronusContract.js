const fs = require('fs'); 

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { tokenToString } = require('typescript');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const PatronusFactory = await hre.ethers.getContractFactory("PatronusCash");
  const patronusCashContract = await PatronusFactory.deploy();
  await patronusCashContract.deployed();
  console.log("CONTRATO DEPLOYADO EN ADDRESS: ", patronusCashContract.address);

  //Para frontend cuando esté
  // const data = {
  //   address: patronusCashContract.address,
  //   abi: JSON.parse(patronusCashContract.interface.format('json'))
  // }
  // fs.writeFileSync('frontend/src/ethers-contracts/PatronusCash.json', JSON.stringify(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
