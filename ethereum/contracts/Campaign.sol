pragma solidity ^0.4.17;




// for users to create new instances of 'campaign' contract 
contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}




/*
VARS:
manager
minContribution
approvers
requests

METHODS:
contribute()
createRequest() -> called by manager to request vote 
approveRequest() -> contributors vote yes/no 
finalizeRequest()

*/
contract Campaign {

// Request - request made by manager to send amount to vendor
    struct Request {
        // value types
        string description;
        bool completed;
        uint value;
        address recipient;
        uint approvalCount; // -> counts 'yes' votes for any specific request
        // reference type
        mapping(address => bool) approvals; // -> how has voted already and who has not
    }


    address public manager;
    uint public minContribution;
    // address[] public approvers;
    // not using arr cause it will consume too much gas to iterate and check each approvers
    mapping(address => bool) public approvers; // -> if that approver is a contributor
    Request[] public requests;
    uint public approversCount ; //-> how many contributed



    modifier restricted(){
        require(msg.sender == manager);
        _;
    }


    function Campaign(uint minimum, address creator) public{
        manager = creator;
        minContribution = minimum;
    }

    function contribute() payable public {
        require(msg.value >= minContribution);
        approvers[msg.sender] = true;
        approversCount++;
    } 

// storage -> new var point to original memory location
// memory -> new var points to location of copy of storage 



    function createRequest(string description, uint value, address recipient) 
        public restricted {
        Request memory newRequest =  Request({
            description: description,
            value: value,
            completed: false,
            recipient: recipient,
            approvalCount: 0
            // no need to mention ref types
        });
        requests.push(newRequest);
    }

// function to vote for a request by contributor
    function approveRequest(uint index) public {
        
        Request storage currentRequest = requests[index];

        // to check if msg.sender is a contributor
        require(approvers[msg.sender]);

        // to check if msg.sender has not voted before for this particular request
        require(!currentRequest.approvals[msg.sender]);

        currentRequest.approvals[msg.sender] = true;
        currentRequest.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted {
        Request storage currentRequest = requests[index];

        require(currentRequest.approvalCount > (approversCount/2));
        require(!currentRequest.completed);

        currentRequest.recipient.transfer(currentRequest.value);
        currentRequest.completed = true;
    }

    function getSummary() public view returns(
        uint,uint,uint,uint,address
    ) {
        return (
            minContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }

}