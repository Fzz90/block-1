// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Owner
 * @dev Simple contract that stores and returns the address of the deployer (owner)
 */
contract Owner {
    address private _owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    /**
     * @dev Sets the original `owner` of the contract to the sender account
     */
    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }
    
    /**
     * @dev Returns the address of the current owner
     * @return The owner's address
     */
    function owner() public view returns (address) {
        return _owner;
    }
    
    /**
     * @dev Returns the address of the current owner (alternative function name)
     * @return The owner's address
     */
    function getOwner() public view returns (address) {
        return _owner;
    }
    
    /**
     * @dev Throws if called by any account other than the owner
     */
    modifier onlyOwner() {
        require(_owner == msg.sender, "Owner: caller is not the owner");
        _;
    }
    
    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`)
     * Can only be called by the current owner
     * @param newOwner The address of the new owner
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Owner: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
    
    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
}