export function splitList(list: any[], k: number) {
  const slices = Math.ceil(list.length / k);

  const parts = [];

  for (let i = 0; i < slices; i++) {
    const start = i * k;
    const end = (i + 1) * k;
    const part = list.slice(start, end);
    parts.push(part);
  }

  return { parts };
}
