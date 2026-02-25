import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

// Simple variant configuration, usually using a library like class-variance-authority
const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-button text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-purple disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95',
    {
        variants: {
            variant: {
                default: 'bg-luxury-purple text-white hover:bg-luxury-indigo shadow-button-glow hover:shadow-hover-soft',
                destructive: 'bg-luxury-red text-white hover:bg-red-700 shadow-sm',
                outline: 'border-2 border-border hover:border-luxury-purple hover:bg-luxury-purple/5 hover:text-luxury-purple text-foreground bg-transparent',
                secondary: 'bg-luxury-indigo text-white hover:bg-luxury-dark shadow-hover-soft',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'underline-offset-4 hover:underline text-primary',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-3 rounded-md',
                lg: 'h-11 px-8 rounded-md',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={clsx(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
