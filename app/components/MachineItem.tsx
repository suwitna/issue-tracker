import React from 'react';
import { TimeScale } from './TimeScale';
import { StatusBlockWithTooltip } from './StatusBlockWithTooltip';
import { MachineLog, MachineStatus } from '../../models/mockData';
import { parseTime, parseTimeToMin, getMinutes, formatDurationHMS } from '../utils/timeUtils';

export interface HighlightRange {
  start: string; // เช่น "10:00:00"
  end: string;   // เช่น "10:15:00"
  color?: string; // เช่น "bg-yellow-200"
}

export interface MachineItemProps {
  log: MachineLog;
  leftColWidth?: number;
  rightColWidth?: number;
  chartHeight?: number;
  startHour?: string;
  endHour?: string;
  showTooltip?: boolean;
  showTimeScale?: boolean;
  statusColorMap?: Partial<Record<MachineStatus, string>>;
  highlightRanges?: HighlightRange[]; // 👈 เพิ่มพารามิเตอร์ใหม่
}

const defaultStatusColorMap: Record<MachineStatus, string> = {
  running: 'bg-green-600',
  stop: 'bg-red-500',
  off: 'bg-gray-700',
};
export const MachineItem: React.FC<MachineItemProps> = ({
  log,
  leftColWidth = 150,
  rightColWidth = 420,
  chartHeight = 60,
  startHour = '8:00:00',
  endHour = '14:15:00',
  showTooltip = true,
  showTimeScale = true,
  statusColorMap = defaultStatusColorMap,
  highlightRanges = [],
}) => {
  const startMinutes = parseTimeToMin(startHour);
  const endMinutes = parseTimeToMin(endHour);
  const totalMinutes = endMinutes - startMinutes;

  return (
    <div
      className="relative bg-gray-200 rounded-none shadow-sm"
      style={{ width: leftColWidth + rightColWidth + 50 }}
    >
      {/* ✅ Highlight Background Blocks (แทรกด้านนอกสุด แต่ absolute) */}
      {highlightRanges.map((range, i) => {
        const startMin = parseTimeToMin(range.start);
        const endMin = parseTimeToMin(range.end);
        const offset = ((startMin - startMinutes) / totalMinutes) * rightColWidth;
        const width = ((endMin - startMin) / totalMinutes) * rightColWidth;

        return (
          <div
            key={i}
            className={`${range.color ?? 'bg-yellow-200'} absolute opacity-60 z-0`}
            style={{
              left: leftColWidth + offset + 20,
              width: width,
              top: 0,
              bottom: 0,
            }}
          />
        );
      })}

      {/* ✅ Main content */}
      <div className="flex items-center space-x-4 w-full p-1 relative z-10">
        {/* 👈 Left Column */}
        <div
          className="text-right font-semibold whitespace-nowrap pr-4"
          style={{ width: leftColWidth }}
        >
          {log.machine}
        </div>

        {/* 👉 Right Column */}
        <div className="flex flex-col" style={{ width: rightColWidth }}>
          {/* ✅ Timeline Chart */}
          <div
            className="relative flex border-none overflow-visible"
            style={{ width: rightColWidth, height: chartHeight }}
          >
            {log.timeline.map((block, i) => {
              const startMinutes = parseTime(block.start);
              const originalEndMinutes = parseTime(block.end);
              const maxMinutes = endMinutes;

              if (startMinutes >= maxMinutes) return null;

              const clippedEndMinutes = Math.min(originalEndMinutes, maxMinutes);
              const duration = clippedEndMinutes - startMinutes;
              if (duration <= 0) return null;

              const blockWidth = (duration / totalMinutes) * 100;

              return showTooltip ? (
                <StatusBlockWithTooltip
                  key={i}
                  start={block.start}
                  end={block.end}
                  status={block.status}
                  durationInMinutes={totalMinutes}
                />
              ) : (
                <div
                  key={i}
                  className={`h-full ${statusColorMap[block.status] ?? 'bg-gray-300'} z-10 flex items-center justify-center`}
                  style={{
                    width: `${blockWidth}%`,
                    flexShrink: 0,
                  }}
                >
                  {block.status === 'off' && (
                    <span className="text-white text-xs font-medium text-center">
                      {formatDurationHMS(getMinutes(block.start, block.end))}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* ✅ TimeScale */}
          {showTimeScale && (
            <div className="mt-1 relative z-20">
              <TimeScale
                width={rightColWidth}
                startHour={startHour}
                endHour={endHour}
                highlightRanges ={highlightRanges}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
