import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            {
              'border-red-500 focus-visible:ring-red-500': error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Luxury input variant
export interface LuxuryInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'gold' | 'silver' | 'rose';
}

const LuxuryInput = React.forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ className, type, label, error, helperText, variant = 'gold', id, ...props }, ref) => {
    const inputId = id || `luxury-input-${React.useId()}`;

    const variantStyles = {
      gold: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500',
      silver: 'border-gray-300 focus:border-gray-500 focus:ring-gray-500',
      rose: 'border-pink-300 focus:border-pink-500 focus:ring-pink-500',
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none',
              {
                'text-yellow-700': variant === 'gold',
                'text-gray-700': variant === 'silver',
                'text-pink-700': variant === 'rose',
              }
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'input-luxury',
            {
              'border-red-500 focus:border-red-500 focus:ring-red-500': error,
              [variantStyles[variant]]: !error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
LuxuryInput.displayName = 'LuxuryInput';

export { Input, LuxuryInput };