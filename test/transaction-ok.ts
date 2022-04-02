import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers"; //Tipo de dato Contract


let patronusCashContract: Contract;
let accounts: Signer[];
let eoa: Signer;
let eoa2: Signer;
let balanceInicialCuenta1;
let balanceInicialCuenta2;
let balanceFinalCuenta1;
let balanceFinalCuenta2;
let tx: any;


beforeEach(async () => {
  const PatronusFactory = await ethers.getContractFactory("PatronusCash"); //Creo una instancia desde donde crear el contrato.
  patronusCashContract = await PatronusFactory.deploy();
  await patronusCashContract.deployed();

  accounts = await ethers.getSigners();
  [eoa] = accounts;
  [, eoa2] = accounts;
});

describe("PatronusCash", async () => {
  it("Transacción realizada exitosamente a address no incluída en blacklist", async function () {
    let cuenta2Address = await eoa2.getAddress();
    let cuenta1Address = await eoa.getAddress();
    // balanceInicialCuenta1 = (await ethers.provider.getBalance(cuenta1Address)).toString();
    // balanceInicialCuenta2 = (await ethers.provider.getBalance(cuenta2Address)).toString();
    // console.log(`El balance de la cuenta 1 es: `, balanceInicialCuenta1);
    // console.log(`El balance de la cuenta 2 es: `, balanceInicialCuenta2);

    balanceInicialCuenta1 = await ethers.provider.getBalance(cuenta1Address);
    balanceInicialCuenta2 = await ethers.provider.getBalance(cuenta2Address);

    try {
      tx = await patronusCashContract.enviarReceptor(cuenta2Address, {value: ethers.utils.parseEther(`1`)});
      await tx.wait();
      console.log("TRANSACCION EXITOSA!")

      // balanceFinalCuenta1 = (await ethers.provider.getBalance(cuenta1Address)).toString();
      // balanceFinalCuenta2 = (await ethers.provider.getBalance(cuenta2Address)).toString();
      // console.log(`El balance final de la cuenta 1 es: `, balanceFinalCuenta1);
      // console.log(`El balance final de la cuenta 2 es: `, balanceFinalCuenta2);

      balanceFinalCuenta1 = await ethers.provider.getBalance(cuenta1Address);
      balanceFinalCuenta2 = await ethers.provider.getBalance(cuenta2Address);


      expect(balanceFinalCuenta2, "BALANCE INCORRECTO").to.be.above(balanceInicialCuenta2);
      expect(balanceFinalCuenta1, "BALANCE INCORRECTO").to.be.below(balanceInicialCuenta1);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  });
});


//  balanceInicial = (await ethers.provider.getBalance(eoa.getAddress())).toString();
