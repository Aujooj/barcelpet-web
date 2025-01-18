import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-primary"></div>
    </div>
  );
};
export default Loading;
