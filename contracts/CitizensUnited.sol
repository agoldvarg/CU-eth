pragma solidity ^0.4.15;

contract CitizensUnited {
    address public tsar;
    string public message = "";
    uint public costOfSpeech = 0;

    function CitizensUnited() public {
        tsar = msg.sender;
    }

    function setMessage(string _newMessage) public payable {
        // Require that the message sender is the current tsar,
        // or the message value is higher than the current contract balance
        require(
            msg.sender == tsar ||
            msg.value > costOfSpeech
        );

        message = _newMessage;
        costOfSpeech = this.balance;

        if (msg.sender != tsar) {
            msg.sender.transfer(this.balance - msg.value);

            tsar = msg.sender;
            costOfSpeech = msg.value;
        }
    }

    function cedePower() public {
        require(msg.sender == tsar);

        // Reset tsar address
        tsar = address(0);

        // Free speech!
        costOfSpeech = 0;

        tsar.transfer(this.balance);
    }

    function() public payable {
        revert();
    }
}
