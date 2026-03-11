import { useCallback } from 'react';
import { formatRupiah } from '@omm/shared';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RupiahInputProps {
  /** Current integer value in Rupiah */
  value: number;
  /** Called with integer Rupiah value whenever selection changes */
  onChange: (value: number) => void;
  /** Slider minimum (integer Rupiah) */
  min: number;
  /** Slider maximum (integer Rupiah) */
  max: number;
  /** Slider step increment (integer Rupiah) */
  step: number;
  /** Preset chip amounts to display below the slider */
  presets?: number[];
  label?: string;
  className?: string;
  disabled?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RupiahInput({
  value,
  onChange,
  min,
  max,
  step,
  presets,
  label,
  className,
  disabled = false,
}: RupiahInputProps) {
  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value, 10));
    },
    [onChange]
  );

  const fillPercent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-text-secondary">{label}</label>
      )}

      {/* Live display */}
      <div className="text-3xl font-bold text-primary-blue tabular-nums">
        {formatRupiah(value)}
      </div>

      {/* Slider */}
      <div className="relative w-full">
        {/* Track fill */}
        <div className="absolute top-1/2 left-0 h-2 rounded-full bg-accent-blue pointer-events-none"
          style={{ width: `${fillPercent}%`, transform: 'translateY(-50%)' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSlider}
          disabled={disabled}
          className={cn(
            'relative w-full h-2 appearance-none rounded-full bg-gray-200 outline-none cursor-pointer',
            'accent-accent-blue',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        {/* Min / Max labels */}
        <div className="flex justify-between mt-1 text-xs text-text-secondary">
          <span>{formatRupiah(min)}</span>
          <span>{formatRupiah(max)}</span>
        </div>
      </div>

      {/* Preset chips */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              disabled={disabled}
              className={cn(
                'px-3 py-1.5 rounded-full border text-sm font-medium transition-all',
                value === preset
                  ? 'border-accent-blue bg-accent-blue text-white'
                  : 'border-gray-300 bg-white text-text-primary hover:border-accent-blue hover:text-accent-blue',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {formatRupiah(preset)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
