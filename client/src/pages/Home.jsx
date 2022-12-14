import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

const Home = () => {
  const { contract, address, getAllCompaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [compaigns, setCompaigns] = useState([]);

  const fetchCompaigns = async () => {
    setIsLoading(true);
    const data = await getAllCompaigns();
    
    setCompaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchCompaigns();
  }, [address, contract]);

  return <div>Home</div>;
};

export default Home;
