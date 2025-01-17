import React from "react";
import DetailProps from "../interfaces/DetailProps";

const DescriptionDetailItem: React.FC<DetailProps> = ({ title, description }) => {
  
  if (!description) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-primary mb-4">{title}</h2>
      {description.split("<br>").map((line, index) => (
        <p key={index} className="text-gray-700">
          {line}
        </p>
      ))}
    </div>
  );
};
export default DescriptionDetailItem;
