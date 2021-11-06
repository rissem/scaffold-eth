const { ethers } = require('ethers')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const exampleExternalContract = await deployments.get(
    'ExampleExternalContract',
  )
  await deploy('Staker', {
    from: deployer,
    args: [
      exampleExternalContract.address,
      3600 * 72,
      ethers.utils.parseEther('0.1'),
    ],
    log: true,
  })
}

module.exports.tags = ['Staker']
