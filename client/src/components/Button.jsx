import React from "react";

const Button = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`${styles} rounded-[10px] font-[16px px-4 text-white leading-8] font-epilogue font-semibold text-[16px] leading-[26px text-white]`}
    >
      {title}
    </button>
  );
};

export default Button;
