// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


/// @title Contrato para impedir transacciones a address maliciosas ya conocidas.
/// @author Ethcaloneta
/// @notice Puede usar este contrato para reducir las posibilidades de enviar dinero a un scammer/agente malicioso. 
/// @dev El owner del contrato coincide con el address que lo deployó.
contract PatronusCash is Ownable, ReentrancyGuard{

  /// @notice Blacklist de addresses ya identificadas como maliciosas.
  /// @dev Se utiliza un mapping en lugar de un array para evitar iterar y así llevar a un elevado gasto de gas.
  mapping(address => bool) public CriminalAddresses;
  // mapping(address => bool) public PendingAddresses; //Lista de pendientes a agregar si llegamos con lo anterior.

  /// @dev Agrega una nueva address a la blacklist. Solo el owner puede invocar esta función.
  function agregarAddress(address _criminalAddress) public onlyOwner {
    CriminalAddresses[_criminalAddress] = true;
  }

  /// @notice Envía dinero a un address particular
  /// @dev Chequea que el address ingresado no figure dentro de la blacklist. Utiliza el modifier nonReentrant para mitigar posibles reentradas a esta función al realizar el transfer
  function enviarReceptor(address payable _address, uint256 _value) external payable nonReentrant {
    require(msg.value == _value);
    require(!CriminalAddresses[_address]);
    _address.transfer(_value);
  }
}