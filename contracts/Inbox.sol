pragma solidity >=0.4.17;

contract Inbox {

    string public Message;

    //constructor(string memory initialMessage) {
    //    Message = initialMessage;
    //}

    function Inbox(string initialMessage) public {
        Message = initialMessage;
    }

    function setMessage(string  newMessage) public {
        Message = newMessage;
    }
}