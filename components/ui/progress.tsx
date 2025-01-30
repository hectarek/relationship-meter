'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// Base classes for the container
const progressContainerClasses =
  'relative w-full overflow-hidden rounded-base border-2 border-border bg-bw'

// Variants only for the Indicator
const indicatorVariants = cva(
  'h-full w-full flex-1 border-r-2 border-border transition-all',
  {
    variants: {
      variant: {
        default: 'bg-main',
        green: 'bg-green',
        yellow: 'bg-yellow',
        orange: 'bg-orange',
        red: 'bg-red',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof indicatorVariants> {
  value?: number
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, variant, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressContainerClasses, className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(indicatorVariants({ variant }))}
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = 'Progress'

export { Progress, indicatorVariants }