import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Base classes
  let classes = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center';
  
  // Size classes
  if (size === 'sm') {
    classes += ' text-sm px-3 py-2';
  } else if (size === 'lg') {
    classes += ' text-lg px-6 py-3';
  } else {
    classes += ' px-5 py-2.5';
  }
  
  // Width
  if (fullWidth) {
    classes += ' w-full';
  }
  
  // Variant styles
  if (variant === 'primary') {
    classes += ' bg-green-600 hover:bg-green-700 text-white';
    if (isDark) {
      classes += ' bg-green-700 hover:bg-green-600';
    }
  } else if (variant === 'secondary') {
    classes += ' bg-blue-600 hover:bg-blue-700 text-white';
    if (isDark) {
      classes += ' bg-blue-700 hover:bg-blue-600';
    }
  } else if (variant === 'outline') {
    classes += isDark
      ? ' border border-gray-600 hover:bg-gray-700 text-gray-200'
      : ' border border-gray-300 hover:bg-gray-100 text-gray-800';
  } else if (variant === 'danger') {
    classes += ' bg-red-600 hover:bg-red-700 text-white';
  }
  
  // Disabled state
  if (disabled || isLoading) {
    classes += ' opacity-60 cursor-not-allowed';
  }
  
  // Add custom classes
  classes += ` ${className}`;
  
  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {children}
      
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;