const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("Deploying Voting contract...");

    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.waitForDeployment();

    const address = await voting.getAddress();

    console.log("\n✅ Voting contract deployed to:", address);
    console.log("\n📋 Updating Constants.js...");

    // Update Constants.js
    const constantsPath = path.join(__dirname, "../frontend/src/utils/Constants.js");
    let constantsContent = fs.readFileSync(constantsPath, "utf8");

    // Replace CONTRACT_ADDRESS
    constantsContent = constantsContent.replace(
        /export const CONTRACT_ADDRESS = "0x[a-fA-F0-9]+"/,
        `export const CONTRACT_ADDRESS = "${address}"`
    );

    fs.writeFileSync(constantsPath, constantsContent);

    console.log("✅ Constants.js updated!");
    console.log("\n🔗 Network: Hardhat Localhost (Chain ID: 31337)");
    console.log("\n🎉 Ready to use! Refresh your browser at http://localhost:3000");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
