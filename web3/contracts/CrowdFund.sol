// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFund {
    struct Compaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Compaign) public compaings;
    uint256 public compaignCount = 0;

    function createCompaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Compaign storage compaign = compaings[compaignCount];

        require(
            compaign.deadline > block.timestamp,
            "The Deadline must be a date in the future"
        );
        compaign.owner = _owner;
        compaign.title = _title;
        compaign.description = _description;
        compaign.target = _target;
        compaign.deadline = _deadline;
        compaign.image = _image;
        compaign.amountCollected = 0;
        compaignCount++;
        return compaignCount - 1;
    }

    function donateToCompaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Compaign storage compaign = compaings[_id];
        compaign.donators.push(msg.sender);
        compaign.donations.push(amount);

        (bool success, ) = payable(compaign.owner).call{value: amount}("");
        if (success) {
            compaign.amountCollected += amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (compaings[_id].donators, compaings[_id].donations);
    }

    function getCompaigns() public view returns (Compaign[] memory) {
        Compaign[] memory compaigns = new Compaign[](compaignCount);

        for (uint256 i = 0; i < compaignCount; i++) {
            compaigns[i] = compaings[i];
        }

        return compaigns;
    }
}
