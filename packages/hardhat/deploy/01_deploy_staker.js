module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const exampleExternalContract = await deployments.get(
    'ExampleExternalContract',
  )
  await deploy('Staker', {
    from: deployer,
    args: [exampleExternalContract.address, 4000, 1e15],
    log: true,
  })
}

module.exports.tags = ['Staker']
