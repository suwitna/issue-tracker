import React from 'react';

interface TimeScaleProps {
  width?: number;
  height?: number;
  startHour?: number;
  endHour?: number;
}

export const TimeScale: React.FC<TimeScaleProps> = ({
  width = 400,
  height = 30,
  startHour = 8,
  endHour = 14
}) => {
  const start = startHour * 60;   // 08:00
  const end = endHour * 60;    // 14:00
  const interval = 15;    // tick ทุก 5 นาที

  const totalMinutes = end - start;

  const marks = [];
  const labels = [];

  for (let m = start; m <= end; m += interval) {
    const left = ((m - start) / totalMinutes) * width;
    const isHourMark = m % 60 === 0;

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

    const extraMarks = [640, 680];
    if (isHourMark || extraMarks.includes(m)) {
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
