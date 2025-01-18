import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 h-full ml-64"></div>
    </>
  );
};
export default Dashboard;
