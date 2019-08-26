pragma solidity ^0.5.0;

contract SimpleContract {
  string public name;
  address private owner;

  constructor () public {
    name = 'my name';
    owner = msg.sender;
  }

  event NameEvent(string evPram);

  modifier onlyOwner() {
    require(msg.sender == owner,"is owner");

    _;
  }

  function getName() public view returns (string memory) {
    return (name);
  }

  function changeName(string memory _name ) public onlyOwner {
    name = _name;
    emit NameEvent(name);
  }
}