pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  //event SetPurpose(address sender, string purpose);

  string public purpose = "A Mew Hope.";

  uint immutable public oneWei = 1 wei;
  uint immutable oneEther = 1 ether;

  constructor() {
    // what should we do on deploy?
  }

  function setPurpose(string memory newPurpose) public {
      purpose = "New World Order (ignoring proposed purpose)";
      console.log(msg.sender,"set purpose to",purpose);
      console.log("to think the user wanted", newPurpose);
      console.log(oneEther / oneWei / 1e17);
      //emit SetPurpose(msg.sender, purpose);
  }
}
