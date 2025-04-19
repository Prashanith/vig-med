import {
  ComponentPropsWithoutRef,
  forwardRef,
  memo,
  ReactNode,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";

type BaseBtnAttributes = ComponentPropsWithoutRef<"button">;
type Ref = HTMLButtonElement;

export interface IButtonProps extends BaseBtnAttributes {
  variant?: "contained" | "outlined" | "text" | "fab";
  size?: "small" | "medium" | "large" | "x-large";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = forwardRef<Ref, IButtonProps>(
  (
    {
      variant = "contained",
      size = "medium",
      startIcon,
      endIcon,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const memoizedStartIcon = useMemo(
      () => startIcon && <span className='mr-2'>{startIcon}</span>,
      [startIcon]
    );
    const memoizedEndIcon = useMemo(
      () => endIcon && <span className='ml-2'>{endIcon}</span>,
      [endIcon]
    );
    return (
      <button
        className={twMerge(
          `btn flex flex-row justify-center items-center gap-2`,
          `btn-${size}`,
          `btn-${variant}`,
          className
        )}
        ref={ref}
        {...rest}
      >
        {startIcon && memoizedStartIcon}
        {children}
        {endIcon && memoizedEndIcon}
      </button>
    );
  }
);

export default memo(Button);
