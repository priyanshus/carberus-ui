import React from "react";

type CardComponentProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

const CardComponent: React.FC<CardComponentProps> = ({ header, children }) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden rounded-md bg-white p-10">
      <div>{header}</div>
      <div className="flex-1 overflow-auto min-h-0">{children}</div>
    </div>
  );
};

export default CardComponent;
