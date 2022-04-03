import "@nomiclabs/hardhat-waffle";
import dotenv from "dotenv";
dotenv.config();
const {ARCHIVE_URL, MNEMONIC} = process.env;
import { task, HardhatUserConfig } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

if (!ARCHIVE_URL)
  throw new Error(
  `ARCHIVE_URL no esta seteado en el archivo .env - Acordate de ingresar la URL del nodo Infura/Alchemy!`
);
if (!MNEMONIC)
  throw new Error(
  `MNEMONIC no esta seteado en el archivo .env - Acordate de ingresar el mnemonic generado por ejemplo, en https://iancoleman.io/bip39/`
);

const accounts = {
// derive accounts from mnemonic, see tasks/create-key
  mnemonic: MNEMONIC,
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [     
      { version: "0.8.0" }
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: { //Para probar en esta red primero hay que conseguir ether de algún faucet
      url: ARCHIVE_URL,
      accounts,
    },
  },
  mocha: {
    timeout: 300 * 1e3,
  }
};

export default config;