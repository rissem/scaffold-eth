pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  //event SetPurpose(address sender, string purpose);

  string public purpose = "A Mew Hope.";
  struct Todo {
    string text;
    bool completed;
  }

  // An array of 'Todo' structs
  Todo[] public todos;


  constructor() {
    Todo memory todo;
    todo.text = "SOMETHING";
    todo.completed = false;
    todos.push(todo);
  }

  function setPurpose(string memory newPurpose) public {
      console.log("do not forget todo", todos[0].text);
      console.log("TODO LENGTH", todos.length);
      if (todos.length > 1){
        console.log(todos[1].text);
      }      
      Todo memory newTodo;
      todos.push(newTodo);
      newTodo.text = "something new that has to happen";
      purpose = "New World Order (ignoring proposed purpose)";
      console.log(msg.sender,"set purpose to",purpose);
      console.log("to think the user wanted", newPurpose);
      //emit SetPurpose(msg.sender, purpose);
  }
}
