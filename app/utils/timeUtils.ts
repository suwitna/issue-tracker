// utils/timeUtils.ts
export function generateTimeScale(
  startTime = '08:00',
  endTime = '14:00',
  stepMinutes = 60
): string[] {
  const result: string[] = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let totalStart = startH * 60 + startM;
  const totalEnd = endH * 60 + endM;

  while (totalStart <= totalEnd) {
    const h = Math.floor(totalStart / 60)
      .toString()
      .padStart(2, '0');
    const m = (totalStart % 60).toString().padStart(2, '0');
    result.push(`${h}:${m}`);
    totalStart += stepMinutes;
  }

  return result;
}

export function getMinutes(start: string, end: string) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

// parseTime: แปลง HH:mm:ss เป็น นาทีทศนิยม
export function parseTime(time: string): number {
  const [hh, mm, ss] = time.split(':').map(Number);
  return hh * 60 + mm + (ss ?? 0) / 60;
}

//parseTime: แปลง HH:mm:ss เป็น นาที
export function parseTimeToMin(str: string): number {
  const [h, m, s = 0] = str.split(':').map(Number);
  return h * 60 + m + s / 60;
}

// formatDurationHMS: แปลงนาที (ทศนิยม) เป็น HH:mm:ss
export function formatDurationHMS(minutes: number): string {
  const totalSeconds = Math.round(minutes * 60);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}