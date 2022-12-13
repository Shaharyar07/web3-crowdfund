// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFund {
    struct campaign {
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

    mapping(uint256 => campaign) public compaings;
    uint256 public campaignCount = 0;

    function createcampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        campaign storage campaign = compaings[campaignCount];

        require(
            campaign.deadline < block.timestamp,
            "The Deadline must be a date in the future"
        );
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;
        campaignCount++;
        return campaignCount - 1;
    }

    function donateTocampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        campaign storage campaign = compaings[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool success, ) = payable(campaign.owner).call{value: amount}("");
        if (success) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (compaings[_id].donators, compaings[_id].donations);
    }

    function getcampaigns() public view returns (campaign[] memory) {
        campaign[] memory campaigns = new campaign[](campaignCount);

        for (uint256 i = 0; i < campaignCount; i++) {
            campaigns[i] = compaings[i];
        }

        return campaigns;
    }
}
