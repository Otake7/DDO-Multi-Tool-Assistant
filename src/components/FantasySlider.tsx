import React from 'react';

export interface FantasySliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max' | 'value'> {
  min: number | string;
  max: number | string;
  value: number | string;
  step?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

/**
 * FantasySlider
 * A custom DDON fantasy RPG range slider with an amber/orange glowing thumb
 * and a filled track that illuminates behind the thumb (dot) as it advances.
 */
export const FantasySlider: React.FC<FantasySliderProps> = ({
  min,
  max,
  value,
  step,
  onChange,
  className = '',
  id,
  style,
  ...rest
}) => {
  const numMin = typeof min === 'number' ? min : parseFloat(min) || 0;
  const numMax = typeof max === 'number' ? max : parseFloat(max) || 100;
  const numVal = typeof value === 'number' ? value : parseFloat(value) || 0;

  const range = numMax - numMin;
  const percentage = range > 0 ? Math.max(0, Math.min(100, ((numVal - numMin) / range) * 100)) : 0;

  return (
    <input
      type="range"
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={`fantasy-slider w-full cursor-pointer ${className}`}
      style={{
        '--slider-progress': `${percentage}%`,
        ...style,
      } as React.CSSProperties}
      {...rest}
    />
  );
};
