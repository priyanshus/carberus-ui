
import React from 'react'

type CardComponentProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

const CardComponent: React.FC<CardComponentProps> = ({ header, children }) => {
  return (
    <div className="flex w-full rounded-t-md rounded-b-md bg-white p-8">
      <div className="flex flex-col w-full">

        {header}

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
