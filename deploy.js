const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  console.log("📋 Deployment Details:");
  console.log("═══════════════════════════════════════");
  console.log("Deployer address:", deployer.address);
  console.log(
    "Deployer balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH"
  );
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log(
    "Chain ID:",
    (await ethers.provider.getNetwork()).chainId.toString()
  );
  console.log("═══════════════════════════════════════\n");

  // Deploy the contract
  console.log("📦 Deploying Owner contract...");
  const Owner = await ethers.getContractFactory("Owner");
  const owner = await Owner.deploy();

  // Wait for deployment
  await owner.waitForDeployment();

  // Get contract address
  const contractAddress = await owner.getAddress();

  console.log("✅ Contract deployed successfully!\n");

  console.log("📍 Contract Information:");
  console.log("═══════════════════════════════════════");
  console.log("Contract address:", contractAddress);
  console.log("Contract owner:", await owner.owner());
  console.log("Transaction hash:", owner.deploymentTransaction().hash);
  console.log(
    "Block number:",
    (await owner.deploymentTransaction().wait()).blockNumber
  );
  console.log(
    "Gas used:",
    (await owner.deploymentTransaction().wait()).gasUsed.toString()
  );
  console.log("═══════════════════════════════════════\n");

  // Verify the owner is the deployer
  const contractOwner = await owner.owner();
  if (contractOwner === deployer.address) {
    console.log("✅ Verification: Contract owner matches deployer address");
  } else {
    console.log("❌ Error: Contract owner does not match deployer address");
  }

  console.log("\n🎉 Deployment completed successfully!");

  // Optional: Save addresses to a file
  const fs = require("fs");
  const deploymentInfo = {
    contractAddress: contractAddress,
    ownerAddress: contractOwner,
    deployerAddress: deployer.address,
    networkName: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deploymentTime: new Date().toISOString(),
    transactionHash: owner.deploymentTransaction().hash,
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("📄 Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
