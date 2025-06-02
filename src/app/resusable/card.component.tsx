
import React from 'react'

type CardComponentProps = {
  header: string;
  children: React.ReactNode;
};

const CardComponent: React.FC<CardComponentProps> = ({ header, children }) => {
  return (
    <div className="flex w-full rounded-t-md rounded-b-md shadow-md">
      <div className="flex flex-col w-full">
        {/* Header */}
        {header && (
          <div className="h-10 bg-primary-800 p-2 w-full rounded-t-md">
            <h2 className="text-background-light">
              {header}
            </h2>
          </div>
        )}

        {/* Content */}
        <div className="p-2 space-y-2 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
