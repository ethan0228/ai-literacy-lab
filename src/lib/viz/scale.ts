/** 線性比例尺：把資料值對應到畫面座標，並可反向換算。 */
export interface LinearScale {
  (value: number): number;
  invert: (pixel: number) => number;
  ticks: (step: number) => number[];
}

export function createLinearScale(
  domain: readonly [number, number],
  range: readonly [number, number],
): LinearScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const scale = ((value: number) => r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)) as LinearScale;
  scale.invert = (pixel) => d0 + ((pixel - r0) / (r1 - r0)) * (d1 - d0);
  scale.ticks = (step) => {
    const values: number[] = [];
    for (let value = Math.ceil(d0 / step) * step; value <= d1 + 1e-9; value += step) {
      values.push(value);
    }
    return values;
  };
  return scale;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
