const { ethers } = require('hardhat')
const { use, expect } = require('chai')
const { solidity } = require('ethereum-waffle')

use(solidity)

describe('My Dapp', function () {
  let myContract

  describe('YourContract', function () {
    it('Should deploy YourContract', async function () {
      const { deployer } = await getNamedAccounts()
      const accounts = await getUnnamedAccounts()
      const provider = ethers.getDefaultProvider()
      // console.log('BALANCE', await provider.getBalance(deployer))
      // console.log('BALANCE', await provider.getBalance(accounts[0]))

      const YourContract = await ethers.getContractFactory('YourCollectible')
      myContract = await YourContract.deploy()
      console.log('CONTRACT OWNER', await myContract.owner())
      console.log('DEPLOYER', deployer)
      //gas limit is somwhere between 200,000 and 300,000
      const id = (
        await myContract.mintItem(accounts[0], 'blah', { gasLimit: 300000 })
      ).data
      console.log('MINTED NFT ID = ', id)
    })
  })
})
