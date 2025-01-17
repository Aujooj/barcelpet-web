import React from "react";
import DetailProps from "../interfaces/DetailProps";

const ListDetailItem: React.FC<DetailProps> = ({ title, description }) => {
  if (!description) return null;

  const benefits = description.split("<br>");
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-primary mb-4">{title}</h2>
      <ul>
        {benefits.map((benefit, index) => {
          const [benefitTitle, benefitDescription] = benefit.split(": ", 2);
          return (
            <li key={index} className="my-5">
              <strong className="font-semibold text-secondary">
                {benefitTitle}:
              </strong><br />
              <span className="ml-5 text-gray-700">{benefitDescription}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ListDetailItem;
