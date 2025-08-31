import React, { useState } from 'react';
import { MachineItem } from './MachineItem';
import { MachinePage } from './MachinePage';
import { MachineLog, MachineStatus } from '../../models/mockData';

export interface HighlightRange {
  start: string; // เช่น "10:00:00"
  end: string;   // เช่น "10:15:00"
  color?: string; // เช่น "bg-yellow-200"
}

export interface showPaging {
  show: boolean;
  showTopPage: boolean;
  position?: 'left' | 'center' | 'right'; // ✅ แคบลงแบบนี้
}

interface MachineListProps {
    logs: MachineLog[];
    leftColWidth?: number;
    rightColWidth?: number;
    chartHeight?: number;
    startHour?: string;
    endHour?: string;
    showTooltip?: boolean;
    showTimeScale?: boolean;
    statusColorMap?: Partial<Record<MachineStatus, string>>;
    highlightRanges?: HighlightRange[]; // 👈 เพิ่มพารามิเตอร์ใหม่
    itemsPerPage?: number;
    showPaging?: showPaging;
}

const defaultStatusColorMap: Record<MachineStatus, string> = {
  running: 'bg-green-600',
  stop: 'bg-red-500',
  off: 'bg-gray-700',
};

export const MachineList: React.FC<MachineListProps> = ({
  logs,
  leftColWidth = 150,
  rightColWidth = 420,
  chartHeight = 60,
  startHour = '8:00:00',
  endHour = '14:15:00',
  showTooltip = true,
  showTimeScale = true,
  statusColorMap = defaultStatusColorMap,
  highlightRanges = [],
  itemsPerPage = 10,
  showPaging = { show: false, showTopPage: false, position: 'center' },
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = showPaging?.show
    ? logs.slice(startIndex, startIndex + itemsPerPage)
    : logs;

  return (
    <div className="p-4 space-y-2">
      {/* ✅ Pagination Top */}
      {showPaging?.show && showPaging?.showTopPage && (
        <MachinePage
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          leftColWidth={leftColWidth}
          rightColWidth={rightColWidth}
          position={showPaging.position}
        />
      )}

      {/* ✅ Machine Logs */}
      {currentLogs.map((log) => (
        <MachineItem
          log={log}
          leftColWidth={leftColWidth}
          rightColWidth={rightColWidth}
          chartHeight={chartHeight}
          startHour={startHour}
          endHour={endHour}
          showTooltip={showTooltip}
          showTimeScale={showTimeScale}
          highlightRanges={highlightRanges}
          statusColorMap={statusColorMap}
        />
      ))}

      {/* ✅ Pagination Bottom */}
      {showPaging?.show && !showPaging?.showTopPage && (
        <MachinePage
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          leftColWidth={leftColWidth}
          rightColWidth={rightColWidth}
          position={showPaging.position}
        />
      )}
    </div>
  );
};
