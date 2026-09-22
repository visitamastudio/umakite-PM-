import React, { useState, useEffect, useRef, useId } from 'react';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'prefix'> {
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (value: number) => void;
  onValueChange?: (value: number, formatted: string) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowDecimal?: boolean;
  maxDecimalDigits?: number;
  thousandSeparator?: '.' | ',';
  decimalSeparator?: ',' | '.';
  min?: number;
  max?: number;
}

/**
 * Format a numeric or string value with thousand separators
 */
export function formatWithThousandSeparator(
  val: number | string | undefined | null,
  thousandSep: '.' | ',' = '.',
  decimalSep: ',' | '.' = ',',
  allowDec = false
): string {
  if (val === undefined || val === null || val === '') return '';
  const str = String(val).trim();
  if (!str) return '';

  const isNeg = str.startsWith('-');
  const cleanStr = str.replace(/^-/, '');

  if (allowDec) {
    const altDec = decimalSep === ',' ? '.' : ',';
    let parts: string[];
    if (cleanStr.includes(decimalSep)) {
      parts = cleanStr.split(decimalSep);
    } else if (cleanStr.includes(altDec)) {
      parts = cleanStr.split(altDec);
    } else {
      parts = [cleanStr];
    }

    const intDigits = parts[0].replace(/\D/g, '');
    const decDigits = parts.length > 1 ? parts[1].replace(/\D/g, '') : undefined;
    const formattedInt = intDigits ? intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep) : '0';

    let result = (isNeg ? '-' : '') + formattedInt;
    if (decDigits !== undefined) {
      result += decimalSep + decDigits;
    }
    return result;
  } else {
    const intDigits = cleanStr.replace(/\D/g, '');
    if (!intDigits) return '';
    const formattedInt = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
    return (isNeg ? '-' : '') + formattedInt;
  }
}

/**
 * Parse pure numeric value from formatted string
 */
export function parseFromFormatted(
  formatted: string,
  thousandSep: '.' | ',' = '.',
  decimalSep: ',' | '.' = ','
): number {
  if (!formatted) return 0;
  const isNeg = formatted.trim().startsWith('-');
  const escapedThousand = thousandSep === '.' ? '\\.' : ',';
  let cleaned = formatted.replace(new RegExp(escapedThousand, 'g'), '');
  if (decimalSep === ',') {
    cleaned = cleaned.replace(',', '.');
  }
  cleaned = cleaned.replace(/[^\d.-]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return isNeg && num > 0 ? -num : num;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  defaultValue,
  onChange,
  onValueChange,
  prefix,
  suffix,
  allowDecimal = false,
  maxDecimalDigits = 2,
  thousandSeparator = '.',
  decimalSeparator = ',',
  min,
  max,
  className = '',
  placeholder,
  disabled,
  required,
  id,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id || autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial display computation
  const initialValue = value !== undefined ? value : defaultValue !== undefined ? defaultValue : '';
  const [displayValue, setDisplayValue] = useState<string>(() =>
    formatWithThousandSeparator(initialValue, thousandSeparator, decimalSeparator, allowDecimal)
  );

  // Sync with controlled value prop if changed from outside
  useEffect(() => {
    if (value !== undefined) {
      const currentParsed = parseFromFormatted(displayValue, thousandSeparator, decimalSeparator);
      const incomingNum = typeof value === 'number' ? value : parseFromFormatted(String(value), thousandSeparator, decimalSeparator);
      if (incomingNum !== currentParsed || (displayValue === '' && value !== '')) {
        setDisplayValue(
          formatWithThousandSeparator(value, thousandSeparator, decimalSeparator, allowDecimal)
        );
      }
    }
  }, [value, thousandSeparator, decimalSeparator, allowDecimal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const rawVal = input.value;
    const cursorPos = input.selectionStart ?? rawVal.length;

    // Count how many numeric digits were before the cursor before re-formatting
    const textBeforeCursor = rawVal.slice(0, cursorPos);
    const digitsBeforeCursor = textBeforeCursor.replace(/\D/g, '').length;
    const hadDecimalBefore = allowDecimal && (textBeforeCursor.includes(decimalSeparator) || textBeforeCursor.includes(decimalSeparator === ',' ? '.' : ','));

    // Check if ends with decimal separator
    const isTypingDecimal = allowDecimal && (rawVal.endsWith(decimalSeparator) || rawVal.endsWith(decimalSeparator === ',' ? '.' : ','));

    // Extract digits and decimals
    let parsedNum = 0;
    let newDisplay = '';

    if (rawVal.trim() === '' || rawVal.trim() === '-') {
      newDisplay = rawVal.trim();
      parsedNum = 0;
    } else {
      parsedNum = parseFromFormatted(rawVal, thousandSeparator, decimalSeparator);

      if (min !== undefined && parsedNum < min) {
        // allow typing, will validate or clamp if needed
      }
      if (max !== undefined && parsedNum > max) {
        parsedNum = max;
      }

      newDisplay = formatWithThousandSeparator(rawVal, thousandSeparator, decimalSeparator, allowDecimal);

      if (isTypingDecimal && !newDisplay.includes(decimalSeparator)) {
        newDisplay += decimalSeparator;
      }
    }

    setDisplayValue(newDisplay);

    if (onChange) {
      onChange(parsedNum);
    }
    if (onValueChange) {
      onValueChange(parsedNum, newDisplay);
    }

    // Preserve cursor position smoothly
    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      let newCursor = 0;
      let countedDigits = 0;

      for (let i = 0; i < newDisplay.length; i++) {
        const char = newDisplay[i];
        if (/\d/.test(char)) {
          countedDigits++;
        }
        if (countedDigits >= digitsBeforeCursor) {
          newCursor = i + 1;
          break;
        }
      }

      // If typed decimal separator, place cursor after it
      if (isTypingDecimal && hadDecimalBefore) {
        const decIdx = newDisplay.indexOf(decimalSeparator);
        if (decIdx !== -1) newCursor = decIdx + 1;
      }

      if (newCursor === 0 && digitsBeforeCursor === 0) {
        newCursor = 0;
      }
      if (newCursor > newDisplay.length) {
        newCursor = newDisplay.length;
      }

      inputRef.current.setSelectionRange(newCursor, newCursor);
    });
  };

  const handleBlur = () => {
    // Normalise display on blur
    if (displayValue.trim() === '' || displayValue === '-') {
      setDisplayValue('');
      if (onChange) onChange(0);
      return;
    }
    let num = parseFromFormatted(displayValue, thousandSeparator, decimalSeparator);
    if (min !== undefined && num < min) num = min;
    if (max !== undefined && num > max) num = max;

    const finalFormatted = formatWithThousandSeparator(num, thousandSeparator, decimalSeparator, allowDecimal);
    setDisplayValue(finalFormatted);
    if (onChange) onChange(num);
  };

  return (
    <div className={`relative flex items-center ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      {prefix && (
        <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 font-semibold text-xs select-none">
          {prefix}
        </div>
      )}
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        inputMode={allowDecimal ? 'decimal' : 'numeric'}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs transition-all focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          prefix ? 'pl-9' : 'pl-3'
        } ${suffix ? 'pr-9' : 'pr-3'} py-2.5 ${className}`}
        {...rest}
      />
      {suffix && (
        <div className="absolute right-3 flex items-center pointer-events-none text-slate-400 font-medium text-xs select-none">
          {suffix}
        </div>
      )}
    </div>
  );
};
