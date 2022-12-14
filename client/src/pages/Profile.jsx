import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { Campaigns } from "../components";
const Profile = () => {
  const { contract, address, getMyCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [compaigns, setCompaigns] = useState([]);

  const fetchCompaigns = async () => {
    setIsLoading(true);
    const data = await getMyCampaigns();

    setCompaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchCompaigns();
  }, [address, contract]);

  return (
    <div>
      <Campaigns
        title='Your Campaigns'
        isLoading={isLoading}
        campaigns={compaigns}
      />
    </div>
  );
};

export default Profile;
