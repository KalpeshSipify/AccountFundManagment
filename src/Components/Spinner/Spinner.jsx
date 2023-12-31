import React from "react";

// Spinner component for displaying a loading animation
const Spinner = () => {
  return (
    <div className="relative">
      <div className="border-t-4 border-b-4 rounded-full w-16 h-16 animate-ping"></div>
    </div>
  );
};

const MemoizedSpinner = React.memo(Spinner);
export default MemoizedSpinner;
