import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers"; //Tipo de dato Contract


let patronusCashContract: Contract;
let accounts: Signer[];
let eoa: Signer;
let eoa2: Signer;
let eoa3: Signer;
let eoa4: Signer;
let eoa5: Signer;
let balanceInicialCuenta1;
let balanceInicialCuenta2;
let balanceInicialCuenta3;
let balanceInicialCuenta4;
let balanceInicialCuenta5;

let balanceFinalCuenta1;
let balanceFinalCuenta2;
let balanceFinalCuenta3;
let balanceFinalCuenta4;
let balanceFinalCuenta5;
let tx: any;


beforeEach(async () => {
  const PatronusFactory = await ethers.getContractFactory("PatronusCash"); //Creo una instancia desde donde crear el contrato.
  patronusCashContract = await PatronusFactory.deploy();
  await patronusCashContract.deployed();

  accounts = await ethers.getSigners();
  [eoa, eoa2, eoa3, eoa4, eoa5] = accounts;
});

describe("PatronusCash", async () => {
  it("Transacción revertida por inclusión del address destino en blacklist", async function () {
    let cuenta1Address = await eoa.getAddress();
    let cuenta2Address = await eoa2.getAddress();
    let cuenta3Address = await eoa3.getAddress();
    let cuenta4Address = await eoa4.getAddress();
    let cuenta5Address = await eoa5.getAddress();

    // balanceInicialCuenta1 = (await ethers.provider.getBalance(cuenta1Address)).toString();
    // balanceInicialCuenta2 = (await ethers.provider.getBalance(cuenta2Address)).toString();
    // balanceInicialCuenta3 = (await ethers.provider.getBalance(cuenta3Address)).toString();
    // balanceInicialCuenta4 = (await ethers.provider.getBalance(cuenta4Address)).toString();
    // balanceInicialCuenta5 = (await ethers.provider.getBalance(cuenta5Address)).toString();
    // console.log(`El balance de la cuenta 1 es: `, balanceInicialCuenta1);
    // console.log(`El balance de la cuenta 2 es: `, balanceInicialCuenta2);
    // console.log(`El balance de la cuenta 3 es: `, balanceInicialCuenta3);
    // console.log(`El balance de la cuenta 4 es: `, balanceInicialCuenta4);
    // console.log(`El balance de la cuenta 5 es: `, balanceInicialCuenta5);

    balanceInicialCuenta1 = await ethers.provider.getBalance(cuenta1Address);
    balanceInicialCuenta2 = await ethers.provider.getBalance(cuenta2Address);
    balanceInicialCuenta3 = await ethers.provider.getBalance(cuenta3Address);
    balanceInicialCuenta4 = await ethers.provider.getBalance(cuenta4Address);
    balanceInicialCuenta5 = await ethers.provider.getBalance(cuenta5Address);

    //Agregar 3 direcciones a la blacklist.

    await patronusCashContract.agregarAddress(cuenta3Address);
    await patronusCashContract.agregarAddress(cuenta4Address);
    await patronusCashContract.agregarAddress(cuenta5Address);

    try {
      tx = await patronusCashContract.enviarReceptor(cuenta3Address, {value: ethers.utils.parseEther(`1`)});
      await tx.wait();
      console.log("TRANSACCION EXITOSA!")

      // balanceFinalCuenta1 = (await ethers.provider.getBalance(cuenta1Address)).toString();
      // balanceFinalCuenta3 = (await ethers.provider.getBalance(cuenta3Address)).toString();

      // console.log(`El balance final de la cuenta 1 es: `, balanceFinalCuenta1);
      // console.log(`El balance final de la cuenta 3 es: `, balanceFinalCuenta3);

      balanceFinalCuenta1 = await ethers.provider.getBalance(cuenta1Address);
      balanceFinalCuenta3 = await ethers.provider.getBalance(cuenta3Address);

    } catch (error) {
      // balanceFinalCuenta1 = (await ethers.provider.getBalance(cuenta1Address)).toString();
      // balanceFinalCuenta3 = (await ethers.provider.getBalance(cuenta3Address)).toString();

      // console.log(`El balance final de la cuenta 1 es: `, balanceFinalCuenta1);
      // console.log(`El balance final de la cuenta 3 es: `, balanceFinalCuenta3);

      balanceFinalCuenta1 = await ethers.provider.getBalance(cuenta1Address);
      balanceFinalCuenta3 = await ethers.provider.getBalance(cuenta3Address);
      console.log(`ERROR: ${error}`);
    }

    expect(balanceFinalCuenta3, "BALANCE INCORRECTO").to.be.eq(balanceInicialCuenta3); //No aumenta el balance de la cuenta 3 por ser scam
    expect(balanceFinalCuenta1, "BALANCE INCORRECTO").to.be.gt(balanceInicialCuenta1.sub(ethers.utils.parseEther(`1`))); //No disminuya 1 ether su balance, solo el gas gastado.
  });
});


//  balanceInicial = (await ethers.provider.getBalance(eoa.getAddress())).toString();
