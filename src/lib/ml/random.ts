/** 可重現的亂數（mulberry32）：同樣的種子永遠產生同樣的資料，方便教學與測試。 */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 常態分布亂數（Box–Muller）。 */
export function createNormal(random: () => number): (mean: number, sd: number) => number {
  return (mean, sd) => {
    const u = Math.max(random(), Number.EPSILON);
    const v = random();
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}
