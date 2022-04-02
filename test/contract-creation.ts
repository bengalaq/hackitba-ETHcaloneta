import { expect } from "chai";
import { ethers } from "hardhat";

describe("PatronusCash", function () {
  it("Prueba que el contrato se creó con en X address ", async function () {
    const PatronusCashFactory = await ethers.getContractFactory("PatronusCash");
    const patronusCash = await PatronusCashFactory.deploy();
    await patronusCash.deployed();
    
    console.log(`CONTRATO PATRONUS DEPLOYADO EN: ${patronusCash.address}`);
    expect(patronusCash.address).not.to.equal("");
  });
});
