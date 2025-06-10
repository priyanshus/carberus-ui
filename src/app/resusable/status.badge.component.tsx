import React from 'react';
import clsx from 'clsx'; // Optional: helps conditionally build classNames

type InfoBadgeProps = {
  label: string;
  status?: string;
};

const statusColors: Record<string, string> = {
  active: 'bg-success-background-highlighter text-success-highlighter',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-danger-background-highlighter  text-danger-higlighter',
  default: 'bg-blue-100 text-blue-800',
};

const StatusBadge: React.FC<InfoBadgeProps> = ({ label, status = 'default' }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center p-0.5 py-0.5 rounded text-sm',
        statusColors[status.toLowerCase()] || statusColors.default
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
