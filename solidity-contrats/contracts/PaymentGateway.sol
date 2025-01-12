// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentGateway {
    address public owner;

    event PaymentReceived(address indexed payer, uint256 amount, string message);
    event Withdrawal(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function pay(string memory message) public payable {
        require(msg.value > 0, "Payment must be greater than zero");
        emit PaymentReceived(msg.sender, msg.value, message);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
