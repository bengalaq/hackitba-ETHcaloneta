// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PatronusCash is Ownable, ReentrancyGuard{

  //Usamos mapping porque iterar sobre un array conlleva a un elevado uso de gas.
  mapping(address => bool) public CriminalAddresses;
  // mapping(address => bool) public PendingAddresses; //Lista de pendientes a agregar si llegamos con lo anterior.

  function agregarAddress(address _criminalAddress) public onlyOwner {
    CriminalAddresses[_criminalAddress] = true;
  }

  function enviarReceptor(address payable _address) external payable nonReentrant {
    require(!CriminalAddresses[_address]);
    _address.transfer(msg.value);
  }
}