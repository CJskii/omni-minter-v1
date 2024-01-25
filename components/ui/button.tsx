import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        accent:
          "rounded-2xl bg-[#D0A2F7] tracking-wide text-black hover:bg-[#D0A2F7]/90 dark:bg-[#D0A2F7] dark:text-black dark:hover:bg-[#D0A2F7]/90",
        navbar:
          "rounded-xl bg-[#E8E8E8] tracking-wide text-black hover:bg-[#E8E8E8]/90 dark:bg-[#3A3A3A] dark:text-white dark:hover:bg-[#3A3A3A]/90",
        mintly: "bg-primary text-neutral-900 rounded-xl hover:bg-primary/90",
        mintlySecondary:
          "dark:bg-black/10 bg-white/20 text-white dark:text-neutral-900 rounded-xl dark:hover:bg-black/20 hover:bg-white/30",
        dashboardFooter:
          "bg-[#00000021] hover:bg-[#00000016] dark:bg-[#FFFFFF21] dark:hover:bg-[#FFFFFF16] w-full rounded-xl",
        root: "bg-neutral-900 text-neutral-50 rounded-xl hover:bg-neutral-900/90",
        default:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-200 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-600 dark:text-neutral-50 dark:hover:bg-neutral-700/80 rounded-xl",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
