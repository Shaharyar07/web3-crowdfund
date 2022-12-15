import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xc137FF8150d4a2525768326c6AdC16Fc17e259f7"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createcampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("Contract call success: ", data);
    } catch (error) {
      console.log("Contract call Failed: ", error);
    }
  };

  const getAllCompaigns = async () => {
    try {
      const data = await contract.call("getcampaigns");
      const parsedData = data.map((campaign, index) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toString(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        id: index,
      }));
      console.log("Contract call success: ", parsedData);
      return parsedData;
    } catch (error) {
      console.log("Contract call Failed: ", error);
    }
  };
  const getMyCampaigns = async () => {
    const campaigns = await getAllCompaigns();
    const myCampaigns = campaigns.filter(
      (campaign) => campaign.owner === address
    );
    return myCampaigns;
  };
  const donate = async (pId, amount) => {
    const data = await contract.call("donateTocampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        donate,
        getDonations,
        getMyCampaigns,
        getAllCompaigns,
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
