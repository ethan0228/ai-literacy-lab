'use client';

import { type MouseEvent, useEffect, useMemo, useRef } from 'react';
import {
  HEIGHT_DOMAIN,
  type Pet,
  PET_LABELS,
  type PetSample,
  predictPet,
  toPoints,
  WEIGHT_DOMAIN,
} from '@/labs/shared/pet-data';
import { clamp, createLinearScale } from '@/lib/viz/scale';

/** SVG 座標系（viewBox）與繪圖區 */
const VIEW = { width: 440, height: 340 };
const AREA = { left: 52, top: 10, width: 378, height: 280 };
/** 分類區域的格數：畫在小尺寸 Canvas 上再放大 */
const GRID = { cols: 63, rows: 47 };

const REGION_COLORS: Record<Pet, string> = { dog: '#dbeafe', cat: '#ffedd5' };

const xScale = createLinearScale(WEIGHT_DOMAIN, [AREA.left, AREA.left + AREA.width]);
const yScale = createLinearScale(HEIGHT_DOMAIN, [AREA.top + AREA.height, AREA.top]);

function Marker({ sample, hollow }: { sample: PetSample; hollow?: boolean }) {
  const cx = xScale(sample.weight);
  const cy = yScale(sample.height);
  const isDog = sample.label === 'dog';
  const color = isDog ? 'var(--color-brand-700)' : 'var(--color-accent-700)';
  const paint = hollow
    ? { fill: 'white', stroke: color, strokeWidth: 1.5 }
    : { fill: color, stroke: 'white', strokeWidth: 1 };
  // 以形狀（圓形／三角形）加上顏色區分類別，不只依賴顏色
  return isDog ? (
    <circle cx={cx} cy={cy} r={hollow ? 3.5 : 5} {...paint} />
  ) : (
    <path
      d={hollow ? `M${cx} ${cy - 4.5}l4.2 7.6h-8.4z` : `M${cx} ${cy - 6.5}l6 10.8h-12z`}
      {...paint}
    />
  );
}

interface ClassifierPlotProps {
  training: readonly PetSample[];
  k: number;
  /** 額外顯示的測試資料（空心標記） */
  testSet?: readonly PetSample[];
  /** 提供時，點擊繪圖區可新增資料 */
  onAdd?: (weight: number, height: number) => void;
  /** 給螢幕報讀器的圖表摘要 */
  description: string;
}

/**
 * 貓狗分類圖：Canvas 畫出模型的分類區域，SVG 疊上座標軸與資料點。
 */
export function ClassifierPlot({ training, k, testSet, onAdd, description }: ClassifierPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useMemo(() => toPoints(training), [training]);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, GRID.cols, GRID.rows);
    for (let row = 0; row < GRID.rows; row += 1) {
      for (let col = 0; col < GRID.cols; col += 1) {
        const weight = xScale.invert(AREA.left + ((col + 0.5) / GRID.cols) * AREA.width);
        const height = yScale.invert(AREA.top + ((row + 0.5) / GRID.rows) * AREA.height);
        const prediction = predictPet(points, weight, height, k);
        if (!prediction) continue;
        context.fillStyle = REGION_COLORS[prediction];
        context.fillRect(col, row, 1, 1);
      }
    }
  }, [points, k]);

  function handleClick(event: MouseEvent<SVGRectElement>) {
    if (!onAdd) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = AREA.left + ((event.clientX - box.left) / box.width) * AREA.width;
    const py = AREA.top + ((event.clientY - box.top) / box.height) * AREA.height;
    onAdd(
      Math.round(clamp(xScale.invert(px), ...WEIGHT_DOMAIN) * 10) / 10,
      Math.round(clamp(yScale.invert(py), ...HEIGHT_DOMAIN) * 10) / 10,
    );
  }

  return (
    <figure className="m-0">
      <div className="relative w-full" style={{ aspectRatio: `${VIEW.width} / ${VIEW.height}` }}>
        <canvas
          ref={canvasRef}
          width={GRID.cols}
          height={GRID.rows}
          aria-hidden="true"
          className="absolute [image-rendering:pixelated]"
          style={{
            left: `${(AREA.left / VIEW.width) * 100}%`,
            top: `${(AREA.top / VIEW.height) * 100}%`,
            width: `${(AREA.width / VIEW.width) * 100}%`,
            height: `${(AREA.height / VIEW.height) * 100}%`,
          }}
        />
        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          role="img"
          aria-label={description}
          className="absolute inset-0 size-full"
        >
          <g className="text-[11px]" fill="var(--color-ink-muted)">
            {xScale.ticks(5).map((tick) => (
              <g key={tick}>
                <line
                  x1={xScale(tick)}
                  x2={xScale(tick)}
                  y1={AREA.top}
                  y2={AREA.top + AREA.height}
                  stroke="var(--color-ink)"
                  strokeOpacity="0.08"
                />
                <text x={xScale(tick)} y={AREA.top + AREA.height + 16} textAnchor="middle">
                  {tick}
                </text>
              </g>
            ))}
            {yScale.ticks(10).map((tick) => (
              <g key={tick}>
                <line
                  x1={AREA.left}
                  x2={AREA.left + AREA.width}
                  y1={yScale(tick)}
                  y2={yScale(tick)}
                  stroke="var(--color-ink)"
                  strokeOpacity="0.08"
                />
                <text x={AREA.left - 8} y={yScale(tick) + 4} textAnchor="end">
                  {tick}
                </text>
              </g>
            ))}
            <text
              x={AREA.left + AREA.width / 2}
              y={VIEW.height - 6}
              textAnchor="middle"
              className="text-[13px] font-semibold"
            >
              體重（公斤）
            </text>
            <text
              transform={`translate(14 ${AREA.top + AREA.height / 2}) rotate(-90)`}
              textAnchor="middle"
              className="text-[13px] font-semibold"
            >
              身高（公分）
            </text>
          </g>
          <rect
            x={AREA.left}
            y={AREA.top}
            width={AREA.width}
            height={AREA.height}
            fill="transparent"
            stroke="var(--color-ink-muted)"
            data-testid="plot-area"
            onClick={handleClick}
            className={onAdd ? 'cursor-crosshair' : undefined}
          />
          <g pointerEvents="none">
            {testSet?.map((sample) => (
              <Marker key={sample.id} sample={sample} hollow />
            ))}
            {training.map((sample) => (
              <Marker key={sample.id} sample={sample} />
            ))}
          </g>
        </svg>
      </div>
      <figcaption className="text-ink-muted mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {(['dog', 'cat'] as const).map((pet) => (
          <span key={pet} className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
              {pet === 'dog' ? (
                <circle cx="8" cy="8" r="5" fill="var(--color-brand-700)" />
              ) : (
                <path d="M8 2l6 10.8H2z" fill="var(--color-accent-700)" />
              )}
            </svg>
            {PET_LABELS[pet]}的訓練資料
            <span
              aria-hidden="true"
              className="border-line ml-1 inline-block size-4 rounded border"
              style={{ background: REGION_COLORS[pet] }}
            />
            模型判斷為{PET_LABELS[pet]}的區域
          </span>
        ))}
        {testSet && <span>空心標記：測試資料</span>}
      </figcaption>
    </figure>
  );
}
