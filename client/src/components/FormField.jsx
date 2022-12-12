import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) => {
  return (
    <div className='flex-1 flex flex-col w-full'>
      {labelName && (
        <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px] '>
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          className='bg-[#3a3a43] rounded-[10px] p-[16px] sm:px-[25px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[14px] leading-[22px] text-white font-epilogue font-medium placeholder:text-[#4b5264] sm:min-w-[300px]'
          placeholder={placeholder}
          value={value}
          rows='10'
          onChange={handleChange}
        />
      ) : (
        <input
          required
          className='bg-[#3a3a43] rounded-[10px] p-[16px] sm:px-[25px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[14px] leading-[22px] text-white font-epilogue font-medium placeholder:text-[#4b5264] sm:min-w-[300px]'
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          type={inputType}
          step='0.1'
        />
      )}
    </div>
  );
};

export default FormField;
