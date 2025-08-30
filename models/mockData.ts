//export type MachineStatus = 'running' | 'stop' | 'idle' | 'off';
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

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60); // เศษนาทีปัดทิ้ง
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function randomStatus(): MachineStatus {
  return Math.random() > 0.5 ? 'running' : 'stop';
}

function randomMinuteFraction(): number {
  return Math.floor(Math.random() * 5); // เพิ่มเศษ 0–4 นาที
}

function generateTimeline(index: number): MachineLogBlock[] {
  const timeline: MachineLogBlock[] = [];
  const start = 8 * 60;
  const end = 14 * 60 + 15;
  let current = start;

  while (current < end && timeline.length < 40) {
    const baseSegment = Math.floor(Math.random() * 10 + 5); // 5–15 min
    const segment = baseSegment + (Math.random() < 0.5 ? randomMinuteFraction() : 0);
    const next = Math.min(current + segment, end);

     if ([5].includes(index)) {
      if (current < 13 * 60 && next > 8 * 60) {
        if (current < 8 * 60) {
        timeline.push({
          start: formatTime(current),
          end: formatTime(8 * 60),
          status: randomStatus(),
        });
        }
        timeline.push({
        start: '8:00',
        end: '10:00',
        status: 'off',
        });
        timeline.push({
        start: '10:00',
        end: '12:00',
        status: 'off',
        });
        timeline.push({
        start: '12:00',
        end: '13:00',
        status: 'off',
        });
        timeline.push({
        start: '13:00',
        end: '13:44',
        status: 'off',
        });
        current = 13 * 60 + 44;
        continue;
      }
    }

    // เครื่อง 6/8/9 มี off
    if ([ 7, 8].includes(index)) {
      if (current < 13 * 60 && next > 12 * 60) {
        if (current < 12 * 60) {
          timeline.push({
            start: formatTime(current),
            end: formatTime(12 * 60),
            status: randomStatus(),
          });
        }
        timeline.push({
          start: '12:00',
          end: '13:20',
          status: 'off',
        });
        current = 13 * 60 + 20;
        continue;
      }
    }

    timeline.push({
      start: formatTime(current),
      end: formatTime(next),
      status: randomStatus(),
    });

    current = next;
  }

  return timeline;
}

export const mockMachineLogs: MachineLog[] = Array.from({ length: 10 }, (_, i) => ({
  machine: `CNC-MACHINE-${(i + 1).toString().padStart(3, '0')}`,
  timeline: generateTimeline(i),
}));
