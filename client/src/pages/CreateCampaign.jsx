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
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className='bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4'>
      {isLoading && "Loading..."}
      <div className='flex justify-between items-center rounded-[10px] p-[16px] sm:min-w-[360px] bg-[#3a3a43]  '>
        <h1 className='font-epilogue text-[18px] sm:text-[25px] m-auto leading-[38px] text-white font-bold '>
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
            handleChange={(e) => {
              handleFormFieldChange("name", e);
            }}
          />
          <FormField
            labelName='Campaign title:'
            placeholder='Help me pay my rent..'
            inputType='text'
            value={form.title}
            handleChange={(e) => {
              handleFormFieldChange("title", e);
            }}
          />
        </div>
        <FormField
          labelName='Campaign Story:'
          placeholder='Story..'
          inputType='text'
          isTextArea={true}
          value={form.description}
          handleChange={(e) => {
            handleFormFieldChange("description", e);
          }}
        />
        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img
            src={money}
            alt='money'
            className='w-[40px] h-[40px] object-contain'
          />
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>
            You will get 100% of the funds raised
          </h4>
        </div>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Goal'
            placeholder='Eth 0.50'
            inputType='text'
            value={form.target}
            handleChange={(e) => {
              handleFormFieldChange("target", e);
            }}
          />
          <FormField
            labelName='Deadline'
            placeholder='End date'
            inputType='date'
            value={form.deadline}
            handleChange={(e) => {
              handleFormFieldChange("deadline", e);
            }}
          />
        </div>
        <FormField
          labelName='Image'
          placeholder='Image URL'
          inputType='text'
          value={form.image}
          handleChange={(e) => {
            handleFormFieldChange("image", e);
          }}
        />
        <div className='flex justify-center items-center mt-[40px]'>
          <Button
            btnType='submit'
            title='Start a campaign'
            styles='bg-[#1dc071] py-4'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
