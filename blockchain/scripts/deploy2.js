const hre = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run("compile");

  // Specify the PlatformToken address (replace with the actual deployed address)
  const platformTokenAddress = "0x184c5a0f24f68059Dd33F770928c7Fc73c789664";

  // Deploy the Escrow contract
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(platformTokenAddress);

  await escrow.waitForDeployment();

  console.log(`Escrow contract deployed to: ${escrow.address}`);
  console.log(`Using PlatformToken at: ${platformTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
