import React from 'react';
import { MachineStatus } from '../../models/mockData';
import { parseTime, getMinutes, formatDurationHMS } from '../utils/timeUtils';

interface Props {
  start: string;
  end: string;
  status: MachineStatus;
  durationInMinutes?: number;
}

const statusColorMap = {
  running: 'bg-green-500',
  stop: 'bg-red-500',
  off: 'bg-black',
};


export const StatusBlockWithTooltip: React.FC<Props> = ({ 
  start, 
  end, 
  status,
  durationInMinutes = 360 
}) => {
  const widthPercent = (getMinutes(start, end) / durationInMinutes) * 100;

  return (
    <div
      className={`relative group h-full ${statusColorMap[status]} flex items-center justify-center`}
      style={{
        width: `${widthPercent}%`,
        flexShrink: 0,
      }}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                      px-2 py-1 rounded bg-black text-white text-xs 
                      opacity-0 group-hover:opacity-100 
                      pointer-events-none z-10 whitespace-nowrap transition-opacity duration-200">
        {start} – {end} {status}
      </div>
        {status === 'off' && (
          <span className="text-white text-xs font-medium text-center">
            {formatDurationHMS(getMinutes(start, end))}
          </span>
        )}
    </div>
  );
};
