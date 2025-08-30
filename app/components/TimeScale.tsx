import React from 'react';
import { parseTime, parseTimeToMin, getMinutes, formatDurationHMS } from '../utils/timeUtils';

export interface HighlightRange {
  start: string; // เช่น "10:00:00"
  end: string;   // เช่น "10:15:00"
  color?: string; // เช่น "bg-yellow-200"
}

interface TimeScaleProps {
  width?: number;
  height?: number;
  startHour?: string;
  endHour?: string;
  highlightRanges?: HighlightRange[]; // 👈 เพิ่มพารามิเตอร์ใหม่
}

export const TimeScale: React.FC<TimeScaleProps> = ({
  width = 400,
  height = 30,
  startHour = '8:00:00',
  endHour = '14:15:00',
  highlightRanges = [],
}) => {
  const start = parseTimeToMin(startHour);   // 08:00:00
  const end = parseTimeToMin(endHour);    // 14:15:00
  const interval = 5;    // tick ทุก 15 นาที

  const totalMinutes = end - start;

  const marks = [];
  const labels = [];

  for (let m = start; m <= end; m += interval) {
    const left = ((m - start) / totalMinutes) * width;
    const extraMarks = [640, 680];
    const isHourMark = m % 60 === 0;
    const isQuaterMark = m % 15 === 0;
    const isExtraMark = extraMarks.includes(m);

    if(isHourMark || isQuaterMark)
    {
      marks.push(
        <div
          key={'tick-' + m}
          style={{
            position: 'absolute',
            left,
            bottom: isHourMark? 22 : 27,
            width: isHourMark ? 2 : 1,
            height: isHourMark ? 10 : 5,
            backgroundColor: 'black',
            borderLeft: isHourMark ? '2px solid black' : undefined,
            boxSizing: 'border-box',
            transform: 'translateX(-1px)',
          }}
        />
      );
      
      if (isHourMark && !(m == 11 * 60)) {
        const hh = Math.floor(m / 60);
        const mm = m % 60;
        const label = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;

        labels.push(
          <div
            key={'label-' + m}
            style={{
              position: 'absolute',
              left,
              bottom: 0,
              transform: 'translateX(-50%)',
              fontSize: 11,
              color: 'black',
              userSelect: 'none',
            }}
          >
            {label}
          </div>
        );
      }
    }

    if (isExtraMark) {
          const hh = Math.floor(m / 60);
          const mm = m % 60;
          const label = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;

          labels.push(
            <div
              key={'label-' + m}
              style={{
                position: 'absolute',
                left,
                bottom: 0,
                transform: 'translateX(-50%)',
                fontSize: 11,
                color: 'black',
                userSelect: 'none',
              }}
            >
              {label}
            </div>
          );
        }
  }

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        marginTop: 3,
        fontFamily: 'Arial, sans-serif',

        // เพิ่มเส้นแกน X
        borderTop: '1px solid black',
      }}
    >
      {marks}
      {labels}
    </div>
  );
};
