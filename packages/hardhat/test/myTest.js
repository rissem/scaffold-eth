const { ethers, waffle } = require('hardhat')
const { use, expect } = require('chai')
const { solidity } = require('ethereum-waffle')

use(solidity)

const provider = waffle.provider

const printContractBalance = async (contract) => {
  const contractBalance = await provider.getBalance(contract.address)
  console.log('contract balance', contractBalance)

  console.log(
    'CONTRACT BALANCE IN ETH',
    ethers.utils.formatEther(contractBalance),
  )
}

describe('My Dapp', function () {
  let myContract

  describe('YourContract', function () {
    it('Should deploy YourContract', async function () {
      const { deployer } = await getNamedAccounts()
      const accounts = await getUnnamedAccounts()

      const YourContract = await ethers.getContractFactory('YourCollectible')
      myContract = await YourContract.deploy()

      await printContractBalance(myContract)

      const id = (
        await myContract.mintItem(accounts[0], 'blah', {
          //gas limit is somwhere between 200,000 and 300,000
          gasLimit: 300000,
          value: 1e6 * 1e9 + 1,
        })
      ).data

      await printContractBalance(myContract)

      const signer = provider.getSigner(accounts[0])

      console.log(
        'ACCOUNT BALANCE',
        ethers.utils.formatEther(await provider.getBalance(accounts[0])),
      )
      const newContract = await myContract.connect(signer)
      const sender = (await newContract.liquidate()).data
      console.log('SENDER', sender)
      console.log('ACCT 0', accounts[0])

      await printContractBalance(myContract)

      console.log(
        'ACCOUNT BALANCE',
        ethers.utils.formatEther(await provider.getBalance(accounts[0])),
      )

      console.log('MINTED NFT ID = ', id)
    })
  })
})
