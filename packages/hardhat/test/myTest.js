const { ethers, waffle } = require('hardhat')
const { use, expect } = require('chai')
const { solidity } = require('ethereum-waffle')

use(solidity)

const sleep = function (sec) {
  return new Promise((res, rej) => {
    setTimeout(res, sec * 1000)
  })
}

const provider = waffle.provider

describe('Staking App', async function () {
  let exampleContract
  let stakerContract

  describe('Example External Contract', async function () {
    it('should deploy the example contract', async function () {
      const ExampleContract = await ethers.getContractFactory(
        'ExampleExternalContract',
      )
      exampleContract = await ExampleContract.deploy()
    })

    it('should have no value', async function () {
      const exampleContractValue = await provider.getBalance(
        exampleContract.address,
      )
      expect(exampleContractValue).to.eq(0)
    })
  })

  describe('Successful Staker', async function () {
    let acct1Deposit = 1000
    let acct2Deposit = 8000
    let acct3Deposit = 4000
    let totalDeposited = acct1Deposit + acct2Deposit + acct3Deposit

    it('should deploy Staker', async function () {
      const Staker = await ethers.getContractFactory('Staker')
      //expires after 5 seconds
      stakerContract = await Staker.deploy(exampleContract.address, 5, 10000)
    })

    it('should not all the Staker to be executed', async function () {
      await expect(stakerContract.execute()).to.be.revertedWith(
        'Unable to execute yet...',
      )
    })

    it('should allow allow addr1 to invest in the project', async function () {
      const [owner, addr1, ...addrs] = await ethers.getSigners()
      await (await stakerContract.connect(addr1)).stake({ value: acct1Deposit })
      expect(await stakerContract.totalRaised()).eq(acct1Deposit)
      const balance = await (await stakerContract.connect(addr1)).balance()
      expect(balance).eq(acct1Deposit)
    })

    it('should allow allow addr 2 to invest in the project', async function () {
      const [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
      await (await stakerContract.connect(addr2)).stake({ value: acct2Deposit })
      expect(await stakerContract.totalRaised()).eq(acct1Deposit + acct2Deposit)
      const balance = await (await stakerContract.connect(addr2)).balance()
      expect(balance).eq(acct2Deposit)
    })

    it('should allow allow addr3 to invest in the project', async function () {
      const [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
      await (await stakerContract.connect(addr3)).stake({ value: acct3Deposit })
      expect(await stakerContract.totalRaised()).eq(
        acct1Deposit + acct2Deposit + acct3Deposit,
      )
      const balance = await (await stakerContract.connect(addr3)).balance()
      expect(balance).eq(acct3Deposit)
    })

    it('should allow the contract to be executed after 5 seconds', async function () {
      await sleep(5)
      stakerContract.execute()
    })

    it('should have zero value stored in the contract', async function () {
      const contractValue = await provider.getBalance(stakerContract.address)
      expect(contractValue).to.eq(0)
    })

    it('should have transferred all deposits to the external contract', async function () {
      const exampleContractValue = await provider.getBalance(
        exampleContract.address,
      )
      expect(exampleContractValue).to.eq(totalDeposited)
    })

    it('should fail an attempted withdrawal', async function () {
      const [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
      await expect(
        (await stakerContract.connect(addr3)).withdraw(),
      ).to.be.revertedWith('Contract is not open for withdrawal')
    })

    it('should not allow any more staking', async function () {
      const [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
      await expect(
        (await stakerContract.connect(addr3)).stake({ value: 5 }),
      ).to.be.revertedWith('Too late to stake')
    })
  })

  describe('Unsuccessful Staker', async function () {
    let acct1Deposit = 1000

    it('should deploy Staker', async function () {
      const Staker = await ethers.getContractFactory('Staker')
      //expires after 5 seconds
      stakerContract = await Staker.deploy(exampleContract.address, 5, 10000)
    })

    it('should not all the Staker to be executed', async function () {
      await expect(stakerContract.execute()).to.be.revertedWith(
        'Unable to execute yet...',
      )
    })

    it('should allow allow addr1 to invest in the project', async function () {
      const [owner, addr1, ...addrs] = await ethers.getSigners()
      await (await stakerContract.connect(addr1)).stake({ value: acct1Deposit })
      expect(await stakerContract.totalRaised()).eq(acct1Deposit)
      const balance = await (await stakerContract.connect(addr1)).balance()
      expect(balance).eq(acct1Deposit)
    })

    it('should allow the contract to be executed after 5 seconds', async function () {
      await sleep(5)
      stakerContract.execute()
    })

    it('should allow a attempted withdrawal', async function () {
      const [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
      await (await stakerContract.connect(addr1)).withdraw()
      const balance = await (await stakerContract.connect(addr1)).balance()
      expect(balance).to.eq(0)
      const contractValue = await provider.getBalance(stakerContract.address)
      expect(contractValue).to.eq(0)
    })

    it('should not allow any more staking', async function () {
      const [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
      await expect(
        (await stakerContract.connect(addr3)).stake({ value: 5 }),
      ).to.be.revertedWith('Too late to stake')
    })
  })
})
