// components/MachineTimeline.tsx
import React from 'react';
import { mockMachineLogs } from '../../models/mockData';
import { MachineItem } from '../components/MachineItem';

export default function MachineTimeline() {
  return (
    <div className="p-4 space-y-6">
      {mockMachineLogs.map((log, idx) => (
        <MachineItem
        log={log}
        leftColWidth={180}
        rightColWidth={600}
        chartHeight={50}
        startHour={8}
        endHour={16}
        showTooltip={true}
        showTimeScale={true}
        highlightRanges={[
          { start: '10:00', end: '10:15', color: 'bg-yellow-200' },
          { start: '12:00', end: '13:00', color: 'bg-yellow-200' },
          { start: '14:14', end: '14:15', color: 'bg-red-500' },
        ]}
        statusColorMap={{
          running: 'bg-green-600',
          stop: 'bg-red-500',
          off: 'bg-gray-700',
        }}
      />
      ))}
    </div>
  );
}