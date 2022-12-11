import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { Button } from "../components";
import { checkIfImage } from "../utils";
import FormField from "../components/FormField";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    target: "",
    deadline: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4'>
      {isLoading && "Loading..."}
      <div className='flex justify-between items-center rounded-[10px] p-[16px] sm:min-w-[360px] bg-[#3a3a43]  '>
        <h1 className='font-epilogue text-[18px] sm:text-[25px] leading-[38px] text-white font-bold '>
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full mt-[65px] gap-[30px] flex flex-col'
      >
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Your name:'
            placeholder='Dev Sherry...'
            inputType='text'
            value={form.name}
            handleChange={() => {}}
          />
          <FormField
            labelName='Campaign title:'
            placeholder='Help me pay my rent..'
            inputType='text'
            value={form.title}
            handleChange={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
