export type MachineStatus = 'running' | 'stop' | 'off'; // ❌ ลบ 'idle'

export interface MachineLogBlock {
  start: string;
  end: string;
  status: MachineStatus;
  duration?: string;
}

export interface MachineLog {
  machine: string;
  timeline: MachineLogBlock[];
}

function formatTimeWithSeconds(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  const s = Math.floor((totalMinutes - Math.floor(totalMinutes)) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function randomStatus(): MachineStatus {
  return Math.random() > 0.3 ? 'running' : 'stop';
}

function randomMinuteFraction(): number {
  return Math.random() * 5; // เปลี่ยนเป็นทศนิยม 0–5 นาที (รวมวินาที)
}

function generateTimeline(index: number): MachineLogBlock[] {
  const timeline: MachineLogBlock[] = [];
  const start = 8 * 60;
  const end = 14 * 60 + 15;
  const maxBlocks = Math.floor(Math.random() * 31) + 50;

  let current = start;
  let consecutiveRunning = 0;
  let consecutiveStop = 0;

  while (current < end && timeline.length < maxBlocks) {
    const baseSegment = Math.random() * 10 + 5;
    const segment = baseSegment + (Math.random() < 0.5 ? randomMinuteFraction() : 0);
    const next = Math.min(current + segment, end);

    // ✅ กรณี index 5
    if ([5].includes(index)) {
      if (current < 13 * 60 && next > 8 * 60) {
        if (current < 8 * 60) {
          timeline.push({
            start: formatTimeWithSeconds(current),
            end: formatTimeWithSeconds(8 * 60),
            status: randomStatus(),
          });
        }
        timeline.push(
          { start: '08:00:00', end: '10:00:00', status: 'off' },
          { start: '10:00:00', end: '12:00:00', status: 'off' },
          { start: '12:00:00', end: '13:00:00', status: 'off' },
          { start: '13:00:00', end: '13:44:00', status: 'off' },
        );
        current = 13 * 60 + 44;
        consecutiveRunning = 0;
        consecutiveStop = 0;
        continue;
      }
    }

    // ✅ กรณี index 7, 8
    if ([7, 8].includes(index)) {
      if (current < 13 * 60 && next > 12 * 60) {
        if (current < 12 * 60) {
          timeline.push({
            start: formatTimeWithSeconds(current),
            end: formatTimeWithSeconds(12 * 60),
            status: randomStatus(),
          });
        }
        timeline.push({ start: '12:00:00', end: '13:20:00', status: 'off' });
        current = 13 * 60 + 20;
        consecutiveRunning = 0;
        consecutiveStop = 0;
        continue;
      }
    }

    // ✅ Logic คุมไม่ให้ running > 5 หรือ stop > 3
    let status: MachineStatus;
    if (consecutiveRunning >= 2) {
      status = 'stop';
    } else if (consecutiveStop >= 1) {
      status = 'running';
    } else {
      status = randomStatus();
    }

    if (status === 'running') {
      consecutiveRunning++;
      consecutiveStop = 0;
    } else if (status === 'stop') {
      consecutiveStop++;
      consecutiveRunning = 0;
    }

    timeline.push({
      start: formatTimeWithSeconds(current),
      end: formatTimeWithSeconds(next),
      status,
    });

    current = next;
  }

  return timeline;
}


export const mockMachineLogs: MachineLog[] = Array.from({ length: 214 }, (_, i) => ({
  machine: `CNC-MACHINE-${(i + 1).toString().padStart(3, '0')}`,
  timeline: generateTimeline(i),
}));


{/*
  [
  {
    "machine": "CNC-MACHINE-001",
    "timeline": [
      { "start": "08:00:00", "end": "08:10:32", "status": "running" },
      { "start": "08:10:32", "end": "08:22:11", "status": "stop" },
      ...
    ]
  }
]

  */}