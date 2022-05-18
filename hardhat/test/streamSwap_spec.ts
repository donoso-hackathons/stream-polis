import { expect } from "chai";
import { ethers } from "hardhat";

describe("Stream Swap", function () {
  it("Should Start", async function () {
    const StreamSwap = await ethers.getContractFactory("StreamSwap");
    const streamSwap = await StreamSwap.deploy();
    await streamSwap.deployed();

 
  });
});
