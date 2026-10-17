import * as React from 'react'
import { cn } from '@/lib/utils'

/* ─── Card (root container) ─────────────────────────────────────────────────── */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // shadcn base — border & shadow stripped so Figma styles win
      'flex flex-col',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

/* ─── CardHeader ────────────────────────────────────────────────────────────── */

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/* ─── CardContent ───────────────────────────────────────────────────────────── */

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col', className)}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

/* ─── CardFooter ────────────────────────────────────────────────────────────── */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
