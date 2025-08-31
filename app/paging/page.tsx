'use client'; // ✅ ต้องอยู่บรรทัดที่ 1

import React from 'react';
import { mockMachineLogs } from '../../models/mockData';
import { MachineList } from '../components/MachineList';

export default function MachineTimeline() {
  return (
    <MachineList 
      logs={mockMachineLogs} 
      leftColWidth={180}
      rightColWidth={500}
      chartHeight={30}
      startHour={'8:00:00'}
      endHour={'14:15:00'}
      showTooltip={true}
      showTimeScale={true}
      highlightRanges={[
        { start: '10:00:00', end: '10:15:00', color: 'bg-yellow-200' }, //เวลาพักน้อย
        { start: '12:00:00', end: '13:00:00', color: 'bg-yellow-200' }, //เวลาพักกลางวัน
        { start: '14:14:00', end: '14:15:00', color: 'bg-red-500' }, // เวลาเลิกงาน
      ]}
      statusColorMap={{
        running: 'bg-green-600',
        stop: 'bg-red-500',
        off: 'bg-gray-700',
      }}
      showPaging={{ show: true, showTopPage: false, position: 'right', itemsPerPage: 8, scrollToTop: false }}
    />
  );
}