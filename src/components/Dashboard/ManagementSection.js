import React from "react";

const ManagementSection = ({ sectionName, Component }) => {
  console.log(Component); 

  if (!Component) {
    return <p>Component not found!</p>; 
  }

  return (
    <div>
      <h2>{sectionName}</h2>
      <Component /> 
    </div>
  );
};

export default ManagementSection;
