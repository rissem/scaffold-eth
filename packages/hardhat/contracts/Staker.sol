pragma solidity >=0.6.0 <0.7.0;

import "hardhat/console.sol";
import "./ExampleExternalContract.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract Staker {
  event Stake(
    address from,
    uint value
  );

  ExampleExternalContract public exampleExternalContract;

  bool public openForWithdrawal = false;
  uint public deadline;
  uint public totalRaised = 0;
  uint public threshold;

  mapping(address => uint) public balances;

  constructor(address exampleExternalContractAddress, uint stakingDuration, uint _threshold) public {
    deadline = block.timestamp + stakingDuration;
    exampleExternalContract = ExampleExternalContract(exampleExternalContractAddress);
    threshold = _threshold;  
  }

  function stake() public payable {
    require(block.timestamp < deadline, "Too late to stake");
    balances[msg.sender] = msg.value;
    totalRaised += msg.value;
    emit Stake(msg.sender, msg.value);
  }

  function execute() public {
    require(block.timestamp > deadline, "Unable to execute yet...");
    if (totalRaised > threshold){
      exampleExternalContract.complete{value: address(this).balance}();
    } else {
      openForWithdrawal = true;
    }
  }

  // allow a user to retrieve their balance
  function balance() public view returns (uint) {
    return balances[msg.sender];
  }

  function withdraw() public {
    require (openForWithdrawal, "Contract is not open for withdrawal");
    //TODO    
  }

  function timeLeft() public view returns (uint){
    return deadline - block.timestamp;
  }
}
