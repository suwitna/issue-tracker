'use client'; // ✅ ต้องอยู่บรรทัดที่ 1

import React from 'react';
import { mockMachineLogs } from '../../models/mockData';
import { MachineList } from '../components/MachineList';

export default function MachineTimeline() {
  return (
    <MachineList 
      logs={mockMachineLogs}  // (1)
      leftColWidth={180}      // (2)
      rightColWidth={500}     // (3)
      chartHeight={30}        // (4)
      startHour={'8:00:00'}   // (5)
      endHour={'14:15:00'}    // (6)
      showTooltip={true}      // (7)
      showTimeScale={true}    // (8)
      highlightRanges={[      // (9)
        { start: '10:00:00', end: '10:15:00', color: 'bg-yellow-200' }, //เวลาพักน้อย
        { start: '12:00:00', end: '13:00:00', color: 'bg-yellow-200' }, //เวลาพักกลางวัน
        { start: '14:14:00', end: '14:15:00', color: 'bg-red-500' }, // เวลาเลิกงาน
      ]}
      statusColorMap={{       // (10)
        running: 'bg-green-600', // ✅ running
        stop: 'bg-red-500',      // 🛑 stop
        off: 'bg-gray-700',      // ⚫ off
      }}
      showPaging={{           // (11)
        show: true, 
        showTopPage: false, 
        position: 'right', 
        itemsPerPage: 8, 
        scrollToTop: false 
      }}
    />
  );
}