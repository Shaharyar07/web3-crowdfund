import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { CampaignCard } from "./";
const Campaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign/${campaign.id}`, { state: { campaign } });
  };
  return (
    <div>
      <h1 className='font-epilogue font-semibold text-white text-[18px] text-left'>
        {title} ( {campaigns.length} )
      </h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img
            src={loader}
            alt='Loading...'
            className='w-[100px] h-[100px] object-contain'
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-white text-[18px] ms-5 text-left'>
            You have not created any campaigns yet.
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              handleClick={() => {
                handleNavigate(campaign);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Campaigns;
