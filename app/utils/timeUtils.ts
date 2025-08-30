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

export function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function formatDurationHMS(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}