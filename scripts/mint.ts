import { ethers } from "ethers";
const mint = async () => {
  let contract = await ethers.getContract(
    "0x80Ee8e7aF77029Ee953E3b75237548cf8327b2D1"
  );
  // console.log(contract)
  try {
    const fee = ethers.parseEther("0.0004"); // Set the fee in ether, you can adjust the value as needed
    let tx = await (await contract.mint({ value: fee })).wait();
    console.log(`✅ [${hre.network.name}] mint()`);
    console.log(` tx: ${tx.transactionHash}`);
    let onftTokenId = await ethers.provider.getTransactionReceipt(
      tx.transactionHash
    );
    console.log(
      ` ONFT nftId: ${parseInt(Number(onftTokenId.logs[0].topics[3]))}`
    );
  } catch (e) {
    if (e.error?.message.includes("ONFT: Max limit reached")) {
      console.log("*ONFT: Max limit reached*");
    } else {
      console.log(e);
    }
  }
};
