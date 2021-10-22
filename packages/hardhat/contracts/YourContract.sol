pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  //event SetPurpose(address sender, string purpose);

  mapping(string => string) public myMap;
  mapping(address => mapping(uint => bool)) public nested;

  constructor() {
    // what should we do on deploy?
  }

  function setPurpose(string memory newPurpose) public {
      console.log("My Map Before", myMap['purpose']);
      myMap['purpose'] = newPurpose;
      console.log("Nested Map Value", nested[msg.sender][0]);
      nested[msg.sender][0] = true;
      console.log("to think the user wanted", newPurpose);
      console.log("My Map Now", myMap['purpose']);
      console.log("Nested Map Value", nested[msg.sender][0]);      
      //console.log("Nested Map Now", nested);
      //emit SetPurpose(msg.sender, purpose);
  }
}
